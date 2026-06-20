import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import { getAllOrganizacionesPendientes, getOrganizacionFast, updateEstadoByIdOrganizacion } from "../services/Organizacion";
import { or } from "ajv/dist/compile/codegen";
import '../styles/organizaciones.css'
import { useNavigate } from "react-router-dom";

export default function Organizaciones() {

    const [organizaciones, setOrganizaciones] = useState([])

    const [openDatosGenerales, setOpenDatosGenerales] = useState(false)
    const [openDatosContacto, setOpenDatosContacto] = useState(false)
    const [openDatosUbicacion, setOpenDatosUbicacion] = useState(false)
    const [openDatosHosting, setOpenDatosHosting] = useState(false)

    const [organizacion, setOrganizacion] = useState(null)
    const navigate = useNavigate()

    // useEffect(()=>{},[])

    const [selectIdOrganizacion, setSelectIdOrganizacion] = useState(null)

    const handleUpdateEstado = async (id, estado) => {
        const data = await updateEstadoByIdOrganizacion(id, estado)
        if(data){
            navigate(0)
            alert('ORGANIZACION ACTUALIZADA')
        }
    }

    useEffect(() => {
        if (selectIdOrganizacion) {
            const organizacionById = async () => {
                const res = await getOrganizacionFast(selectIdOrganizacion)
                setOrganizacion(res)
            }
            organizacionById()
        }
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
                <div style={{ backgroundColor: 'white', width: '90%', padding: '0.5rem', height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                    {
                        organizaciones?.map(
                            org => <div
                                style={{ width: '200px', height: '150px', backgroundColor: '#41431B', border: '4px solid #41431B', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                <div style={{ width: '100%', height: '50px' }}>
                                    <img src={org.organizacion.banner} style={{ width: '100%', borderRadius: '10px', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                                </div>
                                <div>
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px', textAlign: 'center', color: 'white' }}>{org.organizacion.nombre}</h6>
                                </div>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '0.3rem' }}
                                >

                                    <button className="btn-accion-2"
                                        onClick={() => { setSelectIdOrganizacion(org.organizacion.id); setOpenOrganizacion(true) }}
                                    >
                                        <strong
                                        >VISUALIZAR</strong>
                                    </button>

                                    {/* {
                                        org?.organizacion.estado===false && (
                                            <button className="btn-accion-2">
                                                <strong>ACEPTAR</strong>
                                            </button>
                                        )
                                    }
                                    {
                                        org?.organizacion.estado===false && (
                                            <button className="btn-accion-cancelar-1">
                                                <strong>RECHAZAR</strong>
                                            </button>
                                        )
                                    } */}
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
                            <div style={{ width: '80%', height: '80%', maxHeight: '80%', minHeight: '80%', backgroundColor: 'white', borderRadius: '10px', overflowY: 'scroll', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding:'1rem' }}>
                                <div style={{ width: '100%', height: '150px' }}>
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src={organizacion?.organizacion?.banner} />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
                                    <div style={{ width: '125px', height: '125px', transform: 'translateY(-50%)' }}>
                                        <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%' }} src={organizacion?.organizacion?.logo} />
                                    </div>
                                    <div>
                                        <h1 style={{ margin: 0 }}>{organizacion?.organizacion.nombre}</h1>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '0.4rem' }}>
                                    <div className="tarjeta-datos-titulos">
                                        <h6>DATOS GENERALES</h6>
                                        <img
                                            onClick={() => { openDatosGenerales ? setOpenDatosGenerales(false) : setOpenDatosGenerales(true); setOpenDatosContacto(false); setOpenDatosHosting(false); setOpenDatosUbicacion(false) }}
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVhcmUtY2hldnJvbi1kb3duLWljb24gbHVjaWRlLXNxdWFyZS1jaGV2cm9uLWRvd24iPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiLz48cGF0aCBkPSJtMTYgMTAtNCA0LTQtNCIvPjwvc3ZnPg==" style={{ width: '20px', height: '20px' }} />
                                    </div>

                                    {
                                        openDatosGenerales && (
                                            <div>
                                                <div>
                                                    <h6>Descripcion:</h6>
                                                    <textarea style={{ minWidth: '200px', maxWidth: '200px', minHeight: '40px', maxHeight: '40px' }} defaultValue={organizacion?.organizacion?.descripcion} />
                                                </div>
                                                <div>
                                                    <h6>Tipo:</h6>
                                                    <p>{organizacion?.organizacion?.tipo}</p>
                                                </div>
                                                <div>
                                                    <h6>Sector:</h6>
                                                    <p>{organizacion?.organizacion?.sector}</p>
                                                </div>
                                                <div>
                                                    <h6>Tamaño:</h6>
                                                    <p>{organizacion?.organizacion?.tamaño}</p>
                                                </div>
                                                <div>
                                                    <h6>Giro:</h6>
                                                    <p>{organizacion?.organizacion?.giro}</p>
                                                </div>
                                                <div>
                                                    <h6>RFC:</h6>
                                                    <p>{organizacion?.organizacion?.rfc}</p>
                                                </div>
                                                <div>
                                                    <h6>Estado:</h6>
                                                    <p>{organizacion?.organizacion?.estado ? 'ACTIVA' : 'PENDIENTE'}</p>
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="tarjeta-datos-titulos">
                                        <h6>DATOS CONTACTO</h6>
                                        <img
                                            onClick={() => { setOpenDatosGenerales(false); openDatosContacto ? setOpenDatosContacto(false) : setOpenDatosContacto(true); setOpenDatosHosting(false); setOpenDatosUbicacion(false) }}
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVhcmUtY2hldnJvbi1kb3duLWljb24gbHVjaWRlLXNxdWFyZS1jaGV2cm9uLWRvd24iPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiLz48cGF0aCBkPSJtMTYgMTAtNCA0LTQtNCIvPjwvc3ZnPg==" style={{ width: '20px', height: '20px' }} />
                                    </div>

                                    {
                                        openDatosContacto && (
                                            <div>
                                                <div>
                                                    <h6>Correo:</h6>
                                                    <p>{organizacion?.contacto?.correo}</p>
                                                </div>
                                                <div>
                                                    <h6>Telefono:</h6>
                                                    <p>{organizacion?.contacto?.telefono}</p>
                                                </div>
                                            </div>
                                        )
                                    }


                                    <div className="tarjeta-datos-titulos">
                                        <h6>DATOS UBICACION</h6>
                                        <img
                                            onClick={() => { setOpenDatosGenerales(false); setOpenDatosContacto(false); setOpenDatosHosting(false); openDatosUbicacion ? setOpenDatosUbicacion(false) : setOpenDatosUbicacion(true) }}
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVhcmUtY2hldnJvbi1kb3duLWljb24gbHVjaWRlLXNxdWFyZS1jaGV2cm9uLWRvd24iPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiLz48cGF0aCBkPSJtMTYgMTAtNCA0LTQtNCIvPjwvc3ZnPg==" style={{ width: '20px', height: '20px' }} />
                                    </div>

                                    {
                                        openDatosUbicacion && (
                                            <div>
                                                <div>
                                                    <h6>Calle:</h6>
                                                    <p>{organizacion?.direccion?.calle}</p>
                                                </div>
                                                <div>
                                                    <h6>Numero:</h6>
                                                    <p>{organizacion?.direccion?.numero}</p>
                                                </div>
                                                <div>
                                                    <h6>Colonia:</h6>
                                                    <p>{organizacion?.direccion?.colonia}</p>
                                                </div>
                                                <div>
                                                    <h6>Codigo Postal:</h6>
                                                    <p>{organizacion?.direccion?.codigo_postal}</p>
                                                </div>
                                                <div>
                                                    <h6>Ciudad:</h6>
                                                    <p>{organizacion?.direccion?.ciudad}</p>
                                                </div>
                                                <div>
                                                    <h6>Estado:</h6>
                                                    <p>{organizacion?.direccion?.estado}</p>
                                                </div>
                                                <div>
                                                    <h6>Pais:</h6>
                                                    <p>{organizacion?.direccion?.pais}</p>
                                                </div>
                                            </div>
                                        )
                                    }


                                    <div className="tarjeta-datos-titulos">
                                        <h6>DATOS HOSTING</h6>
                                        <img
                                            onClick={() => { setOpenDatosGenerales(false); setOpenDatosContacto(false); openDatosHosting ? setOpenDatosHosting(false) : setOpenDatosHosting(true); setOpenDatosUbicacion(false) }}
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVhcmUtY2hldnJvbi1kb3duLWljb24gbHVjaWRlLXNxdWFyZS1jaGV2cm9uLWRvd24iPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiLz48cGF0aCBkPSJtMTYgMTAtNCA0LTQtNCIvPjwvc3ZnPg==" style={{ width: '20px', height: '20px' }} />
                                    </div>

                                    {
                                        openDatosHosting && (
                                            <div>
                                                <div>
                                                    <h6>Nombre:</h6>
                                                    <p>{organizacion?.cloud?.nombre}</p>
                                                </div>
                                                <div>
                                                    <h6>Clave:</h6>
                                                    <p>{organizacion?.cloud?.clave}</p>
                                                </div>
                                                <div>
                                                    <h6>Clave Secreta:</h6>
                                                    <p>{organizacion?.cloud?.clave_secreta}</p>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1.8rem', gap: '1rem' }}>
                                    <button className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenOrganizacion(false); setSelectIdOrganizacion(null); setOrganizacion(null) }}
                                    >
                                        <strong>CERRAR</strong>
                                    </button>
                                    {
                                        organizacion?.organizacion?.estado === false && (
                                            <button className="btn-accion-cancelar-1"
                                                onClick={() => { setOpenOrganizacion(false); setSelectIdOrganizacion(null); setOrganizacion(null) }}
                                            >
                                                <strong>RECHAZAR</strong>
                                            </button>
                                        )
                                    }
                                    {
                                        organizacion?.organizacion?.estado === false && (
                                            <button className="btn-accion-2"
                                                onClick={() => { setOpenOrganizacion(false); setSelectIdOrganizacion(null); setOrganizacion(null); setOpenDatosGenerales(false); setOpenDatosContacto(false); setOpenDatosUbicacion(false); setOpenDatosHosting(false); handleUpdateEstado(organizacion?.organizacion?.id, true) }}
                                            >
                                                <strong>ACEPTAR</strong>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}