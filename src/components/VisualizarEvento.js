import { useEffect, useState } from "react"
import { eventoById, findParticipantesPendientesByIdEvento, updateEventoById } from "../services/Evento"
import { useNavigate } from "react-router-dom"
import { findParticipantesByIEvento, updateInscripcionByEstado, createInscripcion, findInscripcionesByIdEvento } from "../services/Inscripcion"
import { getFotosByIdEvento, deleteFotoById, uploadFotoEvento } from "../services/Foto"
import '../styles/botones.css'
import '../styles/modal-evento.css'
import { useAuth } from "../hooks/useAuth"
import { useMediaQuery } from "@uidotdev/usehooks"
import Loader from "./Loader"
import ModalAlerta from "./ModalAlerta"
import imageCompression from "browser-image-compression"
import { SECTORES_ORGANIZACION } from "../constants/perfilesOrganizacion"

export default function VisualizarEvento(props) {
    const getFechaLocalHoy = () => {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    };
    const fechaMinima = getFechaLocalHoy();

    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const [inscripciones, setInscripciones] = useState([])
    const [evento, setEvento] = useState({
        titulo: '',
        descripcion: '',
        tipo: '',
        fecha_inicio: '',
        fecha_final: '',
        id_organizacion: '',
        limite_participantes: null,
        tipo_organizacion_permitida: 'TODAS',
        sector_permitido: 'TODOS',
        giro_permitido: 'TODOS',
        modalidad: 'PRESENCIAL'
    })
    const [mostrarAjustesAvanzados, setMostrarAjustesAvanzados] = useState(false)
    const [administrar, setAdministar] = useState(false)
    const [participantes, setParticipantes] = useState([])
    const [fotos, setFotos] = useState([])
    const [fotoSeleccionada, setFotoSeleccionada] = useState('')
    const [openInscripcion, setOpenInscripcion] = useState(false)
    const [idEvento, setIdEvento] = useState(null)
    const imgDefaultSelect = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxwYXBlci1pY29uIGx1Y2lkZS13YWxscGFwZXIiPjxwYXRoIGQ9Ik0xMiAxN3Y0Ii8+PHBhdGggZD0iTTggMjFoOCIvPjxwYXRoIGQ9Im05IDE3IDYuMS02LjFhMiAyIDAgMCAxIDIuODEuMDFMMjIgMTUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iOSIgcj0iMiIvPjxyZWN0IHg9IjIiIHk9IjMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L3N2Zz4="
    const navigate = useNavigate()

    const isSmallDevice = useMediaQuery('(max-width:768px)');
    const isMediumDevice = useMediaQuery('(max-width: 1024px)');

    const esDuenio = (user?.organizacion && evento?.id_organizacion && user.organizacion === evento.id_organizacion) || (user?.rol && user.rol.includes("ADMIN_SYS"));
    const esModoEdicion = props?.modo === 'editar' && esDuenio;

    const usuarioEsParticipanteAprobado = participantes.some(
        p => (p.id_organizacion && p.id_organizacion === user?.organizacion) || (p.id && p.id === user?.organizacion)
    );
    const usuarioEsParticipantePendiente = inscripciones.some(
        i => ((i.organizacion?.id_organizacion && i.organizacion?.id_organizacion === user?.organizacion) || (i.id_organizacion && i.id_organizacion === user?.organizacion)) && i.estado === 'PENDIENTE'
    );

    const limiteCupo = (evento?.limite_participantes !== null && evento?.limite_participantes !== undefined && evento?.limite_participantes !== '')
        ? parseInt(evento.limite_participantes)
        : null;
    const totalAprobados = participantes.length;
    const cupoLleno = limiteCupo !== null && totalAprobados >= limiteCupo;

    const perfilIncompatible = !esDuenio && evento?.tipo_organizacion_permitida && evento.tipo_organizacion_permitida !== 'TODAS' && user?.tipo && user.tipo !== evento.tipo_organizacion_permitida;

    const [alerta, setAlerta] = useState({
        abierto: false,
        tipo: 'info',
        titulo: '',
        mensaje: '',
        mostrarCancelar: false,
        textoBoton: 'ACEPTAR',
        textoCancelar: 'CANCELAR',
        onAceptar: null,
        onCancelar: null
    })

    const mostrarAlerta = ({ mensaje, tipo = 'info', titulo = '', onAceptar = null, mostrarCancelar = false, onCancelar = null, textoBoton = 'ACEPTAR', textoCancelar = 'CANCELAR' }) => {
        setAlerta({
            abierto: true,
            tipo,
            titulo: titulo || (tipo === 'error' ? 'Atención' : tipo === 'exito' ? '¡Éxito!' : 'Aviso'),
            mensaje,
            mostrarCancelar,
            textoBoton,
            textoCancelar,
            onAceptar,
            onCancelar
        })
    }

    const cerrarAlerta = () => {
        const cb = alerta.onAceptar
        setAlerta(prev => ({ ...prev, abierto: false }))
        if (cb) cb()
    }

    useEffect(() => {
        const getEvento = async () => {
            const res = await eventoById(props.id_evento)
            setEvento(res)
        }
        const participantesEvento = async () => {
            const res = await findParticipantesByIEvento(props?.id_evento)
            setParticipantes(res)
        }
        const fotosEvento = async () => {
            const res = await getFotosByIdEvento(props?.id_evento)
            const lista = Array.isArray(res) ? res : []
            setFotos(lista)
            if (lista.length > 0) {
                const primeraUrl = typeof lista[0] === 'object' ? lista[0].url_imagen : lista[0]
                setFotoSeleccionada(primeraUrl)
            } else {
                setFotoSeleccionada(imgDefaultSelect)
            }
            setLoading(false)
        }
        getEvento()
        participantesEvento()
        fotosEvento()
    }, [props?.id_evento])

    useEffect(() => {
        const cargarTodasInscripciones = async () => {
            const res = await findInscripcionesByIdEvento(props?.id_evento)
            setInscripciones(res || [])
        }
        if (props?.id_evento) {
            cargarTodasInscripciones()
        }
    }, [props?.id_evento])

    const handleUpdateEstadoById = async (id, estado) => {
        setLoading(true)
        const data = await updateInscripcionByEstado(id, estado)
        setLoading(false)
        if (data) {
            mostrarAlerta({
                tipo: 'exito',
                titulo: 'Estado Actualizado',
                mensaje: `La inscripción ha sido actualizada al estado "${estado}".`,
                onAceptar: async () => {
                    const resInsc = await findInscripcionesByIdEvento(props?.id_evento)
                    setInscripciones(resInsc || [])
                    const resParts = await findParticipantesByIEvento(props?.id_evento)
                    setParticipantes(resParts || [])
                }
            })
        } else {
            mostrarAlerta({
                tipo: 'error',
                mensaje: 'No se pudo actualizar la inscripción.'
            })
        }
    }

    const handeUpdateEvento = async () => {
        const fechaInicioStr = evento?.fecha_inicio ? evento.fecha_inicio.split('T')[0] : '';
        const fechaFinalStr = evento?.fecha_final ? evento.fecha_final.split('T')[0] : '';
        if (fechaFinalStr && fechaInicioStr && fechaFinalStr < fechaInicioStr) {
            mostrarAlerta({
                tipo: 'advertencia',
                titulo: 'Fechas Inválidas',
                mensaje: 'La fecha de finalización no puede ser anterior a la fecha de inicio.'
            });
            return;
        }
        const horaInicioStr = evento?.hora_inicio || '09:00';
        const horaFinalStr = evento?.hora_final || '18:00';
        if (fechaInicioStr === fechaFinalStr && horaInicioStr && horaFinalStr && horaFinalStr <= horaInicioStr) {
            mostrarAlerta({
                tipo: 'advertencia',
                titulo: 'Horarios Inválidos',
                mensaje: 'Si el evento inicia y concluye el mismo día, la hora de finalización debe ser posterior a la hora de inicio.'
            });
            return;
        }
        setLoading(true)
        const status = await updateEventoById({ ...evento, id_organizacion: user?.organizacion })
        setLoading(false)
        if (status === 200) {
            mostrarAlerta({
                tipo: 'exito',
                titulo: '¡Evento Actualizado!',
                mensaje: 'Los datos del evento han sido modificados exitosamente.',
                onAceptar: () => navigate(0)
            })
        } else {
            mostrarAlerta({
                tipo: 'error',
                mensaje: 'No se pudo modificar el evento. Verifica los datos.',
                onAceptar: () => navigate(0)
            })
        }
    }

    const handleSolicitarParticipacion = () => {
        if (!user?.organizacion) {
            mostrarAlerta({
                tipo: 'advertencia',
                titulo: 'Organización Requerida',
                mensaje: 'Debes iniciar sesión con una cuenta de organización para poder inscribirte a este evento.'
            })
            return
        }

        // PASO 1: Primera confirmación de participación
        mostrarAlerta({
            tipo: 'info',
            titulo: 'Confirmación de Participación',
            mensaje: `¿Deseas solicitar tu inscripción para el evento "${evento.titulo}"?`,
            mostrarCancelar: true,
            textoBoton: 'CONTINUAR',
            textoCancelar: 'CANCELAR',
            onCancelar: () => setAlerta(prev => ({ ...prev, abierto: false })),
            onAceptar: () => {
                // PASO 2: Doble confirmación obligatoria
                setTimeout(() => {
                    mostrarAlerta({
                        tipo: 'advertencia',
                        titulo: 'Doble Confirmación Requerida',
                        mensaje: 'Por favor confirma de manera definitiva el envío de tu solicitud. La organización anfitriona revisará el registro de tu institución. ¿Deseas proceder con el registro?',
                        mostrarCancelar: true,
                        textoBoton: 'SÍ, PARTICIPAR',
                        textoCancelar: 'REGRESAR',
                        onCancelar: () => setAlerta(prev => ({ ...prev, abierto: false })),
                        onAceptar: async () => {
                            setAlerta(prev => ({ ...prev, abierto: false }))
                            setLoading(true)
                            try {
                                const status = await createInscripcion(props?.id_evento || evento?.id, user.organizacion)
                                setLoading(false)
                                if (status === 201) {
                                    mostrarAlerta({
                                        tipo: 'exito',
                                        titulo: '¡Inscripción Solicitada!',
                                        mensaje: `Tu solicitud para participar en "${evento.titulo}" ha sido registrada exitosamente. Quedará en espera de aprobación por parte de los organizadores.`,
                                        textoBoton: 'ENTENDIDO',
                                        onAceptar: () => {
                                            if (props.accion) props.accion(false)
                                            navigate(0)
                                        }
                                    })
                                } else if (status === 409) {
                                    mostrarAlerta({
                                        tipo: 'advertencia',
                                        titulo: 'Registro Previo',
                                        mensaje: 'Tu organización ya se encuentra registrada o en lista de espera para este evento.'
                                    })
                                } else {
                                    mostrarAlerta({
                                        tipo: 'error',
                                        titulo: 'Error',
                                        mensaje: 'No se pudo completar el registro de participación. Intenta de nuevo más tarde.'
                                    })
                                }
                            } catch (error) {
                                setLoading(false)
                                mostrarAlerta({
                                    tipo: 'error',
                                    titulo: 'Error del Servidor',
                                    mensaje: 'Ocurrió un error inesperado al procesar tu inscripción.'
                                })
                            }
                        }
                    })
                }, 100)
            }
        })
    }

    const handleDeleteFoto = (f) => {
        if (fotos.length <= 1) {
            mostrarAlerta({
                tipo: 'advertencia',
                titulo: 'Regla de Conservación',
                mensaje: 'El evento debe conservar al menos una fotografía registrada en la plataforma.'
            })
            return
        }
        const idFoto = typeof f === 'object' ? f.id : null
        if (!idFoto) {
            mostrarAlerta({
                tipo: 'error',
                mensaje: 'No se pudo identificar el ID de la fotografía para su eliminación.'
            })
            return
        }

        mostrarAlerta({
            tipo: 'advertencia',
            titulo: '¿Eliminar fotografía?',
            mensaje: '¿Estás seguro de que deseas eliminar esta fotografía del evento? Esta acción no se puede deshacer.',
            mostrarCancelar: true,
            textoBoton: 'ELIMINAR',
            textoCancelar: 'CANCELAR',
            onCancelar: () => setAlerta(prev => ({ ...prev, abierto: false })),
            onAceptar: async () => {
                setAlerta(prev => ({ ...prev, abierto: false }))
                setLoading(true)
                const exito = await deleteFotoById(idFoto)
                if (exito) {
                    const nuevasFotos = fotos.filter(item => (typeof item === 'object' ? item.id : item) !== idFoto)
                    setFotos(nuevasFotos)
                    const urlEliminada = typeof f === 'object' ? f.url_imagen : f
                    if (fotoSeleccionada === urlEliminada && nuevasFotos.length > 0) {
                        const nextUrl = typeof nuevasFotos[0] === 'object' ? nuevasFotos[0].url_imagen : nuevasFotos[0]
                        setFotoSeleccionada(nextUrl)
                    }
                    mostrarAlerta({
                        tipo: 'exito',
                        titulo: 'Fotografía Eliminada',
                        mensaje: 'La fotografía fue eliminada con éxito del evento.'
                    })
                } else {
                    mostrarAlerta({
                        tipo: 'error',
                        mensaje: 'No se pudo eliminar la fotografía. Recuerda que el evento debe conservar al menos una.'
                    })
                }
                setLoading(false)
            }
        })
    }

    const handleAddFoto = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const esImagenValida = (file.type && file.type.startsWith('image/')) || /\.(png|jpe?g|webp|gif|bmp|avif|heic)$/i.test(file.name);
        if (!esImagenValida) {
            mostrarAlerta({
                tipo: 'advertencia',
                mensaje: 'Formato no permitido. Por favor selecciona un archivo de imagen válido.'
            });
            e.target.value = '';
            return;
        }

        try {
            setLoading(true)
            let fileToProcess = file;
            try {
                const options = {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1280,
                    useWebWorker: true
                };
                fileToProcess = await imageCompression(file, options);
            } catch (errComp) {
                console.warn("Compresión en cliente no aplicada, usando archivo original:", errComp);
            }

            const base64 = await imageCompression.getDataUrlFromFile(fileToProcess);
            const nuevaFoto = await uploadFotoEvento(base64, props?.id_evento, user?.organizacion)
            if (nuevaFoto) {
                setFotos(prev => [...prev, nuevaFoto])
                setFotoSeleccionada(nuevaFoto.url_imagen || base64)
                mostrarAlerta({
                    tipo: 'exito',
                    titulo: 'Fotografía Agregada',
                    mensaje: 'La nueva fotografía fue optimizada y vinculada al evento con éxito.'
                })
            } else {
                mostrarAlerta({
                    tipo: 'error',
                    mensaje: 'Ocurrió un error al subir la fotografía al servidor.'
                })
            }
        } catch (error) {
            console.error("Error al procesar la fotografía:", error);
            mostrarAlerta({
                tipo: 'error',
                mensaje: 'Ocurrió un error inesperado al procesar la fotografía.'
            })
        } finally {
            setLoading(false)
            e.target.value = ''
        }
    }

    const renderCarruselMiniaturas = () => (
        <div className="modal-evento-miniaturas-wrap">
            <div className="modal-evento-miniaturas-scroll">
                {fotos?.map((f, index) => {
                    const url = typeof f === 'object' ? f.url_imagen : f;
                    const id = typeof f === 'object' ? f.id : index;
                    const estaActiva = fotoSeleccionada === url;
                    return (
                        <div key={id} className="modal-evento-miniatura-item">
                            <img
                                src={url}
                                alt={`Miniatura ${index + 1}`}
                                className={`modal-evento-miniatura-img ${estaActiva ? 'activa' : ''}`}
                                onClick={() => { setFotoSeleccionada(url) }}
                            />
                            {esModoEdicion && (
                                <button
                                    type="button"
                                    title={fotos.length <= 1 ? "El evento debe conservar al menos una fotografía" : "Eliminar fotografía"}
                                    disabled={fotos.length <= 1}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFoto(f);
                                    }}
                                    className="modal-evento-btn-quitar-foto"
                                    style={{
                                        backgroundColor: fotos.length <= 1 ? '#9E9E9E' : '#D9534F',
                                        cursor: fotos.length <= 1 ? 'not-allowed' : 'pointer',
                                        opacity: fotos.length <= 1 ? 0.6 : 1
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            {esModoEdicion && (
                <>
                    <label
                        htmlFor={`add-foto-input-${props?.id_evento}`}
                        title="Agregar fotografía al evento"
                        className="modal-evento-btn-agregar-foto"
                    >
                        +
                    </label>
                    <input
                        id={`add-foto-input-${props?.id_evento}`}
                        type="file"
                        accept="image/*"
                        onChange={handleAddFoto}
                        style={{ display: 'none' }}
                    />
                </>
            )}
        </div>
    );

    return (
        <div>
            {loading && <Loader />}
            <div className="overllay" onClick={() => props?.accion(false)}></div>
            <div className="overllay-contenedor">
                <div className="modal-evento-card">
                    {/* Cabecera Institucional */}
                    <div className="modal-evento-header">
                        <div className="modal-evento-header-info">
                            <span className="modal-evento-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                {esModoEdicion ? 'Modo Edición de Evento' : 'Detalles del Evento'}
                            </span>
                            <h2 className="modal-evento-titulo">{evento?.titulo || "Evento Institucional"}</h2>
                        </div>
                        <button
                            type="button"
                            className="modal-evento-btn-cerrar-x"
                            onClick={() => props?.accion(false)}
                            title="Cerrar ventana"
                        >
                            ×
                        </button>
                    </div>

                    {/* Cuerpo del Modal */}
                    <div className="modal-evento-body">
                        {/* Columna Izquierda: Formulario */}
                        <div className="modal-evento-col-form">
                            <div className="modal-evento-campo">
                                <label className="modal-evento-label">Título del Evento:</label>
                                <input
                                    type="text"
                                    className="modal-evento-input"
                                    value={evento?.titulo || ''}
                                    onChange={(e) => setEvento({ ...evento, titulo: e.target.value })}
                                    placeholder="Ingresa el título del evento"
                                    readOnly={!esModoEdicion}
                                    disabled={!esModoEdicion}
                                />
                            </div>

                            <div className="modal-evento-campo">
                                <label className="modal-evento-label">Descripción Detallada:</label>
                                <textarea
                                    className="modal-evento-textarea"
                                    placeholder="Describe las actividades, objetivos o detalles del evento..."
                                    value={evento?.descripcion || ''}
                                    onChange={(e) => setEvento({ ...evento, descripcion: e.target.value })}
                                    readOnly={!esModoEdicion}
                                    disabled={!esModoEdicion}
                                />
                            </div>

                            <div className="modal-evento-campo">
                                <label className="modal-evento-label">Tipo de Evento:</label>
                                <select
                                    className="modal-evento-select"
                                    value={evento?.tipo || ''}
                                    onChange={(e) => setEvento({ ...evento, tipo: e.target.value })}
                                    disabled={!esModoEdicion}
                                >
                                    <option value={evento?.tipo}>{evento?.tipo || 'Seleccionar tipo'}</option>
                                    <option value="Capacitación y Desarrollo">Capacitación y Desarrollo</option>
                                    <option value="Networking y Vinculación">Networking y Vinculación</option>
                                    <option value="Gobernanza e Institucional">Gobernanza e Institucional</option>
                                    <option value="Impacto Social y Comunitario">Impacto Social y Comunitario</option>
                                    <option value="Promoción">Promoción</option>
                                </select>
                            </div>

                            <div className="modal-evento-campo">
                                <div className="modal-evento-label">
                                    <span>Participantes Registrados:</span>
                                    {esDuenio && (
                                        <button
                                            type="button"
                                            onClick={() => { setIdEvento(evento?.id); setAdministar(true) }}
                                            style={{
                                                background: '#41431B',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '3px 10px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                fontFamily: 'inherit'
                                            }}
                                        >
                                            ADMINISTRAR
                                        </button>
                                    )}
                                </div>
                                <select className="modal-evento-select" disabled>
                                    {participantes.length === 0 ? (
                                        <option>Sin participantes inscritos aún</option>
                                    ) : (
                                        participantes.map(participante => (
                                            <option key={participante?.id || participante?.nombre_comercial}>
                                                {participante?.nombre_comercial}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="modal-evento-campo">
                                {esModoEdicion ? (
                                    <>
                                        {/* Botón de Criterios de Participación y Cupo en Edición */}
                                        <button
                                            type="button"
                                            className="modal-evento-btn-toggle-avanzado"
                                            onClick={() => setMostrarAjustesAvanzados(!mostrarAjustesAvanzados)}
                                            title="Configurar cupo, restricciones de audiencia, sector, giro y modalidad"
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                                </svg>
                                                <span>Criterios de Participación y Cupo</span>
                                            </span>
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ transition: 'transform 0.2s ease', transform: mostrarAjustesAvanzados ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                            >
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </button>

                                        {mostrarAjustesAvanzados && (
                                            <div className="modal-evento-panel-avanzado">
                                                {/* 1. Cupo de Participantes */}
                                                <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                    <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                        Cupo de participantes:
                                                    </label>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12.5px' }}>
                                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                                                <input
                                                                    type="radio"
                                                                    name="modoCupo"
                                                                    checked={evento?.limite_participantes === null || evento?.limite_participantes === '' || evento?.limite_participantes === undefined}
                                                                    onChange={() => setEvento(prev => ({ ...prev, limite_participantes: null }))}
                                                                />
                                                                Ilimitado (sin tope)
                                                            </label>
                                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                                                <input
                                                                    type="radio"
                                                                    name="modoCupo"
                                                                    checked={evento?.limite_participantes !== null && evento?.limite_participantes !== '' && evento?.limite_participantes !== undefined}
                                                                    onChange={() => setEvento(prev => ({ ...prev, limite_participantes: prev.limite_participantes || 30 }))}
                                                                />
                                                                Con límite
                                                            </label>
                                                        </div>
                                                        {evento?.limite_participantes !== null && evento?.limite_participantes !== '' && evento?.limite_participantes !== undefined && (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    className="modal-evento-input"
                                                                    style={{ width: '110px', height: '34px', fontSize: '12px' }}
                                                                    value={evento?.limite_participantes || ''}
                                                                    onChange={(e) => setEvento(prev => ({ ...prev, limite_participantes: e.target.value ? parseInt(e.target.value) : '' }))}
                                                                    placeholder="Ej. 30"
                                                                />
                                                                <span style={{ fontSize: '11.5px', color: '#666666' }}>plazas máximas permitidas</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* 2. Grid de Criterios Jerárquicos: Tipo, Sector, Giro y Modalidad */}
                                                <div className="modal-evento-grid-avanzado">
                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Tipo de organización:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento?.tipo_organizacion_permitida || 'TODAS'}
                                                            onChange={(e) => {
                                                                const nuevoTipo = e.target.value;
                                                                setEvento(prev => ({
                                                                    ...prev,
                                                                    tipo_organizacion_permitida: nuevoTipo,
                                                                    sector_permitido: 'TODOS',
                                                                    giro_permitido: 'TODOS'
                                                                }));
                                                            }}
                                                        >
                                                            <option value="TODAS">Todas las organizaciones</option>
                                                            <option value="Escuela">Solo Escuelas</option>
                                                            <option value="Empresa">Solo Empresas</option>
                                                            <option value="Cámara de Comercio">Solo Cámaras de Comercio</option>
                                                        </select>
                                                    </div>

                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Sector permitido:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento?.sector_permitido || 'TODOS'}
                                                            disabled={!evento?.tipo_organizacion_permitida || evento?.tipo_organizacion_permitida === 'TODAS'}
                                                            onChange={(e) => {
                                                                const nuevoSector = e.target.value;
                                                                setEvento(prev => ({
                                                                    ...prev,
                                                                    sector_permitido: nuevoSector,
                                                                    giro_permitido: 'TODOS'
                                                                }));
                                                            }}
                                                        >
                                                            <option value="TODOS">Todos los sectores</option>
                                                            {evento?.tipo_organizacion_permitida && evento?.tipo_organizacion_permitida !== 'TODAS' && SECTORES_ORGANIZACION
                                                                .filter(s => s.tipo === evento.tipo_organizacion_permitida)
                                                                .map(s => (
                                                                    <option key={s.id} value={s.nombre}>
                                                                        {s.nombre}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Giro permitido:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento?.giro_permitido || 'TODOS'}
                                                            disabled={!evento?.sector_permitido || evento?.sector_permitido === 'TODOS'}
                                                            onChange={(e) => setEvento(prev => ({ ...prev, giro_permitido: e.target.value }))}
                                                        >
                                                            <option value="TODOS">Todos los giros</option>
                                                            {evento?.tipo_organizacion_permitida && evento?.sector_permitido && evento?.sector_permitido !== 'TODOS' && SECTORES_ORGANIZACION
                                                                .filter(s => s.tipo === evento.tipo_organizacion_permitida && s.nombre === evento.sector_permitido)
                                                                .map(s => s.giros.map(g => (
                                                                    <option key={g.id} value={g.nombre}>
                                                                        {g.nombre}
                                                                    </option>
                                                                )))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Modalidad:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento?.modalidad || 'PRESENCIAL'}
                                                            onChange={(e) => setEvento(prev => ({ ...prev, modalidad: e.target.value }))}
                                                        >
                                                            <option value="PRESENCIAL">Presencial</option>
                                                            <option value="VIRTUAL">En línea / Virtual</option>
                                                            <option value="HIBRIDO">Híbrida</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* Modo Lectura: Resumen de Parámetros */
                                    <div style={{
                                        padding: '12px 14px',
                                        backgroundColor: '#FAFAF7',
                                        border: '1px solid #E2E6D8',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                        fontSize: '12.5px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: '600', color: '#41431B' }}>
                                                Cupo: {limiteCupo ? `${totalAprobados} / ${limiteCupo} plazas` : 'Ilimitado (sin tope de participantes)'}
                                            </span>
                                            {cupoLleno && (
                                                <span style={{ backgroundColor: '#FDE8E8', color: '#9B1C1C', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                                                    CUPO LLENO
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11.5px', color: '#41431B' }}>
                                            <span style={{ background: '#EEF2E6', border: '1px solid #D5DCBE', padding: '3px 9px', borderRadius: '4px' }}>
                                                Modalidad: {evento?.modalidad === 'VIRTUAL' ? 'En línea / Virtual' : evento?.modalidad === 'HIBRIDO' ? 'Híbrida' : 'Presencial'}
                                            </span>
                                            <span style={{ background: '#EEF2E6', border: '1px solid #D5DCBE', padding: '3px 9px', borderRadius: '4px' }}>
                                                Audiencia: {evento?.tipo_organizacion_permitida && evento.tipo_organizacion_permitida !== 'TODAS' ? `${evento.tipo_organizacion_permitida}s` : 'Todas las organizaciones'}
                                            </span>
                                            {evento?.sector_permitido && evento.sector_permitido !== 'TODOS' && (
                                                <span style={{ background: '#EEF2E6', border: '1px solid #D5DCBE', padding: '3px 9px', borderRadius: '4px' }}>
                                                    Sector: {evento.sector_permitido}
                                                </span>
                                            )}
                                            {evento?.giro_permitido && evento.giro_permitido !== 'TODOS' && (
                                                <span style={{ background: '#EEF2E6', border: '1px solid #D5DCBE', padding: '3px 9px', borderRadius: '4px' }}>
                                                    Giro: {evento.giro_permitido}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="modal-evento-campo">
                                <label className="modal-evento-label">Fechas y Horarios del Evento:</label>
                                <div className="modal-evento-fechas-grid">
                                    <div className="modal-evento-fecha-item">
                                        <span>Fecha de Inicio:</span>
                                        <input
                                            className="modal-evento-input"
                                            value={evento?.fecha_inicio ? evento.fecha_inicio.split('T')[0] : ''}
                                            min={esModoEdicion ? fechaMinima : undefined}
                                            onChange={(e) => {
                                                const nuevoInicio = e.target.value;
                                                setEvento(prev => ({
                                                    ...prev,
                                                    fecha_inicio: nuevoInicio,
                                                    fecha_final: (prev.fecha_final && prev.fecha_final.split('T')[0] < nuevoInicio) ? nuevoInicio : prev.fecha_final
                                                }));
                                            }}
                                            type="date"
                                            disabled={!esModoEdicion}
                                        />
                                    </div>
                                    <div className="modal-evento-fecha-item">
                                        <span>Hora de Inicio:</span>
                                        <input
                                            className="modal-evento-input"
                                            value={evento?.hora_inicio ? evento.hora_inicio.slice(0, 5) : '09:00'}
                                            onChange={(e) => setEvento({ ...evento, hora_inicio: e.target.value })}
                                            type="time"
                                            disabled={!esModoEdicion}
                                        />
                                    </div>
                                </div>
                                <div className="modal-evento-fechas-grid" style={{ marginTop: '8px' }}>
                                    <div className="modal-evento-fecha-item">
                                        <span>Fecha de Fin:</span>
                                        <input
                                            className="modal-evento-input"
                                            value={evento?.fecha_final ? evento.fecha_final.split('T')[0] : ''}
                                            min={esModoEdicion ? ((evento?.fecha_inicio ? evento.fecha_inicio.split('T')[0] : null) || fechaMinima) : undefined}
                                            onChange={(e) => setEvento({ ...evento, fecha_final: e.target.value })}
                                            type="date"
                                            disabled={!esModoEdicion}
                                        />
                                    </div>
                                    <div className="modal-evento-fecha-item">
                                        <span>Hora de Fin:</span>
                                        <input
                                            className="modal-evento-input"
                                            value={evento?.hora_final ? evento.hora_final.slice(0, 5) : '18:00'}
                                            onChange={(e) => setEvento({ ...evento, hora_final: e.target.value })}
                                            type="time"
                                            disabled={!esModoEdicion}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha: Galería Multimedia */}
                        <div className="modal-evento-col-media">
                            <label className="modal-evento-label" style={{ marginBottom: '6px' }}>Fotografías del Evento:</label>
                            <div className="modal-evento-foto-principal-wrap">
                                <img
                                    className="modal-evento-foto-principal"
                                    src={fotoSeleccionada ? fotoSeleccionada : imgDefaultSelect}
                                    alt="Foto de evento"
                                />
                            </div>
                            {renderCarruselMiniaturas()}
                            <span className="modal-evento-media-pie">
                                {fotos.length} {fotos.length === 1 ? 'fotografía registrada' : 'fotografías registradas'}
                            </span>
                        </div>
                    </div>

                    {/* Pie de Acciones */}
                    <div className="modal-evento-footer">
                        <button
                            type="button"
                            onClick={() => { props?.accion(false) }}
                            className="modal-evento-btn-cancelar"
                        >
                            CERRAR
                        </button>

                        {!esDuenio && !user?.rol?.includes('ADMIN_SYS') && user?.organizacion && (
                            usuarioEsParticipanteAprobado ? (
                                <button
                                    type="button"
                                    className="modal-evento-btn-participar"
                                    style={{
                                        backgroundColor: '#EEF7E2',
                                        color: '#2F5910',
                                        border: '1.5px solid #6E9B34',
                                        cursor: 'default'
                                    }}
                                    onClick={() => mostrarAlerta({
                                        tipo: 'exito',
                                        titulo: 'Participante Oficial',
                                        mensaje: 'Tu organización ya está formalmente aceptada y registrada como participante en este evento.'
                                    })}
                                    title="Inscripción aceptada"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    PARTICIPANTE OFICIAL
                                </button>
                            ) : usuarioEsParticipantePendiente ? (
                                <button
                                    type="button"
                                    className="modal-evento-btn-participar"
                                    style={{
                                        backgroundColor: '#FFFBE6',
                                        color: '#7A5B00',
                                        border: '1.5px solid #D4B038',
                                        cursor: 'default',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => mostrarAlerta({
                                        tipo: 'advertencia',
                                        titulo: 'Solicitud en Revisión',
                                        mensaje: 'Tu solicitud de participación fue enviada y se encuentra en espera de aprobación por parte del anfitrión.'
                                    })}
                                    title="Solicitud enviada (esperando aprobación)"
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    SOLICITUD EN PROCESO
                                </button>
                            ) : perfilIncompatible ? (
                                <button
                                    type="button"
                                    className="modal-evento-btn-participar"
                                    style={{
                                        backgroundColor: '#FDE8E8',
                                        color: '#9B1C1C',
                                        border: '1.5px solid #F8B4B4',
                                        cursor: 'not-allowed',
                                        fontSize: '11.5px'
                                    }}
                                    disabled
                                    title={`Evento reservado exclusivamente para instituciones de tipo "${evento.tipo_organizacion_permitida}"`}
                                >
                                    RESTRINGIDO (SOLO {evento.tipo_organizacion_permitida.toUpperCase()}S)
                                </button>
                            ) : cupoLleno ? (
                                <button
                                    type="button"
                                    className="modal-evento-btn-participar"
                                    style={{
                                        backgroundColor: '#EFEFEF',
                                        color: '#888888',
                                        border: '1.5px solid #D0D0D0',
                                        cursor: 'not-allowed'
                                    }}
                                    disabled
                                    title="El cupo máximo de participantes ha sido alcanzado"
                                >
                                    CUPO LLENO
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="modal-evento-btn-participar"
                                    onClick={handleSolicitarParticipacion}
                                >
                                    SOLICITAR PARTICIPACIÓN
                                </button>
                            )
                        )}
                        {esModoEdicion && (
                            <button
                                type="button"
                                className="modal-evento-btn-primario"
                                onClick={handeUpdateEvento}
                            >
                                GUARDAR CAMBIOS
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {administrar && (
                <div>
                    <div className="overllay" onClick={() => setAdministar(false)}></div>
                    <div className="overllay-contenedor">
                        <div className="modal-evento-card" style={{ maxWidth: '850px', width: '92%', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
                            {/* Cabecera del Modal de Administración */}
                            <div className="modal-evento-header" style={{ paddingBottom: '14px', borderBottom: '1px solid #EBECE6' }}>
                                <div className="modal-evento-header-info">
                                    <span className="modal-evento-badge" style={{ backgroundColor: '#F0F4E8', borderColor: '#AEB784' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                        Gestión de Participantes
                                    </span>
                                    <h2 className="modal-evento-titulo" style={{ fontSize: '18px', marginTop: '4px' }}>
                                        Inscripciones del Evento
                                    </h2>
                                    <span style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                                        {evento?.titulo ? `Convocatoria: "${evento.titulo}"` : 'Administración de aforo y solicitudes'}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="modal-evento-btn-cerrar-x"
                                    onClick={() => setAdministar(false)}
                                    title="Cerrar ventana"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Barra de Resumen / Métricas */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '12px 0', borderBottom: '1px solid #F0F2EB' }}>
                                <div style={{ background: '#F8F9F5', border: '1px solid #CCD5AE', borderRadius: '8px', padding: '6px 12px', fontSize: '12px' }}>
                                    <strong style={{ color: '#41431B' }}>Total Registrados:</strong> {inscripciones.length}
                                </div>
                                <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', color: '#2E7D32' }}>
                                    <strong>Aprobados / Activos:</strong> {inscripciones.filter(i => i.estado === 'APROBADA').length}
                                    {limiteCupo && ` / ${limiteCupo} máx.`}
                                </div>
                                <div style={{ background: '#FFF9E6', border: '1px solid #FFE58F', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', color: '#B78103' }}>
                                    <strong>En Revisión:</strong> {inscripciones.filter(i => i.estado === 'PENDIENTE').length}
                                </div>
                            </div>

                            {/* Contenido / Tabla de Participantes */}
                            <div style={{ flex: 1, overflowY: 'auto', margin: '14px 0', minHeight: '200px' }}>
                                {inscripciones.length === 0 ? (
                                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#777' }}>
                                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#CCD5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 12px' }}>
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#41431B' }}>
                                            Sin registros de participación
                                        </p>
                                        <p style={{ margin: '4px 0 0', fontSize: '12px' }}>
                                            Aún no hay instituciones registradas ni solicitudes en espera para este evento.
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#41431B', color: '#FFFFFF' }}>
                                                    <th style={{ padding: '10px 12px', borderRadius: '8px 0 0 0' }}>Organización</th>
                                                    <th style={{ padding: '10px 12px' }}>Fecha Solicitud</th>
                                                    <th style={{ padding: '10px 12px' }}>Estado</th>
                                                    <th style={{ padding: '10px 12px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inscripciones.map((inscripcion, idx) => {
                                                    const esAprobada = inscripcion.estado === 'APROBADA';
                                                    const esPendiente = inscripcion.estado === 'PENDIENTE';
                                                    const esRechazada = inscripcion.estado === 'RECHAZADO' || inscripcion.estado === 'RECHAZADA';
                                                    const bgFila = idx % 2 === 0 ? '#FFFFFF' : '#F9FAF7';

                                                    return (
                                                        <tr key={inscripcion.id_inscripcion || inscripcion.id || idx} style={{ backgroundColor: bgFila, borderBottom: '1px solid #EBECE6' }}>
                                                            <td style={{ padding: '10px 12px' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                    <img
                                                                        src={inscripcion.organizacion?.logo || 'https://via.placeholder.com/34'}
                                                                        alt="logo"
                                                                        style={{ width: '34px', height: '34px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #DDD' }}
                                                                    />
                                                                    <div>
                                                                        <strong style={{ color: '#222' }}>
                                                                            {inscripcion.organizacion?.nombre_comercial || inscripcion.organizacion?.nombre || 'Institución Registrada'}
                                                                        </strong>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style={{ padding: '10px 12px', color: '#555' }}>
                                                                {inscripcion.fecha ? inscripcion.fecha.split('T')[0] : 'N/D'}
                                                            </td>
                                                            <td style={{ padding: '10px 12px' }}>
                                                                {esAprobada && (
                                                                    <span style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', border: '1px solid #C8E6C9', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '600' }}>
                                                                        Aprobada / Participando
                                                                    </span>
                                                                )}
                                                                {esPendiente && (
                                                                    <span style={{ backgroundColor: '#FFF9E6', color: '#B78103', border: '1px solid #FFE58F', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '600' }}>
                                                                        Pendiente de Revisión
                                                                    </span>
                                                                )}
                                                                {esRechazada && (
                                                                    <span style={{ backgroundColor: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '600' }}>
                                                                        Rechazada
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                                                    {esPendiente && (
                                                                        <>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleUpdateEstadoById(inscripcion.id_inscripcion || inscripcion.id, 'APROBADA')}
                                                                                style={{ backgroundColor: '#2E7D32', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                                                                                title="Aceptar participante en el evento"
                                                                            >
                                                                                APROBAR
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleUpdateEstadoById(inscripcion.id_inscripcion || inscripcion.id, 'RECHAZADO')}
                                                                                style={{ backgroundColor: '#FFFFFF', color: '#C62828', border: '1px solid #F8B4B4', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                                                                                title="Rechazar solicitud"
                                                                            >
                                                                                RECHAZAR
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                    {esAprobada && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleUpdateEstadoById(inscripcion.id_inscripcion || inscripcion.id, 'RECHAZADO')}
                                                                            style={{ backgroundColor: '#FFFFFF', color: '#C62828', border: '1px solid #F8B4B4', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                                                                            title="Revocar participación de esta organización"
                                                                        >
                                                                            DAR DE BAJA
                                                                        </button>
                                                                    )}
                                                                    {esRechazada && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleUpdateEstadoById(inscripcion.id_inscripcion || inscripcion.id, 'APROBADA')}
                                                                            style={{ backgroundColor: '#FFFFFF', color: '#2E7D32', border: '1px solid #A3D9A5', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                                                                            title="Readmitir participante"
                                                                        >
                                                                            READMITIR
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Pie del Modal */}
                            <div className="modal-evento-footer" style={{ borderTop: '1px solid #EBECE6', paddingTop: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => setAdministar(false)}
                                    className="modal-evento-btn-primario"
                                    style={{ padding: '8px 24px', fontSize: '12.5px' }}
                                >
                                    CERRAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ModalAlerta
                abierto={alerta.abierto}
                tipo={alerta.tipo}
                titulo={alerta.titulo}
                mensaje={alerta.mensaje}
                textoBoton={alerta.textoBoton}
                textoCancelar={alerta.textoCancelar}
                mostrarCancelar={alerta.mostrarCancelar}
                onAceptar={cerrarAlerta}
                onCancelar={() => {
                    const cb = alerta.onCancelar
                    setAlerta(prev => ({ ...prev, abierto: false }))
                    if (cb) cb()
                }}
            />
        </div>
    )
}
