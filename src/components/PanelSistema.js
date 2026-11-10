import { useEffect, useState } from "react";
import { getDashEventos, getEventosCounts } from "../services/Evento";
import { useMediaQuery } from "@uidotdev/usehooks";

import '../styles/panel.css';
import { getOfertasCounts } from "../services/OfertaLaboral";
import { getOrganizacionesCounts } from "../services/Organizacion";
import { useNavigate } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getConveniosCounts, getDashConvenios } from "../services/Convenio";
import { findAllComentariosByAdministrador } from "../services/Comentario";

export default function PanelSistema() {
    const isLargeDevice = useMediaQuery("(min-width: 992px)");
    const [countEventos, setCountEventos] = useState(0);
    const [countOfertas, setCountOfertas] = useState(0);
    const [countOrganizaciones, setCountOrganizaciones] = useState(0);
    const [dashComentarios, setDashComentarios] = useState([]);
    const [countConvenios, setCountConvenios] = useState(0);
    const COLORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    const [dashConvenios, setDashConvenios] = useState([]);
    const [dashEventos, setDashEventos] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = (rute, param) => {
        if (param) {
            navigate(`/${rute}/${param}`);
        } else {
            navigate(rute.startsWith('/') ? rute : `/${rute}`);
        }
    };

    useEffect(() => {
        const countE = async () => {
            const res = await getEventosCounts();
            setCountEventos(res || 0);
        };
        const countO = async () => {
            const res = await getOfertasCounts();
            setCountOfertas(res || 0);
        };
        const countOrg = async () => {
            const res = await getOrganizacionesCounts();
            setCountOrganizaciones(res || 0);
        };
        const coutCon = async () => {
            const res = await getConveniosCounts();
            setCountConvenios(res || 0);
        };
        const dashConvenios = async () => {
            const res = await getDashConvenios();
            if (Array.isArray(res)) {
                const datosLimpios = res.map(item => ({
                    ...item,
                    value: Number(item.value)
                }));
                setDashConvenios(datosLimpios);
            }
        };

        const dashEventos = async () => {
            const res = await getDashEventos();
            if (Array.isArray(res)) {
                const datosLimpios = res.map(item => ({
                    ...item,
                    value: Number(item.value)
                }));
                setDashEventos(datosLimpios);
            }
        };

        const dashComentariosAll = async () => {
            const res = await findAllComentariosByAdministrador(10, 0);
            if (Array.isArray(res)) {
                setDashComentarios(res);
            }
        };

        coutCon();
        countE();
        countO();
        countOrg();
        dashConvenios();
        dashComentariosAll();
        dashEventos();
    }, []);

    return (
        <div style={{
            width: '100%',
            maxWidth: '1100px',
            justifyContent: 'center',
            height: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            boxSizing: 'border-box'
        }}>
            <div style={{ display: 'flex', gap: '1.25rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div className="tarjeta-panel" style={{ width: '240px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.75rem 1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '18px', textAlign: 'center', color: '#41431B', margin: '0 0 0.5rem 0' }}>EVENTOS</h1>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWNsb2NrLWljb24gbHVjaWRlLWNhbGVuZGFyLWNsb2NrIj48cGF0aCBkPSJNMTYgMTR2Mi4ybDEuNiAxIi8+PHBhdGggZD0iTTE2IDJ2NCIvPjxwYXRoIGQ9Ik0yMSA3LjVWNmEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDMuNSIvPjxwYXRoIGQ9Ik0zIDEwaDUiLz48cGF0aCBkPSJNOCAydjQiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2Ii8+PC9zdmc+" alt="icono" style={{ width: '28px', height: '28px' }} />
                        <p style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, margin: 0, color: '#41431B' }}>{countEventos}</p>
                        <button onClick={() => { handleNavigate('eventos') }} className="btn-accion-2" style={{ padding: '0.35rem 0.85rem' }}><strong>Ir</strong></button>
                    </div>
                </div>

                <div className="tarjeta-panel" style={{ width: '240px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.75rem 1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '18px', textAlign: 'center', color: '#41431B', margin: '0 0 0.5rem 0' }}>OFERTAS L.</h1>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcy1pY29uIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MiPjxwYXRoIGQ9Ik0xMiAxMmguMDEiLz48cGF0aCBkPSJNMTYgNlY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTIyIDEzYTE4LjE1IDE4LjE1IDAgMCAxLTIwIDAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+" alt="icono" style={{ width: '28px', height: '28px' }} />
                        <p style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, margin: 0, color: '#41431B' }}>{countOfertas}</p>
                        <button onClick={() => { handleNavigate('ofertaslaborales') }} className="btn-accion-2" style={{ padding: '0.35rem 0.85rem' }}><strong>Ir</strong></button>
                    </div>
                </div>

                <div className="tarjeta-panel" style={{ width: '240px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.75rem 1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '18px', textAlign: 'center', color: '#41431B', margin: '0 0 0.5rem 0' }}>ORGANIZACIONES</h1>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJ1aWxkaW5nMi1pY29uIGx1Y2lkZS1idWlsZGluZy0yIj48cGF0aCBkPSJNMTAgMTJoNCIvPjxwYXRoIGQ9Ik00MCA4aDQiLz48cGF0aCBkPSJNMTQgMjF2LTNhMiAyIDAgMCAwLTQgMHYzIi8+PHBhdGggZD0iTTYgMTBINGEyIDIgMCAwIDAtMiAydjdhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjlhMiAyIDAgMCAwLTItMmgtMiIvPjxwYXRoIGQ9Ik02IDIxVjVhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ2MTYiLz48L3N2Zz4=" alt="icono" style={{ width: '28px', height: '28px' }} />
                        <p style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, margin: 0, color: '#41431B' }}>{countOrganizaciones}</p>
                        <button onClick={() => { handleNavigate('organizaciones') }} className="btn-accion-2" style={{ padding: '0.35rem 0.85rem' }}><strong>Ir</strong></button>
                    </div>
                </div>

                <div className="tarjeta-panel" style={{ width: '240px', backgroundColor: 'white', borderRadius: '10px', height: 'auto', padding: '0.75rem 1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '18px', textAlign: 'center', color: '#41431B', margin: '0 0 0.5rem 0' }}>CONVENIOS</h1>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYXJ0LWhhbmRzaGFrZS1pY29uIGx1Y2lkZS1oZWFydC1oYW5kc2hha2UiPjxwYXRoIGQ9Im0xMSAxNyAyIDJhMSAxIDAgMSAwIDMtMyIvPjxwYXRoIGQ9Im0xNCAxNCAyLjUgMi41YTEgMSAwIDEgMCAzLTNsLTMuODgtMy44OGEzIDMgMCAwIDAtNC4yNCAwbC0uODguODhhMSAxIDAgMSAxLTMtM2wyLjgxLTIuODFhNS43OSA1Ljc5IDAgMCAxIDcuMDYtLjg3bC40Ny4yOGEyIDIgMCAwIDAgMS40Mi4yNUwyMSA0Ii8+PHBhdGggZD0ibTIxIDMgMSAxMWgtMiIvPjxwYXRoIGQ9Ik0zIDMgMiAxNGw2LjUgNi41YTEgMSAwIDEgMCAzLTMiLz48cGF0aCBkPSJNMyA0aDgiLz48L3N2Zz4=" alt="icono" style={{ width: '28px', height: '28px' }} />
                        <p style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, margin: 0, color: '#41431B' }}>{countConvenios}</p>
                        <button onClick={() => { handleNavigate('convenios') }} className="btn-accion-2" style={{ padding: '0.35rem 0.85rem' }}><strong>Ir</strong></button>
                    </div>
                </div>
            </div>

            <div style={{
                flex: '1 1 580px',
                maxWidth: '640px',
                height: '320px',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                boxSizing: 'border-box'
            }}>
                <h6 style={{ margin: 0, color: '#41431B', fontFamily: 'Poppins', fontSize: '17px', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Convenios por sector
                </h6>
                <div style={{ width: '100%', height: 'calc(100% - 35px)' }}>
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

            <div style={{
                flex: '1 1 320px',
                maxWidth: '440px',
                height: '320px',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                boxSizing: 'border-box'
            }}>
                <h6 style={{ margin: 0, color: '#41431B', fontFamily: 'Poppins', fontSize: '17px', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Últimos comentarios
                </h6>
                <div style={{ width: '100%', height: 'calc(100% - 35px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                    {dashComentarios.length === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <p style={{ fontFamily: 'Poppins', fontSize: '13px', color: '#888' }}>No hay comentarios recientes</p>
                        </div>
                    ) : (
                        dashComentarios.map((comentario, index) => (
                            <div key={index} style={{ width: '100%', display: 'flex', padding: '0.6rem', backgroundColor: '#f5f5f5', borderRadius: '0.5rem', boxSizing: 'border-box' }}>
                                <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '8px' }}>
                                    <p style={{ textAlign: 'center', margin: 0, fontSize: '12px', fontFamily: 'Poppins', color: '#41431B' }}>
                                        <strong>{comentario.organizacion?.nombre || comentario.organizacion?.nombre_comercial || 'Organización'}</strong>
                                    </p>
                                </div>
                                <div style={{ width: '60%' }}>
                                    <p style={{ margin: 0, fontSize: '12px', fontFamily: 'Poppins', color: '#444' }}>
                                        {comentario.comentario?.contenido ? (comentario.comentario.contenido.length > 35 ? comentario.comentario.contenido.substring(0, 35) + '...' : comentario.comentario.contenido) : ''}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div style={{
                flex: '1 1 100%',
                maxWidth: '1100px',
                height: '340px',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                boxSizing: 'border-box'
            }}>
                <h6 style={{ margin: 0, color: '#41431B', fontFamily: 'Poppins', fontSize: '17px', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Eventos por año sin importar su estado
                </h6>
                <div style={{ width: '100%', height: 'calc(100% - 35px)' }}>
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
