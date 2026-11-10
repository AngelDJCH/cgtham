import { useEffect, useState } from 'react'
import '../styles/contenedor-tablas.css'
import { useNavigate } from 'react-router-dom'
import { deleteComentarioById, getComentarioById, updateById, updateComentarioByEstado } from '../services/Comentario'
import { useAuth } from '../hooks/useAuth'
import { createInscripcion, deleteById, updateInscripcionByEstado } from '../services/Inscripcion'
import VisualizarEvento from './VisualizarEvento'
import { deleteEventoById } from '../services/Evento.js'
import { createConvenioOrganizacion } from '../services/ConvenioOrganizacion.js'
import VisualizarConvenio from './VisualizarConvenio.js'
import { deleteCursoById, updateEstadoById } from '../services/Curso.js'
import { deleteByIdForEscuelas, findById, updateEstadoRechazadaById, updateVisitaById } from '../services/Visita.js'
import InscripcionAlterta from './InscripcionAlterta.js'
import EditarComentario from './EditarComentario.js'
import { useMediaQuery } from '@uidotdev/usehooks'
import VisualizarVisita from './VisualizarVisita.js'
import { deleteByIdConvenio } from '../services/Convenio.js'
import ModalAlerta from './ModalAlerta'

export default function TablaContenido(props) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const [openEvento, setOpenEvento] = useState(false)
    const [openVerEvento, setOpenVerEvento] = useState(false)
    const [openEditarEvento, setOpenEditarEvento] = useState(false)
    const [openEditarComentario, setOpenEditarComentario] = useState(false)
    const [openConvenio, setOpenConvenio] = useState(false)
    const [openVisita, setOpenVisita] = useState(false)
    const [nombreEvento, setNombreEvento] = useState('')
    const [idEvento, setIdEvento] = useState(null)
    const [idComentario, setIdComentario] = useState(null)
    const [idConvenio, setIdConvenio] = useState(null)
    const [idOrganizacion, setIdOrganizacion] = useState(null)
    const [idVisita, setIdVisita] = useState(null)
    const [openInscripcion, setOpenInscripcion] = useState(false)
    const [comentarioData, setComentarioData] = useState(null)

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

    const mostrarAlerta = ({
        mensaje,
        tipo = 'info',
        titulo = '',
        onAceptar = null,
        mostrarCancelar = false,
        onCancelar = null,
        textoBoton = 'ACEPTAR',
        textoCancelar = 'CANCELAR'
    }) => {
        setAlerta({
            abierto: true,
            tipo,
            titulo: titulo || (tipo === 'error' ? 'Atención' : tipo === 'exito' ? '¡Éxito!' : tipo === 'advertencia' ? 'Advertencia' : 'Aviso'),
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

    const handleSolicitarParticipacion = (evento) => {
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
                                const status = await createInscripcion(evento.id, user.organizacion)
                                setLoading(false)
                                if (status === 201) {
                                    mostrarAlerta({
                                        tipo: 'exito',
                                        titulo: '¡Inscripción Solicitada!',
                                        mensaje: `Tu solicitud para participar en "${evento.titulo}" ha sido registrada exitosamente. Quedará en espera de aprobación por parte de los organizadores.`,
                                        textoBoton: 'ENTENDIDO',
                                        onAceptar: () => navigate(0)
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

    const handleConfirmarEliminarEvento = (evento) => {
        mostrarAlerta({
            tipo: 'advertencia',
            titulo: '¿Eliminar Evento?',
            mensaje: `¿Estás seguro de que deseas eliminar permanentemente el evento "${evento.titulo}"? Esta acción no se puede deshacer.`,
            mostrarCancelar: true,
            textoBoton: 'ELIMINAR',
            textoCancelar: 'CANCELAR',
            onCancelar: () => setAlerta(prev => ({ ...prev, abierto: false })),
            onAceptar: async () => {
                setAlerta(prev => ({ ...prev, abierto: false }))
                setLoading(true)
                try {
                    const res = await deleteEventoById(evento.id)
                    setLoading(false)
                    mostrarAlerta({
                        tipo: 'exito',
                        titulo: 'Evento Eliminado',
                        mensaje: 'El evento ha sido eliminado correctamente del sistema.',
                        onAceptar: () => navigate(0)
                    })
                } catch (error) {
                    setLoading(false)
                    mostrarAlerta({
                        tipo: 'error',
                        titulo: 'Error',
                        mensaje: 'No se pudo eliminar el evento.'
                    })
                }
            }
        })
    }
    const [visitaData, setVisitaData] = useState({
        id: '',
        solicitado: '',
        aprobado: '',
        agendado: '',
        estado: ''
    })
    const handleParticiparConvenio = async (id_convenio) => {
        const status = await createConvenioOrganizacion('PARTICIPANTE', id_convenio, user.organizacion)
        if (status && status === 201) {
            navigate(0)
            alert('ESPERA A QUE LA ORGANIZACIÓN VALIDE TU PARTICIPACION')
        } else if (status && status === 409) {
            alert('YA ESTAS EN LISTA DE ESPERA')
        } else {
            alert('OCURRIO UN ERROR EN EL SERVIDOR')
        }
    }
    const handleEliminarCurso = async (id_curso) => {
        const res = await deleteCursoById(id_curso)
        if (res && res.status === 200) { navigate(0); alert('Curso Eliminado') } else {
            alert('No se elimino el curso')
        }
    }
    const handleUpdateEstadoRechazadaVisitaById = async (id_visita) => {
        const status = await updateEstadoRechazadaById(id_visita)
        if (status && status === 200) { navigate(0); alert('VISITA RECHAZADA') } else {
            alert('NO SE PUDO REALIZAR LA ACCION')
        }
    }
    const handleDeleteByIdForEscuelas = async (id) => {
        const status = await deleteByIdForEscuelas(id)
        if (status && status === 204) {
            alert('SE ELIMINO LA VISITA')
        } else {
            alert('No se pudo eliminar la solicitudad')
        }
    }
    const deleteByIdEscuela = async (id_escuela) => {
        const status = await deleteByIdForEscuelas(idVisita)
        if (status && status === 204) {
            alert('SE ELIMINO LA SOLICITUD')
        } else {
            alert('NO SE PUDO ELIMINAR LA SOLICITUD')
        }
    }
    useEffect(() => {
        const getComentario = async () => {
            const res = await getComentarioById(idComentario)
            setComentarioData(res)
        }

        if (idComentario) {
            getComentario()
        }
    }, [idComentario])
    return (
        <div className="contenedor-tablas">
            <div className="contenedor-tablas-interno">
                <table>
                    <thead>
                        <tr>
                            {
                                props.encabezados?.map(
                                    encabezado => <th>{encabezado}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.inscripcionesTabla?.filter(f => props.filtro.length === 0 || f.evento.titulo.toLowerCase().includes(props.filtro.toLowerCase())).map(
                                inscripcion => (
                                    <tr key={inscripcion.inscripcion?.id_inscripcion ?? inscripcion.evento?.id_evento ?? inscripcion.organizacion?.id}>
                                        <td defaultValue={inscripcion.organizacion.id}>{inscripcion.organizacion.nombre_comercial}</td>
                                        <td defaultValue>{inscripcion.evento.titulo}</td>
                                        <td defaultValue={inscripcion.inscripcion.id}>{inscripcion.inscripcion.fecha.split('T')[0]}</td>
                                        <td>{inscripcion.inscripcion.estado}</td>
                                        <td>
                                            {
                                                inscripcion.inscripcion.estado !== 'PENDIENTE' && (
                                                    <div className='tabla-acciones'>
                                                        <button
                                                            className='btn-accion-2'
                                                            value={inscripcion.evento.id_evento}
                                                            onClick={(e) => {
                                                                setIdEvento(inscripcion.evento.id_evento)
                                                                setOpenEvento(true)
                                                            }}
                                                        >
                                                            <strong>
                                                                VER
                                                            </strong>
                                                        </button>
                                                    </div>
                                                )
                                            }

                                            {
                                                inscripcion.inscripcion.estado === 'PENDIENTE' && (

                                                    <div className='tabla-acciones'>
                                                        <button
                                                            value={inscripcion.evento.id_evento}
                                                            className='btn-accion-2'
                                                            onClick={(e) => {
                                                                setIdEvento(inscripcion.evento.id_evento)
                                                                setOpenEvento(true)
                                                            }}
                                                        >
                                                            <strong>
                                                                VER
                                                            </strong>
                                                        </button>
                                                        <button
                                                            className='btn-accion-cancelar-1'
                                                            onClick={async () => {
                                                                const status = await deleteById(inscripcion.inscripcion.id_inscripcion)
                                                                navigate(0)
                                                            }}
                                                        >
                                                            <strong>
                                                                CANCELAR
                                                            </strong>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            )
                        }

                        {
                            props?.tipo === 'ORG' && props.comentariosTabla?.map(
                                comentario => <tr>
                                    <td>{comentario.contenido}</td>
                                    <td>{comentario.fecha.split('T')[0]}</td>
                                    <td>{comentario.estado}</td>
                                    <td style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        {
                                            comentario.estado === 'Pendiente' && (
                                                <button
                                                    className='btn-accion-2'
                                                    onClick={() => {
                                                        setIdComentario(comentario.id)
                                                        setOpenEditarComentario(true)
                                                    }}
                                                >
                                                    <strong>EDITAR</strong>
                                                </button>
                                            )
                                        }
                                        {
                                            comentario.estado === 'Pendiente' && (
                                                <button
                                                    onClick={async () => {
                                                        const res = await deleteComentarioById(comentario.id)
                                                        if (res.status === 204) {
                                                            alert('SE ELIMINO EL COMENTARIO')
                                                            navigate(0)
                                                        } else {
                                                            alert('El comentario no se pudo eliminar')
                                                        }
                                                    }}
                                                    className='btn-accion-cancelar-1'
                                                >
                                                    <strong>ELIMINAR</strong>
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        }

                        {
                            props?.tipo === 'SYS' && props.comentariosTabla?.map(
                                comentario => <tr>
                                    <td>{comentario.organizacion.nombre}</td>
                                    <td>{comentario.comentario.contenido}</td>
                                    <td>{comentario.comentario.fecha.split('T')[0]}</td>
                                    <td>{comentario.comentario.estado}</td>
                                    <td style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        <button
                                            className='btn-accion-cancelar-1'
                                            onClick={async () => {
                                                try {
                                                    const status = await updateComentarioByEstado(comentario.comentario.id, 'Rechazado', user.id)
                                                    if (status === 200) alert('COMENTARIO RECHAZADO')
                                                    navigate(0)
                                                } catch (error) {
                                                    alert('OCURRIO UN ERROR')
                                                }
                                            }}
                                        >
                                            <strong>RECHAZAR</strong>
                                        </button>
                                        <button
                                            className='btn-accion-2'
                                            onClick={async () => {
                                                try {
                                                    const status = await updateComentarioByEstado(comentario.comentario.id, 'Aprobado', user.id)
                                                    if (status === 200) alert('COMENTARIO APROBADO')
                                                    navigate(0)
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                        >
                                            <strong>ACEPTAR</strong>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                        {
                            props?.eventosTabla?.filter(f => f.titulo.toLowerCase().includes(props?.filtro.toLowerCase()) || props?.filtro.length === 0).filter(opciones => (opciones.tipo === props?.tipoEventoSeleccionado || props?.tipoEventoSeleccionado === 'Tipo')).map(
                                evento => <tr>
                                    <td>
                                        {evento?.titulo}
                                    </td>
                                    <td>
                                        {
                                            user.tipo != 'Escuela' ? evento?.organizacion?.nombre?.substring(0, 20) : evento?.descripcion?.substring(0, 20)
                                        } ...
                                    </td>
                                    <td>
                                        {
                                            evento?.tipo
                                        }
                                    </td>
                                    <td>
                                        {
                                            evento?.estado
                                        }
                                    </td>
                                    <td>
                                        {
                                            evento?.fecha_inicio?.split('T')[0]
                                        }
                                    </td>
                                    <td>
                                        {
                                            evento?.fecha_final?.split('T')[0]
                                        }
                                    </td>
                                    <td>
                                        {
                                            evento?.fecha_publicacion?.split('T')[0]
                                        }
                                    </td>
                                    <td>
                                        <div className='tabla-acciones'>
                                            <button
                                                className='btn-accion-2'
                                                style={{ backgroundColor: '#41431B', color: '#FFFFFF' }}
                                                onClick={() => {
                                                    setIdEvento(evento?.id)
                                                    setOpenVerEvento(true)
                                                }}
                                                title="Visualizar detalles completos del evento"
                                            >
                                                <strong>VER</strong>
                                            </button>
                                            {(evento?.id_organizacion === user.organizacion || user?.rol?.includes('ADMIN_SYS')) && (
                                                <button
                                                    onClick={() => {
                                                        setIdEvento(evento?.id)
                                                        setOpenEditarEvento(true)
                                                    }}
                                                    className='btn-accion-2'
                                                >
                                                    <strong>EDITAR</strong>
                                                </button>
                                            )}
                                            {(evento?.id_organizacion === user.organizacion || user?.rol?.includes('ADMIN_SYS')) && (
                                                <button
                                                    onClick={() => handleConfirmarEliminarEvento(evento)}
                                                    className='btn-accion-cancelar-1'
                                                >
                                                    <strong>ELIMINAR</strong>
                                                </button>
                                            )}
                                            {evento?.id_organizacion !== user.organizacion && !user?.rol?.includes('ADMIN_SYS') && (
                                                <button
                                                    className='btn-accion-2'
                                                    onClick={() => handleSolicitarParticipacion(evento)}
                                                >
                                                    <strong>PARTICIPAR</strong>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )
                        }

                        {
                            props?.conveniosTabla?.filter(f => (f.tipo === props?.tipoConvenioSeleccionado || props?.tipoConvenioSeleccionado === 'Tipo')).map(
                                convenio => <tr>
                                    <td>{convenio.titulo}</td>
                                    <td>{convenio.tipo}</td>
                                    <td>{convenio.subtipo}</td>
                                    <td>{convenio.descripcion.substring(0, 50)} {convenio.descripcion.length > 50 ? '...' : ''}</td>
                                    <td><p
                                        className='tabla-link-organizacion'
                                        onClick={() => { navigate(`/organizacion/${convenio.organizacion.id}`) }}
                                    >{convenio.organizacion.nombre}</p></td>
                                    <td>{convenio.registro.split('T')[0]}</td>
                                    <td>{convenio.inicio.split('T')[0]}</td>
                                    <td>{convenio.final.split('T')[0]}</td>
                                    <td className='tabla-celda-acciones'>
                                        <button
                                            className='btn-accion-2'
                                            onClick={() => { setOpenConvenio(true); setIdConvenio(convenio?.id); setIdOrganizacion(convenio?.organizacion.id) }}
                                        >
                                            <strong>VISUALIZAR</strong>
                                        </button>
                                        {
                                            convenio.organizacion.id === user.organizacion || user.rol.includes('ADMIN_SYS') && (
                                                <button
                                                    onClick={async () => {
                                                        const res = await deleteByIdConvenio(convenio?.id)
                                                        if (res === 204) {
                                                            navigate(0)
                                                        } else {
                                                            alert('NO SE PUDO ELIMINAR EL CONVENIO')
                                                        }
                                                    }}
                                                    className='btn-accion-cancelar-1'
                                                >
                                                    <strong>ELIMINAR</strong>
                                                </button>
                                            )
                                        }
                                        {
                                            convenio.organizacion.id != user.organizacion && user.rol.includes('ADMIN_ORG') && (
                                                <button
                                                    className='btn-accion-2'
                                                    onClick={() => {
                                                        handleParticiparConvenio(convenio.id)
                                                    }}
                                                >
                                                    <strong>PARTICIPAR</strong>
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        }
                        {
                            props.cursosTabla?.filter(e => e.estado === 'PUBLICADO').map(
                                curso => <tr>
                                    <td>{curso.titulo}</td>
                                    <td>{curso.descripcion.substring(0, 20)} ...</td>
                                    <td>{curso.publicado.split('T')[0]}</td>
                                    <td>{curso.inicio.split('T')[0]}</td>
                                    <td>{curso.final.split('T')[0]}</td>
                                    <td>{curso.organizacion.nombre}</td>
                                    <td>
                                        <button
                                            className='btn-accion-2'
                                            onClick={() => {
                                                props.id_curso(curso.id); props.open_curso(true)
                                            }}
                                        ><strong>VISUALIZAR</strong></button>
                                        {
                                            (user.organizacion === curso.organizacion.id || user.tipo === 'Comité') && (
                                                <button className='btn-accion-cancelar-1'
                                                    onClick={() => { handleEliminarCurso(curso.id) }}
                                                >
                                                    <strong>ELIMINAR</strong>
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        }

                        {
                            user.tipo != 'Comité' && props.visitasTabla?.filter(f => props.filtro ? f.empresa.nombre.includes(props?.filtro) : f).map(
                                visita => <tr>
                                    <td>{visita.id}</td>
                                    <td>{visita.escuela ? visita.escuela.nombre : visita.empresa.nombre}</td>
                                    <td>{visita.solicitado.split('T')[0]}</td>
                                    <td>{visita.aprobado?.split('T')[0] ? visita.aprobado?.split('T')[0] : 'SIN FECHA'}</td>
                                    <td>{visita.agendado?.split('T')[0] ? visita.agendado?.split('T')[0] : 'SIN FECHA'}</td>
                                    <td>{visita.estado}</td>
                                    <td>
                                        {visita.estado === 'PENDIENTE' && user.tipo != 'Escuela' && (
                                            <div>
                                                <button
                                                    className='btn-accion-2'
                                                    onClick={() => {
                                                        setIdVisita(visita.id)
                                                        setOpenVisita(true)
                                                    }}
                                                ><strong>APROBAR</strong></button>
                                                <button
                                                    className='btn-accion-cancelar-1'
                                                    onClick={() => { handleUpdateEstadoRechazadaVisitaById(visita.id) }}
                                                ><strong>RECHAZAR</strong></button>
                                            </div>
                                        )}
                                        {
                                            visita.estado === 'PENDIENTE' && user.tipo === 'Escuela' && (
                                                <div>
                                                    <button
                                                        className='btn-accion-cancelar-1'
                                                        onClick={() => [
                                                            handleDeleteByIdForEscuelas(visita.id)
                                                        ]}
                                                    >
                                                        <strong>ELIMINAR</strong>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        }

                        {
                            user.tipo === 'Comité' && props.visitasTabla?.map(
                                visita => <tr>
                                    <td>{visita?.id}</td>
                                    <td>{visita?.escuela}</td>
                                    <td>{visita?.empresa}</td>
                                    <td><button
                                        className='btn-accion-cancelar-1'
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            const status = await deleteByIdForEscuelas(visita?.id)
                                            if (status === 204) {
                                                navigate(0)
                                                alert('VISITA ELIMINADA')
                                            } else {
                                                alert('LA VISITA NO SE PUDO ELIMINAR')
                                            }
                                        }}
                                    >
                                        <strong>
                                            ELIMINAR
                                        </strong>
                                    </button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {
                openInscripcion && (<VisualizarEvento id_evento={idEvento} accion={setOpenInscripcion} />)
            }

            {
                openVisita && (
                    <VisualizarVisita idVisita={idVisita} accion={setOpenVisita} />
                )
            }

            {
                openEvento && (
                    <VisualizarEvento id_evento={idEvento} accion={setOpenEvento} modo="ver" inscrito={true} />
                )
            }

            {
                openEditarEvento && (
                    <VisualizarEvento id_evento={idEvento} accion={setOpenEditarEvento} modo="editar" />
                )
            }

            {
                openEditarComentario && (
                    <EditarComentario accion={setOpenEditarComentario} idComentario={idComentario} />
                )
            }

            {
                openConvenio && (
                    <VisualizarConvenio accion={setOpenConvenio} id_convenio={idConvenio} propietario={user.organizacion === idOrganizacion ? true : false} />
                )
            }

            {
                openVerEvento && (
                    <VisualizarEvento id_evento={idEvento} accion={setOpenVerEvento} modo="ver" />
                )
            }

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