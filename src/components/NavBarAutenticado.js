import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { useEffect, useState } from 'react';
import { logout } from '../services/Cuenta';
import { useAuth } from '../hooks/useAuth';
import { useMediaQuery } from '@uidotdev/usehooks';
import { getLogoByIdOrganizacion, getOrganizacionFast } from '../services/Organizacion';
import Calendario from './Calendario';

export default function NavBarAutenticado() {
    const [openCalendar, setOpenCalendar] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const logo = 'https://res.cloudinary.com/dfdfauyvo/image/upload/v1780874578/Gemini_Generated_Image_l40lrul40lrul40l_rx9sd3.png';
    const nombre = 'CGTHAM' || 'Comisión de Gestión de Talento Humano de las Altas Montañas';
    const { user } = useAuth();
    const [logoOrganizacion, setLogo] = useState(user?.foto || '');
    const [nombreOrganizacion, setNombreOrganizacion] = useState('');
    const [imgError, setImgError] = useState(false);
    const isMediumDevice = useMediaQuery("(max-width : 678px) or (max-width : 1024px)");
    const esAdmin = user?.rol?.includes('ADMIN_SYS');

    useEffect(() => {
        const handleLogoActualizado = (e) => {
            if (e.detail?.logo) {
                setLogo(e.detail.logo);
                setImgError(false);
            }
        };
        window.addEventListener('organizacion_logo_actualizado', handleLogoActualizado);
        return () => {
            window.removeEventListener('organizacion_logo_actualizado', handleLogoActualizado);
        };
    }, []);

    useEffect(() => {
        if (esAdmin) {
            setLogo(logo);
            setNombreOrganizacion('Administrador');
            setImgError(false);
            return;
        }

        if (user?.foto) {
            setLogo(user.foto);
            setImgError(false);
        }
        const getOrgData = async () => {
            if (user?.organizacion) {
                try {
                    const res = await getOrganizacionFast(user.organizacion);
                    const org = res?.organizacion || res;
                    if (org) {
                        if (org.logo) {
                            setLogo(org.logo);
                            setImgError(false);
                        }
                        if (org.nombre || org.nombre_comercial) {
                            setNombreOrganizacion(org.nombre || org.nombre_comercial);
                        }
                    }
                } catch (e) {
                    console.error("Error al obtener datos de organización:", e);
                }

                try {
                    const log = await getLogoByIdOrganizacion(user.organizacion);
                    if (log) {
                        setLogo(log);
                        setImgError(false);
                    }
                } catch (e) {
                    console.error("Error al obtener logo:", e);
                }
            }
        };
        getOrgData();
    }, [user?.organizacion, user?.foto, esAdmin]);

    return (
        <div className="navbar">
            <div className="seccion1" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '50px', height: '50px' }}><img src={logo} alt="logo_cgtham" /></div>
                <h1
                    style={{ cursor: 'pointer' }}
                    onClick={() => { navigate('/home'); }}
                >{nombre}</h1>
            </div>
            <div className="seccion2">
                <ul>
                    {!isMediumDevice && (
                        <li className='opciones'
                            onClick={() => { navigate('/home'); }}
                        ><a>Inicio</a></li>
                    )}
                    {!isMediumDevice && user?.tipo === 'Escuela' && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/eventos');
                            }}
                        ><a>Eventos</a></li>
                    )}
                    {!isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/ofertaslaborales');
                            }}
                        ><a>Ofertas Laborales</a></li>
                    )}
                    {!isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/convenios');
                            }}
                        ><a>Convenios</a></li>
                    )}

                    {!isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/afiliaciones');
                            }}
                        ><a>Afiliaciones</a></li>
                    )}
                    {!isMediumDevice && user?.tipo === 'Empresa' && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/visitas');
                            }}
                        ><a>Visitas</a></li>
                    )}
                    {!isMediumDevice && user?.rol?.includes('ADMIN_SYS') && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/organizaciones');
                            }}
                        ><a>Organizaciones</a></li>
                    )}
                    {!isMediumDevice && user?.tipo === 'Escuela' && (
                        <li className='opciones'
                            onClick={() => {
                                navigate(`/cursos`);
                            }}
                        ><a>Cursos</a></li>
                    )}
                    {!isMediumDevice && user?.rol?.includes('ADMIN_SYS') && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/historicos');
                            }}
                        ><a>Historicos</a></li>
                    )}
                    {!isMediumDevice && user?.rol?.includes('ADMIN_SYS') && (
                        <li className='opciones'
                            onClick={() => {
                                navigate('/comentarios');
                            }}
                        ><a>Comentarios</a></li>
                    )}
                    {
                        !isMediumDevice && (
                            <li
                                onClick={() => {
                                    setOpenCalendar(!openCalendar);
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
                                    navigate(`/mensajes`);
                                }}
                            >
                                <button className='btn-accion-2' style={{ width: '40px', height: '40px', borderRadius: '100%' }}>
                                    <img alt='Mensajes' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tZXNzYWdlLWNpcmNsZS1pY29uIGx1Y2lkZS1tZXNzYWdlLWNpcmNsZSI+PHBhdGggZD0iTTIuOTkyIDE2LjM0MmEyIDIgMCAwIDEgLjA5NCAxLjE2N2wtMS4wNjUgMy4yOWExIDEgMCAwIDAgMS4yMzYgMS4xNjhsMy40MTMtLjk5OGEyIDIgMCAwIDEgMS4wOTkuMDkyIDEwIDEwIDAgMSAwLTQuNzc3LTQuNzE5Ii8+PC9zdmc+' />
                                </button>
                            </li>
                        )
                    }
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            style={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: '25px',
                                transition: 'all 0.2s'
                            }}
                            onClick={() => { setOpen(!open); }}
                            title="Opciones de cuenta"
                        >
                            <span style={{
                                fontFamily: 'Poppins',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#41431B',
                                maxWidth: '140px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {esAdmin ? 'Administrador' : (nombreOrganizacion || 'Mi Cuenta')}
                            </span>
                            {esAdmin ? (
                                <img
                                    src={logo}
                                    alt="Administrador CGTHAM"
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        border: '2px solid #AEB784',
                                        objectFit: 'cover',
                                        backgroundColor: '#FFFFFF',
                                        flexShrink: 0
                                    }}
                                />
                            ) : (logoOrganizacion && !imgError) ? (
                                <img
                                    src={logoOrganizacion}
                                    alt={nombreOrganizacion || 'Perfil'}
                                    onError={() => setImgError(true)}
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        border: '2px solid #AEB784',
                                        objectFit: 'cover',
                                        backgroundColor: '#FFFFFF',
                                        flexShrink: 0
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        border: '2px solid #AEB784',
                                        backgroundColor: '#41431B',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFD400',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        flexShrink: 0
                                    }}
                                >
                                    {(nombreOrganizacion ? nombreOrganizacion[0] : (user?.correo ? user.correo[0] : 'U')).toUpperCase()}
                                </div>
                            )}
                        </button>
                    </li>
                </ul>
            </div>

            {
                open && (
                    <div className='opcioenes-emergentes'>
                        <ul>
                            <li
                                style={{
                                    padding: '8px 12px',
                                    borderBottom: '1px solid #AEB784',
                                    marginBottom: '8px',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px'
                                }}
                            >
                                <strong style={{ fontSize: '13px', color: '#41431B', fontFamily: 'Poppins' }}>
                                    {esAdmin ? 'Administrador del Sistema' : (nombreOrganizacion || 'Mi Cuenta')}
                                </strong>
                                <span style={{ fontSize: '11px', color: '#555' }}>{user?.correo}</span>
                            </li>
                            {
                                isMediumDevice && (
                                    <li className='opciones'
                                        onClick={() => { navigate('/home'); setOpen(false); }}
                                    ><a>Inicio</a></li>
                                )
                            }
                            {
                                isMediumDevice && (
                                    <li className='opciones'
                                        onClick={() => { setOpenCalendar(!openCalendar); setOpen(false); }}
                                    >
                                        Calendario
                                    </li>
                                )
                            }
                            {
                                (isMediumDevice || user?.rol?.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/mensajes');
                                            setOpen(false);
                                        }}
                                    ><a>Mensajes</a></li>
                                )
                            }
                            {
                                isMediumDevice && (user?.tipo === 'Empresa' || user?.tipo === 'Cámara de Comercio') && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/inscripciones');
                                            setOpen(false);
                                        }}
                                    ><a>Inscripciones</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user?.rol?.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/eventos');
                                            setOpen(false);
                                        }}
                                    ><a>Eventos</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user?.rol?.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/cursos');
                                            setOpen(false);
                                        }}
                                    ><a>Cursos</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user?.rol?.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/ofertaslaborales');
                                            setOpen(false);
                                        }}
                                    ><a>Ofertas Laborales</a></li>
                                )
                            }
                            {
                                ((isMediumDevice && user?.rol?.includes('ADMIN_SYS')) || user?.rol?.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/organizaciones');
                                            setOpen(false);
                                        }}
                                    ><a>Organizaciones</a></li>
                                )
                            }
                            {!esAdmin && (
                                <li className='opciones'
                                    onClick={() => {
                                        navigate(`/organizacion/${user.organizacion}`);
                                        setOpen(false);
                                        navigate(0);
                                    }}
                                ><a>Mi Organización</a></li>
                            )}
                            {
                                isMediumDevice && user?.rol?.includes('ADMIN_SYS') && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/historicos');
                                            setOpen(false);
                                        }}
                                    ><a>Historicos</a></li>
                                )
                            }
                            {(isMediumDevice || user?.rol?.includes('ADMIN_SYS')) && (
                                <li className='opciones'
                                    onClick={() => {
                                        navigate('/comentarios');
                                        setOpen(false);
                                    }}
                                ><a>Comentarios</a></li>
                            )}
                            {
                                (isMediumDevice || user?.rol?.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/convenios');
                                            setOpen(false);
                                        }}
                                    ><a>Convenios</a></li>
                                )
                            }
                            {
                                (isMediumDevice || user?.rol?.includes('ADMIN_SYS')) && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/visitas');
                                            setOpen(false);
                                        }}
                                    ><a>Visitas</a></li>
                                )
                            }
                            {
                                user?.tipo?.includes('Cámara de Comercio') && (
                                    <li className='opciones'
                                        onClick={() => {
                                            navigate('/afiliaciones');
                                            setOpen(false);
                                        }}
                                    ><a>Afiliaciones</a></li>
                                )
                            }
                            <li
                                style={{ color: '#9B2C2C', fontWeight: 700 }}
                                onClick={async () => {
                                    setOpen(false);
                                    const status = await logout();
                                    status === 204 ? navigate('/') : navigate('/home');
                                }}
                            >Cerrar Sesión</li>
                        </ul>
                    </div>
                )
            }

            {
                openCalendar && (
                    <div style={{ width: '100%', height: '60vh', position: 'absolute' }}>
                        <div className='overllay'></div>
                        <div className='overllay-contenedor'>
                            <Calendario accion={setOpenCalendar} />
                        </div>
                    </div>
                )
            }
        </div>
    );
}
