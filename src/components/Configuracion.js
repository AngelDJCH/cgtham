import '../styles/configuracion.css'
import '../styles/inscripcionalterta.css'

export default function Configuracion(props) {
    return (
        <div>

            <div className='overllay'>

            </div>

            <div className='configuracion-contenedor'>
                <div className='configuracion-contenedor-cuerpo'>
                    <div>
                        <h1>Modo:</h1>
                        <ul style={{height:'auto'}} className='lista-opciones-configuracion'>
                            <li style={{backgroundColor:'black', color:'white'}} className='l-o-c-boton'>Oscuro</li>
                            <li className='l-o-c-boton'>Claro</li>
                            <li
                            
                            onClick={()=>{props.accion(false)}}

                            className='btn-cancelar'>CERRAR</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}