import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import { createOfertaLaboral, deleteOferta, getOfertaById, getOfertasLaboralesAll, getOfertasLaboralesByIdOrganizacion } from "../services/OfertaLaboral";
import { useNavigate } from "react-router-dom";
import '../styles/ofertaslaborales.css'
import { getOrganizacion } from "../services/Organizacion";
import { useAuth } from "../hooks/useAuth";
import { uploadDocument } from "../services/Upload";
import VisualizarOferta from "../components/VisualizarOferta";
import { useMediaQuery } from "@uidotdev/usehooks";
import Loader from '../components/Loader'

export default function OfertasLaborales() {

    const [loading, setLoading] = useState(false)

    const isSmallDevice = useMediaQuery('(max-width:768px) or (max-width:1024px)');

    const [documento, setDocumento] = useState(null)

    const [ofertasLaborales, setOfertasLaborales] = useState(null)
    const navigate = useNavigate()

    const [openPostulacion, setOpenPostulacion] = useState(false)
    const [selectOferta, setSelectOferta] = useState(null)
    const [openOferta, setOpenOferta] = useState(false)

    const [organizacion, setOrganizacion] = useState(null)

    const [openCreateOferta, setOpenCreateOferta] = useState(false)

    const [filtro, setFiltro] = useState('')

    const { user } = useAuth()

    const [ofertaData, setOfertaData] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        salario: '',
        jornada: '',
        tipo_contrato: '',
        vacantes: '',
        beneficios: '',
        habilidades_tecnicas: '',
        habilidades_blandas: '',
        departamento_area: '',
        modalidad: '',
        experiencia: '',
        estado: '',
        fecha_publicacion: '',
        id_empresa: '',
        documento: ''
    })

    const handleCreateOferta = async () => {

        setLoading(true)

        if (ofertaData.jornada === '---' ||
            ofertaData.tipo_contrato === '---' ||
            ofertaData.departamento_area === '---' ||
            ofertaData.modalidad === '---' ||
            documento === null
        ) {
            setLoading(false)
            alert('DEBES LLENAR TODOS LOS DATOS Y SUBIR EL DOCUMENTO DE OFERTA LABORAL EN PDF')
        } else {
            const res_document = await uploadDocument(documento, user.organizacion)
            if (res_document) {
                const res = await createOfertaLaboral({ ...ofertaData, id_empresa: user.organizacion, documento: res_document })
                setDocumento(null)
                if (res) {setLoading(false); navigate(0)}
                if (!res) {setLoading(false); alert('Debes llenar todos los datos')}
            }
        }
    }

    const [opcionesFiltros, setOpcionesFiltros] = useState({
        jornada: [
            { id: 1, opcion: 'Completa' },
            { id: 2, opcion: 'Media jornada' },
            { id: 3, opcion: 'Por horas' },
            { id: 4, opcion: 'Fines de semana' }
        ],
        tipo_contrato: [
            { id: 1, opcion: 'Indefinido' },
            { id: 2, opcion: 'Temporal' },
            { id: 3, opcion: 'Prestación de servicios' },
            { id: 4, opcion: 'Prácticas / Pasantía' }
        ],
        departamento_area: [
            { id: 1, opcion: 'Tecnología / IT' },
            { id: 2, opcion: 'Recursos Humanos' },
            { id: 3, opcion: 'Ventas / Comercial' },
            { id: 4, opcion: 'Finanzas' },
            { id: 5, opcion: 'Marketing' },
            { id: 6, opcion: 'Administración y Soporte Oficina' },
            { id: 7, opcion: 'Atención al Cliente / Soporte' },
            { id: 8, opcion: 'Operaciones y Logística' },
            { id: 9, opcion: 'Compras y Abastecimiento' },
            { id: 10, opcion: 'Legales y Cumplimiento' },
            { id: 11, opcion: 'Diseño y Creatividad' },
            { id: 12, opcion: 'Comunicación y Relaciones Públicas' },
            { id: 13, opcion: 'Ingeniería y Manufactura' },
            { id: 14, opcion: 'Producción y Operaciones Industriales' },
            { id: 15, opcion: 'Salud, Medicina y Enfermería' },
            { id: 16, opcion: 'Educación, Docencia y Ciencia' },
            { id: 17, opcion: 'Calidad, Seguridad y Medio Ambiente (HSE)' },
            { id: 18, opcion: 'Investigación y Desarrollo (I+D)' },
            { id: 19, opcion: 'Hotelería, Turismo y Gastronomía' },
            { id: 20, opcion: 'Construcción e Inmobiliaria' },
            { id: 21, opcion: 'Transporte y Distribución' },
            { id: 22, opcion: 'Mantenimiento y Oficios Técnicos' },
            { id: 23, opcion: 'Medios, Entretenimiento y Edición' },
            { id: 24, opcion: 'Sector Público y ONGs' },
            { id: 25, opcion: 'Seguros y Corretaje' },
            { id: 26, opcion: 'Consultoría y Estrategia' },
            { id: 27, opcion: 'Estética, Belleza y Bienestar' }
        ],
        modalidad: [
            { id: 1, opcion: 'Presencial' },
            { id: 2, opcion: 'Híbrida' },
            { id: 3, opcion: 'Remota' }
        ]
    });

    const handleUploadDocument = (e) => {
        setLoading(true)

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

        setLoading(false)
    }

    const [openDocumento, setOpenDocumento] = useState(false)


    useEffect(() => {
        const getOfertas = async () => {
            const res = await getOfertasLaboralesAll()
            setOfertasLaborales(res)
        }

        const getOfertasByIdOrganizacion = async () => {
            const res = await getOfertasLaboralesByIdOrganizacion(user.organizacion)
            setOfertasLaborales(res)
        }
        user.tipo != 'Escuela' && user.tipo != 'Comité' ? getOfertasByIdOrganizacion() : getOfertas()
    }, [])



    return (
        <div>
            <NavBarAutenticado />
            <Filtros enableAccion={user.tipo === 'Escuela' ? false : true} filtro={setFiltro} titulo='Ofertas Laborales' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='CREAR' btn_accion={setOpenCreateOferta} />
            <div className="contenedor-tablas">
                <div style={{ width: '85%', backgroundColor: 'white', display: 'flex', flexWrap: 'wrap', height: '100vh', maxHeight: '100vh', padding: '1rem', overflowY: 'scroll', gap: '1rem' }}>
                    {
                        ofertasLaborales?.filter(f => filtro?.length === 0 || f.titulo.includes(filtro)).map(
                            o => <div style={{ width: '250px', height: '200px', backgroundColor: '#AEB784', borderRadius: '10px' }}>
                                <div style={{ padding: '0.5rem', backgroundColor: '#41431B', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                    <h1 style={{ color: '#AEB784', fontFamily: 'Poppins', fontSize: '16px', margin: '0', padding: '0' }}>{o?.titulo?.substring(0, 15)} {o?.titulo?.length > 15 ? '...' : ''}</h1>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.3rem' }}>

                                    <div style={{ width: '90%', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#41431B' }}>
                                        <div style={{ width: '20px', height: '20px' }}>
                                            <img src={o?.empresa?.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%', backgroundColor: 'white' }} />
                                        </div>
                                        <div>
                                            <h6 style={{ color: 'white' }}>{o?.empresa?.nombre_comercial.split(' ')[0]}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '100%', paddingTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', alignItems: 'center' }}>

                                    <div className="tarjeta-datos-oferta" style={{ width: '100px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>VACANTES</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.vacantes}</h6>
                                        </div>
                                    </div>
                                    <div className="tarjeta-datos-oferta" style={{ width: '100px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>SALARIO</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>$</strong>{o?.salario}</h6>
                                        </div>
                                    </div>
                                    <div className="tarjeta-datos-oferta" style={{ width: '100px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>MODALIDAD</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.modalidad}</h6>
                                        </div>
                                    </div>
                                    <div className="tarjeta-datos-oferta" style={{ width: '100px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>AREA</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.departamento_area?.substring(0, 10)}...</h6>
                                        </div>
                                    </div>
                                    <div style={{ width: '150px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <button className="btn-accion-2"
                                            onClick={() => {
                                                setSelectOferta(o?.id)
                                                setOpenOferta(true)
                                            }}
                                        >
                                            <strong>VER MAS</strong>
                                        </button>
                                        {
                                            user.rol.includes('ADMIN_SYS') && (
                                                <button className="btn-accion-cancelar-1"
                                                    onClick={async () => {
                                                        const res = await deleteOferta(o?.id)
                                                        if (res === 204) navigate(0)
                                                        if (res != 204) alert('no se pudo eliminar la oferta')
                                                    }}
                                                >
                                                    <strong>ELIMINAR</strong>
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                openOferta && (
                    <VisualizarOferta id_oferta={selectOferta} accion={setOpenOferta} />
                )
            }

            {
                openCreateOferta && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div className="formulario-contenedor" style={{ width: isSmallDevice ? '90%' : null, height: isSmallDevice ? '90%' : null }}>
                                <div className="titulo-formulario"><h1 className="subtitulo">NUEVA OFERTA LABORAL</h1></div>
                                <div className="formulario" style={{ height: isSmallDevice ? '80%' : null, width: isSmallDevice ? '100%' : null }}>
                                    <div className="contenedor-datos-formulario" style={{ width: isSmallDevice ? '100%' : null }}>
                                        <div className="contenedor-datos-interno">
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Titulo:</h6>
                                            <input placeholder="Titulo" onChange={(e) => { setOfertaData({ ...ofertaData, titulo: e.target.value }) }} style={{ width: '100%' }} />
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Descripcion:</h6>
                                            <textarea onChange={(e) => { setOfertaData({ ...ofertaData, descripcion: e.target.value }) }} placeholder="Descripcion" />
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                                                <div>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Salario:</h6>
                                                    <input type="number" placeholder="Salario" onChange={(e) => { setOfertaData({ ...ofertaData, salario: e.target.value }) }} />
                                                </div>
                                                <div>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Experencia</h6>
                                                    <input type="number" onChange={(e) => { setOfertaData({ ...ofertaData, experiencia: e.target.value }) }} placeholder="Experencia (en años : 1)" />
                                                </div>
                                                <div>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Vacantes:</h6>
                                                    <input type="number" placeholder="Vacantes" onChange={(e) => { setOfertaData({ ...ofertaData, vacantes: e.target.value }) }} />
                                                </div>
                                            </div>
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Area</h6>
                                            <select onChange={(e) => { setOfertaData({ ...ofertaData, departamento_area: e.target.value }) }}>
                                                <option>---</option>
                                                {
                                                    opcionesFiltros.departamento_area.map(
                                                        d => <option>
                                                            {d.opcion}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                                                <div>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Jornada:</h6>
                                                    <select onChange={(e) => { setOfertaData({ ...ofertaData, jornada: e.target.value }) }}>
                                                        <option>---</option>
                                                        {
                                                            opcionesFiltros?.jornada?.map(
                                                                j => <option>
                                                                    {j.opcion}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Contrato:</h6>
                                                    <select onChange={(e) => { setOfertaData({ ...ofertaData, tipo_contrato: e.target.value }) }}>
                                                        <option>---</option>
                                                        {
                                                            opcionesFiltros.tipo_contrato.map(
                                                                t => <option>
                                                                    {t.opcion}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div>
                                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Modalidad</h6>
                                                    <select onChange={(e) => { setOfertaData({ ...ofertaData, modalidad: e.target.value }) }}>
                                                        <option>---</option>
                                                        {
                                                            opcionesFiltros.modalidad.map(
                                                                m => <option>
                                                                    {m.opcion}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Beneficios</h6>
                                            <textarea onChange={(e) => { setOfertaData({ ...ofertaData, beneficios: e.target.value }) }} placeholder="Beneficios - Separados por ," />
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '20px' }}>Habilidades</h6>
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Tecnicas</h6>
                                            <textarea onChange={(e) => { setOfertaData({ ...ofertaData, habilidades_tecnicas: e.target.value }) }} placeholder="Habilidades Tecnicas - Separados por ," />
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Blandas</h6>
                                            <textarea onChange={(e) => { setOfertaData({ ...ofertaData, habilidades_blandas: e.target.value }) }} placeholder="Habilidades Blandas - Separados por ," />
                                            <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Documento:</h6>
                                            <input id="documento" style={{ display: 'none' }} type="file" accept="pdf" onChange={handleUploadDocument} />
                                            <label htmlFor="documento" className="btn-accion-2" style={{ width: '50px', height: '30px' }}>
                                                <strong>SUBIR</strong>
                                            </label>
                                            {
                                                isSmallDevice && (
                                                    <button className="btn-accion-2"
                                                        onClick={() => { documento ? setOpenDocumento(true) : alert('DOCUMENTO NO DISPONIBLE') }}
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
                                <div style={{ width: '50%', height: '10vh', justifyContent: 'flex-end', display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCreateOferta(false); setDocumento(null) }}
                                    >
                                        <strong>CANCELAR</strong>
                                    </button>
                                    <button
                                        onClick={() => { handleCreateOferta() }}
                                        className="btn-accion-2"
                                    >
                                        <strong>CREAR</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                openDocumento && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{ width: '90%', height: '90%' }}>
                                <embed src={documento} width={'100%'} height={'100%'}></embed>
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
                loading && (
                    <Loader/>
                )
            }

        </div>
    )
}