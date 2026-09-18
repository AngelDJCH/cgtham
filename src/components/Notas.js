import { useEffect, useState } from "react"
import '../styles/notas.css'
import InscripcionAlterta from "./InscripcionAlterta";
import { eventoOrganizacion } from "../services/EventoOrganizacion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMediaQuery } from "@uidotdev/usehooks";
import VisualizarFotos from "./VisualizarFotos";
import '../styles/botones.css'
import VisualizarEvento from "./VisualizarEvento";

export default function Notas() {

  const [openInscripcion, setOpenInscripcion] = useState(false)
  const [openEditar, setOpenEditar] = useState(false)
  const [idEvento, setIdEvento] = useState('')

  const navigate = useNavigate()

  const [eventos, setEventos] = useState([]);
  const [nombre_evento, setNombreEvento] = useState('')

  const [openFotos, setOpenFotos] = useState(false)

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

  const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)")


  useEffect(() => {
    const eventosDB = async () => {
      const res = await eventoOrganizacion(100, 0)
      setEventos(res)
    }
    eventosDB()
  }, [])

  return (
    <div className="notas">

      {
        eventos?.map(
          evento => <div key={evento.id} className="nota" style={{ width: isMediumDevice ? '300px' : null, height: isMediumDevice ? '400px' : null }}>
            {/* <div style={{ position: 'absolute', width: isMediumDevice ? '80%' : '450px', display: 'flex', alignItems: 'flex-start', height: '140px', justifyContent: 'right' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '100%', backgroundColor: '#41431B', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ width: '80%', height: '80%' }} src={imgTipoEvento.filter(f => f.tipo === evento.tipo).map(t => t.logo)} alt="tipo" />
              </div>
            </div> */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '90%', marginLeft: '1rem', gap: '1rem', backgroundColor: '#AEB784', padding: '0.4rem', borderRadius: '10px 10px 10px 10px' }}>
              <div style={{ width: '40px', height: '40px' }}>
                <img src={evento.organizacion.foto} alt={evento.organizacion.nombre_comercial} style={{ backgroundColor: '#E3DBBB', borderRadius: '100%', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '15px', color: '#41431B', cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/organizacion/${evento.organizacion.id}`)
                  }}
                >{evento.organizacion.nombre}</h1>
              </div>
            </div>
            <div style={{ width: '90%' }}>
              <p style={{ fontFamily: 'Poppins', fontSize: '12px', textAlign: 'justify', maxHeight: '50px', minHeight: '50px', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                {evento.descripcion}
              </p>
            </div>
            <div style={{ width: '90%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ width: isMediumDevice ? '100%' : '140px', height: '140px' }}>
                <img
                  onClick={() => {
                    setIdEvento(evento?.id)
                    setOpenFotos(true)
                  }}
                  className="img-scale"
                  src={evento.fotos[0]} alt="imagenes" style={{cursor: 'pointer', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              <div style={{ width: isMediumDevice ? '100%' : '200px', height: 'auto', backgroundColor: '#AEB784', padding: '0.1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h1 style={{ margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '14px', width: '100%', textAlign: 'center' }}>{evento.titulo.length > 20 ? evento.titulo.substring(0,20)+'...' : evento.titulo}</h1>
                <div>
                  <p style={{ fontFamily: 'Poppins', textAlign: 'center', fontSize: '13px' }}>{evento.fecha_inicio.split('T')[0]} <strong>/</strong> {evento.fecha_final.split('T')[0]}</p>
                </div>
                <div style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'end', alignItems: 'center' }}>
                  <button className="btn-accion-2"
                    onClick={() => {
                      setIdEvento(evento.id)
                      if (user.organizacion != evento.organizacion.id) {
                        setOpenInscripcion(true);
                        setNombreEvento(evento.titulo)
                      } else {
                        setOpenEditar(true)
                      }
                    }}
                  >
                    <strong>
                      {
                        user.organizacion === evento.organizacion.id ? 'EDITAR' : 'PARTICIPAR'
                      }
                    </strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      <div>
        <button className="btn-accion-2" style={{ width: 'auto' }}
          onClick={() => { navigate('/eventos') }}
        >
          <strong>VER TODOS LOS EVENTOS</strong>
        </button>
      </div>

      {
        openInscripcion && (openInscripcion && (<VisualizarEvento id_evento={idEvento} accion={setOpenInscripcion} />)
        )
      }

      {
        openEditar && (
          <VisualizarEvento id_evento={idEvento} accion={setOpenEditar} />
        )
      }

      {
        openFotos && (
          <VisualizarFotos id_evento={idEvento} accion={setOpenFotos} />
        )
      }

    </div>
  )
}