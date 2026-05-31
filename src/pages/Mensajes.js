import { useEffect, useState } from "react";
import NavBarAutenticado from "../components/NavBarAutenticado";
import '../styles/mensajes.css'
import ListaUsuarios from "../components/ListaUsuarios";
import { getOrganizacion } from "../services/Organizacion";
import { useAuth } from "../hooks/useAuth";
import { findAllMensajesChat } from "../services/Mensajes";
import { io } from "socket.io-client";

export default function Mensajes() {

    const socket = io('http://localhost:3040', {
        transports : ['websocket']
    })

    const [mensaje, setMensaje] = useState('')

    const {user} = useAuth()

    const [roomActual, setRoomActual] = useState('')

    let count = 0

    const [mensajes, setMensajes] = useState(
        [
        ]
    )

    const hanldeJoinRoom = async (rom1,rom2) => {
        console.log(rom1, rom2)
        socket.emit('join', {id_emisor: rom1, id_receptor:rom2})
    }

    const [organizacion, setOrganizacion] = useState(null)

    const [usuarioActivo, setUsuarioActivo] = useState(null)

    useEffect(()=>{
        socket.on('connect', ()=>{
            console.log('El id del socket es: ',socket.id)
            // hanldeJoinRoom()
        })

        socket.on('disconnect', ()=>{
            console.log('El usuario se desconecto')
        })
    }, [])

    useEffect(()=>{
        const getOrganizacionById = async () => {
            const data = await getOrganizacion(usuarioActivo)
            setOrganizacion(data)
            const mensajesData = await findAllMensajesChat(user.organizacion, usuarioActivo)
            setMensajes(mensajesData)
            hanldeJoinRoom(usuarioActivo, user.organizacion)
        }
        getOrganizacionById()
    },[usuarioActivo])


    return (
        <div style={{ marginTop: '100px' }}>
            <NavBarAutenticado />

            <ListaUsuarios mensaje={true} left='10px' right='0' selectUsuario={setUsuarioActivo}/>

            {usuarioActivo && (
                <div className="mensaje-contenedor" style={{ display: 'flex', justifyContent: 'end' }}>
                    <div style={{ width: '990px', marginRight: '50px', backgroundColor: 'white', borderRadius: '10px' }}>
                        <div className="encabezado-mensajes">
                            <img src={organizacion?.logo} alt="imagen" />
                            <h1>{user.organizacion === organizacion?.id ? `${organizacion?.nombre_comercial} (YO)` : `${organizacion?.nombre_comercial}`}</h1>
                        </div>
                        <div className="cuerpo-mensajes">
                            {
                                mensajes?.map(
                                    mensaje => {
                                        return <div style={{ display: 'flex', justifyContent: mensaje.id_emisor === user.organizacion  ? 'end' : 'start', padding: '1rem', minWidth:'100px', maxHeight:'300px', minHeight:'50px', maxHeight:'100px' }}>
                                            <p style={{width:'100%',height:'100%',padding:'1rem',backgroundColor: mensaje.id_emisor === user.organizacion  ? '#AEB784' : '#41431B', color: 'white' }}>{mensaje.contenido}</p>
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