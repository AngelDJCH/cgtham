import { useMediaQuery } from "@uidotdev/usehooks";
import ListaUsuarios from "../components/ListaUsuarios";
import NavBarAutenticado from "../components/NavBarAutenticado";
import NavUser from "../components/NavUser";
import Notas from "../components/Notas";
import '../styles/home.css';
import { useAuth } from "../hooks/useAuth";
import PanelSistema from "../components/PanelSistema";
import { useEffect, useState } from "react";
import { getOfertasLaboralesAll } from "../services/OfertaLaboral";
import VisualizarOferta from "../components/VisualizarOferta";
import { getAllOrganizaciones } from '../services/Organizacion.js';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const isMediumDevice = useMediaQuery("(max-width : 768px) or (max-width : 992px)");
    const isSmallDevice = useMediaQuery("(max-width : 768px)");
    const isLargeDevice = useMediaQuery("(min-width: 992px)");
    const { user } = useAuth();
    const [ofertasLaborales, setOfertasLaborales] = useState(null);
    const [selectOferta, setSelectOferta] = useState(null);
    const [openOferta, setOpenOferta] = useState(false);
    const [openListUsers, setOpenListUsers] = useState(false);
    const [organizaciones, setOrganizaciones] = useState([]);
    const [vistaAdmin, setVistaAdmin] = useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        const getOfertas = async () => {
            const res = await getOfertasLaboralesAll(20, 0);
            setOfertasLaborales(res);
        };
        getOfertas();
    }, []);

    useEffect(() => {
        if (openListUsers) {
            const organizacionesData = async () => {
                const res = await getAllOrganizaciones();
                setOrganizaciones(res);
            };
            organizacionesData();
        }
    }, [openListUsers]);

    const esAdminSys = user?.rol?.includes('ADMIN_SYS');
    const esAdminOrg = user?.rol?.includes('ADMIN_ORG');

    return (
        <div className="home" style={{ marginBottom: '2rem' }}>
            <NavBarAutenticado />

            {esAdminSys && vistaAdmin === 'dashboard' && (
                <div style={{ marginTop: '1.5rem', padding: '0 1.5rem', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{
                        maxWidth: '1100px',
                        margin: '0 auto 1.5rem auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        padding: '0 0.25rem'
                    }}>
                        <div>
                            <h1 style={{ fontFamily: 'Poppins', fontSize: '26px', color: '#41431B', margin: 0, fontWeight: 700 }}>
                                Dashboard del Sistema
                            </h1>
                            <p style={{ fontFamily: 'Poppins', fontSize: '13px', color: '#333', margin: '4px 0 0 0' }}>
                                Estadísticas generales y métricas en tiempo real de la plataforma
                            </p>
                        </div>

                        {esAdminOrg && (
                            <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'white', padding: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <button
                                    onClick={() => setVistaAdmin('dashboard')}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        backgroundColor: '#41431B',
                                        color: 'white'
                                    }}
                                >
                                    📊 Dashboard
                                </button>
                                <button
                                    onClick={() => setVistaAdmin('muro')}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        color: '#41431B'
                                    }}
                                >
                                    📰 Muro de Noticias
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <PanelSistema />
                    </div>
                </div>
            )}

            {((!esAdminSys && esAdminOrg) || (esAdminSys && esAdminOrg && vistaAdmin === 'muro')) && (
                <div style={{ marginTop: esAdminSys ? '1.5rem' : '0' }}>
                    {esAdminSys && (
                        <div style={{
                            maxWidth: '1100px',
                            margin: '0 auto 1.5rem auto',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: '0 1rem'
                        }}>
                            <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'white', padding: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <button
                                    onClick={() => setVistaAdmin('dashboard')}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        color: '#41431B'
                                    }}
                                >
                                    📊 Dashboard
                                </button>
                                <button
                                    onClick={() => setVistaAdmin('muro')}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        backgroundColor: '#41431B',
                                        color: 'white'
                                    }}
                                >
                                    📰 Muro de Noticias
                                </button>
                            </div>
                        </div>
                    )}

                    {!isMediumDevice && (
                        <ListaUsuarios />
                    )}
                    {!isMediumDevice && (
                        <NavUser left='30px' />
                    )}
                    {user.tipo !== 'Escuela' && (
                        <Notas />
                    )}
                    {user.tipo === 'Escuela' && (
                        <div className="notas">
                            {ofertasLaborales?.map(o => (
                                <div key={o?.id} style={{ width: isLargeDevice ? '25%' : '50%', height: 'auto', backgroundColor: 'white', borderRadius: '10px' }}>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#41431B', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                        <h1 style={{ color: '#AEB784', fontFamily: 'Poppins', fontSize: '16px', margin: '0', padding: '0' }}>{o?.titulo}</h1>
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.3rem' }}>
                                        <div style={{ width: '200px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#41431B' }}>
                                            <div style={{ width: '20px', height: '20px' }}>
                                                <img src={o?.empresa?.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%', backgroundColor: 'white' }} />
                                            </div>
                                            <div>
                                                <h6 style={{ color: 'white' }}>{o?.empresa?.nombre_comercial?.split(' ')[0]}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', padding: isSmallDevice || isMediumDevice ? '0rem' : '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ width: '100%', padding: isSmallDevice || isMediumDevice ? '1rem' : '0.5rem', display: 'flex', flexWrap: 'wrap', gap: isSmallDevice ? '1rem' : '0.4rem', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <div className="tarjeta-datos-oferta" style={{ width: isSmallDevice ? '100%' : '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                                <div>
                                                    <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>VACANTES</strong></h6>
                                                    <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.vacantes}</h6>
                                                </div>
                                            </div>
                                            <div className="tarjeta-datos-oferta" style={{ width: isSmallDevice ? '100%' : '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                                <div>
                                                    <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>JORNADA</strong></h6>
                                                    <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.jornada}</h6>
                                                </div>
                                            </div>
                                            <div className="tarjeta-datos-oferta" style={{ width: isSmallDevice ? '100%' : '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                                <div>
                                                    <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>SALARIO</strong></h6>
                                                    <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>$</strong>{o?.salario}</h6>
                                                </div>
                                            </div>
                                            <div className="tarjeta-datos-oferta" style={{ width: isSmallDevice ? '100%' : '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                                <div>
                                                    <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>MODALIDAD</strong></h6>
                                                    <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.modalidad}</h6>
                                                </div>
                                            </div>
                                            <div className="tarjeta-datos-oferta" style={{ width: '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                                <div>
                                                    <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>AREA</strong></h6>
                                                    <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.departamento_area?.substring(0, 10)}...</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tarjeta-datos-oferta" style={{ width: '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff', marginBottom: '1rem' }}>
                                            <button className="btn-accion-2"
                                                onClick={() => {
                                                    setSelectOferta(o?.id);
                                                    setOpenOferta(true);
                                                }}
                                            >
                                                <strong>VER MAS</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {openOferta && (
                <VisualizarOferta id_oferta={selectOferta} accion={setOpenOferta} />
            )}

            {((isSmallDevice && !esAdminSys) || (esAdminSys && vistaAdmin === 'dashboard')) && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '1.5rem',
                        right: '1.5rem',
                        zIndex: 900
                    }}
                >
                    <button
                        title="Ver lista de organizaciones"
                        style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '100%',
                            border: 'none',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => {
                            setOpenListUsers(true);
                        }}
                    >
                        <img
                            src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXJzLWljb24gbHVjaWRlLXVzZXJzIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIvPjxwYXRoIGQ9Ik0xNiAzLjEyOGE0IDQgMCAwIDEgMCA3Ljc0NCIvPjxwYXRoIGQ9Ik0yMiAyMXYtMmE0IDQgMCAwIDAtMy0zLjg3Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48L3N2Zz4='
                            alt='Users or Organizations'
                        />
                    </button>
                </div>
            )}

            {openListUsers && (
                <div>
                    <div className='overllay' onClick={() => setOpenListUsers(false)}></div>
                    <div className='overllay-contenedor'>
                        <div style={{ width: '400px', minWidth: '400px', maxWidth: '400px', height: '400px', maxHeight: '400px', minHeight: '400px', backgroundColor: 'white', borderRadius: '10px', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                            {organizaciones?.filter(o => o.tipo !== 'Comité' && !o.nombre_comercial?.toLowerCase().includes('cgtham'))?.map(o => (
                                <div
                                    key={o.id}
                                    style={{
                                        width: '100%', height: '50px', display: 'flex', justifyContent: 'left', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0 12px', boxSizing: 'border-box'
                                    }}
                                >
                                    <div style={{
                                        width: '32px', height: '32px', padding: '2px', flexShrink: 0
                                    }}>
                                        <img src={o.logo} alt={o.nombre_comercial}
                                            style={{
                                                width: '100%', height: '100%', objectPosition: 'center', objectFit: 'cover', borderRadius: '100%', flexShrink: 0
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginLeft: '12px' }}>
                                        <p
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontFamily: 'Poppins',
                                                margin: 0,
                                                color: '#333',
                                                fontWeight: 500
                                            }}
                                            onClick={() => { navigate(`/organizacion/${o.id}`); setOpenListUsers(false); }}
                                        >
                                            {o.nombre_comercial}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            style={{ marginTop: '1rem' }}
                            className='btn-accion-2'
                            onClick={() => {
                                setOpenListUsers(false);
                            }}
                        >
                            <strong>CERRAR</strong>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
