import { useEffect, useState } from "react"
import '../styles/historias.css'
import { getComentarios } from "../services/Comentario"

export default function Historias() {
    const [comentarios, setComentarios] = useState([])
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