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
import EditarComentario from './EditarComentario.js'
import { useMediaQuery } from '@uidotdev/usehooks'

export default function TablaContenido(props) {
    const navigate = useNavigate()
    const { user } = useAuth()
    const isSmallDevice = useMediaQuery('(max-width:768px) or (max-width : 1024px)');

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
                            props.inscripcionesTabla?.filter(f => props.filtro.length === 0 || f.evento.titulo.toLowerCase().includes(props.filtro.toLowerCase())).map(
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
                                                        className='btn-accion-2'
                                                        value={inscrpcion.evento.id_evento}
                                                        onClick={(e) => {
                                                            setIdEvento(inscrpcion.evento.id_evento)
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
                            props?.eventosTabla?.filter(f => f.titulo.toLowerCase().includes(props?.filtro.toLowerCase()) || props?.filtro.length === 0).map(
                                evento => <tr>
                                    <td>
                                        {evento?.titulo}
                                    </td>
                                    <td>
                                        {
                                            evento?.descripcion.substring(0, 20)
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
                                            evento?.id_organizacion != user.organizacion && (user.tipo === 'Empresa' || user.tipo === 'Cámara de Comercio') && (
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
                                    <td>{convenio.descripcion.substring(0, 50)} {convenio.descripcion.length > 50 ? '...' : ''}</td>
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
                openInscripcion && (<VisualizarEvento id_evento={idEvento} accion={setOpenInscripcion} />)
            }

            {
                openVisita && (

                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div className="formulario-contenedor" style={{ width: isSmallDevice ? '90%' : null, height: isSmallDevice ? '90%' : null }}>
                                <div className="titulo-formulario"><h1 className='subtitulo'>SOLICITUD DE VISITA</h1></div>
                                <div className="formulario" style={{ height: isSmallDevice ? '80%' : null, width: isSmallDevice ? '100%' : null }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                        <div className="contenedor-datos-interno" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                                            <div style={{ width: '100%', height: '100px' }}>
                                                <img src={visitaData.escuela?.banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Solicitante:</h6>

                                            <p style={{ margin: 0, padding: 0, fontSize: '20px', textAlign: 'center' }}>{visitaData.escuela?.nombre}</p>
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Estado:</h6>

                                            <p style={{ margin: 0, padding: 0, fontSize: '15px', textAlign: 'center' }}>{visitaData.estado}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px' }}>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Solicitado:</h6>
                                                    <input type='date' defaultValue={visitaData.solicitado.split('T')[0]} disabled />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px' }}>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Agendar:</h6>
                                                    {
                                                        visitaData.agendado != null ? <input type='date' defaultChecked={visitaData.agendado.split('T')[0]} /> : <input type='date' id='fecha_visita' />
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {
                                        !isSmallDevice && (

                                            <div style={{ display: 'flex', width: isSmallDevice ? '40%' : '250px', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                <p><strong>Nota:</strong> Recuerda que las visitas una vez agendadas no podran ser moficadas.
                                                    <br /> En caso de tener algun problema reportar a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div style={{ width: '50%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
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
                    <VisualizarEvento id_evento={idEvento} accion={setOpenEvento} inscrito={true} />
                )
            }

            {
                openEditarEvento && (
                    <EditarEvento id_evento={idEvento} accion={setOpenEditarEvento} />
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

        </div>
    )
}