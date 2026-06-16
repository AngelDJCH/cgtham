import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { useAuth } from "../hooks/useAuth";
import { allSolicitudes, createCurso, createInscripcionCurso, findByIdCurso, findToEmpresas, findToEscuelas, organizacionesParticipantes, organizacionesPendientes, solicitar, updateById, updateByIdForPeticion, updateEstadoById, updateInscripcionByEstado } from "../services/Curso";
import { useNavigate } from "react-router-dom";
import { getAllOrganizaciones } from "../services/Organizacion";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function Cursos() {

    const { user } = useAuth()
    const naviagte = useNavigate()

    const [openCreateCurso, setOpenCreateCurso] = useState(false)
    const [openCurso, setOpenCurso] = useState(false)
    const [openSolicitar, setOpenSolicitar] = useState(false)
    const [openSolicitudes, setOpenSolicitudes] = useState(false)
    const [enable, setEnable] = useState(false)

    const [inscripciones, setInscripciones] = useState([])

    const [idCurso, setIdCurso] = useState(null)
    const [cursos, setCursos] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])
    const [solicitudes, setSolicitudes] = useState([])

    const [administrar, setAdministrar] = useState(false)

    const [participantes, setParticipantes] = useState([])

    const [curso, setCurso] = useState({
        titulo: '',
        descripcion: '',
        inicio: '',
        final: '',
        estado: '',
        id_organizacion: ''
    })

    const [cursoSolicitud, setCursoSolicitud] = useState({
        titulo: '',
        descripcion: '',
        id_organizacion: ''
    })

    const handleCreate = async () => {
        const res = await createCurso({ ...curso, id_organizacion: user.organizacion })
        if (res && res?.status != 201) {
            alert('El curso no se creo')
        }

        setOpenCreateCurso(false)
    }

    const handleUpdateInscripcionEstado = async (id, estado) => {
        const status = await updateInscripcionByEstado(id, estado)
        if (status === 200) {
            naviagte(0)
            alert(`INSCRIPCION ACTUALIZADA - ${estado}`)
        } else {
            alert(`NO SE PUDO ACTUALIZAR LA INSCRIPCION - ${estado}`)
        }
    }

    const handleSolicitar = async () => {
        const status = await solicitar(cursoSolicitud.titulo, cursoSolicitud.descripcion, cursoSolicitud.id_organizacion)
        if (status === 201) {
            alert('La solicitud se completo - Espera a que la organización valide el curso')
        }
        setOpenSolicitar(false)
    }

    const handleUpdate = async () => {
        const res = await updateById(curso?.titulo, curso?.descripcion, curso?.inicio, curso?.final, curso?.id)
        if (res && res.status === 200) { naviagte(0); alert('Curso modificado') }
        if (!res && res.status != 200) { alert('Curso no modificado') }
    }

    const handleRechazarCurso = async (id_curso) => {
        const status = await updateEstadoById(id_curso)
        if (status && status === 200) { naviagte(0); alert('Curso rechazado') } else {
            alert('No se rechazo el curso')
        }
    }

    const handleParticipar = async (id_curso) => {
        const status = await createInscripcionCurso(id_curso, user.organizacion)
        if (status && status === 201) {
            naviagte(0)
            alert('INSCRIPCION REALIZADA')
        } else if (status && status === 409) {
            alert('YA ESTAS EN LISTA DE ESPERA')
        } else {
            alert('NO SE PUDO REALIZAR LA INSCRIPCION')
        }
    }

    useEffect(() => {
        const toEmpresas = async () => {
            const res = await findToEmpresas()
            setCursos(res)
        }

        const toEscuelas = async () => {
            const res = await findToEscuelas(user.organizacion)
            setCursos(res)
        }

        user.tipo != 'Escuela' ? toEmpresas() : toEscuelas()
    }, [])

    useEffect(() => {
        if (idCurso != null) {
            const findById = async () => {
                const res = await findByIdCurso(idCurso)
                setCurso(res)
            }
            const participantesCurso = async () => {
                const data = await organizacionesParticipantes(idCurso)
                setParticipantes(data)
            }
            const pendientesCurso = async () => {
                const data = await organizacionesPendientes(idCurso)
                setInscripciones(data)
            }

            pendientesCurso()
            participantesCurso()
            findById()
        }
    }, [idCurso])

    useEffect(() => {
        const getOrganizaciones = async () => {
            const data = await getAllOrganizaciones()
            setOrganizaciones(data)
        }

        getOrganizaciones()
    }, [])

    useEffect(() => {
        const getSolicitudes = async () => {
            const data = await allSolicitudes(user.organizacion)
            setSolicitudes(data)
        }

        getSolicitudes()
    }, [])
    const isSmallDevice = useMediaQuery('(max-width:768px)');

    return (
        <div>
            <NavBarAutenticado />
            <Filtros btn_accion_solicitudes={user.tipo === 'Escuela' ? setOpenSolicitudes : null} btn_accion_solicitud={user.tipo === 'Escuela' ? true : false} enableAccion={true} titulo='Cursos' accion={user.tipo != 'Escuela' ? 'SOLICITAR' : 'Crear curso'} btn_accion={user.tipo === 'Escuela' ? setOpenCreateCurso : setOpenSolicitar} />
            <TablaContenido id_curso={setIdCurso} open_curso={setOpenCurso} cursosTabla={cursos} encabezados={['Titulo', 'Descripcion', 'Publicado', 'Inicio', 'Fin', 'Organizacion', 'Acciones']} />
            {
                openCreateCurso && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div className="formulario-contenedor" style={{ height: isSmallDevice ? '90%' : null }}>
                                <div className="titulo-formulario"><h1>NUEVO CURSO</h1></div>
                                <div className="formulario" style={{ height: isSmallDevice ? '80%' : null, width: isSmallDevice ? '100%' : null }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                        <div className="contenedor-datos-interno">
                                            <h6>Titulo</h6>
                                            <input placeholder="Titulo" type="text" onChange={(e) => { setCurso({ ...curso, titulo: e.target.value }) }} />
                                            <h6>Descripción</h6>
                                            <textarea placeholder="Descripcion" type="text" onChange={(e) => { setCurso({ ...curso, descripcion: e.target.value }) }} />
                                            <h6>Fecha</h6>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <div>
                                                    <p>Inicio:</p>
                                                    <input type="date" onChange={(e) => { setCurso({ ...curso, inicio: e.target.value }) }} />
                                                </div>
                                                <div>
                                                    <p>Final:</p>
                                                    <input type="date" onChange={(e) => { setCurso({ ...curso, final: e.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ width: '100%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => {
                                            setOpenCreateCurso(false)
                                        }}
                                    ><strong>CERRAR</strong></button>
                                    <button
                                        className="btn-accion-2"
                                        onClick={() => { handleCreate() }}
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
                openSolicitar && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div className="formulario-contenedor">
                                <div className="titulo-formulario"><h1>SOLICITAR CURSO</h1></div>
                                <div className="formulario">
                                    <div className="contenedor-datos-formulario">
                                        <div className="contenedor-datos-interno">
                                            <h6>Titulo</h6>
                                            <input placeholder="Titulo" type="text" onChange={(e) => { setCursoSolicitud({ ...cursoSolicitud, titulo: e.target.value }) }} />
                                            <h6>Descripción</h6>
                                            <textarea placeholder="Descripcion" type="text" onChange={(e) => { setCursoSolicitud({ ...cursoSolicitud, descripcion: e.target.value }) }} />
                                            <h6>Organización</h6>
                                            <select

                                                onChange={(e) => {
                                                    const organizacion = organizaciones.filter(f => f.nombre_comercial === e.target.value)
                                                    console.log('La organizacion es: ', organizacion)

                                                    setCursoSolicitud({ ...cursoSolicitud, id_organizacion: organizacion[0].id })
                                                }}
                                            >

                                                <option>----</option>
                                                {
                                                    organizaciones.filter(tipo => tipo.tipo === 'Escuela').map(
                                                        org => <option>
                                                            {org.nombre_comercial}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ width: '250px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <p style={{ textAlign: 'justify' }}>
                                            <strong>Nota: </strong> Recuerda que el solicitar el curso a una institución educativa no asegura de forma inmediata su compromiso por impartir dicho curso.
                                            <br /> Depende de su programa de estudios, asi mismo como el tiempo para asignar fechas.
                                            <br />
                                            En caso de algun problema o inconveniente, debera ser reportado al siguiente correo <kbd><strong>cgtham@gmail.com</strong></kbd>
                                        </p>
                                    </div>

                                </div>
                                <div style={{ width: '50%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => {
                                            setOpenSolicitar(false)
                                        }}
                                    ><strong>CERRAR</strong></button>
                                    <button
                                        className="btn-accion-2"
                                        onClick={() => { handleSolicitar() }}
                                    >
                                        <strong>SOLICITAR</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }


            {
                openCurso && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div className="formulario-contenedor" style={{ height: isSmallDevice ? '90%' : null }}>
                                <div className="titulo-formulario"><h1>{curso?.titulo.substring(0, 45)}</h1></div>
                                <div className="formulario" style={{ height: isSmallDevice ? '80%' : null, width: isSmallDevice ? '100%' : null }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                        <div className="contenedor-datos-interno">
                                            <h6>Titulo</h6>
                                            <input placeholder="Titulo" type="text" onChange={(e) => { setCurso({ ...curso, titulo: e.target.value }) }} defaultValue={curso?.titulo} disabled={!enable} />
                                            <h6>Descripción</h6>
                                            <textarea onChange={(e) => { setCurso({ ...curso, descripcion: e.target.value }) }} defaultValue={curso?.descripcion} disabled={!enable} />
                                            <div>
                                                <h6>Participantes:</h6>
                                                <select style={{ width: '100%' }}>
                                                    {
                                                        (participantes === null || participantes.length === 0) ? <option>'SIN PARTICIPANTES'</option> : participantes?.map(
                                                            participante => (<option>
                                                                {participante.nombre}
                                                            </option>)
                                                        )
                                                    }
                                                </select>
                                                {
                                                    curso?.organizacion?.id === user?.organizacion && (
                                                        <div>
                                                            <button
                                                                className="btn-accion-2"
                                                                onClick={() => { setAdministrar(true) }}
                                                            >
                                                                <strong>
                                                                    ADMINISTRAR
                                                                </strong>
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <h6>Fecha</h6>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <div>
                                                    <p>Inicio:</p>
                                                    <input onChange={(e) => { setCurso({ ...curso, inicio: e.target.value }) }} type="date" defaultValue={curso?.inicio.split('T')[0]} disabled={!enable} />
                                                </div>
                                                <div>
                                                    <p>Final:</p>
                                                    <input onChange={(e) => { setCurso({ ...curso, final: e.target.value }) }} type="date" defaultValue={curso?.final.split('T')[0]} disabled={!enable} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        !isSmallDevice && (
                                            <div style={{ width: '250px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <p style={{ textAlign: 'justify' }}>
                                                    <strong>Nota: </strong>{user.tipo != 'Escuela' ? ' Recuerda que el solicitar tu participación al curso a una institución educativa no asegura de forma inmediata tu inscripción a dicho curso.' : ''}
                                                    <br />
                                                    En caso de algun problema o inconveniente, debera ser reportado al siguiente correo <kbd><strong>cgtham@gmail.com</strong></kbd>
                                                </p>
                                            </div>
                                        )
                                    }

                                </div>
                                <div style={{ width: isSmallDevice ? '100%': '50%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCurso(false); setEnable(false) }}
                                    ><strong>CERRAR</strong></button>
                                    {user.tipo === 'Escuela' ? <button
                                        onClick={() => {
                                            enable ? setEnable(false) : setEnable(true);
                                            if (enable) { handleUpdate() }
                                        }}
                                        className="btn-accion-2"
                                    ><strong>{enable ? 'GUARDAR' : 'EDITAR'}</strong></button> : <button
                                        className="btn-accion-2"
                                        onClick={() => { handleParticipar(curso?.id) }}
                                    ><strong>PARTICIPAR</strong></button>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            {
                openSolicitudes && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{
                                width: '90%', height: '80vh', padding: '1rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
                                justifyContent: 'space-around', alignItems: 'center', gap: '1rem'
                            }}>
                                <div style={{ width: '100%', height: '100%', minWidth:'100%', maxWidth:'100%', overflowX:'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h1>SOLICITUDES DE CURSOS</h1>
                                    <table className="contenedor-tablas-interno" style={{minHeight: '100px', height: 'auto', maxHeight: '500px', overflowY: 'scroll' }}>
                                        <thead>
                                            <tr>
                                                <th>Titulo</th>
                                                <th>Descripcion</th>
                                                <th>Fecha Peticion</th>
                                                <th>Fecha Inicio</th>
                                                <th>Fecha Fin</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                solicitudes.map(s => <tr>
                                                    <td>
                                                        {s.titulo}
                                                    </td>
                                                    <td>
                                                        {s.descripcion}
                                                    </td>
                                                    <td>
                                                        {s.publicado.split('T')[0]}
                                                    </td>
                                                    <td>AUN SIN DEFINIR</td>
                                                    <td>AUN SIN DEFINIR</td>
                                                    <td>
                                                        <button className="btn-accion-2"
                                                            onClick={() => {
                                                                setIdCurso(s.id)
                                                                setOpenCurso(true);
                                                                setOpenSolicitudes(false)
                                                            }}
                                                        ><strong>ACEPTAR</strong></button>
                                                        <button className="btn-accion-cancelar-1"
                                                            onClick={() => { handleRechazarCurso(s.id) }}
                                                        ><strong>RECHAZAR</strong></button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    onClick={() => {
                                        setOpenSolicitudes(false)
                                    }}
                                    className="btn-accion-cancelar-1"
                                >
                                    <strong>CERRAR</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


            {
                administrar && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{
                                width: '90%', height: '80vh', padding: '1rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
                                justifyContent: 'space-around', alignItems: 'center', gap: '1rem'
                            }}>
                                <div style={{ width: '100%', minWidth:'100%', maxWidth:'100%', overflowX:'scroll', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h1>INSCRIPCIONES DEL CURSO</h1>
                                    <table className="contenedor-tablas-interno" style={{ minHeight: '100px', height: 'auto', maxHeight: '500px', overflowY: 'scroll' }}>
                                        <thead>
                                            <tr
                                                style={{ color: 'white', backgroundColor: '#41431B' }}
                                            >
                                                <th>ID</th>
                                                <th>Logo</th>
                                                <th>Organizacion</th>
                                                <th>Fecha</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                inscripciones?.map(
                                                    inscripcion => <tr>
                                                        <td>{inscripcion.id}</td>
                                                        <td><img src={inscripcion.organizacion.logo} style={{ width: '32px', height: '32px' }} /></td>
                                                        <td>{inscripcion.organizacion.nombre}</td>
                                                        <td>{inscripcion.fecha.split('T')[0]}</td>
                                                        <th>
                                                            {
                                                                inscripcion.estado === 'PENDIENTE' && (
                                                                    <button
                                                                        className="btn-accion-cancelar-1"
                                                                        onClick={() => {
                                                                            // handleUpdateEstadoById(inscripcion.id_inscripcion, 'RECHAZADO')
                                                                            handleUpdateInscripcionEstado(inscripcion.id, 'RECHAZADA')
                                                                        }}
                                                                    >
                                                                        <strong>RECHAZAR</strong>
                                                                    </button>
                                                                )
                                                            }
                                                            {
                                                                inscripcion.estado === 'PENDIENTE' && (
                                                                    <button
                                                                        className="btn-accion-2"
                                                                        onClick={() => {
                                                                            handleUpdateInscripcionEstado(inscripcion.id, 'APROBADA')
                                                                            // handleUpdateEstadoById(inscripcion.id_inscripcion, 'APROBADA')
                                                                        }}
                                                                    >
                                                                        <strong>APROBAR</strong>
                                                                    </button>
                                                                )
                                                            }
                                                        </th>
                                                    </tr>
                                                )
                                            }
                                        </tbody>

                                    </table>
                                </div>
                                <button
                                    onClick={() => { setAdministrar(false) }}
                                    className="btn-accion-cancelar-1"
                                ><strong>CERRAR</strong></button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}