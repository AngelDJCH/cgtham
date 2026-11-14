import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { eventoOrganizacion, eventosByIdOrganizacion } from "../services/EventoOrganizacion";
import { useAuth } from "../hooks/useAuth";
import '../styles/botones.css'
import '../styles/modal-evento.css'
import { createEvento, deleteEventoById } from "../services/Evento";
import { useNavigate } from "react-router-dom";
import { uploadFotoEvento } from "../services/Foto";
import { useMediaQuery } from "@uidotdev/usehooks";
import Loader from "../components/Loader";
import Paginacion from "../components/Paginacion";
import ModalAlerta from "../components/ModalAlerta";
import imageCompression from "browser-image-compression";
import { SECTORES_ORGANIZACION } from "../constants/perfilesOrganizacion";

export default function Eventos(prop) {

    const getFechaLocalHoy = () => {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    };
    const fechaMinima = getFechaLocalHoy();

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
        hora_inicio: '09:00',
        hora_final: '18:00',
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

    const [mostrarAjustesAvanzados, setMostrarAjustesAvanzados] = useState(false);

    const resetForm = () => {
        setEvento({
            titulo: '',
            descripcion: '',
            tipo: '',
            fecha_inicio: '',
            fecha_final: '',
            hora_inicio: '09:00',
            hora_final: '18:00',
            id_organizacion: user?.organizacion,
            limite_participantes: null,
            tipo_organizacion_permitida: 'TODAS',
            sector_permitido: 'TODOS',
            giro_permitido: 'TODOS',
            modalidad: 'PRESENCIAL'
        });
        setImagenes([]);
        setSelectImagen(null);
        setMostrarAjustesAvanzados(false);
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
        if (evento.fecha_inicio < fechaMinima) {
            mostrarAlerta('La fecha de inicio no puede ser una fecha pasada.', 'advertencia');
            return;
        }
        if (!evento.fecha_final) {
            mostrarAlerta('Por favor selecciona la fecha de finalización del evento.', 'advertencia');
            return;
        }
        if (evento.fecha_final < evento.fecha_inicio) {
            mostrarAlerta('La fecha de finalización no puede ser anterior a la fecha de inicio.', 'advertencia');
            return;
        }
        if (evento.fecha_inicio === evento.fecha_final && evento.hora_inicio && evento.hora_final) {
            if (evento.hora_final <= evento.hora_inicio) {
                mostrarAlerta('Si el evento inicia y concluye el mismo día, la hora de finalización debe ser posterior a la hora de inicio.', 'advertencia');
                return;
            }
        }
        if (evento.limite_participantes !== null && evento.limite_participantes !== '') {
            const num = parseInt(evento.limite_participantes);
            if (isNaN(num) || num <= 0) {
                mostrarAlerta('El límite de participantes debe ser un número entero mayor a 0.', 'advertencia');
                return;
            }
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
        <div className="modal-evento-col-media">
            <label className="modal-evento-label" style={{ marginBottom: '6px' }}>Fotografías del Evento:</label>
            <div className="modal-evento-foto-principal-wrap">
                <img
                    className="modal-evento-foto-principal"
                    src={selectImagen ? selectImagen : imgDefaultSelect}
                    alt="Vista previa de evento"
                />
            </div>
            <div className="modal-evento-miniaturas-wrap">
                <div className="modal-evento-miniaturas-scroll">
                    {imagenes.map((img, idx) => {
                        const estaActiva = selectImagen === img.url;
                        return (
                            <div key={img.id || idx} className="modal-evento-miniatura-item">
                                <img
                                    src={img.url}
                                    alt={`Miniatura ${idx + 1}`}
                                    className={`modal-evento-miniatura-img ${estaActiva ? 'activa' : ''}`}
                                    onClick={() => setSelectImagen(img.url)}
                                />
                                <button
                                    type="button"
                                    title="Quitar imagen"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFoto(img.id);
                                    }}
                                    className="modal-evento-btn-quitar-foto"
                                >
                                    ×
                                </button>
                            </div>
                        );
                    })}
                </div>
                {imagenes.length < 5 && (
                    <>
                        <input
                            id="input_nuevo_evento_foto"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handeChangeFoto}
                        />
                        <label
                            htmlFor="input_nuevo_evento_foto"
                            title="Agregar imagen al evento"
                            className="modal-evento-btn-agregar-foto"
                        >
                            +
                        </label>
                    </>
                )}
            </div>
            <span className="modal-evento-media-pie">
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
                        <div className="overllay" onClick={() => resetForm()}></div>
                        <div className="overllay-contenedor">
                            <div className="modal-evento-card">
                                {/* Cabecera Institucional */}
                                <div className="modal-evento-header">
                                    <div className="modal-evento-header-info">
                                        <span className="modal-evento-badge">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                            Nuevo Registro
                                        </span>
                                        <h2 className="modal-evento-titulo">Crear Nuevo Evento Institucional</h2>
                                    </div>
                                    <button
                                        type="button"
                                        className="modal-evento-btn-cerrar-x"
                                        onClick={() => resetForm()}
                                        title="Cerrar ventana"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Cuerpo del Modal */}
                                <div className="modal-evento-body">
                                    {/* Columna Izquierda: Formulario */}
                                    <div className="modal-evento-col-form">
                                        <div className="modal-evento-campo">
                                            <label className="modal-evento-label">Título del Evento:</label>
                                            <input
                                                type="text"
                                                className="modal-evento-input"
                                                value={evento.titulo}
                                                onChange={(e) => { setEvento({ ...evento, titulo: e.target.value }) }}
                                                placeholder="Ej. Congreso Anual de Tecnología y Vinculación"
                                            />
                                        </div>

                                        <div className="modal-evento-campo">
                                            <label className="modal-evento-label">Descripción del Evento:</label>
                                            <textarea
                                                className="modal-evento-textarea"
                                                value={evento.descripcion}
                                                onChange={(e) => { setEvento({ ...evento, descripcion: e.target.value }) }}
                                                placeholder="Escribe los objetivos, temáticas o detalles para los participantes..."
                                            />
                                        </div>

                                        <div className="modal-evento-campo">
                                            <label className="modal-evento-label">Tipo de Evento:</label>
                                            <select
                                                className="modal-evento-select"
                                                value={evento.tipo}
                                                onChange={(e) => { setEvento({ ...evento, tipo: e.target.value }) }}
                                            >
                                                <option value="">Selecciona el tipo de evento</option>
                                                {imgTipoEvento.map(tipo => (
                                                    <option key={tipo.id} value={tipo.tipo}>
                                                        {tipo.tipo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="modal-evento-campo">
                                            <label className="modal-evento-label">Fechas y Horarios del Evento:</label>
                                            <div className="modal-evento-fechas-grid">
                                                <div className="modal-evento-fecha-item">
                                                    <span>Fecha de Inicio:</span>
                                                    <input
                                                        className="modal-evento-input"
                                                        min={fechaMinima}
                                                        value={evento.fecha_inicio}
                                                        onChange={(e) => {
                                                            const nuevoInicio = e.target.value;
                                                            setEvento(prev => ({
                                                                ...prev,
                                                                fecha_inicio: nuevoInicio,
                                                                fecha_final: (prev.fecha_final && prev.fecha_final < nuevoInicio) ? nuevoInicio : prev.fecha_final
                                                            }));
                                                        }}
                                                        type="date"
                                                    />
                                                </div>
                                                <div className="modal-evento-fecha-item">
                                                    <span>Hora de Inicio:</span>
                                                    <input
                                                        className="modal-evento-input"
                                                        value={evento.hora_inicio || '09:00'}
                                                        onChange={(e) => setEvento({ ...evento, hora_inicio: e.target.value })}
                                                        type="time"
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-evento-fechas-grid" style={{ marginTop: '8px' }}>
                                                <div className="modal-evento-fecha-item">
                                                    <span>Fecha de Fin:</span>
                                                    <input
                                                        className="modal-evento-input"
                                                        min={evento.fecha_inicio || fechaMinima}
                                                        value={evento.fecha_final}
                                                        onChange={(e) => { setEvento({ ...evento, fecha_final: e.target.value }) }}
                                                        type="date"
                                                    />
                                                </div>
                                                <div className="modal-evento-fecha-item">
                                                    <span>Hora de Fin:</span>
                                                    <input
                                                        className="modal-evento-input"
                                                        value={evento.hora_final || '18:00'}
                                                        onChange={(e) => setEvento({ ...evento, hora_final: e.target.value })}
                                                        type="time"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botón de Criterios de Participación y Cupo */}
                                        <button
                                            type="button"
                                            className="modal-evento-btn-toggle-avanzado"
                                            onClick={() => setMostrarAjustesAvanzados(!mostrarAjustesAvanzados)}
                                            title="Configurar aforo, restricciones de perfil, sector, giro y modalidad"
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                                </svg>
                                                <span>Criterios de Participación y Cupo</span>
                                            </span>
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ transition: 'transform 0.2s ease', transform: mostrarAjustesAvanzados ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                            >
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </button>

                                        {/* Panel Colapsable de Criterios de Participación */}
                                        {mostrarAjustesAvanzados && (
                                            <div className="modal-evento-panel-avanzado">
                                                {/* 1. Cupo de Participantes */}
                                                <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                    <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                        Cupo de participantes:
                                                    </label>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12.5px' }}>
                                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                                                <input
                                                                    type="radio"
                                                                    name="modoCupoCrear"
                                                                    checked={evento.limite_participantes === null || evento.limite_participantes === ''}
                                                                    onChange={() => setEvento(prev => ({ ...prev, limite_participantes: null }))}
                                                                />
                                                                Ilimitado (sin tope)
                                                            </label>
                                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                                                <input
                                                                    type="radio"
                                                                    name="modoCupoCrear"
                                                                    checked={evento.limite_participantes !== null && evento.limite_participantes !== ''}
                                                                    onChange={() => setEvento(prev => ({ ...prev, limite_participantes: 30 }))}
                                                                />
                                                                Con límite
                                                            </label>
                                                        </div>
                                                        {evento.limite_participantes !== null && evento.limite_participantes !== '' && (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    className="modal-evento-input"
                                                                    style={{ width: '110px', height: '34px', fontSize: '12px' }}
                                                                    value={evento.limite_participantes}
                                                                    onChange={(e) => setEvento(prev => ({ ...prev, limite_participantes: e.target.value ? parseInt(e.target.value) : '' }))}
                                                                    placeholder="Ej. 30"
                                                                />
                                                                <span style={{ fontSize: '11.5px', color: '#666666' }}>plazas máximas permitidas</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* 2. Filtros de Audiencia Jerárquicos: Tipo, Sector y Giro (Opciones del Registro) */}
                                                <div className="modal-evento-grid-avanzado">
                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Tipo de organización:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento.tipo_organizacion_permitida || 'TODAS'}
                                                            onChange={(e) => {
                                                                const nuevoTipo = e.target.value;
                                                                setEvento(prev => ({
                                                                    ...prev,
                                                                    tipo_organizacion_permitida: nuevoTipo,
                                                                    sector_permitido: 'TODOS',
                                                                    giro_permitido: 'TODOS'
                                                                }));
                                                            }}
                                                        >
                                                            <option value="TODAS">Todas las organizaciones</option>
                                                            <option value="Escuela">Solo Escuelas</option>
                                                            <option value="Empresa">Solo Empresas</option>
                                                            <option value="Cámara de Comercio">Solo Cámaras de Comercio</option>
                                                        </select>
                                                    </div>

                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Sector permitido:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento.sector_permitido || 'TODOS'}
                                                            disabled={!evento.tipo_organizacion_permitida || evento.tipo_organizacion_permitida === 'TODAS'}
                                                            onChange={(e) => {
                                                                const nuevoSector = e.target.value;
                                                                setEvento(prev => ({
                                                                    ...prev,
                                                                    sector_permitido: nuevoSector,
                                                                    giro_permitido: 'TODOS'
                                                                }));
                                                            }}
                                                        >
                                                            <option value="TODOS">Todos los sectores</option>
                                                            {evento.tipo_organizacion_permitida && evento.tipo_organizacion_permitida !== 'TODAS' && SECTORES_ORGANIZACION
                                                                .filter(s => s.tipo === evento.tipo_organizacion_permitida)
                                                                .map(s => (
                                                                    <option key={s.id} value={s.nombre}>
                                                                        {s.nombre}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Giro permitido:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento.giro_permitido || 'TODOS'}
                                                            disabled={!evento.sector_permitido || evento.sector_permitido === 'TODOS'}
                                                            onChange={(e) => setEvento(prev => ({ ...prev, giro_permitido: e.target.value }))}
                                                        >
                                                            <option value="TODOS">Todos los giros</option>
                                                            {evento.tipo_organizacion_permitida && evento.sector_permitido && evento.sector_permitido !== 'TODOS' && SECTORES_ORGANIZACION
                                                                .filter(s => s.tipo === evento.tipo_organizacion_permitida && s.nombre === evento.sector_permitido)
                                                                .map(s => s.giros.map(g => (
                                                                    <option key={g.id} value={g.nombre}>
                                                                        {g.nombre}
                                                                    </option>
                                                                )))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="modal-evento-campo" style={{ marginBottom: 0 }}>
                                                        <label className="modal-evento-label" style={{ fontSize: '12px', color: '#41431B' }}>
                                                            Modalidad:
                                                        </label>
                                                        <select
                                                            className="modal-evento-select"
                                                            style={{ height: '34px', fontSize: '12px', padding: '4px 8px' }}
                                                            value={evento.modalidad || 'PRESENCIAL'}
                                                            onChange={(e) => setEvento(prev => ({ ...prev, modalidad: e.target.value }))}
                                                        >
                                                            <option value="PRESENCIAL">Presencial</option>
                                                            <option value="VIRTUAL">En línea / Virtual</option>
                                                            <option value="HIBRIDO">Híbrida</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Columna Derecha: Multimedia */}
                                    {renderSelectorFotos()}
                                </div>

                                {/* Pie de Botones */}
                                <div className="modal-evento-footer">
                                    <button
                                        type="button"
                                        onClick={() => { resetForm() }}
                                        className="modal-evento-btn-cancelar"
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { handleCreateEvento() }}
                                        className="modal-evento-btn-primario"
                                    >
                                        PUBLICAR EVENTO
                                    </button>
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
