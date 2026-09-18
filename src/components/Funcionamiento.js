import { useNavigate } from 'react-router-dom'
import '../styles/funcionamiento.css'

export default function Funcionamiento() {
    const imagenRoles = 'https://static.vecteezy.com/system/resources/previews/019/045/391/non_2x/silhouettes-of-business-men-and-women-with-back-to-back-poses-free-png.png'
    const navigate = useNavigate()
    return (
        <div className='funcionamiento' id='funcionamiento'>
            <div className='etiqueta'>
                <h5>¿Cómo funciona?</h5>
            </div>
            <div className='funcionamiento-contenedor'>
                <div className='funcionamiento-tarjeta'>
                    <div className='subtitulo'>
                        <h2>Organizaciones</h2>
                    </div>
                    <div className='texto-informativo-lista lista-funcionamiento'>
                        <div>
                            <p>Da click a "registrarme"</p>
                        </div>
                        <div>
                            <p>
                                Ingresa los datos de tu organización
                            </p>
                        </div>
                        <div>
                            <p>Espera la validación del sistema</p>
                        </div>
                        <div>
                            <p>Transforma el futuro</p>
                        </div>
                    </div>
                    <div className='funcionamiento-tarjeta-boton-contendor'>
                        <button
                            onClick={() => { navigate('/register_org') }}
                            className='btn-accion'
                        >
                            REGISTRARME
                        </button>
                    </div>
                </div>
                <div className='roles-imagen'>
                    <img src={imagenRoles} alt="imagenRoles" />
                </div>
                <div className='funcionamiento-tarjeta'>
                    <div className='subtitulo'>
                        <h2>Administrador</h2>
                    </div>
                    <div className='texto-informativo-lista lista-funcionamiento'>
                        <div>
                            <p> Ingresa con tu correo y contraseña</p>
                        </div>
                        <div>
                            <p> Accede a los apartados de navegación</p>
                        </div>
                        <div>
                            <p>Administra el sistema</p>
                        </div>
                        <div>
                            <p>Transforma el futuro</p>
                        </div>
                    </div>
                    <div className='funcionamiento-tarjeta-boton-contendor'>
                        <button
                            onClick={() => { navigate('/login') }}
                            className='btn-accion'
                        >
                            INGRESAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}