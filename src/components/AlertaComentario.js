import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { createComentario } from "../services/Comentario"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@uidotdev/usehooks"

export default function AlertaComentario(
    props
) {

    const isSmallDevice = useMediaQuery('(max-width:768px)')

    const [countCantidad, setCountCantidad] = useState(0)

    const [contenido, setContenido] = useState('')

    const navigate = useNavigate()
    const { user } = useAuth()

    const create = async () => {
        const res = await createComentario(contenido, user.organizacion)
        if (res != 201) alert('No se pudo crear el comentario - Error')
        if(res === 201) alert('SE CREO EL COMENTARIO')
    }

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div style={{ width: isSmallDevice?'90%':'650px', height: isSmallDevice?'auto':'350px', backgroundColor: 'white', borderRadius: '10px', padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <div>
                        <h1 style={{ textAlign: 'center' }}>NUEVO COMENTARIO</h1>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <div style={{ display: 'flex', width: isSmallDevice ? '40%':'250px', justifyContent: 'space-between', flexDirection: 'column' }}>
                                <textarea style={{ width: '100%', height: '100%', maxWidth: '100%', minWidth: '100%', maxHeight: '50px', minHeight: '50px' }} placeholder="Escribe un comentario" onChange={(e) => { setContenido(e.target.value); setCountCantidad(e.target.value.length) }} />
                                <p><strong>Caracteres: </strong>{countCantidad}</p>
                            </div>

                            <div style={{ display: 'flex', width: isSmallDevice?'40%':'325px', justifyContent: 'space-evenly' }}>
                                <p><strong>Nota:</strong> Recuerda que los comentarios deben tener una longitud entre 13 y 70 caracteres (incluyendo
                                    espacios, caracteres especiales, etc). <br /> En caso de tener algun problema reportar a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                            </div>
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                e.preventDefault()
                                if (contenido.length === 0 || contenido.length <= 10) {
                                    alert('DEBE TENER MAS DE 10 Y MENOR DE 70 CARACTERES')
                                }
                                else if (contenido.length <= 70) {
                                    //alert('CONTENEDIO CORRECTO')
                                    create()
                                    props.btn_accion(false)
                                    // navigate(0)
                                } else {
                                    alert('DEBE TENER MAS DE 10 Y MENOR DE 70 CARACTERES')
                                }


                            }}
                        >
                            <strong>
                                PUBLICAR
                            </strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}