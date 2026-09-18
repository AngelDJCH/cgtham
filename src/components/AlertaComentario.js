import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { createComentario } from "../services/Comentario"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@uidotdev/usehooks"
import '../styles/comentarios-modal.css'
import Loader from "./Loader"

export default function AlertaComentario(
    props
) {
    const [loading, setLoading] = useState(false)
    const [countCantidad, setCountCantidad] = useState(0)
    const [contenido, setContenido] = useState('')
    const navigate = useNavigate()
    const { user } = useAuth()

    const create = async () => {
        setLoading(true)

        if (contenido.length === 0 || contenido.length <= 10 || contenido.length > 70) {
            setLoading(false)
            alert('El comentario debe de tener mas de 12 y menos de 70 caracteres')
        } else {
            const res = await createComentario(contenido, user.organizacion)
            if (res != 201) {
                setLoading(false)
                alert('No se pudo crear el comentario - Error')
            } else {
                setLoading(false)
                alert('SE CREO EL COMENTARIO')
            }
            props.btn_accion(false)
            navigate(0)
        }
    }

    return (
        <div>
            <div className="comentario-modal-overlay"></div>
            <div className="comentario-modal-contenedor">
                <div className="comentario-modal-cuerpo">
                    <div>
                        <h1 className="comentario-modal-titulo">NUEVO COMENTARIO</h1>

                        <div className="comentario-modal-contenido">
                            <div className={`comentario-modal-columna comentario-modal-columna--editor`}>
                                <textarea className="comentario-modal-textarea comentario-modal-textarea--expandido" placeholder="Escribe un comentario" onChange={(e) => { setContenido(e.target.value); setCountCantidad(e.target.value.length) }} />
                                <p><strong>Caracteres: </strong>{countCantidad}</p>
                            </div>

                            <div className="comentario-modal-columna comentario-modal-columna--nota">
                                <p><strong>Nota:</strong> Recuerda que los comentarios deben tener una longitud entre 13 y 70 caracteres (incluyendo
                                    espacios, caracteres especiales, etc). <br /> En caso de tener algun problema reportar a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                            </div>
                        </div>

                    </div>
                    <div className="comentario-modal-acciones">
                        <button className="btn-accion-cancelar-1"
                            onClick={() => { props.btn_accion(false) }}
                        >
                            <strong>
                                CERRAR
                            </strong>
                        </button>
                        <button
                            className="btn-accion-2"
                            onClick={(e) => {
                                create()
                            }
                            }
                        >
                            <strong>
                                PUBLICAR
                            </strong>
                        </button>
                    </div>
                </div>
            </div>

            {
                loading && (
                    <Loader />
                )
            }

        </div>
    )
}