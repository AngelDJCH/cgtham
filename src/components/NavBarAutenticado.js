import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@uidotdev/usehooks';
import { logout } from '../services/Cuenta';
import { useAuth } from '../hooks/useAuth';
import { getLogoByIdOrganizacion, getOrganizacionFast } from '../services/Organizacion';
import Calendario from './Calendario';
import socket from '../services/socket';
import '../styles/navbar.css';
import '../styles/calendario.css';

const LOGO_CGTHAM = 'https://res.cloudinary.com/dfdfauyvo/image/upload/v1780874578/Gemini_Generated_Image_l40lrul40lrul40l_rx9sd3.png';
const NOMBRE_SISTEMA = 'CGTHAM';
const ICONO_CALENDARIO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ0MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1jbG9jayBwcmV2aWV3LWljb24iPjxwYXRoIGQ9Ik0xNiAxNHYyLjJsMS42IDEiLz48cGF0aCBkPSJNMTYgMnYzIi8+PHBhdGggZD0iTTIxIDcuMzM4VjVhMiAyIDAgMDAtMi0ySDVhMiAyIDAgMDAtMiAydjE0YTIgMiAwIDAwMiAyaDIuMzM4Ii8+PHBhdGggZD0iTTMgOWg1Ljg1OSIvPjxwYXRoIGQ9Ik04IDJ2MyIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiLz48L3N2Zz4=';
const ICONO_MENSAJES = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tZXNzYWdlLWNpcmNsZS1pY29uIGx1Y2lkZS1tZXNzYWdlLWNpcmNsZSI+PHBhdGggZD0iTTIuOTkyIDE2LjM0MmEyIDIgMCAwIDEgLjA5NCAxLjE2N2wtMS4wNjUgMy4yOWExIDEgMCAwIDAgMS4yMzYgMS4xNjhsMy40MTMtLjk5OGEyIDIgMCAwIDEgMS4wOTkuMDkyIDEwIDEwIDAgMSAwLTQuNzc3LTQuNzE5Ii8+PC9zdmc+';

const ESTILO_AVATAR_IMAGEN = {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '2px solid #AEB784',
    objectFit: 'cover',
    backgroundColor: '#FFFFFF',
    flexShrink: 0
};

const ESTILO_AVATAR_INICIAL = {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '2px solid #AEB784',
    backgroundColor: '#41431B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFD400',
    fontWeight: 'bold',
    fontSize: '15px',
    flexShrink: 0
};

function obtenerInicialCuenta(nombreOrganizacion, correo) {
    if (nombreOrganizacion) {
        return nombreOrganizacion[0].toUpperCase();
    }
    if (correo) {
        return correo[0].toUpperCase();
    }
    return 'U';
}

function aplicarDatosOrganizacion(org, setLogo, setNombreOrganizacion, setImgError) {
    if (!org) return;
    if (org.logo) {
        setLogo(org.logo);
        setImgError(false);
    }
    const nombreDetectado = org.nombre ?? org.nombre_comercial;
    if (nombreDetectado) {
        setNombreOrganizacion(nombreDetectado);
    }
}

async function sincronizarDatosOrganizacion(idOrganizacion, setLogo, setNombreOrganizacion, setImgError) {
    if (!idOrganizacion) return;

    try {
        const res = await getOrganizacionFast(idOrganizacion);
        const org = res?.organizacion ?? res;
        aplicarDatosOrganizacion(org, setLogo, setNombreOrganizacion, setImgError);
    } catch (e) {
        console.error('Error al obtener datos de organización:', e);
    }

    try {
        const log = await getLogoByIdOrganizacion(idOrganizacion);
        if (log) {
            setLogo(log);
            setImgError(false);
        }
    } catch (e) {
        console.error('Error al obtener logo:', e);
    }
}

function obtenerOpcionesEscritorio(tipo, esAdmin) {
    const esEmpresarial = tipo === 'Empresa' || tipo === 'Cámara de Comercio';
    const esEscuela = tipo === 'Escuela';

    const catalogo = [
        { id: 'inicio', etiqueta: 'Inicio', ruta: '/home', visible: true },
        { id: 'eventos', etiqueta: 'Eventos', ruta: '/eventos', visible: esEscuela },
        { id: 'ofertas', etiqueta: 'Ofertas Laborales', ruta: '/ofertaslaborales', visible: esEmpresarial },
        { id: 'convenios', etiqueta: 'Convenios', ruta: '/convenios', visible: esEmpresarial },
        { id: 'afiliaciones', etiqueta: 'Afiliaciones', ruta: '/afiliaciones', visible: esEmpresarial },
        { id: 'visitas', etiqueta: 'Visitas', ruta: '/visitas', visible: tipo === 'Empresa' },
        { id: 'organizaciones', etiqueta: 'Organizaciones', ruta: '/organizaciones', visible: Boolean(esAdmin) },
        { id: 'cursos', etiqueta: 'Cursos', ruta: '/cursos', visible: esEscuela },
        { id: 'historicos', etiqueta: 'Historicos', ruta: '/historicos', visible: Boolean(esAdmin) },
        { id: 'comentarios', etiqueta: 'Comentarios', ruta: '/comentarios', visible: Boolean(esAdmin) }
    ];

    return catalogo.filter((item) => item.visible);
}

function obtenerOpcionesEmergentes(isMediumDevice, tipo, esAdmin, totalNoLeidos = 0, totalNotificaciones = 0) {
    const esEmpresarial = tipo === 'Empresa' || tipo === 'Cámara de Comercio';
    const esMovilOAdmin = Boolean(isMediumDevice || esAdmin);
    const esCamara = Boolean(tipo?.includes('Cámara de Comercio'));

    const catalogo = [
        { id: 'm-inicio', etiqueta: 'Inicio', ruta: '/home', visible: Boolean(isMediumDevice) },
        { 
            id: 'm-notificaciones', 
            etiqueta: totalNotificaciones > 0 ? `Notificaciones (${totalNotificaciones})` : 'Notificaciones', 
            accion: 'notificaciones', 
            visible: Boolean(isMediumDevice) 
        },
        { id: 'm-calendario', etiqueta: 'Calendario', accion: 'calendario', visible: Boolean(isMediumDevice) },
        { 
            id: 'm-mensajes', 
            etiqueta: totalNoLeidos > 0 ? `Mensajes (${totalNoLeidos})` : 'Mensajes', 
            ruta: '/mensajes', 
            visible: esMovilOAdmin 
        },
        { id: 'm-inscripciones', etiqueta: 'Inscripciones', ruta: '/inscripciones', visible: Boolean(isMediumDevice && esEmpresarial) },
        { id: 'm-eventos', etiqueta: 'Eventos', ruta: '/eventos', visible: esMovilOAdmin },
        { id: 'm-cursos', etiqueta: 'Cursos', ruta: '/cursos', visible: esMovilOAdmin },
        { id: 'm-ofertas', etiqueta: 'Ofertas Laborales', ruta: '/ofertaslaborales', visible: esMovilOAdmin },
        { id: 'm-organizaciones', etiqueta: 'Organizaciones', ruta: '/organizaciones', visible: Boolean(esAdmin) },
        { id: 'm-mi-org', etiqueta: 'Mi Organización', accion: 'mi-organizacion', visible: !esAdmin },
        { id: 'm-historicos', etiqueta: 'Historicos', ruta: '/historicos', visible: Boolean(isMediumDevice && esAdmin) },
        { id: 'm-comentarios', etiqueta: 'Comentarios', ruta: '/comentarios', visible: esMovilOAdmin },
        { id: 'm-convenios', etiqueta: 'Convenios', ruta: '/convenios', visible: esMovilOAdmin },
        { id: 'm-visitas', etiqueta: 'Visitas', ruta: '/visitas', visible: esMovilOAdmin },
        { id: 'm-afiliaciones', etiqueta: 'Afiliaciones', ruta: '/afiliaciones', visible: esCamara }
    ];

    return catalogo.filter((item) => item.visible);
}

function AvatarCuenta({ esAdmin, logoOrganizacion, imgError, setImgError, nombreOrganizacion, correo }) {
    if (esAdmin) {
        return (
            <img
                src={LOGO_CGTHAM}
                alt="Administrador CGTHAM"
                style={ESTILO_AVATAR_IMAGEN}
            />
        );
    }

    if (logoOrganizacion && !imgError) {
        const textoAlt = nombreOrganizacion?.trim() ? nombreOrganizacion : 'Perfil';
        return (
            <img
                src={logoOrganizacion}
                alt={textoAlt}
                onError={() => setImgError(true)}
                style={ESTILO_AVATAR_IMAGEN}
            />
        );
    }

    return (
        <div style={ESTILO_AVATAR_INICIAL}>
            {obtenerInicialCuenta(nombreOrganizacion, correo)}
        </div>
    );
}

AvatarCuenta.propTypes = {
    esAdmin: PropTypes.bool,
    logoOrganizacion: PropTypes.string,
    imgError: PropTypes.bool,
    setImgError: PropTypes.func.isRequired,
    nombreOrganizacion: PropTypes.string,
    correo: PropTypes.string
};

export default function NavBarAutenticado() {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openNotificaciones, setOpenNotificaciones] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const [logoOrganizacion, setLogo] = useState(user?.foto ?? '');
    const [nombreOrganizacion, setNombreOrganizacion] = useState('');
    const [imgError, setImgError] = useState(false);
    const isMediumDevice = useMediaQuery('(max-width : 678px) or (max-width : 1024px)');
    const esAdmin = Boolean(user?.rol?.includes('ADMIN_SYS'));

    // Estado reactivo de mensajes no leídos por organización
    const [noLeidosPorOrg, setNoLeidosPorOrg] = useState(() => {
        try {
            // Limpieza preventiva de residuos fantasmas
            sessionStorage.removeItem('cgtham_no_leidos_org');
            return {};
        } catch {
            return {};
        }
    });

    // Historial dinámico de notificaciones del sistema y movimientos
    const [notificaciones, setNotificaciones] = useState(() => {
        try {
            const guardadas = sessionStorage.getItem('cgtham_notificaciones_historial');
            return guardadas ? JSON.parse(guardadas) : [];
        } catch {
            return [];
        }
    });

    const totalNoLeidos = useMemo(() => {
        return Object.values(noLeidosPorOrg).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    }, [noLeidosPorOrg]);

    const totalNotificacionesNoLeidas = useMemo(() => {
        return notificaciones.filter((n) => !n.leido).length;
    }, [notificaciones]);

    useEffect(() => {
        try {
            sessionStorage.setItem('cgtham_no_leidos_org', JSON.stringify(noLeidosPorOrg));
        } catch (e) {
            console.error('Error guardando no leídos en sessionStorage:', e);
        }
    }, [noLeidosPorOrg]);

    useEffect(() => {
        try {
            sessionStorage.setItem('cgtham_notificaciones_historial', JSON.stringify(notificaciones));
        } catch (e) {
            console.error('Error guardando notificaciones en sessionStorage:', e);
        }
    }, [notificaciones]);

    // Conexión y escucha en tiempo real del canal institucional para notificaciones
    useEffect(() => {
        if (!user?.organizacion) return;

        socket.emit('registrar_organizacion', user.organizacion);

        const handleConnect = () => {
            socket.emit('registrar_organizacion', user.organizacion);
        };

        const handleNotificacionMensaje = async (nuevoMensaje) => {
            if (!nuevoMensaje || !nuevoMensaje.id_emisor) return;

            const idReceptor = String(nuevoMensaje.id_receptor || '').toLowerCase().trim();
            const miOrg = String(user.organizacion || '').toLowerCase().trim();
            const idEmisor = String(nuevoMensaje.id_emisor || '').toLowerCase().trim();

            // ESTRICTO: Solo si va dirigido a nuestra organización y NO fue enviado por nosotros
            if (idReceptor && miOrg && idReceptor === miOrg && idEmisor !== miOrg) {
                // Actualizar contador individual por organización
                setNoLeidosPorOrg((prev) => {
                    const actual = prev[nuevoMensaje.id_emisor] || 0;
                    return {
                        ...prev,
                        [nuevoMensaje.id_emisor]: actual + 1
                    };
                });

                // Obtener nombre del emisor para notificación enriquecida
                let nombreEmisor = 'Organización';
                try {
                    const orgData = await getOrganizacionFast(nuevoMensaje.id_emisor);
                    nombreEmisor = orgData?.organizacion?.nombre_comercial || orgData?.nombre_comercial || 'Organización';
                } catch {
                    nombreEmisor = 'Organización';
                }

                const ahora = new Date();
                const nuevaNotif = {
                    id: `msg_${nuevoMensaje.id || Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                    tipo: 'mensaje',
                    titulo: `Mensaje de ${nombreEmisor}`,
                    detalle: nuevoMensaje.contenido || 'Has recibido un nuevo mensaje institucional.',
                    id_emisor: nuevoMensaje.id_emisor,
                    ruta: '/mensajes',
                    fecha: ahora.toISOString(),
                    tiempo: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                    leido: false
                };

                setNotificaciones((prev) => {
                    const filtradas = prev.filter((n) => n.id !== nuevaNotif.id);
                    return [nuevaNotif, ...filtradas].slice(0, 35);
                });
            }
        };

        const handleMensajesLeidos = (e) => {
            const idOrg = e.detail?.id_organizacion;
            if (!idOrg) return;
            setNoLeidosPorOrg((prev) => {
                const copia = { ...prev };
                delete copia[idOrg];
                return copia;
            });
            // Marcar como leídas las notificaciones asociadas a esa organización
            setNotificaciones((prev) =>
                prev.map((n) => (n.id_emisor === idOrg ? { ...n, leido: true } : n))
            );
        };

        const handleActualizarNoLeidos = (e) => {
            if (e.detail?.noLeidosPorOrg) {
                setNoLeidosPorOrg(e.detail.noLeidosPorOrg);
            }
        };

        // Escucha de notificaciones personalizadas de cualquier módulo (eventos, cursos, convenios)
        const handleNotificacionCustom = (e) => {
            const data = e.detail;
            if (!data) return;
            const ahora = new Date();
            const nuevaNotif = {
                id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                tipo: data.tipo || 'sistema',
                titulo: data.titulo || 'Notificación del sistema',
                detalle: data.detalle || '',
                ruta: data.ruta || '/home',
                fecha: ahora.toISOString(),
                tiempo: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                leido: false
            };
            setNotificaciones((prev) => [nuevaNotif, ...prev].slice(0, 35));
        };

        socket.on('connect', handleConnect);
        // ÚNICAMENTE escuchar notificacion_mensaje: emitido por el servidor solo al receptor
        socket.on('notificacion_mensaje', handleNotificacionMensaje);
        window.addEventListener('cgtham_mensajes_leidos', handleMensajesLeidos);
        window.addEventListener('cgtham_actualizar_no_leidos', handleActualizarNoLeidos);
        window.addEventListener('cgtham_nueva_notificacion', handleNotificacionCustom);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('notificacion_mensaje', handleNotificacionMensaje);
            window.removeEventListener('cgtham_mensajes_leidos', handleMensajesLeidos);
            window.removeEventListener('cgtham_actualizar_no_leidos', handleActualizarNoLeidos);
            window.removeEventListener('cgtham_nueva_notificacion', handleNotificacionCustom);
        };
    }, [user?.organizacion]);

    useEffect(() => {
        const handleLogoActualizado = (e) => {
            if (e.detail?.logo) {
                setLogo(e.detail.logo);
                setImgError(false);
            }
        };
        window.addEventListener('organizacion_logo_actualizado', handleLogoActualizado);
        return () => {
            window.removeEventListener('organizacion_logo_actualizado', handleLogoActualizado);
        };
    }, []);

    useEffect(() => {
        if (esAdmin) {
            setLogo(LOGO_CGTHAM);
            setNombreOrganizacion('Administrador');
            setImgError(false);
            return;
        }

        if (user?.foto) {
            setLogo(user.foto);
            setImgError(false);
        }

        void sincronizarDatosOrganizacion(user?.organizacion, setLogo, setNombreOrganizacion, setImgError);
    }, [user?.organizacion, user?.foto, esAdmin]);

    const irA = (ruta) => {
        void navigate(ruta);
    };

    const marcarTodasLeidas = () => {
        setNotificaciones((prev) => prev.map((n) => ({ ...n, leido: true })));
    };

    const manejarClickNotificacion = (notif) => {
        setNotificaciones((prev) =>
            prev.map((n) => (n.id === notif.id ? { ...n, leido: true } : n))
        );
        setOpenNotificaciones(false);
        if (notif.ruta) {
            void navigate(notif.ruta);
        }
    };

    const ejecutarOpcionEmergente = (opcion) => {
        if (opcion.accion === 'calendario') {
            setOpenCalendar((prev) => !prev);
            setOpen(false);
            setOpenNotificaciones(false);
            return;
        }
        if (opcion.accion === 'notificaciones') {
            setOpenNotificaciones((prev) => !prev);
            setOpen(false);
            setOpenCalendar(false);
            return;
        }
        if (opcion.accion === 'mi-organizacion') {
            setOpen(false);
            void navigate(`/organizacion/${user?.organizacion}`);
            void navigate(0);
            return;
        }
        setOpen(false);
        void navigate(opcion.ruta);
    };

    const handleCerrarSesion = () => {
        setOpen(false);
        logout()
            .then((status) => {
                const destino = status === 204 ? '/' : '/home';
                void navigate(destino);
            })
            .catch((e) => {
                console.error('Error al cerrar sesión:', e);
                void navigate('/home');
            });
    };

    const nombreVisible = nombreOrganizacion.trim() ? nombreOrganizacion : 'Mi Cuenta';
    const etiquetaCuenta = esAdmin ? 'Administrador' : nombreVisible;
    const etiquetaCabeceraMenu = esAdmin ? 'Administrador del Sistema' : nombreVisible;
    const opcionesEscritorio = obtenerOpcionesEscritorio(user?.tipo, esAdmin);
    const opcionesEmergentes = obtenerOpcionesEmergentes(isMediumDevice, user?.tipo, esAdmin, totalNoLeidos, totalNotificacionesNoLeidas);

    return (
        <>
            <div className="navbar">
                <div className="seccion1" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '50px', height: '50px' }}>
                        <img src={LOGO_CGTHAM} alt="logo_cgtham" />
                    </div>
                    <h1>
                        <button
                            type="button"
                            className="navbar-boton-limpio"
                            onClick={() => irA('/home')}
                        >
                            {NOMBRE_SISTEMA}
                        </button>
                    </h1>
                </div>

                <div className="seccion2">
                    <ul>
                        {!isMediumDevice && opcionesEscritorio.map((item) => (
                            <li key={item.id} className="opciones">
                                <button
                                    type="button"
                                    className="navbar-boton-limpio"
                                    onClick={() => irA(item.ruta)}
                                >
                                    {item.etiqueta}
                                </button>
                            </li>
                        ))}

                        {/* Botón de Calendario */}
                        {!isMediumDevice && (
                            <li>
                                <button
                                    type="button"
                                    className="btn-accion-2"
                                    style={{ width: '40px', height: '40px', borderRadius: '100%', backgroundColor: '#41431B' }}
                                    onClick={() => {
                                        setOpenCalendar((prev) => !prev);
                                        setOpenNotificaciones(false);
                                    }}
                                    title="Calendario institucional"
                                >
                                    <img alt="Calendario" src={ICONO_CALENDARIO} />
                                </button>
                            </li>
                        )}

                        {/* Botón de Centro de Notificaciones (Campana) */}
                        <li style={{ position: 'relative' }}>
                            <button
                                type="button"
                                className={`btn-notificaciones-nav ${openNotificaciones ? 'activo' : ''}`}
                                onClick={() => {
                                    setOpenNotificaciones((prev) => !prev);
                                    setOpen(false);
                                    setOpenCalendar(false);
                                }}
                                title={totalNotificacionesNoLeidas > 0 ? `Tienes ${totalNotificacionesNoLeidas} notificación(es) nueva(s)` : "Centro de Notificaciones"}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={openNotificaciones ? '#41431B' : '#FFD400'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                                {totalNotificacionesNoLeidas > 0 && (
                                    <span className="badge-notificacion-burbuja" title={`${totalNotificacionesNoLeidas} no leída(s)`}>
                                        {totalNotificacionesNoLeidas > 99 ? '99+' : totalNotificacionesNoLeidas}
                                    </span>
                                )}
                            </button>
                        </li>

                        {/* Botón de Mensajes directos */}
                        {!isMediumDevice && (
                            <li style={{ position: 'relative' }}>
                                <button
                                    type="button"
                                    className="btn-accion-2 btn-burbuja-chat"
                                    onClick={() => irA('/mensajes')}
                                    title={totalNoLeidos > 0 ? `Tienes ${totalNoLeidos} mensaje(s) nuevo(s)` : "Mensajes"}
                                >
                                    <img alt="Mensajes" src={ICONO_MENSAJES} />
                                    {totalNoLeidos > 0 && (
                                        <span className="badge-notificacion-burbuja" title={`${totalNoLeidos} mensaje(s) nuevo(s)`}>
                                            {totalNoLeidos > 99 ? '99+' : totalNoLeidos}
                                        </span>
                                    )}
                                </button>
                            </li>
                        )}

                        {/* Perfil de Usuario y Menú */}
                        <li style={{ display: 'flex', alignItems: 'center' }}>
                            <button
                                type="button"
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    borderRadius: '25px',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => {
                                    setOpen((prev) => !prev);
                                    setOpenNotificaciones(false);
                                }}
                                title="Opciones de cuenta"
                            >
                                <span style={{
                                    fontFamily: 'Poppins',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: '#41431B',
                                    maxWidth: '140px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {etiquetaCuenta}
                                </span>
                                <AvatarCuenta
                                    esAdmin={esAdmin}
                                    logoOrganizacion={logoOrganizacion}
                                    imgError={imgError}
                                    setImgError={setImgError}
                                    nombreOrganizacion={nombreOrganizacion}
                                    correo={user?.correo}
                                />
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Menú de Opciones de Cuenta */}
                {open && (
                    <div className="opcioenes-emergentes">
                        <ul>
                            <li
                                style={{
                                    padding: '8px 12px',
                                    borderBottom: '1px solid #AEB784',
                                    marginBottom: '8px',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px'
                                }}
                            >
                                <strong style={{ fontSize: '13px', color: '#41431B', fontFamily: 'Poppins' }}>
                                    {etiquetaCabeceraMenu}
                                </strong>
                                <span style={{ fontSize: '11px', color: '#555' }}>{user?.correo}</span>
                            </li>

                            {opcionesEmergentes.map((opcion) => (
                                <li key={opcion.id} className="opciones">
                                    <button
                                        type="button"
                                        className="navbar-boton-limpio"
                                        onClick={() => ejecutarOpcionEmergente(opcion)}
                                    >
                                        {opcion.etiqueta}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    type="button"
                                    className="navbar-boton-limpio"
                                    style={{ color: '#9B2C2C', fontWeight: 700 }}
                                    onClick={handleCerrarSesion}
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Dropdown del Centro de Notificaciones */}
            {openNotificaciones && (
                <>
                    <div
                        className="notificaciones-backdrop"
                        onClick={() => setOpenNotificaciones(false)}
                    />
                    <div className="notificaciones-dropdown">
                        <div className="notificaciones-header">
                            <div className="notificaciones-header-titulo">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFD400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                                <h4>NOTIFICACIONES</h4>
                                {totalNotificacionesNoLeidas > 0 && (
                                    <span className="notificaciones-header-badge">{totalNotificacionesNoLeidas} nuevas</span>
                                )}
                            </div>
                            {notificaciones.length > 0 && (
                                <button
                                    type="button"
                                    className="notificaciones-btn-limpiar"
                                    onClick={marcarTodasLeidas}
                                >
                                    Marcar leídas
                                </button>
                            )}
                        </div>

                        <div className="notificaciones-lista">
                            {notificaciones.length === 0 ? (
                                <div className="notificaciones-vacio">
                                    <div className="notificaciones-vacio-icono">
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                        </svg>
                                    </div>
                                    <h5>Sin notificaciones nuevas</h5>
                                    <p>Te avisaremos cuando recibas mensajes, convocatorias o movimientos importantes.</p>
                                </div>
                            ) : (
                                notificaciones.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`notificacion-item ${!notif.leido ? 'no-leido' : ''}`}
                                        onClick={() => manejarClickNotificacion(notif)}
                                    >
                                        <div className={`notificacion-icono-contenedor ${notif.tipo === 'mensaje' ? 'tipo-mensaje' : 'tipo-evento'}`}>
                                            {notif.tipo === 'mensaje' ? (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                </svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                            )}
                                        </div>
                                        <div className="notificacion-cuerpo">
                                            <div className="notificacion-header-item">
                                                <h5 className="notificacion-titulo">{notif.titulo}</h5>
                                                <span className="notificacion-tiempo">{notif.tiempo}</span>
                                            </div>
                                            <p className="notificacion-detalle">{notif.detalle}</p>
                                        </div>
                                        {!notif.leido && <div className="notificacion-punto-no-leido" />}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="notificaciones-footer">
                            <button
                                type="button"
                                className="notificaciones-footer-btn"
                                onClick={() => {
                                    setOpenNotificaciones(false);
                                    irA('/mensajes');
                                }}
                            >
                                Ir al Centro de Mensajes
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Modal de Calendario */}
            {openCalendar && (
                <div className="calendario-modal-overlay">
                    <button
                        type="button"
                        className="calendario-backdrop-btn"
                        aria-label="Cerrar calendario"
                        onClick={() => setOpenCalendar(false)}
                    />
                    <div className="calendario-modal-contenedor" style={{ position: 'relative', zIndex: 1 }}>
                        <Calendario accion={setOpenCalendar} />
                    </div>
                </div>
            )}
        </>
    );
}
