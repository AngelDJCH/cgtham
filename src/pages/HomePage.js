import { useMediaQuery } from "@uidotdev/usehooks";
import ListaUsuarios from "../components/ListaUsuarios";
import NavBarAutenticado from "../components/NavBarAutenticado";
import NavUser from "../components/NavUser";
import Notas from "../components/Notas";
import '../styles/home.css'
import { useAuth } from "../hooks/useAuth";
import PanelSistema from "../components/PanelSistema";
import { useEffect, useState } from "react";
import { getOfertasLaboralesAll } from "../services/OfertaLaboral";
import VisualizarOferta from "../components/VisualizarOferta";

export default function HomePage() {

    const isMediumDevice = useMediaQuery("(max-width : 768px) or (max-width : 992px)")
    const isSmallDevice = useMediaQuery("(max-width : 768px)")

    const { user } = useAuth()
    const [ofertasLaborales, setOfertasLaborales] = useState(null)

    const [selectOferta, setSelectOferta] = useState(null)
    const [openOferta, setOpenOferta] = useState(false)

    useEffect(() => {
        const getOfertas = async () => {
            const res = await getOfertasLaboralesAll()

            setOfertasLaborales(res)
        }
        getOfertas()
    }, [])

    return (
        <div className="home" style={{ marginBottom: '1rem' }}>
            <NavBarAutenticado />
            {
                user.rol.includes('ADMIN_ORG') && (
                    <div style={{ marginTop: '8rem' }}>
                        {
                            !isMediumDevice && (
                                <ListaUsuarios />
                            )
                        }
                        {
                            !isMediumDevice && (
                                <NavUser left='30px' />
                            )
                        }
                        {
                            user.tipo != 'Escuela' && (
                                <Notas />
                            )
                        }

                        {
                            user.tipo === 'Escuela' && (
                                <div className="notas">
                                    {
                                        ofertasLaborales?.map(
                                            o => <div style={{ width: '50%', height: 'auto', backgroundColor: 'white', borderRadius: '10px' }}>
                                                <div style={{ padding: '0.5rem', backgroundColor: '#41431B', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                    <h1 style={{ color: '#AEB784', fontFamily: 'Poppins', fontSize: '16px', margin: '0', padding: '0' }}>{o?.titulo}</h1>
                                                </div>
                                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.3rem' }}>

                                                    <div style={{ width: '200px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#41431B' }}>
                                                        <div style={{ width: '20px', height: '20px' }}>
                                                            <img src={o?.empresa?.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%', backgroundColor: 'white' }} />
                                                        </div>
                                                        <div>
                                                            <h6 style={{ color: 'white' }}>{o?.empresa?.nombre_comercial.split(' ')[0]}</h6>
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
                                                                setSelectOferta(o?.id)
                                                                setOpenOferta(true)
                                                            }}
                                                        >
                                                            <strong>VER MAS</strong>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                user.rol.includes('ADMIN_SYS') && (
                    <div style={{ marginTop: '8rem' }}>
                        <h1 style={{ textAlign: 'start', marginLeft: '10rem', color: 'white' }}>Dashboard</h1>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <PanelSistema />
                        </div>
                    </div>
                )
            }

            {
                openOferta && (
                    <VisualizarOferta id_oferta={selectOferta} accion={setOpenOferta} />
                )
            }
        </div>
    )
}