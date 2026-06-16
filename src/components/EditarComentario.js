import { useEffect, useState } from "react"
import { getComentarioById, updateById } from "../services/Comentario"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@uidotdev/usehooks"

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
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div style={{ width: isSmallDevice?'90%':'650px', height: isSmallDevice?'auto':'350px', backgroundColor: 'white', borderRadius: '10px', padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <div>
                        <h1 style={{ textAlign: 'center' }}>EDITAR COMENTARIO</h1>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <div style={{ display: 'flex', width: isSmallDevice ? '40%':'250px', justifyContent: 'space-between', flexDirection: 'column' }}>
                                <textarea defaultValue={comentarioData?.contenido} onChange={(e) => { setComentarioData({ ...comentarioData, contenido: e.target.value }); setCountCantidad(e.target.value.length) }} style={{ width: '90%', height: '100px', maxWidth: '100%', maxHeight: '100px', minWidth: '100%', minHeight: '100px' }} />
                                <p><strong>Caracteres: </strong>{countCantidad}</p>
                            </div>

                            <div style={{ display: 'flex', width: isSmallDevice ? '40%':'250px', justifyContent: 'space-between', flexDirection: 'column' }}>
                                <p><strong>Nota:</strong> Recuerda que los comentarios deben tener una longitud entre 13 y 70 caracteres (incluyendo
                                    espacios, caracteres especiales, etc). <br /> En caso de tener algun problema reportar a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                            </div>
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        //         <div>
        //             <div className='overllay'></div>
        //             <div className='overllay-contenedor'>
        //                 <div style={{                    width: '200px',display: 'flex', flexDirection: 'column', backgroundColor: '#AEB784', borderRadius: '10px', padding: '2.5rem', justifyContent: 'center', gap: '1rem'
        //  }}>
        // <h1 style={{ textAlign: 'center', margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '25px' }}>EDITAR COMENTARIO</h1>
        // <textarea defaultValue={comentarioData?.contenido} onChange={(e) => { setComentarioData({ ...comentarioData, contenido: e.target.value }) }} style={{ width: '90%', height: '100px', maxWidth: '100%', maxHeight: '100px', minWidth: '100%', minHeight: '100px' }} />
        // <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        // <button
        //     className='btn-accion-cancelar-1'
        //     onClick={() => { props?.accion(false) }}
        // ><strong>CANCELAR</strong></button>
        // <button
        //     onClick={async () => {
        //         if (comentarioData.contenido.length >= 13 && comentarioData.contenido.length <= 70) {
        //             const res = await updateById(props?.idComentario, comentarioData.contenido)
        //             if (res.status === 200) {
        //                 alert('COMENTARIO ACTUALIZADO')
        //                 navigate(0)
        //             } else {
        //                 alert('NO SE PUDO ACTUALIZAR EL COMENTARIO')
        //             }
        //         } else {
        //             alert('El comentario debe tener entre 13 y 70 caracteres')
        //         }
        //     }}
        //     className='btn-accion-2'
        // ><strong>GUARDAR</strong></button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
    )
}