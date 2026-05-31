import { useEffect, useState } from 'react'
import '../styles/contenedor-tablas.css'
import { useNavigate } from 'react-router-dom'
import { deleteComentarioById, getComentarioById, updateById, updateComentarioByEstado } from '../services/Comentario'
import { useAuth } from '../hooks/useAuth'
import { deleteById, updateInscripcionByEstado } from '../services/Inscripcion'
import EditarEvento from './EditarEvento.js'
import VisualizarEvento from './VisualizarEvento'
import { deleteEventoById } from '../services/Evento.js'
import { createConvenioOrganizacion } from '../services/ConvenioOrganizacion.js'
import VisualizarConvenio from './VisualizarConvenio.js'
import { deleteCursoById, updateEstadoById } from '../services/Curso.js'
import { deleteByIdForEscuelas, findById, updateEstadoRechazadaById, updateVisitaById } from '../services/Visita.js'
import InscripcionAlterta from './InscripcionAlterta.js'

export default function TablaContenido(props) {
    const navigate = useNavigate()
    const { user } = useAuth()

    const [openEvento, setOpenEvento] = useState(false)
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
    const [visitaData, setVisitaData] = useState({
        id: '',
        solicitado: '',
        aprobado: '',
        agendado: '',
        estado: ''
    })

    const imgAprobar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGQ1ZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1leWUtaWNvbiBsdWNpZGUtZXllIj48cGF0aCBkPSJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiLz48L3N2Zz4='
    const imgRechazar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10cmFzaDItaWNvbiBsdWNpZGUtdHJhc2gtMiI+PHBhdGggZD0iTTEwIDExdjYiLz48cGF0aCBkPSJNMTQgMTF2NiIvPjxwYXRoIGQ9Ik0xOSA2djE0YTIgMiAwIDAgMS0yIDJIN2EyIDIgMCAwIDEtMi0yVjYiLz48cGF0aCBkPSJNMyA2aDE4Ii8+PHBhdGggZD0iTTggNlY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiLz48L3N2Zz4='

    const handleParticiparConvenio = async (id_convenio) => {
        const res = await createConvenioOrganizacion('PARTICIPANTE', id_convenio, user.organizacion)
        if (res.status === 201) {
            navigate(0)
            alert('ESPERA A QUE LA ORGANIZACIÓN VALIDE TU PARTICIPACION')
        } else {
            alert('OCURRIO UN ERROR')
        }
    }

    const handleEliminarCurso = async (id_curso) => {
        const res = await deleteCursoById(id_curso)
        if (res && res.status === 200) { navigate(0); alert('Curso Eliminado') } else {
            alert('No se elimino el curso')
        }
    }

    const handleUpdateById = async (fecha_visita, id) => {
        const res = await updateVisitaById(fecha_visita, id)
        if (res && res === 200) { navigate(0); alert('Visita aprobada') } else {
            alert('No se pudo aprobar la visita')
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


    useEffect(() => {
        const getVisita = async () => {
            const res = await findById(idVisita)
            setVisitaData(res)
        }

        if (idVisita != null) { getVisita() }

    }, [idVisita])

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
                            props.inscripcionesTabla?.filter(f => props.filtro.length === 0 || f.evento.titulo.includes(props.filtro)).map(
                                inscrpcion => <tr>
                                    <td defaultValue={inscrpcion.organizacion.id}>{inscrpcion.organizacion.nombre_comercial}</td>
                                    <td defaultValue>{inscrpcion.evento.titulo}</td>
                                    <td defaultValue={inscrpcion.inscripcion.id}>{inscrpcion.inscripcion.fecha.split('T')[0]}</td>
                                    <td>{inscrpcion.inscripcion.estado}</td>
                                    <td>
                                        {
                                            inscrpcion.inscripcion.estado != 'PENDIENTE' && (
                                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                                    <button
                                                        value={inscrpcion.evento.id_evento}
                                                        onClick={(e) => {
                                                            setIdEvento(inscrpcion.evento.id_evento)
                                                            setOpenEvento(true)
                                                        }}

                                                    >
                                                        <img src={imgAprobar} style={{ width: '16px', height: '16px' }} />
                                                    </button>
                                                </div>
                                            )
                                        }

                                        {
                                            inscrpcion.inscripcion.estado === 'PENDIENTE' && (

                                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                                    <button
                                                        value={inscrpcion.evento.id_evento}
                                                        className='btn-accion-2'
                                                        onClick={(e) => {
                                                            setIdEvento(inscrpcion.evento.id_evento)
                                                            setOpenEvento(true)
                                                        }}

                                                    >
                                                        <strong>
                                                            VER
                                                        </strong>
                                                        {/* <img src={imgAprobar} style={{ width: '16px', height: '16px' }} /> */}
                                                    </button>
                                                    <button
                                                    className='btn-accion-cancelar-1'
                                                        onClick={async () => {

                                                            const status = await deleteById(inscrpcion.inscripcion.id_inscripcion)
                                                            navigate(0)

                                                        }}
                                                    >
                                                        <strong>
                                                            CANCELAR
                                                        </strong>
                                                        {/* <img
                                                            onClick={async () => {

                                                                const status = await deleteById(inscrpcion.inscripcion.id_inscripcion)
                                                                navigate(0)

                                                            }}
                                                            src={imgRechazar} style={{ width: '16px', height: '16px' }} /> */}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </td>
                                </tr>
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
                                                        console.log(comentario.id)
                                                        setIdComentario(comentario.id)
                                                        setOpenEditarComentario(true)
                                                    }}
                                                >
                                                    EDITAR
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
                                                    ELIMINAR
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
                                    <td style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const status = await updateComentarioByEstado(comentario.comentario.id, 'Aprobado', user.id)
                                                    if (status === 200) alert('COMENTARIO APROBADO')
                                                    navigate(0)
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                            style={{ borderRadius: '2px', backgroundColor: 'white', border: 'none', cursor: 'pointer' }}
                                        >
                                            <img src={imgAprobar} style={{ width: '16px', height: '16px' }} />
                                        </button>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const status = await updateComentarioByEstado(comentario.comentario.id, 'Rechazado', user.id)
                                                    if (status === 200) alert('COMENTARIO RECHAZADO')
                                                    navigate(0)
                                                } catch (error) {
                                                    alert('OCURRIO UN ERROR')
                                                }
                                            }}
                                            style={{ borderRadius: '2px', backgroundColor: 'white', border: 'none', cursor: 'pointer' }}
                                        >
                                            <img src={imgRechazar} style={{ width: '16px', height: '16px' }} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                        {
                            props?.eventosTabla?.filter(f => f.titulo.includes(props?.filtro) || props?.filtro.length === 0).map(
                                evento => <tr>
                                    <td>
                                        {evento?.titulo}
                                    </td>
                                    <td>
                                        {
                                            evento?.descripcion
                                        }
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
                                        {
                                            evento?.id_organizacion === user.organizacion && (
                                                <button
                                                    onClick={() => {
                                                        setIdEvento(evento?.id)
                                                        setOpenEditarEvento(true)
                                                    }}
                                                    className='btn-accion-2'
                                                >
                                                    EDITAR
                                                </button>
                                            )
                                        }
                                        {
                                            evento?.id_organizacion === user.organizacion || user.rol.includes('ADMIN_SYS') && (
                                                <button
                                                    onClick={async () => {
                                                        const res = await deleteEventoById(evento?.id)
                                                        navigate(0)
                                                    }}
                                                    className='btn-accion-cancelar-1'
                                                >
                                                    ELIMINAR
                                                </button>
                                            )
                                        }
                                        {
                                            evento?.id_organizacion != user.organizacion && (
                                                <button
                                                    className='btn-accion-2'
                                                    onClick={() => {
                                                        setIdEvento(evento.id)
                                                        setNombreEvento(evento.titulo)
                                                        setOpenInscripcion(true)
                                                    }}
                                                >
                                                    <strong>
                                                        PARTICIPAR
                                                    </strong>
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        }

                        {
                            props?.conveniosTabla?.map(
                                convenio => <tr>
                                    <td>{convenio.titulo}</td>
                                    <td>{convenio.tipo}</td>
                                    <td>{convenio.subtipo}</td>
                                    <td>{convenio.descripcion}</td>
                                    <td><p
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { navigate(`/organizacion/${convenio.organizacion.id}`) }}
                                    >{convenio.organizacion.nombre}</p></td>
                                    <td>{convenio.registro.split('T')[0]}</td>
                                    <td>{convenio.inicio.split('T')[0]}</td>
                                    <td>{convenio.final.split('T')[0]}</td>
                                    <td>
                                        <button
                                            className='btn-accion-2'
                                            onClick={() => { setOpenConvenio(true); setIdConvenio(convenio?.id); setIdOrganizacion(convenio?.organizacion.id) }}
                                        >
                                            <strong>VISUALIZAR</strong>
                                        </button>
                                        {
                                            convenio.organizacion.id === user.organizacion && !user.rol.includes('ADMIN_SYS') && (
                                                <button
                                                    className='btn-accion-cancelar-1'
                                                >
                                                    <strong>ELIMINAR</strong>
                                                </button>
                                            )
                                        }
                                        {
                                            convenio.organizacion.id === user.organizacion && !user.rol.includes('ADMIN_SYS') && (
                                                <button
                                                    className='btn-accion-2'
                                                >
                                                    <strong>EDITAR</strong>
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
                                    <td>{curso.descripcion}</td>
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
                                        {user.tipo != 'Escuela' && (
                                            <button
                                                className="btn-accion-2"
                                            ><strong>PARTICIPAR</strong></button>
                                        )}
                                        {
                                            user.organizacion === curso.organizacion.id && (
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
                            props.visitasTabla?.map(
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
                    </tbody>
                </table>
            </div>

            {
                openInscripcion && (<InscripcionAlterta id_evento={idEvento} nombre_evento={nombreEvento} accion={setOpenInscripcion} />)
            }

            {
                openVisita && (
                    <div>
                        <div className='overllay'></div>
                        <div className='overllay-contenedor'>
                            <div style={{ width: '450px', height: 'auto', backgroundColor: 'white', padding: '1rem', }}>
                                <div style={{ width: '100%', height: '100px' }}>
                                    <img src={visitaData.escuela?.banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50px', height: '50px' }}>
                                        <img src={visitaData.escuela?.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <h1 style={{ margin: 0, padding: 0 }}>{visitaData.escuela?.nombre}</h1>
                                </div>
                                <p><strong>Estado: </strong>{visitaData.estado}</p>
                                <div>
                                    <h6 style={{ margin: 0 }}>FECHAS</h6>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div>
                                            <h6 style={{ margin: 0 }}>Solicitado:</h6>
                                            <input type='date' defaultValue={visitaData.solicitado.split('T')[0]} />
                                        </div>
                                        <div>
                                            <h6 style={{ margin: 0 }}>Agendar:</h6>
                                            {
                                                visitaData.agendado != null ? <input type='date' defaultChecked={visitaData.agendado.split('T')[0]} /> : <input type='date' id='fecha_visita' />
                                            }
                                        </div>
                                        {/* {
                                        visitaData.aprobado != null ? <input type='date' defaultChecked={visitaData.aprobado.split('T')[0]} /> : <input type='date' />
                                    } */}
                                    </div>
                                </div>
                                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-evenly' }}>
                                    <button
                                        className='btn-accion-cancelar-1'
                                        onClick={() => { setOpenVisita(false) }}
                                    >
                                        <strong>CANCELAR</strong>
                                    </button>
                                    <button
                                        className='btn-accion-2'
                                        onClick={() => {
                                            const f_visita = document.getElementById('fecha_visita').value
                                            handleUpdateById(f_visita, visitaData.id)
                                        }}
                                    >
                                        <strong>GUARDAR</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                openEvento && (
                    <VisualizarEvento id_evento={idEvento} accion={setOpenEvento} />
                )
            }

            {
                openEditarEvento && (
                    <EditarEvento id_evento={idEvento} accion={setOpenEditarEvento} />
                )
            }

            {
                openEditarComentario && (
                    <div>
                        <div className='overllay'></div>
                        <div className='overllay-contenedor'>
                            <div style={{ width: '250px', height: '100px' }}>
                                <h1 style={{ textAlign: 'center', margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '25px' }}>EDITAR COMENTARIO</h1>
                                <textarea defaultValue={comentarioData?.contenido} onChange={(e) => { setComentarioData({ ...comentarioData, contenido: e.target.value }) }} style={{ width: '90%', height: '100px', maxWidth: '100%', maxHeight: '100px', minWidth: '100%', minHeight: '100px' }} />
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                    <button
                                        className='btn-accion-cancelar-1'
                                        onClick={() => { setOpenEditarComentario(false) }}
                                    ><strong>CANCELAR</strong></button>
                                    <button
                                        onClick={async () => {
                                            if (comentarioData.contenido.length >= 13 && comentarioData.contenido.length <= 70) {
                                                const res = await updateById(idComentario, comentarioData.contenido)
                                                if (res.status === 200) {
                                                    alert('COMENTARIO ACTUALIZADO')
                                                    navigate(0)
                                                } else {
                                                    alert('NO SE PUDO ACTUALIZAR EL COMENTARIO')
                                                }
                                            } else {
                                                alert('El comentario debe tener entre 13 y 70 caracteres')
                                            }
                                        }}
                                        className='btn-accion-2'
                                    ><strong>GUARDAR</strong></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                openConvenio && (
                    <VisualizarConvenio accion={setOpenConvenio} id_convenio={idConvenio} propietario={user.organizacion === idOrganizacion ? true : false} />
                )
            }

        </div>
    )
}