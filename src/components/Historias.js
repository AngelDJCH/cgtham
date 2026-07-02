import { useEffect, useState } from "react"
import '../styles/historias.css'
import { getComentarios } from "../services/Comentario"

export default function Historias() {
    const [comentarios, setComentarios] = useState(
        []
    )

    const imagenComentario = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWFyZS1wZW4taWNvbiBsdWNpZGUtc3F1YXJlLXBlbiI+PHBhdGggZD0iTTEyIDNINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtNyIvPjxwYXRoIGQ9Ik0xOC4zNzUgMi42MjVhMSAxIDAgMCAxIDMgM2wtOS4wMTMgOS4wMTRhMiAyIDAgMCAxLS44NTMuNTA1bC0yLjg3My44NGEuNS41IDAgMCAxLS42Mi0uNjJsLjg0LTIuODczYTIgMiAwIDAgMSAuNTA2LS44NTJ6Ii8+PC9zdmc+'


    useEffect(() => {
        const comentarios = async () => {
            const res = await getComentarios()
            setComentarios(res)
        }

        comentarios()
    }, [])

    return (
        <div className="historias-contenedor" id="historias">
            <div className="etiqueta">
                <h5>Historias de exito</h5>
            </div>
            <div className="subtitulo">
                <h2>Voces de nuestra comunidad</h2>
            </div>
            <div className="comentarios-contenedor">
                {
                    comentarios.map(
                        comentario => <div className="comentario-tarjeta">
                            <div className="comentario-imagen-contenedor">
                                <img src={comentario.organizacion.foto} alt={comentario.organizacion.nombre} />
                            </div>
                            <div className="comentario-informacion-contenedor">
                                <h1>{comentario.organizacion.nombre}</h1>
                                <p>{comentario.comentario.contenido}</p>
                                <p>{comentario.comentario.fecha.split('T')[0]}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}