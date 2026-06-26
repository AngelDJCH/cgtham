import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react"
import { deleteByIdForEscuelas, findById, updateEstadoRechazadaById, updateVisitaById } from '../services/Visita.js'
import { useNavigate } from "react-router-dom";

export default function VisualizarVisita(props) {

    const isSmallDevice = useMediaQuery('(max-width:768px) or (max-width : 1024px)');
    const navigate = useNavigate()

    const handleUpdateById = async (fecha_visita, id) => {
        const res = await updateVisitaById(fecha_visita, id)
        if (res && res === 200) { navigate(0); alert('Visita aprobada') } else {
            alert('No se pudo aprobar la visita')
        }
    }

    const [visitaData, setVisitaData] = useState({
        id: '',
        solicitado: '',
        aprobado: '',
        agendado: '',
        estado: ''
    })

    useEffect(() => {
        const getVisita = async () => {
            const res = await findById(props.idVisita)
            setVisitaData(res)
        }

        if (props.idVisita != null) { getVisita() }

    }, [])

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                <div className="formulario-contenedor">
                    <div className="titulo-formulario"><h1 className='subtitulo'>SOLICITUD DE VISITA</h1></div>
                    <div className="formulario">
                        <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                            <div className="contenedor-datos-interno" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                                <div style={{ width: '100%', height: '100px' }}>
                                    <img src={visitaData.escuela?.banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Solicitante:</h6>

                                <p style={{ margin: 0, padding: 0, fontSize: '20px', textAlign: 'center' }}>{visitaData.escuela?.nombre}</p>
                                <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Estado:</h6>

                                <p style={{ margin: 0, padding: 0, fontSize: '15px', textAlign: 'center' }}>{visitaData.estado}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px' }}>
                                        <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Solicitado:</h6>
                                        <input type='date' defaultValue={visitaData.solicitado.split('T')[0]} disabled />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px' }}>
                                        <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Agendar:</h6>
                                        {
                                            visitaData.agendado != null ? <input type='date' defaultChecked={visitaData.agendado.split('T')[0]} /> : <input type='date' id='fecha_visita' />
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        {
                            !isSmallDevice && (

                                <div style={{ display: 'flex', width: isSmallDevice ? '40%' : '250px', justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <p><strong>Nota:</strong> Recuerda que las visitas una vez agendadas no podran ser moficadas.
                                        <br /> En caso de tener algun problema reportar a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                                </div>
                            )
                        }
                    </div>
                    <div className="contenedor-botones-formulario">
                        <button
                            className='btn-accion-cancelar-1'
                            onClick={() => { props.accion(false) }}
                        >
                            <strong>CANCELAR</strong>
                        </button>
                        <button
                            className='btn-accion-2'
                            onClick={() => {
                                const f_visita = document.getElementById('fecha_visita').value
                                handleUpdateById(f_visita, visitaData.id)
                            }}
                        >
                            <strong>GUARDAR</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}