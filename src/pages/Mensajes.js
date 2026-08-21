import { useEffect, useState } from "react";
import NavBarAutenticado from "../components/NavBarAutenticado";
import '../styles/mensajes.css';
import ListaUsuarios from "../components/ListaUsuarios";
import { getOrganizacion } from "../services/Organizacion";
import { useAuth } from "../hooks/useAuth";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
//http://localhost:3040
const socket = io(process.env.REACT_APP_URL_WEBSOCKET || 'http://localhost:3040', {
    transports: ['websocket']
});

export default function Mensajes() {
    const isSmallDevice = useMediaQuery('(max-width:768px) or (max-width : 1024px)')

    const [mensaje, setMensaje] = useState('');
    const { user } = useAuth();
    const [idChat, setIdChat] = useState(' ');
    const [mensajes, setMensajes] = useState([]);
    const [organizacion, setOrganizacion] = useState(null);
    const [usuarioActivo, setUsuarioActivo] = useState(null);
    const [informacionSocket, setInformacionSocket] = useState('');
    const [createChat, setCreateChat] = useState(false)
    const navigate = useNavigate()

    // 1. Listeners Globales (Conexión, Desconexión y Chats entrantes)
    useEffect(() => {
        socket.on('connect', () => {
            console.log('El id del socket es: ', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('El usuario se desconectó');
        });

        socket.on('chat', (data) => {
            // Aseguramos el uso correcto de prevMensajes para evitar duplicados u obsoletos
            setMensajes((prevMensajes) => [...prevMensajes, data]);
        });

        socket.on('newChat', (data) => {
            setIdChat(data.chat_id)
        })

        return () => {
            socket.off('chat');
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    // 2. Listener exclusivo del canal de la organización (Controlado y Auto-limpiable)
    useEffect(() => {
        if (!user?.organizacion) return;

        const handleRoomResponse = (data) => {
            setIdChat(data.chat_id);
            setIdChat(data.chat_id);

            // SÓLO agregamos al array si la respuesta realmente contiene un mensaje de chat válido
            if (data && data.data && data) {
                setMensajes(data.data);
            } else {
                setCreateChat(true)
            }
        };

        // Escuchamos el evento
        socket.on(user.organizacion, handleRoomResponse);

        // LIMPIEZA: Apaga el escucha anterior cuando cambie de organización o se desmonte
        return () => {
            socket.off(user.organizacion, handleRoomResponse);
        };
    }, [user?.organizacion]);

    // 3. Emitir el 'join' al cambiar de usuario seleccionado
    useEffect(() => {
        if (!usuarioActivo) return;

        const getOrganizacionById = async () => {
            const data = await getOrganizacion(usuarioActivo);
            setOrganizacion(data);

            // Limpiamos la pantalla de mensajes viejos al cambiar de chat
            setMensajes([]);
            // Notificamos al servidor del cambio de sala
            socket.emit('join', { id_emisor: user?.organizacion, id_receptor: usuarioActivo });
        };

        getOrganizacionById();
    }, [usuarioActivo]);

    // 4. Enviar un nuevo mensaje
    const handleCreateNewMessage = () => {
        if (!mensaje.trim()) return;

        socket.emit('chat', {
            message: mensaje,
            room: idChat,
            id_emisor: user.organizacion,
            id_receptor: usuarioActivo
        });

        setMensaje('');
    };

    const handleCreateNewChat = () => {
        socket.emit('newChat', {
            organizacion1: user.organizacion,
            organizacion2: usuarioActivo
        })
        socket.emit('join', { id_emisor: usuarioActivo, id_receptor: user?.organizacion });
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <NavBarAutenticado />

            {
                !isSmallDevice && (
                    <ListaUsuarios isSmallDevice={false} mensaje={true} left='30px' right='0' selectUsuario={setUsuarioActivo} />
                )
            }

            {
                isSmallDevice && (
                    <ListaUsuarios position={'relative'} height={'auto'} width={'90%'} isSmallDevice={true} mensaje={true} left='0' right='0' selectUsuario={setUsuarioActivo} />
                )
            }



            {
                usuarioActivo && (
                    <div style={{ display: 'flex', justifyContent: isSmallDevice ? 'center' : 'flex-end', width: '100%', height: isSmallDevice ? '65vh' : '80vh' }}>
                        <div style={{ width: isSmallDevice ? '90%' : '70%', marginRight: isSmallDevice ? null : '25px', backgroundColor: 'white', borderRadius: '10px', height: '100%' }}>
                            <div className="encabezado-mensajes" style={{ width: '100%' }}>
                                <div style={{ width: '35px', height: '35px' }}>
                                    <img src={organizacion?.logo} alt="imagen" style={{ backgroundColor: 'white' }} />
                                </div>
                                <h1 onClick={()=>{
                                    navigate(`/organizacion/${organizacion?.id}`)
                                }} style={{ margin: '0', fontSize: isSmallDevice ? '18px' : '20px', cursor: 'pointer'}}>{user.organizacion === organizacion?.id ? `(YO)` : `${organizacion?.nombre_comercial}`}</h1>
                            </div>
                            <div className="cuerpo-mensajes">
                                {
                                    mensajes.map((msg, index) => {
                                        // Controlamos si viene como msg.contenido o msg.message
                                        const textoMensaje = msg?.contenido || msg?.message;
                                        const esEmisor = msg?.id_emisor === user.organizacion;

                                        // Si por alguna razón el mensaje sigue vacío, no renderizamos nada estorboso
                                        if (!textoMensaje) return null;

                                        return (
                                            <div key={index} style={{ display: 'flex', justifyContent: esEmisor ? 'end' : 'start', padding: '0.5rem', minWidth: '100px' }}>
                                                <p style={{ maxWidth: '70%', padding: '1rem', backgroundColor: esEmisor ? '#AEB784' : '#41431B', color: 'white', borderRadius: '8px', margin: 0 }}>
                                                    {textoMensaje}
                                                </p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            {
                                idChat && (
                                    <div className="acciones-mensajes">
                                        <input
                                            placeholder="Escribe un mensaje..."
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleCreateNewMessage()}
                                        />
                                        <div style={{ width: '25px', height: '25px' }}>
                                            <img
                                                onClick={handleCreateNewMessage}
                                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc2VuZC1ob3Jpem9udGFsLWljb24gbHVjaWRlLXNlbmQtaG9yaXpvbnRhbCI+PHBhdGggZD0iTTMuNzE0IDMuMDQ4YS40OTguNDk4IDAgMCAwLS42ODMuNjI3bDIuODQzIDcuNjI3YTIgMiAwIDAgMSAwIDEuMzk2bC0yLjg0MiA3LjYyN2EuNDk4LjQ5OCAwIDAgMCAuNjgyLjYyN2wxOC04LjVhLjUuNSAwIDAgMCAwLS45MDR6Ii8+PHBhdGggZD0iTTYgMTJoMTYiLz48L3N2Zz4="
                                                alt="icono"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }

            {
                createChat && (<div>
                    <div className="overllay"></div>
                    <div className="overllay-contenedor">
                        <div style={{
                            width: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',
                            padding: '1rem', height: 'auto', borderRadius: '10px'
                        }}>
                            <h1>¿QUIERES CREAR UN CHAT?</h1>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                <button
                                    className="btn-accion-cancelar-1"
                                    onClick={() => { setCreateChat(false) }}
                                ><strong>NO</strong></button>
                                <button
                                    className="btn-accion-2"
                                    onClick={() => { handleCreateNewChat(); setCreateChat(false) }}
                                ><strong>SI</strong></button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
}