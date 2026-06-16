import { useEffect, useState } from "react"
import { createConvenio, deleteByIdConvenio, findById, updateConvenioById } from "../services/Convenio"
import { useNavigate } from "react-router-dom"
import { createConvenioOrganizacion, deleteById, findAllParticipantes, updateEstadoById } from "../services/ConvenioOrganizacion"
import { useAuth } from "../hooks/useAuth"
import { useMediaQuery } from "@uidotdev/usehooks"

export default function VisualizarConvenio(props) {

    const [participantes, setParticipantes] = useState([])

    const [disabled, setDisabled] = useState(true)

    const [idOrganizacion, setIdOrganizacion] = useState(null)

    const [openAdminstracion, setOpenAdministracion] = useState(false)

    const [idConvenioOrg, setIdConvenioOrg] = useState(null)

    const [convenioOrganizacion, setConvenioOrganizacion] = useState({
        rol: '',
        id_convenio: '',
        id_organizacion: ''
    })

    const [tiposConvenios, setTiposConvenios] = useState([
        {
            id: 1,
            tipo: 'Jerarquía y Alcance',
            subtipos: [
                {
                    id: 1,
                    subtipo: 'Marco'
                },
                {
                    id: 2,
                    subtipo: 'Especifico'
                }, {
                    id: 3,
                    subtipo: 'Intención'
                }
            ]
        }, {
            id: 2,
            tipo: 'Ámbito Educativo y Académico',
            subtipos: [
                {
                    id: 1,
                    subtipo: 'Prácticas Profesionales / Pasantías'
                }, {
                    id: 2,
                    subtipo: 'Cooperación Educativa'
                }, {
                    id: 3,
                    subtipo: 'Movilidad Académica'
                }, {
                    id: 4,
                    subtipo: 'Investigación y Desarrollo (I+D)'
                }
            ]
        }, {
            id: 3,
            tipo: 'Ámbito Empresarial y Comercial',
            subtipos: [
                {
                    id: 1,
                    subtipo: 'Colaboración Empresarial'
                }, {
                    id: 2,
                    subtipo: 'Confidencialidad (NDA)'
                }, {
                    id: 3,
                    subtipo: 'Patrocinio'
                }, {
                    id: 4,
                    subtipo: 'Proveeduría / B2B'
                }
            ]
        }, {
            id: 4,
            tipo: 'Ámbito Laboral y Social',
            subtipos: [
                {
                    id: 1,
                    subtipo: 'Colectivo de Trabajo'
                }, {
                    id: 2,
                    subtipo: 'Responsabilidad Social Corporativa (RSC)'
                }
            ]
        }, {
            id: 5,
            tipo: 'Hermanamiento',
            subtipos: [
                {
                    id: 1,
                    subtipo: 'Cooperación Técnica'
                }, {
                    id: 2,
                    subtipo: 'Acuerdos Interinstitucionales'
                }
            ]
        }
    ])

    const { user } = useAuth()

    const [selectTipo, setSelectTipo] = useState('')
    const navigate = useNavigate()
    const [openDocumento, setOpenDocumento] = useState(false)

    const [convenio, setConvenio] = useState(null)

    const handleRechazar = async (id_convenio_organizacion) => {
        const res = await deleteById(id_convenio_organizacion)
        if (res === 204) {
            const res = await findAllParticipantes(props?.id_convenio)
            setParticipantes(res)
        } else {
            alert('NO SE PUDO RECHAZAR LA SOLICITUD')
        }
    }

    const handleAprobar = async (id_convenio_organizacion) => {
        const res = await updateEstadoById(id_convenio_organizacion)
        if (res === 200) {
            const res = await findAllParticipantes(props?.id_convenio)
            setParticipantes(res)
        } else {
            alert('NO SE PUDO APROBAR LA SOLICITUD')
        }
    }

    useEffect(() => {
        const convenioData = async () => {
            const res = await findById(props?.id_convenio)
            setConvenio(res)
        }

        const participantesData = async () => {
            const res = await findAllParticipantes(props?.id_convenio)
            setParticipantes(res)
        }

        convenioData()
        participantesData()
    }, [])

    const isSmallDevice = useMediaQuery('(max-width:768px)');

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="formulario-contenedor" style={{ height: isSmallDevice ? '90%' : null }}>
                    <div className="titulo-formulario"><h1>{convenio?.titulo.substring(0, 25)}</h1></div>
                    <div className="formulario" style={{ height: isSmallDevice ? '80%' : null, width: isSmallDevice ? '100%' : null }}>
                        <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                            <div className="contenedor-datos-interno">
                                <h6 style={{ margin: '0' }}>Titulo:</h6>
                                <input type="text" placeholder="Titulo del convenio" defaultValue={convenio?.titulo}
                                    onChange={(e) => { setConvenio({ ...convenio, titulo: e.target.value }) }}
                                    disabled={disabled} />
                                <h6 style={{ margin: '0' }}>Descripción:</h6>
                                <textarea type="text" placeholder="Descripción del convenio"
                                    onChange={(e) => { setConvenio({ ...convenio, descripcion: e.target.value }) }}
                                    defaultValue={convenio?.descripcion}
                                    disabled={disabled}
                                />
                                <h6 style={{ margin: '0' }}>Tipo:</h6>
                                <select
                                    disabled={disabled}
                                    onChange={(e) => { setSelectTipo(e.target.value); setConvenio({ ...convenio, tipo: e.target.value }) }}>
                                    <option>
                                        TIPO
                                    </option>
                                    {
                                        tiposConvenios?.map(
                                            tipo => <option key={tipo.id}
                                                selected={tipo.tipo === convenio?.tipo}
                                            >{tipo.tipo}</option>
                                        )
                                    }
                                </select>
                                <h6 style={{ margin: '0' }}>Subtipo:</h6>
                                <select
                                    disabled={disabled}
                                    onChange={(e) => { setConvenio({ ...convenio, subtipo: e.target.value }) }}
                                >
                                    <option>
                                        SUBTIPO
                                    </option>
                                    {
                                        selectTipo.length >= 1 || tiposConvenios?.filter(t => t.tipo === convenio?.tipo).map(
                                            t => {
                                                return t.subtipos.map(
                                                    s => <option key={s.id}
                                                        selected={s.subtipo === convenio?.subtipo}
                                                    >{s.subtipo}</option>
                                                )
                                            }
                                        )
                                    }
                                </select>
                                {
                                    props?.propietario && (
                                        <div>
                                            <button className="btn-accion-2"
                                                onClick={() => { setOpenAdministracion(true) }}
                                            >
                                                ADMINISTRAR
                                            </button>
                                        </div>
                                    )
                                }
                                <h6 style={{ margin: '0' }}>Participantes</h6>
                                <select
                                //                                    disabled={disabled}
                                >
                                    {
                                        participantes?.filter(participante => participante.estado).map(
                                            participante => <option value={participante.organizacion.id}>
                                                {participante.organizacion.nombre}
                                            </option>
                                        )
                                    }
                                </select>
                                <h6 style={{ margin: '0' }}>Fechas:</h6>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                    <h6 style={{ margin: '0' }}>Inicio:</h6>
                                    <input disabled={disabled} type="date" onChange={(e) => setConvenio({ ...convenio, fecha_inicio: e.target.value })} defaultValue={convenio?.fecha_inicio.split('T')[0]} />
                                    <h6 style={{ margin: '0' }}>Fin:</h6>
                                    <input disabled={disabled} type="date" onChange={(e) => { setConvenio({ ...convenio, fecha_final: e.target.value }) }} defaultValue={convenio?.fecha_final.split('T')[0]} />
                                </div>

                                {
                                    isSmallDevice && (
                                        <button className="btn-accion-2"
                                            onClick={() => { convenio?.archivo ? setOpenDocumento(true) : alert('DOCUMENTO NO DISPONIBLE') }}
                                        ><strong>VER</strong></button>
                                    )
                                }

                            </div>
                        </div>
                        {
                            !isSmallDevice && (
                                <div style={{ width: '250px', height: '100%' }}>
                                    <div style={{ width: '100%', height: '90%', backgroundColor: 'gray' }}>
                                        <embed
                                            src={`https://docs.google.com/gview?url=${encodeURIComponent(convenio?.archivo)}&embedded=true`}
                                            width="100%"
                                            height="100%"
                                            frameborder="0"
                                        />                                        </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button className="btn-accion-2"
                                            onClick={() => { convenio?.archivo ? setOpenDocumento(true) : alert('DEBES SUBIR ALGUN DOCUMENTO') }}
                                        ><strong>VER</strong></button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{ width: isSmallDevice ? '100%' : '50%', height: '10vh', justifyContent: isSmallDevice?'center':'flex-end', display: 'flex', gap: '1rem' }}>
                        <button
                            className="btn-accion-cancelar-1"
                            onClick={() => { props?.accion(false) }}
                        ><strong>CERRAR</strong></button>
                        {
                            props?.propietario && (
                                <button
                                    onClick={async () => {
                                        disabled ? setDisabled(false) : setDisabled(true);
                                        if (!disabled) {
                                            const datosAEnviar = {
                                                ...convenio,
                                                fecha_inicio: convenio.fecha_inicio.split('T')[0],
                                                fecha_final: convenio.fecha_final.split('T')[0]
                                            };

                                            const res = await updateConvenioById(convenio?.id, datosAEnviar);
                                            if (res === 200) alert('CONVENIO GUARDADO EXITOSAMENTE')
                                            if (res != 200) alert('CONVENIO NO GUARDADO')
                                        }
                                    }}
                                    className="btn-accion-2"
                                ><strong>
                                        {
                                            disabled ? 'EDITAR' : 'GUARDAR'
                                        }
                                    </strong></button>
                            )
                        }
                        {
                            props?.propietario && (
                                <button className="btn-accion-cancelar-1"
                                    onClick={async () => {
                                        const res = await deleteByIdConvenio(convenio?.id)
                                        if (res === 204) {
                                            navigate(0)
                                        } else {
                                            alert('NO SE PUDO ELIMINAR EL CONVENIO')
                                        }
                                    }}
                                >
                                    <strong>
                                        ELIMINAR
                                    </strong>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                openDocumento && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{ width: '90%', height: '90%' }}>
                                <iframe
                                    src={`https://docs.google.com/gview?url=${encodeURIComponent(convenio?.archivo)}&embedded=true`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                />
                                <div><button
                                    className="btn-accion-cancelar-1"
                                    onClick={() => { setOpenDocumento(false) }}
                                ><strong>CERRAR</strong></button></div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                openAdminstracion && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{
                                width: '90%', height: '80vh', padding: '1rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
                                justifyContent: 'space-around', alignItems: 'center', gap: '1rem'
                            }}>
                                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%', maxHeight: '100%', overflowY: 'scroll' }}>
                                    <h1>ADMINISTRACIÓN DE PARTICIPANTES</h1>
                                    <table className="contenedor-tablas-interno">
                                        <thead>
                                            <tr>
                                                <th>ORGANIZACIÓN</th>
                                                <th>ROL</th>
                                                <th>ESTADO</th>
                                                <th>ACCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                participantes.map(
                                                    participante => <tr>
                                                        <td>{participante.organizacion.nombre}</td>
                                                        <td>PARTICIPANTE</td>
                                                        <td>{participante.estado ? 'APROBADO' : 'PENDIENTE'}</td>
                                                        <td>
                                                            {
                                                                !participante.estado && (
                                                                    <button className="btn-accion-cancelar-1"
                                                                        onClick={() => { handleRechazar(participante.id_convenio_organizacion) }}
                                                                    ><strong>RECHAZAR</strong></button>
                                                                )
                                                            }
                                                            {
                                                                !participante.estado && (
                                                                    <button className="btn-accion-2"
                                                                        onClick={() => { handleAprobar(participante.id_convenio_organizacion) }}
                                                                    ><strong>ACEPTAR</strong></button>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    className="btn-accion-cancelar-1"
                                    onClick={() => { setOpenAdministracion(false) }}
                                >
                                    <strong>CERRAR</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}