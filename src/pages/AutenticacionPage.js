import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../styles/autenticacion.css'
import { useEffect, useState } from "react";
import { login } from "../services/Cuenta";

export default function AutenticacionPage() {

    const { autenticacion } = useParams()

    const navigate = useNavigate()

    const imagen = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    const [openLogin, setOpenLogin] = useState(false)

    const [openRegister, setOpenRegister] = useState(false)

    const [openRegisterOrg, setOpenRegisterOrg] = useState(false)

    const [openDatosPersonales, setOpenDatosPersonales] = useState(false)
    const [openDatosUbicacion, setOpenDatosUbicacion] = useState(false)
    const [openDatosContacto, setOpenDatosContacto] = useState(false)
    const [openDatosSeguridad, setOpenDatosSeguridad] = useState(false)

    const [correoLogin, setCorreoLogin] = useState('')
    const [contraseniaLogin, setContraseniaLogin] = useState('')

    const postCuenta =  async(correo, contrasenia) => {
        try {
            const res = await login(correo, contrasenia)
            console.log(res)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (autenticacion === 'login') {
            setOpenLogin(true)
        }

        if (autenticacion === 'register') {
            setOpenRegister(true)
        }

        if (autenticacion === 'register_org') {
            setOpenRegisterOrg(true)
        }
    }, [])

    return (
        <div className="autenticacion">
            <NavBar opcionesNav={false} />
            {
                openLogin && (
                    <div className="contenedor-autenticacion">
                        <div className="autenticacion-seccion1">
                            <img src={imagen} alt="imagen" />
                        </div>
                        <div className="autenticacion-seccion2">
                            <div className="a-titulo">
                                <h1>LOGIN</h1>
                            </div>
                            <div className="a-inputs">
                                <input placeholder="Correo electronico" required type="email" onChange={(e)=>{setCorreoLogin(e.target.value)}}/>
                                <input placeholder="Contraseña" required type="password" onChange={(e)=>{setContraseniaLogin(e.target.value)}}/>
                            </div>
                            <div className="a-registros">
                                <p

                                    style={{ cursor: 'pointer' }}

                                    onClick={() => { setOpenLogin(false); setOpenRegister(true) }}

                                >¿No tienes cuenta? Haz clic para registrarte</p>
                                <p

                                    style={{ cursor: 'pointer' }}

                                    onClick={() => { setOpenLogin(false); setOpenRegisterOrg(true) }}

                                >Registrar organización</p>
                            </div>
                            <div className="a-botones">
                                <button
                                    className="btn1"
                                    onClick={(e) => { navigate(-1) }}

                                >Regresar</button>
                                <button
                                    className="btn2"
                                    onClick={(e) => { 
                                        
                                        postCuenta(correoLogin, contraseniaLogin);

                                        navigate('/home');

                                     }}
                                >Ingresar</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {

                openRegister && (
                    <div className="contenedor-autenticacion">
                        <div>
                            <div className="contenedor-seccion1">
                                <input type="file" accept=".png" />
                                <img src="" />
                            </div>
                            <div className="contenedor-seccion2">
                                <div>
                                    <input type="file" accept=".png" />
                                    <img src="" />
                                </div>
                                <div className="contenedor-seccion2-1">
                                    {
                                        openDatosPersonales && (
                                            <div>
                                                <h1>Datos Personales</h1>
                                                <input type="text" placeholder="Nombre" required />
                                                <input type="text" placeholder="Apellido Paterno" required />
                                                <input type="text" placeholder="Apellido Materno" required />
                                                <input type="text" placeholder="RFC" required />
                                            </div>
                                        )
                                    }
                                    {
                                        openDatosUbicacion && (
                                            <div>
                                                <h1>Datos de Ubicación</h1>
                                                <input type="text" placeholder="Calle" required />
                                                <div>
                                                    <input type="number" placeholder="Numero" required />
                                                    <input type="text" placeholder="Colonia" required />
                                                </div>
                                                <div>
                                                    <input type="text" placeholder="Ciudad" required />
                                                    <input type="number" placeholder="CP" required />
                                                </div>
                                                <div>
                                                    <input type="text" placeholder="Estado" required />
                                                    <input type="text" placeholder="Pais" required />
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        openDatosContacto && openDatosSeguridad && (
                                            <div>
                                                <h1>Datos de Contacto</h1>
                                                <input type="email" placeholder="Correo" required />
                                                <input type="text" placeholder="Telefono" required />
                                                <h1>Seguridad</h1>
                                                <input type="password" placeholder="Contraseña" required />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }

            {

                openRegisterOrg && (
                    <div className="contenedor-autenticacion">
                    </div>
                )

            }
        </div>
    )
}