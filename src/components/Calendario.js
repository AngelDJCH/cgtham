import { Calendar, dayjsLocalizer } from "react-big-calendar"
import dayjs from "dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

export default function Calendario() {
    return (
        <>
            <Calendar
                localizer={localizer}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </>
    )
}