import { useEffect, useState } from "react"
import '../styles/impacto.css'
import { getUsersCounts } from "../services/Usuario"
import { getOfertasCounts } from "../services/OfertaLaboral"
import { getEventosCounts } from "../services/Evento"

export default function Impacto() {
    const video = 'cgtham.mp4'

    const [usuarios, setUsuarios] = useState(0)
    const [empleos, setEmpleos] = useState(0)
    const [eventos, setEventos] = useState(0)

    const imagenUsuarios = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxNDMxQiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXJzLWljb24gbHVjaWRlLXVzZXJzIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIvPjxwYXRoIGQ9Ik0xNiAzLjEyOGE0IDQgMCAwIDEgMCA3Ljc0NCIvPjxwYXRoIGQ9Ik0yMiAyMXYtMmE0IDQgMCAwIDAtMy0zLjg3Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48L3N2Zz4='
    const imagenEmpleos = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxNDMxQiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcy1pY29uIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MiPjxwYXRoIGQ9Ik0xMiAxMmguMDEiLz48cGF0aCBkPSJNMTYgNlY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTIyIDEzYTE4LjE1IDE4LjE1IDAgMCAxLTIwIDAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+'
    const imagenEventos = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxNDMxQiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWhlYXJ0LWljb24gbHVjaWRlLWNhbGVuZGFyLWhlYXJ0Ij48cGF0aCBkPSJNMTIuMTI3IDIySDVhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJoMTRhMiAyIDAgMCAxIDIgMnY1LjEyNSIvPjxwYXRoIGQ9Ik0xNC42MiAxOC44QTIuMjUgMi4yNSAwIDEgMSAxOCAxNS44MzZhMi4yNSAyLjI1IDAgMSAxIDMuMzggMi45NjZsLTIuNjI2IDIuODU2YS45OTguOTk4IDAgMCAxLTEuNTA3IDB6Ii8+PHBhdGggZD0iTTE2IDJ2NCIvPjxwYXRoIGQ9Ik0zIDEwaDE4Ii8+PHBhdGggZD0iTTggMnY0Ii8+PC9zdmc+'

    useEffect(() => {
        const getUsuariosCount = async () => {
            const res = await getUsersCounts()
            setUsuarios(res)
        }

        const getOfertasCount = async () => {
            const res = await getOfertasCounts()
            setEmpleos(res)
        }

        const getEventosCount = async () => {
            const res = await getEventosCounts()
            setEventos(res)
        }

        getUsuariosCount()
        getOfertasCount()
        getEventosCount()
    }, [])

    return (
        <div className="impacto" id="impacto">
            <div className="etiqueta">
                <h5>Impacto Social</h5>
            </div>
            <div className="subtitulo">
                <h2>Gestionamos talento, cultivamos impacto</h2>
            </div>
            <div className="impacto-contenedor">
                <div className="video-contenedor">
                    <video width={300} height={200} controls>
                        <source src={video}></source>
                    </video>
                </div>
                <div className="estadisticas-contenedor">
                    <ul>
                        <li className="contenedor-li">
                            <img className="icono" src={imagenUsuarios} alt="logo1" />
                            <p>
                                <strong>{`${usuarios}+ `}</strong>
                                Usuarios activos
                            </p>
                        </li>
                        <li className="contenedor-li">
                            <img className="icono" src={imagenEmpleos} alt="logo2" />
                            <p>
                                <strong>{`${empleos}+ `}</strong>
                                Empleos generados
                            </p>
                        </li>
                        <li className="contenedor-li">
                            <img className="icono" src={imagenEventos} alt="logo3" />
                            <p>
                                <strong>{`${eventos}+ `}</strong>
                                Eventos publicados
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}