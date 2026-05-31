import { useEffect, useState } from "react"
import { getFotosByIdEvento } from "../services/Foto";

export default function VisualizarFotos(props) {

    const [fotos, setFotos] = useState([])
    const [fotoSeleccionada, setFotoSeleccionada] = useState('')

    useEffect(() => {
        const getFotos = async () => {
            const res = await getFotosByIdEvento(props?.id_evento)
            setFotos(res)
        }

        getFotos()
    }, []);

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div style={{ display: 'flex', width: '600px', height: '400px', flexDirection:'column', gap:'1rem'}}>
                    <div style={{width:'100%', height:'340px'}}>
                        <img src={fotoSeleccionada} style={{width:'100%', height:'100%'}}/>
                    </div>
                    <div style={{width:'100%', height:'50px',maxWidth: '100%',  overflowX: 'scroll', overflowY: 'hidden'}}>
                        {
                            fotos?.map(
                                foto => <div style={{width:'40px', height:'40px'}}>
                                    <img src={foto} style={{ width: '100%', height: '100%', objectFit:'cover' }} 
                                    onClick={()=>{setFotoSeleccionada(foto)}}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <button
                    onClick={()=>{props?.accion(false)}}
                    >CERRAR</button>
                </div>
            </div>
        </div>
    )
}