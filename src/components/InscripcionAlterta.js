import '../styles/inscripcionalterta.css'
import { createInscripcion } from '../services/Inscripcion'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function InscripcionAlterta(props) {
    const { user } = useAuth()
    const navigate = useNavigate()
    const crearInscripcion = async () => {
        try {
            const status = await createInscripcion(props.id_evento, user.organizacion)
            if (status && status === 201) {
                alert('INSCRIPCION REALIZADA')
                navigate(0)
            } else if (status && status === 409) {
                alert('YA ESTAS EN LISTA DE ESPERA')
            }
            props.accion(false)
        } catch (error) {
            console.log(error)
            alert('OCURRIO UN ERROR')
            props.accion(false)
        }
    }
    return (
        <div>
            <div className='overllay'>
            </div>
            <div className='alterta-inscripcion-contenedor'>
                <div className='alterta-inscripcion-cuerpo'>
                    <h1 style={{ textAlign: 'center' }}>{props.nombre_evento}</h1>
                    <p>¿Estas seguro/a de inscribirte?</p>
                    <div className='contenedor-botones'>
                        <button className='btn-accion-cancelar-1'
                            onClick={() => { props.accion(false) }}
                        ><strong>CANCELAR</strong></button>
                        <button className='btn-accion-2'
                            onClick={() => { crearInscripcion() }}
                        ><strong>ACEPTAR</strong></button>
                    </div>
                </div>
            </div>
        </div>
    )
}