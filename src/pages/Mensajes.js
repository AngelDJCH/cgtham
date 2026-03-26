import { useEffect, useState } from "react";
import NavBarAutenticado from "../components/NavBarAutenticado";
import '../styles/mensajes.css'
import ListaUsuarios from "../components/ListaUsuarios";

export default function Mensajes() {

    const [mensaje, setMensaje] = useState('')

    let count = 0

    const [mensajes, setMensajes] = useState(
        [
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            },
            {
                id: 1,
                contenido: 'Escribe un mensaje'
            }
        ]
    )

    const [usuarioActivo, setUsuarioActivo] = useState(null)


    return (
        <div style={{ marginTop: '100px' }}>
            <NavBarAutenticado />

            <ListaUsuarios left='10px' right='0' selectUsuario={(usuario)=>setUsuarioActivo(usuario)}/>

            {usuarioActivo && (
                <div className="mensaje-contenedor" style={{ display: 'flex', justifyContent: 'end' }}>
                    <div style={{ width: '990px', marginRight: '50px', backgroundColor: 'white', borderRadius: '10px' }}>
                        <div className="encabezado-mensajes">
                            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="imagen" />
                            <h1>{usuarioActivo}</h1>
                        </div>
                        <div className="cuerpo-mensajes">
                            {
                                mensajes.map(
                                    mensaje => {
                                        count++
                                        return <div style={{ display: 'flex', justifyContent: count % 2 == 0 ? 'end' : 'start', padding: '1rem' }}>
                                            <p style={{ width: '200px', backgroundColor: count % 2 == 0 ? 'black' : 'red', color: 'white' }}>{mensaje.contenido}</p>
                                        </div>
                                    }
                                )
                            }
                        </div>
                        <div className="acciones-mensajes">
                            <input placeholder="Escribe un mensaje..." value={mensaje} onChange={(e)=>setMensaje(e.target.value)}/>
                            <img
                            
                            onClick={(e)=>{
                                const mensajeNuevo = {
                                    id : mensajes.length+1,
                                    contenido : mensaje
                                };    
                                setMensajes([...mensajes, mensajeNuevo]);
                                setMensaje('')
                            
                            }}
                            
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc2VuZC1ob3Jpem9udGFsLWljb24gbHVjaWRlLXNlbmQtaG9yaXpvbnRhbCI+PHBhdGggZD0iTTMuNzE0IDMuMDQ4YS40OTguNDk4IDAgMCAwLS42ODMuNjI3bDIuODQzIDcuNjI3YTIgMiAwIDAgMSAwIDEuMzk2bC0yLjg0MiA3LjYyN2EuNDk4LjQ5OCAwIDAgMCAuNjgyLjYyN2wxOC04LjVhLjUuNSAwIDAgMCAwLS45MDR6Ii8+PHBhdGggZD0iTTYgMTJoMTYiLz48L3N2Zz4=" alt="icono" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}