import { useEffect, useState } from "react"
import { eventoById, findParticipantesPendientesByIdEvento, updateEventoById } from "../services/Evento"
import { useNavigate } from "react-router-dom"
import { findParticipantesByIEvento } from "../services/Inscripcion"

export default function EditarEvento(props) {

    const [evento, setEvento] = useState(null)
    const [participantes, setParticipantes] = useState([])

    const [administrar, setAdministar] = useState(false)

    const [idEvento, setIdEvento] = useState('')

    useEffect(() => {
        const getEvento = async () => {
            const res = await eventoById(props.id_evento)
            setEvento(res)
        }

        const participantesEvento = async () => {
            const res = await findParticipantesByIEvento(props?.id_evento)
            setParticipantes(res)
        }


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
                <div style={{ display: 'flex', flexDirection: 'column', width: '400px', backgroundColor: 'white', padding: '1rem', borderRadius: '10px', gap: '1rem' }}>
                    <input type="text" defaultValue={evento?.titulo} style={{ border: 'none', borderBottom: '1px solid black', textAlign: 'center' }}
                        onChange={(e) => {
                            setEvento({
                                ...evento,
                                titulo: e.target.value
                            })
                        }}
                    />
                    <textarea type="text" defaultValue={evento?.descripcion} style={{ width: '100%', height: '50px', maxHeight: '50px', maxWidth: '100%', minHeight: '50px', minWidth: '100%', border: 'none', borderBottom: '1px solid black' }}
                        onChange={(e) => {
                            setEvento({
                                ...evento,
                                descripcion: e.target.value
                            })
                        }}
                    />
                    <select style={{ borderBottom: '1px solid black' }}
                        onChange={(e) => {
                            setEvento({
                                ...evento,
                                tipo: e.target.value
                            })
                        }}
                    >
                        {
                            imgTipoEvento?.map(
                                tipo => <option selected={tipo?.tipo === evento?.tipo}>
                                    {tipo?.tipo}
                                </option>
                            )
                        }
                    </select>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <div>
                            <p>Inicio:</p>
                            <input type="date" defaultValue={evento?.fecha_inicio.split('T')[0]} style={{ border: '2px solid black', borderRadius: '5px', width: '150px' }}
                                onChange={(e) => {
                                    setEvento({
                                        ...evento,
                                        fecha_inicio: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <p>Fin:</p>
                            <input type="date" defaultValue={evento?.fecha_final.split('T')[0]} style={{ border: '2px solid black', borderRadius: '5px', width: '150px' }}
                                onChange={(e) => {
                                    setEvento({
                                        ...evento,
                                        fecha_final: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                        <p>Publicado:</p>
                        <input type="date" defaultValue={evento?.fecha_publicacion.split('T')[0]} disabled />
                    </div>
                    <div>
                        <button
                            className="btn-accion-2"
                            onClick={() => { setIdEvento(evento?.id); setAdministar(true) }}
                        >
                            <strong>ADMINISTRAR</strong>
                        </button>
                    </div>
                    <div>
                        <select>
                            {
                                participantes.map(
                                    participante => <option>
                                        {participante?.nombre_comercial}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <img src="" />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
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
                                <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
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
                                                            >
                                                                <strong>RECHAZAR</strong>
                                                            </button>
                                                            <button
                                                                className="btn-accion-2"
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