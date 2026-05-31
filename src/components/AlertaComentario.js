import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { createComentario } from "../services/Comentario"
import { useNavigate } from "react-router-dom"

export default function AlertaComentario(
    props
) {

    const [contenido, setContenido] = useState('')

    const navigate = useNavigate()
    const { user } = useAuth()

    const create = async () => {
        const res = await createComentario(contenido, user.organizacion)
        if (res != 201) alert('No se pudo crear el comentario - Error')

    }

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor" style={{flexDirection:'row'}}>
                <div style={{
                    width: '200px',display: 'flex', flexDirection: 'column', backgroundColor: '#AEB784', borderRadius: '10px', padding: '2.5rem', justifyContent: 'center', gap: '1rem'
                }}>
                    <h1 style={{ textAlign: 'center', margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '22px' }}>CREAR COMENTARIO</h1>
                    <div
                        style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <textarea style={{ width: '200px', height: '50px', maxWidth: '200px', minWidth: '200px', maxHeight: '50px', minHeight: '50px' }} placeholder="Escribe un comentario" onChange={(e) => { setContenido(e.target.value) }} />
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                className="btn-accion-cancelar-1"
                                onClick={(e) => {
                                    e.preventDefault()
                                    props.btn_accion(false)
                                }}

                            >
                                <strong>CERRAR</strong>
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
                                        navigate(0)
                                    } else {
                                        alert('DEBE TENER MAS DE 10 Y MENOR DE 70 CARACTERES')
                                    }


                                }}

                            >
                                <strong>CREAR</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}