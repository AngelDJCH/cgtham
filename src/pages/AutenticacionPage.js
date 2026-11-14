import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../styles/autenticacion.css'
import { useEffect, useRef, useState } from "react";
import { createCuenta, login, solicitarCodigoRecuperacion, verificarCodigoRecuperacion, restablecerContraseniaConCodigo } from "../services/Cuenta";
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
import ModalRecuperarContrasenia from '../components/ModalRecuperarContrasenia'
import imageCompression from 'browser-image-compression'

export default function AutenticacionPage() {
    const [openCambiarContraseña, setOpenCambiarContraseña] = useState(false)
    const [openAlertaCambiarContraseña, setOpenAlertaCambiarContraseña] = useState(false)
    const [pasoRecuperar, setPasoRecuperar] = useState(1)
    const [correoRecuperar, setCorreoRecuperar] = useState('')
    const [codigoRecuperar, setCodigoRecuperar] = useState('')
    const [nuevaContraseniaRecuperar, setNuevaContraseniaRecuperar] = useState('')
    const [confirmarContraseniaRecuperar, setConfirmarContraseniaRecuperar] = useState('')
    const [mostrarContraseniaRecuperar, setMostrarContraseniaRecuperar] = useState(false)
    const [cargandoRecuperar, setCargandoRecuperar] = useState(false)
    const [errorLocalRecuperar, setErrorLocalRecuperar] = useState('')
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
    const [mostrarContraseniaLogin, setMostrarContraseniaLogin] = useState(false)
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

    const handleSubmitLogin = (e) => {
        if (e && e.preventDefault) e.preventDefault()
        const correoLimpio = correoLogin ? correoLogin.trim() : ''
        if (!correoLimpio || !contraseniaLogin) {
            mostrarAlerta('Por favor ingresa tanto tu correo electrónico como tu contraseña.', 'advertencia', 'Campos Incompletos')
            return
        }
        postCuenta(correoLimpio, contraseniaLogin)
    }

    const abrirModalRecuperacion = () => {
        setCorreoRecuperar(correoLogin ? correoLogin.trim() : '')
        setCodigoRecuperar('')
        setNuevaContraseniaRecuperar('')
        setConfirmarContraseniaRecuperar('')
        setPasoRecuperar(1)
        setErrorLocalRecuperar('')
        setOpenAlertaCambiarContraseña(true)
    }

    const handleSolicitarCodigo = async () => {
        const correoLimpio = correoRecuperar.trim()
        if (!correoLimpio || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
            setErrorLocalRecuperar('Ingresa un correo electrónico válido.')
            return
        }
        setErrorLocalRecuperar('')
        setCargandoRecuperar(true)
        try {
            const respuesta = await solicitarCodigoRecuperacion(correoLimpio)
            if (respuesta.ok) {
                setPasoRecuperar(2)
                setErrorLocalRecuperar('')
            } else {
                setErrorLocalRecuperar(respuesta.message || 'No se pudo enviar el código. Verifica el correo e intenta nuevamente.')
            }
        } catch (err) {
            setErrorLocalRecuperar('Error de comunicación con el servidor. Intenta más tarde.')
        } finally {
            setCargandoRecuperar(false)
        }
    }

    const handleVerificarCodigo = async () => {
        const correoLimpio = correoRecuperar.trim()
        const codigoLimpio = codigoRecuperar.trim()
        if (!codigoLimpio || codigoLimpio.length !== 6) {
            setErrorLocalRecuperar('El código de verificación debe contener 6 dígitos.')
            return
        }
        setErrorLocalRecuperar('')
        setCargandoRecuperar(true)
        try {
            const respuesta = await verificarCodigoRecuperacion(correoLimpio, codigoLimpio)
            if (respuesta.ok) {
                setPasoRecuperar(3)
                setErrorLocalRecuperar('')
            } else {
                setErrorLocalRecuperar(respuesta.message || 'El código es inválido o ha expirado.')
            }
        } catch (err) {
            setErrorLocalRecuperar('Error al verificar el código con el servidor. Intenta de nuevo.')
        } finally {
            setCargandoRecuperar(false)
        }
    }

    const handleRestablecerContrasenia = async () => {
        const correoLimpio = correoRecuperar.trim()
        if (!nuevaContraseniaRecuperar || nuevaContraseniaRecuperar.length < 6) {
            setErrorLocalRecuperar('La nueva contraseña debe tener al menos 6 caracteres.')
            return
        }
        if (nuevaContraseniaRecuperar !== confirmarContraseniaRecuperar) {
            setErrorLocalRecuperar('Las contraseñas ingresadas no coinciden.')
            return
        }
        setErrorLocalRecuperar('')
        setCargandoRecuperar(true)
        try {
            const respuesta = await restablecerContraseniaConCodigo(correoLimpio, nuevaContraseniaRecuperar)
            if (respuesta.ok) {
                setOpenAlertaCambiarContraseña(false)
                setContraseniaLogin(nuevaContraseniaRecuperar)
                mostrarAlerta(
                    'Tu contraseña ha sido actualizada con éxito. Ya puedes iniciar sesión con tu nueva clave.',
                    'exito',
                    '¡Contraseña Actualizada!'
                )
                setCodigoRecuperar('')
                setNuevaContraseniaRecuperar('')
                setConfirmarContraseniaRecuperar('')
                setPasoRecuperar(1)
            } else {
                setErrorLocalRecuperar(respuesta.message || 'No fue posible actualizar la contraseña. Solicita un nuevo código.')
            }
        } catch (err) {
            setErrorLocalRecuperar('Error inesperado al conectar con el servidor. Intenta más tarde.')
        } finally {
            setCargandoRecuperar(false)
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
                        {/* Columna Lateral Izquierda (Imagen + Overlay Institucional) */}
                        <div className="autenticacion-seccion1">
                            <img src={imagen} alt="Estudiantes y profesionistas en colaboración" className="login-banner-img" />
                            <div className="login-banner-overlay">
                                <span className="login-banner-tag">CGTHAM • Residencias</span>
                                <h2 className="login-banner-title">Vinculación Profesional</h2>
                                <p className="login-banner-desc">Plataforma centralizada para estudiantes, empresas e instituciones educativas.</p>
                            </div>
                        </div>

                        {/* Columna Derecha (Formulario de Login Moderno) */}
                        <div className="autenticacion-seccion2">
                            <div className="login-card-header">
                                <span className="login-badge">Acceso al Sistema</span>
                                <h1 className="login-titulo-principal">Iniciar Sesión</h1>
                                <p className="login-subtitulo">Ingresa tus credenciales para acceder a tu panel de control.</p>
                            </div>

                            <form onSubmit={handleSubmitLogin} className="login-form-moderno" noValidate>
                                <div className="login-field-group">
                                    <label htmlFor="login-correo" className="login-field-label">Correo electrónico</label>
                                    <div className="login-input-wrapper">
                                        <svg className="login-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <input
                                            id="login-correo"
                                            type="email"
                                            className="login-input"
                                            placeholder="ejemplo@organizacion.com"
                                            value={correoLogin}
                                            onChange={(e) => setCorreoLogin(e.target.value)}
                                            required
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                <div className="login-field-group">
                                    <label htmlFor="login-contrasenia" className="login-field-label">Contraseña</label>
                                    <div className="login-input-wrapper">
                                        <svg className="login-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        <input
                                            id="login-contrasenia"
                                            type={mostrarContraseniaLogin ? 'text' : 'password'}
                                            className="login-input login-input-password"
                                            placeholder="••••••••"
                                            value={contraseniaLogin}
                                            onChange={(e) => setContraseniaLogin(e.target.value)}
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            className="login-toggle-password-btn"
                                            onClick={() => setMostrarContraseniaLogin(!mostrarContraseniaLogin)}
                                            aria-label={mostrarContraseniaLogin ? 'Ocultar contraseña' : 'Ver contraseña'}
                                            title={mostrarContraseniaLogin ? 'Ocultar contraseña' : 'Ver contraseña'}
                                        >
                                            {mostrarContraseniaLogin ? (
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                    <line x1="2" x2="22" y1="2" y2="22" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="login-forgot-row">
                                    <button
                                        type="button"
                                        className={`login-link-recuperar ${openCambiarContraseña ? 'login-link-destacado' : ''}`}
                                        onClick={abrirModalRecuperacion}
                                    >
                                        {openCambiarContraseña ? (
                                            <>
                                                <span className="login-alerta-dot" aria-hidden="true">●</span>
                                                ¿Olvidaste tu contraseña? Recupérala aquí
                                            </>
                                        ) : (
                                            '¿Olvidaste tu contraseña?'
                                        )}
                                    </button>
                                </div>

                                <div className="login-acciones-principales">
                                    <button type="submit" className="login-btn-ingresar">
                                        <span>Ingresar</span>
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" x2="3" y1="12" y2="12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="login-divider">
                                    <span>o bien</span>
                                </div>

                                <div className="login-footer-actions">
                                    <p className="login-register-prompt">
                                        ¿No tienes una cuenta aún?{' '}
                                        <button
                                            type="button"
                                            className="login-link-registro"
                                            onClick={() => { setOpenLogin(false); setOpenRegisterOrg(true); }}
                                        >
                                            Registrar organización
                                        </button>
                                    </p>
                                    <button
                                        type="button"
                                        className="login-btn-regresar"
                                        onClick={() => navigate(-1)}
                                    >
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <polyline points="15 18 9 12 15 6" />
                                        </svg>
                                        <span>Volver a la página anterior</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {

                openRegisterOrg && (
                    <div className="registro-card-institucional">
                        {/* Banner Institucional con Overlay Interactivo */}
                        <div
                            className="registro-banner-wrap"
                            id="contenedor-banner"
                            title={`Banner institucional: formatos ${EXTENSIONES_IMAGEN}, máx. ${TAMANIO_MAX_IMAGEN_MB} MB`}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                id="upload-banner"
                                onChange={handleChangeBanner}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="upload-banner" style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}>
                                <img
                                    src={banner || imgBannerDefault}
                                    alt="Banner de la organización"
                                    className="registro-banner-img"
                                />
                                <span className="registro-banner-badge">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                        <circle cx="12" cy="13" r="4"></circle>
                                    </svg>
                                    {banner ? 'Cambiar banner' : 'Subir banner institucional'}
                                </span>
                            </label>
                        </div>

                        {/* Layout Principal: Columna Lateral (Logo) y Columna Central (Formulario) */}
                        <div className="registro-layout-cuerpo">
                            {/* Columna Lateral Izquierda: Identidad y Logotipo */}
                            <div className="registro-columna-lateral" id="contenedor-logo">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="upload-foto"
                                    style={{ display: 'none' }}
                                    onChange={handleChangeFoto}
                                />
                                <label
                                    htmlFor="upload-foto"
                                    className="registro-logo-uploader"
                                    title={`Logotipo: formatos ${EXTENSIONES_IMAGEN}, máx. ${TAMANIO_MAX_IMAGEN_MB} MB`}
                                >
                                    {foto ? (
                                        <img src={foto} alt="Logotipo seleccionado" className="registro-logo-img" />
                                    ) : (
                                        <img src={imgLogoDefault} alt="Subir logotipo" className="registro-logo-placeholder" />
                                    )}
                                </label>
                                <label htmlFor="upload-foto" className="registro-logo-btn-texto">
                                    {foto ? 'Cambiar logotipo' : 'Seleccionar logo'}
                                </label>
                                <p className="texto-formato-imagen" style={{ fontSize: '11px', color: '#666', margin: 0, lineHeight: 1.4 }}>
                                    Formatos permitidos: {EXTENSIONES_IMAGEN}
                                </p>
                            </div>

                            {/* Columna Central: Secciones del Formulario Estructuradas */}
                            <div className="registro-columna-formulario">
                                <div className="registro-secciones-grid">
                                    {/* 1. Datos de la Organización */}
                                    <div className="registro-bloque">
                                        <h2 className="registro-bloque-titulo">Datos de la Organización</h2>
                                        <input
                                            id="r_nombre"
                                            className="registro-input-item"
                                            placeholder="Nombre comercial"
                                            onChange={(e) => { setDatosPersonales({ ...datosPersonales, nombre: e.target.value }) }}
                                            type="text"
                                        />
                                        <input
                                            id="r_descripcion"
                                            className="registro-input-item"
                                            placeholder="Descripción institucional"
                                            onChange={(e) => { setDatosPersonales({ ...datosPersonales, descripcion: e.target.value }) }}
                                            type="text"
                                        />
                                        <input
                                            id="r_rfc"
                                            className="registro-input-item"
                                            placeholder="RFC"
                                            onChange={(e) => { setDatosPersonales({ ...datosPersonales, rfc: e.target.value }) }}
                                        />
                                        <select
                                            id="r_tipo_org"
                                            className="registro-select-item"
                                            onChange={(e) => setSelectTipo(e.target.value)}
                                        >
                                            <option value="">TIPO DE ORGANIZACIÓN</option>
                                            <option value="Escuela">Escuela</option>
                                            <option value="Empresa">Empresa</option>
                                            <option value="Cámara de Comercio">Cámara de Comercio</option>
                                        </select>
                                        <select
                                            id="r_sector_org"
                                            className="registro-select-item"
                                            onChange={(e) => setSelectSector(e.target.value)}
                                        >
                                            <option value="">SECTOR</option>
                                            {selectTipo && selectTipo !== 'TIPO' && sectores
                                                .filter(seleccionado => seleccionado.tipo === selectTipo)
                                                .map(s => (
                                                    <option key={s.id} value={s.nombre}>
                                                        {s.nombre}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <select
                                            id="r_giro_org"
                                            className="registro-select-item"
                                            onChange={(e) => { setSelectGiro(e.target.value) }}
                                        >
                                            <option value="">GIRO</option>
                                            {selectTipo && selectSector && sectores
                                                .filter(s => s.tipo === selectTipo && s.nombre === selectSector)
                                                .map(s => s.giros.map(g => (
                                                    <option key={g.id} value={g.nombre}>
                                                        {g.nombre}
                                                    </option>
                                                )))
                                            }
                                        </select>
                                        <input
                                            id="r_tamaño"
                                            className="registro-input-item"
                                            placeholder="Tamaño (Número de integrantes)"
                                            type="number"
                                            onChange={(e) => { setDatosPersonales({ ...datosPersonales, tamaño: e.target.value }) }}
                                        />

                                        {/* Campos condicionales para Empresa */}
                                        {selectTipo === 'Empresa' && (
                                            <>
                                                <input
                                                    id="r_razon_social"
                                                    className="registro-input-item"
                                                    placeholder="Razón social"
                                                    onChange={(e) => { setEmpresa({ ...empresa, razon_social: e.target.value }) }}
                                                />
                                                <input
                                                    id="r_regimen_fiscal"
                                                    className="registro-input-item"
                                                    placeholder="Régimen fiscal"
                                                    onChange={(e) => { setEmpresa({ ...empresa, regimen_fiscal: e.target.value }) }}
                                                />
                                                <input
                                                    id="r_direccion_fiscal"
                                                    className="registro-input-item"
                                                    placeholder="Dirección fiscal"
                                                    onChange={(e) => { setEmpresa({ ...empresa, direccion_fiscal: e.target.value }) }}
                                                />
                                            </>
                                        )}

                                        {/* Campos condicionales para Escuela */}
                                        {selectTipo === 'Escuela' && (
                                            <>
                                                <select
                                                    id="r_tipo_escuela"
                                                    className="registro-select-item"
                                                    onChange={(e) => { setEscuela({ ...escuela, tipo: e.target.value }) }}
                                                >
                                                    <option value="">Régimen Educativo</option>
                                                    <option value="Pública">Pública</option>
                                                    <option value="Privada">Privada</option>
                                                </select>
                                                <input
                                                    id="r_sitio"
                                                    className="registro-input-item"
                                                    placeholder="Sitio web institucional"
                                                    onChange={(e) => { setEscuela({ ...escuela, url: e.target.value }) }}
                                                />
                                            </>
                                        )}

                                        {/* Campos condicionales para Cámara de Comercio */}
                                        {selectTipo === 'Cámara de Comercio' && (
                                            <>
                                                <input
                                                    id="r_nombre_camara"
                                                    className="registro-input-item"
                                                    placeholder="Nombre de la cámara"
                                                    onChange={(e) => { setCamara({ ...camara, nombre: e.target.value }) }}
                                                />
                                                <input
                                                    id="r_presidente"
                                                    className="registro-input-item"
                                                    placeholder="Presidente actual"
                                                    onChange={(e) => { setCamara({ ...camara, presidente: e.target.value }) }}
                                                />
                                            </>
                                        )}
                                    </div>

                                    {/* 2. Datos de Ubicación Domiciliaria */}
                                    <div className="registro-bloque">
                                        <h2 className="registro-bloque-titulo">Datos de Ubicación</h2>
                                        <input
                                            id="r_calle"
                                            className="registro-input-item"
                                            placeholder="Calle y número exterior"
                                            onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, calle: e.target.value }) }}
                                            type="text"
                                        />
                                        <div className="registro-grid-numero-colonia">
                                            <input
                                                id="r_numero"
                                                className="registro-input-item"
                                                placeholder="Número"
                                                onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, numero: e.target.value }) }}
                                                type="number"
                                            />
                                            <input
                                                id="r_colonia"
                                                className="registro-input-item"
                                                placeholder="Colonia"
                                                onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, colonia: e.target.value }) }}
                                                type="text"
                                            />
                                        </div>
                                        <div className="registro-grid-ciudad-cp">
                                            <input
                                                id="r_ciudad"
                                                className="registro-input-item"
                                                placeholder="Ciudad / Municipio"
                                                onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, ciudad: e.target.value }) }}
                                                type="text"
                                            />
                                            <input
                                                id="r_cp"
                                                className="registro-input-item"
                                                placeholder="C.P."
                                                onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, codigo_postal: e.target.value }) }}
                                                type="number"
                                            />
                                        </div>
                                        <div className="registro-grid-doble">
                                            <input
                                                id="r_estado"
                                                className="registro-input-item"
                                                placeholder="Estado"
                                                onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, estado: e.target.value }) }}
                                                type="text"
                                            />
                                            <input
                                                id="r_pais"
                                                className="registro-input-item"
                                                placeholder="País"
                                                onChange={(e) => { setDatosUbicacion({ ...datosUbicacion, pais: e.target.value }) }}
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    {/* 3. Contacto, Seguridad y Multimedia */}
                                    <div className="registro-bloque">
                                        <h2 className="registro-bloque-titulo">Contacto y Seguridad</h2>
                                        <input
                                            id="r_correo"
                                            className="registro-input-item"
                                            placeholder="Correo electrónico oficial"
                                            onChange={(e) => { setDatosContacto({ ...datosContacto, correo: e.target.value }) }}
                                            type="email"
                                        />
                                        <input
                                            id="r_telefono"
                                            className="registro-input-item"
                                            placeholder="Teléfono de contacto"
                                            onChange={(e) => { setDatosContacto({ ...datosContacto, telefono: e.target.value }) }}
                                            type="text"
                                        />
                                        <input
                                            id="r_contrasenia"
                                            className="registro-input-item"
                                            placeholder="Contraseña de acceso"
                                            onChange={(e) => { setDatosSeguridad({ ...datosSeguridad, contrasenia: e.target.value }) }}
                                            type="password"
                                        />

                                        {/* Bloque Cloudinary */}
                                        <div className="registro-seccion-cloudinary">
                                            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#41431B', textTransform: 'uppercase' }}>
                                                Almacenamiento Cloudinary
                                            </span>
                                            <input
                                                id="cloud_name"
                                                className="registro-input-item"
                                                placeholder="Cloud Name"
                                                type="text"
                                                onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, cloud_name: e.target.value }) }}
                                                defaultValue={datosCloudinary.cloud_name}
                                            />
                                            <input
                                                id="api_key"
                                                className="registro-input-item"
                                                placeholder="API Key"
                                                type="password"
                                                onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, api_key: e.target.value }) }}
                                                defaultValue={datosCloudinary.api_key}
                                            />
                                            <input
                                                id="api_secret"
                                                className="registro-input-item"
                                                placeholder="API Secret"
                                                type="password"
                                                onChange={(e) => { setDatosCloudinary({ ...datosCloudinary, api_secret: e.target.value }) }}
                                                defaultValue={datosCloudinary.api_secret}
                                            />
                                            <p className="registro-cloudinary-nota">
                                                Credenciales requeridas para fotografías. Obtenlas en <a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer">Cloudinary</a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Barra Inferior con Acciones */}
                        <div className="registro-barra-inferior">
                            <button
                                type="button"
                                className="registro-btn-regresar"
                                onClick={() => { navigate(-1) }}
                            >
                                Regresar
                            </button>
                            <button
                                type="button"
                                className="registro-btn-limpiar"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setFoto(null)
                                    setBanner(null)
                                    if (document.getElementById('r_nombre')) document.getElementById('r_nombre').value = ''
                                    if (document.getElementById('r_descripcion')) document.getElementById('r_descripcion').value = ''
                                    if (document.getElementById('r_rfc')) document.getElementById('r_rfc').value = ''
                                    if (selectTipo === 'Escuela') {
                                        if (document.getElementById('r_sitio')) document.getElementById('r_sitio').value = ''
                                    } else if (selectTipo === 'Empresa') {
                                        if (document.getElementById('r_razon_social')) document.getElementById('r_razon_social').value = ''
                                        if (document.getElementById('r_regimen_fiscal')) document.getElementById('r_regimen_fiscal').value = ''
                                        if (document.getElementById('r_direccion_fiscal')) document.getElementById('r_direccion_fiscal').value = ''
                                    } else if (selectTipo === 'Cámara de Comercio') {
                                        if (document.getElementById('r_nombre_camara')) document.getElementById('r_nombre_camara').value = ''
                                        if (document.getElementById('r_presidente')) document.getElementById('r_presidente').value = ''
                                    }
                                    if (document.getElementById('r_tipo_org')) document.getElementById('r_tipo_org').selectedIndex = 0
                                    if (document.getElementById('r_sector_org')) document.getElementById('r_sector_org').selectedIndex = 0
                                    if (document.getElementById('r_giro_org')) document.getElementById('r_giro_org').selectedIndex = 0
                                    setSelectTipo('')
                                    if (document.getElementById('r_tamaño')) document.getElementById('r_tamaño').value = ''
                                    if (document.getElementById('r_calle')) document.getElementById('r_calle').value = ''
                                    if (document.getElementById('r_numero')) document.getElementById('r_numero').value = ''
                                    if (document.getElementById('r_colonia')) document.getElementById('r_colonia').value = ''
                                    if (document.getElementById('r_ciudad')) document.getElementById('r_ciudad').value = ''
                                    if (document.getElementById('r_cp')) document.getElementById('r_cp').value = ''
                                    if (document.getElementById('r_estado')) document.getElementById('r_estado').value = ''
                                    if (document.getElementById('r_pais')) document.getElementById('r_pais').value = ''
                                    if (document.getElementById('r_correo')) document.getElementById('r_correo').value = ''
                                    if (document.getElementById('r_telefono')) document.getElementById('r_telefono').value = ''
                                    if (document.getElementById('r_contrasenia')) document.getElementById('r_contrasenia').value = ''
                                    if (document.getElementById('cloud_name')) document.getElementById('cloud_name').value = ''
                                    if (document.getElementById('api_key')) document.getElementById('api_key').value = ''
                                    if (document.getElementById('api_secret')) document.getElementById('api_secret').value = ''
                                    setDatosPersonales({
                                        nombre: '',
                                        descripcion: '',
                                        apellido_materno: '',
                                        rfc: '',
                                        tamaño: ''
                                    })
                                    setDatosUbicacion({
                                        calle: '',
                                        numero: '',
                                        colonia: '',
                                        codigo_postal: '',
                                        ciudad: '',
                                        estado: '',
                                        pais: ''
                                    })
                                    setDatosContacto({
                                        correo: '',
                                        telefono: ''
                                    })
                                    setDatosSeguridad({
                                        contrasenia: ''
                                    })
                                    setDatosCloudinary({
                                        cloud_name: '',
                                        api_key: '',
                                        api_secret: ''
                                    })
                                }}
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                className="registro-btn-submit"
                                onClick={() => {
                                    handeCreateOrganizacion()
                                }}
                            >
                                Registrarme
                            </button>
                        </div>
                    </div>
                )
            }
            <ModalRecuperarContrasenia
                abierto={openAlertaCambiarContraseña}
                paso={pasoRecuperar}
                correo={correoRecuperar}
                codigo={codigoRecuperar}
                nuevaContrasenia={nuevaContraseniaRecuperar}
                confirmarContrasenia={confirmarContraseniaRecuperar}
                mostrarContrasenia={mostrarContraseniaRecuperar}
                cargando={cargandoRecuperar}
                errorLocal={errorLocalRecuperar}
                onCerrar={() => setOpenAlertaCambiarContraseña(false)}
                onCorreoChange={(val) => {
                    setCorreoRecuperar(val)
                    if (errorLocalRecuperar) setErrorLocalRecuperar('')
                }}
                onCodigoChange={(val) => {
                    setCodigoRecuperar(val)
                    if (errorLocalRecuperar) setErrorLocalRecuperar('')
                }}
                onNuevaContraseniaChange={(val) => {
                    setNuevaContraseniaRecuperar(val)
                    if (errorLocalRecuperar) setErrorLocalRecuperar('')
                }}
                onConfirmarContraseniaChange={(val) => {
                    setConfirmarContraseniaRecuperar(val)
                    if (errorLocalRecuperar) setErrorLocalRecuperar('')
                }}
                onToggleMostrarContrasenia={() => setMostrarContraseniaRecuperar((prev) => !prev)}
                onSolicitarCodigo={handleSolicitarCodigo}
                onVerificarCodigo={handleVerificarCodigo}
                onRestablecerContrasenia={handleRestablecerContrasenia}
                onVolverPaso1={() => {
                    setPasoRecuperar(1)
                    setErrorLocalRecuperar('')
                }}
            />
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