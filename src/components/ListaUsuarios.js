import { useState } from 'react'
import '../styles/listausuarios.css'
import { useNavigate } from 'react-router-dom';
export default function ListaUsuarios(props){

const navigate = useNavigate()

const handleClick = (usuario)=>{
    props.selectUsuario(usuario)
}

const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      foto: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 2,
      nombre: 'María García',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 3,
      nombre: 'Pedro López',
      foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 5,
      nombre: 'Luis Rodríguez',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 6,
      nombre: 'Carmen Sánchez',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 7,
      nombre: 'Javier González',
      foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 8,
      nombre: 'Laura Díaz',
      foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 9,
      nombre: 'Diego Fernández',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 10,
      nombre: 'Sofía Álvarez',
      foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 11,
      nombre: 'Miguel Romero',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 12,
      nombre: 'Elena Ruiz',
      foto: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 13,
      nombre: 'Carlos Jiménez',
      foto: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 14,
      nombre: 'Lucía Torres',
      foto: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 15,
      nombre: 'Alejandro Gutiérrez',
      foto: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 16,
      nombre: 'Paula Moreno',
      foto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 17,
      nombre: 'David Flores',
      foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 18,
      nombre: 'Isabel Castro',
      foto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 19,
      nombre: 'Fernando Ortiz',
      foto: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 20,
      nombre: 'Daniela Silva',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
    }
  ]);

    return(
        <div className='listausuarios' style={{left:`${props.left}`, right:`${props.right}`}}>
            <div className='buscador'>
                <input placeholder='Ingresa el nombre de la organización o usuario'/>
            </div>
            <div className='lista'>
                <ul>
                    {
                        usuarios.map(
                            usuario => 
                                <li className='usuario-contenedor'
                                onClick={
                                  ()=>{
                                    if(props.selectUsuario){
                                      props.selectUsuario(usuario.nombre)
                                    }
                                    navigate('/mensajes')
                                  }
                                  }

                                >
                                    <img src={usuario.foto}/>
                                    <p>{usuario.nombre}</p>
                                    <img className='icono' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc2VuZC1pY29uIGx1Y2lkZS1zZW5kIj48cGF0aCBkPSJNMTQuNTM2IDIxLjY4NmEuNS41IDAgMCAwIC45MzctLjAyNGw2LjUtMTlhLjQ5Ni40OTYgMCAwIDAtLjYzNS0uNjM1bC0xOSA2LjVhLjUuNSAwIDAgMC0uMDI0LjkzN2w3LjkzIDMuMThhMiAyIDAgMCAxIDEuMTEyIDEuMTF6Ii8+PHBhdGggZD0ibTIxLjg1NCAyLjE0Ny0xMC45NCAxMC45MzkiLz48L3N2Zz4=' alt='Mensaje'/>
                                </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}