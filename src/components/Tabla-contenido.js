import { useEffect, useState } from 'react'
import '../styles/contenedor-tablas.css'

export default function TablaContenido(props) {

    const [contenidoTabla, setContenidoTabla] = useState([])

    useEffect(()=>{
        setContenidoTabla(props.contenido)
    },[contenidoTabla])

    return (
        <div className="contenedor-tablas">
            <div className="contenedor-tablas-interno">
                <table>
                    <thead>
                        <tr>
                            {
                                props.encabezados?.map(
                                    encabezado => <th>{encabezado}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                contenidoTabla?.map(
                                    contenido => <tr><td>{contenido}</td></tr>
                                )
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}