import { useEffect, useState } from "react"
import { getComentarioById, updateById } from "../services/Comentario"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@uidotdev/usehooks"
import '../styles/comentarios-modal.css'

export default function EditarComentario(props) {

    const navigate = useNavigate()

    const [comentarioData, setComentarioData] = useState(null)
    const [countCantidad, setCountCantidad] = useState(0)


    useEffect(() => {
        const getComentario = async () => {
            const res = await getComentarioById(props?.idComentario)
            setComentarioData(res)
            setCountCantidad(res?.contenido?.length)
        }

        if (props?.idComentario) {
            getComentario()
        }
    }, [])

    const isSmallDevice = useMediaQuery('(max-width:768px)')

    return (
        <div>
            <div className="comentario-modal-overlay"></div>
            <div className="comentario-modal-contenedor">
                <div className="comentario-modal-cuerpo">
                    <div>
                        <h1 className="comentario-modal-titulo">EDITAR COMENTARIO</h1>

                        <div className="comentario-modal-contenido">
                            <div className="comentario-modal-columna comentario-modal-columna--editor">
                                <textarea className="comentario-modal-textarea" defaultValue={comentarioData?.contenido} onChange={(e) => { setComentarioData({ ...comentarioData, contenido: e.target.value }); setCountCantidad(e.target.value.length) }} />
                                <p><strong>Caracteres: </strong>{countCantidad}</p>
                            </div>

                            <div className="comentario-modal-columna comentario-modal-columna--nota">
                                <p><strong>Nota:</strong> Recuerda que los comentarios deben tener una longitud entre 13 y 70 caracteres (incluyendo
                                    espacios, caracteres especiales, etc). <br /> En caso de tener algun problema reportar a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                            </div>
                        </div>

                    </div>
                    <div className="comentario-modal-acciones">
                        <button
                            className='btn-accion-cancelar-1'
                            onClick={() => { props?.accion(false) }}
                        ><strong>CANCELAR</strong></button>
                        <button
                            onClick={async () => {
                                if (comentarioData.contenido.length >= 13 && comentarioData.contenido.length <= 70) {
                                    const res = await updateById(props?.idComentario, comentarioData.contenido)
                                    if (res.status === 200) {
                                        alert('COMENTARIO ACTUALIZADO')
                                        navigate(0)
                                    } else {
                                        alert('NO SE PUDO ACTUALIZAR EL COMENTARIO')
                                    }
                                } else {
                                    alert('El comentario debe tener entre 13 y 70 caracteres')
                                }
                            }}
                            className='btn-accion-2'
                        ><strong>GUARDAR</strong></button>
                    </div>
                </div>
            </div>
        </div>
    )
}