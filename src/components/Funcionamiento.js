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
                    <h6>Usuarios</h6>
                    <div>
                        <ol>
                            <li>
                                Crea tu cuenta
                            </li>
                            <li>
                                Espera que tu organiación valide tu cuenta
                            </li>
                            <li>
                                Empieza a transformar tu futuro
                            </li>
                        </ol>
                    </div>
                    <div className='funcionamiento-tarjeta-boton-contendor'>
                        <button

                            onClick={() => { navigate('/register') }}

                        >
                            REGISTRARME
                        </button>
                    </div>
                </div>

                <div className='roles-imagen'>
                    <img src={imagenRoles} alt="imagenRoles" />
                </div>

                <div className='funcionamiento-tarjeta'>
                    <h6>Organizaciones</h6>
                    <div>
                        <ol>
                            <li>
                                Ingresa los datos de tu organización
                            </li>
                            <li>
                                Crea la cuenta del administrador
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
                            REGISTRAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}