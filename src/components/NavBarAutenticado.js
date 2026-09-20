import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useEffect, useState } from 'react'
import { logout } from '../services/Cuenta'
import { useAuth } from '../hooks/useAuth'
import { useMediaQuery } from '@uidotdev/usehooks'
import { getLogoByIdOrganizacion } from '../services/Organizacion'
import Calendario from './Calendario'


export default function NavBarAutenticado() {
    const [openCalendar, setOpenCalendar] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const logo = 'https://res.cloudinary.com/dfdfauyvo/image/upload/v1780874578/Gemini_Generated_Image_l40lrul40lrul40l_rx9sd3.png'
    const nombre = 'CGTHAM' || 'Comisión de Gestión de Talento Humano de las Altas Montañas'
    const { user } = useAuth()
    const [logoOrganizacion, setLogo] = useState('')
    const isMediumDevice = useMediaQuery("(max-width : 678px) or (max-width : 1024px)")
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
                    {!isMediumDevice && user?.tipo === 'Escuela' && (
                        <li className='opciones'
                            onClick={(e) => {
                                navigate('/eventos')
                            }}
                        ><a >Eventos</a></li>
                    )}
                    {!isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                        <li className='opciones'
                            onClick={(e) => {
                                navigate('/ofertaslaborales')
                            }}
                        ><a >Ofertas Laborales</a></li>
                    )}
                    {!isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                        <li className='opciones'
                            onClick={(e) => {
                                navigate('/convenios')
                            }}
                        ><a >Convenios</a></li>
                    )}

                    {!isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                        <li className='opciones'
                            onClick={(e) => {
                                navigate('/afiliaciones')
                            }}
                        ><a >Afiliaciones</a></li>
                    )}
                    {!isMediumDevice && user?.tipo === 'Empresa' && (
                        <li className='opciones'
                            onClick={(e) => {
                                navigate('/visitas')
                            }}
                        ><a >Visitas</a></li>
                    )}
                    {!isMediumDevice && user.rol.includes('ADMIN_SYS') && (
                        <li className='opciones'
                            onClick={(e) => {
                                navigate('/organizaciones')
                            }}
                        ><a >Organizaciones</a></li>
                    )}
                    {!isMediumDevice && user.tipo === 'Escuela' && (
                        <li className='opciones'
                            onClick={(e) => {
                                navigate(`/cursos`)
                            }}
                        ><a >Cursos</a></li>
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
                                    setOpenCalendar(!openCalendar)
                                }}
                            >
                                <button className='btn-accion-2' style={{ width: '40px', height: '40px', borderRadius: '100%', backgroundColor: '#41431B' }}>
                                    <img alt='Mensajes' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ0MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1jbG9jayBwcmV2aWV3LWljb24iPjxwYXRoIGQ9Ik0xNiAxNHYyLjJsMS42IDEiLz48cGF0aCBkPSJNMTYgMnYzIi8+PHBhdGggZD0iTTIxIDcuMzM4VjVhMiAyIDAgMDAtMi0ySDVhMiAyIDAgMDAtMiAydjE0YTIgMiAwIDAwMiAyaDIuMzM4Ii8+PHBhdGggZD0iTTMgOWg1Ljg1OSIvPjxwYXRoIGQ9Ik04IDJ2MyIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiLz48L3N2Zz4=' />
                                </button>
                            </li>
                        )
                    }
                    {
                        !isMediumDevice && (
                            <li
                                onClick={() => {
                                    navigate(`/mensajes`)
                                }}
                            >
                                <button className='btn-accion-2' style={{ width: '40px', height: '40px', borderRadius: '100%' }}>
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
                            <img src={logoOrganizacion} alt={''} style={{ width: '50px', height: '50px', borderRadius: '100%', border: '1px solid #AEB784' }} />
                        </button>
                    </li>
                </ul>
            </div>

            {
                open && (
                    <div className='opcioenes-emergentes'>
                        <ul>
                            {
                                isMediumDevice && (
                                    <li className='opciones'
                                        onClick={(e) => { navigate('/home') }}
                                    ><a >Inicio</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user.rol.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/mensajes')
                                        }}
                                    ><a >Mensajes</a></li>
                                )
                            }
                            {
                                isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/inscripciones')
                                        }}
                                    ><a >Inscripciones</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user.rol.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/eventos')
                                        }}
                                    ><a >Eventos</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user.rol.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/cursos')
                                        }}
                                    ><a >Cursos</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user.rol.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/ofertaslaborales')
                                        }}
                                    ><a >Ofertas Laborales</a></li>
                                )
                            }
                            {
                                ((isMediumDevice && user.rol.includes('ADMIN_SYS')) || user.rol.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/organizaciones')
                                        }}
                                    ><a >Organizaciones</a></li>
                                )
                            }
                            <li className='opciones'
                                onClick={(e) => {
                                    navigate(`/organizacion/${user.organizacion}`); navigate(0)
                                }}
                            ><a >Organizacion</a></li>
                            {
                                isMediumDevice && user.rol.includes('ADMIN_SYS') && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/historicos')
                                        }}
                                    ><a >Historicos</a></li>
                                )
                            }
                            {(isMediumDevice || user.rol.includes('ADMIN_SYS')) && (
                                <li className='opciones'
                                    onClick={(e) => {
                                        navigate('/comentarios')
                                    }}
                                ><a >Comentarios</a></li>
                            )}
                            {
                                (isMediumDevice || user.rol.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/convenios')
                                        }}
                                    ><a >Convenios</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user.rol.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/visitas')
                                        }}
                                    ><a >Visitas</a></li>
                                )
                            }
                            {
                                user.tipo.includes('Cámara de Comercio') && (
                                    <li className='opciones'
                                        onClick={(e) => {
                                            navigate('/afiliaciones')
                                        }}
                                    ><a >Afiliaciones</a></li>
                                )
                            }
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

            {
                openCalendar && (
                    <div style={{width:'100%', height:'60vh', position:'absolute'}}>
                        <div className='overllay'></div>
                        <div className='overllay-contenedor'>
                            <Calendario accion={setOpenCalendar}/>
                        </div>
                    </div>
                )
            }

        </div>
    )
}