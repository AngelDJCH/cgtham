import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import { findAllHistoricosEventos } from '../services/HistoricosEvento.js'
import { findAllHistoricosOferta } from "../services/historicosOferta.js";
import '../styles/historicos.css'

export default function Historicos() {

    const [eventos, setEventos] = useState([])
    const [ofertas, setOfertas] = useState([])

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
                    <h1>EVENTOS</h1>
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
                    <h1>OFERTAS LABORALES</h1>
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