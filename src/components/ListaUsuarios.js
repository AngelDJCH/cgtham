import { useEffect, useState } from 'react'
import '../styles/listausuarios.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js'
import { getSeguidores } from '../services/Seguimiento.js';
import { getAllOrganizaciones } from '../services/Organizacion.js';

export default function ListaUsuarios(props) {

  const navigate = useNavigate()

  const [organizaciones, setOrganizaciones] = useState([])

  const { user } = useAuth()

  const [busqueda, setBusqueda] = useState('')

  const img_mensaje = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZW5kLWljb24gbHVjaWRlLXNlbmQiPjxwYXRoIGQ9Ik0xNC41MzYgMjEuNjg2YS41LjUgMCAwIDAgLjkzNy0uMDI0bDYuNS0xOWEuNDk2LjQ5NiAwIDAgMC0uNjM1LS42MzVsLTE5IDYuNWEuNS41IDAgMCAwLS4wMjQuOTM3bDcuOTMgMy4xOGEyIDIgMCAwIDEgMS4xMTIgMS4xMXoiLz48cGF0aCBkPSJtMjEuODU0IDIuMTQ3LTEwLjk0IDEwLjkzOSIvPjwvc3ZnPg=='


  const handleClick = (usuario) => {
    props.selectUsuario(usuario)
  }

  useEffect(() => {
    const organizacionesData = async () => {
      const res = await getAllOrganizaciones()
      setOrganizaciones(res)
    }


    organizacionesData()
  }, [])

  return (
    <div className='listausuarios' style={{ position: props.position, width: props.width ? props.width : null, left: `${props.left}`, right: `${props.right}`, height: props.height, maxHeight: props.height, minHeight: props.height }}>

      {
        props.isSmallDevice && (
          <div style={{ width: '100%', maxWidth: '100%', minWidth: '100%', height: '50px', gap: '1rem', display: 'flex', padding: '1rem', justifyContent: 'center', alignItems: 'center', overflowX: 'auto' }}>
            {
              organizaciones?.map(
                o =>
                  <div style={{ width: '45px', height: '45px', cursor: 'pointer' }}
                    onClick={() => { props.selectUsuario(o.id) }}
                  >
                    <img src={o.logo} style={{ width: '100%', height: '100%', borderRadius: '100%' }} />
                  </div>
              )
            }
          </div>
        )
      }

      {
        !props.isSmallDevice && (
          <div className='buscador'>
            <input placeholder='Ingresa el nombre de la organización' style={{ textAlign: 'center' }} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
        )
      }
      {
        !props.isSmallDevice && (
          <div className='lista'>
            <ul>
              {
                !busqueda && (
                  <li className='titulos-lista'><strong>CÁMARAS DE COMERCIO</strong></li>
                )
              }
              {
                organizaciones?.filter(f => f.nombre_comercial.toLowerCase().startsWith(busqueda.toLowerCase())).filter(f => f.tipo === 'Cámara de Comercio').map(
                  o => <li className='usuario-contenedor' key={o.id}>
                    <div className='logo-organizacion-contenedor'>

                      <img src={o.logo} alt={o.nombre_comercial} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', width: '200px' }}>
                      <p
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/organizacion/${o.id}`)
                        }}
                      >{o.nombre_comercial}</p>
                    </div>
                    {
                      props?.mensaje && (
                        <img src={img_mensaje} style={{ marginRight: '0.2rem', cursor: 'pointer' }}
                          onClick={() => {
                            props.selectUsuario(o.id)
                          }}
                        />
                      )
                    }
                  </li>
                )
              }
              {
                !busqueda && (
                  <li className='titulos-lista'><strong>EMPRESAS</strong></li>
                )
              }
              {
                organizaciones?.filter(f => f.nombre_comercial.toLowerCase().startsWith(busqueda.toLowerCase())).filter(f => f.tipo === 'Empresa').map(
                  o => <li className='usuario-contenedor' key={o.id}>
                    <div className='logo-organizacion-contenedor'>
                      <img src={o.logo} alt={o.nombre_comercial} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', width: '200px' }}>
                      <p
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/organizacion/${o.id}`)
                        }}
                      >{o.nombre_comercial}</p>
                    </div>
                    {
                      props?.mensaje && (
                        <img src={img_mensaje} style={{ marginRight: '0.2rem', cursor: 'pointer' }}
                          onClick={() => {
                            props.selectUsuario(o.id)
                          }}
                        />
                      )
                    }
                  </li>
                )
              }

              {
                !busqueda && (
                  <li className='titulos-lista'><strong>ESCUELAS</strong></li>
                )
              }

              {
                organizaciones?.filter(f => f.nombre_comercial.toLowerCase().startsWith(busqueda.toLowerCase())).filter(f => f.tipo === 'Escuela').map(
                  o => <li className='usuario-contenedor' key={o.id}>
                    <div className='logo-organizacion-contenedor'>

                      <img src={o.logo} alt={o.nombre_comercial} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', width: '200px' }}>
                      <p
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/organizacion/${o.id}`)
                        }}
                      >{o.nombre_comercial}</p>
                    </div>
                    {
                      props?.mensaje && (
                        <img src={img_mensaje} style={{ marginRight: '0.2rem', cursor: 'pointer' }}
                          onClick={() => {
                            props.selectUsuario(o.id)
                          }}
                        />
                      )
                    }
                  </li>
                )
              }
              {
                !busqueda && (
                  <li className='titulos-lista'><strong>ADMINISTRADOR</strong></li>
                )
              }

              {
                organizaciones?.filter(f => f.nombre_comercial.toLowerCase().startsWith(busqueda.toLowerCase())).filter(f => f.tipo === 'Comité').map(
                  o => <li className='usuario-contenedor' key={o.id}>
                    <div className='logo-organizacion-contenedor'>

                      <img src={o.logo} alt={o.nombre_comercial} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', width: '200px' }}>
                      <p
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/organizacion/${o.id}`)
                        }}
                      >{o.nombre_comercial}</p>
                    </div>
                    {
                      props?.mensaje && (
                        <img src={img_mensaje} style={{ marginRight: '0.2rem', cursor: 'pointer' }}
                          onClick={() => {
                            props.selectUsuario(o.id)
                          }}
                        />
                      )
                    }
                  </li>
                )
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}