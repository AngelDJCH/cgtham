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
import Paginacion from "../components/Paginacion";
import ModalAlerta from "../components/ModalAlerta";
import imageCompression from "browser-image-compression";

export default function Eventos(prop) {

    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)

    const [loading, setLoading] = useState(false)
    const imgDefaultSelect = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxwYXBlci1pY29uIGx1Y2lkZS13YWxscGFwZXIiPjxwYXRoIGQ9Ik0xMiAxN3Y0Ii8+PHBhdGggZD0iTTggMjFoOCIvPjxwYXRoIGQ9Im05IDE3IDYuMS02LjFhMiAyIDAgMCAxIDIuODEuMDFMMjIgMTUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iOSIgcj0iMiIvPjxyZWN0IHg9IjIiIHk9IjMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L3N2Zz4="
    const imgAddSelect = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLXBsdXMtaWNvbiBsdWNpZGUtaW1hZ2UtcGx1cyI+PHBhdGggZD0iTTE2IDVoNiIvPjxwYXRoIGQ9Ik0xOSAydjYiLz48cGF0aCBkPSJNMjEgMTEuNVYxOWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNy41Ii8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIvPjwvc3ZnPg=="
    const [imagenes, setImagenes] = useState([])
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
            logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ub3RlYm9vay1wZW4taWNvbiBsdWNpZGUtbm90ZWJvb2stcGVuIj48cGF0aCBkPSJNMTMuNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJ2LTcuNCIvPjxwYXRoIGQ9Ik0yIDZoNCIvPjxwYXRoIGQ9Ik0yIDEwaDQiLz48cGF0aCBkPSJNMiAxNGg0Ii8+PHBhdGggZD0iTTIgMThoNCIvPjxwYXRoIGQ9Ik0yMS4zNzggNS42MjZhMSAxIDAgMSAwLTMuMDA0LTMuMDA0bC01LjAxIDUuMDEyYTIgMiAwIDAgMC0uNTA2Ljg1NGwtLjgzNyAy.jg3YS41LjUgMCAwIDAgLjYyLjYybDIuODctLjgzN2EyIDIgMCAwIDAgLjg1NC0uNTA2eiIvPjwvc3ZnPg=='
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

    const handeChangeFoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (imagenes.length >= 5) {
            mostrarAlerta('Por rendimiento, el límite máximo es de 5 imágenes por evento.', 'advertencia');
            e.target.value = '';
            return;
        }
        const esImagenValida = (file.type && file.type.startsWith('image/')) || /\.(png|jpe?g|webp|gif|bmp|avif|heic)$/i.test(file.name);
        if (!esImagenValida) {
            mostrarAlerta('Formato no permitido. Selecciona un archivo de imagen válido.', 'advertencia');
            e.target.value = '';
            return;
        }

        try {
            setLoading(true);
            let fileToProcess = file;
            try {
                const options = {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1280,
                    useWebWorker: true
                };
                fileToProcess = await imageCompression(file, options);
            } catch (errComp) {
                console.warn("Compresión en cliente no aplicada, usando archivo original:", errComp);
            }

            const base64 = await imageCompression.getDataUrlFromFile(fileToProcess);
            const nuevaImagen = {
                id: Date.now() + Math.random().toString(36).substring(2),
                url: base64,
                subida: false
            };
            setImagenes(prev => [...prev, nuevaImagen]);
            setSelectImagen(nuevaImagen.url);
        } catch (error) {
            console.error("Error al cargar y procesar la imagen:", error);
            mostrarAlerta('Ocurrió un error al procesar la imagen seleccionada.', 'error');
        } finally {
            setLoading(false);
            e.target.value = '';
        }
    };

    const handleRemoveFoto = (idToRemove) => {
        const filtradas = imagenes.filter(img => img.id !== idToRemove);
        setImagenes(filtradas);
        const borrarEraSeleccionada = imagenes.find(img => img.id === idToRemove)?.url === selectImagen;
        if (borrarEraSeleccionada) {
            if (filtradas.length > 0) {
                setSelectImagen(filtradas[0].url);
            } else {
                setSelectImagen(null);
            }
        }
    };

    const resetForm = () => {
        setEvento({
            titulo: '',
            descripcion: '',
            tipo: '',
            fecha_inicio: '',
            fecha_final: '',
            id_organizacion: user?.organizacion
        });
        setImagenes([]);
        setSelectImagen(null);
        setOpenCreateEvento(false);
    };

    const handleCreateEvento = async () => {
        if (!evento.titulo || !evento.titulo.trim()) {
            mostrarAlerta('Por favor ingresa un título para el evento.', 'advertencia');
            return;
        }
        if (!evento.descripcion || !evento.descripcion.trim()) {
            mostrarAlerta('Por favor ingresa una descripción para el evento.', 'advertencia');
            return;
        }
        if (!evento.tipo || evento.tipo === 'TIPO' || evento.tipo === '') {
            mostrarAlerta('Por favor selecciona el tipo de evento.', 'advertencia');
            return;
        }
        if (!evento.fecha_inicio) {
            mostrarAlerta('Por favor selecciona la fecha de inicio del evento.', 'advertencia');
            return;
        }
        if (!evento.fecha_final) {
            mostrarAlerta('Por favor selecciona la fecha de finalización del evento.', 'advertencia');
            return;
        }
        if (new Date(evento.fecha_inicio) > new Date(evento.fecha_final)) {
            mostrarAlerta('La fecha de finalización no puede ser anterior a la fecha de inicio.', 'advertencia');
            return;
        }
        if (!user?.organizacion) {
            mostrarAlerta('No se encontró una organización asociada a tu usuario.', 'error');
            return;
        }
        if (imagenes.length === 0) {
            mostrarAlerta('Debes seleccionar al menos una imagen para el evento.', 'advertencia');
            return;
        }
        if (imagenes.length > 5) {
            mostrarAlerta('Por rendimiento, el límite máximo es de 5 imágenes por evento.', 'advertencia');
            return;
        }

        setLoading(true);
        try {
            const res = await createEvento({
                ...evento,
                id_organizacion: user.organizacion
            });

            if (!res || !res.id) {
                setLoading(false);
                mostrarAlerta('Ocurrió un error al crear el evento. Verifica los datos.', 'error');
                return;
            }

            let uploadError = false;
            for (const img of imagenes) {
                try {
                    const uploadRes = await uploadFotoEvento(img.url, res.id, user.organizacion);
                    if (!uploadRes) {
                        uploadError = true;
                        break;
                    }
                } catch (errFoto) {
                    uploadError = true;
                    break;
                }
            }

            if (uploadError) {
                await deleteEventoById(res.id);
                setLoading(false);
                mostrarAlerta('Ocurrió un error al subir las imágenes al servidor. El evento no fue creado.', 'error');
                return;
            }

            setLoading(false);
            mostrarAlerta('¡Evento publicado con éxito en la plataforma!', 'exito', '¡Publicación Exitosa!', () => {
                resetForm();
                navigate(0);
            });
        } catch (error) {
            setLoading(false);
            mostrarAlerta('Ocurrió un error inesperado al procesar el evento.', 'error');
        }
    };

    const getEventos = async () => {
        const res = await eventosByIdOrganizacion(user.organizacion)
        setEventos(res)
    }
    const getEventosAll = async (limit, offset) => {
        const res = await eventoOrganizacion(limit, offset)
        setEventos(res)
    }

    useEffect(() => {
        user.tipo === 'Escuela' ? getEventos() : getEventosAll(limit, offset)
    }, [offset])

    const [tipoEventoSeleccionado, setTipoEventoSeleccionado] = useState('Tipo')
    const isSmallDevice = useMediaQuery('(max-width:768px)');
    const isMediumDevice = useMediaQuery('(max-width: 1024px)');

    const renderSelectorFotos = () => (
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column' }}>
            <img
                style={{ width: '100%', height: '270px', objectFit: 'contain', margin: 0, borderRadius: '4px', backgroundColor: '#fcfcfc' }}
                src={selectImagen ? selectImagen : imgDefaultSelect}
                alt="Vista previa de evento"
            />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', gap: '0.4rem' }}>
                {imagenes.length < 5 && (
                    <div style={{ width: '42px', height: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                        <input
                            id="input_nuevo_evento_foto"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handeChangeFoto}
                        />
                        <label
                            htmlFor="input_nuevo_evento_foto"
                            title="Agregar imagen (optimización automática)"
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '38px',
                                height: '38px',
                                borderRadius: '4px',
                                border: '2px dashed #41431B',
                                backgroundColor: '#F4F5F0'
                            }}
                        >
                            <img src={imgAddSelect} alt="Agregar" style={{ width: '24px', height: '24px' }} />
                        </label>
                    </div>
                )}
                <div style={{ display: 'flex', flex: 1, minWidth: 0, overflowX: 'auto', gap: '0.4rem', padding: '4px 0', alignItems: 'center' }}>
                    {imagenes.map((img, idx) => (
                        <div
                            key={img.id || idx}
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                                flexShrink: 0
                            }}
                        >
                            <img
                                src={img.url}
                                alt={`Miniatura ${idx + 1}`}
                                onClick={() => setSelectImagen(img.url)}
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    border: selectImagen === img.url ? '2px solid #AEB784' : '1px solid #ccc',
                                    cursor: 'pointer',
                                    display: 'block'
                                }}
                            />
                            <button
                                type="button"
                                title="Quitar imagen"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFoto(img.id);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    backgroundColor: '#D9534F',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: 0,
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <span style={{ fontSize: '11px', color: '#777', fontFamily: 'Poppins', textAlign: 'center', marginTop: '6px' }}>
                {imagenes.length}/5 fotos seleccionadas — Formatos: PNG, JPG o WEBP
            </span>
        </div>
    );

    return (
        <div>
            <NavBarAutenticado />
            <Filtros enableAccion={user.tipo === 'Escuela' ? true : false} titulo='Eventos' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='CREAR' filtro={setFiltro} btn_accion={setOpenCreateEvento} selector={true} selectorOpciones={imgTipoEvento} opcionDefault={'Tipo'} setSeleccionado={setTipoEventoSeleccionado}/>
            <TablaContenido encabezados={['Titulo', user.tipo === 'Escuela' ? 'Descripción' : 'Organización', 'Tipo', 'Estado', 'Inicio', 'Final', 'Publicado', 'Acciones']} eventosTabla={eventos} filtro={filtro} tipoEventoSeleccionado={tipoEventoSeleccionado}/>
            <Paginacion offset={offset} setOffset={setOffset} />
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
                                                        tipo => <option key={tipo.id}>
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
                                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                                        {renderSelectorFotos()}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        (!isSmallDevice && !isMediumDevice) && renderSelectorFotos()
                                    }
                                </div>
                                <div className="contenedor-botones-formulario">
                                    <button onClick={() => { resetForm() }} className="btn-accion-cancelar-1"><strong>CERRAR</strong></button>
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
