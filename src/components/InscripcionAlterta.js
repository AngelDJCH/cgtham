import '../styles/inscripcionalterta.css'
import { createInscripcion } from '../services/Inscripcion'
import {useAuth} from '../hooks/useAuth'

export default function InscripcionAlterta(props) {

    const {user} = useAuth()

    return (
        <div>
            <div className='overllay'>
            </div>
            <div className='alterta-inscripcion-contenedor'>
                <div className='alterta-inscripcion-cuerpo'>
                    <h1 style={{ textAlign: 'center' }}>{props.nombre_evento}</h1>
                    <p>¿Estas seguro/a de inscribirte?</p>
                    <div className='contenedor-botones'>

                        <button className='boton-accion-alteta btn-cancelar'

                            onClick={() => { props.accion(false) }}

                        >CANCELAR</button>
                        <button className='boton-accion-alteta btn-aceptar'

                            onClick={async () => {
                                try {
                                    await createInscripcion(props.id_evento, user.organizacion)
                                    alert('INSCRIPCION REALIZADA')
                                    props.accion(false)
                                } catch (error) {
                                    console.log(error)
                                }
                            }}

                        >ACEPTAR</button>
                    </div>

                </div>
            </div>
        </div>
    )
}