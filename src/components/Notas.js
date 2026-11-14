import { useEffect, useState } from "react"
import '../styles/notas.css'
import { eventoOrganizacion } from "../services/EventoOrganizacion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMediaQuery } from "@uidotdev/usehooks";
import VisualizarFotos from "./VisualizarFotos";
import '../styles/botones.css'
import VisualizarEvento from "./VisualizarEvento";
import { createInscripcion, findAllInscripciones } from "../services/Inscripcion";
import ModalAlerta from "./ModalAlerta";

export default function Notas() {
  const [openInscripcion, setOpenInscripcion] = useState(false)
  const [openVer, setOpenVer] = useState(false)
  const [openEditar, setOpenEditar] = useState(false)
  const [idEvento, setIdEvento] = useState('')
  const navigate = useNavigate()
  const [eventos, setEventos] = useState([]);
  const [nombre_evento, setNombreEvento] = useState('')
  const [openFotos, setOpenFotos] = useState(false)
  const [fotoIndices, setFotoIndices] = useState({})

  const handleNextFoto = (eventoId, total, e) => {
    e.stopPropagation();
    setFotoIndices(prev => ({
      ...prev,
      [eventoId]: ((prev[eventoId] || 0) + 1) % total
    }));
  };

  const handlePrevFoto = (eventoId, total, e) => {
    e.stopPropagation();
    setFotoIndices(prev => ({
      ...prev,
      [eventoId]: (((prev[eventoId] || 0) - 1) + total) % total
    }));
  };

  const [alerta, setAlerta] = useState({
    abierto: false,
    tipo: 'info',
    titulo: '',
    mensaje: '',
    mostrarCancelar: false,
    textoBoton: 'ACEPTAR',
    textoCancelar: 'CANCELAR',
    onAceptar: null,
    onCancelar: null
  })

  const mostrarAlerta = ({
    mensaje,
    tipo = 'info',
    titulo = '',
    onAceptar = null,
    mostrarCancelar = false,
    onCancelar = null,
    textoBoton = 'ACEPTAR',
    textoCancelar = 'CANCELAR'
  }) => {
    setAlerta({
      abierto: true,
      tipo,
      titulo: titulo || (tipo === 'error' ? 'Atención' : tipo === 'exito' ? '¡Éxito!' : tipo === 'advertencia' ? 'Advertencia' : 'Aviso'),
      mensaje,
      mostrarCancelar,
      textoBoton,
      textoCancelar,
      onAceptar,
      onCancelar
    })
  }

  const cerrarAlerta = () => {
    const cb = alerta.onAceptar
    setAlerta(prev => ({ ...prev, abierto: false }))
    if (cb) cb()
  }

  const handleSolicitarParticipacion = (evento) => {
    if (!user?.organizacion) {
      mostrarAlerta({
        tipo: 'advertencia',
        titulo: 'Organización Requerida',
        mensaje: 'Debes iniciar sesión con una cuenta de organización para poder inscribirte a este evento.'
      })
      return
    }

    // PASO 1: Primera confirmación de participación
    mostrarAlerta({
      tipo: 'info',
      titulo: 'Confirmación de Participación',
      mensaje: `¿Deseas solicitar tu inscripción para el evento "${evento.titulo}"?`,
      mostrarCancelar: true,
      textoBoton: 'CONTINUAR',
      textoCancelar: 'CANCELAR',
      onCancelar: () => setAlerta(prev => ({ ...prev, abierto: false })),
      onAceptar: () => {
        // PASO 2: Doble confirmación obligatoria
        setTimeout(() => {
          mostrarAlerta({
            tipo: 'advertencia',
            titulo: 'Doble Confirmación Requerida',
            mensaje: 'Por favor confirma de manera definitiva el envío de tu solicitud. La organización anfitriona revisará el registro de tu institución. ¿Deseas proceder con el registro?',
            mostrarCancelar: true,
            textoBoton: 'SÍ, PARTICIPAR',
            textoCancelar: 'REGRESAR',
            onCancelar: () => setAlerta(prev => ({ ...prev, abierto: false })),
            onAceptar: async () => {
              setAlerta(prev => ({ ...prev, abierto: false }))
              try {
                const status = await createInscripcion(evento.id, user.organizacion)
                if (status === 201) {
                  mostrarAlerta({
                    tipo: 'exito',
                    titulo: '¡Inscripción Solicitada!',
                    mensaje: `Tu solicitud para participar en "${evento.titulo}" ha sido registrada exitosamente. Quedará en espera de aprobación por parte de los organizadores.`,
                    textoBoton: 'ENTENDIDO',
                    onAceptar: () => navigate(0)
                  })
                } else if (status === 409) {
                  mostrarAlerta({
                    tipo: 'advertencia',
                    titulo: 'Registro Previo',
                    mensaje: 'Tu organización ya se encuentra registrada o en lista de espera para este evento.'
                  })
                } else {
                  mostrarAlerta({
                    tipo: 'error',
                    titulo: 'Error',
                    mensaje: 'No se pudo completar el registro de participación. Intenta de nuevo más tarde.'
                  })
                }
              } catch (error) {
                mostrarAlerta({
                  tipo: 'error',
                  titulo: 'Error del Servidor',
                  mensaje: 'Ocurrió un error inesperado al procesar tu inscripción.'
                })
              }
            }
          })
        }, 100)
      }
    })
  }
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
  const { user } = useAuth()
  const [misInscripciones, setMisInscripciones] = useState([])
  const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)")

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await eventoOrganizacion(100, 0)
        setEventos(res || [])
      } catch (error) {
        console.error("Error al cargar eventos:", error)
      }

      if (user?.organizacion) {
        try {
          const resInscripciones = await findAllInscripciones(user.organizacion, 100, 0)
          setMisInscripciones(Array.isArray(resInscripciones) ? resInscripciones : [])
        } catch (error) {
          console.error("Error al cargar inscripciones del usuario:", error)
        }
      }
    }
    cargarDatos()
  }, [user?.organizacion])
  return (
    <div className="notas">
      {
        eventos?.map(evento => {
          const esDueno = user?.organizacion === evento.organizacion?.id;
          const fotosLista = (evento.fotos && Array.isArray(evento.fotos) && evento.fotos.length > 0) ? evento.fotos : [];
          const currentIdx = (fotoIndices[evento.id] || 0) % (fotosLista.length || 1);
          const fotoActual = fotosLista.length > 0 ? fotosLista[currentIdx] : null;
          const fechaInicio = evento.fecha_inicio ? evento.fecha_inicio.split('T')[0] : '';
          const fechaFinal = evento.fecha_final ? evento.fecha_final.split('T')[0] : '';

          // Evaluación de estado de inscripción y cupo
          const inscripcionUsuario = misInscripciones.find(
            item => (item.evento?.id_evento || item.id_evento) === evento.id
          );
          const estadoInscripcion = inscripcionUsuario?.inscripcion?.estado || inscripcionUsuario?.estado;
          const estaParticipando = estadoInscripcion === 'APROBADA';
          const estaPendiente = estadoInscripcion === 'PENDIENTE';

          const limite = (evento.limite_participantes !== null && evento.limite_participantes !== undefined && evento.limite_participantes !== '')
            ? parseInt(evento.limite_participantes)
            : null;
          const totalParticipantes = parseInt(evento.total_participantes || 0);
          const cupoLleno = limite !== null && totalParticipantes >= limite;

          const tipoIncompatible = !esDueno && evento.tipo_organizacion_permitida && evento.tipo_organizacion_permitida !== 'TODAS' && user?.tipo && user.tipo !== evento.tipo_organizacion_permitida;
          const sectorIncompatible = !esDueno && evento.sector_permitido && evento.sector_permitido !== 'TODOS' && user?.sector && user.sector !== evento.sector_permitido;
          const giroIncompatible = !esDueno && evento.giro_permitido && evento.giro_permitido !== 'TODOS' && user?.giro && user.giro !== evento.giro_permitido;
          const perfilIncompatible = tipoIncompatible || sectorIncompatible || giroIncompatible;

          return (
            <div key={evento.id} className="nota-card">
              {/* Cabecera del Emisor */}
              <div className="nota-card-header">
                <div
                  className="nota-emisor-info"
                  onClick={() => navigate(`/organizacion/${evento.organizacion?.id}`)}
                  title="Ver perfil de la organización"
                >
                  <img
                    src={evento.organizacion?.foto || 'https://via.placeholder.com/44'}
                    alt={evento.organizacion?.nombre || 'Organización'}
                    className="nota-emisor-logo"
                  />
                  <div className="nota-emisor-textos">
                    <h3 className="nota-emisor-nombre">{evento.organizacion?.nombre || evento.organizacion?.nombre_comercial}</h3>
                    <span className="nota-emisor-sub">Convocatoria Institucional</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                  {evento.tipo && (
                    <span className="nota-badge-tipo">{evento.tipo}</span>
                  )}
                  {evento.modalidad && (
                    <span className="nota-badge-tipo" style={{ backgroundColor: '#F0F4E8', borderColor: '#AEB784', fontSize: '10.5px' }}>
                      {evento.modalidad === 'VIRTUAL' ? 'Virtual' : evento.modalidad === 'HIBRIDO' ? 'Híbrido' : 'Presencial'}
                    </span>
                  )}
                  {evento.tipo_organizacion_permitida && evento.tipo_organizacion_permitida !== 'TODAS' && (
                    <span className="nota-badge-tipo" style={{ backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#F59E0B', fontSize: '10.5px' }}>
                      Solo {evento.tipo_organizacion_permitida}s
                    </span>
                  )}
                </div>
              </div>

              {/* Descripción */}
              {evento.descripcion && (
                <p className="nota-card-descripcion">
                  {evento.descripcion}
                </p>
              )}

              {/* Fotografía y Carrusel Integrado */}
              {fotoActual && (
                <div className="nota-card-media" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={fotoActual}
                    alt={evento.titulo}
                    className="nota-card-img"
                  />
                  {fotosLista.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="nota-carusel-btn prev"
                        onClick={(e) => handlePrevFoto(evento.id, fotosLista.length, e)}
                        title="Fotografía anterior"
                        aria-label="Anterior"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      <button
                        type="button"
                        className="nota-carusel-btn next"
                        onClick={(e) => handleNextFoto(evento.id, fotosLista.length, e)}
                        title="Siguiente fotografía"
                        aria-label="Siguiente"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>

                      <span className="nota-media-overlay-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        {currentIdx + 1} / {fotosLista.length}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Metadatos y Botonera */}
              <div className="nota-card-meta">
                <div className="nota-evento-info">
                  <h4 className="nota-evento-titulo">{evento.titulo}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                    <span className="nota-evento-fechas" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {fechaInicio} al {fechaFinal}
                      {evento.hora_inicio && (
                        <span style={{ marginLeft: '6px', opacity: 0.9, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {evento.hora_inicio.slice(0, 5)} - {evento.hora_final ? evento.hora_final.slice(0, 5) : '18:00'}
                        </span>
                      )}
                    </span>
                    {limite ? (
                      <span className={`nota-evento-cupo ${cupoLleno ? 'agotado' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Cupo: {totalParticipantes} / {limite} {cupoLleno ? '(Lleno)' : 'lugares'}
                      </span>
                    ) : (
                      <span className="nota-evento-cupo" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        Cupo Ilimitado
                      </span>
                    )}
                  </div>
                </div>

                <div className="nota-card-botones">
                  <button
                    type="button"
                    className="nota-btn-ver"
                    onClick={() => {
                      setIdEvento(evento.id);
                      setOpenVer(true);
                    }}
                    title="Visualizar evento completo"
                  >
                    VER
                  </button>

                  {esDueno ? (
                    <button
                      type="button"
                      className="nota-btn-participar"
                      onClick={() => {
                        setIdEvento(evento.id);
                        setOpenEditar(true);
                      }}
                      title="Editar evento"
                    >
                      EDITAR
                    </button>
                  ) : estaParticipando ? (
                    <button
                      type="button"
                      className="nota-btn-participando"
                      onClick={() => {
                        mostrarAlerta({
                          tipo: 'exito',
                          titulo: 'Participante Oficial',
                          mensaje: `Tu organización "${user?.nombre_comercial || 'tu institución'}" ya está formalmente aceptada y registrada como participante en el evento "${evento.titulo}".`
                        });
                      }}
                      title="Inscripción aprobada por el organizador"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      PARTICIPANDO
                    </button>
                  ) : estaPendiente ? (
                    <button
                      type="button"
                      className="nota-btn-pendiente"
                      onClick={() => {
                        mostrarAlerta({
                          tipo: 'advertencia',
                          titulo: 'Solicitud en Revisión',
                          mensaje: `Tu solicitud para participar en "${evento.titulo}" se encuentra registrada y en espera de aprobación por parte del anfitrión.`
                        });
                      }}
                      title="Solicitud enviada (esperando aprobación)"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      EN ESPERA
                    </button>
                  ) : perfilIncompatible ? (
                    <button
                      type="button"
                      className="nota-btn-lleno"
                      disabled
                      title={tipoIncompatible ? `Evento reservado para ${evento.tipo_organizacion_permitida}s` : sectorIncompatible ? `Evento reservado para el sector ${evento.sector_permitido}` : `Evento reservado para el giro ${evento.giro_permitido}`}
                      style={{ fontSize: '11px', backgroundColor: '#FDF2F2', color: '#9B1C1C', borderColor: '#F8B4B4' }}
                    >
                      NO ADMITIDO
                    </button>
                  ) : cupoLleno ? (
                    <button
                      type="button"
                      className="nota-btn-lleno"
                      disabled
                      title="El cupo máximo de participantes ha sido alcanzado"
                    >
                      CUPO LLENO
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="nota-btn-participar"
                      onClick={() => {
                        setIdEvento(evento.id);
                        handleSolicitarParticipacion(evento);
                      }}
                    >
                      PARTICIPAR
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      }

      <div>
        <button
          type="button"
          className="nota-btn-ver-todos"
          onClick={() => { navigate('/eventos') }}
        >
          VER TODOS LOS EVENTOS →
        </button>
      </div>

      {
        openVer && (
          <VisualizarEvento id_evento={idEvento} accion={setOpenVer} modo="ver" />
        )
      }

      {
        openEditar && (
          <VisualizarEvento id_evento={idEvento} accion={setOpenEditar} modo="editar" />
        )
      }

      <ModalAlerta
        abierto={alerta.abierto}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        mensaje={alerta.mensaje}
        textoBoton={alerta.textoBoton}
        textoCancelar={alerta.textoCancelar}
        mostrarCancelar={alerta.mostrarCancelar}
        onAceptar={cerrarAlerta}
        onCancelar={() => {
          const cb = alerta.onCancelar
          setAlerta(prev => ({ ...prev, abierto: false }))
          if (cb) cb()
        }}
      />

      {
        openFotos && (
          <VisualizarFotos id_evento={idEvento} accion={setOpenFotos} />
        )
      }

    </div>
  )
}