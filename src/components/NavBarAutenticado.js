import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useEffect, useState } from 'react'
import { logout } from '../services/Cuenta'
import { useAuth } from '../hooks/useAuth'
import { useMediaQuery } from '@uidotdev/usehooks'
import { getLogoByIdOrganizacion } from '../services/Organizacion'

export default function NavBarAutenticado() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const logo = 'https://res.cloudinary.com/dfdfauyvo/image/upload/v1780874578/Gemini_Generated_Image_l40lrul40lrul40l_rx9sd3.png'
    const nombre = 'CGTHAM' || 'Comisión de Gestión de Talento Humano de las Altas Montañas'

    const { user } = useAuth()

    const [logoOrganizacion, setLogo] = useState('')

    const isMediumDevice = useMediaQuery("(max-width : 678px)")

    useEffect(() => {
        const getLogo = async () => {
            const log = await getLogoByIdOrganizacion(user.organizacion)
            setLogo(log)
        }

        getLogo()
    }, [])

    return (
        <div className="navbar">
            <div className="seccion1" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
                <div style={{ width: '50px', height: '50px' }}><img src={logo} alt="logo_cgtham" /></div>
                <h1
                    onClick={(e) => { navigate('/home') }}
                >{nombre}</h1>
            </div>
            <div className="seccion2">
                <ul>
                    {!isMediumDevice && (
                        <li className='opciones'

                            onClick={(e) => { navigate('/home') }}

                        ><a >Inicio</a></li>
                    )}
                    {!isMediumDevice && (
                        <li className='opciones'

                            onClick={(e) => {
                                navigate('/eventos')
                            }}

                        ><a >Eventos</a></li>
                    )}
                    {!isMediumDevice && user.rol.includes('ADMIN_SYS') && (
                        <li className='opciones'

                            onClick={(e) => {
                                navigate('/organizaciones')
                            }}

                        ><a >Organizaciones</a></li>
                    )}
                    {!isMediumDevice && (
                        <li className='opciones'

                            onClick={(e) => {
                                navigate(`/organizacion/${user.organizacion}`)
                            }}

                        ><a >Organizacion</a></li>
                    )}
                    {!isMediumDevice && user.rol.includes('ADMIN_SYS') && (
                        <li className='opciones'

                            onClick={(e) => {
                                navigate('/historicos')
                            }}

                        ><a >Historicos</a></li>
                    )}
                    {!isMediumDevice && user.rol.includes('ADMIN_SYS') && (
                        <li className='opciones'

                            onClick={(e) => {
                                navigate('/comentarios')
                            }}

                        ><a >Comentarios</a></li>
                    )}
                    {
                        !isMediumDevice && (
                            <li
                                onClick={() => {
                                    navigate(`/mensajes`)
                                }}
                            >
                                <button className='btn-accion-2' style={{ width: '40px', height: '40px' }}>
                                    <img alt='Mensajes' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tZXNzYWdlLWNpcmNsZS1pY29uIGx1Y2lkZS1tZXNzYWdlLWNpcmNsZSI+PHBhdGggZD0iTTIuOTkyIDE2LjM0MmEyIDIgMCAwIDEgLjA5NCAxLjE2N2wtMS4wNjUgMy4yOWExIDEgMCAwIDAgMS4yMzYgMS4xNjhsMy40MTMtLjk5OGEyIDIgMCAwIDEgMS4wOTkuMDkyIDEwIDEwIDAgMSAwLTQuNzc3LTQuNzE5Ii8+PC9zdmc+' />
                                </button>
                            </li>
                        )
                    }
                    <li>
                        <button
                            style={{ border: 'none', backgroundColor: 'transparent' }}
                            onClick={(e) => { open === true ? setOpen(false) : setOpen(true) }}

                        >
                            <img src={logoOrganizacion} alt={''} style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
                        </button>
                    </li>
                </ul>
            </div>

            {
                open && (
                    <div className='opcioenes-emergentes'>
                        <ul>
                            <li className='opciones'

                                onClick={(e) => { navigate('/home') }}

                            ><a >Inicio</a></li>
                            <li className='opciones'

                                onClick={(e) => {
                                    navigate('/eventos')
                                }}

                            ><a >Eventos</a></li>
                            {
                                user.tipo === 'Escuela' || user.tipo === 'Empresa' && (
                                    <li className='opciones'

                                        onClick={(e) => {
                                            navigate('/ofertaslaborales')
                                        }}

                                    ><a >Ofertas Laborales</a></li>
                                )
                            }
                            {
                                user.rol.includes('ADMIN_SYS') && (
                                    <li className='opciones'

                                        onClick={(e) => {
                                            navigate('/organizaciones')
                                        }}

                                    ><a >Organizaciones</a></li>
                                )
                            }
                            <li className='opciones'

                                onClick={(e) => {
                                    navigate(`/organizacion/${user.organizacion}`)
                                }}

                            ><a >Organizacion</a></li>
                            {
                                user.rol.includes('ADMIN_SYS') && (
                                    <li className='opciones'

                                        onClick={(e) => {
                                            navigate('/historicos')
                                        }}

                                    ><a >Historicos</a></li>
                                )
                            }
                            {!isMediumDevice && (
                                <li className='opciones'

                                    onClick={(e) => {
                                        navigate('/comentarios')
                                    }}

                                ><a >Comentarios</a></li>
                            )}
                            {!isMediumDevice && (
                                <li className='opciones'

                                    onClick={(e) => {
                                        navigate('/convenios')
                                    }}

                                ><a >Convenios</a></li>
                            )}
                            {isMediumDevice && (
                                <li className='opciones'

                                    onClick={(e) => {
                                        navigate('/cursos')
                                    }}

                                ><a >Cursos</a></li>
                            )}
                            {isMediumDevice && (
                                <li className='opciones'

                                    onClick={(e) => {
                                        navigate('/visitas')
                                    }}

                                ><a >Visitas</a></li>
                            )}
                            <li
                                onClick={async (e) => {

                                    const status = await logout()

                                    status === 204 ? navigate('/') : navigate('/home')
                                }}
                            >Salir</li>
                        </ul>
                    </div>
                )
            }

        </div>
    )
}