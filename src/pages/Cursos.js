import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { useAuth } from "../hooks/useAuth";
import { allSolicitudes, createCurso, findByIdCurso, findToEmpresas, findToEscuelas, solicitar, updateById, updateByIdForPeticion, updateEstadoById } from "../services/Curso";
import { useNavigate } from "react-router-dom";
import { getAllOrganizaciones } from "../services/Organizacion";

export default function Cursos() {

    const { user } = useAuth()
    const naviagte = useNavigate()

    const [openCreateCurso, setOpenCreateCurso] = useState(false)
    const [openCurso, setOpenCurso] = useState(false)
    const [openSolicitar, setOpenSolicitar] = useState(false)
    const [openSolicitudes, setOpenSolicitudes] = useState(false)
    const [enable, setEnable] = useState(false)

    const [idCurso, setIdCurso] = useState(null)
    const [cursos, setCursos] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])
    const [solicitudes, setSolicitudes] = useState([])

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
                            <div style={{ width: '400px', height: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '1rem', borderRadius: '10px' }}>
                                <h6>Titulo</h6>
                                <input placeholder="Titulo" type="text" onChange={(e) => { setCurso({ ...curso, titulo: e.target.value }) }} />
                                <h6>Descripción</h6>
                                <textarea placeholder="Descripcion" style={{ minWidth: '100%', maxWidth: '100%', minHeight: '50px', maxHeight: '50px' }} type="text" onChange={(e) => { setCurso({ ...curso, descripcion: e.target.value }) }} />
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
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
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
                        <div className="overllay-contenedor">
                            <div style={{ width: '400px', height: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '1rem', borderRadius: '10px' }}>
                                <h6>Titulo</h6>
                                <input placeholder="Titulo" type="text" onChange={(e) => { setCursoSolicitud({ ...cursoSolicitud, titulo: e.target.value }) }} />
                                <h6>Descripción</h6>
                                <textarea placeholder="Descripcion" style={{ minWidth: '100%', maxWidth: '100%', minHeight: '50px', maxHeight: '50px' }} type="text" onChange={(e) => { setCursoSolicitud({ ...cursoSolicitud, descripcion: e.target.value }) }} />
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
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
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
                                        <strong>GUARDAR</strong>
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
                        <div className="overllay-contenedor">
                            <div style={{ width: '400px', backgroundColor: 'white', borderRadius: '10px', padding: '1rem' }}>
                                {
                                    enable ? <input placeholder="Titulo" type="text" onChange={(e) => { setCurso({ ...curso, titulo: e.target.value }) }} defaultValue={curso?.titulo} /> : <h1>{curso?.titulo}</h1>
                                }
                                <input type="date" defaultValue={curso?.publicado?.split('T')[0]} disabled={true} />
                                <h6>Descripción</h6>
                                <textarea onChange={(e) => { setCurso({ ...curso, descripcion: e.target.value }) }} defaultValue={curso?.descripcion} style={{ maxWidth: '100%', minWidth: '100%', minHeight: '50px', maxHeight: '50px' }} disabled={!enable} />
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
                                <div>
                                    <h6>Participantes:</h6>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
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
                                <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <h1>SOLICITUDES DE CURSOS</h1>
                                    <table className="contenedor-tablas-interno" style={{ minHeight: '100px', height: 'auto', maxHeight: '500px', overflowY: 'scroll' }}>
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
        </div>
    )
}