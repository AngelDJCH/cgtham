import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { useAuth } from "../hooks/useAuth";
import { getAllOrganizaciones } from "../services/Organizacion";
import { allVisitasByIdEmpresa, allVisitasByIdEscuela, allVisitasForAdministrador, createVisita } from "../services/Visita";
import { wait } from "@testing-library/user-event/dist/utils";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function Visitas() {
    const [filtro, setFiltro] = useState('')
    const { user } = useAuth()

    const [idEmpresa, setIdEmpresa] = useState('')

    const [openCreateVisita, setOpenCreateVisita] = useState(false)

    const [organizaciones, setOrganizaciones] = useState([])
    const isSmallDevice = useMediaQuery('(max-width:768px)');
    const isLargeDevice = useMediaQuery('(min-width:992px)')

    const [visitas, setVisitas] = useState([])

    const handleVisitaCreate = async () => {
        try {
            const status = await createVisita(user.organizacion, idEmpresa)
            if (status === 201) { alert('Solicitud de visita realizada con exito') }
            if (status != 201) { alert('La solicitud de visita no se realizo con exito') }
        } catch (error) {
            alert('Ocurrio un error')
        }
    }

    useEffect(() => {
        const orgs = async () => {
            const res = await getAllOrganizaciones()
            setOrganizaciones(res)
        }

        const vistEmpresa = async () => {
            const data = await allVisitasByIdEmpresa(user.organizacion)
            setVisitas(data)
        }

        const vistEscuela = async () => {
            const data = await allVisitasByIdEscuela(user.organizacion)
            setVisitas(data)
        }

        const vistAdministrador = async () => {
            const data = await allVisitasForAdministrador()
            setVisitas(data)
        }


        if (user.tipo === 'Escuela') {
            vistEscuela()
        } else if ((user.tipo === 'Empresa') || (user.tipo === 'Cámara de Comercio')) {
            vistEmpresa()
        } else {
            vistAdministrador()
        }

        orgs()
    }, [])

    return (
        <div>
            <NavBarAutenticado />
            <Filtros btn_accion={setOpenCreateVisita} accion='SOLICITAR' enableAccion={user.tipo === 'Escuela' ? true : false} titulo='Visitas' filtro={user.tipo === 'Escuela' ? setFiltro : null} placeholder={user.tipo === 'Escuela' ? 'Escribe el nombre de la empresa' : null} />
            <TablaContenido filtro={filtro} visitasTabla={visitas} encabezados={user.tipo === 'Escuela' ? ['ID', 'Empresa', 'Solicitado', 'Aprobado', 'Agendado', 'Estado', 'Acciones'] : user.tipo === 'Empresa' || user.tipo === 'Cámara de Comercio' ? ['ID', 'Escuela', 'Solicitado', 'Aprobado', 'Agendado', 'Estado', 'Acciones'] : ['ID', 'Escuela', 'Empresa', 'Acciones']} />


            {
                openCreateVisita && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div className="formulario-contenedor" style={{ height: isSmallDevice ? '100%' : null, height: isSmallDevice ? 'auto' : null }}>
                                <div className="titulo-formulario"><h1 className="subtitulo">NUEVA SOLICITUD DE VISITA</h1></div>
                                <div className="formulario" style={{ width: isSmallDevice ? '100%' : null, height: 'auto' }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null, scrollbarWidth: 'none' }}>
                                        <div className="contenedor-datos-interno">
                                            <h6>EMPRESA:</h6>
                                            <select onChange={(e) => { setIdEmpresa(e.target.value) }} style={{ color: 'white', border: '2px solid #41431B', backgroundColor: '#8b8e5b' }}>
                                                <option>Empresa:              ---</option>
                                                {
                                                    organizaciones.filter(org => org.tipo != 'Escuela' && org.tipo != 'Comité').map(
                                                        org => <option value={org.id}>
                                                            {org.nombre_comercial}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                            {
                                                isSmallDevice && (
                                                    <div style={{ width: '100%', height: '100%' }}>
                                                        <p style={{ textAlign: 'justify' }}><strong>Nota: </strong>
                                                            Una vez realizada la solicitud, la empresa correspondiente evaluará la petición para aceptar y agendar la reunión o visita. Por favor, mantente a la espera de su respuesta. <br></br>
                                                            En caso de presentar algún problema con el sistema o tener dudas, puedes reportarlo a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        !isSmallDevice && !isLargeDevice && (
                                            <div style={{ width: '250px', height: '100%' }}>
                                                <p style={{ textAlign: 'justify' }}><strong>Nota: </strong>
                                                    Una vez realizada la solicitud, la empresa correspondiente evaluará la petición para aceptar y agendar la reunión o visita. Por favor, mantente a la espera de su respuesta. <br></br>
                                                    En caso de presentar algún problema con el sistema o tener dudas, puedes reportarlo a <kbd><strong>cgtham@gmail.com</strong></kbd></p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="contenedor-botones-formulario">
                                    <button className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCreateVisita(false) }}
                                    ><strong>CANCELAR</strong></button>
                                    <button className="btn-accion-2"
                                        onClick={() => { setOpenCreateVisita(false); handleVisitaCreate() }}
                                    ><strong>SOLICITAR</strong></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}