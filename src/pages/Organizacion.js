import { useNavigate, useParams } from "react-router-dom";
import NavBarAutenticado from "../components/NavBarAutenticado";
import NavUser from "../components/NavUser";
import { useEffect, useState } from "react";
import { getOrganizacion, updateById } from "../services/Organizacion";
import { getContacto, updateContactoById } from "../services/Contacto";
import { getDireccion, updateDireccionById } from "../services/Direccion";
import '../styles/organizacion.css'
import { getCamara, updateCamaraById } from "../services/Camara";
import { getEmpresa, updateEmpresaById } from "../services/Empresa";
import { getEscuela, updateEscuelaById } from "../services/Escuela";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAuth } from "../hooks/useAuth";
import '../styles/botones.css'
import { getCloudDinary, updateCloudinaryByIdOrganizacion } from "../services/Cloudinary";
import { uploadImgBanner, uploadImgLogo } from "../services/Upload";
import { updateCuentaById, updateCuentaContraseniaById, updateCuentaCorreoById } from "../services/Cuenta";
import { createOfertaEducativa, findAllByIdEscuela } from "../services/OfertaEducativa";
import { findByIdEmpresa } from "../services/Afiliacion";
import Loader from "../components/Loader";
import ModalAlerta from "../components/ModalAlerta";
import imageCompression from "browser-image-compression";


export default function Organizacion() {
    const defaultLogo = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'%3E%3Crect width='160' height='160' rx='80' fill='%23F4F5F0'/%3E%3Crect x='44' y='48' width='72' height='68' rx='6' stroke='%2341431B' stroke-width='4' fill='none'/%3E%3Cpath d='M58 64h12M90 64h12M58 78h12M90 78h12M72 116v-22h16v22' stroke='%2341431B' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M36 48L80 24L124 48' stroke='%2341431B' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
    const defaultBanner = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='320' viewBox='0 0 1200 320' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='bgGradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23363816'/%3E%3Cstop offset='50%25' stop-color='%2341431B'/%3E%3Cstop offset='100%25' stop-color='%23646931'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='320' fill='url(%23bgGradient)'/%3E%3Ccircle cx='1050' cy='160' r='200' fill='%23FFFFFF' fill-opacity='0.04'/%3E%3Ccircle cx='150' cy='220' r='160' fill='%23FFFFFF' fill-opacity='0.03'/%3E%3Cpath d='M0 260C300 220 600 300 1200 240V320H0V260Z' fill='%23000000' fill-opacity='0.12'/%3E%3C/svg%3E"
    const activaAUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZWNrIj48cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiLz48L3N2Zz4='
    const inactivaAUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgiPjxwYXRoIGQ9Ik0xOCA2IDYgMTgiLz48cGF0aCBkPSJtNiA2IDEyIDEyIi8+PC9zdmc+'
    const suspendidaAUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWluZm8iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE2di00Ii8+PHBhdGggZD0iTTEyIDhoLjAxIi8+PC9zdmc+'
    const verifiedImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYWRnZS1jaGVjayI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0ibTE2IDktNS41IDUuNUw4IDEyIi8+PC9zdmc+'
    const notVerifiedImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNBRUI3ODQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYWRnZS1jaGVjayI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0ibTE2IDktNS41IDUuNUw4IDEyIi8+PC9zdmc+'
    const [openInformacionAfiliaciones, setOpenInformacionAfiliaciones] = useState(false)
    const [openAfiliaciones, setOpenAfiliaciones] = useState(false)
    const [openModalFotos, setOpenModalFotos] = useState(false)
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
    const isSmallDevice = useMediaQuery('(max-width:768px)');
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
    const [loading, setLoading] = useState(false)
    const [selectTipo, setSelectTipo] = useState('')
    const [selectSector, setSelectSector] = useState('')
    const [selectGiro, setSelectGiro] = useState('')
    const [ofertasEducativas, setOfertasEducativas] = useState([])
    const [openCreateOfertaEducativa, setOpenCreateOfertaEducativa] = useState(false)
    const { id } = useParams()
    const [organizacion, setOrganizacion] = useState(null)
    const [contacto, setContacto] = useState(null)
    const [direccion, setDireccion] = useState(null)
    const [camara, setCarama] = useState(null)
    const [empresa, setEmpresa] = useState(null)
    const [escuela, setEscuela] = useState(null)
    const [cloudinary, setCloudinary] = useState(null)
    const [afiliaciones, setAfiliaciones] = useState([])
    const url_icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+"
    const [openDatos, setOpenDatos] = useState(true)
    const navigate = useNavigate()
    const [openDatosOrganizacion, setOpenDatosOrganizacion] = useState(true)
    const [openDatosExtra, setOpenDatosExtra] = useState(false)
    const [openDatosContacto, setOpenDatosContacto] = useState(false)
    const [openDatosUbicación, setOpenDatosUbicación] = useState(false)
    const [openDatosSeguridad, setOpenDatosSeguridad] = useState(false)
    const [openDatosCloudinary, setOpenDatosCloudinary] = useState(false)
    const { user, setUser } = useAuth()
    const isMediumDevice = useMediaQuery("(max-width : 768px) or (max-width : 1024px)")

    const handleCreateOfertaEducativa = async () => {
        setLoading(true)
        const nombre = document.getElementById('nombre_oferta').value
        const duracion = document.getElementById('duracion_oferta').value
        const descripcion = document.getElementById('descripcion_oferta').value
        const perfil = document.getElementById('perfil_oferta').value
        const newOferta = await createOfertaEducativa({
            nombre: nombre,
            duracion: duracion,
            descripcion: descripcion,
            perfil: perfil,
            id_escuela: user.organizacion
        })
        if (newOferta === 201) {
            mostrarAlerta('Se publicó la oferta educativa exitosamente.', 'exito', '¡Publicación Exitosa!')
            setOpenCreateOfertaEducativa(false)
            if (escuela?.id) {
                const data = await findAllByIdEscuela(escuela.id)
                setOfertasEducativas(data || [])
            }
        } else if (newOferta === 409) {
            mostrarAlerta('La oferta educativa ya se encuentra registrada.', 'advertencia')
        } else {
            mostrarAlerta('No se pudo publicar la oferta educativa. Por favor intenta de nuevo.', 'error')
        }
        setLoading(false)
    }

    const handlePickLogo = () => {
        setOpenModalFotos(false);
        setTimeout(() => {
            const input = document.getElementById('logo');
            if (input) {
                input.value = '';
                input.click();
            }
        }, 50);
    };

    const handlePickBanner = () => {
        setOpenModalFotos(false);
        setTimeout(() => {
            const input = document.getElementById('banner');
            if (input) {
                input.value = '';
                input.click();
            }
        }, 50);
    };

    const handleChangeLogo = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const esValida = (file.type && file.type.startsWith('image/')) || /\.(png|jpe?g|webp|gif|bmp|avif|heic)$/i.test(file.name)
        if (!esValida) {
            mostrarAlerta('Formato no permitido. Por favor selecciona una imagen válida (PNG, JPG o WEBP).', 'advertencia')
            e.target.value = ''
            return
        }
        setLoading(true)
        try {
            let fileToProcess = file
            try {
                fileToProcess = await imageCompression(file, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 800,
                    useWebWorker: true
                })
            } catch (errComp) {
                console.warn("Compresión no aplicada en logo, usando archivo original:", errComp)
            }
            const base64 = await imageCompression.getDataUrlFromFile(fileToProcess)
            const res = await uploadImgLogo(base64, user?.organizacion)
            if (res) {
                setOrganizacion(prev => ({
                    ...prev,
                    logo: res
                }))
                if (setUser) {
                    setUser(prev => prev ? ({ ...prev, foto: res }) : prev)
                }
                window.dispatchEvent(new CustomEvent('organizacion_logo_actualizado', { detail: { logo: res } }))
                mostrarAlerta('¡Fotografía de perfil (Logo) guardada exitosamente!', 'exito', '¡Actualización Exitosa!')
            } else {
                mostrarAlerta('No se pudo guardar la imagen del logo en el servidor.', 'error', 'Error de Subida')
            }
        } catch (error) {
            console.error("Error al actualizar logo:", error)
            mostrarAlerta('Ocurrió un error inesperado al procesar el logo.', 'error')
        } finally {
            setLoading(false)
            e.target.value = ''
        }
    }

    const handleChangeBanner = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const esValida = (file.type && file.type.startsWith('image/')) || /\.(png|jpe?g|webp|gif|bmp|avif|heic)$/i.test(file.name)
        if (!esValida) {
            mostrarAlerta('Formato no permitido. Por favor selecciona una imagen válida (PNG, JPG o WEBP).', 'advertencia')
            e.target.value = ''
            return
        }
        setLoading(true)
        try {
            let fileToProcess = file
            try {
                fileToProcess = await imageCompression(file, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1600,
                    useWebWorker: true
                })
            } catch (errComp) {
                console.warn("Compresión no aplicada en banner, usando archivo original:", errComp)
            }
            const base64 = await imageCompression.getDataUrlFromFile(fileToProcess)
            const res = await uploadImgBanner(base64, user?.organizacion)
            if (res) {
                setOrganizacion(prev => ({
                    ...prev,
                    banner: res
                }))
                mostrarAlerta('¡Imagen de portada (Banner) guardada exitosamente!', 'exito', '¡Actualización Exitosa!')
            } else {
                mostrarAlerta('No se pudo guardar la imagen de portada en el servidor.', 'error', 'Error de Subida')
            }
        } catch (error) {
            console.error("Error al actualizar banner:", error)
            mostrarAlerta('Ocurrió un error inesperado al procesar el banner.', 'error')
        } finally {
            setLoading(false)
            e.target.value = ''
        }
    }

    const handleClicUpdateOpen = (open) => {
        if (open === "organización") {
            setOpenDatosOrganizacion(!openDatosOrganizacion)
            setOpenDatosContacto(false)
            setOpenDatosCloudinary(false)
            setOpenDatosExtra(false)
            setOpenDatosSeguridad(false)
            setOpenDatosUbicación(false)
        } else if (open === "extra") {
            setOpenDatosExtra(!openDatosExtra)
            setOpenDatosOrganizacion(false)
            setOpenDatosContacto(false)
            setOpenDatosCloudinary(false)
            setOpenDatosSeguridad(false)
            setOpenDatosUbicación(false)
        } else if (open === "contacto") {
            setOpenDatosContacto(!openDatosContacto)
            setOpenDatosExtra(false)
            setOpenDatosOrganizacion(false)
            setOpenDatosCloudinary(false)
            setOpenDatosSeguridad(false)
            setOpenDatosUbicación(false)
        } else if (open === "ubicación") {
            setOpenDatosUbicación(!openDatosUbicación)
            setOpenDatosExtra(false)
            setOpenDatosOrganizacion(false)
            setOpenDatosCloudinary(false)
            setOpenDatosSeguridad(false)
            setOpenDatosContacto(false)
        } else if (open === "seguridad") {
            setOpenDatosSeguridad(!openDatosSeguridad)
            setOpenDatosExtra(false)
            setOpenDatosOrganizacion(false)
            setOpenDatosContacto(false)
            setOpenDatosCloudinary(false)
            setOpenDatosUbicación(false)
        } else if (open === "cloudinary") {
            setOpenDatosCloudinary(!openDatosCloudinary)
            setOpenDatosExtra(false)
            setOpenDatosOrganizacion(false)
            setOpenDatosContacto(false)
            setOpenDatosSeguridad(false)
            setOpenDatosUbicación(false)
        } else {
            setOpenDatosExtra(false)
            setOpenDatosOrganizacion(false)
            setOpenDatosContacto(false)
            setOpenDatosSeguridad(false)
            setOpenDatosUbicación(false)
            setOpenDatosCloudinary(false)
        }
    }

    const handleUpdateOrganizacionData = async () => {
        setLoading(true)
        let notificacionData = ''
        const datosOrganizacion = await updateById(organizacion)
        if (datosOrganizacion === 200) { notificacionData = notificacionData.concat('DATOS DE ORGANIZACIÓN ACTUALIZADOS \n') }
        if (user.tipo === 'Escuela') {
            const datosEscuela = await updateEscuelaById({
                ...(escuela || {}), id: organizacion.id
            })
            if (datosEscuela && datosEscuela === 200) { notificacionData = notificacionData.concat('DATOS DE ESCUELA ACTUALIZADOS \n') }
        } else if (user.tipo === 'Empresa') {
            const datosEmpresa = await updateEmpresaById({
                ...(empresa || {}), id: organizacion.id
            })
            if (datosEmpresa === 200) { notificacionData = notificacionData.concat('DATOS DE EMPRESA ACTUALIZADOS \n') }
        } else if (user.tipo === 'Cámara de Comercio') {
            const datosCamara = await updateCamaraById({
                ...(camara || {}), id: organizacion.id
            })
            if (datosCamara === 200) { notificacionData = notificacionData.concat('DATOS DE CÁMARA DE COMERCIO ACTUALIZADOS \n') }
        }
        const datosContacto = await updateContactoById(contacto)
        if (datosContacto === 200) { notificacionData = notificacionData.concat('DATOS DE CONTACTO ACTUALIZADOS \n') }
        const contrasenia = document.getElementById('contrasenia')?.value
        const datosSeguridadCorreo = await updateCuentaCorreoById({
            correo: contacto.correo,
            id: user.organizacion
        })
        if (datosSeguridadCorreo === 200) { notificacionData = notificacionData.concat('DATOS DE CORREO ACTUALIZADOS \n') }
        if (contrasenia?.length > 0) {
            const datosSeguridadContrasenia = await updateCuentaContraseniaById({
                contrasenia: contrasenia,
                id: user.organizacion
            })
            if (datosSeguridadContrasenia === 200) { notificacionData = notificacionData.concat('DATOS DE CONTRASEÑA ACTUALIZADOS \n') }
        }
        const cloudData = await updateCloudinaryByIdOrganizacion(cloudinary)
        if (cloudData === 200) { notificacionData.concat('DATOS DE CLOUDINARY (HOSTING) ACTUALIZADOS \n') }
        const direccionData = await updateDireccionById(direccion)
        if (direccionData === 200) { notificacionData = notificacionData.concat('DATOS DE DIRECCIÓN ACTUALIZADOS \n') }
        setLoading(false)
        mostrarAlerta(notificacionData.trim() || 'Datos actualizados con éxito.', 'exito', '¡Actualización Exitosa!', () => {
            navigate(0)
        })
    }

    useEffect(() => {
        const organizacionData = async () => {
            if (!id) {
                mostrarAlerta(
                    'No se proporcionó un identificador de organización válido.',
                    'error',
                    'Organización no encontrada',
                    () => {
                        if (window.history.length > 1) {
                            navigate(-1)
                        } else {
                            navigate('/')
                        }
                    }
                )
                return
            }

            setLoading(true)
            const resOrg = await getOrganizacion(id)
            if (!resOrg || !resOrg.id) {
                setLoading(false)
                mostrarAlerta(
                    'No se encontró la organización solicitada o el enlace es incorrecto.',
                    'error',
                    'Organización no encontrada',
                    () => {
                        if (window.history.length > 1) {
                            navigate(-1)
                        } else {
                            navigate('/')
                        }
                    }
                )
                return
            }

            setOrganizacion(resOrg)
            if (resOrg.id_contacto) {
                const resCon = await getContacto(resOrg.id_contacto)
                setContacto(resCon)
            }
            if (resOrg.id_direccion) {
                const resDir = await getDireccion(resOrg.id_direccion)
                setDireccion(resDir)
            }
            const cloud = await getCloudDinary(resOrg.id)
            setCloudinary(cloud)
            setSelectTipo(resOrg?.tipo)
            setSelectSector(resOrg?.sector)
            setSelectGiro(resOrg?.giro)

            if (resOrg?.tipo !== 'Comité') {
                if (resOrg?.tipo === 'Empresa') {
                    const resEm = await getEmpresa(resOrg.id)
                    setEmpresa(resEm)
                } else if (resOrg?.tipo === 'Escuela') {
                    const resEsc = await getEscuela(resOrg.id)
                    setEscuela(resEsc)
                    if (resEsc?.id) {
                        const data = await findAllByIdEscuela(resEsc.id)
                        setOfertasEducativas(data || [])
                    }
                } else {
                    const resCam = await getCamara(resOrg.id)
                    setCarama(resCam)
                }
            }
            setLoading(false)
        }
        const getAfiliaciones = async () => {
            if (!id) return
            const res = await findByIdEmpresa(id)
            if (res && Array.isArray(res)) {
                setAfiliaciones(res)
            }
        }
        organizacionData()
        getAfiliaciones()
    }, [id])

    const isLargeDevice = useMediaQuery('(min-width:992px) or (min-width: 1400px)');

    // Construcción de la dirección unificada
    const direccionCompleta = direccion ? [
        direccion.calle && `Calle ${direccion.calle}`,
        direccion.numero && `No. ${direccion.numero}`,
        direccion.colonia && `Col. ${direccion.colonia}`,
        direccion.codigo_postal && `C.P. ${direccion.codigo_postal}`,
        direccion.ciudad,
        direccion.estado,
        direccion.pais
    ].filter(Boolean).join(', ') : 'No registrada';

    return (
        <div style={{ marginTop: '100px', marginRight: isLargeDevice ? '50px' : '0', width: isMediumDevice ? '100%' : null }}>
            <NavBarAutenticado />
            {
                isLargeDevice && (
                    <NavUser left='30px' top='95px' />
                )
            }
            <div className="editar-perfil-contenedor" style={{ width: '100%' }}>
                {/* =========================================================
                    CABECERA INSTITUCIONAL: BANNER + AVATAR + DATOS PRINCIPALES
                    ========================================================= */}
                <div className='org-header-card' style={{ width: isLargeDevice ? '70%' : '100%', marginRight: isLargeDevice ? '1rem' : null }}>
                    {/* Banner panorámico con overlay */}
                    <div className='org-banner-wrapper'>
                        <input
                            id="banner"
                            type="file"
                            accept="image/*"
                            onChange={handleChangeBanner}
                            style={{ display: 'none' }}
                        />
                        <img
                            src={organizacion?.banner || defaultBanner}
                            alt="Portada de la Organización"
                            className="org-banner-img"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = defaultBanner;
                            }}
                        />
                        <div className="org-banner-overlay" />
                        {
                            user?.organizacion === organizacion?.id && (
                                <button
                                    type="button"
                                    onClick={() => setOpenModalFotos(true)}
                                    className="org-btn-edit-media"
                                    title="Personalizar portada o foto"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                        <circle cx="12" cy="13" r="4"></circle>
                                    </svg>
                                    Cambiar Portada
                                </button>
                            )
                        }
                    </div>

                    {/* Avatar sobrepuesto con anillo y badge */}
                    <div className='org-avatar-container'>
                        <div className='org-avatar-ring'>
                            <input
                                id="logo"
                                style={{ display: 'none' }}
                                type="file"
                                accept="image/*"
                                onChange={handleChangeLogo}
                            />
                            <img
                                src={organizacion?.logo || defaultLogo}
                                alt={organizacion?.nombre_comercial ? `Logo ${organizacion.nombre_comercial}` : "Logo"}
                                className="org-avatar-img"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = defaultLogo;
                                }}
                            />
                            {
                                user?.organizacion === organizacion?.id && (
                                    <button
                                        type="button"
                                        onClick={() => setOpenModalFotos(true)}
                                        className="org-avatar-badge-btn"
                                        title="Personalizar logo de la organización"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#41431B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                    </button>
                                )
                            }
                        </div>
                    </div>

                    {/* Título, Badges y Resumen */}
                    <div className='org-header-body'>
                        <div className='org-header-top-row'>
                            <div className='org-header-titles'>
                                <h1>{organizacion?.nombre_comercial || (loading ? 'Cargando información...' : 'Organización')}</h1>
                                <div className='org-badges-row'>
                                    {organizacion?.tipo && (
                                        <span className='org-badge-pill org-badge-tipo'>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"></path>
                                            </svg>
                                            {organizacion.tipo}
                                        </span>
                                    )}
                                    {organizacion?.sector && (
                                        <span className='org-badge-pill org-badge-sector'>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            {organizacion.sector}
                                        </span>
                                    )}
                                    {organizacion?.tipo === 'Empresa' && (
                                        <span
                                            className='org-badge-pill org-badge-afiliacion'
                                            onClick={() => setOpenAfiliaciones(true)}
                                            title="Ver estado de afiliación con Cámaras de Comercio"
                                        >
                                            <img
                                                src={afiliaciones?.length > 0 ? verifiedImg : notVerifiedImg}
                                                alt="Afiliación"
                                                style={{ width: '14px', height: '14px' }}
                                            />
                                            {afiliaciones?.length > 0 ? 'Afiliada a Cámara' : 'Sin Afiliación'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {organizacion?.descripcion && (
                            <p className='org-header-description'>{organizacion.descripcion}</p>
                        )}
                    </div>
                </div>

                {/* Caso de error / Organización no encontrada */}
                {
                    !organizacion && !loading ? (
                        <div className="org-card-seccion" style={{ display: 'flex', flexDirection: 'column', width: isLargeDevice ? '70%' : '100%', marginTop: '1.5rem', justifyContent: 'center', alignItems: 'center', padding: '3.5rem 1.5rem', marginRight: isLargeDevice ? '1rem' : null, textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F4F5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#41431B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <h3 style={{ color: '#41431B', marginBottom: '0.5rem', fontFamily: 'Poppins', fontWeight: 700 }}>Organización no encontrada</h3>
                            <p style={{ color: '#666', maxWidth: '480px', marginBottom: '1.5rem', fontSize: '14px', lineHeight: 1.5 }}>
                                No pudimos localizar la organización solicitada o el enlace es incorrecto. Por favor verifica la dirección web o vuelve a la página anterior.
                            </p>
                            <button
                                type="button"
                                className="btn-accion-2"
                                style={{ padding: '9px 30px' }}
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        navigate(-1)
                                    } else {
                                        navigate('/')
                                    }
                                }}
                            >
                                <strong>REGRESAR</strong>
                            </button>
                        </div>
                    ) : null
                }

                {/* =========================================================
                    SECCIÓN: INFORMACIÓN INSTITUCIONAL (MODO LECTURA)
                    ========================================================= */}
                {
                    organizacion && openDatos && (
                        <div className="org-card-seccion" style={{ width: isLargeDevice ? '70%' : '100%', marginTop: '1.5rem', marginRight: isLargeDevice ? '1rem' : null }}>
                            {/* Cabecera de la sección con degradado y acción */}
                            <div className="org-section-header">
                                <div className="org-section-title-wrapper">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                    <h2>INFORMACIÓN INSTITUCIONAL</h2>
                                </div>
                                {
                                    user.organizacion === organizacion?.id && (
                                        <button
                                            type="button"
                                            className="org-btn-edit-seccion"
                                            onClick={() => setOpenDatos(false)}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                            EDITAR INFORMACIÓN
                                        </button>
                                    )
                                }
                            </div>

                            {/* Contenido agrupado semánticamente */}
                            <div className="org-info-container">
                                {/* Bloque 1: Datos Generales e Identidad */}
                                <div className="org-category-block">
                                    <div className="org-category-title">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        Identidad y Operación
                                    </div>
                                    <div className="org-category-grid">
                                        <div className="org-dato-card">
                                            <div className="org-dato-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="3" width="7" height="7"></rect>
                                                    <rect x="14" y="3" width="7" height="7"></rect>
                                                    <rect x="14" y="14" width="7" height="7"></rect>
                                                    <rect x="3" y="14" width="7" height="7"></rect>
                                                </svg>
                                            </div>
                                            <div className="org-dato-content">
                                                <span className="org-dato-label">Tipo de Entidad</span>
                                                <span className="org-dato-val">{organizacion?.tipo || 'No especificado'}</span>
                                            </div>
                                        </div>

                                        <div className="org-dato-card">
                                            <div className="org-dato-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                </svg>
                                            </div>
                                            <div className="org-dato-content">
                                                <span className="org-dato-label">Sector Productivo</span>
                                                <span className="org-dato-val">{organizacion?.sector || 'No especificado'}</span>
                                            </div>
                                        </div>

                                        <div className="org-dato-card">
                                            <div className="org-dato-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                                </svg>
                                            </div>
                                            <div className="org-dato-content">
                                                <span className="org-dato-label">Giro de Actividad</span>
                                                <span className="org-dato-val">{organizacion?.giro || 'No especificado'}</span>
                                            </div>
                                        </div>

                                        <div className="org-dato-card">
                                            <div className="org-dato-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="9" cy="7" r="4"></circle>
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                </svg>
                                            </div>
                                            <div className="org-dato-content">
                                                <span className="org-dato-label">Tamaño / Personal</span>
                                                <span className="org-dato-val">{organizacion?.tamaño ? `${organizacion.tamaño} integrantes` : 'No especificado'}</span>
                                            </div>
                                        </div>

                                        <div className="org-dato-card">
                                            <div className="org-dato-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                                    <polyline points="10 9 9 9 8 9"></polyline>
                                                </svg>
                                            </div>
                                            <div className="org-dato-content">
                                                <span className="org-dato-label">RFC Institucional</span>
                                                <span className="org-dato-val" style={{ letterSpacing: '0.5px' }}>{organizacion?.rfc || 'No registrado'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bloque 2: Contacto y Comunicación Oficial */}
                                <div className="org-category-block">
                                    <div className="org-category-title">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                        Contacto y Canales Oficiales
                                    </div>
                                    <div className="org-category-grid">
                                        <div className="org-dato-card">
                                            <div className="org-dato-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </svg>
                                            </div>
                                            <div className="org-dato-content">
                                                <span className="org-dato-label">Correo Electrónico</span>
                                                {contacto?.correo ? (
                                                    <a href={`mailto:${contacto.correo}`} className="org-dato-val org-dato-link" title="Enviar correo">
                                                        {contacto.correo}
                                                    </a>
                                                ) : (
                                                    <span className="org-dato-val">No registrado</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="org-dato-card">
                                            <div className="org-dato-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                </svg>
                                            </div>
                                            <div className="org-dato-content">
                                                <span className="org-dato-label">Teléfono Directo</span>
                                                {contacto?.telefono ? (
                                                    <a href={`tel:${contacto.telefono}`} className="org-dato-val org-dato-link" title="Llamar">
                                                        {contacto.telefono}
                                                    </a>
                                                ) : (
                                                    <span className="org-dato-val">No registrado</span>
                                                )}
                                            </div>
                                        </div>

                                        {escuela?.url_sitio && (
                                            <div className="org-dato-card">
                                                <div className="org-dato-icon">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                                    </svg>
                                                </div>
                                                <div className="org-dato-content">
                                                    <span className="org-dato-label">Portal Web Oficial</span>
                                                    <a href={escuela.url_sitio.startsWith('http') ? escuela.url_sitio : `https://${escuela.url_sitio}`} target="_blank" rel="noopener noreferrer" className="org-dato-val org-dato-link">
                                                        Visitar Sitio
                                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Bloque 3: Ubicación y Domicilio Geográfico */}
                                <div className="org-category-block">
                                    <div className="org-category-title">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        Ubicación Geográfica
                                    </div>
                                    <div className="org-address-box">
                                        <div className="org-dato-icon" style={{ backgroundColor: '#ECEFD9', color: '#41431B' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <span className="org-dato-label">Dirección Fiscal / Sede Operativa</span>
                                            <p className="org-address-text">
                                                {direccionCompleta}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bloque 4: Datos Específicos por Tipo de Entidad */}
                                {(escuela || empresa || camara) && (
                                    <div className="org-category-block">
                                        <div className="org-category-title">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            Datos de {organizacion?.tipo || 'Entidad'}
                                        </div>
                                        <div className="org-category-grid">
                                            {escuela && (
                                                <div className="org-dato-card">
                                                    <div className="org-dato-icon">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                                        </svg>
                                                    </div>
                                                    <div className="org-dato-content">
                                                        <span className="org-dato-label">Tipo de Institución</span>
                                                        <span className="org-dato-val">{escuela?.tipo_institucion || 'No especificado'}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {empresa && (
                                                <>
                                                    <div className="org-dato-card">
                                                        <div className="org-dato-icon">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                                <polyline points="17 11 19 13 23 9"></polyline>
                                                            </svg>
                                                        </div>
                                                        <div className="org-dato-content">
                                                            <span className="org-dato-label">Razón Social</span>
                                                            <span className="org-dato-val">{empresa?.razon_social || 'No registrada'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="org-dato-card">
                                                        <div className="org-dato-icon">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                                            </svg>
                                                        </div>
                                                        <div className="org-dato-content">
                                                            <span className="org-dato-label">Régimen Fiscal</span>
                                                            <span className="org-dato-val">{empresa?.regimen_fiscal || 'No registrado'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="org-dato-card" style={{ gridColumn: 'span 2' }}>
                                                        <div className="org-dato-icon">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                                <circle cx="12" cy="10" r="3"></circle>
                                                            </svg>
                                                        </div>
                                                        <div className="org-dato-content">
                                                            <span className="org-dato-label">Dirección Fiscal Registrada</span>
                                                            <span className="org-dato-val">{empresa?.direccion_fiscal || 'No registrada'}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {camara && (
                                                <>
                                                    <div className="org-dato-card">
                                                        <div className="org-dato-icon">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                            </svg>
                                                        </div>
                                                        <div className="org-dato-content">
                                                            <span className="org-dato-label">Nombre Oficial de Cámara</span>
                                                            <span className="org-dato-val">{camara?.nombre || 'No registrado'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="org-dato-card">
                                                        <div className="org-dato-icon">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                                <circle cx="12" cy="7" r="4"></circle>
                                                            </svg>
                                                        </div>
                                                        <div className="org-dato-content">
                                                            <span className="org-dato-label">Presidente / Representante</span>
                                                            <span className="org-dato-val">{camara?.presidente || 'No registrado'}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }

                {/* =========================================================
                    SECCIÓN: INFORMACIÓN INSTITUCIONAL (MODO EDICIÓN)
                    ========================================================= */}
                {
                    !openDatos && organizacion && (
                        <div className="org-card-seccion" style={{ width: isLargeDevice ? '70%' : '100%', marginTop: '1.5rem', marginRight: isLargeDevice ? '1rem' : null }}>
                            <div className="org-section-header">
                                <div className="org-section-title-wrapper">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                    <h2>MODIFICAR DATOS DEL PERFIL</h2>
                                </div>
                            </div>

                            <div className="org-edit-panel">
                                {/* Acordeón 1: Organización */}
                                <div className="org-edit-accordion">
                                    <div className="org-edit-accordion-header" onClick={() => handleClicUpdateOpen("organización")}>
                                        <h3>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                            </svg>
                                            Datos de la Organización
                                        </h3>
                                        <img src={url_icon} alt="toggle" style={{ transform: openDatosOrganizacion ? 'rotate(180deg)' : 'none', width: '20px' }} />
                                    </div>
                                    {openDatosOrganizacion && (
                                        <div className="org-edit-accordion-body">
                                            <div className="org-field-group">
                                                <label>Nombre comercial:</label>
                                                <input type="text" placeholder="Ej. Instituto Tecnológico" defaultValue={organizacion?.nombre_comercial} onChange={(e) => { setOrganizacion({ ...organizacion, nombre_comercial: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>Tipo de entidad:</label>
                                                <select onChange={(e) => { setSelectTipo(e.target.value); setSelectSector('SECTOR') }}>
                                                    <option selected={organizacion?.tipo === 'Escuela'} disabled={organizacion?.tipo !== 'Escuela'}>
                                                        Escuela
                                                    </option>
                                                    <option selected={organizacion?.tipo === 'Empresa'} disabled={organizacion?.tipo !== 'Empresa'}>
                                                        Empresa
                                                    </option>
                                                    <option selected={organizacion?.tipo === 'Cámara de Comercio'} disabled={organizacion?.tipo !== 'Cámara de Comercio'}>
                                                        Cámara de Comercio
                                                    </option>
                                                    {user.tipo === 'Comité' && (
                                                        <option selected={organizacion?.tipo === 'Comité'}>
                                                            Comité (ADMINISTRADOR)
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                            {user.tipo !== 'Comité' && (
                                                <div className="org-field-group">
                                                    <label>Sector:</label>
                                                    <select onChange={(e) => { setSelectSector(e.target.value); setOrganizacion({ ...organizacion, sector: e.target.value }) }}>
                                                        <option>SECTOR</option>
                                                        {selectTipo !== 'TIPO' && sectores.filter(s => s.tipo === selectTipo).map(s => (
                                                            <option key={s.id} selected={organizacion?.sector === s.nombre}>
                                                                {s.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                            {user.tipo !== 'Comité' && (
                                                <div className="org-field-group">
                                                    <label>Giro:</label>
                                                    <select onChange={(e) => { setOrganizacion({ ...organizacion, giro: e.target.value }) }}>
                                                        <option>GIRO</option>
                                                        {selectTipo && selectSector && sectores.filter(s => s.tipo === selectTipo && s.nombre === selectSector).map(s => (
                                                            s.giros.map(g => (
                                                                <option key={g.id} selected={organizacion?.giro === g.nombre}>{g.nombre}</option>
                                                            ))
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                            <div className="org-field-group">
                                                <label>Tamaño (Nº empleados/integrantes):</label>
                                                <input type="number" placeholder="Ej. 50" defaultValue={organizacion?.tamaño} onChange={(e) => { setOrganizacion({ ...organizacion, tamaño: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>RFC:</label>
                                                <input type="text" placeholder="Registro Federal de Contribuyentes" defaultValue={organizacion?.rfc} onChange={(e) => { setOrganizacion({ ...organizacion, rfc: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group full-width">
                                                <label>Descripción institucional:</label>
                                                <textarea placeholder="Describe brevemente la misión y actividades de tu organización..." defaultValue={organizacion?.descripcion} onChange={(e) => { setOrganizacion({ ...organizacion, descripcion: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Acordeón 2: Datos Específicos (Extra) */}
                                {user.tipo !== 'Comité' && (
                                    <div className="org-edit-accordion">
                                        <div className="org-edit-accordion-header" onClick={() => handleClicUpdateOpen("extra")}>
                                            <h3>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                Datos Específicos ({selectTipo})
                                            </h3>
                                            <img src={url_icon} alt="toggle" style={{ transform: openDatosExtra ? 'rotate(180deg)' : 'none', width: '20px' }} />
                                        </div>
                                        {openDatosExtra && (
                                            <div className="org-edit-accordion-body">
                                                {selectTipo === 'Empresa' && (
                                                    <>
                                                        <div className="org-field-group">
                                                            <label>Razón social:</label>
                                                            <input placeholder="Razón social oficial" defaultValue={empresa?.razon_social} onChange={(e) => { setEmpresa({ ...empresa, razon_social: e.target.value }) }} />
                                                        </div>
                                                        <div className="org-field-group">
                                                            <label>Régimen fiscal:</label>
                                                            <input placeholder="Régimen fiscal" defaultValue={empresa?.regimen_fiscal} onChange={(e) => { setEmpresa({ ...empresa, regimen_fiscal: e.target.value }) }} />
                                                        </div>
                                                        <div className="org-field-group full-width">
                                                            <label>Dirección fiscal:</label>
                                                            <input placeholder="Dirección fiscal completa" defaultValue={empresa?.direccion_fiscal} onChange={(e) => { setEmpresa({ ...empresa, direccion_fiscal: e.target.value }) }} />
                                                        </div>
                                                    </>
                                                )}
                                                {selectTipo === 'Escuela' && (
                                                    <>
                                                        <div className="org-field-group">
                                                            <label>Tipo de Institución:</label>
                                                            <select onChange={(e) => { setEscuela({ ...escuela, tipo_institucion: e.target.value }) }}>
                                                                <option>TIPO</option>
                                                                <option selected={escuela?.tipo_institucion === 'Pública'}>Pública</option>
                                                                <option selected={escuela?.tipo_institucion === 'Privada'}>Privada</option>
                                                            </select>
                                                        </div>
                                                        <div className="org-field-group">
                                                            <label>URL de Sitio Web Oficial:</label>
                                                            <input placeholder="https://ejemplo.edu.mx" defaultValue={escuela?.url_sitio} onChange={(e) => { setEscuela({ ...escuela, url_sitio: e.target.value }) }} />
                                                        </div>
                                                    </>
                                                )}
                                                {selectTipo === 'Cámara de Comercio' && (
                                                    <>
                                                        <div className="org-field-group">
                                                            <label>Nombre de la Cámara:</label>
                                                            <input placeholder="Nombre oficial" defaultValue={camara?.nombre} onChange={(e) => { setCarama({ ...camara, nombre: e.target.value }) }} />
                                                        </div>
                                                        <div className="org-field-group">
                                                            <label>Nombre del presidente en turno:</label>
                                                            <input placeholder="Nombre completo" defaultValue={camara?.presidente} onChange={(e) => { setCarama({ ...camara, presidente: e.target.value }) }} />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Acordeón 3: Contacto */}
                                <div className="org-edit-accordion">
                                    <div className="org-edit-accordion-header" onClick={() => handleClicUpdateOpen("contacto")}>
                                        <h3>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                            Información de Contacto
                                        </h3>
                                        <img src={url_icon} alt="toggle" style={{ transform: openDatosContacto ? 'rotate(180deg)' : 'none', width: '20px' }} />
                                    </div>
                                    {openDatosContacto && (
                                        <div className="org-edit-accordion-body">
                                            <div className="org-field-group">
                                                <label>Correo Electrónico:</label>
                                                <input type="email" placeholder="correo@ejemplo.com" defaultValue={contacto?.correo} onChange={(e) => { setContacto({ ...contacto, correo: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>Teléfono Institucional:</label>
                                                <input type="text" placeholder="(Lada) Teléfono" defaultValue={contacto?.telefono} onChange={(e) => { setContacto({ ...contacto, telefono: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Acordeón 4: Ubicación */}
                                <div className="org-edit-accordion">
                                    <div className="org-edit-accordion-header" onClick={() => handleClicUpdateOpen("ubicación")}>
                                        <h3>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            Domicilio y Ubicación
                                        </h3>
                                        <img src={url_icon} alt="toggle" style={{ transform: openDatosUbicación ? 'rotate(180deg)' : 'none', width: '20px' }} />
                                    </div>
                                    {openDatosUbicación && (
                                        <div className="org-edit-accordion-body">
                                            <div className="org-field-group">
                                                <label>Calle:</label>
                                                <input type="text" placeholder="Calle o Avenida" defaultValue={direccion?.calle} onChange={(e) => { setDireccion({ ...direccion, calle: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>Número exterior / interior:</label>
                                                <input type="number" placeholder="Ej. 123" defaultValue={direccion?.numero} onChange={(e) => { setDireccion({ ...direccion, numero: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>Colonia:</label>
                                                <input type="text" placeholder="Colonia o Fracc." defaultValue={direccion?.colonia} onChange={(e) => { setDireccion({ ...direccion, colonia: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>Código Postal:</label>
                                                <input type="number" placeholder="C.P." defaultValue={direccion?.codigo_postal} onChange={(e) => { setDireccion({ ...direccion, codigo_postal: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>Ciudad / Municipio:</label>
                                                <input type="text" placeholder="Ciudad" defaultValue={direccion?.ciudad} onChange={(e) => { setDireccion({ ...direccion, ciudad: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>Estado:</label>
                                                <input type="text" placeholder="Estado" defaultValue={direccion?.estado} onChange={(e) => { setDireccion({ ...direccion, estado: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>País:</label>
                                                <input type="text" placeholder="País" defaultValue={direccion?.pais} onChange={(e) => { setDireccion({ ...direccion, pais: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Acordeón 5: Seguridad */}
                                <div className="org-edit-accordion">
                                    <div className="org-edit-accordion-header" onClick={() => handleClicUpdateOpen("seguridad")}>
                                        <h3>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                            Seguridad y Contraseña
                                        </h3>
                                        <img src={url_icon} alt="toggle" style={{ transform: openDatosSeguridad ? 'rotate(180deg)' : 'none', width: '20px' }} />
                                    </div>
                                    {openDatosSeguridad && (
                                        <div className="org-edit-accordion-body">
                                            <div className="org-field-group full-width">
                                                <label>Nueva contraseña (dejar vacío si no deseas modificarla):</label>
                                                <input type="password" placeholder="Nueva contraseña segura" id="contrasenia" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Acordeón 6: Cloudinary - Hosting */}
                                <div className="org-edit-accordion">
                                    <div className="org-edit-accordion-header" onClick={() => handleClicUpdateOpen("cloudinary")}>
                                        <h3>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                                            </svg>
                                            Cloudinary - Hosting Multimedia
                                        </h3>
                                        <img src={url_icon} alt="toggle" style={{ transform: openDatosCloudinary ? 'rotate(180deg)' : 'none', width: '20px' }} />
                                    </div>
                                    {openDatosCloudinary && (
                                        <div className="org-edit-accordion-body">
                                            <div className="org-field-group">
                                                <label>Cloud Name:</label>
                                                <input type="password" placeholder="Cloud name" defaultValue={cloudinary?.nombre} onChange={(e) => { setCloudinary({ ...cloudinary, nombre: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group">
                                                <label>API Key:</label>
                                                <input type="password" placeholder="API Key" defaultValue={cloudinary?.clave} onChange={(e) => { setCloudinary({ ...cloudinary, clave: e.target.value }) }} />
                                            </div>
                                            <div className="org-field-group full-width">
                                                <label>API Secret:</label>
                                                <input type="password" placeholder="API Secret" defaultValue={cloudinary?.clave_secreta} onChange={(e) => { setCloudinary({ ...cloudinary, clave_secreta: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Barra de acciones de Guardar / Cancelar */}
                                <div className="org-edit-actions-bar">
                                    <button
                                        type="button"
                                        className="btn-accion-cancelar-1"
                                        style={{ padding: '8px 24px', borderRadius: '8px' }}
                                        onClick={() => { handleClicUpdateOpen("cancelar"); setOpenDatos(true) }}
                                    >
                                        <strong>CANCELAR</strong>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-accion-2"
                                        style={{ padding: '8px 28px', borderRadius: '8px' }}
                                        onClick={() => { handleUpdateOrganizacionData() }}
                                    >
                                        <strong>GUARDAR CAMBIOS</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* =========================================================
                    SECCIÓN: OFERTA EDUCATIVA (SOLO ESCUELAS)
                    ========================================================= */}
                {
                    organizacion?.tipo === 'Escuela' && (
                        <div className="org-card-seccion" style={{ width: isLargeDevice ? '70%' : '100%', marginTop: '1.5rem', marginRight: isLargeDevice ? '1rem' : null }}>
                            <div className="org-section-header">
                                <div className="org-section-title-wrapper">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                    </svg>
                                    <h2>OFERTA EDUCATIVA Y PLANES DE ESTUDIO</h2>
                                </div>
                                {
                                    user.tipo === 'Escuela' && organizacion?.id === user.organizacion && (
                                        <button
                                            type="button"
                                            className="org-btn-edit-seccion"
                                            onClick={() => setOpenCreateOfertaEducativa(true)}
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            AGREGAR CARRERA
                                        </button>
                                    )
                                }
                            </div>

                            <div className="org-ofertas-container">
                                {
                                    (!ofertasEducativas || ofertasEducativas.length === 0) && (
                                        <div className="org-empty-state">
                                            <div className="org-empty-state-icon">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#848A69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                                </svg>
                                            </div>
                                            <h4>Sin ofertas educativas registradas</h4>
                                            <p>Esta institución aún no ha publicado carreras, diplomados o programas de formación técnica.</p>
                                        </div>
                                    )
                                }

                                {
                                    ofertasEducativas && ofertasEducativas.length > 0 && (
                                        <div className="org-ofertas-grid">
                                            {ofertasEducativas.map((item, idx) => (
                                                <div key={idx} className="org-oferta-card">
                                                    <div className="org-oferta-card-header">
                                                        <div className="org-oferta-icon">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                                            </svg>
                                                        </div>
                                                        <h3>{item?.nombre}</h3>
                                                    </div>
                                                    <div className="org-oferta-card-body">
                                                        <div className="org-oferta-meta-row">
                                                            <span className="org-oferta-duracion-badge">
                                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <circle cx="12" cy="12" r="10"></circle>
                                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                                </svg>
                                                                {item?.duracion ? `${item.duracion} años` : 'Duración no especificada'}
                                                            </span>
                                                        </div>

                                                        {item?.descripcion && (
                                                            <div className="org-oferta-text-block">
                                                                <strong>Descripción del programa:</strong>
                                                                <p>{item.descripcion}</p>
                                                            </div>
                                                        )}

                                                        {item?.perfil && (
                                                            <div className="org-oferta-text-block">
                                                                <strong>Perfil del egresado:</strong>
                                                                <p>{item.perfil}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>

            {/* Modal: Registro de Nueva Oferta Educativa */}
            {
                openCreateOfertaEducativa && (
                    <div>
                        <div className="overllay" onClick={() => setOpenCreateOfertaEducativa(false)}></div>
                        <div className="overllay-contenedor">
                            <div className="formulario-contenedor" style={{ height: isSmallDevice ? '100%' : null }}>
                                <div className="titulo-formulario"><h1>NUEVA OFERTA EDUCATIVA</h1></div>
                                <div className="formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                        <div className="contenedor-datos-interno">
                                            <h6>Nombre de la carrera o programa:</h6>
                                            <input placeholder="Ej. Ingeniería en Sistemas Computacionales" id="nombre_oferta" />

                                            <h6>Duración estimada (años):</h6>
                                            <input type="number" step="0.5" placeholder="Ej. 4.5" id="duracion_oferta" />

                                            <h6>Descripción general del programa:</h6>
                                            <textarea placeholder="Describe el objetivo y competencias que desarrollará el estudiante..." id="descripcion_oferta" />

                                            <h6>Perfil de egreso (competencias separadas por coma):</h6>
                                            <textarea placeholder="Ej. Liderazgo, Desarrollo de software, Análisis de datos..." id="perfil_oferta" />
                                        </div>
                                    </div>
                                    {
                                        isMediumDevice && (
                                            <div style={{ width: '250px', height: '100%' }}>
                                                <p style={{ textAlign: 'justify', fontSize: '12px', color: '#555' }}>
                                                    <strong>Nota: </strong>
                                                    Una vez publicada la oferta educativa, los aspirantes y empresas vinculadas podrán consultarla directamente desde tu perfil público.
                                                    En caso de dudas, contacta a <kbd><strong>cgtham@gmail.com</strong></kbd>
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div style={{ width: '100%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <button
                                        type="button"
                                        className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCreateOfertaEducativa(false) }}
                                    >
                                        <strong>CERRAR</strong>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-accion-2"
                                        onClick={() => { handleCreateOfertaEducativa() }}
                                    >
                                        <strong>PUBLICAR OFERTA</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal: Afiliaciones a Cámaras */}
            {
                openAfiliaciones && (
                    <div>
                        <div className="overllay" onClick={() => setOpenAfiliaciones(false)}></div>
                        <div className="overllay-contenedor">
                            <div style={{ minWidth: isLargeDevice ? '520px' : '95vw', maxWidth: isLargeDevice ? '520px' : '95vw', minHeight: '75vh', maxHeight: '80vh', backgroundColor: '#FFFFFF', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8CE', paddingBottom: '12px' }}>
                                    <h1 style={{ margin: '0', fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: '#41431B' }}>AFILIACIONES A CÁMARAS</h1>
                                    <div
                                        style={{ width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onClick={() => { setOpenInformacionAfiliaciones(true) }}
                                        title="Conocer estados de afiliación"
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#41431B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </div>
                                </div>
                                <div style={{ width: '100%', flex: 1, overflowY: 'auto', padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {
                                        (!afiliaciones || afiliaciones.length === 0) && (
                                            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#777' }}>
                                                <p style={{ margin: 0, fontSize: '14px', fontFamily: 'Poppins' }}>No se registran afiliaciones activas con cámaras de comercio.</p>
                                            </div>
                                        )
                                    }
                                    {
                                        afiliaciones?.map(
                                            (a, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', minHeight: '60px', justifyContent: 'space-between', backgroundColor: '#F8F9F3', border: '1px solid #CCD5AE', borderRadius: '10px', padding: '8px 14px', boxSizing: 'border-box' }}>
                                                    <div style={{ width: '44px', height: '44px', flexShrink: 0 }}>
                                                        <img src={a.logo || defaultLogo} alt="Logo Cámara" style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#FFFFFF', borderRadius: '50%', border: '1px solid #CCD5AE' }} />
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <h6
                                                            style={{ margin: '0', fontSize: '14px', fontWeight: 600, color: '#353816', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                            onClick={() => { navigate(`/organizacion/${a.id}`); navigate(0) }}
                                                        >
                                                            {a.nombre}
                                                        </h6>
                                                        <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#777' }}>Fecha: <strong>{a.fecha ? a.fecha.split('T')[0] : 'N/D'}</strong></p>
                                                    </div>
                                                    <div style={{ width: '28px', height: '28px', flexShrink: 0 }}>
                                                        <img
                                                            src={
                                                                a.estado === 'ACTIVA' ? activaAUrl
                                                                    : a.estado === 'INACTIVA' ? inactivaAUrl
                                                                        : suspendidaAUrl
                                                            }
                                                            alt={a.estado}
                                                            title={`Estado: ${a.estado}`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', borderTop: '1px solid #E2E8CE', paddingTop: '12px' }}>
                                    <button
                                        type="button"
                                        className="btn-accion-2"
                                        onClick={() => { setOpenAfiliaciones(false) }}
                                        style={{ padding: '8px 24px' }}
                                    >
                                        <strong>CERRAR</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal: Glosario de Estados de Afiliación */}
            {
                openInformacionAfiliaciones && (
                    <div>
                        <div className="overllay" onClick={() => setOpenInformacionAfiliaciones(false)}></div>
                        <div className="overllay-contenedor">
                            <div style={{ width: isLargeDevice ? '520px' : '95vw', backgroundColor: 'white', borderRadius: '16px', padding: '24px', display: 'flex', gap: '1.2rem', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                <h2 style={{ margin: 0, fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: '#41431B', textAlign: 'center' }}>ESTADOS DE AFILIACIÓN GREMIAL</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#F8F9F3', padding: '12px', borderRadius: '10px', border: '1px solid #CCD5AE' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <img src={activaAUrl} alt="Activa" style={{ width: '22px', height: '22px' }} />
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '14px', color: '#2E7D32', fontFamily: 'Poppins' }}>ACTIVA</strong>
                                            <p style={{ margin: 0, fontSize: '12px', color: '#555', lineHeight: 1.4 }}>La organización cuenta con acreditación y vinculación vigente ante la Cámara de Comercio correspondiente.</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#F8F9F3', padding: '12px', borderRadius: '10px', border: '1px solid #CCD5AE' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF9C4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <img src={inactivaAUrl} alt="Inactiva" style={{ width: '22px', height: '22px' }} />
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '14px', color: '#F57F17', fontFamily: 'Poppins' }}>INACTIVA (EN REVISIÓN)</strong>
                                            <p style={{ margin: 0, fontSize: '12px', color: '#555', lineHeight: 1.4 }}>La solicitud de afiliación ha sido ingresada y se encuentra en proceso de validación documental.</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#F8F9F3', padding: '12px', borderRadius: '10px', border: '1px solid #CCD5AE' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFEBEE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <img src={suspendidaAUrl} alt="Suspendida" style={{ width: '22px', height: '22px' }} />
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '14px', color: '#C62828', fontFamily: 'Poppins' }}>SUSPENDIDA</strong>
                                            <p style={{ margin: 0, fontSize: '12px', color: '#555', lineHeight: 1.4 }}>La vigencia de la afiliación ha vencido o fue pausada temporalmente por la Cámara de Comercio.</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                                    <button
                                        type="button"
                                        className="btn-accion-2"
                                        onClick={() => { setOpenInformacionAfiliaciones(false) }}
                                        style={{ padding: '8px 24px' }}
                                    >
                                        <strong>ENTENDIDO</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal: Personalización de Imágenes (Logo y Banner) */}
            {
                openModalFotos && (
                    <div>
                        <div className="overllay" onClick={() => setOpenModalFotos(false)}></div>
                        <div className="overllay-contenedor">
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '24px',
                                width: '380px',
                                maxWidth: '90vw',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                textAlign: 'center',
                                boxSizing: 'border-box'
                            }}>
                                <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', color: '#41431B', margin: '0 0 6px 0', fontWeight: 700 }}>
                                    Personalizar Fotografías
                                </h3>
                                <p style={{ fontFamily: 'Poppins', fontSize: '12px', color: '#666', margin: '0 0 18px 0' }}>
                                    Selecciona el elemento institucional que deseas actualizar:
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div
                                        onClick={handlePickLogo}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #CCD5AE',
                                            backgroundColor: '#F8F9F3',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ECEFD9'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F8F9F3'}
                                    >
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: '1px solid #CCD5AE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#41431B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                <polyline points="21 15 16 10 5 21"></polyline>
                                            </svg>
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '13px', color: '#41431B', fontFamily: 'Poppins' }}>Cambiar Foto de Perfil (Logo)</strong>
                                            <span style={{ fontSize: '11px', color: '#777' }}>Formatos permitidos: PNG, JPG o WEBP</span>
                                        </div>
                                    </div>

                                    <div
                                        onClick={handlePickBanner}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #CCD5AE',
                                            backgroundColor: '#F8F9F3',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ECEFD9'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F8F9F3'}
                                    >
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: '1px solid #CCD5AE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#41431B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                <circle cx="12" cy="13" r="4"></circle>
                                            </svg>
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '13px', color: '#41431B', fontFamily: 'Poppins' }}>Cambiar Portada (Banner)</strong>
                                            <span style={{ fontSize: '11px', color: '#777' }}>Formatos permitidos: PNG, JPG o WEBP</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOpenModalFotos(false)}
                                    className="btn-accion-2"
                                    style={{ marginTop: '16px', width: '100%', padding: '9px', borderRadius: '8px' }}
                                >
                                    <strong>CANCELAR</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                loading && (
                    <Loader />
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
