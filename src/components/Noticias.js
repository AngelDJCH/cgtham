import { useEffect, useState } from "react"
import '../styles/noticias.css'
import { eventoOrganizacion } from "../services/EventoOrganizacion"
import VisualizarEvento from './VisualizarEvento'

export default function Noticias() {

    const [openHistorial, setOpenHistorial] = useState(false)

    const [eventosTabla, setEventosTabla] = useState([])

    const ahora = new Date()

    useEffect(() => {
        const eventosD = async () => {
            const res = await eventoOrganizacion(3, 0)
            setEventos(res)
        }

        const eventosT = async () => {
            const res = await eventoOrganizacion(100, 0)
            setEventosTabla(res)
        }

        eventosD()
        eventosT()
    }, [])

    const obtenerFoto = (evento) => {
        // if (evento?.fotos.length === 1) {
            return <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
                <img style={{ width: '50%', height: 'auto' }} src={`${evento?.fotos[0]}`} alt={`${evento.organizacion.nombre}`} /></div>
        // }
        // return <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
        //     <img src={`${evento?.fotos[0]}`} style={{ width: '50%', height: 'auto' }} />
        //     <img src={`${evento?.fotos[1]}`} style={{ width: '50%', height: 'auto' }} />
        // </div>
    }

    const [selectIdEvento, setSelectIdEvento] = useState(null)
    const [openEvento, setOpenEvento] = useState(false)

    const [eventos, setEventos] = useState(
        [
        ]
    )

    return (
        <div className="noticias" id="noticias">
            <div className="etiqueta">
                <h5>
                    Lo más reciente
                </h5>
            </div>
            <div className="noticias-subtitulo">
                <h2>Noticias y Eventos</h2>
            </div>
            <div className="contenedor-noticias">
                <div className="noticias-tarjetas-contenedor">
                    {
                        eventos.map(
                            evento =>
                                <div key={evento.id} className="noticias-tarjeta">
                                    <div className="s1">
                                        <img src={evento.organizacion.foto} />
                                        <h6>{evento.organizacion.nombre}</h6>
                                    </div>
                                    <div className="s2">
                                        <p>{evento.titulo}</p>
                                    </div>
                                    <div className="s3">

                                        {
                                            obtenerFoto(evento)
                                        }
                                    </div>
                                    <div className="s4">
                                        <button className="btn-accion-2"
                                            onClick={()=>{
                                                setOpenEvento(true);
                                                setSelectIdEvento(evento.id)
                                            }}
                                        >
                                            <strong>VER</strong>
                                        </button>
                                    </div>
                                </div>
                        )
                    }
                </div>
                <div className="boton-historicos">
                    <button className="boton-accion-historicos"

                        onClick={() => { setOpenHistorial(true) }}

                    >
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb2NrLWljb24gbHVjaWRlLWNsb2NrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiA2djZsNCAyIi8+PC9zdmc+" alt="historico" />
                    </button>
                </div>
            </div>

            {
                openHistorial && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div>
                                <button
                                    className="btn-accion-cancelar-1"
                                    style={{borderRadius:'100%', width:'40px', height:'40px'}}
                                    onClick={() => { setOpenHistorial(false) }}

                                >
                                    <strong>X</strong>
                                </button>
                            </div>
                            <div style={{ width: '90%', height: '80vh', maxHeight: '80vh', overflowY: 'scroll', backgroundColor: 'white'}}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: 'black', color: 'white' }}>
                                        <tr>
                                            <th>Titulo</th>
                                            <th>Descripcion</th>
                                            <th>Tipo</th>
                                            <th>Organizacion</th>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Fin</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            eventosTabla.map(
                                                eventoTabla => <tr>
                                                    <td>{eventoTabla.titulo}</td>
                                                    <td>{eventoTabla.descripcion}</td>
                                                    <td>{eventoTabla.tipo}</td>
                                                    <td>{eventoTabla.organizacion.nombre}</td>
                                                    <td>{eventoTabla.fecha_inicio.split('T')[0]}</td>
                                                    <td>{eventoTabla.fecha_final.split('T')[0]}</td>
                                                    <td>
                                                        {(() => {
                                                            const inicio = new Date(eventoTabla.fecha_inicio.split('T')[0]);
                                                            const final = new Date(eventoTabla.fecha_final.split('T')[0]);

                                                            return (ahora >= inicio && ahora <= final) ? (
                                                                <button className="btn-inscripcion">INSCRIBIRME</button>
                                                            ) : (
                                                                "No disponible"
                                                            );
                                                        })()}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                openEvento && (
                    <VisualizarEvento id_evento={selectIdEvento} accion={setOpenEvento}/>
                )
            }
        </div>

    )
}