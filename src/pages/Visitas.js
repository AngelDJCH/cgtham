import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { useAuth } from "../hooks/useAuth";
import { getAllOrganizaciones } from "../services/Organizacion";
import { allVisitasByIdEmpresa, allVisitasByIdEscuela, createVisita } from "../services/Visita";
import { wait } from "@testing-library/user-event/dist/utils";

export default function Visitas() {
    const [filtro, setFiltro] = useState('')
    const { user } = useAuth()

    const [idEmpresa, setIdEmpresa] = useState('')

    const [openCreateVisita, setOpenCreateVisita] = useState(false)

    const [organizaciones, setOrganizaciones] = useState([])

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


        if (user.tipo === 'Escuela') {
            vistEscuela()
        } else {
            vistEmpresa()
        }
        orgs()
    }, [])

    return (
        <div>
            <NavBarAutenticado />
            <Filtros btn_accion={setOpenCreateVisita} accion='SOLICITAR' enableAccion={user.tipo === 'Escuela' ? true : false} titulo='Visitas' filtro={user.tipo === 'Escuela' ? setFiltro : null} placeholder={user.tipo === 'Escuela' ? 'Escribe el nombre de la empresa' : null} />
            <TablaContenido visitasTabla={visitas} encabezados={user.tipo === 'Escuela' ? ['ID', 'Empresa', 'Solicitado', 'Aprobado', 'Agendado', 'Estado', 'Acciones'] : ['ID', 'Escuela', 'Solicitado', 'Aprobado', 'Agendado', 'Estado', 'Acciones']} />


            {
                openCreateVisita && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', padding: '1rem' }}>
                                <div>
                                    <h1>SOLICITUD</h1>
                                    <h6>EMPRESA:</h6>
                                    <select onChange={(e) => { setIdEmpresa(e.target.value) }}>
                                        <option>----</option>
                                        {
                                            organizaciones.filter(org => org.tipo != 'Escuela').map(
                                                org => <option value={org.id}>
                                                    {org.nombre_comercial}
                                                </option>
                                            )
                                        }
                                    </select>
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