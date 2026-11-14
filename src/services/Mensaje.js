import { axiosInstance } from './Axios';

/**
 * Consulta los mensajes pendientes o recientes dirigidos a la organización activa.
 * Permite detectar al iniciar sesión o cargar la página si existen conversaciones
 * donde el último mensaje fue enviado por otra entidad y requiere atención.
 */
export const getMensajesPendientesPorOrganizacion = async (idOrganizacion) => {
    try {
        if (!idOrganizacion) return [];
        const { data } = await axiosInstance.get(`/mensajes/pendientes/${idOrganizacion}`);
        return data || [];
    } catch (error) {
        console.error('Error al obtener mensajes pendientes:', error);
        return [];
    }
};
