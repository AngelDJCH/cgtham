import { axiosInstance } from "./Axios"

export const findToEmpresas = async () => {
    try {
        const {data} = await axiosInstance.get('/cursos/empresas/')
        return data
    } catch (error) {
        console.log(error)
    }
}

export const findToEscuelas = async (id_organizacion) => {
    try {
        const {data} = await axiosInstance.get(`/cursos/escuelas/${id_organizacion}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createCurso = async (curso) => {
    try {
        const res = await axiosInstance.post('/cursos/', {
            titulo :  curso.titulo,
            descripcion : curso.descripcion,
            fecha_inicio : curso.inicio,
            fecha_final : curso.final,
            estado : 'PUBLICADO',
            id_organizacion : curso.id_organizacion
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const solicitar = async (titulo, descripcion, id_organizacion) => {
    try {
        const data = {
            titulo : titulo,
            descripcion :  descripcion,
            estado : 'SOLICITUD',
            id_organizacion : id_organizacion
        }
        const {status} = await axiosInstance.post('/cursos/solicitar/', data)
        return status
    } catch (error) {
        alert('No se pudo solicitar el curso')
        console.log(error)
    }
}

export const allSolicitudes = async (id_organizacion) => {
    try {
        const {data} = await axiosInstance.get(`/cursos/solicitudes/${id_organizacion}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateEstadoById = async (id_curso) => {
    try {
        const {status} = await axiosInstance.put(`/cursos/estado/${id_curso}`)
        return status
    } catch (error) {
        console.log(error)
    }
}

export const findByIdCurso = async (id_curso) => {
    try {
        const {data} = await axiosInstance.get(`/cursos/${id_curso}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateById = async (titulo, descripcion, fecha_inicio, fecha_final, id_curso) => {
    try {
        const res = await axiosInstance.put(`/cursos/${id_curso}`, {
            titulo : titulo, descripcion : descripcion, inicio : fecha_inicio, final : fecha_final
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteCursoById = async (id_curso) => {
    try {
        const res = await axiosInstance.delete(`/cursos/${id_curso}`)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const createInscripcionCurso = async (id_curso, id_organizacion) => {
    try {
        const {status} = await axiosInstance.post('/inscripcionCurso/', {
            id_curso : id_curso,
            id_organizacion : id_organizacion
        })
        return status
    } catch (error) {
        return error.response.status
    }
}

export const organizacionesParticipantes = async (id_curso) => {
    try {
        const {data} = await axiosInstance.get(`/inscripcionCurso/participantes/${id_curso}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const organizacionesPendientes = async (id_curso) => {
    try {
        const {data} = await axiosInstance.get(`/inscripcionCurso/pendientes/${id_curso}`)
        return data
    } catch (error) {
        console.log8(error)
    }
}

export const updateInscripcionByEstado = async (id_inscripcion, estado) => {
    try {
        const {status} = await axiosInstance.put(`/inscripcionCurso/${id_inscripcion}`,{estado:estado})
        return status
    } catch (error) {
        console.log(error)
    }
}