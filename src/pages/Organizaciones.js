import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import { getAllOrganizacionesPendientes, getOrganizacionFast } from "../services/Organizacion";

export default function Organizaciones() {

    const [organizaciones, setOrganizaciones] = useState([])

    const [organizacion, setOrganizacion] = useState(null)

    // useEffect(()=>{},[])

    const [selectIdOrganizacion, setSelectIdOrganizacion] = useState('')

    useEffect(() => {
        const organizacionById = async () => {
            const res = await getOrganizacionFast(selectIdOrganizacion)
            setOrganizacion(res)
        }
        organizacionById()
    }, [selectIdOrganizacion])

    useEffect(() => {
        const org = async () => {
            const res = await getAllOrganizacionesPendientes()
            console.log(res)
            setOrganizaciones(res)
        }

        org()
    }, [])

    const [openOrganizacion, setOpenOrganizacion] = useState(false)

    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Organizaciones' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='Crear organizacion' />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', width: '90%', padding: '0.5rem', height: '70vh', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                    {
                        organizaciones?.map(
                            organizacion => <div key={organizacion?.organizacion.id}
                                style={{ width: '200px', height: '200px', backgroundColor: '#41431B', border: '4px solid #41431B' }}>
                                <div style={{ width: '100%', height: '50px' }}>
                                    <img src={organizacion.organizacion.banner} style={{ width: '100%', borderRadius: '10px', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                                </div>
                                <div>
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px', textAlign: 'center', color: 'white' }}>{organizacion.organizacion.nombre}</h6>
                                </div>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '0.3rem' }}
                                >

                                    <button className="btn-accion-2"
                                        onClick={(e) => { setSelectIdOrganizacion(`${e.target.value}`); setOpenOrganizacion(true) }}
                                        value={organizacion.organizacion.id}
                                    >
                                        <strong
                                        >VISUALIZAR</strong>
                                    </button>

                                    {
                                        !organizacion?.organizacion.estado && (
                                            <button className="btn-accion-2">
                                                <strong>ACEPTAR</strong>
                                            </button>
                                        )
                                    }
                                    {
                                        !organizacion?.organizacion.estado && (
                                            <button className="btn-accion-cancelar-1">
                                                <strong>RECHAZAR</strong>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                openOrganizacion && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{ width: '80%', height: '80%', backgroundColor: 'white', borderRadius: '10px' }}>
                                <div style={{ width: '100%', height: '100px' }}>
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src={organizacion?.organizacion?.banner} />
                                </div>
                                <div>
                                    <h6>Nombre:</h6>
                                    <p>{organizacion?.organizacion.nombre}</p>
                                </div>
                                <div>
                                    <button className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenOrganizacion(false) }}
                                    >
                                        <strong>CERRAR</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}