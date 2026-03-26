import { useState } from "react"
import '../styles/historias.css'

export default function Historias() {
    const [comentarios, setComentarios] = useState(
        [
            {
                id: 1,
                foto: '',
                organizacion: {
                    id: 1,
                    nombre: ''
                },
                fecha: '',
                contenido: ''
            }
        ]
    )

    const imagenComentario = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWFyZS1wZW4taWNvbiBsdWNpZGUtc3F1YXJlLXBlbiI+PHBhdGggZD0iTTEyIDNINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtNyIvPjxwYXRoIGQ9Ik0xOC4zNzUgMi42MjVhMSAxIDAgMCAxIDMgM2wtOS4wMTMgOS4wMTRhMiAyIDAgMCAxLS44NTMuNTA1bC0yLjg3My44NGEuNS41IDAgMCAxLS42Mi0uNjJsLjg0LTIuODczYTIgMiAwIDAgMSAuNTA2LS44NTJ6Ii8+PC9zdmc+'

    return (
        <div className="historias-contenedor" id="historias">
            <div className="etiqueta">
                <h5>Historias de exito</h5>
            </div>
            <div className="historias-subtitulo">
                <h2>Voces de nuestra comunidad</h2>
            </div>
            <div className="historias-tabla-contenedor">
                <div className="tabla-contenedor">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    FOTO
                                </th>
                                <th>
                                    NOMBRE
                                </th>
                                <th>
                                    ORGANIZACION
                                </th>
                                <th>
                                    FECHA
                                </th>
                                <th>
                                    COMENTARIO
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="foto" />
                                </td>
                                <td>
                                    <p>Carlos Ivan Flores Sanchez</p>
                                </td>
                                <td>
                                    <p>Insittuto Tecnologico de Orizaba</p>
                                </td>
                                <td>
                                    <p>28/03/2026</p>
                                </td>
                                <td>
                                    <p>
                                        Es una gran institucion para formar grandes lideres del mañana
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="foto" />
                                </td>
                                <td>
                                    <p>Carlos Ivan Flores Sanchez</p>
                                </td>
                                <td>
                                    <p>Insittuto Tecnologico de Orizaba</p>
                                </td>
                                <td>
                                    <p>28/03/2026</p>
                                </td>
                                <td>
                                    <p>
                                        Es una gran institucion para formar grandes lideres del mañana
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="foto" />
                                </td>
                                <td>
                                    <p>Carlos Ivan Flores Sanchez</p>
                                </td>
                                <td>
                                    <p>Insittuto Tecnologico de Orizaba</p>
                                </td>
                                <td>
                                    <p>28/03/2026</p>
                                </td>
                                <td>
                                    <p>
                                        Es una gran institucion para formar grandes lideres del mañana
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="foto" />
                                </td>
                                <td>
                                    <p>Carlos Ivan Flores Sanchez</p>
                                </td>
                                <td>
                                    <p>Insittuto Tecnologico de Orizaba</p>
                                </td>
                                <td>
                                    <p>28/03/2026</p>
                                </td>
                                <td>
                                    <p>
                                        Es una gran institucion para formar grandes lideres del mañana
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="historias-accion">
                    <img src={imagenComentario} alt="icono" />
                </button>
            </div>
        </div>
    )
}