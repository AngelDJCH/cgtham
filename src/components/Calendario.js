import { Calendar, dayjsLocalizer } from "react-big-calendar"
import dayjs from "dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState, useCallback, useEffect } from 'react';
import { getAllEventos } from "../services/Evento";
import { eventoOrganizacion } from "../services/EventoOrganizacion";
import Loader from "./Loader";

import 'dayjs/locale/es';

dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

export default function Calendario(props) {

    const [loading, setLoading] = useState(false)

    const [events, setEvents] = useState([])

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

    useEffect(() => {
        setLoading(true)

        const eventos = async () => {
            let res = await eventoOrganizacion(100, 0)
            res = res?.map(r => {
                return {
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

    return (
        <>
            <select>
                <option>EVENTOS</option>
                <option>VISITAS</option>
                <option>CURSOS</option>
                <option>OFERTAS LABORALES</option>
                <option>CONVENIOS</option>
            </select>
            <Calendar
                date={date}
                view={view}
                events={events}
                messages={messagesEsp}
                onNavigate={onNavigate}
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
        </>
    )
}