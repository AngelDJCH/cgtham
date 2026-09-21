
import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { useAuth } from "../hooks/useAuth";
import { allSolicitudes, createCurso, createInscripcionCurso, findByIdCurso, findToEmpresas, findToEscuelas, organizacionesParticipantes, organizacionesPendientes, solicitar, updateById, updateByIdForPeticion, updateEstadoById, updateInscripcionByEstado } from "../services/Curso";
import { useNavigate } from "react-router-dom";
import { getAllOrganizaciones } from "../services/Organizacion";
import { useMediaQuery } from "@uidotdev/usehooks";
import Loader from "../components/Loader";

export default function VisualizarCurso(props) {
    const { user } = useAuth()
    const naviagte = useNavigate()
    const [enable, setEnable] = useState(false)
    const [inscripciones, setInscripciones] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])
    const [administrar, setAdministrar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [participantes, setParticipantes] = useState([])
    const [curso, setCurso] = useState({
        titulo: '',
        descripcion: '',
        inicio: '',
        final: '',
        estado: '',
        id_organizacion: ''
    })
    const handleUpdateInscripcionEstado = async (id, estado) => {
        const status = await updateInscripcionByEstado(id, estado)
        if (status === 200) {
            naviagte(0)
            alert(`INSCRIPCION ACTUALIZADA - ${estado}`)
        } else {
            alert(`NO SE PUDO ACTUALIZAR LA INSCRIPCION - ${estado}`)
        }
    }
    const handleUpdate = async () => {
        setLoading(true)
        const res = await updateById(curso?.titulo, curso?.descripcion, curso?.inicio, curso?.final, curso?.id)
        if (res && res.status === 200) {
            setLoading(false);
            naviagte(0); alert('Curso modificado')
        } else {
            setLoading(false)
            alert('Curso no modificado')
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
        setLoading(false)
    }
    useEffect(() => {
        if (props?.id_curso != null) {
            const findById = async () => {
                const res = await findByIdCurso(props?.id_curso)
                setCurso(res)
            }
            const participantesCurso = async () => {
                const data = await organizacionesParticipantes(props?.id_curso)
                setParticipantes(data)
            }
            const pendientesCurso = async () => {
                const data = await organizacionesPendientes(props?.id_curso)
                setInscripciones(data)
            }
            pendientesCurso()
            participantesCurso()
            findById()
            setLoading(false)
        }
    }, [props?.id_curso])
    useEffect(() => {
        const getOrganizaciones = async () => {
            const data = await getAllOrganizaciones()
            setOrganizaciones(data)
        }
        getOrganizaciones()
    }, [])
    const isSmallDevice = useMediaQuery('(max-width:768px) or (max-width : 1024px)');
    return (
        <>
            <div className="overllay"></div>
            <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <div className="formulario-contenedor" style={{ width: isSmallDevice ? '100%' : null, height: isSmallDevice ? '90%' : null }}>
                    <div className="titulo-formulario"><h1 className="subtitulo">{curso?.titulo?.substring(0, 50)}</h1></div>
                    <div className="formulario" style={{ height: isSmallDevice ? '80%' : null, width: isSmallDevice ? '100%' : null }}>
                        <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                            <div className="contenedor-datos-interno" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    <div className="contenedor-botones-formulario">
                        <button
                            className="btn-accion-cancelar-1"
                            onClick={() => { setLoading(true); props?.accion(false); setEnable(false) }}
                        ><strong>CERRAR</strong></button>
                        {user.tipo === 'Escuela'
                            && (<button
                                onClick={() => {
                                    enable ? setEnable(false) : setEnable(true);
                                    if (enable) { handleUpdate() }
                                }}
                                className="btn-accion-2"
                            ><strong>{enable ? 'GUARDAR' : 'EDITAR'}</strong></button>)
                        }
                        {
                            user.tipo != 'Escuela' && user.tipo != 'Comité' && (
                                <button
                                    className="btn-accion-2"
                                    onClick={() => { setLoading(true); handleParticipar(curso?.id) }}
                                ><strong>PARTICIPAR</strong></button>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                administrar && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{
                                width: '90%', height: '80vh', padding: '1rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
                                justifyContent: 'space-around', alignItems: 'center', gap: '1rem'
                            }}>
                                <div style={{ width: '100%', minWidth: '100%', maxWidth: '100%', overflowX: 'scroll', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            {
                loading && (
                    <Loader />
                )
            }
        </>
    )
}