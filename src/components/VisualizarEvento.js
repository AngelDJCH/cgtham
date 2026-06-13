
import { useEffect, useState } from "react"
import { eventoById, updateEventoById } from "../services/Evento"
import { useNavigate } from "react-router-dom"
import { findParticipantesByIEvento } from "../services/Inscripcion"
import { getFotosByIdEvento } from "../services/Foto"
import '../styles/botones.css'
import { useAuth } from "../hooks/useAuth"
import InscripcionAlterta from "./InscripcionAlterta"

export default function VisualizarEvento(props) {
    const [evento, setEvento] = useState(null)
    const [participantes, setParticipantes] = useState([])
    const [fotos, setFotos] = useState([])
    const [fotoSeleccionada, setFotoSeleccionada] = useState('')
    const { user } = useAuth()
    const [openInscripcion, setOpenInscripcion] = useState(false)
    const [idEvento, setIdEvento] = useState(null)


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

    const handeUpdateEvento = async () => {
        const res = await updateEventoById(evento)
        if (res.status === 200) navigate(0)
        if (res.status != 200) alert('NO SE PUDO MODIFICAR EL EVENTO')
    }

    useEffect(() => {
        const getEvento = async () => {
            const res = await eventoById(props?.id_evento)
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

        getEvento()
        fotosEvento()
        participantesEvento()
    }, [])

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
                                <input type="text" value={evento?.titulo} placeholder="Titulo" />
                                <h6>Descripcion:</h6>
                                <textarea type="text" placeholder="Descripcion" value={evento?.descripcion} />
                                <h6>Tipo:</h6>
                                <select>
                                    <option>
                                        {evento?.tipo}
                                    </option>
                                </select>

                                <h6>Participantes:</h6>
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
                                    <input value={evento?.fecha_inicio.split('T')[0]} type="date" style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px' }} />
                                    <h6>Fin:</h6>
                                    <input value={evento?.fecha_final.split('T')[0]} type="date" style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px' }} />
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
                            onClick={() => {
                                props?.accion(false)
                            }}
                            className="btn-accion-cancelar-1"
                        ><strong>CERRAR</strong></button>
                        {
                            !props?.inscrito && user.organizacion != evento?.id_organizacion && (
                                <button
                                    className="btn-accion-2"
                                    onClickCapture={() => { setIdEvento(evento?.id); setOpenInscripcion(true) }}
                                ><strong>PARTICIPAR</strong></button>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div style={{ display: 'flex', flexDirection: 'row', width: 'auto', backgroundColor: 'white', padding: '1rem', borderRadius: '10px', gap: '2.5rem' }}>
                    <div style={{ width: '450px' }}>
                        <h1 style={{ border: 'none', borderBottom: '2px solid #41431B', textAlign: 'center' }}>{evento?.titulo}</h1>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', height: '10px' }}>
                            <p><strong>Publicado:</strong></p>
                            <p>{evento?.fecha_publicacion.split('T')[0]}</p>
                        </div>
                        <p style={{ width: '100%', height: '50px', maxHeight: '50px', maxWidth: '100%', minHeight: '50px', minWidth: '100%', border: 'none', borderBottom: '2px solid #41431B', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                            {evento?.descripcion}
                        </p>
                        <p style={{ borderBottom: '2px solid #41431B' }}>
                            <strong>Tipo: </strong>{evento?.tipo}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <p><strong>Inicio:</strong></p>
                                <p style={{ border: '2px solid #41431B', borderRadius: '5px', width: '100px', textAlign: 'center', height: '25px' }}>{evento?.fecha_inicio.split('T')[0]}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <p><strong>Fin:</strong></p>
                                <p style={{ border: '2px solid #41431B', borderRadius: '5px', width: '100px', textAlign: 'center', height: '25px' }}>{evento?.fecha_final.split('T')[0]}</p>
                            </div>
                        </div>

                        <div>
                            <h6>PARTICIPANTES:</h6>
                            <div style={{ maxWidth: '400px', minWidth: '400px', maxHeight: '40px', minHeight: '40px', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'thin', display: 'flex', gap: '0.2rem' }}>
                                {
                                    participantes?.map(
                                        p => <div style={{ width: '32px', height: '32px', flexShrink: 0 }}>
                                            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={p.logo} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            <button
                                onClick={() => {
                                    props?.accion(false)
                                }}
                                className="btn-accion-cancelar-1"
                            ><strong>CERRAR</strong></button>
                            {
                                user.organizacion != evento?.id_organizacion && (
                                    <button
                                        className="btn-accion-2"
                                        onClickCapture={() => {setIdEvento(evento?.id); setOpenInscripcion(true) }}
                                    ><strong>PARTICIPAR</strong></button>
                                )
                            }
                        </div>
                    </div>
                    <div style={{ width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                !fotoSeleccionada && (
                                    <div style={{ width: '100%', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <h1>SELECCIONA UNA FOTO</h1>
                                    </div>
                                )
                            }
                            {
                                fotoSeleccionada && (
                                    <img src={fotoSeleccionada} style={{ width: '100%', height: '320px', margin: '0' }} />
                                )
                            }
                        </div>
                        <div style={{ height: '19%', maxWidth: '100%', overflowX: 'scroll', overflowY: 'hidden', display: 'flex', gap: '1rem', padding: '0', margin: '0', scrollbarWidth: 'none', marginTop: '1.5rem' }}>
                            {
                                fotos?.map(
                                    f => <img src={f} style={{ height: '40px', width: '40px', margin: '0' }} onClick={() => { setFotoSeleccionada(f) }} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div> */}

            {
                openInscripcion && (
                    <InscripcionAlterta id_evento={idEvento} nombre_evento={evento?.titulo} accion={setOpenInscripcion} />
                )
            }
        </div>
    )
}