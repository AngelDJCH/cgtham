import NavBarAutenticado from "../components/NavBarAutenticado";
import NavUser from "../components/NavUser";
import '../styles/editarperfil.css'
import '../styles/perfil.css'

export default function Perfil(props) {

    const logo_tec = 'https://tse1.explicit.bing.net/th/id/OIP.52V6_zMnhndWqovqoDF_gQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'


    return (
        <div style={{ marginTop: '100px', marginRight: '50px' }}>
            <NavBarAutenticado />
            <NavUser left='20px' />
            <div className="editar-perfil-contenedor">
                <div className='seccion1-contenedor'>

                    <div className='foto-perfil-contenedor'>
                        <img src='https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    </div>

                    <div className='img-banner-contenedor'>
                        <img src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    </div>
                    <div className='contenedor-informacion-botones'>
                        <div className='informacion-contenedor'>
                            <h1>Jose Ramiro Velazquez</h1>
                            <p>Instituto Tecnologico de Orizaba</p>
                        </div>

                        {
                            props?.propietario === false && (
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
                    </div>
                </div>
                {
                    props?.propietario === true && (
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
                        </div>
                    )
                }
                {

                }

                <div className="contenedor-informacion-adicional">
                    <div className="contenedor-informacion-interna">

                        <div className="head-informacion-acional">
                            <h1>
                                EVENTOS
                            </h1>
                        </div>

                        <div className="cuerpo-informacion-adicional">

                            <div className="tarjeta-informacion-adicional">
                                <div>
                                    <img src={logo_tec} />
                                </div>
                                <div className="tarjeta-informacion-cuerpo">
                                    <h1>Dia del Programador</h1>
                                    <p>Instituto Tecnologico de Orizaba</p>
                                </div>
                                <div className="tarjeta-informacion-fecha">
                                    <p><strong>13/09/2026</strong></p>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className="contenedor-informacion-interna">

                        <div className="head-informacion-acional">
                            <h1>
                                EXPERENCIA
                            </h1>
                        </div>

                        <div className="cuerpo-informacion-adicional">

                            <div className="tarjeta-informacion-adicional">
                                <div>
                                    <img src={logo_tec} />
                                </div>
                                <div className="tarjeta-informacion-cuerpo">
                                    <h1>Becario en Ingenieria y Tecnologia</h1>
                                    <p>Teteocan Technologies</p>
                                </div>
                                <div className="tarjeta-informacion-fecha">
                                    <p><strong>18/08/2025</strong></p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}