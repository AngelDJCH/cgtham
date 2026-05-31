import { useEffect, useState } from "react"
import { getDashEventos, getEventosCounts } from "../services/Evento"

import '../styles/panel.css'
import { getOfertasCounts } from "../services/OfertaLaboral"
import { getOrganizacionesCounts } from "../services/Organizacion"
import { useNavigate } from "react-router-dom"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getDashConvenios } from "../services/Convenio"
import { findAllComentariosByAdministrador } from "../services/Comentario"

export default function PanelSistema() {

    const [countEventos, setCountEventos] = useState(0)
    const [countOfertas, setCountOfertas] = useState(0)
    const [countOrganizaciones, setCountOrganizaciones] = useState(0)
    const [dashComentarios, setDashComentarios] = useState([])

    const COLORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    const [dashConvenios, setDashConvenios] = useState([])
    const [dashEventos, setDashEventos] = useState([])

    const navigate = useNavigate()

    const handleNavigate = (rute, param) => {
        if (param) {
            navigate(`/${rute}/${param}`)
        }
        navigate(rute)
    }

    useEffect(() => {
        const countE = async () => {
            const res = await getEventosCounts()
            setCountEventos(res)
        }

        const countO = async () => {
            const res = await getOfertasCounts()
            setCountOfertas(res)
        }

        const countOrg = async () => {
            const res = await getOrganizacionesCounts()
            setCountOrganizaciones(res)
        }

        const dashConvenios = async () => {
            const res = await getDashConvenios()
            const datosLimpios = res.map(item => ({
                ...item,
                value: Number(item.value)
            }));
            setDashConvenios(datosLimpios);
        }

        const dashEventos = async (params) => {
            const res = await getDashEventos()
            const datosLimpios = res.map(item => ({
                ...item,
                value: Number(item.value)
            }))
            setDashEventos(datosLimpios)
        }

        const dashComentariosAll = async () => {
            const res = await findAllComentariosByAdministrador()
            setDashComentarios(res)
        }

        countE()
        countO()
        countOrg()
        dashConvenios()
        dashComentariosAll()
        dashEventos()
    }, [])

    return (
        <div style={{ width: '90%', justifyContent: 'center', height: 'auto', paddingLeft: '2rem', paddingRight: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>

            <div className="tarjeta-panel" style={{ width: '250px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.15rem' }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '20px', textAlign: 'center' }}>EVENTOS</h1>
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWNsb2NrLWljb24gbHVjaWRlLWNhbGVuZGFyLWNsb2NrIj48cGF0aCBkPSJNMTYgMTR2Mi4ybDEuNiAxIi8+PHBhdGggZD0iTTE2IDJ2NCIvPjxwYXRoIGQ9Ik0yMSA3LjVWNmEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDMuNSIvPjxwYXRoIGQ9Ik0zIDEwaDUiLz48cGF0aCBkPSJNOCAydjQiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2Ii8+PC9zdmc+" alt="icono" />
                    <p>{countEventos}</p>
                    <button onClick={() => { handleNavigate('/eventos') }} className="btn-accion-2"><strong>Ir</strong></button>
                </div>
            </div>

            <div className="tarjeta-panel" style={{ width: '250px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.15rem' }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '20px', textAlign: 'center' }}>OFERTAS L.</h1>
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcy1pY29uIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MiPjxwYXRoIGQ9Ik0xMiAxMmguMDEiLz48cGF0aCBkPSJNMTYgNlY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTIyIDEzYTE4LjE1IDE4LjE1IDAgMCAxLTIwIDAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+" alt="icono" />
                    <p>{countOfertas}</p>
                    <button onClick={() => { handleNavigate('/ofertaslaborales') }} className="btn-accion-2"><strong>Ir</strong></button>
                </div>
            </div>

            <div className="tarjeta-panel" style={{ width: '250px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.15rem' }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '20px', textAlign: 'center' }}>ORGANIZACIONES</h1>
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJ1aWxkaW5nMi1pY29uIGx1Y2lkZS1idWlsZGluZy0yIj48cGF0aCBkPSJNMTAgMTJoNCIvPjxwYXRoIGQ9Ik00MCA4aDQiLz48cGF0aCBkPSJNMTQgMjF2LTNhMiAyIDAgMCAwLTQgMHYzIi8+PHBhdGggZD0iTTYgMTBINGEyIDIgMCAwIDAtMiAydjdhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjlhMiAyIDAgMCAwLTItMmgtMiIvPjxwYXRoIGQ9Ik02IDIxVjVhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ2MTYiLz48L3N2Zz4=" alt="icono" />
                    <p>{countOrganizaciones}</p>
                    <button onClick={() => { handleNavigate('/organizaciones') }} className="btn-accion-2"><strong>Ir</strong></button>
                </div>
            </div>

            <div className="tarjeta-panel" style={{ width: '250px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.15rem' }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '20px', textAlign: 'center' }}>CONVENIOS</h1>
                <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYXJ0LWhhbmRzaGFrZS1pY29uIGx1Y2lkZS1oZWFydC1oYW5kc2hha2UiPjxwYXRoIGQ9Ik0xOS40MTQgMTQuNDE0QzIxIDEyLjgyOCAyMiAxMS41IDIyIDkuNWE1LjUgNS41IDAgMCAwLTkuNTkxLTMuNjc2LjYuNiAwIDAgMS0uODE4LjAwMUE1LjUgNS41IDAgMCAwIDIgOS41YzAgMi4zIDEuNSA0IDMgNS41bDUuNTM1IDUuMzYyYTIgMiAwIDAgMCAyLjg3OS4wNTIgMi4xMiAyLjEyIDAgMCAwLS4wMDQtMyAyLjEyNCAyLjEyNCAwIDEgMCAzLTMgMi4xMjQgMi4xMjQgMCAwIDAgMy4wMDQgMCAyIDIgMCAwIDAgMC0yLjgyOGwtMS44ODEtMS44ODJhMi40MSAyLjQxIDAgMCAwLTMuNDA5IDBsLTEuNzEgMS43MWEyIDIgMCAwIDEtMi44MjggMCAyIDIgMCAwIDEgMC0yLjgyOGwyLjgyMy0yLjc2MiIvPjwvc3ZnPg==" alt="icono" />
                    <p>{countEventos}</p>
                    <button onClick={() => { handleNavigate('/convenios') }} className="btn-accion-2"><strong>Ir</strong></button>
                </div>
            </div>

            <div style={{ flex: '1 1 600px', maxWidth: '650px', height: '300px', backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}>
                <h6 style={{ margin: 0, color: '#41431B', fontFamily: 'Poppins', fontSize: '18px', marginBottom: '0.5rem' }}>
                    Convenios por sector
                </h6>
                <div style={{ width: '100%', height: 'calc(100% - 30px)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                nameKey="tipo"
                                startAngle={180}
                                endAngle={0}
                                data={dashConvenios}
                                cx="50%"
                                cy="100%"
                                outerRadius="100%"
                                label={({ tipo, value }) => `${tipo}(${value})`}
                                isAnimationActive={true}
                            >
                                {dashConvenios.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ flex: '1 1 300px', maxWidth: '350px', height: '300px', backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}>
                <h6 style={{ margin: 0, color: '#41431B', fontFamily: 'Poppins', fontSize: '18px', marginBottom: '0.5rem' }}>
                    Últimos comentarios
                </h6>
                <div style={{ width: '100%', height: 'calc(100% - 30px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                    {dashComentarios.map((comentario, index) => (
                        <div key={index} style={{ width: '95%', display: 'flex', padding: '0.5rem', backgroundColor: '#e9e9e9', borderRadius: '0.5rem', boxSizing: 'border-box' }}>
                            <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '5px' }}>
                                <p style={{ textAlign: 'center', margin: 0, fontSize: '13px' }}><strong>{comentario.organizacion.nombre}</strong></p>
                            </div>
                            <div style={{ width: '60%' }}>
                                <p style={{ margin: 0, fontSize: '13px' }}>{comentario.comentario.contenido}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ flex: '1 1 100%', maxWidth: '1010px', height: '320px', backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxSizing: 'border-box' }}>
                <h6 style={{ margin: 0, color: '#41431B', fontFamily: 'Poppins', fontSize: '18px', marginBottom: '0.5rem' }}>
                    Eventos por año sin importar su estado
                </h6>
                <div style={{ width: '100%', height: 'calc(100% - 30px)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={dashEventos}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="año" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}