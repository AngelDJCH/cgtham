import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useState } from 'react'

export default function NavBarAutenticado() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const logo = 'logo_cgtham.png'
    const nombre = 'CGTHAM' || 'Comisión de Gestión de Talento Humano de las Altas Montañas'

    return (
        <div className="navbar">
            <div className="seccion1"
            >
                <img src={logo} alt="" />
                <h1>{nombre}</h1>
            </div>
            <div className="seccion2">
                <ul>
                    <li className='opciones'

                        onClick={(e) => { navigate('/home') }}

                    ><a >Inicio</a></li>
                    <li className='opciones'

                        onClick={(e) => {
                            navigate('/eventos')
                        }}

                    ><a >Eventos</a></li>
                    <li className='opciones'

                        onClick={(e) => {
                            navigate('/ofertaslaborales')
                        }}

                    ><a >Ofertas Laborales</a></li>
                    <li className='opciones'

                        onClick={(e) => {
                            navigate('/usuarios')
                        }}
                    
                    ><a >Usuarios</a></li>
                    <li className='opciones'
                    
                        onClick={(e) => {
                            navigate('/organizaciones')
                        }}
                    
                    ><a >Organizaciones</a></li>
                    <li className='opciones'
                    
                        onClick={(e) => {
                            navigate('/organizacion')
                        }}
                    
                    ><a >Organizacion</a></li>
                    <li className='opciones'
                    
                        onClick={(e) => {
                            navigate('/historicos')
                        }}
                    
                    ><a >Historicos</a></li>
                    <li>
                        <button

                            onClick={(e) => { open === true ? setOpen(false) : setOpen(true) }}

                        >
                            <img src='' alt='foto' />
                        </button>
                    </li>
                </ul>
            </div>

            {
                open && (
                    <div className='opcioenes-emergentes'>
                        <ul>
                            <li
                                onClick={(e) => { navigate('/perfil') }}
                            >Perfil</li>
                            <li
                                onClick={(e) => { navigate('/') }}
                            >Salir</li>
                        </ul>
                    </div>
                )
            }

        </div>
    )
}