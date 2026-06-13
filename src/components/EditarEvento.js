import { useEffect, useState } from "react"
import { eventoById, findParticipantesPendientesByIdEvento, updateEventoById } from "../services/Evento"
import { useNavigate } from "react-router-dom"
import { findParticipantesByIEvento, updateInscripcionByEstado } from "../services/Inscripcion"
import { getFotosByIdEvento } from "../services/Foto"
import { useAuth } from "../hooks/useAuth"

export default function EditarEvento(props) {
    const { user } = useAuth()

    const [evento, setEvento] = useState({
        titulo: '',
        descripcion: '',
        tipo: '',
        fecha_inicio: '',
        fecha_final: '',
        id_organizacion: user.organizacion
    })
    const [participantes, setParticipantes] = useState([])
    const [fotos, setFotos] = useState([])
    const [fotoSeleccionada, setFotoSeleccionada] = useState('')
    const [administrar, setAdministar] = useState(false)
    const [imagenes, setImagenes] = useState([])
    const [imagen, setImagen] = useState(null)
    const [idEvento, setIdEvento] = useState('')
    const [selectImagen, setSelectImagen] = useState(null)

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
            setFotos(res)
            setFotoSeleccionada(res[0])
        }

        fotosEvento()
        getEvento()
        participantesEvento()
    }, [])

    const navigate = useNavigate()

    const [imgTipoEvento, setImgTipoEvento] = useState([
        {
            id: 1,
            tipo: 'Capacitación y Desarrollo',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ub3RlYm9vay1wZW4taWNvbiBsdWNpZGUtbm90ZWJvb2stcGVuIj48cGF0aCBkPSJNMTMuNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJ2LTcuNCIvPjxwYXRoIGQ9Ik0yIDZoNCIvPjxwYXRoIGQ9Ik0yIDEwaDQiLz48cGF0aCBkPSJNMiAxNGg0Ii8+PHBhdGggZD0iTTIgMThoNCIvPjxwYXRoIGQ9Ik0yMS4zNzggNS42MjZhMSAxIDAgMSAwLTMuMDA0LTMuMDA0bC01LjAxIDUuMDEyYTIgMiAwIDAgMC0uNTA2Ljg1NGwtLjgzNyAyLjg3YS41LjUgMCAwIDAgLjYyLjYybDIuODctLjgzN2EyIDIgMCAwIDAgLjg1NC0uNTA2eiIvPjwvc3ZnPg=='
        },
        {
            id: 2,
            tipo: 'Networking y Vinculación',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2Vycy1pY29uIGx1Y2lkZS11c2VycyI+PHBhdGggZD0iTTE2IDIxdi0yYTQgNCAwIDAgMC00LTRINmE0IDQgMCAwIDAtNCA0djIiLz48cGF0aCBkPSJNMTYgMy4xMjhhNCA0IDAgMCAxIDAgNy43NDQiLz48cGF0aCBkPSJNMjIgMjF2LTJhNCA0IDAgMCAwLTMtMy44NyIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PC9zdmc+'
        },
        {
            id: 3,
            tipo: 'Gobernanza e Institucional',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wcmVzZW50YXRpb24taWNvbiBsdWNpZGUtcHJlc2VudGF0aW9uIj48cGF0aCBkPSJNMiAzaDIwIi8+PHBhdGggZD0iTTIxIDN2MTFhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWMyIvPjxwYXRoIGQ9Im03IDIxIDUtNSA1IDUiLz48L3N2Zz4='
        },
        {
            id: 4,
            tipo: 'Impacto Social y Comunitario',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1kcmFtYS1pY29uIGx1Y2lkZS1kcmFtYSI+PHBhdGggZD0iTTEwIDExaC4wMSIvPjxwYXRoIGQ9Ik0xNCA2aC4wMSIvPjxwYXRoIGQ9Ik0xOCA2aC4wMSIvPjxwYXRoIGQ9Ik02LjUgMTMuMWguMDEiLz48cGF0aCBkPSJNMjIgNWMwIDktNCAxMi02IDEycy02LTMtNi0xMmMwLTIgMi0zIDYtM3M2IDEgNiAzIi8+PHBhdGggZD0iTTE3LjQgOS45Yy0uOC44LTIgLjgtMi44IDAiLz48cGF0aCBkPSJNMTAuMSA3LjFDOSA3LjIgNy43IDcuNyA2IDguNmMtMy41IDItNC43IDMuOS0zLjcgNS42IDQuNSA3LjggOS41IDguNCAxMS4yIDcuNC45LS41IDEuOS0yLjEgMS45LTQuNyIvPjxwYXRoIGQ9Ik05LjEgMTYuNWMuMy0xLjEgMS40LTEuNyAyLjQtMS40Ii8+PC9zdmc+'
        },
        {
            id: 5,
            tipo: 'Promoción',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MtaWNvbiBsdWNpZGUtYnJpZWZjYXNlLWJ1c2luZXNzIj48cGF0aCBkPSJNMTIgMTJoLjAxIi8+PHBhdGggZD0iTTE2IDZWNGEyIDIgMCAwIDAtMi0yaC00YTIgMiAwIDAgMC0yIDJ2MiIvPjxwYXRoIGQ9Ik0yMiAxM2ExOC4xNSAxOC4xNSAwIDAgMS0yMCAwIi8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiB4PSIyIiB5PSI2IiByeD0iMiIvPjwvc3ZnPg=='
        }
    ]);



    const [inscripciones, setInscripciones] = useState([])

    const handleUpdateEstadoById = async (id, estado) => {
        const data = await updateInscripcionByEstado(id, estado)
        if (data) {
            navigate(0)
            alert('INSCRIPCION ACEPTADA')
        } else {
            navigate(0)
            alert('NO SE PUDO ACTUALIZAR LA INSCRIPCION')
        }
    }

    useEffect(() => {
        const getInscripciones = async () => {
            const data = await findParticipantesPendientesByIdEvento(idEvento)
            setInscripciones(data)
        }

        if (idEvento != '') {
            getInscripciones()
        }
    }, [idEvento])

    const handeUpdateEvento = async () => {
        const res = await updateEventoById(evento)
        if (res.status === 200) navigate(0)
        if (res.status != 200) alert('NO SE PUDO MODIFICAR EL EVENTO')
    }


    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="formulario-contenedor">
                    <div className="titulo-formulario"><h1>{evento?.titulo.substring(0, 25)}</h1></div>
                    <div className="formulario">
                        <div className="contenedor-datos-formulario">
                            <div className="contenedor-datos-interno">
                                <h6>Titulo:</h6>
                                <input onChange={(e) => { setEvento({ ...evento, titulo: e.target.value }) }} type="text" defaultValue={evento?.titulo} placeholder="Titulo" />
                                <h6>Descripcion:</h6>
                                <textarea onChange={(e) => { setEvento({ ...evento, descripcion: e.target.value }) }} type="text" placeholder="Descripcion" defaultValue={evento?.descripcion} />
                                <h6>Tipo:</h6>
                                <select onChange={(e) => { setEvento({ ...evento, tipo: e.target.value }) }}>
                                    <option>
                                        TIPO
                                    </option>
                                    {
                                        imgTipoEvento?.map(
                                            tipo => <option selected={tipo?.tipo === evento?.tipo}>
                                                {tipo?.tipo}
                                            </option>
                                        )
                                    }
                                </select>

                                <h6>Participantes:</h6>
                                <button
                                    className="btn-accion-2"
                                    onClick={() => { setIdEvento(evento?.id); setAdministar(true) }}
                                >
                                    <strong>ADMINISTRAR</strong>
                                </button>
                                <select>
                                    {
                                        participantes.map(
                                            participante => <option>
                                                {participante?.nombre_comercial}
                                            </option>
                                        )
                                    }
                                </select>
                                <h6>Fecha:</h6>
                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <h6>Inicio:</h6>
                                    <input defaultValue={evento?.fecha_inicio.split('T')[0]} onChange={(e) => { setEvento({ ...evento, fecha_inicio: e.target.value }) }} type="date" style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px' }} />
                                    <h6>Fin:</h6>
                                    <input defaultValue={evento?.fecha_final.split('T')[0]} onChange={(e) => { setEvento({ ...evento, fecha_final: e.target.value }) }} type="date" style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px' }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '250px', height: '350px' }}>
                            <img style={{ width: '100%', height: '90%', margin: 0 }} src={fotoSeleccionada ? fotoSeleccionada : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxwYXBlci1pY29uIGx1Y2lkZS13YWxscGFwZXIiPjxwYXRoIGQ9Ik0xMiAxN3Y0Ii8+PHBhdGggZD0iTTggMjFoOCIvPjxwYXRoIGQ9Im05IDE3IDYuMS02LjFhMiAyIDAgMCAxIDIuODEuMDFMMjIgMTUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iOSIgcj0iMiIvPjxyZWN0IHg9IjIiIHk9IjMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L3N2Zz4="} />
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', minWidth: '90%', maxWidth: '90%', overflowX: 'scroll', gap: '0.4rem' }}>
                                    {
                                        fotos?.map(
                                            f => <img src={f} style={{ height: '40px', width: '40px', margin: '0' }} onClick={() => { setFotoSeleccionada(f) }} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '50%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                        <button
                            className="btn-accion-cancelar-1"
                            onClick={() => { props?.accion(false) }}
                        ><strong>CANCELAR</strong></button>
                        <button
                            className="btn-accion-2"
                            onClick={handeUpdateEvento}
                        ><strong>GUARDAR</strong></button>
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
                                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h1>INSCRIPCIONES DEL EVENTO</h1>
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
                                                        <td>{inscripcion.id_inscripcion}</td>
                                                        <td><img src={inscripcion.organizacion.logo} style={{ width: '32px', height: '32px' }} /></td>
                                                        <td>{inscripcion.organizacion.nombre_comercial}</td>
                                                        <td>{inscripcion.fecha.split('T')[0]}</td>
                                                        <th>
                                                            <button
                                                                className="btn-accion-cancelar-1"
                                                                onClick={() => {
                                                                    handleUpdateEstadoById(inscripcion.id_inscripcion, 'RECHAZADO')
                                                                }}
                                                            >
                                                                <strong>RECHAZAR</strong>
                                                            </button>
                                                            <button
                                                                className="btn-accion-2"
                                                                onClick={() => {
                                                                    handleUpdateEstadoById(inscripcion.id_inscripcion, 'APROBADA')
                                                                }}
                                                            >
                                                                <strong>APROBAR</strong>
                                                            </button>
                                                        </th>
                                                    </tr>
                                                )
                                            }
                                        </tbody>

                                    </table>
                                </div>
                                <button
                                    onClick={() => { setAdministar(false) }}
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