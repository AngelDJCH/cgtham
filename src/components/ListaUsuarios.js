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
    <div className='listausuarios' style={{ left: `${props.left}`, right: `${props.right}` }}>
      <div className='buscador'>
        <input placeholder='Ingresa el nombre de la organización' style={{ textAlign: 'center' }} onChange={(e) => setBusqueda(e.target.value)} />
      </div>
      <div className='lista'>
        <ul>
          {
            !busqueda && (
              <li className='titulos-lista'><strong>CÁMARAS DE COMERCIO</strong></li>
            )
          }
          {
            organizaciones?.filter(f => f.nombre_comercial.startsWith(busqueda)).filter(f => f.tipo === 'Cámara').map(
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
            organizaciones?.filter(f => f.nombre_comercial.startsWith(busqueda)).filter(f => f.tipo === 'Empresa').map(
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
                {
                  //<p><strong>{o.tipo}</strong></p>
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
            organizaciones?.filter(f => f.nombre_comercial.startsWith(busqueda)).filter(f => f.tipo === 'Escuela').map(
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
                {
                  //<p><strong>{o.tipo}</strong></p>
                }
              </li>
            )

            /*
            {
            usuarios?.map(
              usuario =>
                <li className='usuario-contenedor'>
                  <img src={usuario.foto} 
                  
                  onClick={()=>{
                    navigate(`/perfil/${usuario.id}`)
                  }}
                  
                  />
                  <p>{usuario.nombre}</p>
                  <img
                    onClick={
                      () => {
                        if (props.selectUsuario) {
                          props.selectUsuario(usuario.nombre)
                        }
                        navigate('/mensajes')
                      }
                    }

                    className='icono' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc2VuZC1pY29uIGx1Y2lkZS1zZW5kIj48cGF0aCBkPSJNMTQuNTM2IDIxLjY4NmEuNS41IDAgMCAwIC45MzctLjAyNGw2LjUtMTlhLjQ5Ni40OTYgMCAwIDAtLjYzNS0uNjM1bC0xOSA2LjVhLjUuNSAwIDAgMC0uMDI0LjkzN2w3LjkzIDMuMThhMiAyIDAgMCAxIDEuMTEyIDEuMTF6Ii8+PHBhdGggZD0ibTIxLjg1NCAyLjE0Ny0xMC45NCAxMC45MzkiLz48L3N2Zz4=' alt='Mensaje' />
                </li>
            )
          }
            */
          }
        </ul>
      </div>
    </div>
  )
}