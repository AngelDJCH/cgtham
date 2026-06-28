import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import { findAllHistoricosEventos } from '../services/HistoricosEvento.js'
import { findAllHistoricosOferta } from "../services/historicosOferta.js";
import '../styles/historicos.css'

export default function Historicos() {
    const imgFileDownloandPdf = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1maWxlLWRvd24taWNvbiBsdWNpZGUtZmlsZS1kb3duIj48cGF0aCBkPSJNNiAyMmEyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMmg4YTIuNCAyLjQgMCAwIDEgMS43MDQuNzA2bDMuNTg4IDMuNTg4QTIuNCAyLjQgMCAwIDEgMjAgOHYxMmEyIDIgMCAwIDEtMiAyeiIvPjxwYXRoIGQ9Ik0xNCAydjVhMSAxIDAgMCAwIDEgMWg1Ii8+PHBhdGggZD0iTTEyIDE4di02Ii8+PHBhdGggZD0ibTkgMTUgMyAzIDMtMyIvPjwvc3ZnPg=='
    const [eventos, setEventos] = useState([])
    const [ofertas, setOfertas] = useState([])

    const handleCreatePdf = (e)=>{
        e.preventDefault()
        alert('ACCIÓN NO DISPONIBLE')
    }

    useEffect(() => {
        const hEventos = async () => {
            const res = await findAllHistoricosEventos()
            setEventos(res)
        }

        const hOfertas = async () => {
            const res = await findAllHistoricosOferta()
            setOfertas(res)
        }

        hEventos()
        hOfertas()
    }, [])

    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Historicos' placeholder='Buscar por organizacion' opciones={['Mas recientes', 'Menos recientes']} accion='Crear historico' />
            <div className="contenedor-historicos">
                <div className="contenedor-historico">
                    <div className="subtitulo" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <h1>EVENTOS</h1>
                        <img src={imgFileDownloandPdf} onClick={handleCreatePdf} style={{ width: '24px', height: '24px', cursor:'pointer'}} />
                    </div>
                    <div className="tabla-historico">
                        <table>
                            <thead>
                                <tr>
                                    <th>Organizacion</th>
                                    <th>Titulo</th>
                                    <th>Accion</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventos?.map(
                                        evento => <tr>
                                            <td>{evento.organizacion}</td>
                                            <td>{evento.titulo}</td>
                                            <td>{evento.accion}</td>
                                            <td>{evento.fecha.split('T')[0]}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="contenedor-historico">
                    <div className="subtitulo" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <h1>OFERTAS LABORALES</h1>
                        <img src={imgFileDownloandPdf} onClick={handleCreatePdf} style={{ width: '24px', height: '24px', cursor:'pointer' }} />
                    </div>
                    <div className="tabla-historico">

                        <table >
                            <thead>
                                <tr>
                                    <th>Organizacion</th>
                                    <th>Titulo</th>
                                    <th>Accion</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ofertas.map(
                                        oferta => <tr>
                                            <td>{oferta.organizacion}</td>
                                            <td>{oferta.titulo}</td>
                                            <td>{oferta.accion}</td>
                                            <td>{oferta.fecha.split('T')[0]}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}