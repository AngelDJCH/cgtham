import { useEffect, useState } from "react"
import { deleteOferta, getOfertaById } from "../services/OfertaLaboral"
import { getOrganizacion } from "../services/Organizacion"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@uidotdev/usehooks"

export default function VisualizarOferta(props) {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [organizacion, setOrganizacion] = useState(null)
    const [loading, setLoading] = useState(true) // Estado para controlar la carga inicial
    const isSmallDevice = useMediaQuery('(max-width:768px)');
    const isMediumDevice = useMediaQuery('(max-width: 1024px)');

    const [oferta, setOferta] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        salario: '',
        jornada: '',
        tipo_contrato: '',
        vacantes: '',
        beneficios: '',
        habilidades_tecnicas: '',
        habilidades_blandas: '',
        departamento_area: '',
        modalidad: '',
        experiencia: '',
        estado: '',
        fecha_publicacion: '',
        id_empresa: '',
        documento: ''
    })

    useEffect(() => {
        const getOferta = async () => {
            if (!props?.id_oferta) return;
            setLoading(true)
            try {
                const res = await getOfertaById(props?.id_oferta)
                setOferta(res)

                if (res?.id_empresa) {
                    const resOrg = await getOrganizacion(res?.id_empresa)
                    setOrganizacion(resOrg)
                }
            } catch (error) {
                console.error("Error al obtener los datos de la oferta:", error)
            } finally {
                setLoading(false)
            }
        }
        getOferta()
    }, [props?.id_oferta])

    const esUrlValidaParaVisor = (url) => {
        if (!url) return false;
        return url.startsWith('http://') || url.startsWith('https://');
    }

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: (isSmallDevice || isMediumDevice) ? '90%' : '400px', backgroundColor: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', height: (isSmallDevice || isMediumDevice) ? '90vh' : '600px' }}>
                    <div style={{ width: '100%', height: (isSmallDevice || isMediumDevice) ? '20%' : '150px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                        <img src={organizacion?.banner} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} alt="banner" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', justifyContent: 'space-between', height: (isSmallDevice || isMediumDevice) ? '10%' : null }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px' }}>
                                <img src={organizacion?.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%' }} alt="logo" />
                            </div>
                            <h1 style={{ margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '20px' }}>{organizacion?.nombre_comercial}</h1>
                        </div>
                        <div>
                            <p><strong>{oferta?.fecha_publicacion ? oferta.fecha_publicacion.split('T')[0] : ''}</strong></p>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '50px', backgroundColor: '#41431B', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '18px', marginLeft: '1rem' }}>{oferta?.titulo}</h1>
                    </div>

                    <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: (isSmallDevice || isMediumDevice) ? '50%' : '300px', maxHeight: isSmallDevice ? '50%' : '300px', overflowY: 'scroll', scrollbarWidth: 'thin' }}>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Descripción:</h6>
                            <textarea style={{ minWidth: '90%', maxWidth: '90%', minHeight: '50px', maxHeight: '50px', border: 'none', textAlign: 'center' }} value={oferta?.descripcion} />
                        </div>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Salario:</h6>
                            <p style={{ margin: '0' }}><strong>$ </strong>{oferta?.salario}</p>
                        </div>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Jornada:</h6>
                            <p style={{ margin: '0' }}>{oferta?.jornada}</p>
                        </div>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Tipo de contrato:</h6>
                            <p style={{ margin: '0' }}>{oferta?.tipo_contrato}</p>
                        </div>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Vacantes:</h6>
                            <p style={{ margin: '0' }}>{oferta?.vacantes}</p>
                        </div>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Área:</h6>
                            <p style={{ margin: '0' }}>{oferta?.departamento_area}</p>
                        </div>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Modalidad:</h6>
                            <p style={{ margin: '0' }}>{oferta?.modalidad}</p>
                        </div>
                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Experiencia:</h6>
                            <p style={{ margin: '0' }}>{oferta?.experiencia} años</p>
                        </div>

                        <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
                            <h6 style={{ margin: '0', textAlign: 'justify', width: '90%' }}>Habilidades:</h6>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: '0.5rem' }}>
                                <select style={{ width: '100px' }}>
                                    <option>TECNICAS</option>
                                    {oferta?.habilidades_tecnicas ? oferta.habilidades_tecnicas.split(',').map((h, i) => <option key={i}>{h}</option>) : null}
                                </select>
                                <select style={{ width: '100px' }}>
                                    <option>BLANDAS</option>
                                    {oferta?.habilidades_blandas ? oferta.habilidades_blandas.split(',').map((h, i) => <option key={i}>{h}</option>) : null}
                                </select>
                            </div>
                        </div>

                        {
                            (isSmallDevice || isMediumDevice) && (
                                <div>
                                    {oferta?.documento && (
                                        <a
                                            href={`https://docs.google.com/gview?url=${encodeURIComponent(oferta?.documento)}&embedded=true`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#41431B', textDecoration: 'underline', marginTop: '10px', fontWeight: 'bold' }}
                                        >
                                            Ver archivo directamente
                                        </a>
                                    )}
                                </div>
                            )
                        }
                        <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'center', height: (isSmallDevice || isMediumDevice) ? '20%' : null, gap: '1rem' }}>
                            <button className="btn-accion-cancelar-1" onClick={() => { props.accion(false) }}>
                                <strong>CERRAR</strong>
                            </button>
                            {oferta?.id_empresa === user?.organizacion && (
                                <button className="btn-accion-2" onClick={async () => {
                                    const res = await deleteOferta(oferta?.id)
                                    if (res === 204) navigate(0)
                                    else alert('no se pudo eliminar la oferta')
                                }}>
                                    <strong>ELIMINAR</strong>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {
                    (!isSmallDevice || !isMediumDevice) && (
                        <div style={{ width: '500px', height: 'auto', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '600px' }}>
                                {loading ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <p style={{ fontFamily: 'Poppins' }}>Cargando documento...</p>
                                    </div>
                                ) : esUrlValidaParaVisor(oferta?.documento) ? (
                                    <embed
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(oferta?.documento)}&embedded=true`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                    />
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem', textAlign: 'center' }}>
                                        <p style={{ fontFamily: 'Poppins', color: '#41431B' }}>El documento no está disponible o no es una URL pública válida.</p>
                                        {oferta?.documento && (
                                            <a
                                                href={oferta.documento}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#41431B', textDecoration: 'underline', marginTop: '10px', fontWeight: 'bold' }}
                                            >
                                                Ver archivo directamente
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}