import { useEffect, useState } from "react"
import { eventoById, findParticipantesPendientesByIdEvento, updateEventoById } from "../services/Evento"
import { useNavigate } from "react-router-dom"
import { findParticipantesByIEvento, updateInscripcionByEstado, createInscripcion } from "../services/Inscripcion"
import { getFotosByIdEvento, deleteFotoById, uploadFotoEvento } from "../services/Foto"
import '../styles/botones.css'
import { useAuth } from "../hooks/useAuth"
import { useMediaQuery } from "@uidotdev/usehooks"
import Loader from "./Loader"
import ModalAlerta from "./ModalAlerta"
import imageCompression from "browser-image-compression"

export default function VisualizarEvento(props) {
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const [inscripciones, setInscripciones] = useState([])
    const [evento, setEvento] = useState({
        titulo: '',
        descripcion: '',
        tipo: '',
        fecha_inicio: '',
        fecha_final: '',
        id_organizacion: ''
    })
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
        const pendientes = async () => {
            const res = await findParticipantesPendientesByIdEvento(props?.id_evento)
            setInscripciones(res)
        }
        if (props?.id_evento) {
            pendientes()
        }
    }, [props?.id_evento])

    const handleUpdateEstadoById = async (id, estado) => {
        setLoading(true)
        const data = await updateInscripcionByEstado(id, estado)
        setLoading(false)
        if (data) {
            mostrarAlerta({
                tipo: 'exito',
                mensaje: 'Inscripción actualizada con éxito.',
                onAceptar: () => navigate(0)
            })
        } else {
            mostrarAlerta({
                tipo: 'error',
                mensaje: 'No se pudo actualizar la inscripción.',
                onAceptar: () => navigate(0)
            })
        }
    }

    const handeUpdateEvento = async () => {
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
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '0.4rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', minWidth: '85%', maxWidth: '85%', overflowX: 'auto', gap: '0.4rem', padding: '4px 0', alignItems: 'center' }}>
                {fotos?.map((f, index) => {
                    const url = typeof f === 'object' ? f.url_imagen : f
                    const id = typeof f === 'object' ? f.id : index
                    return (
                        <div key={id} style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
                            <img
                                src={url}
                                alt={`Miniatura ${index + 1}`}
                                style={{
                                    height: '42px',
                                    width: '42px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    border: fotoSeleccionada === url ? '2px solid #AEB784' : '1px solid #ccc',
                                    cursor: 'pointer',
                                    display: 'block'
                                }}
                                onClick={() => { setFotoSeleccionada(url) }}
                            />
                            {esModoEdicion && (
                                <button
                                    type="button"
                                    title={fotos.length <= 1 ? "El evento debe conservar al menos una fotografía" : "Eliminar fotografía"}
                                    disabled={fotos.length <= 1}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteFoto(f)
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        backgroundColor: fotos.length <= 1 ? '#9E9E9E' : '#D9534F',
                                        color: 'white',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        cursor: fotos.length <= 1 ? 'not-allowed' : 'pointer',
                                        padding: 0,
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                        opacity: fotos.length <= 1 ? 0.6 : 1
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
            {esModoEdicion && (
                <>
                    <label
                        htmlFor={`add-foto-input-${props?.id_evento}`}
                        title="Agregar fotografía al evento"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '42px',
                            width: '42px',
                            borderRadius: '4px',
                            border: '2px dashed #41431B',
                            backgroundColor: '#F4F5F0',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: '#41431B',
                            fontWeight: 'bold',
                            flexShrink: 0
                        }}
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
    )

    return (
        <div>
            {loading && <Loader />}
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="formulario-contenedor">
                    <div className="titulo-formulario">
                        <h1 className="subtitulo">{evento?.titulo ? evento.titulo.substring(0, 25) : ""}</h1>
                    </div>
                    <div className="formulario">
                        <div className="contenedor-datos-formulario" style={{ width: (isSmallDevice || isMediumDevice) ? '100%' : null }}>
                            <div className="contenedor-datos-interno">
                                <h6>Titulo:</h6>
                                <input
                                    type="text"
                                    value={evento?.titulo || ''}
                                    onChange={(e) => setEvento({ ...evento, titulo: e.target.value })}
                                    placeholder="Titulo"
                                    readOnly={!esModoEdicion}
                                    disabled={!esModoEdicion}
                                    style={!esModoEdicion ? { backgroundColor: '#F4F5F0', color: '#41431B', cursor: 'default', border: '1px solid #CCD5AE' } : {}}
                                />
                                <h6>Descripcion:</h6>
                                <textarea
                                    placeholder="Descripcion"
                                    value={evento?.descripcion || ''}
                                    onChange={(e) => setEvento({ ...evento, descripcion: e.target.value })}
                                    readOnly={!esModoEdicion}
                                    disabled={!esModoEdicion}
                                    style={!esModoEdicion ? { backgroundColor: '#F4F5F0', color: '#41431B', cursor: 'default', border: '1px solid #CCD5AE' } : {}}
                                />
                                <h6>Tipo:</h6>
                                <select
                                    value={evento?.tipo || ''}
                                    onChange={(e) => setEvento({ ...evento, tipo: e.target.value })}
                                    disabled={!esModoEdicion}
                                    style={!esModoEdicion ? { backgroundColor: '#F4F5F0', color: '#41431B', cursor: 'default', border: '1px solid #CCD5AE' } : {}}
                                >
                                    <option value={evento?.tipo}>{evento?.tipo || 'Seleccionar tipo'}</option>
                                    <option value="Capacitación y Desarrollo">Capacitación y Desarrollo</option>
                                    <option value="Networking y Vinculación">Networking y Vinculación</option>
                                    <option value="Gobernanza e Institucional">Gobernanza e Institucional</option>
                                    <option value="Impacto Social y Comunitario">Impacto Social y Comunitario</option>
                                    <option value="Promoción">Promoción</option>
                                </select>

                                <h6>Participantes:</h6>
                                {esDuenio && (
                                    <button
                                        type="button"
                                        className="btn-accion-2"
                                        style={{ marginBottom: '6px' }}
                                        onClick={() => { setIdEvento(evento?.id); setAdministar(true) }}
                                    >
                                        <strong>ADMINISTRAR</strong>
                                    </button>
                                )}
                                <select>
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
                                <h6>Fecha:</h6>
                                <div className="group-two-input">
                                    <h6>Inicio:</h6>
                                    <input
                                        value={evento?.fecha_inicio ? evento.fecha_inicio.split('T')[0] : ''}
                                        onChange={(e) => setEvento({ ...evento, fecha_inicio: e.target.value })}
                                        type="date"
                                        disabled={!esModoEdicion}
                                        style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px', backgroundColor: !esModoEdicion ? '#F4F5F0' : '#fff', color: '#41431B' }}
                                    />
                                    <h6>Fin:</h6>
                                    <input
                                        value={evento?.fecha_final ? evento.fecha_final.split('T')[0] : ''}
                                        onChange={(e) => setEvento({ ...evento, fecha_final: e.target.value })}
                                        type="date"
                                        disabled={!esModoEdicion}
                                        style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px', backgroundColor: !esModoEdicion ? '#F4F5F0' : '#fff', color: '#41431B' }}
                                    />
                                </div>
                                {(isSmallDevice || isMediumDevice) && (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                        <div style={{ width: '250px', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <img
                                                style={{ width: '100%', height: '85%', margin: 0, objectFit: 'cover', borderRadius: '8px' }}
                                                src={fotoSeleccionada ? fotoSeleccionada : imgDefaultSelect}
                                                alt="Foto de evento"
                                            />
                                            {renderCarruselMiniaturas()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {(!isSmallDevice && !isMediumDevice) && (
                            <div style={{ width: '250px', height: '350px' }}>
                                <img
                                    style={{ width: '100%', height: '85%', margin: 0, objectFit: 'cover', borderRadius: '8px' }}
                                    src={fotoSeleccionada ? fotoSeleccionada : imgDefaultSelect}
                                    alt="Foto de evento"
                                />
                                {renderCarruselMiniaturas()}
                            </div>
                        )}
                    </div>
                    <div className="contenedor-botones-formulario">
                        <button
                            type="button"
                            onClick={() => { props?.accion(false) }}
                            className="btn-accion-cancelar-1"
                        >
                            <strong>CERRAR</strong>
                        </button>

                        {!props?.inscrito && !user?.rol?.includes('ADMIN_SYS') && user?.organizacion && user.organizacion !== evento?.id_organizacion && (
                            <button
                                type="button"
                                className="btn-accion-2"
                                onClick={handleSolicitarParticipacion}
                            >
                                <strong>PARTICIPAR</strong>
                            </button>
                        )}
                        {esModoEdicion && (
                            <button
                                type="button"
                                className="btn-accion-2"
                                onClick={handeUpdateEvento}
                            >
                                <strong>GUARDAR</strong>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {administrar && (
                <div>
                    <div className="overllay"></div>
                    <div className="overllay-contenedor">
                        <div style={{
                            width: '90%', height: '80vh', padding: '1rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
                            justifyContent: 'space-around', alignItems: 'center', gap: '1rem'
                        }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h1>INSCRIPCIONES DEL EVENTO</h1>
                                <div style={{ width: '100%', minWidth: '100%', overflowX: 'scroll' }}>
                                    <table className="contenedor-tablas-interno" style={{ width: '100%', minHeight: '100px', height: 'auto', maxHeight: '500px', overflowY: 'scroll' }}>
                                        <thead>
                                            <tr style={{ color: 'white', backgroundColor: '#41431B' }}>
                                                <th>ID</th>
                                                <th>Logo</th>
                                                <th>Organizacion</th>
                                                <th>Fecha</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inscripciones?.map(inscripcion => (
                                                <tr key={inscripcion.id_inscripcion}>
                                                    <td>{inscripcion.id_inscripcion}</td>
                                                    <td><img src={inscripcion.organizacion.logo} alt="logo" style={{ width: '32px', height: '32px' }} /></td>
                                                    <td>{inscripcion.organizacion.nombre_comercial}</td>
                                                    <td>{inscripcion.fecha ? inscripcion.fecha.split('T')[0] : ''}</td>
                                                    <th>
                                                        <button
                                                            type="button"
                                                            className="btn-accion-cancelar-1"
                                                            onClick={() => {
                                                                handleUpdateEstadoById(inscripcion.id_inscripcion, 'RECHAZADO')
                                                            }}
                                                        >
                                                            <strong>RECHAZAR</strong>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn-accion-2"
                                                            onClick={() => {
                                                                handleUpdateEstadoById(inscripcion.id_inscripcion, 'APROBADA')
                                                            }}
                                                        >
                                                            <strong>APROBAR</strong>
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setAdministar(false) }}
                                className="btn-accion-cancelar-1"
                            >
                                <strong>CERRAR</strong>
                            </button>
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
