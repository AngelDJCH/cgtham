import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../styles/autenticacion.css'
import { useEffect, useRef, useState } from "react";
import { createCuenta, login } from "../services/Cuenta";
import { useAuth } from "../hooks/useAuth";
import { createOrganizaion, deleteOrganizacionById, getAllOrganizaciones } from "../services/Organizacion";
import { createContacto, deleteContactoById } from "../services/Contacto";
import { createDireccion, deleteDireccionById } from "../services/Direccion";
import { createCloudinary } from "../services/Cloudinary";
import { createEmpresa } from "../services/Empresa";
import { createCamara } from "../services/Camara";
import { createEscuela } from "../services/Escuela";
import { uploadImg } from "../services/Upload";
import { useMediaQuery } from "@uidotdev/usehooks";
import Loader from '../components/Loader'
import AlertaValidacion, { FORMATOS_IMAGEN, EXTENSIONES_IMAGEN, TAMANIO_MAX_IMAGEN_MB } from '../components/AlertaValidacion'
import ModalAlerta from '../components/ModalAlerta'
import imageCompression from 'browser-image-compression'

export default function AutenticacionPage() {
    const [openCambiarContraseña, setOpenCambiarContraseña] = useState(false)
    const [openAlertaCambiarContraseña, setOpenAlertaCambiarContraseña] = useState(false)
    const [alerta, setAlerta] = useState({
        abierto: false,
        tipo: 'info',
        titulo: '',
        mensaje: '',
        onAceptar: null
    })

    const mostrarAlerta = (mensaje, tipo = 'advertencia', titulo = '', onAceptar = null) => {
        setAlerta({
            abierto: true,
            tipo,
            titulo: titulo || (tipo === 'error' ? 'Atención' : tipo === 'exito' ? '¡Éxito!' : 'Aviso'),
            mensaje,
            onAceptar
        })
    }

    const cerrarAlerta = () => {
        const callback = alerta.onAceptar
        setAlerta({
            abierto: false,
            tipo: 'info',
            titulo: '',
            mensaje: '',
            onAceptar: null
        })
        if (callback) callback()
    }

    const imgLogoDefault = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLXVwLWljb24gbHVjaWRlLWltYWdlLXVwIj48cGF0aCBkPSJNMTAuMyAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDE0YTIgMiAwIDAgMSAyIDJ2MTBsLTMuMS0zLjFhMiAyIDAgMCAwLTIuODE0LjAxNEw2IDIxIi8+PHBhdGggZD0ibTE0IDE5LjUgMy0zIDMgMyIvPjxwYXRoIGQ9Ik0xNyAyMnYtNS41Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz48L3N2Zz4="
    const imgBannerDefault = "https://plus.unsplash.com/premium_photo-1772877094825-2908e6cfd259?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            mostrarAlerta('El correo electrónico o la contraseña son incorrectos.', 'error', 'Error de Autenticación')
            setOpenCambiarContraseña(true)
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
    const [erroresValidacion, setErroresValidacion] = useState([])

    const validarImagen = (archivo, nombreCampo, idCampo) => {
        if (!FORMATOS_IMAGEN.includes(archivo.type)) {
            return { id: idCampo, seccion: 'Imágenes', campo: nombreCampo, mensaje: `El archivo "${archivo.name}" no es válido. Formatos admitidos: ${EXTENSIONES_IMAGEN}.` }
        }
        if (archivo.size > TAMANIO_MAX_IMAGEN_MB * 1024 * 1024) {
            return { id: idCampo, seccion: 'Imágenes', campo: nombreCampo, mensaje: `La imagen pesa ${(archivo.size / 1024 / 1024).toFixed(1)} MB. El máximo permitido es ${TAMANIO_MAX_IMAGEN_MB} MB.` }
        }
        return null
    }

    const imagenInvalida = (e, archivo, nombreCampo, idCampo) => {
        const error = validarImagen(archivo, nombreCampo, idCampo)
        if (error) {
            e.target.value = ''
            setErroresValidacion([error])
            return true
        }
        document.getElementById(idCampo)?.classList.remove('campo-error')
        return false
    }

    const handleChangeBanner = async (e) => {
        const archivoSeleccionado = e.target.files[0];
        if (!archivoSeleccionado) return;
        if (imagenInvalida(e, archivoSeleccionado, 'Banner', 'contenedor-banner')) return;
        try {
            let fileToProcess = archivoSeleccionado;
            try {
                fileToProcess = await imageCompression(archivoSeleccionado, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1600,
                    useWebWorker: true
                });
            } catch (errComp) {
                console.warn("Compresión no aplicada en banner de registro:", errComp);
            }
            const base64 = await imageCompression.getDataUrlFromFile(fileToProcess);
            setArchivoBanner(base64);
            setBanner(base64);
        } catch (error) {
            console.error("Error al procesar banner:", error);
        }
    };

    const handleChangeFoto = async (e) => {
        const archivoSeleccionado = e.target.files[0];
        if (!archivoSeleccionado) return;
        if (imagenInvalida(e, archivoSeleccionado, 'Logo', 'contenedor-logo')) return;
        try {
            let fileToProcess = archivoSeleccionado;
            try {
                fileToProcess = await imageCompression(archivoSeleccionado, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 800,
                    useWebWorker: true
                });
            } catch (errComp) {
                console.warn("Compresión no aplicada en logo de registro:", errComp);
            }
            const base64 = await imageCompression.getDataUrlFromFile(fileToProcess);
            setArchivoFoto(base64);
            setFoto(base64);
        } catch (error) {
            console.error("Error al procesar logo:", error);
        }
    };
    const deleteRegister = async ({ contacto, direccion, organizacion }) => {
        let resOrg = null
        if (organizacion) resOrg = await deleteOrganizacionById(organizacion.id)
        if (resOrg != 204 && contacto) await deleteContactoById(contacto.id)
        if (resOrg != 204 && direccion) await deleteDireccionById(direccion.id)
        return
    }
    const validarFormulario = () => {
        const errores = []
        const agregar = (id, seccion, campo, mensaje) => errores.push({ id, seccion, campo, mensaje })
        const vacio = (valor) => !valor || String(valor).trim() === ''
        const sinSeleccion = (valor, placeholder) => vacio(valor) || valor === placeholder

        if (!archivoFoto) agregar('contenedor-logo', 'Imágenes', 'Logo', `Selecciona una imagen PNG (${EXTENSIONES_IMAGEN}) para el logo.`)
        if (!archivoBanner) agregar('contenedor-banner', 'Imágenes', 'Banner', `Selecciona una imagen PNG (${EXTENSIONES_IMAGEN}) para el banner (parte superior).`)

        const nombre = datosPersonales.nombre.trim()
        if (nombre.length < 5 || nombre.length > 254) agregar('r_nombre', 'Datos Organización', 'Nombre comercial', 'Debe tener entre 5 y 254 caracteres.')
        if (vacio(datosPersonales.descripcion)) agregar('r_descripcion', 'Datos Organización', 'Descripción', 'Este campo es obligatorio.')
        const rfc = datosPersonales.rfc.trim()
        if (rfc.length < 12 || rfc.length > 13) agregar('r_rfc', 'Datos Organización', 'RFC', 'Debe tener 12 caracteres (persona moral) o 13 (persona física).')
        if (sinSeleccion(selectTipo, 'TIPO')) agregar('r_tipo_org', 'Datos Organización', 'Tipo', 'Selecciona si eres Escuela, Empresa o Cámara de Comercio.')
        if (sinSeleccion(selectSector, 'SECTOR')) agregar('r_sector_org', 'Datos Organización', 'Sector', 'Selecciona un sector.')
        if (sinSeleccion(selectGiro, 'GIRO')) agregar('r_giro_org', 'Datos Organización', 'Giro', 'Selecciona un giro.')
        const tamanio = Number(datosPersonales.tamaño)
        if (!Number.isInteger(tamanio) || tamanio < 1) agregar('r_tamaño', 'Datos Organización', 'Tamaño', 'Debe ser un número entero mayor o igual a 1.')

        if (selectTipo === 'Empresa') {
            if (vacio(empresa.razon_social)) agregar('r_razon_social', 'Datos Organización', 'Razón social', 'Este campo es obligatorio.')
            if (vacio(empresa.regimen_fiscal)) agregar('r_regimen_fiscal', 'Datos Organización', 'Régimen fiscal', 'Este campo es obligatorio.')
            if (vacio(empresa.direccion_fiscal)) agregar('r_direccion_fiscal', 'Datos Organización', 'Dirección fiscal', 'Este campo es obligatorio.')
        } else if (selectTipo === 'Escuela') {
            if (sinSeleccion(escuela.tipo, 'TIPO')) agregar('r_tipo_escuela', 'Datos Organización', 'Tipo de escuela', 'Selecciona Pública o Privada.')
            if (vacio(escuela.url)) agregar('r_sitio', 'Datos Organización', 'Sitio web', 'Este campo es obligatorio.')
        } else if (selectTipo === 'Cámara de Comercio') {
            if (vacio(camara.nombre)) agregar('r_nombre_camara', 'Datos Organización', 'Nombre de la cámara', 'Este campo es obligatorio.')
            if (vacio(camara.presidente)) agregar('r_presidente', 'Datos Organización', 'Presidente', 'Este campo es obligatorio.')
        }

        if (vacio(datosUbicacion.calle)) agregar('r_calle', 'Datos Ubicación', 'Calle', 'Este campo es obligatorio.')
        if (vacio(datosUbicacion.numero)) agregar('r_numero', 'Datos Ubicación', 'Número', 'Este campo es obligatorio.')
        if (vacio(datosUbicacion.ciudad)) agregar('r_ciudad', 'Datos Ubicación', 'Ciudad', 'Este campo es obligatorio.')
        if (vacio(datosUbicacion.codigo_postal)) agregar('r_cp', 'Datos Ubicación', 'Código postal', 'Este campo es obligatorio.')
        if (vacio(datosUbicacion.estado)) agregar('r_estado', 'Datos Ubicación', 'Estado', 'Este campo es obligatorio.')
        if (vacio(datosUbicacion.pais)) agregar('r_pais', 'Datos Ubicación', 'País', 'Este campo es obligatorio.')

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosContacto.correo.trim())) agregar('r_correo', 'Datos Contacto', 'Correo', 'Escribe un correo válido (ejemplo: nombre@dominio.com).')
        if (vacio(datosContacto.telefono)) agregar('r_telefono', 'Datos Contacto', 'Teléfono', 'Este campo es obligatorio.')

        if (vacio(datosSeguridad.contrasenia)) agregar('r_contrasenia', 'Datos Seguridad', 'Contraseña', 'Este campo es obligatorio.')

        if (vacio(datosCloudinary.cloud_name)) agregar('cloud_name', 'Cloudinary', 'Cloud name', 'Este campo es obligatorio.')
        if (vacio(datosCloudinary.api_key)) agregar('api_key', 'Cloudinary', 'API key', 'Este campo es obligatorio.')
        if (vacio(datosCloudinary.api_secret)) agregar('api_secret', 'Cloudinary', 'API secret', 'Este campo es obligatorio.')

        return errores
    }

    const handleAceptarValidacion = () => {
        const errores = erroresValidacion
        setErroresValidacion([])
        errores.forEach(({ id }) => {
            const elemento = document.getElementById(id)
            if (!elemento) return
            elemento.classList.add('campo-error')
            const quitar = () => elemento.classList.remove('campo-error')
            elemento.addEventListener('input', quitar, { once: true })
            elemento.addEventListener('change', quitar, { once: true })
        })
        const primero = errores.length ? document.getElementById(errores[0].id) : null
        if (primero) {
            primero.scrollIntoView({ behavior: 'smooth', block: 'center' })
            if (typeof primero.focus === 'function') primero.focus({ preventScroll: true })
        }
    }

    const [loading, setLoading] = useState(false)
    const handeCreateOrganizacion = async () => {
        const errores = validarFormulario()
        if (errores.length > 0) {
            setErroresValidacion(errores)
            return
        }
        setLoading(true)
        try {
            const logoUrl = await uploadImg(archivoFoto)
            if (logoUrl === null) {
                setErroresValidacion([{ id: 'contenedor-logo', seccion: 'Imágenes', campo: 'Logo', mensaje: 'El servidor no pudo subir el logo. Verifica que sea PNG y que tu conexión funcione.' }])
                return
            }
            const bannerUrl = await uploadImg(archivoBanner)
            if (bannerUrl === null) {
                setErroresValidacion([{ id: 'contenedor-banner', seccion: 'Imágenes', campo: 'Banner', mensaje: 'El servidor no pudo subir el banner. Verifica que sea PNG y que tu conexión funcione.' }])
                return
            }
            const contactoApi = await createContacto(datosContacto.correo, datosContacto.telefono)
            if (contactoApi === null) {
                setErroresValidacion([{ id: 'r_correo', seccion: 'Datos Contacto', campo: 'Correo / Teléfono', mensaje: 'El servidor rechazó los datos de contacto. Revisa que el correo sea válido.' }])
                return
            }
            const direccionApi = await createDireccion(datosUbicacion.calle, datosUbicacion.numero, datosUbicacion.colonia,
                datosUbicacion.codigo_postal, datosUbicacion.ciudad, datosUbicacion.estado, datosUbicacion.pais
            )
            if (direccionApi === null) deleteRegister({ contacto: contactoApi, direccion: null, organizacion: null })
            const organizacionAPI = await createOrganizaion(datosPersonales.nombre, datosPersonales.descripcion, selectTipo, selectSector,
                datosPersonales.tamaño, selectGiro, datosPersonales.rfc, logoUrl, bannerUrl, contactoApi?.id, direccionApi?.id
            )
            if (organizacionAPI === null) deleteRegister({ contacto: contactoApi, direccion: direccionApi, organizacion: null })

            const cloudinariApi = await createCloudinary(datosCloudinary.cloud_name, datosCloudinary.api_key, datosCloudinary.api_secret, organizacionAPI?.id)
            if (cloudinariApi === null) deleteRegister({ contacto: contactoApi, direccion: direccionApi, organizacion: organizacionAPI })
            let empresaApi = null;
            let escuelaApi = null;
            let camaraApi = null;
            if (selectTipo === 'Empresa') {
                empresaApi = await createEmpresa(organizacionAPI?.id, empresa.razon_social, empresa.regimen_fiscal, empresa.direccion_fiscal)
                if (empresaApi === null) deleteRegister({ contacto: contactoApi, direccion: direccionApi, organizacion: organizacionAPI })
            } else if (selectTipo === 'Escuela') {
                escuelaApi = await createEscuela(organizacionAPI?.id, escuela.tipo, escuela.url)
                if (escuelaApi === null) deleteRegister({ contacto: contactoApi, direccion: direccionApi, organizacion: organizacionAPI })
            } else {
                camaraApi = await createCamara(organizacionAPI?.id, camara.nombre, camara.presidente)
                if (camaraApi === null) deleteRegister({ contacto: contactoApi, direccion: direccionApi, organizacion: organizacionAPI })
            }
            const cuentaApi = await createCuenta(datosContacto.correo, datosSeguridad.contrasenia, organizacionAPI?.id)
            if (cuentaApi === null) deleteRegister({ contacto: contactoApi, direccion: direccionApi, organizacion: organizacionAPI })
            if (cuentaApi.status === 201 && contactoApi && direccionApi && organizacionAPI && cloudinariApi || (empresaApi || escuelaApi || camaraApi)) {
                mostrarAlerta('¡Organización registrada exitosamente!', 'exito', '¡Registro Exitoso!', () => { navigate(0); })
                setLoading(false)
                navigate(0)
            }
        } catch (error) {
            mostrarAlerta('Ocurrió un error al intentar registrar la organización. Por favor verifica los datos ingresados.', 'error')
            setLoading(false)
            navigate(0)
        } finally {
         setLoading(false)
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
        <div className="autenticacion" style={{ height: openRegisterOrg ? 'auto' : null, paddingBottom: '2rem' }}>
            <NavBar opcionesNav={false} />
            {
                erroresValidacion.length > 0 && (
                    <AlertaValidacion errores={erroresValidacion} onAceptar={handleAceptarValidacion} />
                )
            }
            {
                loading && (
                    <Loader />
                )
            }
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
                            {
                                openCambiarContraseña && (
                                    <div className="a-registros">
                                        <p

                                            style={{ cursor: 'pointer', color: 'red' }}

                                            onClick={() => {
                                                //setOpenAlertaCambiarContraseña(true)
                                                mostrarAlerta('Esta función aún no se encuentra disponible.', 'info')
                                            }}
                                        >Recuperar contraseña</p>
                                    </div>
                                )
                            }
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
                    <div className="contenedor-autenticacion" style={{ flexDirection: 'column', height: 'auto', flexWrap: 'wrap' }}>
                        <div className="contenedor-seccion1" id="contenedor-banner" title={`Banner: solo PNG (${EXTENSIONES_IMAGEN}), máx. ${TAMANIO_MAX_IMAGEN_MB} MB`}>
                            <input type="file" accept="image/*"
                                id="upload-banner"
                                onChange={handleChangeBanner}
                                style={{ display: 'none' }}
                            />
                            {
                                !banner && (
                                    <label
                                        htmlFor="upload-banner"
                                    >
                                        <img src={imgBannerDefault} />
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
                        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <div className="contenedor-seccion2" style={{ flexWrap: 'wrap' }}>
                                <div id="contenedor-logo" style={{ width: isSmallDevice ? '100%' : '20%', display: 'flex', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                                    <p className="texto-formato-imagen" style={{ order: 2 }}>
                                        Logo y banner: Formatos {EXTENSIONES_IMAGEN}
                                    </p>
                                    <input type="file" accept="image/*"
                                        id="upload-foto"
                                        style={{ display: 'none' }}
                                        onChange={handleChangeFoto}
                                    />
                                    {
                                        foto === null && (
                                            <label
                                                htmlFor="upload-foto"
                                            >
                                                <img src={imgLogoDefault} />
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
                                <div style={{ width: isSmallDevice ? '100%' : '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: isSmallDevice ? 'center' : 'space-around', alignItems: isSmallDevice ? 'center' : '', marginTop: '2rem', flexWrap: 'wrap', flexDirection: isSmallDevice ? 'column' : 'row' }}>
                                        <div className="datos">
                                            <h1>Datos Organización</h1>
                                            <div className="contenedor-input">
                                                <input id="r_nombre" placeholder="Nombre comercial" onChange={(e) => { setDatosPersonales({ ...datosPersonales, nombre: e.target.value }) }} type="text" />
                                                <input id="r_descripcion" placeholder="Descripcion" onChange={(e) => { setDatosPersonales({ ...datosPersonales, descripcion: e.target.value }) }} type="text" />
                                                <input id="r_rfc" placeholder="RFC" onChange={(e) => { setDatosPersonales({ ...datosPersonales, rfc: e.target.value }) }} />
                                                <select id="r_tipo_org" onChange={(e) => setSelectTipo(e.target.value)}>
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
                                                <select id="r_sector_org" onChange={(e) => setSelectSector(e.target.value)}>
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
                                                <select id="r_giro_org" onChange={(e) => { setSelectGiro(e.target.value) }}>
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
                                                <input id="r_tamaño" placeholder="Tamaño" type="number" onChange={(e) => { setDatosPersonales({ ...datosPersonales, tamaño: e.target.value }) }} />
                                                {
                                                    selectTipo === 'Empresa' && (
                                                        <div className="datos">
                                                            <input id="r_razon_social" placeholder="Razón social" onChange={(e) => { setEmpresa({ ...empresa, razon_social: e.target.value }) }} />
                                                            <input id="r_regimen_fiscal" placeholder="Regimen fiscal" onChange={(e) => { setEmpresa({ ...empresa, regimen_fiscal: e.target.value }) }} />
                                                            <input id="r_direccion_fiscal" placeholder="Dirección fiscal" onChange={(e) => { setEmpresa({ ...empresa, direccion_fiscal: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    selectTipo === 'Escuela' && (
                                                        <div className="datos">
                                                            <select id="r_tipo_escuela" onChange={(e) => { setEscuela({ ...escuela, tipo: e.target.value }) }}>
                                                                <option>TIPO</option>
                                                                <option>Pública</option>
                                                                <option>Privada</option>
                                                            </select>
                                                            <input id="r_sitio" placeholder="Sitio web" onChange={(e) => { setEscuela({ ...escuela, url: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    selectTipo === 'Cámara de Comercio' && (
                                                        <div className="datos">
                                                            <input id="r_nombre_camara" placeholder="Nombre" onChange={(e) => { setCamara({ ...camara, nombre: e.target.value }) }} />
                                                            <input id="r_presidente" placeholder="Presidente" onChange={(e) => { setCamara({ ...camara, presidente: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="datos">
                                            <h1>Datos Ubicación</h1>
                                            <div className="contenedor-input">
                                                <input id="r_calle" placeholder="Calle" onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, calle: e.target.value }) }} type="text" />
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
                                        <div className="datos" style={{ width: '200px' }}>
                                            <h1>Cloudinary</h1>
                                            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
                                                <input id="cloud_name" placeholder="CLOUD NAME" type="text" onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, cloud_name: e.target.value }) }} defaultValue={datosCloudinary.cloud_name} />
                                                <input id="api_key" placeholder="API KEY" type="password" onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, api_key: e.target.value }) }} defaultValue={datosCloudinary.api_key} />
                                                <input id="api_secret" placeholder="API SECRET" type="password" onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, api_secret: e.target.value }) }} defaultValue={datosCloudinary.api_secret} />
                                            </div>
                                            <p
                                                style={{ fontSize: '11px' }}
                                            >Esta informacion se obtiene del sitio: <a href="https://cloudinary.com/">CLOUDINARY</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor-botones-accion" style={{ display: 'flex', flexDirection: isSmallDevice ? 'column' : 'row' }}>
                                    <button className="btn-regresar"
                                        onClick={() => { navigate(-1) }}
                                    >
                                        REGRESAR
                                    </button>
                                    <button className="btn-limpiar"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setFoto(null)
                                            setBanner(null)
                                            document.getElementById('r_nombre').value = ''
                                            document.getElementById('r_descripcion').value = ''
                                            document.getElementById('r_rfc').value = ''
                                            if (selectTipo === 'Escuela') {
                                                document.getElementById('r_sitio').value = ''
                                            } else if (selectTipo === 'Empresa') {
                                                document.getElementById('r_razon_social').value = ''
                                                document.getElementById('r_regimen_fiscal').value = ''
                                                document.getElementById('r_direccion_fiscal').value = ''
                                            } else if (selectTipo === 'Cámara de Comercio') {
                                                document.getElementById('r_nombre_camara').value = ''
                                                document.getElementById('r_presidente').value = ''
                                            }
                                            document.getElementById('r_tipo_org').selectedIndex = 0
                                            document.getElementById('r_sector_org').selectedIndex = 0
                                            document.getElementById('r_giro_org').selectedIndex = 0
                                            setSelectTipo('')
                                            document.getElementById('r_tamaño').value = ''
                                            document.getElementById('r_calle').value = ''
                                            document.getElementById('r_numero').value = ''
                                            document.getElementById('r_colonia').value = ''
                                            document.getElementById('r_ciudad').value = ''
                                            document.getElementById('r_cp').value = ''
                                            document.getElementById('r_estado').value = ''
                                            document.getElementById('r_pais').value = ''
                                            document.getElementById('r_correo').value = ''
                                            document.getElementById('r_telefono').value = ''
                                            document.getElementById('r_contrasenia').value = ''
                                            document.getElementById('cloud_name').value = ''
                                            document.getElementById('api_key').value = ''
                                            document.getElementById('api_secret').value = ''
                                            setDatosPersonales(
                                                {
                                                    nombre: '',
                                                    descripcion: '',
                                                    apellido_materno: '',
                                                    rfc: '',
                                                    tamaño: ''
                                                }
                                            )
                                            setDatosUbicacion(
                                                {
                                                    calle: '',
                                                    numero: '',
                                                    colonia: '',
                                                    codigo_postal: '',
                                                    ciudad: '',
                                                    estado: '',
                                                    pais: ''
                                                }
                                            )
                                            setDatosContacto(
                                                {
                                                    correo: '',
                                                    telefono: ''
                                                }
                                            )
                                            setDatosSeguridad(
                                                {
                                                    contrasenia: ''
                                                }
                                            )
                                            setDatosCloudinary(
                                                {
                                                    cloud_name: '',
                                                    api_key: '',
                                                    api_secret: ''
                                                }
                                            )
                                        }}
                                    >
                                        LIMPIAR
                                    </button>
                                    <button className="btn-accion"
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
            {
                openAlertaCambiarContraseña && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div className="a-inputs">
                                <input placeholder="Ingrese el correo de la cuenta" />
                            </div>
                            <div className="a-inputs">
                                <input placeholder="Ingrese el correo de la cuenta" />
                            </div>
                            <div>
                                <button className=""
                                    onClick={() => {
                                        setOpenAlertaCambiarContraseña(false)
                                    }}
                                >
                                    <strong>
                                        CANCELAR
                                    </strong>
                                </button>
                                <button className="btn-accion-2">
                                    <strong>
                                        RECUPERAR
                                    </strong>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <ModalAlerta
                abierto={alerta.abierto}
                tipo={alerta.tipo}
                titulo={alerta.titulo}
                mensaje={alerta.mensaje}
                onAceptar={cerrarAlerta}
            />
        </div>
    )
}