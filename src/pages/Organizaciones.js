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
        if (data) {
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                <div style={{ backgroundColor: 'white', width: '90%', padding: '0.5rem', height: '60vh', minHeight: '60vh', maxHeight: '60vh', overflowY:'scroll', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center'}}>
                    {
                        organizaciones?.map(
                            org => <div
                                style={{ width: '200px', height: '150px', backgroundColor: '#41431B', border: '4px solid #41431B', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div style={{ width: '100%', height: '50px' }}>
                                    <img src={org.organizacion.banner} style={{ width: '100%', borderRadius: '10px', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                                </div>
                                <div>
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px', textAlign: 'center', color: 'white' }}>{org.organizacion.nombre?.length < 26 ? org.organizacion.nombre :  org.organizacion.nombre?.substring(0,27)+"..."}</h6>
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
                            <div style={{ width: '80%', height: '80%', maxHeight: '80%', minHeight: '80%', backgroundColor: 'white', borderRadius: '10px', overflowY: 'scroll', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
                                <div style={{ width: '100%', height: '150px', backgroundColor: '#41431B' }}>
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src={organizacion?.organizacion?.banner} />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem', alignItems: 'center', transform: 'translateY(-50%)' }}>
                                    <div style={{ width: '125px', height: '125px', flexShrink:0}}>
                                        <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%' }} src={organizacion?.organizacion?.logo} />
                                    </div>
                                    <div className="titulo-organizacion">
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
                                            <div className="contenedor-datos">
                                                <div className="subcontenedor-datos">
                                                    <h6>Descripcion:</h6>
                                                    <textarea defaultValue={organizacion?.organizacion?.descripcion} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Tipo:</h6>
                                                    <input value={organizacion?.organizacion?.tipo} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Sector:</h6>
                                                    <input value={organizacion?.organizacion?.sector} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Tamaño:</h6>
                                                    <input value={organizacion?.organizacion?.tamaño} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Giro:</h6>
                                                    <input value={organizacion?.organizacion?.giro} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>RFC:</h6>
                                                    <input value={organizacion?.organizacion?.rfc} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Estado:</h6>
                                                    <input value={organizacion?.organizacion?.estado ? 'ACTIVA' : 'PENDIENTE'} />
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
                                            <div className="contenedor-datos">
                                                <div className="subcontenedor-datos">
                                                    <h6>Correo:</h6>
                                                    <input value={organizacion?.contacto?.correo} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Telefono:</h6>
                                                    <input value={organizacion?.contacto?.telefono} />
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
                                            <div className="contenedor-datos">
                                                <div className="subcontenedor-datos">
                                                    <h6>Calle:</h6>
                                                    <input value={organizacion?.direccion?.calle} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Numero:</h6>
                                                    <input value={organizacion?.direccion?.numero} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Colonia:</h6>
                                                    <input value={organizacion?.direccion?.colonia} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Codigo Postal:</h6>
                                                    <input value={organizacion?.direccion?.codigo_postal} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Ciudad:</h6>
                                                    <input value={organizacion?.direccion?.ciudad} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Estado:</h6>
                                                    <input value={organizacion?.direccion?.estado} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Pais:</h6>
                                                    <input value={organizacion?.direccion?.pais} />
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
                                            <div className="contenedor-datos">
                                                <div className="subcontenedor-datos">
                                                    <h6>Nombre:</h6>
                                                    <input type="password" value={organizacion?.cloud?.nombre} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Clave:</h6>
                                                    <input type="password" value={organizacion?.cloud?.clave} />
                                                </div>
                                                <div className="subcontenedor-datos">
                                                    <h6>Clave Secreta:</h6>
                                                    <input type="password" value={organizacion?.cloud?.clave_secreta} />
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1.8rem', gap: '1rem', marginTop: '1rem' }}>
                                    <button className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenOrganizacion(false); setSelectIdOrganizacion(null); setOrganizacion(null); setOpenDatosGenerales(false); setOpenDatosContacto(false); setOpenDatosUbicacion(false); setOpenDatosHosting(false) }}
                                    >
                                        <strong>CERRAR</strong>
                                    </button>
                                    {/* {
                                        organizacion?.organizacion?.estado === false && (
                                            <button className="btn-accion-cancelar-1"
                                                onClick={() => { setOpenOrganizacion(false); setSelectIdOrganizacion(null); setOrganizacion(null) }}
                                            >
                                                <strong>RECHAZAR</strong>
                                            </button>
                                        )
                                    } */}
                                    {
                                        (organizacion?.organizacion?.estado === false) && (organizacion?.organizacion?.tipo != 'Comité') && (
                                            <button className="btn-accion-2"
                                                onClick={() => { setOpenOrganizacion(false); setSelectIdOrganizacion(null); setOrganizacion(null); setOpenDatosGenerales(false); setOpenDatosContacto(false); setOpenDatosUbicacion(false); setOpenDatosHosting(false); handleUpdateEstado(organizacion?.organizacion?.id, true) }}
                                            >
                                                <strong>ACTIVAR</strong>
                                            </button>
                                        )
                                    }
                                    {
                                        (organizacion?.organizacion?.estado === true) && (organizacion?.organizacion?.tipo != 'Comité') && (
                                            <button className="btn-accion-2"
                                                onClick={() => { setOpenOrganizacion(false); setSelectIdOrganizacion(null); setOrganizacion(null); setOpenDatosGenerales(false); setOpenDatosContacto(false); setOpenDatosUbicacion(false); setOpenDatosHosting(false); handleUpdateEstado(organizacion?.organizacion?.id, false) }}
                                            >
                                                <strong>SUSPENDER</strong>
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