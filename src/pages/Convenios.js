import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { createConvenioOrganizacio, createConvenioOrganizacion, findAll } from "../services/ConvenioOrganizacion";
import { useAuth } from "../hooks/useAuth";
import { createConvenio } from "../services/Convenio";
import { useNavigate } from "react-router-dom";
import { uploadDocument } from "../services/Upload";

export default function Convenios() {

    const [documento, setDocumento] = useState(null)

    const [openCreateEvento, setOpenCreateEvento] = useState(false)
    const { user } = useAuth()
    const [convenios, setConvenios] = useState([])

    const [convenio, setConvenio] = useState({
        titulo: '',
        descripcion: '',
        tipo: '',
        subtipo: '',
        estado: true,
        documento : '',
        fecha_inicio: '',
        fecha_final: ''
    })

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

    const [selectTipo, setSelectTipo] = useState('')
    const navigate = useNavigate()


    const handleUploadDocument = (e) => {
        const file = e.target.files[0]
        try {
            const reader = new FileReader()
            reader.onload = function () {
                setDocumento(reader.result)
            }
            reader.readAsDataURL(file)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getConvenios = async () => {
            const res = await findAll()
            setConvenios(res)
        }
        getConvenios()
        console.log(convenios)
    }, [])

    return (
        <div>
            <NavBarAutenticado />
            <Filtros enableAccion={true} btn_accion={setOpenCreateEvento} titulo='Convenios' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='Crear convenio' />
            <TablaContenido encabezados={['Titulo', 'Tipo', 'Subtipo', 'Descripcion', 'Anfitrion', 'Registro', 'Inicio', 'Fin', 'Acciones']} conveniosTabla={convenios} />
            {
                openCreateEvento && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ flexDirection: 'row' }}>
                            <div style={{ width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white', padding: '1rem', borderRadius: '10px', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h6 style={{ margin: '0' }}>Titulo:</h6>
                                    <input type="text" placeholder="Titulo del convenio"
                                        onChange={(e) => { setConvenio({ ...convenio, titulo: e.target.value }) }}
                                    />
                                    <h6 style={{ margin: '0' }}>Descripción:</h6>
                                    <textarea type="text" placeholder="Descripción del convenio" style={{ maxWidth: '100%', maxHeight: '200px', minWidth: '100%', minHeight: '200px' }}
                                        onChange={(e) => { setConvenio({ ...convenio, descripcion: e.target.value }) }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h6 style={{ margin: '0' }}>Tipo:</h6>
                                    <select onChange={(e) => { setSelectTipo(e.target.value); setConvenio({ ...convenio, tipo: e.target.value }) }}>
                                        <option>
                                            TIPO
                                        </option>
                                        {
                                            tiposConvenios?.map(
                                                tipo => <option key={tipo.id}>{tipo.tipo}</option>
                                            )
                                        }
                                    </select>
                                    <h6 style={{ margin: '0' }}>Subtipo:</h6>
                                    <select
                                        onChange={(e) => { setConvenio({ ...convenio, subtipo: e.target.value }) }}
                                    >
                                        <option>
                                            SUBTIPO
                                        </option>
                                        {
                                            selectTipo.length >= 1 && tiposConvenios?.filter(t => t.tipo === selectTipo).map(
                                                t => {
                                                    return t.subtipos.map(
                                                        s => <option key={s.id}>{s.subtipo}</option>
                                                    )
                                                }
                                            )
                                        }
                                    </select>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                    <h6 style={{ margin: '0' }}>Inicio:</h6>
                                    <input type="date" onChange={(e) => setConvenio({ ...convenio, fecha_inicio: e.target.value })} />
                                    <h6 style={{ margin: '0' }}>Fin:</h6>
                                    <input type="date" onChange={(e) => { setConvenio({ ...convenio, fecha_final: e.target.value }) }} />
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCreateEvento(false) }}
                                    ><strong>CERRAR</strong></button>
                                    <button
                                        onClick={async () => {
                                            if (convenio.titulo.length >= 1 && convenio.descripcion.length >= 1 &&
                                                convenio.tipo.length >= 1 && convenio.subtipo.length >= 1 &&
                                                convenio.fecha_inicio.length >= 1 && convenio.fecha_final.length >= 1 &&
                                                convenio.tipo != 'TIPO' && convenio.subtipo != 'SUBTIPO'
                                            ) {
                                                const document = await uploadDocument(documento, user.organizacion)
                                                const resConvenio = await createConvenio(convenio, document)
                                                const id_convenio_res = resConvenio.id
                                                console.log(resConvenio)
                                                const resConvenioOrganizacion = await createConvenioOrganizacion('ANFITRION', id_convenio_res, user.organizacion)
                                                if (resConvenioOrganizacion.status === 201) {
                                                    navigate(0)
                                                } else {
                                                    alert('Ocurrio un error')
                                                }
                                            } else {
                                                alert('FALTAN CAMPOS DE LLENAR')
                                            }
                                        }}
                                        className="btn-accion-2"
                                    ><strong>CREAR</strong></button>
                                </div>
                            </div>
                            <div style={{ width: '400px', height: '400px' }}>
                                <embed src={documento ? documento : null} width={'100%'} height={'100%'}></embed>
                                <input id="documento" style={{ display: 'flex' }} type="file" accept="pdf" onChange={handleUploadDocument} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}