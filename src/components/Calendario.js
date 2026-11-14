import { Calendar, dayjsLocalizer } from "react-big-calendar"
import dayjs from "dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState, useCallback, useEffect } from 'react';
import { eventoOrganizacion } from "../services/EventoOrganizacion";
import Loader from "./Loader";

import '../styles/calendario.css'

import 'dayjs/locale/es';
import VisualizarEvento from "./VisualizarEvento";
import { useAuth } from "../hooks/useAuth";
import { allVisitasByIdEmpresa, allVisitasByIdEscuela, allVisitasForAdministrador } from "../services/Visita";
import VisualizarVisita from "./VisualizarVisita";
import { findToEmpresas } from "../services/Curso";
import { findAll } from "../services/ConvenioOrganizacion";
import { getOfertasLaboralesAll, getOfertasLaboralesByIdOrganizacion } from "../services/OfertaLaboral";
import VisualizarConvenio from "./VisualizarConvenio";
import VisualizarOferta from "./VisualizarOferta";
import VisualizarCurso from "./VisualizarCurso";

dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

export default function Calendario(props) {

    const [loading, setLoading] = useState(false)

    const [events, setEvents] = useState([])
    const [visitas, setVisitas] = useState([])
    const [ofertasLaborales, setOfertasLaborales] = useState([])
    const [cursos, setCursos] = useState([])
    const [convenios, setConvenios] = useState([])

    const messagesEsp = {
        allDay: 'Todo el día',
        previous: 'Anterior',
        next: 'Siguiente',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango.',
        showMore: (total) => `+ Ver más (${total})`,
    };

    const [select, setSelect] = useState('EVENTOS')

    const handleGetVisitas = async () => {

    }

    const handleGetCursos = async () => {

    }

    const handleGetOfertasLaborares = async () => {

    }

    const handleGetEventos = async () => {

    }

    useEffect(() => {
        setLoading(true)
        const eventos = async () => {
            let res = await eventoOrganizacion(100, 0)
            res = res?.map(r => {
                const fechaIniStr = r.fecha_inicio ? r.fecha_inicio.split('T')[0] : '';
                const horaIniStr = r.hora_inicio ? r.hora_inicio.slice(0, 5) : '09:00';
                const fechaFinStr = r.fecha_final ? r.fecha_final.split('T')[0] : '';
                const horaFinStr = r.hora_final ? r.hora_final.slice(0, 5) : '18:00';
                return {
                    id: r.id,
                    title: r.titulo,
                    start: fechaIniStr ? new Date(`${fechaIniStr}T${horaIniStr}:00`) : new Date(r.fecha_inicio),
                    end: fechaFinStr ? new Date(`${fechaFinStr}T${horaFinStr}:00`) : new Date(r.fecha_final)
                }
            })
            setEvents(res)
            setLoading(false)
        }
        eventos()
    }, [])

    const [date, setDate] = useState(new Date())
    const [view, setView] = useState('month')

    const onNavigate = useCallback((newDate) => { setDate(newDate) }, [setDate])
    const onView = useCallback((newView) => { setView(newView) }, [setView])

    const [openEvento, setOpenEvento] = useState(false)
    const [openVisita, setOpenVisita] = useState(false)
    const [openCurso, setOpenCurso] = useState(false)
    const [openConvenio, setOpenConvenio] = useState(false)
    const [openOfertaLaboral, setOpenOfertaLaboral] = useState(false)

    const [idEvento, setIdEvento] = useState('')
    const [idVisita, setIdVisita] = useState('')
    const [idCurso, setIdCurso] = useState('')
    const [idConvenio, setIdConvenio] = useState('')
    const [idOfertaLaboral, setIdOfertaLaboral] = useState('')

    const handleOnSelectEvent = (s) => {
        if (select === 'EVENTOS') {
            setIdEvento(s.id)
            setOpenEvento(!openEvento)
        } else if (select === 'VISITAS') {
            setIdVisita(s.id)
            setOpenVisita(true)
        } else if (select === 'CURSOS') {
            setIdCurso(s.id)
            setOpenCurso(!openCurso)
        } else if (select === 'CONVENIOS') {
            setIdConvenio(s.id)
            setOpenConvenio(!openConvenio)
        } else {
            setIdOfertaLaboral(s.id)
            setOpenOfertaLaboral(!openOfertaLaboral)
        }
    }

    const { user } = useAuth()

    useEffect(() => {
        setLoading(true)

        if (select === 'VISITAS') {
            if (user.tipo === 'Escuela') {
                const visitas = async () => {
                    let res = await allVisitasByIdEscuela(user.organizacion,100,0)
                    res = res?.filter(e => e.estado === 'APROBADA').map(r => {
                        return {
                            id: r.id,
                            title: `${r.empresa.nombre}`,
                            start: new Date(r.agendado),
                            end: new Date(r.agendado)
                        }
                    })
                    setVisitas(res)
                    setLoading(false)
                }
                visitas()
            } else if (user.tipo === 'Comité') {
                const visitas = async () => {
                    let res = await allVisitasForAdministrador(100,0)
                    res = res?.map(r => {
                        return {
                            id: r.id,
                            title: `${r.empresa} - ${r.escuela}`,
                            start: new Date(r.fecha_visita),
                            end: new Date(r.fecha_visita)
                        }
                    })
                    setVisitas(res)
                    setLoading(false)
                }
                visitas()
            } else {
                const visitas = async () => {
                    let res = await allVisitasByIdEmpresa(user.organizacion,100,0)
                    res = res?.filter(e => e.estado === 'APROBADA').map(r => {
                        return {
                            id: r.id,
                            title: `${r.escuela.nombre}`,
                            start: new Date(r.agendado),
                            end: new Date(r.agendado)
                        }
                    })
                    setVisitas(res)
                    setLoading(false)
                }
                visitas()
            }
        } else if (select === 'EVENTOS') {
            const eventos = async () => {
                let res = await eventoOrganizacion(100, 0)
                res = res?.map(r => {
                    const fechaIniStr = r.fecha_inicio ? r.fecha_inicio.split('T')[0] : '';
                    const horaIniStr = r.hora_inicio ? r.hora_inicio.slice(0, 5) : '09:00';
                    const fechaFinStr = r.fecha_final ? r.fecha_final.split('T')[0] : '';
                    const horaFinStr = r.hora_final ? r.hora_final.slice(0, 5) : '18:00';
                    return {
                        id: r.id,
                        title: r.titulo,
                        start: fechaIniStr ? new Date(`${fechaIniStr}T${horaIniStr}:00`) : new Date(r.fecha_inicio),
                        end: fechaFinStr ? new Date(`${fechaFinStr}T${horaFinStr}:00`) : new Date(r.fecha_final)
                    }
                })
                setEvents(res)
                setLoading(false)
            }
            eventos()
        }else if(select === 'CURSOS'){
            const cursos = async () => {
                let res = await findToEmpresas(100,0)
                res = res?.map(r=>{
                    return{
                        id : r.id,
                        title : r.titulo,
                        start : new Date(r.inicio),
                        end : new Date(r.final)
                    }
                })
                setCursos(res)
                setLoading(false)
            }
            cursos()
        }else if(select === 'CONVENIOS'){
            const convenios = async () => {
                let res = await findAll(100,0)
                res = res?.map(r=>{
                    return{
                        id : r.id,
                        title : r.titulo,
                        start : new Date(r.inicio),
                        end : new Date(r.final)
                    }
                })
                setConvenios(res)
                setLoading(false)
            }
            convenios()
        }else{
            const ofertasLaborales = async()=>{
                if(user.tipo === 'Empresa' || user.tipo === 'Cámara de Comercio'){
                    let res = await getOfertasLaboralesByIdOrganizacion(user.organizacion,100,0)
                    res = res?.map(r=>{
                        return{
                            id : r.id,
                            title : r.titulo,
                            start : new Date(r.fecha_publicacion),
                            end : new Date(r.fecha_publicacion)
                        }
                    })
                    setOfertasLaborales(res)
                }else{
                    let res = await getOfertasLaboralesAll(100,0)
                    res = res?.map(r=>{
                        return{
                            id : r.id,
                            title : r.titulo,
                            start : new Date(r.fecha_publicacion),
                            end : new Date(r.fecha_publicacion)
                        }
                    })
                    setOfertasLaborales(res)
                }
                setLoading(false)
            }
            ofertasLaborales()
        }
    }, [select])

    const getEstilosCategoria = (tipo) => {
        switch (tipo) {
            case 'EVENTOS':
                return {
                    solido: '#41431B',
                    fondo: 'rgba(65, 67, 27, 0.12)',
                    borde: 'rgba(65, 67, 27, 0.35)',
                    texto: '#2B2D11'
                };
            case 'VISITAS':
                return {
                    solido: '#385A64',
                    fondo: 'rgba(56, 90, 100, 0.12)',
                    borde: 'rgba(56, 90, 100, 0.35)',
                    texto: '#1B3037'
                };
            case 'CURSOS':
                return {
                    solido: '#936639',
                    fondo: 'rgba(147, 102, 57, 0.12)',
                    borde: 'rgba(147, 102, 57, 0.35)',
                    texto: '#4A2E14'
                };
            case 'OFERTAS LABORALES':
                return {
                    solido: '#2D5A27',
                    fondo: 'rgba(45, 90, 39, 0.12)',
                    borde: 'rgba(45, 90, 39, 0.35)',
                    texto: '#173612'
                };
            case 'CONVENIOS':
                return {
                    solido: '#603854',
                    fondo: 'rgba(96, 56, 84, 0.12)',
                    borde: 'rgba(96, 56, 84, 0.35)',
                    texto: '#3A1932'
                };
            default:
                return {
                    solido: '#41431B',
                    fondo: 'rgba(65, 67, 27, 0.12)',
                    borde: 'rgba(65, 67, 27, 0.35)',
                    texto: '#2B2D11'
                };
        }
    };

    const getCategoriaColor = (tipo) => getEstilosCategoria(tipo).solido;

    const getCategoriaNombre = (tipo) => {
        switch (tipo) {
            case 'EVENTOS': return 'Eventos';
            case 'VISITAS': return 'Visitas Agendadas';
            case 'CURSOS': return 'Cursos y Capacitaciones';
            case 'OFERTAS LABORALES': return 'Ofertas Laborales';
            case 'CONVENIOS': return 'Convenios Institucionales';
            default: return tipo;
        }
    };

    const getEventosActuales = () => {
        switch (select) {
            case 'EVENTOS': return events || [];
            case 'VISITAS': return visitas || [];
            case 'CURSOS': return cursos || [];
            case 'OFERTAS LABORALES': return ofertasLaborales || [];
            case 'CONVENIOS': return convenios || [];
            default: return [];
        }
    };

    const eventPropGetter = (event) => {
        const est = getEstilosCategoria(select);
        return {
            style: {
                backgroundColor: est.fondo,
                borderTop: `1px solid ${est.borde}`,
                borderBottom: `1px solid ${est.borde}`,
                borderRight: `1px solid ${est.borde}`,
                borderLeft: `4px solid ${est.solido}`,
                borderRadius: '6px',
                color: est.texto,
                display: 'block',
                fontWeight: 600,
                fontSize: '11.5px',
                padding: '2px 8px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }
        };
    };

    const CustomEvent = ({ event }) => {
        const est = getEstilosCategoria(select);
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', height: '100%' }}>
                <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: est.solido,
                    flexShrink: 0
                }}></span>
                <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                    lineHeight: 1.3
                }}>
                    {event.title}
                </span>
            </div>
        );
    };

    return (
        <div className="calendario-card">
            {/* Cabecera Institucional Unificada */}
            <div className="calendario-header">
                <div className="calendario-header-info">
                    <span className="calendario-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        AGENDA INSTITUCIONAL
                    </span>
                    <h2 className="calendario-titulo">Calendario de Actividades</h2>
                </div>

                <div className="calendario-header-acciones">
                    <div className="calendario-filtro-box">
                        <label htmlFor="calendario-select-tipo" className="calendario-filtro-label">Categoría:</label>
                        <select
                            id="calendario-select-tipo"
                            className="calendario-select-institucional"
                            value={select}
                            onChange={(e) => { setSelect(e.target.value) }}
                        >
                            <option value="EVENTOS">Eventos</option>
                            <option value="VISITAS">Visitas</option>
                            <option value="CURSOS">Cursos</option>
                            <option value="OFERTAS LABORALES">Ofertas Laborales</option>
                            <option value="CONVENIOS">Convenios</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        className="calendario-btn-cerrar-x"
                        onClick={() => { props.accion(false) }}
                        title="Cerrar calendario"
                    >
                        &times;
                    </button>
                </div>
            </div>

            {/* Cuerpo del Calendario */}
            <div className="calendario-body">
                <Calendar
                    onSelectEvent={handleOnSelectEvent}
                    date={date}
                    view={view}
                    events={getEventosActuales()}
                    messages={messagesEsp}
                    onNavigate={onNavigate}
                    onView={onView}
                    views={['month', 'week', 'day', 'agenda']}
                    localizer={localizer}
                    popup
                    className="calendario-big-calendar"
                    eventPropGetter={eventPropGetter}
                    components={{
                        event: CustomEvent
                    }}
                />
            </div>

            {/* Pie de Página Institucional */}
            <div className="calendario-footer">
                <div className="calendario-footer-resumen">
                    <span
                        className="calendario-indicador-punto"
                        style={{ backgroundColor: getCategoriaColor(select) }}
                    ></span>
                    <span className="calendario-footer-texto">
                        Mostrando: <strong>{getCategoriaNombre(select)}</strong> ({getEventosActuales().length} {getEventosActuales().length === 1 ? 'registro' : 'registros'})
                    </span>
                </div>
                <button
                    type="button"
                    className="calendario-btn-cerrar"
                    onClick={() => { props.accion(false) }}
                >
                    CERRAR
                </button>
            </div>

            {
                loading && (<Loader />)
            }

            {
                openEvento && (
                    <VisualizarEvento id_evento={idEvento} accion={setOpenEvento} />
                )
            }

            {
                openVisita && (
                    <VisualizarVisita idVisita={idVisita} accion={setOpenVisita}/>
                )
            }

            {
                openCurso && (
                    <VisualizarCurso id_curso={idCurso} accion={setOpenCurso}/>
                )
            }

            {
                openConvenio && (
                    <VisualizarConvenio id_convenio={idConvenio} accion={setOpenConvenio}/>
                )
            }

            {
                openOfertaLaboral && (
                    <VisualizarOferta id_oferta={idOfertaLaboral} accion={setOpenOfertaLaboral}/>
                )
            }
        </div>
    )
}