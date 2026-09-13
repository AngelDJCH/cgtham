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


export default function Organizacion() {

    const activaAUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZWNrIj48cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiLz48L3N2Zz4='
    const inactivaAUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgiPjxwYXRoIGQ9Ik0xOCA2IDYgMTgiLz48cGF0aCBkPSJtNiA2IDEyIDEyIi8+PC9zdmc+'
    const suspendidaAUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWluZm8iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDE2di00Ii8+PHBhdGggZD0iTTEyIDhoLjAxIi8+PC9zdmc+'


    const verifiedImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYWRnZS1jaGVjayI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0ibTE2IDktNS41IDUuNUw4IDEyIi8+PC9zdmc+'
    const notVerifiedImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNBRUI3ODQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYWRnZS1jaGVjayI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0ibTE2IDktNS41IDUuNUw4IDEyIi8+PC9zdmc+'

    const [openInformacionAfiliaciones, setOpenInformacionAfiliaciones] = useState(false)

    const [openAfiliaciones, setOpenAfiliaciones] = useState(false)

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

    const { user } = useAuth()

    const isMediumDevice = useMediaQuery("(max-width : 768px) or (max-width : 1024px)")

    const handleCreateOfertaEducativa = async () => {

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
            alert('SE PUBLICO LA OFERTA')
        } else if (newOferta === 409) {
            alert('OFERTA EDUCATIVA YA EXISTENTE')
        } else {
            alert('NO SE PUDO PUBLICAR LA OFERTA')
        }
    }


    const [oferta, setOferta] = useState({
        nombre: '',
        duracion: '',
        vision: '',
        mision: '',
        foto: ''
    })

    const handleChangeLogo = async (e) => {
        const logoEvento = e.target.files[0]
        if (logoEvento.size > 5000000) {
            alert('El archivo debe pesar menos que 5 MB')
        } else {
            try {
                var reader = new FileReader()
                reader.onloadend = function () {
                    setOrganizacion({
                        ...organizacion,
                        logo: reader.result
                    })
                }
                reader.readAsDataURL(logoEvento)

                reader.onload = async () => {
                    const res = await uploadImgLogo(reader.result, user?.organizacion)
                    console.log(res)
                    if (!res) alert('No se pudo guardar la imagen en cloudinary')
                    if (res) {
                        setOrganizacion({
                            ...organizacion,
                            logo: res
                        })
                        alert('LOGO GUARDADO EXITOSAMENTE')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChangeBanner = (e) => {

        const bannerEvento = e.target.files[0]
        if (bannerEvento.size > 5000000) {
            alert('El archivo debe pesar menos que 5 MB')
        } else {
            try {
                var reader = new FileReader()
                reader.onloadend = function () {
                    setOrganizacion({
                        ...organizacion,
                        banner: reader.result
                    })
                }
                reader.readAsDataURL(bannerEvento)

                reader.onload = async () => {
                    const res = await uploadImgBanner(reader.result, user?.organizacion)
                    console.log(res)
                    if (!res) alert('No se pudo guardar la imagen en cloudinary')
                    if (res) {
                        setOrganizacion({
                            ...organizacion,
                            banner: res
                        })
                        alert('BANNER GUARDADO EXITOSAMENTE')
                    }
                }
            } catch (error) {
                console.log(error)
            }
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

        // if (openDatosOrganizacion) {

        // } else if (openDatosExtra) {

        // } else if (openDatosContacto) {

        // } else if (openDatosUbicación) {

        // } else if (openDatosSeguridad) {

        // } else {

        // }
    }

    const handleUpdateOrganizacionData = async () => {

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
        navigate(0)
        alert(notificacionData)
    }

    useEffect(() => {
        const organizacionData = async () => {
            const resOrg = await getOrganizacion(id)
            setOrganizacion(resOrg)
            const resCon = await getContacto(resOrg?.id_contacto)
            setContacto(resCon)
            const resDir = await getDireccion(resOrg?.id_direccion)
            setDireccion(resDir)
            const cloud = await getCloudDinary(resOrg?.id)
            setCloudinary(cloud)
            setSelectTipo(resOrg?.tipo)
            setSelectSector(resOrg?.sector)
            setSelectGiro(resOrg?.giro)
            console.log(resOrg)
            if (resOrg?.tipo != 'Comité') {
                if (resOrg?.tipo === 'Empresa') {
                    const resEm = await getEmpresa(resOrg?.id)
                    setEmpresa(resEm)
                } else if (resOrg?.tipo === 'Escuela') {
                    const resEsc = await getEscuela(resOrg?.id)
                    setEscuela(resEsc)
                    const getOfertasEducativas = async () => {
                        const data = await findAllByIdEscuela(resEsc.id)
                        setOfertasEducativas(data)
                    }

                    getOfertasEducativas()
                } else {
                    const resCam = await getCamara(resOrg?.id)
                    setCarama(resCam)
                }
            }
        }

        const getAfiliaciones = async () => {
            const res = await findByIdEmpresa(id)
            setAfiliaciones(res)
        }

        organizacionData()
        getAfiliaciones()
    }, [])
    const isLargeDevice = useMediaQuery('(min-width:992px) or (min-width: 1400px)');

    return (
        <div style={{ marginTop: '100px', marginRight: '50px', width: isMediumDevice ? '100%' : null }}>
            <NavBarAutenticado />
            {
                isLargeDevice && (
                    <div style={{ marginTop: '8rem' }}>
                        <NavUser left='30px' />
                    </div>
                )
            }
            <div className="editar-perfil-contenedor" style={{ width: '100%' }}>
                <div className='seccion1-contenedor' style={{ width: isLargeDevice ? '70%' : '100%', marginRight: isLargeDevice ? '1rem' : null }}>
                    <div className='foto-perfil-contenedor' style={{ marginTop: isMediumDevice ? '20px' : null, width: isMediumDevice ? '100px' : null, height: isMediumDevice ? '100px' : null }}>
                        <input
                            id="logo"
                            style={{ display: 'none' }}
                            type="file"
                            accept=".png"
                            onChange={handleChangeLogo}
                        />
                        <img src={organizacion?.logo} style={{ backgroundColor: 'white' }} />
                        {
                            user.organizacion === organizacion?.id && (
                                <label htmlFor="logo">
                                    <div style={{ width: '100%', height: '0px', transform: 'translateY(-70px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZS11cC1pY29uIGx1Y2lkZS1pbWFnZS11cCI+PHBhdGggZD0iTTEwLjMgMjFINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgxNGEyIDIgMCAwIDEgMiAydjEwbC0zLjEtMy4xYTIgMiAwIDAgMC0yLjgxNC4wMTRMNiAyMSIvPjxwYXRoIGQ9Im0xNCAxOS41IDMtMyAzIDMiLz48cGF0aCBkPSJNMTcgMjJ2LTUuNSIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PC9zdmc+"
                                            style={{ position: 'absolute', display: 'flex', width: '40px', height: '40px', cursor: 'pointer' }}
                                        />
                                    </div>
                                </label>
                            )
                        }
                    </div>
                    <div className='img-banner-contenedor' style={{ width: '100%' }}>
                        <input
                            id="banner"
                            type="file"
                            accept=".png"
                            onChange={handleChangeBanner}
                            style={{ display: 'none' }}
                        />
                        <img src={organizacion?.banner} />
                        {
                            user.organizacion === organizacion?.id && (
                                <label htmlFor="banner">
                                    <div style={{ width: '100%', height: '0px', transform: 'translateY(-70px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZS11cC1pY29uIGx1Y2lkZS1pbWFnZS11cCI+PHBhdGggZD0iTTEwLjMgMjFINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgxNGEyIDIgMCAwIDEgMiAydjEwbC0zLjEtMy4xYTIgMiAwIDAgMC0yLjgxNC4wMTRMNiAyMSIvPjxwYXRoIGQ9Im0xNCAxOS41IDMtMyAzIDMiLz48cGF0aCBkPSJNMTcgMjJ2LTUuNSIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PC9zdmc+"
                                            style={{ position: 'absolute', display: 'flex', width: '40px', height: '40px', cursor: 'pointer' }}
                                        />
                                    </div>
                                </label>
                            )
                        }
                    </div>
                    {
                        organizacion?.tipo === 'Empresa' && (
                            <div style={{ display: 'flex', position: 'absolute', justifyContent: 'end', width: isLargeDevice ? '65%' : '100%' }}>
                                <div
                                    onClick={() => { setOpenAfiliaciones(true) }}
                                    style={{
                                        width: '40px', height: '40px', border: 'none', backgroundColor: 'transparent', flexShrink: 0, cursor: 'pointer'
                                    }}
                                >
                                    <img
                                        src={afiliaciones?.length <= 0 ? verifiedImg : notVerifiedImg}
                                        style={{
                                            backgroundColor: `${afiliaciones?.length <= 0 ? '#AEB784' : '#41431B'}`,
                                            width: '100%', height: '100%', flexShrink: 0, borderRadius: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    }
                    <div className='contenedor-informacion-botones' >
                        <div className='informacion-contenedor'>
                            <h1 style={{ textAlign: isMediumDevice ? 'center' : null }}>{organizacion?.nombre_comercial}</h1>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                <p style={{ minWidth: '90%', maxWidth: '90%', textAlign: 'justify' }}>{organizacion?.descripcion}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    openDatos && (
                        <div className="seccion1-contenedor" style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', width: isLargeDevice ? '70%' : '100%', marginTop: '1rem', justifyContent: 'center', alignItems: 'center', marginRight: isLargeDevice ? '1rem' : null }}>
                            <div className="datos" style={{ backgroundColor: '#41431B', width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h1 style={{ color: 'white' }}>INFORMACIÓN</h1>
                            </div>
                            <div style={{ padding: '1rem', display: 'flex', gap: '1.2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                                    {
                                        openDatos && user.organizacion === organizacion?.id && (
                                            <button
                                                className="btn-accion-2"
                                                style={{ width: '100px', height: '25px' }}
                                                onClick={() => {
                                                    setOpenDatos(false)
                                                }}
                                            ><strong>EDITAR</strong></button>
                                        )
                                    }
                                </div>
                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Tipo: </strong>
                                        {
                                            organizacion?.tipo
                                        }
                                    </h6>
                                </div>
                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Sector: </strong>
                                        {
                                            organizacion?.sector
                                        }
                                    </h6>
                                </div>
                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Tamaño: </strong>
                                        {
                                            organizacion?.tamaño
                                        }
                                    </h6>
                                </div>
                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Giro: </strong>
                                        {
                                            organizacion?.giro
                                        }
                                    </h6>
                                </div>
                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>RFC: </strong>
                                        {
                                            organizacion?.rfc
                                        }
                                    </h6>
                                </div>
                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Correo: </strong>
                                        {
                                            contacto?.correo
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Telefono: </strong>
                                        {
                                            contacto?.telefono
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Calle: </strong>
                                        {
                                            direccion?.calle
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Numero: </strong>
                                        {
                                            direccion?.numero
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Colonia: </strong>
                                        {
                                            direccion?.colonia
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Codigo Postal: </strong>
                                        {
                                            direccion?.codigo_postal
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Ciudad: </strong>
                                        {
                                            direccion?.ciudad
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Estado: </strong>
                                        {
                                            direccion?.estado
                                        }
                                    </h6>
                                </div>

                                <div className="tarjeta-dato">
                                    <h6>
                                        <strong>Pais: </strong>
                                        {
                                            direccion?.pais
                                        }
                                    </h6>
                                </div>

                                {
                                    camara && (
                                        <div className="tarjeta-dato">
                                            <h6>
                                                <strong>Nombre: </strong>
                                                {
                                                    camara?.nombre
                                                }
                                            </h6>
                                        </div>

                                    )
                                }
                                {
                                    camara && (
                                        <div className="tarjeta-dato">
                                            <h6>
                                                <strong>Presidente: </strong>
                                                {
                                                    camara?.presidente
                                                }
                                            </h6>
                                        </div>

                                    )
                                }

                                {
                                    empresa && (
                                        <div className="tarjeta-dato">
                                            <h6>
                                                <strong>Razon Social: </strong>
                                                {
                                                    empresa?.razon_social
                                                }
                                            </h6>
                                        </div>

                                    )
                                }

                                {
                                    empresa && (
                                        <div className="tarjeta-dato">
                                            <h6>
                                                <strong>Regimen Fiscal: </strong>
                                                {
                                                    empresa?.regimen_fiscal
                                                }
                                            </h6>
                                        </div>

                                    )
                                }

                                {
                                    empresa && (
                                        <div className="tarjeta-dato">
                                            <h6>
                                                <strong>Direccion Fiscal: </strong>
                                                {
                                                    empresa?.direccion_fiscal
                                                }
                                            </h6>
                                        </div>

                                    )
                                }

                                {
                                    escuela && (
                                        <div className="tarjeta-dato">
                                            <h6>
                                                <strong>Tipo Institucion: </strong>
                                                {
                                                    escuela?.tipo_institucion
                                                }
                                            </h6>
                                        </div>

                                    )
                                }

                                {
                                    escuela && (
                                        <div className="tarjeta-dato">
                                            <h6>
                                                <strong>Sitio Web: </strong>
                                                <a href={
                                                    escuela?.url_sitio
                                                }>IR</a>
                                            </h6>
                                        </div>

                                    )
                                }
                            </div>
                        </div>
                    )
                }

                {
                    !openDatos && (
                        <div className="seccion1-contenedor" style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', width: isLargeDevice ? '70%' : '100%', marginTop: '1rem', justifyContent: 'center', alignItems: 'start', marginRight: isLargeDevice ? '1rem' : null }}>
                            <div className="datos" style={{ backgroundColor: '#41431B', width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h1 style={{ color: 'white' }}>DATOS</h1>
                            </div>

                            {
                                //SUGERENCIA VISUAL DE MEJORA - CIFS -> Author
                            }

                            <div
                                className="contenedor-datos-g"
                            >
                                {
                                    //Titulo
                                }
                                <div
                                    className="titulo-datos"
                                >
                                    <h1>Organización</h1>
                                    <img src={url_icon} onClick={() => { handleClicUpdateOpen("organización") }} />
                                </div>
                                {
                                    //Cuerpo -> Datos
                                }
                                {
                                    openDatosOrganizacion && (
                                        <div
                                            className="contenedor-datos-i"
                                        >
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Nombre comercial: </h6>
                                                <input type="text" placeholder="Nombre comercial" defaultValue={organizacion?.nombre_comercial} onChange={(e) => { setOrganizacion({ ...organizacion, nombre_comercial: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Descripción: </h6>
                                                <textarea type="text" placeholder="Descripcion" defaultValue={organizacion?.descripcion} onChange={(e) => { setOrganizacion({ ...organizacion, descripcion: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Tipo: </h6>
                                                <select onChange={(e) => { setSelectTipo(e.target.value); setSelectSector('SECTOR') }}>
                                                    <option selected={organizacion?.tipo === 'Escuela'} disabled={organizacion?.tipo != 'Escuela'}>
                                                        Escuela
                                                    </option>
                                                    <option selected={organizacion?.tipo === 'Empresa'} disabled={organizacion?.tipo != 'Empresa'}>
                                                        Empresa
                                                    </option>
                                                    <option selected={organizacion?.tipo === 'Cámara de Comercio'} disabled={organizacion?.tipo != 'Cámara de Comercio'}>
                                                        Cámara de Comercio
                                                    </option>
                                                    {
                                                        user.tipo === 'Comité' && (
                                                            <option selected={organizacion?.tipo === 'Comité'}>
                                                                Comité (ADMINISTRADOR)
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                {
                                                    user.tipo != 'Comité' && (
                                                        <h6 style={{ margin: 0, padding: 0 }}>Sector: </h6>
                                                    )
                                                }
                                                {
                                                    user.tipo != 'Comité' && (
                                                        <select onChange={(e) => { setSelectSector(e.target.value); setOrganizacion({ ...organizacion, sector: e.target.value }) }}>
                                                            <option selected>
                                                                SECTOR
                                                            </option>
                                                            {
                                                                selectTipo != 'TIPO' && sectores.filter(seleccionado => seleccionado.tipo === selectTipo).map(
                                                                    s => <option key={s.id} selected={organizacion?.sector === s.nombre}>
                                                                        {s.nombre}
                                                                    </option>
                                                                )
                                                            }
                                                        </select>
                                                    )
                                                }
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                {
                                                    user.tipo != 'Comité' && (
                                                        <h6 style={{ margin: 0, padding: 0 }}>Giro: </h6>
                                                    )
                                                }
                                                {
                                                    user.tipo != 'Comité' && (
                                                        <select onChange={(e) => { setOrganizacion({ ...organizacion, giro: e.target.value }) }}>
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
                                                                            g => <option selected={organizacion?.giro === g.nombre}>{g.nombre}</option>
                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        </select>
                                                    )
                                                }
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Tamaño: </h6>
                                                <input type="number" placeholder="Tamaño" defaultValue={organizacion?.tamaño} onChange={(e) => { setOrganizacion({ ...organizacion, tamaño: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>RFC: </h6>
                                                <input type="text" placeholder="RFC" defaultValue={organizacion?.rfc} onChange={(e) => { setOrganizacion({ ...organizacion, rfc: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>



                            {
                                user.tipo != 'Comité' && (
                                    <div
                                        className="contenedor-datos-g"
                                    >
                                        <div
                                            className="titulo-datos"
                                        >
                                            <h1>Extra</h1>
                                            <img src={url_icon} onClick={() => { handleClicUpdateOpen("extra") }} />
                                        </div>
                                        {
                                            openDatosExtra && (
                                                <div
                                                    className="contenedor-datos-i"
                                                >
                                                    {
                                                        selectTipo === 'Empresa' && (
                                                            <div
                                                                className="cuerpo-datos"
                                                            >
                                                                <h6 style={{ margin: 0, padding: 0 }}>Razón social: </h6>
                                                                <input placeholder="Razón social" defaultValue={empresa?.razon_social} onChange={(e) => { setEmpresa({ ...empresa, razon_social: e.target.value }) }} />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        selectTipo === 'Empresa' && (
                                                            <div
                                                                className="cuerpo-datos"
                                                            >
                                                                <h6 style={{ margin: 0, padding: 0 }}>Regimen fiscal: </h6>
                                                                <input placeholder="Regimen fiscal" defaultValue={empresa?.regimen_fiscal} onChange={(e) => { setEmpresa({ ...empresa, regimen_fiscal: e.target.value }) }} />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        selectTipo === 'Empresa' && (
                                                            <div
                                                                className="cuerpo-datos"
                                                            >
                                                                <h6 style={{ margin: 0, padding: 0 }}>Dirección fiscal: </h6>
                                                                <input placeholder="Dirección fiscal" defaultValue={empresa?.direccion_fiscal} onChange={(e) => { setEmpresa({ ...empresa, direccion_fiscal: e.target.value }) }} />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        selectTipo === 'Escuela' && (
                                                            <div
                                                                className="cuerpo-datos"
                                                            >
                                                                <h6 style={{ margin: 0, padding: 0 }}>Tipo de Institución: </h6>
                                                                <select onChange={(e) => { setEscuela({ ...escuela, tipo_institucion: e.target.value }) }}>
                                                                    <option>TIPO</option>
                                                                    <option selected={escuela?.tipo_institucion === 'Pública'}>Publica</option>
                                                                    <option selected={escuela?.tipo_institucion === 'Privada'}>Privada</option>
                                                                </select>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        selectTipo === 'Escuela' && (
                                                            <div
                                                                className="cuerpo-datos"
                                                            >
                                                                <h6 style={{ margin: 0, padding: 0 }}>URL de Sitio Oficial: </h6>
                                                                <input placeholder="Sitio web" defaultValue={escuela?.url_sitio} onChange={(e) => { setEscuela({ ...escuela, url_sitio: e.target.value }) }} />
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        selectTipo === 'Cámara de Comercio' && (
                                                            <div
                                                                className="cuerpo-datos"
                                                            >
                                                                <h6 style={{ margin: 0, padding: 0 }}>Nombre: </h6>
                                                                <input placeholder="Nombre" defaultValue={camara?.nombre} onChange={(e) => { setCarama({ ...camara, nombre: e.target.value }) }} />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        selectTipo === 'Cámara de Comercio' && (
                                                            <div
                                                                className="cuerpo-datos"
                                                            >
                                                                <h6 style={{ margin: 0, padding: 0 }}>Nombre del presidente: </h6>
                                                                <input placeholder="Presidente" defaultValue={camara?.presidente} onChange={(e) => { setCarama({ ...camara, presidente: e.target.value }) }} />
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }


                            <div
                                className="contenedor-datos-g"
                            >
                                <div
                                    className="titulo-datos"
                                >
                                    <h1>Contacto</h1>
                                    <img src={url_icon} onClick={() => { handleClicUpdateOpen("contacto") }} />
                                </div>
                                {
                                    openDatosContacto && (
                                        <div
                                            className="contenedor-datos-i"
                                        >
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Correo: </h6>
                                                <input type="email" placeholder="Corre" defaultValue={contacto?.correo} onChange={(e) => { setContacto({ ...contacto, correo: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Telefono: </h6>
                                                <input type="text" placeholder="Telefono" defaultValue={contacto?.telefono} onChange={(e) => { setContacto({ ...contacto, telefono: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div
                                className="contenedor-datos-g"
                            >
                                <div
                                    className="titulo-datos"
                                >
                                    <h1>Seguridad</h1>
                                    <img src={url_icon} onClick={() => { handleClicUpdateOpen("seguridad") }} />

                                </div>
                                {
                                    openDatosSeguridad && (
                                        <div
                                            className="contenedor-datos-i"
                                        >
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Contraseña:</h6>
                                                <input type="password" placeholder="Nueva contraseña" id="contrasenia" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div
                                className="contenedor-datos-g"
                            >
                                <div
                                    className="titulo-datos"
                                >
                                    <h1>Ubicación</h1>
                                    <img src={url_icon} onClick={() => { handleClicUpdateOpen("ubicación") }} />

                                </div>
                                {
                                    openDatosUbicación && (
                                        <div
                                            className="contenedor-datos-i"
                                        >
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Calle: </h6>
                                                <input type="text" placeholder="Calle" defaultValue={direccion?.calle} onChange={(e) => { setDireccion({ ...direccion, calle: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Numero: </h6>
                                                <input type="number" placeholder="Numero" defaultValue={direccion?.numero} onChange={(e) => { setDireccion({ ...direccion, numero: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Colonia: </h6>
                                                <input type="text" placeholder="Colonia" defaultValue={direccion?.colonia} onChange={(e) => { setDireccion({ ...direccion, colonia: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Ciudad: </h6>
                                                <input type="text" placeholder="Ciudad" defaultValue={direccion?.ciudad} onChange={(e) => { setDireccion({ ...direccion, ciudad: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>CP: </h6>
                                                <input type="number" placeholder="CP" defaultValue={direccion?.codigo_postal} onChange={(e) => { setDireccion({ ...direccion, codigo_postal: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Estado: </h6>
                                                <input type="Text" placeholder="Estado" defaultValue={direccion?.estado} onChange={(e) => { setDireccion({ ...direccion, estado: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Pais: </h6>
                                                <input type="text" placeholder="Pais" defaultValue={direccion?.pais} onChange={(e) => { setDireccion({ ...direccion, pais: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div
                                className="contenedor-datos-g"
                            >
                                <div
                                    className="titulo-datos"
                                >
                                    <h1>Cloudinary - Hosting</h1>
                                    <img src={url_icon} onClick={() => { handleClicUpdateOpen("cloudinary") }} />

                                </div>
                                {
                                    openDatosCloudinary && (
                                        <div
                                            className="contenedor-datos-i"
                                        >
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Nombre: </h6>
                                                <input type="password" placeholder="Cloud name" defaultValue={cloudinary?.nombre} onChange={(e) => { setCloudinary({ ...cloudinary, nombre: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Clave: </h6>
                                                <input type="password" placeholder="API Key" defaultValue={cloudinary?.clave} onChange={(e) => { setCloudinary({ ...cloudinary, clave: e.target.value }) }} />
                                            </div>
                                            <div
                                                className="cuerpo-datos"
                                            >
                                                <h6 style={{ margin: 0, padding: 0 }}>Clave secreta: </h6>
                                                <input type="password" placeholder="API Secret" defaultValue={cloudinary?.clave_secreta} onChange={(e) => { setCloudinary({ ...cloudinary, clave_secreta: e.target.value }) }} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>



                            {/* <div className="datos" style={{ backgroundColor: 'white', padding: '1rem', margin: '0.4rem', borderRadius: '10px', width: '220px' }}>
                                <h1>Datos Organizacion</h1>
                                <div className="contenedor-input">
                                    <h6 style={{ margin: 0, padding: 0 }}>Nombre comercial: </h6>
                                    <input type="text" placeholder="Nombre comercial" defaultValue={organizacion?.nombre_comercial} onChange={(e) => { setOrganizacion({ ...organizacion, nombre_comercial: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0 }}>Descripción: </h6>
                                    <input type="text" placeholder="Descripcion" defaultValue={organizacion?.descripcion} onChange={(e) => { setOrganizacion({ ...organizacion, descripcion: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0 }}>Tipo: </h6>
                                    <select onChange={(e) => { setSelectTipo(e.target.value); setSelectSector('SECTOR') }}>
                                        <option selected={organizacion?.tipo === 'Escuela'} disabled={organizacion?.tipo != 'Escuela'}>
                                            Escuela
                                        </option>
                                        <option selected={organizacion?.tipo === 'Empresa'} disabled={organizacion?.tipo != 'Empresa'}>
                                            Empresa
                                        </option>
                                        <option selected={organizacion?.tipo === 'Cámara de Comercio'} disabled={organizacion?.tipo != 'Cámara de Comercio'}>
                                            Cámara de Comercio
                                        </option>
                                        {
                                            user.tipo === 'Comité' && (
                                                <option selected={organizacion?.tipo === 'Comité'}>
                                                    Comité (ADMINISTRADOR)
                                                </option>
                                            )
                                        }
                                    </select>
                                    {
                                        user.tipo != 'Comité' && (
                                            <h6 style={{ margin: 0, padding: 0 }}>Sector: </h6>
                                        )
                                    }
                                    {
                                        user.tipo != 'Comité' && (
                                            <select onChange={(e) => { setSelectSector(e.target.value); setOrganizacion({ ...organizacion, sector: e.target.value }) }}>
                                                <option selected>
                                                    SECTOR
                                                </option>
                                                {
                                                    selectTipo != 'TIPO' && sectores.filter(seleccionado => seleccionado.tipo === selectTipo).map(
                                                        s => <option key={s.id} selected={organizacion?.sector === s.nombre}>
                                                            {s.nombre}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        )
                                    }
                                    {
                                        user.tipo != 'Comité' && (
                                            <h6 style={{ margin: 0, padding: 0 }}>Giro: </h6>
                                        )
                                    }
                                    {
                                        user.tipo != 'Comité' && (
                                            <select onChange={(e) => { setOrganizacion({ ...organizacion, giro: e.target.value }) }}>
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
                                                                g => <option selected={organizacion?.giro === g.nombre}>{g.nombre}</option>
                                                            )
                                                        }
                                                    )
                                                }
                                            </select>
                                        )
                                    }
                                    <h6 style={{ margin: 0, padding: 0 }}>Tamaño: </h6>
                                    <input type="number" placeholder="Tamaño" defaultValue={organizacion?.tamaño} onChange={(e) => { setOrganizacion({ ...organizacion, tamaño: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0 }}>RFC: </h6>
                                    <input type="text" placeholder="RFC" defaultValue={organizacion?.rfc} onChange={(e) => { setOrganizacion({ ...organizacion, rfc: e.target.value }) }} />
                                </div>
                            </div>
                            {
                                user.tipo != 'Comité' && (
                                    <div className="datos" style={{ backgroundColor: 'white', padding: '1rem', margin: '0.4rem', borderRadius: '10px', width: '220px' }}>
                                        <div className="datos" style={{ backgroundColor: 'white', padding: '1rem', margin: '0.4rem', borderRadius: '10px' }}>
                                            <h1>Datos Extra</h1>
                                            <div className="contenedor-input">
                                                {
                                                    selectTipo === 'Empresa' && (
                                                        <div className="datos">
                                                            <h6 style={{ margin: 0, padding: 0 }}>Razón social: </h6>
                                                            <input placeholder="Razón social" defaultValue={empresa?.razon_social} onChange={(e) => { setEmpresa({ ...empresa, razon_social: e.target.value }) }} />
                                                            <h6 style={{ margin: 0, padding: 0 }}>Regimen fiscal: </h6>
                                                            <input placeholder="Regimen fiscal" defaultValue={empresa?.regimen_fiscal} onChange={(e) => { setEmpresa({ ...empresa, regimen_fiscal: e.target.value }) }} />
                                                            <h6 style={{ margin: 0, padding: 0 }}>Dirección fiscal: </h6>
                                                            <input placeholder="Dirección fiscal" defaultValue={empresa?.direccion_fiscal} onChange={(e) => { setEmpresa({ ...empresa, direccion_fiscal: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    selectTipo === 'Escuela' && (
                                                        <div className="datos">
                                                            <h6 style={{ margin: 0, padding: 0 }}>Tipo de Institución: </h6>
                                                            <select onChange={(e) => { setEscuela({ ...escuela, tipo_institucion: e.target.value }) }}>
                                                                <option>TIPO</option>
                                                                <option selected={escuela?.tipo_institucion === 'Pública'}>Publica</option>
                                                                <option selected={escuela?.tipo_institucion === 'Privada'}>Privada</option>
                                                            </select>
                                                            <h6 style={{ margin: 0, padding: 0 }}>URL de Sitio Oficial: </h6>
                                                            <input placeholder="Sitio web" defaultValue={escuela?.url_sitio} onChange={(e) => { setEscuela({ ...escuela, url_sitio: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    selectTipo === 'Cámara de Comercio' && (
                                                        <div className="datos">
                                                            <h6 style={{ margin: 0, padding: 0 }}>Nombre: </h6>
                                                            <input placeholder="Nombre" defaultValue={camara?.nombre} onChange={(e) => { setCarama({ ...camara, nombre: e.target.value }) }} />
                                                            <h6 style={{ margin: 0, padding: 0 }}>Nombre del presidente: </h6>
                                                            <input placeholder="Presidente" defaultValue={camara?.presidente} onChange={(e) => { setCarama({ ...camara, presidente: e.target.value }) }} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="datos" style={{ backgroundColor: 'white', padding: '1rem', margin: '0.4rem', borderRadius: '10px', width: '220px' }}>
                                <h1> Datos Contacto</h1>
                                <div className="contenedor-input">
                                    <h6 style={{ margin: 0, padding: 0 }}>Correo: </h6>
                                    <input type="email" placeholder="Corre" defaultValue={contacto?.correo} onChange={(e) => { setContacto({ ...contacto, correo: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0 }}>Telefono: </h6>
                                    <input type="text" placeholder="Telefono" defaultValue={contacto?.telefono} onChange={(e) => { setContacto({ ...contacto, telefono: e.target.value }) }} />
                                </div>
                                <div className="datos">
                                    <h1>Datos Seguridad</h1>
                                    <div className="contenedor-input">
                                        <h6 style={{ margin: 0, padding: 0 }}>Contraseña:</h6>
                                        <input type="password" placeholder="Nueva contraseña" id="contrasenia" />
                                    </div>
                                </div>
                            </div>
                            <div className="datos" style={{ backgroundColor: 'white', padding: '1rem', margin: '0.4rem', borderRadius: '10px', width: '220px' }}>
                                <h1>Datos Cloudinary</h1>
                                <div className="contenedor-input">
                                    <h6 style={{ margin: 0, padding: 0 }}>Nombre: </h6>
                                    <input type="password" placeholder="Cloud name" defaultValue={cloudinary?.nombre} onChange={(e) => { setCloudinary({ ...cloudinary, nombre: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0 }}>Clave: </h6>
                                    <input type="password" placeholder="API Key" defaultValue={cloudinary?.clave} onChange={(e) => { setCloudinary({ ...cloudinary, clave: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0 }}>Clave secreta: </h6>
                                    <input type="password" placeholder="API Secret" defaultValue={cloudinary?.clave_secreta} onChange={(e) => { setCloudinary({ ...cloudinary, clave_secreta: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="datos" style={{ backgroundColor: 'white', padding: '1rem', margin: '0.4rem', borderRadius: '10px', width: '300px' }}>
                                <h1>Datos Ubicación</h1>
                                <div className="contenedor-input">
                                    <h6 style={{ margin: 0, padding: 0 }}>Calle: </h6>
                                    <input type="text" placeholder="Calle" defaultValue={direccion?.calle} onChange={(e) => { setDireccion({ ...direccion, calle: e.target.value }) }} />
                                    <div className="contenedor-input-doble">
                                        <h6 style={{ margin: 0, padding: 0 }}>Numero: </h6>
                                        <input type="number" placeholder="Numero" style={{ width: '80px' }} defaultValue={direccion?.numero} onChange={(e) => { setDireccion({ ...direccion, numero: e.target.value }) }} />
                                        <h6 style={{ margin: 0, padding: 0 }}>Colonia: </h6>
                                        <input type="text" placeholder="Colonia" style={{ width: '100px' }} defaultValue={direccion?.colonia} onChange={(e) => { setDireccion({ ...direccion, colonia: e.target.value }) }} />
                                    </div>
                                    <div className="contenedor-input-doble">
                                        <h6 style={{ margin: 0, padding: 0 }}>Ciudad: </h6>
                                        <input type="text" placeholder="Ciudad" style={{ width: '110px' }} defaultValue={direccion?.ciudad} onChange={(e) => { setDireccion({ ...direccion, ciudad: e.target.value }) }} />
                                        <h6 style={{ margin: 0, padding: 0 }}>CP: </h6>
                                        <input type="number" placeholder="CP" style={{ width: '70px' }} defaultValue={direccion?.codigo_postal} onChange={(e) => { setDireccion({ ...direccion, codigo_postal: e.target.value }) }} />
                                    </div>
                                    <div className="contenedor-input-doble">
                                        <h6 style={{ margin: 0, padding: 0 }}>Estado: </h6>
                                        <input type="Text" placeholder="Estado" style={{ width: '85px' }} defaultValue={direccion?.estado} onChange={(e) => { setDireccion({ ...direccion, estado: e.target.value }) }} />
                                        <h6 style={{ margin: 0, padding: 0 }}>Pais: </h6>
                                        <input type="text" placeholder="Pais" style={{ width: '90px' }} defaultValue={direccion?.pais} onChange={(e) => { setDireccion({ ...direccion, pais: e.target.value }) }} />
                                    </div>
                                </div>
                            </div> */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <button className="btn-accion-cancelar-1"
                                    onClick={() => { handleClicUpdateOpen("cancelar"); setOpenDatos(true) }}
                                >
                                    <strong>CANCELAR</strong>
                                </button>
                                <button className="btn-accion-2"
                                    onClick={() => { handleUpdateOrganizacionData() }}
                                >
                                    <strong>GUARDAR</strong>
                                </button>
                            </div>
                        </div>
                    )
                }

                {
                    organizacion?.tipo === 'Escuela' && (
                        <div className="seccion1-contenedor" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1.2rem', flexWrap: 'wrap', width: isLargeDevice ? '70%' : '100%', marginTop: '1rem', alignItems: 'start', marginRight: isLargeDevice ? '1rem' : null }}>
                            <div className="datos" style={{ backgroundColor: '#41431B', width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h1 style={{ color: 'white' }}>OFERTA EDUCATIVA</h1>
                            </div>
                            {
                                /*
                                <Carrera o oferta educativa>
                                 -> Imagen
                                 -> Nombre
                                 -> Descripcion
                                 -> Duración
                                 -> Perfil del egresado
                                */
                            }
                            <div style={{ display: 'flex', gap: '1rem', height: 'auto', padding: '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {
                                    ofertasEducativas?.length === 0 && (
                                        <p
                                            style={{ width: '100%', textAlign: 'center', fontFamily: 'emoji', fontSize: '18px' }}
                                        >SIN OFERTAS EDUCATIVAS DISPONIBLES...</p>
                                    )
                                }

                                {
                                    ofertasEducativas?.map(
                                        oferta =>
                                            <div style={{ width: '200px', backgroundColor: 'white', borderRadius: '0px 0px 10px 10px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div style={{ width: '50px', height: '50px' }}>
                                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ncmFkdWF0aW9uLWNhcC1pY29uIGx1Y2lkZS1ncmFkdWF0aW9uLWNhcCI+PHBhdGggZD0iTTIxLjQyIDEwLjkyMmExIDEgMCAwIDAtLjAxOS0xLjgzOEwxMi44MyA1LjE4YTIgMiAwIDAgMC0xLjY2IDBMMi42IDkuMDhhMSAxIDAgMCAwIDAgMS44MzJsOC41NyAzLjkwOGEyIDIgMCAwIDAgMS42NiAweiIvPjxwYXRoIGQ9Ik0yMiAxMHY2Ii8+PHBhdGggZD0iTTYgMTIuNVYxNmE2IDMgMCAwIDAgMTIgMHYtMy41Ii8+PC9zdmc+"
                                                            style={{ backgroundColor: '#41431B', width: '100%', height: '100%' }}
                                                        />
                                                    </div>
                                                    <div style={{ width: '150px', height: '50px', backgroundColor: '#AEB784', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h6 style={{ color: '#41431B', textAlign: 'center', margin: 0 }}>{oferta?.nombre}</h6>
                                                    </div>
                                                </div>

                                                <div style={{ padding: '0.3rem' }}>
                                                    <div>
                                                        <h6 style={{ margin: 0 }}>Descripción:</h6>
                                                        <textarea value={oferta?.descripcion} style={{ width: '97%', minWidth: '97%', maxWidth: '97%', height: '50px', minHeight: '50px', maxHeight: '50px', border: 'none' }} />
                                                        <h6 style={{ margin: 0 }}>Duración:</h6>
                                                        <p>{`${oferta?.duracion} años`}</p>
                                                    </div>
                                                    <div>
                                                        <h6 style={{ margin: 0 }}>Perfil egresado:</h6>
                                                        <textarea value={oferta?.perfil} style={{ width: '97%', minWidth: '97%', maxWidth: '97%', height: '50px', minHeight: '50px', maxHeight: '50px', border: 'none' }} />
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                }
                                {
                                    user.tipo === 'Escuela' && organizacion?.id === user.organizacion && (
                                        <div>
                                            <button className="btn-accion-2"
                                                onClick={() => {
                                                    setOpenCreateOfertaEducativa(true)
                                                }}
                                            ><strong>AGREGAR</strong></button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>

            {
                openCreateOfertaEducativa && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div className="formulario-contenedor" style={{ height: isSmallDevice ? '100%' : null }}>
                                <div className="titulo-formulario"><h1>NUEVA OFERTA EDUCATIVA</h1></div>
                                <div className="formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                        <div className="contenedor-datos-interno">
                                            <h6>Nombre:</h6>
                                            <input placeholder="Nombre de la carrera o oferta educativa" id="nombre_oferta" />

                                            <h6>Duración:</h6>
                                            <input type="number" placeholder="Duración de la carrera o oferta educativa (años - Ejemplo: 4.5)" id="duracion_oferta" />

                                            <h6>Descripción:</h6>
                                            <textarea placeholder="Descripción de la carrera o oferta educativa" id="descripcion_oferta" />

                                            <h6>Perfil del egresado:</h6>
                                            <textarea placeholder="Perfil deñ egresado de la carrera o oferta educativa - Separados por ," id="perfil_oferta" />
                                        </div>
                                    </div>
                                    {
                                        isMediumDevice && (
                                            <div style={{ width: '250px', height: '100%' }}>
                                                <p style={{ textAlign: 'justify' }}><strong>Nota: </strong>
                                                    Una vez realizada publicada la oferta educativa, no se podran realizar modificaciones por el momento. Se recomienda revisar dicha oferta educativa antes de ser publicada.<br></br>
                                                    En caso de presentar algún problema con el sistema o tener dudas, puedes reportarlo a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div style={{ width: '100%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                                    <button className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCreateOfertaEducativa(false) }}
                                    >
                                        <strong>
                                            CERRAR
                                        </strong>
                                    </button>
                                    <button
                                        className="btn-accion-2"
                                        onClick={() => { handleCreateOfertaEducativa() }}
                                    >
                                        <strong>
                                            PUBLICAR
                                        </strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    // <div>
                    //     <div className="overllay"></div>
                    //     <div className="overllay-contenedor">
                    //         <div style={{ width: '650px', height: '350px', backgroundColor: 'white', borderRadius: '10px', padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    //             <div>
                    //                 <h1 style={{ textAlign: 'center' }}>NUEVA OFERTA EDUCATIVA</h1>

                    //                 <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    //                     <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                    //                         <div>
                    //                             <h6>Nombre:</h6>
                    //                             <input placeholder="Nombre de la carrera o oferta educativa" id="nombre_oferta" />
                    //                         </div>


                    //                         <div>
                    // <h6>Duración:</h6>
                    // <input placeholder="Duración de la carrera o oferta educativa (años)" id="duracion_oferta" />
                    //                         </div>
                    //                     </div>

                    //                     <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                    //                         <div>
                    // <h6>Descripción:</h6>
                    // <input placeholder="Descripción de la carrera o oferta educativa" id="descripcion_oferta" />
                    //                         </div>
                    //                         <div>
                    // <h6>Perfil del egresado:</h6>
                    // <input placeholder="Perfil deñ egresado de la carrera o oferta educativa" id="perfil_oferta" />
                    //                         </div>
                    //                     </div>
                    //                 </div>

                    //             </div>
                    //             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    // <button className="btn-accion-cancelar-1"
                    //     onClick={() => { setOpenCreateOfertaEducativa(false) }}
                    // >
                    //     <strong>
                    //         CERRAR
                    //     </strong>
                    // </button>
                    // <button
                    //     className="btn-accion-2"
                    //     onClick={() => { handleCreateOfertaEducativa() }}
                    // >
                    //     <strong>
                    //         PUBLICAR
                    //     </strong>
                    // </button>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                )
            }

            {
                openAfiliaciones && (
                    <div>
                        <div className="overllay">
                        </div>
                        <div className="overllay-contenedor">
                            <div style={{ minWidth: '500px', maxWidth: '500px', minHeight: '80vh', maxHeight: '80vh', backgroundColor: '#ffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', width: '100%' }}>
                                    <h1 style={{ margin: '0', fontFamily: 'Poppins', fontSize: '20px', textAlign: 'center' }}>AFILIACIONES</h1>
                                    <div style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                        onClick={() => { setOpenInformacionAfiliaciones(true) }}
                                    >
                                        <img
                                            style={{ width: '100%', height: '100%' }}
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zaGllbGQtcXVlc3Rpb24tbWFyayI+PHBhdGggZD0iTTIwIDEzYzAgNS0zLjUgNy41LTcuNjYgOC45NWExIDEgMCAwIDEtLjY3LS4wMUM3LjUgMjAuNSA0IDE4IDQgMTNWNmExIDEgMCAwIDEgMS0xYzIgMCA0LjUtMS4yIDYuMjQtMi43MmExLjE3IDEuMTcgMCAwIDEgMS41MiAwQzE0LjUxIDMuODEgMTcgNSAxOSA1YTEgMSAwIDAgMSAxIDF6Ii8+PHBhdGggZD0iTTkuMSA5YTMgMyAwIDAgMSA1LjgyIDFjMCAyLTMgMy0zIDMiLz48cGF0aCBkPSJNMTIgMTdoLjAxIi8+PC9zdmc+"
                                        />
                                    </div>
                                </div>
                                <div style={{ width: '100%', minHeight: '60vh', maxHeight: '60vh', overflowY: 'scroll', scrollbarWidth: 'none', justifyContent: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {
                                        afiliaciones?.map(
                                            a => <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '90%', height: '50px', justifyContent: 'space-between', backgroundColor: '#E3DBBB', padding: '0.5rem' }}>
                                                <div style={{ width: '50px', height: '50px' }}>
                                                    <img src={a.logo} style={{ width: '100%', height: '100%', flexShrink: 0, backgroundColor: '#41431B', borderRadius: '100%' }} />
                                                </div>
                                                <div style={{ width: '200px' }}>
                                                    <h6 style={{ margin: '0', fontSize: '18px', cursor: 'pointer' }}
                                                        onClick={() => { navigate(`/organizacion/${a.id}`); navigate(0) }}
                                                    >{a.nombre}</h6>
                                                    <p style={{ margin: '0', fontSize: '12px' }}><strong>{a.fecha.split('T')[0]}</strong></p>
                                                </div>
                                                <div style={{ width: '35px', height: '35px' }}>
                                                    <img src=
                                                        {
                                                            a.estado === 'ACTIVA' ? activaAUrl
                                                                : a.estado === 'INACTIVA' ? inactivaAUrl
                                                                    : suspendidaAUrl
                                                        }
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100%' }} />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end', width: '100%', height: '30px' }}>
                                    <button
                                        className="btn-accion-2"
                                        onClick={() => { setOpenAfiliaciones(false) }}
                                    ><strong>CERRAR</strong></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                openInformacionAfiliaciones && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{ width: '500px', height: 'auto', backgroundColor:'white', display:'flex', gap:'1rem', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                                <div><h1 style={{margin: 0, fontFamily:'Poppins', fontSize: '18px', textAlign:'center'}}>INFORMACIÓN</h1></div>
                                <div style={{ width: '90%', display: 'flex', gap: '1rem' }}>
                                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                        <h1 style={{margin: 0, fontFamily:'Poppins', fontSize: '16px', textAlign:'center'}}>ACTIVA</h1>
                                        <p style={{margin: 0, fontFamily:'Poppins', fontSize: '12px', textAlign:'justify'}}>
                                            La Organización esta afiliada a la Camara de Comercio.
                                        </p>
                                        <div style={{width:'50px', height:'50px'}}>
                                            <img src={activaAUrl} style={{width:'100%', height:'100%'}}/>
                                        </div>
                                    </div>

                                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                        <h1 style={{margin: 0, fontFamily:'Poppins', fontSize: '16px', textAlign:'center'}}>INACTIVA</h1>
                                        <p style={{margin: 0, fontFamily:'Poppins', fontSize: '12px', textAlign:'justify'}}>
                                            La Organización se encuentra en modo de espera para tener la afiliación.
                                        </p>
                                        <div style={{width:'50px', height:'50px'}}>
                                            <img src={inactivaAUrl} style={{width:'100%', height:'100%'}}/>
                                        </div>
                                    </div>

                                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                        <h1 style={{margin: 0, fontFamily:'Poppins', fontSize: '16px', textAlign:'center'}}>SUSPENDIDA</h1>
                                        <p style={{margin: 0, fontFamily:'Poppins', fontSize: '12px', textAlign:'justify'}}>
                                            La Organización ya no tiene la afiliación por parte de esa Camara de Comercio.
                                        </p>
                                        <div style={{width:'50px', height:'50px'}}>
                                            <img src={suspendidaAUrl} style={{width:'100%', height:'100%'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display:'flex', justifyContent:'end'}}>
                                    <button className="btn-accion-2"
                                        onClick={() => { setOpenInformacionAfiliaciones(false) }}
                                    >
                                        <strong>CERRAR</strong>
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