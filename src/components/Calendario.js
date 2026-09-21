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
                return {
                    id: r.id,
                    title: r.titulo,
                    start: new Date(r.fecha_inicio),
                    end: new Date(r.fecha_final)
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
                    let res = await allVisitasByIdEscuela(user.organizacion)
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
                    let res = await allVisitasForAdministrador()
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
                    let res = await allVisitasByIdEmpresa(user.organizacion)
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
                    return {
                        id: r.id,
                        title: r.titulo,
                        start: new Date(r.fecha_inicio),
                        end: new Date(r.fecha_final)
                    }
                })
                setEvents(res)
                setLoading(false)
            }
            eventos()
        }else if(select === 'CURSOS'){
            const cursos = async () => {
                let res = await findToEmpresas()
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
                let res = await findAll()
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
                    let res = await getOfertasLaboralesByIdOrganizacion(user.organizacion)
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
                    let res = await getOfertasLaboralesAll()
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

    return (
        <>
            <div className="contenedor-input-select">
                <select className="input-select"
                    onChange={(e) => { setSelect(e.target.value) }}
                >
                    <option>EVENTOS</option>
                    <option>VISITAS</option>
                    <option>CURSOS</option>
                    <option>OFERTAS LABORALES</option>
                    <option>CONVENIOS</option>
                </select>
            </div>
            <Calendar
                onSelectEvent={handleOnSelectEvent}
                date={date}
                view={view}
                events={
                    select === 'EVENTOS' ? events :
                        select === 'VISITAS' ? visitas :
                            select === 'OFERTAS LABORALES' ? ofertasLaborales :
                                select === 'CURSOS' ? cursos : convenios
                }
                messages={messagesEsp}
                onNavigate={onNavigate}
                // selectable
                // onSelectSlot={alert('HAS SELECCIONADO')}
                views={onView}
                localizer={localizer}
                popup
                style={{
                    width: '100%',
                    height: '80%'
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', width: '100%' }}>
                <button className="btn-accion-cancelar-1"
                    onClick={() => { props.accion(false) }}
                ><strong>CERRAR</strong></button>
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
        </>
    )
}