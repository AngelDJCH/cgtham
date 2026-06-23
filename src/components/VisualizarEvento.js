
import { useEffect, useState } from "react"
import { eventoById, updateEventoById } from "../services/Evento"
import { useNavigate } from "react-router-dom"
import { findParticipantesByIEvento } from "../services/Inscripcion"
import { getFotosByIdEvento } from "../services/Foto"
import '../styles/botones.css'
import { useAuth } from "../hooks/useAuth"
import InscripcionAlterta from "./InscripcionAlterta"
import { useMediaQuery } from "@uidotdev/usehooks"

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
    const isSmallDevice = useMediaQuery('(max-width:768px)');
    const isMediumDevice = useMediaQuery('(max-width: 1024px)');

    return (
        <div>

            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="formulario-contenedor" style={{ width: (isSmallDevice || isMediumDevice) ? '90%' : null, height: (isSmallDevice || isMediumDevice) ? '90%' : null }}>
                    <div className="titulo-formulario"><h1 className="subtitulo">{evento?.titulo.substring(0, 25)}</h1></div>
                    <div className="formulario" style={{ height: (isSmallDevice || isMediumDevice) ? '80%' : null, width: (isSmallDevice || isMediumDevice) ? '100%' : null }}>
                        <div className="contenedor-datos-formulario" style={{ width: (isSmallDevice || isMediumDevice) ? '100%' : null }}>
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
                                {
                                     (isSmallDevice || isMediumDevice) && (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div style={{ width: '250px', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <img style={{ width: '100%', height: '90%', margin: 0 }} src={fotoSeleccionada ? fotoSeleccionada : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxwYXBlci1pY29uIGx1Y2lkZS13YWxscGFwZXIiPjxwYXRoIGQ9Ik0xMiAxN3Y0Ii8+PHBhdGggZD0iTTggMjFoOCIvPjxwYXRoIGQ9Im05IDE3IDYuMS02LjFhMiAyIDAgMCAxIDIuODEuMDFMMjIgMTUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iOSIgcj0iMiIvPjxyZWN0IHg9IjIiIHk9IjMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L3N2Zz4="} />
                                                <div style={{ display: 'flex', width: '100%' }}>
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
                                    )
                                }
                            </div>
                        </div>
                        {
                             (!isSmallDevice && !isMediumDevice) && (
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
                            )
                        }
                    </div>
                    <div style={{ width:  (isSmallDevice || isMediumDevice) ? '100%' : '50%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => {
                                props?.accion(false)
                            }}
                            className="btn-accion-cancelar-1"
                        ><strong>CERRAR</strong></button>
                        {
                            !props?.inscrito && user?.organizacion != evento?.id_organizacion && (
                                <button
                                    className="btn-accion-2"
                                    onClickCapture={() => { if (user?.organizacion != undefined) { setIdEvento(evento?.id); setOpenInscripcion(true) } else { alert('DEBES DE INICIAR SESION PRIMERO') } }}
                                ><strong>PARTICIPAR</strong></button>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                openInscripcion && (
                    <InscripcionAlterta id_evento={idEvento} nombre_evento={evento?.titulo} accion={setOpenInscripcion} />
                )
            }
        </div>
    )
}