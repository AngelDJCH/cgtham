import { useEffect, useState } from 'react'
import '../styles/hero.css'
import Objetivos from './Objetivos'
import Tour from './Tour'
import { getUsersCounts } from '../services/Usuario'
import { getOrganizacionesCounts } from '../services/Organizacion'
import { getConveniosCounts } from '../services/Convenio'
import { useNavigate } from 'react-router-dom'
import { getOfertasCounts } from '../services/OfertaLaboral'
import { useMediaQuery } from '@uidotdev/usehooks'

export default function Hero() {
    const titulo = 'TRANSFORMA EL FUTURO'
    const informacion = 'Plataforma que conecta a empresas de la región de las altas montañas.'
    const isSmallDevice = useMediaQuery('(max-width:768px)');

    const [openObjetivos, setOpenObjetivos] = useState(false)
    const [openTour, setOpenTour] = useState(false)

    const [countEmpleos, setCountEmpleos] = useState(0)
    const [countOrganizaciones, setCountOrganizaciones] = useState(0)
    const [countConvenios, setCountConvenios] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const getUsersCount = async () => {
            const res = await getOfertasCounts()
            setCountEmpleos(res)
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
    }, [])

    return (
        <div className="hero" id='inicio' style={{paddingTop:isSmallDevice?'100px':'', height:isSmallDevice?'auto':''}}>
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

                    onClick={() => { navigate('/login') }}

                >UNIRME</button>
            </div>

            <div className='hero-estadisticas-contenedor'>
                <div className='estadistica-li'>
                    <h6>{countEmpleos}</h6>
                    <p>Empleos</p>
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