import { useNavigate, useParams } from "react-router-dom";
import NavBarAutenticado from "../components/NavBarAutenticado";
import NavUser from "../components/NavUser";
import '../styles/editarperfil.css'
import '../styles/perfil.css'
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getPefil } from "../services/Usuario";
import { eventosByIdUsuario } from "../services/Evento";
import { getOfertasLaboralesByIdUsuario } from "../services/OfertaLaboral";

export default function Perfil(props) {

    const logo_tec = 'https://tse1.explicit.bing.net/th/id/OIP.52V6_zMnhndWqovqoDF_gQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'

    const { id } = useParams()

    const [perfil, setPerfil] = useState(null)

    const [editar, setEditar] = useState(false)

    const [eventos, setEventos] = useState([])

    const [experiencia, setExperiencia] = useState([])

    const { user } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const perfilAxios = async () => {
            const res = await getPefil(id)
            setPerfil(res)
        }

        const eventos = async () => {
            const res = await eventosByIdUsuario(id)
            setEventos(res)
        }

        const experiencias = async () => {
            const res = await getOfertasLaboralesByIdUsuario(id)
            setExperiencia(res)
        }

        eventos()
        experiencias()
        perfilAxios()
    }, [])

    return (
        <div style={{ marginTop: '100px', marginRight: '50px' }}>
            <NavBarAutenticado />
            <NavUser left='20px' />
            <div className="editar-perfil-contenedor">
                <div className='seccion1-contenedor'>

                    <div className='foto-perfil-contenedor'>
                        <img src={perfil?.foto} />
                    </div>

                    <div className='img-banner-contenedor'>
                        <img src={perfil?.banner} />
                    </div>
                    <div className='contenedor-informacion-botones'>
                        <div className='informacion-contenedor'>
                            <h1>{perfil?.nombre_completo}</h1>
                            <p

                                onClick={() => {
                                    navigate(`/organizacion/${perfil?.organizacion?.id}`)
                                }}

                                style={{ cursor: 'pointer' }}

                            >{perfil?.organizacion?.nombre_comercial}</p>
                        </div>

                        {
                            user.usuario.id != id && (
                                <div className='botones-accion-banner-contenedor'>
                                    <button className='boton-accion-banner'>
                                        <img src='' />
                                        <p>SEGUIR</p>
                                    </button>
                                    <button className='boton-accion-banner'>
                                        <img src='' />
                                        <p>MENSAJE</p>
                                    </button>
                                </div>
                            )
                        }

                        {
                            user.usuario.id === id && (
                                <div>
                                    <button

                                        onClick={(e) => {
                                            e.preventDefault()
                                            setEditar(true)
                                        }}

                                    >EDITAR</button>
                                </div>
                            )
                        }
                    </div>
                </div>

                {
                    user.usuario.id === id && editar && (
                        <div className='seccion2-contenedor'>
                            <div className='seccion2-interno-contenedor'>
                                <div className='tarjeta-datos'>
                                    <h1>Datos Personales</h1>
                                    <input placeholder='Nombre' type='text' />
                                    <input placeholder='Apellido Materno' type='text' />
                                    <input placeholder='Apellido Paterno' type='text' />
                                    <input placeholder='RFC' type='text' />
                                </div>
                                <div className='tarjeta-datos'>
                                    <h1>Datos de Ubicación</h1>
                                    <input placeholder='Calle' type='text' />
                                    <div className='t-d-s-m'>
                                        <input placeholder='Numero' type='number' style={{ width: '97px' }} />
                                        <input placeholder='Colonia' type='text' style={{ width: '97px' }} />
                                    </div>
                                    <div className='t-d-s-m'>
                                        <input placeholder='Ciudad' type='text' style={{ width: '133px' }} />
                                        <input placeholder='CP' type='number' style={{ width: '61px' }} />
                                    </div>
                                    <div className='t-d-s-m'>
                                        <input placeholder='Estado' type='text' style={{ width: '103px' }} />
                                        <input placeholder='Pais' type='text' style={{ width: '92px' }} />
                                    </div>
                                </div>

                                <div className='tarjeta-datos'>
                                    <h1>Datos de Contacto</h1>
                                    <input placeholder='Correo' type='mail' />
                                    <input placeholder='Telefono' type='phone' />
                                    <h1>Seguridad</h1>
                                    <input placeholder='Contrañeña' type='password' />
                                </div>
                            </div>
                            <button className='boton-guardar'>GUARDAR</button>
                            <button className='boton-guardar'

                                onClick={(e) => {
                                    e.preventDefault()
                                    setEditar(false)
                                }}

                            >CANCELAR</button>
                        </div>
                    )
                }

                <div className="contenedor-informacion-adicional">
                    <div className="contenedor-informacion-interna">

                        <div className="head-informacion-acional">
                            <h1>
                                EVENTOS
                            </h1>
                        </div>

                        <div className="cuerpo-informacion-adicional">
                            {
                                eventos.length === 0 ? <h1>SIN ASISTENCIA</h1> : eventos?.map(
                                    evento =>
                                        <div className="tarjeta-informacion-adicional">
                                            <div>
                                                <img src={evento.logo} />
                                            </div>
                                            <div className="tarjeta-informacion-cuerpo">
                                                <h1>{evento.titulo}</h1>
                                                <p>{evento.organizacion}</p>
                                            </div>
                                            <div className="tarjeta-informacion-fecha">
                                                <p><strong>{evento.fecha.split('T')[0]}</strong></p>
                                            </div>
                                        </div>
                                )
                            }

                        </div>

                    </div>

                    <div className="contenedor-informacion-interna">

                        <div className="head-informacion-acional">
                            <h1>
                                EXPERENCIA
                            </h1>
                        </div>

                        <div className="cuerpo-informacion-adicional">
                            {
                                experiencia.length === 0 ? <h1 style={{ textAlign: 'center' }}>SIN EXPERENCIA PREVIA</h1> : experiencia.map(
                                    e => <div className="tarjeta-informacion-adicional">
                                        <div>
                                            <img src={e.organizacion.logo} />
                                        </div>
                                        <div className="tarjeta-informacion-cuerpo">
                                            <h1>{e.empleo.titulo}</h1>
                                            <p

                                                onClick={() => {
                                                    navigate(`/organizacion/${e.organizacion.id}`)
                                                }}

                                            >{e.organizacion.nombre}</p>
                                        </div>
                                        <div className="tarjeta-informacion-fecha">
                                            <p><strong>{e.empleo.fecha}</strong></p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}