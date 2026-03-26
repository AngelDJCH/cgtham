import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useEffect } from 'react'

export default function NavBar(props) {
    const navigate = useNavigate()

    const logo = 'logo_cgtham.png'
    const nombre = 'CGTHAM' || 'Comisión de Gestión de Talento Humano de las Altas Montañas'

    return (
        <div className="navbar">
            <div className="seccion1"
            >
                <img src={logo} alt="" />
                <h1

                    onClick={() => { navigate('/') }}

                >{nombre}</h1>
            </div>
            <div className="seccion2">
                <ul>
                    {
                        props?.opcionesNav && (
                            <li className='opciones'><a href='#inicio'>Inicio</a></li>
                        )
                    }
                    {
                        props?.opcionesNav && (
                            <li className='opciones'><a href='#sectores'>Sectores</a></li>

                        )
                    }
                    {
                        props?.opcionesNav && (
                            <li className='opciones'><a href='#impacto'>Impacto</a></li>

                        )
                    }
                    {
                        props?.opcionesNav && (
                            <li className='opciones'><a href='#noticias'>Noticias</a></li>

                        )
                    }
                    {
                        props?.opcionesNav && (
                            <li className='opciones'><a href='#historias'>Comunidad</a></li>

                        )
                    }
                    {
                        props?.opcionesNav && (
                            <li className='opciones'><a href='#contacto'>Contacto</a></li>

                        )
                    }

                    {
                        props?.opcionesNav && (
                            <li>
                                <button

                                    onClick={(e) => { navigate('/login') }}

                                >
                                    INICIAR SESIÓN
                                </button>
                            </li>

                        )
                    }
                </ul>
            </div>
        </div>
    )
}