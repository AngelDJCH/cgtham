import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../styles/autenticacion.css'
import { useEffect, useRef, useState } from "react";
import { createCuenta, login } from "../services/Cuenta";
import { useAuth } from "../hooks/useAuth";
import { createOrganizaion, getAllOrganizaciones } from "../services/Organizacion";
import { axiosInstance } from "../services/Axios";
import { createUsuario } from "../services/Usuario";
import { createContacto } from "../services/Contacto";
import { createDireccion } from "../services/Direccion";
import { createCloudinary } from "../services/Cloudinary";
import { createEmpresa } from "../services/Empresa";
import { createCamara } from "../services/Camara";
import { createEscuela } from "../services/Escuela";
import { uploadImg } from "../services/Upload";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function AutenticacionPage() {

    const [sectores, setSectores] = useState([
        {
            id: 1,
            nombre: 'Industria y Manufactura',
            tipo: 'Empresa',
            giros: [
                { id: 1, nombre: 'Automotriz (Manufactura de componentes)' },
                { id: 2, nombre: 'Industrial (Destilación de alcohol)' },
                { id: 3, nombre: 'Minero e industrial' },
                { id: 4, nombre: 'Materiales de construcción (Cementera)' },
                { id: 5, nombre: 'Manufactura de productos de consumo' },
                { id: 6, nombre: 'Alimentario (Procesamiento de cárnicos)' },
                { id: 7, nombre: 'Industrial y de infraestructura' },
                { id: 8, nombre: 'Siderúrgico (Producción de acero)' }
            ]
        },
        {
            id: 2,
            nombre: 'Logística, Transporte y Distribución',
            tipo: 'Empresa',
            giros: [
                { id: 1, nombre: 'Transporte de carga y logística' }
            ]
        },
        {
            id: 3,
            nombre: 'Comercio y Servicios al Cliente',
            tipo: 'Empresa',
            giros: [
                { id: 1, nombre: 'Comercializadora de insumos' },
                { id: 2, nombre: 'Comercial (Retail/Tienda departamental)' },
                { id: 3, nombre: 'Servicios (Administración de centros comerciales)' }
            ]
        },
        {
            id: 4,
            nombre: 'Comunicación, Medios y Publicidad',
            tipo: 'Empresa',
            giros: [
                { id: 1, nombre: 'Telecomunicaciones y medios de comunicación' }
            ]
        },
        {
            id: 5,
            nombre: 'Educación y Formación Técnica',
            tipo: 'Escuela',
            giros: [
                { id: 1, nombre: 'Educación media superior tecnológica' },
                { id: 2, nombre: 'Formación técnica para el trabajo' },
                { id: 3, nombre: 'Educación técnica bachiller' },
                { id: 4, nombre: 'Educación general y formación integral' },
                { id: 5, nombre: 'Educación superior tecnológica (Ingenierías)' },
                { id: 6, nombre: 'Educación superior tecnológica rural y regional' }
            ]
        },
        {
            id: 6,
            nombre: 'Gestión Empresarial y Vinculación',
            tipo: 'Cámara de Comercio',
            giros: [
                { id: 1, nombre: 'Representación gremial del comercio y turismo' },
                { id: 2, nombre: 'Representación gremial de la industria de transformación' },
                { id: 3, nombre: 'Representación gremial del sector restaurantero' }
            ]
        }
    ]);

    const [selectTipo, setSelectTipo] = useState('')
    const [selectSector, setSelectSector] = useState('')
    const [selectGiro, setSelectGiro] = useState('')

    const { autenticacion } = useParams()

    const navigate = useNavigate()

    const imagen = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    const [openLogin, setOpenLogin] = useState(false)

    const [openRegister, setOpenRegister] = useState(false)

    const [organizaciones, setOrganizaciones] = useState([])

    const isSmallDevice = useMediaQuery('(max-width:768px)');

    const [datosPersonales, setDatosPersonales] = useState({
        nombre: '',
        descripcion: '',
        apellido_materno: '',
        rfc: '',
        tamaño: ''
    })
    const [datosUbicacion, setDatosUbicacion] = useState({
        calle: '',
        numero: '',
        colonia: '',
        codigo_postal: '',
        ciudad: '',
        estado: '',
        pais: ''
    })
    const [datosContacto, setDatosContacto] = useState({
        correo: '',
        telefono: ''
    })
    const [datosSeguridad, setDatosSeguridad] = useState({
        contrasenia: ''
    })
    const [datosCloudinary, setDatosCloudinary] = useState(
        {
            cloud_name: '',
            api_key: '',
            api_secret: ''
        }
    )

    const [organizacionId, setOrganizacionId] = useState(null)

    const [openRegisterOrg, setOpenRegisterOrg] = useState(false)

    const [openDatosPersonales, setOpenDatosPersonales] = useState(true)
    const [openDatosUbicacion, setOpenDatosUbicacion] = useState(true)
    const [openDatosContacto, setOpenDatosContacto] = useState(true)
    const [openDatosSeguridad, setOpenDatosSeguridad] = useState(true)


    const [correoLogin, setCorreoLogin] = useState('')
    const [contraseniaLogin, setContraseniaLogin] = useState('')
    const [banner, setBanner] = useState(null)
    const [foto, setFoto] = useState(null)
    const { setUser } = useAuth()

    const [archivoBanner, setArchivoBanner] = useState(null);
    const [archivoFoto, setArchivoFoto] = useState(null);

    const [empresa, setEmpresa] = useState({
        razon_social: '',
        regimen_fiscal: '',
        direccion_fiscal: ''
    })
    const [escuela, setEscuela] = useState({
        tipo: '',
        url: ''
    })
    const [camara, setCamara] = useState({
        nombre: '',
        presidente: ''
    })

    const postCuenta = async (correo, contrasenia) => {
        try {
            const res = await login(correo, contrasenia)
            setUser(res.data)
            res.status === 200 ? navigate('/home') : <div></div>
        } catch (error) {
            alert('CREDENCIALES INCORRECTAS')
        }
    }


    const handleNextData = () => {
        if (openDatosPersonales) {
            setOpenDatosPersonales(false)
            setOpenDatosUbicacion(true)
        } else if (openDatosUbicacion) {
            setOpenDatosUbicacion(false)
            setOpenDatosContacto(true)
            setOpenDatosSeguridad(true)
        } else {
            setOpenDatosContacto(false)
            setOpenDatosSeguridad(false)
            setOpenDatosPersonales(true)
        }
    }

    const handleChangeBanner = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            var reader = new FileReader()
            reader.onloadend = function () {
                setArchivoBanner(reader.result)
            }
            reader.readAsDataURL(archivo)
            setBanner(URL.createObjectURL(archivo)); // Solo para la vista previa
        }
    };

    const handleChangeFoto = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            var reader = new FileReader()

            reader.onloadend = function () {
                setArchivoFoto(reader.result)
            }
            reader.readAsDataURL(archivo)
            setFoto(URL.createObjectURL(archivo)); // Solo para la vista previa
        }
    };

    const handeCreateOrganizacion = async () => {
        try {
            const logoUrl = await uploadImg(archivoFoto)
            const bannerUrl = await uploadImg(archivoBanner)

            const contactoApi = await createContacto(datosContacto.correo, datosContacto.telefono)
            const direccionApi = await createDireccion(datosUbicacion.calle, datosUbicacion.numero, datosUbicacion.colonia,
                datosUbicacion.codigo_postal, datosUbicacion.ciudad, datosUbicacion.estado, datosUbicacion.pais
            )
            const organizacionAPI = await createOrganizaion(datosPersonales.nombre, datosPersonales.descripcion, selectTipo, selectSector,
                datosPersonales.tamaño, selectGiro, datosPersonales.rfc, logoUrl, bannerUrl, contactoApi?.id, direccionApi?.id
            )

            const cloudinariApi = await createCloudinary(datosCloudinary.cloud_name, datosCloudinary.api_key, datosCloudinary.api_secret, organizacionAPI?.id)

            let empresaApi = null;
            let escuelaApi = null;
            let camaraApi = null;
            if (selectTipo === 'Empresa') {
                empresaApi = createEmpresa(organizacionAPI?.id, empresa.razon_social, empresa.regimen_fiscal, empresa.direccion_fiscal)
            } else if (selectTipo === 'Escuela') {
                escuelaApi = createEscuela(organizacionAPI?.id, escuela.tipo, escuela.url)
            } else {
                camaraApi = createCamara(organizacionAPI?.id, camara.nombre, camara.presidente)
            }

            const cuentaApi = await createCuenta(datosContacto.correo, datosSeguridad.contrasenia, ['ADMIN_ORG'], organizacionAPI?.id)

            if (cuentaApi.status === 201 && contactoApi && direccionApi && organizacionAPI && cloudinariApi || (empresaApi || escuelaApi || camaraApi)) {
                alert('ORGANIZACION CREADA')
            }
        } catch (error) {
            alert('Ocurrio un error al intentar registrar una organizacion')
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

    useEffect(() => {
        const organizacionesData = async () => {
            const res = await getAllOrganizaciones()
            setOrganizaciones(res)
        }

        organizacionesData()
    }, [])

    return (
        <div className="autenticacion" style={{ height: openRegisterOrg ? 'auto' : null }}>
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
                                <input placeholder="Correo electronico" required type="email" onChange={(e) => { setCorreoLogin(e.target.value) }} />
                                <input placeholder="Contraseña" required type="password" onChange={(e) => { setContraseniaLogin(e.target.value) }} />
                            </div>
                            <div className="a-registros">
                                <p

                                    style={{ cursor: 'pointer' }}

                                    onClick={() => { setOpenLogin(false); setOpenRegisterOrg(true) }}

                                >¿No tienes cuenta? Haz clic para registrarte</p>
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
                                    }}
                                >Ingresar</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {

                openRegisterOrg && (
                    <div className="contenedor-autenticacion" style={{ flexDirection: 'column', height: 'auto', flexWrap:'wrap' }}>
                        <div className="contenedor-seccion1">


                            <input type="file" accept=".png"
                                id="upload-banner"
                                onChange={handleChangeBanner}
                                style={{ display: 'none' }}
                            />
                            {
                                !banner && (
                                    <label
                                        htmlFor="upload-banner"
                                    >
                                        <img src="https://plus.unsplash.com/premium_photo-1772877094825-2908e6cfd259?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                    </label>
                                )
                            }
                            {
                                banner && (
                                    <label
                                        htmlFor="upload-banner"
                                    >
                                        <img
                                            src={banner} />
                                    </label>
                                )
                            }
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flexWrap:'wrap', justifyContent:'center', alignItems:'center', width:'100%' }}>

                            <div className="contenedor-seccion2" style={{flexWrap:'wrap'}}>
                                <div style={{ width: isSmallDevice ? '100%' : '20%', display: 'flex', justifyContent: 'center', marginTop: '1rem', flexWrap:'wrap' }}>
                                    <input type="file" accept=".png"
                                        id="upload-foto"
                                        style={{ display: 'none' }}
                                        onChange={handleChangeFoto}
                                    />

                                    {
                                        foto === null && (
                                            <label
                                                htmlFor="upload-foto"
                                            >
                                                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLXVwLWljb24gbHVjaWRlLWltYWdlLXVwIj48cGF0aCBkPSJNMTAuMyAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDE0YTIgMiAwIDAgMSAyIDJ2MTBsLTMuMS0zLjFhMiAyIDAgMCAwLTIuODE0LjAxNEw2IDIxIi8+PHBhdGggZD0ibTE0IDE5LjUgMy0zIDMgMyIvPjxwYXRoIGQ9Ik0xNyAyMnYtNS41Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz48L3N2Zz4=" />
                                            </label>
                                        )
                                    }
                                    {
                                        foto && (
                                            <label
                                                htmlFor="upload-foto"
                                            >
                                                <img src={foto}
                                                    alt="foto" />
                                            </label>
                                        )
                                    }
                                </div>
                                <div style={{ width: isSmallDevice ? '100%' : '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap:'wrap' }}>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: isSmallDevice ? 'center':'space-around', alignItems:isSmallDevice?'center':'', marginTop: '2rem', flexWrap: 'wrap', flexDirection:isSmallDevice?'column':'row' }}>
                                        <div className="datos">
                                            <h1>Datos Organización</h1>
                                            <div className="contenedor-input">
                                                <input id="r_nombre" placeholder="Nombre comercial" onChange={(e) => { setDatosPersonales({ ...datosPersonales, nombre: e.target.value }) }} type="text" />
                                                <input id="r_apellido_paterno" placeholder="Descripcion" onChange={(e) => { setDatosPersonales({ ...datosPersonales, descripcion: e.target.value }) }} type="text" />
                                                <input id="r_rfc" placeholder="RFC" onChange={(e) => { setDatosPersonales({ ...datosPersonales, rfc: e.target.value }) }} />
                                                <select onChange={(e) => setSelectTipo(e.target.value)}>
                                                    <option selected>
                                                        TIPO
                                                    </option>
                                                    <option>
                                                        Escuela
                                                    </option>
                                                    <option>
                                                        Empresa
                                                    </option>
                                                    <option>
                                                        Cámara de Comercio
                                                    </option>
                                                </select>
                                                <select onChange={(e) => setSelectSector(e.target.value)}>
                                                    <option selected>
                                                        SECTOR
                                                    </option>
                                                    {
                                                        selectTipo != 'TIPO' && sectores.filter(seleccionado => seleccionado.tipo === selectTipo).map(
                                                            s => <option key={s.id}>
                                                                {s.nombre}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                                <select onChange={(e) => { setSelectGiro(e.target.value) }}>
                                                    <option>
                                                        GIRO
                                                    </option>
                                                    {
                                                        selectTipo && selectSector && sectores.filter(
                                                            s => s.tipo === selectTipo && s.nombre === selectSector
                                                        ).map(
                                                            s => {
                                                                const giros = s.giros
                                                                return giros.map(
                                                                    g => <option>{g.nombre}</option>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </select>
                                                <input placeholder="Tamaño" type="number" onChange={(e) => { setDatosPersonales({ ...datosPersonales, tamaño: e.target.value }) }} />
                                                {
                                                    selectTipo === 'Empresa' && (
                                                        <div className="datos">
                                                            <input placeholder="Razón social" onChange={(e) => { setEmpresa({ ...empresa, razon_social: e.target.value }) }} />
                                                            <input placeholder="Regimen fiscal" onChange={(e) => { setEmpresa({ ...empresa, regimen_fiscal: e.target.value }) }} />
                                                            <input placeholder="Dirección fiscal" onChange={(e) => { setEmpresa({ ...empresa, direccion_fiscal: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    selectTipo === 'Escuela' && (
                                                        <div className="datos">
                                                            <select onChange={(e) => { setEscuela({ ...escuela, tipo: e.target.value }) }}>
                                                                <option>TIPO</option>
                                                                <option>Publica</option>
                                                                <option>Privada</option>
                                                            </select>
                                                            <input placeholder="Sitio web" onChange={(e) => { setEscuela({ ...escuela, url: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    selectTipo === 'Cámara de Comercio' && (
                                                        <div className="datos">
                                                            <input placeholder="Nombre" onChange={(e) => { setCamara({ ...camara, nombre: e.target.value }) }} />
                                                            <input placeholder="Presidente" onChange={(e) => { setCamara({ ...camara, presidente: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="datos">
                                            <h1>Datos Ubicación</h1>
                                            <div className="contenedor-input">
                                                <input placeholder="Calle" onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, calle: e.target.value }) }} type="text" />
                                                <div className="contenedor-input-doble">
                                                    <input id="r_numero" placeholder="Numero" style={{ width: '80px' }} onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, numero: e.target.value }) }} type="number" />
                                                    <input id="r_colonia" placeholder="Colonia" style={{ width: '100px' }} onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, colonia: e.target.value }) }} type="text" />
                                                </div>
                                                <div className="contenedor-input-doble">
                                                    <input id="r_ciudad" placeholder="Ciudad" style={{ width: '110px' }} onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, ciudad: e.target.value }) }} type="text" />
                                                    <input id="r_cp" placeholder="CP" style={{ width: '70px' }} onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, codigo_postal: e.target.value }) }} type="number" />
                                                </div>
                                                <div className="contenedor-input-doble">
                                                    <input id="r_estado" placeholder="Estado" style={{ width: '85px' }} onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, estado: e.target.value }) }} type="text" />
                                                    <input id="r_pais" placeholder="Pais" style={{ width: '90px' }} onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, pais: e.target.value }) }} type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div className="datos">
                                                <h1>Datos Contacto</h1>
                                                <div className="contenedor-input">
                                                    <input id="r_correo" placeholder="Correo" onChange={(e) => { setDatosContacto({ ...datosContacto, correo: e.target.value }) }} type="email" />
                                                    <input id="r_telefono" placeholder="Telefono" onChange={(e) => { setDatosContacto({ ...datosContacto, telefono: e.target.value }) }} type="text" />
                                                </div>
                                            </div>
                                            <div className="datos">
                                                <h1>Datos Seguridad</h1>
                                                <input id="r_contrasenia" placeholder="Contraseña" onChange={(e) => { setDatosSeguridad({ ...datosSeguridad, contrasenia: e.target.value }) }} type="password" />
                                            </div>
                                        </div>
                                        <div className="datos" style={{width:'200px'}}>
                                            <h1>Cloudinary</h1>
                                            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
                                                <input placeholder="CLOUD NAME" type="text" onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, cloud_name: e.target.value }) }} />
                                                <input placeholder="API KEY" type="password" onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, api_key: e.target.value }) }} />
                                                <input placeholder="API SECRET" type="password" onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, api_secret: e.target.value }) }} />
                                            </div>
                                            <p
                                                style={{ fontSize: '11px' }}
                                            >Esta informacion se obtiene del sitio: <a href="https://cloudinary.com/">CLOUDINARY</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor-botones-accion" style={{display:'flex', flexDirection:isSmallDevice ? 'column' : 'row'}}>
                                    <button className="btn-regresar"
                                        onClick={() => { navigate(-1) }}
                                    >
                                        REGRESAR
                                    </button>
                                    <button className="btn-limpiar">
                                        LIMPIAR
                                    </button>
                                    <button className="btn2"
                                        onClick={() => {
                                            handeCreateOrganizacion()
                                        }}
                                    >
                                        REGISTRARME
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }
        </div>
    )
}