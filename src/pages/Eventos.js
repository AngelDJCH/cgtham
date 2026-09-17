import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { eventoOrganizacion, eventosByIdOrganizacion } from "../services/EventoOrganizacion";
import { useAuth } from "../hooks/useAuth";
import '../styles/botones.css'
import { createEvento, deleteEventoById } from "../services/Evento";
import { useNavigate } from "react-router-dom";
import { uploadFotoEvento } from "../services/Foto";
import { useMediaQuery } from "@uidotdev/usehooks";
import Loader from "../components/Loader";

export default function Eventos(prop) {

    const [loading, setLoading] = useState(false)

    const imgDefaultSelect = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxwYXBlci1pY29uIGx1Y2lkZS13YWxscGFwZXIiPjxwYXRoIGQ9Ik0xMiAxN3Y0Ii8+PHBhdGggZD0iTTggMjFoOCIvPjxwYXRoIGQ9Im05IDE3IDYuMS02LjFhMiAyIDAgMCAxIDIuODEuMDFMMjIgMTUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iOSIgcj0iMiIvPjxyZWN0IHg9IjIiIHk9IjMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L3N2Zz4="
    const imgAddSelect = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLXBsdXMtaWNvbiBsdWNpZGUtaW1hZ2UtcGx1cyI+PHBhdGggZD0iTTE2IDVoNiIvPjxwYXRoIGQ9Ik0xOSAydjYiLz48cGF0aCBkPSJNMjEgMTEuNVYxOWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNy41Ii8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIvPjwvc3ZnPg=="

    const [imagenes, setImagenes] = useState([])
    const [imagen, setImagen] = useState(null)
    const { user } = useAuth()
    const navigate = useNavigate()

    const [evento, setEvento] = useState({
        titulo: '',
        descripcion: '',
        tipo: '',
        fecha_inicio: '',
        fecha_final: '',
        id_organizacion: user.organizacion
    })

    const [imgTipoEvento, setImgTipoEvento] = useState([
        {
            id: 1,
            tipo: 'Capacitación y Desarrollo',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ub3RlYm9vay1wZW4taWNvbiBsdWNpZGUtbm90ZWJvb2stcGVuIj48cGF0aCBkPSJNMTMuNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJ2LTcuNCIvPjxwYXRoIGQ9Ik0yIDZoNCIvPjxwYXRoIGQ9Ik0yIDEwaDQiLz48cGF0aCBkPSJNMiAxNGg0Ii8+PHBhdGggZD0iTTIgMThoNCIvPjxwYXRoIGQ9Ik0yMS4zNzggNS42MjZhMSAxIDAgMSAwLTMuMDA0LTMuMDA0bC01LjAxIDUuMDEyYTIgMiAwIDAgMC0uNTA2Ljg1NGwtLjgzNyAyLjg3YS41LjUgMCAwIDAgLjYyLjYybDIuODctLjgzN2EyIDIgMCAwIDAgLjg1NC0uNTA2eiIvPjwvc3ZnPg=='
        },
        {
            id: 2,
            tipo: 'Networking y Vinculación',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2Vycy1pY29uIGx1Y2lkZS11c2VycyI+PHBhdGggZD0iTTE2IDIxdi0yYTQgNCAwIDAgMC00LTRINmE0IDQgMCAwIDAtNCA0djIiLz48cGF0aCBkPSJNMTYgMy4xMjhhNCA0IDAgMCAxIDAgNy43NDQiLz48cGF0aCBkPSJNMjIgMjF2LTJhNCA0IDAgMCAwLTMtMy44NyIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PC9zdmc+'
        },
        {
            id: 3,
            tipo: 'Gobernanza e Institucional',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wcmVzZW50YXRpb24taWNvbiBsdWNpZGUtcHJlc2VudGF0aW9uIj48cGF0aCBkPSJNMiAzaDIwIi8+PHBhdGggZD0iTTIxIDN2MTFhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWMyIvPjxwYXRoIGQ9Im03IDIxIDUtNSA1IDUiLz48L3N2Zz4='
        },
        {
            id: 4,
            tipo: 'Impacto Social y Comunitario',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1kcmFtYS1pY29uIGx1Y2lkZS1kcmFtYSI+PHBhdGggZD0iTTEwIDExaC4wMSIvPjxwYXRoIGQ9Ik0xNCA2aC4wMSIvPjxwYXRoIGQ9Ik0xOCA2aC4wMSIvPjxwYXRoIGQ9Ik02LjUgMTMuMWguMDEiLz48cGF0aCBkPSJNMjIgNWMwIDktNCAxMi02IDEycy02LTMtNi0xMmMwLTIgMi0zIDYtM3M2IDEgNiAzIi8+PHBhdGggZD0iTTE3LjQgOS45Yy0uOC44LTIgLjgtMi44IDAiLz48cGF0aCBkPSJNMTAuMSA3LjFDOSA3LjIgNy43IDcuNyA2IDguNmMtMy41IDItNC43IDMuOS0zLjcgNS42IDQuNSA3LjggOS41IDguNCAxMS4yIDcuNC45LS41IDEuOS0yLjEgMS45LTQuNyIvPjxwYXRoIGQ9Ik05LjEgMTYuNWMuMy0xLjEgMS40LTEuNyAyLjQtMS40Ii8+PC9zdmc+'
        },
        {
            id: 5,
            tipo: 'Promoción',
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MtaWNvbiBsdWNpZGUtYnJpZWZjYXNlLWJ1c2luZXNzIj48cGF0aCBkPSJNMTIgMTJoLjAxIi8+PHBhdGggZD0iTTE2IDZWNGEyIDIgMCAwIDAtMi0yaC00YTIgMiAwIDAgMC0yIDJ2MiIvPjxwYXRoIGQ9Ik0yMiAxM2ExOC4xNSAxOC4xNSAwIDAgMS0yMCAwIi8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiB4PSIyIiB5PSI2IiByeD0iMiIvPjwvc3ZnPg=='
        }
    ]);
    const [filtro, setFiltro] = useState('')
    const [eventos, setEventos] = useState([])
    const [openCreateEvento, setOpenCreateEvento] = useState(false)

    const [selectImagen, setSelectImagen] = useState(null)

    const handeChangeFoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const reader = new FileReader();

            reader.onloadend = function () {
                const nuevaImagen = {
                    id: imagenes.length,
                    url: reader.result,
                    subida: false
                };
                setImagenes([...imagenes, nuevaImagen]);
                setSelectImagen(nuevaImagen.url);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.log("Error al cargar la imagen:", error);
        }
    };

    const handleCreateEvento = async () => {
        setLoading(true)

        if (imagenes.length === 0) { alert('NO SE HAN SELECCIONADO IMAGENES'); setLoading(false) } else {

            const res = await createEvento(evento)
            if (res) {
                try {
                    for (const i of imagenes) {
                        await uploadFotoEvento(i.url, res.id, user.organizacion)
                    }
                } catch (error) {
                    const eliminado = await deleteEventoById(res.id)
                    setLoading(false)
                    navigate(0)
                    alert('NO SE PUDO CREAR EL EVENTO')
                }
                setLoading(false)
                navigate(0)
                alert('EVENTO PUBLICADO - (FOTOS SUBIDAS CON EXITO)')
            } else {
                alert('NO SE PUDO CREAR EL EVENTO')
            }
            setLoading(false);
            setOpenCreateEvento(false); setImagenes([]); setSelectImagen(null);
        }
    }

    useEffect(() => {
        const getEventos = async () => {
            const res = await eventosByIdOrganizacion(user.organizacion)
            setEventos(res)
        }

        const getEventosAll = async () => {
            const res = await eventoOrganizacion(100, 0)
            setEventos(res)
        }

        user.tipo === 'Escuela' ? getEventos() : getEventosAll()
    }, [])
    const isSmallDevice = useMediaQuery('(max-width:768px)');

    const isMediumDevice = useMediaQuery('(max-width: 1024px)');

    return (
        <div>
            <NavBarAutenticado />
            <Filtros enableAccion={user.tipo === 'Escuela' ? true : false} titulo='Eventos' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='CREAR' filtro={setFiltro} btn_accion={setOpenCreateEvento} />

            <TablaContenido encabezados={['Titulo', 'Descripción', 'Tipo', user.tipo === 'Escuela' ? 'Estado' : null, 'Inicio', 'Final', 'Publicado', 'Acciones']} eventosTabla={eventos} filtro={filtro} />
            {
                openCreateEvento && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div className="formulario-contenedor">
                                <div className="titulo-formulario"><h1>NUEVO EVENTO</h1></div>
                                <div className="formulario">
                                    <div className="contenedor-datos-formulario" style={{ width: (isSmallDevice || isMediumDevice) ? '100%' : null }}>
                                        <div className="contenedor-datos-interno">
                                            <h6>Titulo:</h6>
                                            <input onChange={(e) => { setEvento({ ...evento, titulo: e.target.value }) }} type="text" placeholder="Titulo" />
                                            <h6>Descripcion:</h6>
                                            <textarea onChange={(e) => { setEvento({ ...evento, descripcion: e.target.value }) }} type="text" placeholder="Descripcion" />
                                            <h6>Tipo</h6>
                                            <select onChange={(e) => { setEvento({ ...evento, tipo: e.target.value }) }}>
                                                <option>
                                                    TIPO
                                                </option>
                                                {
                                                    imgTipoEvento.map(
                                                        tipo => <option>
                                                            {tipo.tipo}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                            <h6>Fecha:</h6>
                                            <div className="group-two-input">
                                                <h6>Inicio:</h6>
                                                <input onChange={(e) => { setEvento({ ...evento, fecha_inicio: e.target.value }) }} type="date" style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px' }} />
                                                <h6>Fin:</h6>
                                                <input onChange={(e) => { setEvento({ ...evento, fecha_final: e.target.value }) }} type="date" style={{ minWidth: '100px', maxWidth: '100px', maxHeight: '25px', minHeight: '25px' }} />
                                            </div>
                                            {
                                                (isSmallDevice || isMediumDevice) && (
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div style={{ width: '250px', height: '350px' }}>
                                                            <img style={{ width: '100%', height: '90%', margin: 0 }} src={selectImagen ? selectImagen : imgDefaultSelect} />
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <input id={`foto_${imagenes.length}`} type="file" accept=".png" style={{ display: 'none' }} onChange={handeChangeFoto} />
                                                                    <label htmlFor={`foto_${imagenes.length}`}>
                                                                        <img src={imgAddSelect} style={{ width: '32px', height: '32px' }} />
                                                                    </label>
                                                                </div>
                                                                <div style={{ display: 'flex', minWidth: '90%', maxWidth: '90%', overflowX: 'scroll', gap: '0.4rem' }}>
                                                                    {
                                                                        imagenes.map(
                                                                            img => <div>
                                                                                <label htmlFor={`foto_${img?.id}`} onClick={() => { setSelectImagen(img?.url) }}>
                                                                                    <img src={img?.url} style={{ width: '32px', height: '32px', borderBottom: `2px solid ${img?.subida ? 'green' : 'red'}` }} />
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        (!isSmallDevice && !isMediumDevice) && (
                                            <div style={{ width: '250px', height: '350px' }}>
                                                <img style={{ width: '100%', height: '90%', margin: 0 }} src={selectImagen ? selectImagen : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxwYXBlci1pY29uIGx1Y2lkZS13YWxscGFwZXIiPjxwYXRoIGQ9Ik0xMiAxN3Y0Ii8+PHBhdGggZD0iTTggMjFoOCIvPjxwYXRoIGQ9Im05IDE3IDYuMS02LjFhMiAyIDAgMCAxIDIuODEuMDFMMjIgMTUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iOSIgcj0iMiIvPjxyZWN0IHg9IjIiIHk9IjMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L3N2Zz4="} />
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <input id={`foto_${imagenes.length}`} type="file" accept=".png" style={{ display: 'none' }} onChange={handeChangeFoto} />
                                                        <label htmlFor={`foto_${imagenes.length}`}>
                                                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLXBsdXMtaWNvbiBsdWNpZGUtaW1hZ2UtcGx1cyI+PHBhdGggZD0iTTE2IDVoNiIvPjxwYXRoIGQ9Ik0xOSAydjYiLz48cGF0aCBkPSJNMjEgMTEuNVYxOWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNy41Ii8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIvPjwvc3ZnPg==" style={{ width: '32px', height: '32px' }} />
                                                        </label>
                                                    </div>
                                                    <div style={{ display: 'flex', minWidth: '90%', maxWidth: '90%', overflowX: 'scroll', gap: '0.4rem' }}>
                                                        {
                                                            imagenes.map(
                                                                img => <div>
                                                                    <label htmlFor={`foto_${img?.id}`} onClick={() => { setSelectImagen(img?.url) }}>
                                                                        <img src={img?.url} style={{ width: '32px', height: '32px', borderBottom: `2px solid ${img?.subida ? 'green' : 'red'}` }} />
                                                                    </label>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="contenedor-botones-formulario">
                                    <button onClick={() => { setOpenCreateEvento(false); setImagenes([]); setSelectImagen(null) }} className="btn-accion-cancelar-1"><strong>CERRAR</strong></button>
                                    <button onClick={() => { handleCreateEvento() }} className="btn-accion-2"><strong>CREAR</strong></button>
                                </div>
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

        </div>
    )
}