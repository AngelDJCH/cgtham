import { useEffect, useState, useRef, useMemo } from "react";
import NavBarAutenticado from "../components/NavBarAutenticado";
import '../styles/mensajes.css';
import { getOrganizacion, getAllOrganizaciones } from "../services/Organizacion";
import { useAuth } from "../hooks/useAuth";
import socket from "../services/socket";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";

const MAX_CARACTERES = 2000;

export default function Mensajes() {
    const isSmallDevice = useMediaQuery('(max-width:900px)');
    const { user } = useAuth();
    const navigate = useNavigate();

    // Estado del directorio y filtros
    const [organizaciones, setOrganizaciones] = useState([]);
    const [cargandoOrganizaciones, setCargandoOrganizaciones] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('TODAS');

    // Estado de mensajes no leídos por organización y notificación flotante (Toast)
    const [noLeidosPorOrg, setNoLeidosPorOrg] = useState(() => {
        try {
            // Limpieza preventiva de residuos de chats fantasmas
            sessionStorage.removeItem('cgtham_no_leidos_org');
            return {};
        } catch {
            return {};
        }
    });
    const [toastNotificacion, setToastNotificacion] = useState(null);
    const timerToastRef = useRef(null);
    const organizacionesRef = useRef(organizaciones);

    useEffect(() => {
        organizacionesRef.current = organizaciones;
    }, [organizaciones]);

    useEffect(() => {
        try {
            sessionStorage.setItem('cgtham_no_leidos_org', JSON.stringify(noLeidosPorOrg));
        } catch (e) {
            console.error("Error guardando no leídos en sessionStorage:", e);
        }
    }, [noLeidosPorOrg]);

    // Estado de la conversación activa
    const [usuarioActivo, setUsuarioActivo] = useState(null);
    const [organizacion, setOrganizacion] = useState(null);
    const [idChat, setIdChat] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [cargandoHistorial, setCargandoHistorial] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [errorChat, setErrorChat] = useState(null);

    // Referencias mutables para auto-scroll y evitar stale closures
    const chatBodyRef = useRef(null);
    const mensajesEndRef = useRef(null);
    const inputMensajeRef = useRef(null);
    const idChatRef = useRef(idChat);
    const usuarioActivoRef = useRef(usuarioActivo);

    useEffect(() => {
        idChatRef.current = idChat;
    }, [idChat]);

    useEffect(() => {
        usuarioActivoRef.current = usuarioActivo;
    }, [usuarioActivo]);

    // Carga inicial del directorio de organizaciones
    useEffect(() => {
        const cargarDirectorio = async () => {
            try {
                setCargandoOrganizaciones(true);
                const res = await getAllOrganizaciones();
                setOrganizaciones(res || []);
            } catch (err) {
                console.error("Error al cargar organizaciones:", err);
            } finally {
                setCargandoOrganizaciones(false);
            }
        };
        cargarDirectorio();
    }, []);

    // Auto-scroll exclusivo del contenedor interno sin alterar el scroll global de la ventana
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [mensajes, cargandoHistorial]);

    // Auto-focus en el campo de texto previniendo desplazamiento de la ventana (preventScroll: true)
    useEffect(() => {
        if (usuarioActivo && !isSmallDevice) {
            inputMensajeRef.current?.focus({ preventScroll: true });
        }
    }, [usuarioActivo, isSmallDevice]);

    // Configuración de eventos globales del socket y recepción de notificaciones
    useEffect(() => {
        if (user?.organizacion) {
            socket.emit('registrar_organizacion', user.organizacion);
        }

        const handleConnect = () => {
            console.log('Socket conectado exitosamente');
            setErrorChat(null);
            if (user?.organizacion) {
                socket.emit('registrar_organizacion', user.organizacion);
            }
        };

        const handleDisconnect = () => {
            console.log('Socket desconectado');
        };

        // 1. Recepción en tiempo real para la sala de conversación activa
        const handleChatMensaje = (data) => {
            if (!data) return;
            const actualChatId = idChatRef.current;
            const actualUsuarioActivo = usuarioActivoRef.current;

            const perteneceAlChat =
                (data?.id_chat && actualChatId && data.id_chat === actualChatId) ||
                (actualUsuarioActivo && (data?.id_emisor === actualUsuarioActivo || data?.id_receptor === actualUsuarioActivo));

            if (perteneceAlChat) {
                setMensajes((prevMensajes) => {
                    if (data?.id && prevMensajes.some((m) => m?.id === data.id)) {
                        return prevMensajes;
                    }
                    return [...prevMensajes, data];
                });

                // Si el mensaje viene del contacto con quien estamos conversando, asegurar que quede marcado como leído
                if (actualUsuarioActivo && data?.id_emisor === actualUsuarioActivo) {
                    setNoLeidosPorOrg((prev) => {
                        if (!prev[actualUsuarioActivo]) return prev;
                        const copia = { ...prev };
                        delete copia[actualUsuarioActivo];
                        return copia;
                    });
                    window.dispatchEvent(new CustomEvent('cgtham_mensajes_leidos', { detail: { id_organizacion: actualUsuarioActivo } }));
                }
            }
        };

        // 2. Recepción de notificaciones institucionales para contactos no activos
        const handleNotificacion = (data) => {
            if (!data) return;
            const actualUsuarioActivo = usuarioActivoRef.current;

            // Si el mensaje proviene del contacto que ya tenemos en pantalla, descartar alerta
            if (actualUsuarioActivo && data?.id_emisor === actualUsuarioActivo) {
                window.dispatchEvent(new CustomEvent('cgtham_mensajes_leidos', { detail: { id_organizacion: actualUsuarioActivo } }));
                return;
            }

            const idRec = String(data?.id_receptor || '').toLowerCase().trim();
            const miOrg = String(user?.organizacion || '').toLowerCase().trim();
            const idEm = String(data?.id_emisor || '').toLowerCase().trim();

            // Solo alertar si el mensaje es para nosotros y proviene de otra entidad
            if (idRec && miOrg && idRec === miOrg && idEm !== miOrg) {
                setNoLeidosPorOrg((prev) => {
                    const conteoActual = prev[data.id_emisor] || 0;
                    const nuevo = { ...prev, [data.id_emisor]: conteoActual + 1 };
                    window.dispatchEvent(new CustomEvent('cgtham_actualizar_no_leidos', { detail: { noLeidosPorOrg: nuevo } }));
                    return nuevo;
                });

                // Notificación visual flotante (Toast)
                const remitente = organizacionesRef.current?.find((o) => o.id === data.id_emisor);
                const nombreRemitente = remitente?.nombre_comercial || 'Organización';
                const contenidoTexto = data?.contenido || data?.message || 'Nuevo mensaje institucional';

                setToastNotificacion({
                    id_emisor: data.id_emisor,
                    nombre: nombreRemitente,
                    texto: contenidoTexto
                });

                if (timerToastRef.current) {
                    clearTimeout(timerToastRef.current);
                }
                timerToastRef.current = setTimeout(() => {
                    setToastNotificacion(null);
                }, 5000);
            }
        };

        const handleChatError = (errorData) => {
            console.error('Error de socket recibido:', errorData);
            setErrorChat(errorData?.contenido || 'No se pudo enviar el mensaje.');
            setEnviando(false);
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('chat', handleChatMensaje);
        socket.on('notificacion_mensaje', handleNotificacion);
        socket.on('chat_error', handleChatError);

        return () => {
            socket.off('chat', handleChatMensaje);
            socket.off('notificacion_mensaje', handleNotificacion);
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('chat_error', handleChatError);
            if (timerToastRef.current) {
                clearTimeout(timerToastRef.current);
            }
        };
    }, [user?.organizacion]);

    // Handshake de la sala del socket para la organización autenticada
    useEffect(() => {
        if (!user?.organizacion) return;
        const handleRoomResponse = (data) => {
            if (data?.chat_id) {
                setIdChat(data.chat_id);
            }
            if (data?.data && Array.isArray(data.data)) {
                setMensajes(data.data);
            }
            setCargandoHistorial(false);
        };

        socket.on(user.organizacion, handleRoomResponse);
        return () => {
            socket.off(user.organizacion, handleRoomResponse);
        };
    }, [user?.organizacion]);

    // Activación de un contacto del directorio
    useEffect(() => {
        if (!usuarioActivo) {
            setOrganizacion(null);
            setMensajes([]);
            setIdChat('');
            setCargandoHistorial(false);
            setErrorChat(null);
            return;
        }

        // Limpiar contador de no leídos para este contacto y sincronizar con el NavBar
        setNoLeidosPorOrg((prev) => {
            const copia = { ...prev };
            delete copia[usuarioActivo];
            return copia;
        });
        window.dispatchEvent(new CustomEvent('cgtham_mensajes_leidos', { detail: { id_organizacion: usuarioActivo } }));

        if (toastNotificacion?.id_emisor === usuarioActivo) {
            setToastNotificacion(null);
        }

        const activarContacto = async () => {
            try {
                window.scrollTo(0, 0);
                setCargandoHistorial(true);
                setErrorChat(null);
                const data = await getOrganizacion(usuarioActivo);
                setOrganizacion(data);
                setMensajes([]);
                socket.emit('join', { id_emisor: user?.organizacion, id_receptor: usuarioActivo });
            } catch (err) {
                console.error("Error al obtener organización seleccionada:", err);
                setCargandoHistorial(false);
            }
        };

        activarContacto();
    }, [usuarioActivo, user?.organizacion]);

    // Envío seguro de mensaje
    const handleEnviarMensaje = () => {
        const textoLimpio = mensaje.trim();
        if (!textoLimpio || enviando) return;

        if (textoLimpio.length > MAX_CARACTERES) {
            setErrorChat(`El mensaje excede los ${MAX_CARACTERES} caracteres permitidos.`);
            return;
        }

        if (!idChat) {
            console.warn("Aún no se ha establecido el ID de la sala de conversación.");
            return;
        }

        setEnviando(true);
        setErrorChat(null);

        socket.emit('chat', {
            message: textoLimpio,
            room: idChat,
            id_emisor: user.organizacion,
            id_receptor: usuarioActivo
        });

        setMensaje('');

        setTimeout(() => {
            setEnviando(false);
            inputMensajeRef.current?.focus({ preventScroll: true });
        }, 150);
    };

    // Función auxiliar para parsear fechas de forma segura respetando UTC del servidor
    const parsearFechaSegura = (fechaStr) => {
        if (!fechaStr) return null;
        if (fechaStr instanceof Date) return isNaN(fechaStr.getTime()) ? null : fechaStr;
        let str = String(fechaStr).trim();
        if (!str.endsWith('Z') && !/[+-]\d{2}(:\d{2})?$/.test(str)) {
            str = str.replace(' ', 'T') + 'Z';
        }
        const f = new Date(str);
        return isNaN(f.getTime()) ? null : f;
    };

    // Formateadores de fecha y hora en español institucional
    const formatearHora = (fechaStr) => {
        const fecha = parsearFechaSegura(fechaStr);
        if (!fecha) return '';
        try {
            return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        } catch {
            return '';
        }
    };

    const formatearFechaCabecera = (fechaStr) => {
        const fecha = parsearFechaSegura(fechaStr);
        if (!fecha) return '';
        try {
            const hoy = new Date();
            const ayer = new Date(hoy);
            ayer.setDate(hoy.getDate() - 1);

            const esMismoDia = (d1, d2) =>
                d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();

            if (esMismoDia(fecha, hoy)) return 'Hoy';
            if (esMismoDia(fecha, ayer)) return 'Ayer';

            const textoFecha = fecha.toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            return textoFecha.charAt(0).toUpperCase() + textoFecha.slice(1);
        } catch {
            return '';
        }
    };

    const obtenerClaveDia = (fechaStr) => {
        const f = parsearFechaSegura(fechaStr);
        return f ? f.toDateString() : '';
    };

    // Directorio filtrado por búsqueda y categoría
    const organizacionesFiltradas = useMemo(() => {
        return organizaciones
            ?.filter(o => !user?.organizacion || o.id !== user?.organizacion)
            ?.filter(o => o.tipo !== 'Comité' && !o.nombre_comercial?.toLowerCase().includes('cgtham'))
            ?.filter(o => {
                if (filtroTipo === 'TODAS') return true;
                if (filtroTipo === 'Empresa') return o.tipo === 'Empresa';
                if (filtroTipo === 'Escuela') return o.tipo === 'Escuela';
                if (filtroTipo === 'Cámara') return o.tipo?.toLowerCase().includes('cámara');
                return true;
            })
            ?.filter(o => o.nombre_comercial?.toLowerCase().includes(busqueda.toLowerCase()));
    }, [organizaciones, user?.organizacion, filtroTipo, busqueda]);

    // Componente auxiliar para fallback de avatar
    const AvatarConFallback = ({ src, nombre, className, size = 44 }) => {
        const [error, setError] = useState(false);
        const inicial = nombre ? nombre.trim().charAt(0).toUpperCase() : 'O';

        if (!src || error) {
            return (
                <div
                    className={className ? `${className} contacto-avatar-fallback` : 'contacto-avatar-fallback'}
                    style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%' }}
                >
                    {inicial}
                </div>
            );
        }

        return (
            <img
                src={src}
                alt={nombre || 'Logo'}
                onError={() => setError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        );
    };

    return (
        <div className="pagina-mensajes-contenedor">
            <NavBarAutenticado />

            <div className="contenedor-mensajeria-master">
                {/* ==========================================================
                   PANEL IZQUIERDO: DIRECTORIO / LISTA DE CONTACTOS
                   ========================================================== */}
                {(!isSmallDevice || !usuarioActivo) && (
                    <aside className="panel-contactos-lateral">
                        {/* Cabecera del directorio */}
                        <div className="contactos-header">
                            <div className="contactos-header-titulos">
                                <h2>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    MENSAJES
                                </h2>
                                <span>Directorio Institucional CGTHAM</span>
                            </div>
                            <span className="badge-conteo-contactos" title="Organizaciones disponibles">
                                {organizacionesFiltradas.length}
                            </span>
                        </div>

                        {/* Buscador y chips de filtro */}
                        <div className="contactos-filtros-contenedor">
                            <div className="buscador-contactos-caja">
                                <svg className="buscador-icono-lupa" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar organización o empresa..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                                {busqueda && (
                                    <button
                                        type="button"
                                        className="btn-limpiar-busqueda"
                                        onClick={() => setBusqueda('')}
                                        title="Borrar búsqueda"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <div className="chips-categorias">
                                <button
                                    type="button"
                                    className={`chip-filtro ${filtroTipo === 'TODAS' ? 'chip-activo' : ''}`}
                                    onClick={() => setFiltroTipo('TODAS')}
                                >
                                    Todas
                                </button>
                                <button
                                    type="button"
                                    className={`chip-filtro ${filtroTipo === 'Empresa' ? 'chip-activo' : ''}`}
                                    onClick={() => setFiltroTipo('Empresa')}
                                >
                                    Empresas
                                </button>
                                <button
                                    type="button"
                                    className={`chip-filtro ${filtroTipo === 'Escuela' ? 'chip-activo' : ''}`}
                                    onClick={() => setFiltroTipo('Escuela')}
                                >
                                    Escuelas
                                </button>
                                <button
                                    type="button"
                                    className={`chip-filtro ${filtroTipo === 'Cámara' ? 'chip-activo' : ''}`}
                                    onClick={() => setFiltroTipo('Cámara')}
                                >
                                    Cámaras
                                </button>
                            </div>
                        </div>

                        {/* Lista de organizaciones */}
                        <div className="contactos-lista">
                            {cargandoOrganizaciones ? (
                                <div className="contactos-vacio">
                                    <div className="spinner-circulo-moderno" style={{ width: '22px', height: '22px' }}></div>
                                    <span>Cargando directorio...</span>
                                </div>
                            ) : organizacionesFiltradas.length === 0 ? (
                                <div className="contactos-vacio">
                                    <p>No se encontraron organizaciones con los criterios seleccionados.</p>
                                </div>
                            ) : (
                                organizacionesFiltradas.map((org) => {
                                    const esActivo = usuarioActivo === org.id;
                                    const conteoNoLeidos = noLeidosPorOrg[org.id] || 0;
                                    const tieneNoLeidos = conteoNoLeidos > 0;

                                    return (
                                        <div
                                            key={org.id}
                                            className={`contacto-item ${esActivo ? 'contacto-activo' : ''} ${tieneNoLeidos ? 'contacto-con-noleidos' : ''}`}
                                            onClick={() => {
                                                setUsuarioActivo(org.id);
                                                setNoLeidosPorOrg((prev) => {
                                                    const copia = { ...prev };
                                                    delete copia[org.id];
                                                    return copia;
                                                });
                                                window.dispatchEvent(new CustomEvent('cgtham_mensajes_leidos', { detail: { id_organizacion: org.id } }));
                                            }}
                                        >
                                            <div className="contacto-avatar-box">
                                                <AvatarConFallback src={org.logo} nombre={org.nombre_comercial} size={44} />
                                            </div>
                                            <div className="contacto-info">
                                                <h4 className="contacto-nombre" title={org.nombre_comercial}>
                                                    {org.nombre_comercial}
                                                </h4>
                                                <div className="contacto-meta">
                                                    <span className="badge-tipo-contacto">
                                                        {org.tipo || 'Institución'}
                                                    </span>
                                                    {tieneNoLeidos ? (
                                                        <span
                                                            className="badge-contacto-no-leido"
                                                            title={`${conteoNoLeidos} mensaje(s) nuevo(s)`}
                                                        >
                                                            {conteoNoLeidos > 99 ? '99+' : conteoNoLeidos}
                                                        </span>
                                                    ) : (
                                                        <span className="contacto-indicador-chat">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="9 18 15 12 9 6"></polyline>
                                                            </svg>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </aside>
                )}

                {/* ==========================================================
                   PANEL DERECHO: CONVERSACIÓN ACTIVA O ESTADO VACÍO
                   ========================================================== */}
                {usuarioActivo ? (
                    <main className="panel-conversacion-activo">
                        {/* Cabecera del chat */}
                        <header className="chat-header-moderno">
                            <div className="chat-header-info">
                                {isSmallDevice && (
                                    <button
                                        type="button"
                                        className="btn-volver-contactos"
                                        onClick={() => setUsuarioActivo(null)}
                                        title="Volver al directorio"
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                )}
                                <div
                                    className="chat-header-avatar"
                                    onClick={() => organizacion?.id && navigate(`/organizacion/${organizacion.id}`)}
                                    title="Ver perfil institucional"
                                >
                                    <AvatarConFallback
                                        src={organizacion?.logo}
                                        nombre={organizacion?.nombre_comercial}
                                        size={46}
                                    />
                                </div>
                                <div className="chat-header-titulos">
                                    <div className="chat-header-nombre-fila">
                                        <h1
                                            onClick={() => organizacion?.id && navigate(`/organizacion/${organizacion.id}`)}
                                            title="Ir al perfil de la organización"
                                        >
                                            {organizacion?.nombre_comercial || 'Cargando organización...'}
                                        </h1>
                                        {organizacion?.tipo && (
                                            <span className="badge-tipo-chat">
                                                {organizacion.tipo}
                                            </span>
                                        )}
                                    </div>
                                    <div className="chat-header-estado">
                                        <span className="punto-estado-activo"></span>
                                        <span>Canal Institucional Seguro</span>
                                    </div>
                                </div>
                            </div>

                            <div className="chat-header-acciones">
                                {organizacion?.id && (
                                    <button
                                        type="button"
                                        className="btn-accion-perfil"
                                        onClick={() => navigate(`/organizacion/${organizacion.id}`)}
                                        title="Ver perfil completo"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        <span>Ver Perfil</span>
                                    </button>
                                )}
                            </div>
                        </header>

                        {/* Alerta de error de envío */}
                        {errorChat && (
                            <div className="chat-alerta-error">
                                <span>{errorChat}</span>
                                <button type="button" onClick={() => setErrorChat(null)}>✕</button>
                            </div>
                        )}

                        {/* Cuerpo de conversación con scroll automático y divisores de fecha */}
                        <div className="chat-body-moderno" ref={chatBodyRef}>
                            {cargandoHistorial ? (
                                <div className="chat-spinner-box">
                                    <div className="spinner-circulo-moderno"></div>
                                    <span>Cargando conversación...</span>
                                </div>
                            ) : mensajes.length === 0 ? (
                                <div className="tarjeta-bienvenida-chat">
                                    <div className="bienvenida-icono">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#41431B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                        </svg>
                                    </div>
                                    <h3>Inicia la conversación institucional</h3>
                                    <p>
                                        Establece comunicación directa con <strong>{organizacion?.nombre_comercial || 'esta organización'}</strong> para coordinar convenios, visitas industriales, eventos o proyectos colaborativos.
                                    </p>
                                    <span>Los mensajes se transmiten en tiempo real y quedan respaldados para ambas entidades.</span>
                                </div>
                            ) : (
                                mensajes.map((msg, index) => {
                                    const texto = msg?.contenido || msg?.message;
                                    if (!texto) return null;
                                    const esEmisor = msg?.id_emisor === user?.organizacion;

                                    // Verificación de cambio de día para renderizar divisor de fecha
                                    const diaActual = obtenerClaveDia(msg?.fecha_envio);
                                    const diaAnterior = index > 0 ? obtenerClaveDia(mensajes[index - 1]?.fecha_envio) : null;
                                    const mostrarDivisor = diaActual && diaActual !== diaAnterior;

                                    return (
                                        <div key={msg?.id || index}>
                                            {mostrarDivisor && (
                                                <div className="divisor-fecha-chat">
                                                    <span>{formatearFechaCabecera(msg.fecha_envio)}</span>
                                                </div>
                                            )}
                                            <div className={`fila-mensaje-moderna ${esEmisor ? 'fila-propia' : 'fila-ajena'}`}>
                                                <div className={`burbuja-moderna ${esEmisor ? 'burbuja-propia' : 'burbuja-ajena'}`}>
                                                    <div className="burbuja-texto">{texto}</div>
                                                    <div className="burbuja-meta">
                                                        <span className="burbuja-hora">
                                                            {formatearHora(msg?.fecha_envio)}
                                                        </span>
                                                        {esEmisor && (
                                                            <svg className="burbuja-check-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={mensajesEndRef} />
                        </div>

                        {/* Pie de conversación (Input y botón de envío) */}
                        <footer className="chat-footer-moderno">
                            <div className="chat-input-caja">
                                <input
                                    ref={inputMensajeRef}
                                    type="text"
                                    placeholder={!idChat ? "Conectando al canal institucional..." : "Escribe un mensaje institucional..."}
                                    value={mensaje}
                                    maxLength={MAX_CARACTERES}
                                    disabled={enviando || !idChat}
                                    onChange={(e) => setMensaje(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleEnviarMensaje();
                                        }
                                    }}
                                />
                                {mensaje.length > 1800 && (
                                    <span className={`chat-contador-caracteres ${mensaje.length >= MAX_CARACTERES ? 'limite-cercano' : ''}`}>
                                        {mensaje.length}/{MAX_CARACTERES}
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                className="btn-enviar-chat-moderno"
                                disabled={enviando || !mensaje.trim() || !idChat}
                                onClick={handleEnviarMensaje}
                                title="Enviar mensaje (Enter)"
                            >
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </footer>
                    </main>
                ) : (
                    /* ==========================================================
                       ESTADO VACÍO GENERAL (SIN CONTACTO SELECCIONADO)
                       ========================================================== */
                    <main className="chat-vacio-general">
                        <div className="chat-vacio-tarjeta">
                            <div className="chat-vacio-icono-box">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    <line x1="8" y1="9" x2="16" y2="9"></line>
                                    <line x1="8" y1="13" x2="14" y2="13"></line>
                                </svg>
                            </div>
                            <h3>Bandeja de Mensajería Institucional</h3>
                            <p>
                                Selecciona una organización del directorio lateral para iniciar una comunicación directa, privada y segura entre entidades vinculadas a la CGTHAM.
                            </p>
                            <span className="chat-vacio-tip">
                                💡 Puedes buscar por nombre o filtrar por Empresas, Escuelas y Cámaras.
                            </span>
                        </div>
                    </main>
                )}
            </div>

            {/* ==========================================================
               NOTIFICACIÓN FLOTANTE (TOAST) EN TIEMPO REAL
               ========================================================== */}
            {toastNotificacion && (
                <aside className="toast-notificacion-contenedor" role="alert">
                    <div className="toast-notificacion-icono">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div className="toast-notificacion-cuerpo">
                        <span className="toast-notificacion-emisor">{toastNotificacion.nombre}</span>
                        <span className="toast-notificacion-texto">{toastNotificacion.texto}</span>
                        <div className="toast-notificacion-acciones">
                            <button
                                type="button"
                                className="btn-toast-ver"
                                onClick={() => {
                                    setUsuarioActivo(toastNotificacion.id_emisor);
                                    setToastNotificacion(null);
                                }}
                            >
                                Ver conversación
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn-toast-cerrar"
                        onClick={() => setToastNotificacion(null)}
                        title="Cerrar notificación"
                    >
                        ✕
                    </button>
                </aside>
            )}
        </div>
    );
}
