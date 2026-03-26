import { useEffect, useState } from 'react'
import '../styles/hero.css'
import Objetivos from './Objetivos'
import Tour from './Tour'
import { getUsersCounts } from '../services/Usuario'
import { getOrganizacionesCounts } from '../services/Organizacion'
import { getConveniosCounts } from '../services/Convenio'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
    const titulo = 'TRANSFORMA TU FUTURO'
    const informacion = 'Plataforma que conecta estudiantes con residencias profesionales y empresas de la región.'

    const [openObjetivos, setOpenObjetivos] = useState(false)
    const [openTour, setOpenTour] = useState(false)

    const [countUsers, setCountUsers] = useState(0)
    const [countOrganizaciones, setCountOrganizaciones] = useState(0)
    const [countConvenios, setCountConvenios] = useState(0)

    const navigate = useNavigate()

    useEffect(()=>{
        const getUsersCount = async () => {
            const res = await getUsersCounts()
            setCountUsers(res)
        }

        const getOrganizacionesCount = async () => {
            const res = await getOrganizacionesCounts()
            setCountOrganizaciones(res)
        }

        const getConveniosCount = async () => {
            const res = await getConveniosCounts()
            setCountConvenios(res)
        }

        getUsersCount()
        getOrganizacionesCount()
        getConveniosCount()
    },[])

    return (
        <div className="hero" id='inicio'>
            <div className='informacion'>
                <h1>{titulo}</h1>
                <p>{informacion}</p>
            </div>

            <div className='botones-contenedor'>
                <button

                    onClick={(e) => { setOpenObjetivos(true) }}

                >OBJETIVOS</button>
                <button

                    onClick={() => { setOpenTour(true) }}

                >TOUR</button>
                <button
                
                    onClick={()=>{navigate('/login')}}

                >UNIRME</button>
            </div>

            <div className='hero-estadisticas-contenedor'>
                <div className='estadistica-li'>
                    <h6>{countUsers}</h6>
                    <p>Usuarios</p>
                </div>

                <div className='estadistica-li'>
                    <h6>{countOrganizaciones}</h6>
                    <p>Organizaciones</p>
                </div>

                <div className='estadistica-li'>
                    <h6>{countConvenios}</h6>
                    <p>Convenios</p>
                </div>
            </div>

            {
                openObjetivos && (
                    <Objetivos accion={setOpenObjetivos} />
                )
            }

            {
                openTour && (
                    <Tour accion={setOpenTour} />
                )
            }

        </div>
    )
}