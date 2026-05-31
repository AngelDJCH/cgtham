import { useEffect, useState } from "react"

export default function VisualizarOferta() {

    const [organizacion, setOrganizacion] = useState(null)

    useEffect()

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '400px', backgroundColor: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <div style={{ width: '100%', height: '150px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                        <img src={organizacion?.banner} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                        <div style={{ width: '50px', height: '50px' }}>
                            <img src={organizacion?.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%' }} />
                        </div>
                        <h1 style={{ margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '20px' }}>{organizacion?.nombre_comercial}</h1>
                    </div>
                    <div>
                        <h1 style={{ margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '18px' }}>{oferta?.titulo}</h1>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ width: '90%', height: '50px', maxHeight: '50px', overflowY: 'scroll', textAlign: 'justify' }}>{oferta?.descripcion}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Salario:</strong></p>
                            <p><strong>$</strong>{oferta?.salario}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Jornada:</strong></p>
                            <p>{oferta?.jornada}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Contrato:</strong></p>
                            <p>{oferta?.tipo_contrato}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Vacantes:</strong></p>
                            <p>{oferta?.vacantes}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <p><strong>Habilidades:</strong></p>
                        <select style={{ width: '100px' }}>
                            <option>TECNICAS</option>
                            {
                                oferta?.habilidades_tecnicas.split(',').map(
                                    h => <option>
                                        {h}
                                    </option>
                                )
                            }
                        </select>
                        <select style={{ width: '100px' }}>
                            <option>BLANDAS</option>
                            {
                                oferta?.habilidades_blandas.split(',').map(
                                    h => <option>
                                        {h}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Área:</strong></p>
                            <p>{oferta?.departamento_area}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Modalidad:</strong></p>
                            <p>{oferta?.modalidad}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Experiencia:</strong></p>
                            <p>{oferta?.experiencia}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <p><strong>Publicado:</strong></p>
                            <p>{oferta?.fecha_publicacion.split('T')[0]}</p>
                        </div>
                    </div>
                    <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                        <button
                            className="btn-accion-cancelar-1"
                            onClick={() => { setOpenOferta(false) }}
                        ><strong>CERRAR</strong></button>
                        {
                            oferta?.id_empresa === user?.organizacion && (
                                <button className="btn-accion-2"
                                    onClick={async () => {
                                        const res = await deleteOferta(oferta?.id)
                                        if (res === 204) navigate(0)
                                        if (res != 204) alert('no se pudo eliminar la oferta')
                                    }}
                                >
                                    <strong>ELIMINAR</strong>
                                </button>
                            )
                        }
                    </div>
                </div>
                <div style={{ width: '500px', height: 'auto' }}>
                    <div style={{ width: '100%', height: '600px' }}>
                        <embed
                            src={`https://docs.google.com/gview?url=${encodeURIComponent(oferta?.documento)}&embedded=true`}
                            width="100%"
                            height="100%"
                            frameborder="0"
                        >
                        </embed>
                        <a
                            href={`https://docs.google.com/gview?url=${encodeURIComponent(oferta?.documento)}&embedded=true`}
                            download={`Oferta_${oferta?.id || 'documento'}.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-download"
                        >
                            DESCARGAR ARCHIVO PDF
                        </a>                                </div>
                </div>
            </div>
        </div>
    )
}