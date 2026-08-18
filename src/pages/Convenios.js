import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { createConvenioOrganizacio, createConvenioOrganizacion, findAll } from "../services/ConvenioOrganizacion";
import { useAuth } from "../hooks/useAuth";
import { createConvenio } from "../services/Convenio";
import { useNavigate } from "react-router-dom";
import { uploadDocument } from "../services/Upload";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function Convenios() {
    const isSmallDevice = useMediaQuery('(max-width:768px) or (max-width:1024px)');

    const [documento, setDocumento] = useState(null)
    const [openDocumento, setOpenDocumento] = useState(false)

    const [openCreateConvenio, setOpenCreateConvenio] = useState(false)
    const { user } = useAuth()
    const [convenios, setConvenios] = useState([])

    const [convenio, setConvenio] = useState({
        titulo: '',
        descripcion: '',
        tipo: '',
        subtipo: '',
        estado: true,
        documento: '',
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
        setDocumento(null)
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
            <Filtros enableAccion={true} btn_accion={setOpenCreateConvenio} titulo='Convenios' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='Crear convenio' />
            <TablaContenido encabezados={['Titulo', 'Tipo', 'Subtipo', 'Descripcion', 'Anfitrion', 'Registro', 'Inicio', 'Fin', 'Acciones']} conveniosTabla={convenios} />
            {
                openCreateConvenio && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div className="formulario-contenedor" style={{ height: isSmallDevice ? '90%' : null, width: isSmallDevice ? '100%' : null }}>
                                <div className="titulo-formulario"><h1>NUEVO CONVENIO</h1></div>
                                <div className="formulario" style={{ height: isSmallDevice ? '80%' : null, width: isSmallDevice ? '100%' : null }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                        <div className="contenedor-datos-interno">
                                            <h6 style={{ margin: '0' }}>Titulo:</h6>
                                            <input type="text" placeholder="Titulo del convenio"
                                                onChange={(e) => { setConvenio({ ...convenio, titulo: e.target.value }) }}
                                            />
                                            <h6 style={{ margin: '0' }}>Descripción:</h6>
                                            <textarea type="text" placeholder="Descripción del convenio"
                                                onChange={(e) => { setConvenio({ ...convenio, descripcion: e.target.value }) }}
                                            />
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
                                            <h6 style={{ margin: '0' }}>Fechas:</h6>

                                            <div className="group-two-input">
                                                <h6 style={{ margin: '0' }}>Inicio:</h6>
                                                <input className="input-date" type="date" onChange={(e) => setConvenio({ ...convenio, fecha_inicio: e.target.value })} />
                                                <h6 style={{ margin: '0' }}>Fin:</h6>
                                                <input className="input-date" type="date" onChange={(e) => { setConvenio({ ...convenio, fecha_final: e.target.value }) }} />
                                            </div>
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Documento:</h6>
                                            <input id="documento" style={{ display: 'none' }} type="file" accept="pdf" onChange={handleUploadDocument} />
                                            <label htmlFor="documento" className="btn-accion-2" style={{ width: '50px', height: '30px' }}>
                                                <strong>SUBIR</strong>
                                            </label>
                                            {
                                                isSmallDevice && (
                                                    <button className="btn-accion-2"
                                                        onClick={() => { documento ? setOpenDocumento(true) : alert('DEBES SUBIR ALGUN DOCUMENTO') }}
                                                    ><strong>VER</strong></button>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        !isSmallDevice && (
                                            <div style={{ width: '250px', height: '100%' }}>
                                                <div style={{ width: '100%', height: '90%', backgroundColor: 'gray' }}>
                                                    <embed src={documento} width={'100%'} height={'100%'}></embed>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <button className="btn-accion-2"
                                                        onClick={() => { documento ? setOpenDocumento(true) : alert('DEBES SUBIR ALGUN DOCUMENTO') }}
                                                    ><strong>VER</strong></button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div style={{ width: '100%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCreateConvenio(false) }}
                                    ><strong>CERRAR</strong></button>
                                    <button
                                        style={{ marginRight: '1rem' }}
                                        onClick={async () => {
                                            if (convenio.titulo.length >= 1 && convenio.descripcion.length >= 1 &&
                                                convenio.tipo.length >= 1 && convenio.subtipo.length >= 1 &&
                                                convenio.fecha_inicio.length >= 1 && convenio.fecha_final.length >= 1 &&
                                                convenio.tipo != 'TIPO' && convenio.subtipo != 'SUBTIPO'
                                            ) {
                                                const document = await uploadDocument(documento, user.organizacion)
                                                const resConvenio = await createConvenio(convenio, document)
                                                const id_convenio_res = resConvenio.id
                                                const resConvenioOrganizacion = await createConvenioOrganizacion('ANFITRION', id_convenio_res, user.organizacion)
                                                if (resConvenioOrganizacion === 201) {
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
                        </div></div>

                )
            }

            {
                openDocumento && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{ width: '90%', height: '90%' }}>
                                <embed src={documento} width={'100%'} height={'100%'}></embed>
                                <div
                                    style={{ width: '100%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}
                                ><button
                                    className="btn-accion-cancelar-1"
                                    onClick={() => { setOpenDocumento(false) }}
                                ><strong>CERRAR</strong></button></div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}