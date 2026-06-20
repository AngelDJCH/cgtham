import { useNavigate } from 'react-router-dom'
import '../styles/funcionamiento.css'

export default function Funcionamiento() {
    const imagenRoles = 'https://static.vecteezy.com/system/resources/previews/019/045/391/non_2x/silhouettes-of-business-men-and-women-with-back-to-back-poses-free-png.png'

    const navigate = useNavigate()

    return (
        <div className='funcionamiento'>
            <div className='etiqueta'>
                <h5>¿Cómo funciona?</h5>
            </div>
            <div className='funcionamiento-contenedor'>
                <div className='funcionamiento-tarjeta'>
                    <div className='subtitulo'>
                        <h2>Organizaciones</h2>
                    </div>
                    <div>
                        <ol className='texto-informativo-lista'>
                            <li>
                                Da click a "registrarme"
                            </li>
                            <li>
                                Ingresa los datos de tu organización
                            </li>
                            <li>
                                Espera la validación del sistema
                            </li>
                            <li>
                                Transforma el futuro
                            </li>
                        </ol>
                    </div>
                    <div className='funcionamiento-tarjeta-boton-contendor'>
                        <button

                            onClick={() => { navigate('/register_org') }}

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
                    <div>
                        <ol className='texto-informativo-lista'>
                            <li>
                                Ingresa con tu correo y contraseña
                            </li>
                            <li>
                                Accede a los apartados de navegación
                            </li>
                            <li>
                                Administra el sistema
                            </li>
                            <li>
                                Transforma el futuro
                            </li>
                        </ol>
                    </div>
                    <div className='funcionamiento-tarjeta-boton-contendor'>
                        <button

                            onClick={() => { navigate('/login') }}

                        >
                            INGRESAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}