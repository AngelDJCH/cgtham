import { io } from "socket.io-client";

/**
 * Singleton de conexión WebSocket para la plataforma institucional CGTHAM.
 * Comparte una única instancia de socket entre el NavBar (para notificaciones en tiempo real)
 * y la vista de Mensajería (para la interacción de chat en vivo).
 */
const socket = io(process.env.REACT_APP_URL_WEBSOCKET || 'http://localhost:3040', {
    transports: ['websocket'],
    autoConnect: true
});

export default socket;
