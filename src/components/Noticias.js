import { useState } from "react"
import '../styles/noticias.css'

export default function Noticias() {

    const [eventos, setEventos] = useState(
        [
            {
                id: 1,
                nombre: 'Dia del Programador',
                organizacion: {
                    id: 1,
                    nombre: 'Instituo Tecnologico de Orizaba',
                    imagen: 'https://images.unsplash.com/photo-1647006875983-1874b7aa7356?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                imagen: 'https://images.unsplash.com/photo-1647006875983-1874b7aa7356?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 2,
                nombre: 'Dia del Programador',
                organizacion: {
                    id: 1,
                    nombre: 'Instituo Tecnologico de Orizaba',
                    imagen: 'https://images.unsplash.com/photo-1647006875983-1874b7aa7356?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                imagen: 'https://images.unsplash.com/photo-1647006875983-1874b7aa7356?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                nombre: 'Dia del Programador',
                organizacion: {
                    id: 1,
                    nombre: 'Instituo Tecnologico de Orizaba',
                    imagen: 'https://images.unsplash.com/photo-1647006875983-1874b7aa7356?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                imagen: 'https://images.unsplash.com/photo-1647006875983-1874b7aa7356?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
        ]
    )

    return (
        <div className="noticias" id="noticias">
            <div className="etiqueta">
                <h5>
                    Lo más reciente
                </h5>
            </div>
            <div className="noticias-subtitulo">
                <h2>Noticias y Eventos</h2>
            </div>
            <div className="contenedor-noticias">
                <div className="noticias-tarjetas-contenedor">
                    {
                        eventos.map(
                            evento =>
                                <div key={evento.id} className="noticias-tarjeta">
                                    <div className="s1">
                                        <img src={evento.organizacion.imagen} />
                                        <h6>{evento.nombre}</h6>
                                    </div>
                                    <div className="s2">
                                        <p>{evento.organizacion.nombre}</p>
                                    </div>
                                    <div className="s3">
                                        <img src={evento.imagen} />
                                    </div>
                                    <div className="s4">
                                        <button className="accion">
                                            VER
                                        </button>
                                    </div>
                                </div>
                        )
                    }
                </div>
                <div className="boton-historicos">
                    <button className="boton-accion-historicos">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb2NrLWljb24gbHVjaWRlLWNsb2NrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiA2djZsNCAyIi8+PC9zdmc+" alt="historico" />
                    </button>
                </div>
            </div>
        </div>
    )
}