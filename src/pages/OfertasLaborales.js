import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import { createOfertaLaboral, deleteOferta, getOfertaById, getOfertasLaboralesAll, getOfertasLaboralesByIdOrganizacion } from "../services/OfertaLaboral";
import { useNavigate } from "react-router-dom";
import '../styles/ofertaslaborales.css'
import { getOrganizacion } from "../services/Organizacion";
import { useAuth } from "../hooks/useAuth";
import { uploadDocument } from "../services/Upload";

export default function OfertasLaborales() {


    const [documento, setDocumento] = useState(null)

    const [ofertasLaborales, setOfertasLaborales] = useState(null)
    const navigate = useNavigate()

    const [openPostulacion, setOpenPostulacion] = useState(false)
    const [selectOferta, setSelectOferta] = useState(null)
    const [openOferta, setOpenOferta] = useState(false)
    const [oferta, setOferta] = useState({
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
        id_empresa: ''
    })
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
        if (ofertaData.jornada === '---' ||
            ofertaData.tipo_contrato === '---' ||
            ofertaData.departamento_area === '---' ||
            ofertaData.modalidad === '---' ||
            documento === null
        ) {
            alert('DEBES LLENAR TODOS LOS DATOS Y SUBIR EL DOCUMENTO DE OFERTA LABORAL EN PDF')
        } else {
            const res_document = await uploadDocument(documento, user.organizacion)
            if (res_document) {
                const res = await createOfertaLaboral({ ...ofertaData, id_empresa: user.organizacion, documento: res_document })
                setDocumento(null)
                if (res) navigate(0)
                if (!res) alert('Debes llenar todos los datos')
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
            { id: 5, opcion: 'Marketing' }
        ],
        modalidad: [
            { id: 1, opcion: 'Presencial' },
            { id: 2, opcion: 'Híbrida' },
            { id: 3, opcion: 'Remota' }
        ]
    });

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

    useEffect(() => {
        const getOferta = async () => {
            const res = await getOfertaById(selectOferta)
            setOferta(res)
            const resOrg = await getOrganizacion(res?.id_empresa)
            setOrganizacion(resOrg)
        }
        getOferta()
    }, [selectOferta])

    return (
        <div>
            <NavBarAutenticado />
            <Filtros enableAccion={user.tipo === 'Escuela' ? false : true} filtro={setFiltro} titulo='Ofertas Laborales' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='Crear oferta laboral' btn_accion={setOpenCreateOferta} />
            <div className="contenedor-tablas">
                <div style={{ width: '85%', backgroundColor: 'white', display: 'flex', flexWrap: 'wrap', height: '100vh', maxHeight: '100vh', padding: '1rem', overflowY: 'scroll', gap: '1rem' }}>
                    {
                        ofertasLaborales?.filter(f => filtro?.length === 0 || f.titulo.includes(filtro)).map(
                            o => <div style={{ width: '250px', height: '200px', backgroundColor: '#AEB784', borderRadius: '10px' }}>
                                <div style={{ padding: '0.5rem', backgroundColor: '#41431B', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                    <h1 style={{ color: '#AEB784', fontFamily: 'Poppins', fontSize: '16px', margin: '0', padding: '0' }}>{o?.titulo}</h1>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.3rem' }}>

                                    <div style={{ width: '200px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#41431B' }}>
                                        <div style={{ width: '20px', height: '20px' }}>
                                            <img src={o?.empresa?.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%', backgroundColor: 'white' }} />
                                        </div>
                                        <div>
                                            <h6 style={{ color: 'white' }}>{o?.empresa?.nombre_comercial.split(' ')[0]}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '100%', padding: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', alignItems: 'center' }}>

                                    <div className="tarjeta-datos-oferta" style={{ width: '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>VACANTES</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.vacantes}</h6>
                                        </div>
                                    </div>
                                    <div className="tarjeta-datos-oferta" style={{ width: '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>SALARIO</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>$</strong>{o?.salario}</h6>
                                        </div>
                                    </div>
                                    <div className="tarjeta-datos-oferta" style={{ width: '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>MODALIDAD</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.modalidad}</h6>
                                        </div>
                                    </div>
                                    <div className="tarjeta-datos-oferta" style={{ width: '80px', display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center', height: '30px', backgroundColor: '#ffffff' }}>
                                        <div>
                                            <h6 style={{ fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}><strong>AREA</strong></h6>
                                            <h6 style={{ color: '#41431B', fontSize: '10px', margin: 0, padding: 0, textAlign: 'center' }}>{o?.departamento_area}</h6>
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
                                                        const res = await deleteOferta(oferta?.id)
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
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '400px', backgroundColor: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                <div style={{ width: '100%', height: '150px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                    <img src={organizacion?.banner} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px' }}>
                                        <img src={organizacion?.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%' }} />
                                    </div>
                                    <h1 style={{ margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '20px' }}>{organizacion?.nombre_comercial}</h1>
                                </div>
                                <div>
                                    <h1 style={{ margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '18px', marginLeft:'1rem'}}>{oferta?.titulo}</h1>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <p style={{ width: '90%', height: '50px', maxHeight: '50px', overflowY: 'scroll', textAlign: 'justify', scrollbarWidth:'none'}}>{oferta?.descripcion}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Salario:</strong></p>
                                        <p><strong>$</strong>{oferta?.salario}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Jornada:</strong></p>
                                        <p>{oferta?.jornada}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Contrato:</strong></p>
                                        <p>{oferta?.tipo_contrato}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Vacantes:</strong></p>
                                        <p>{oferta?.vacantes}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <p><strong>Habilidades:</strong></p>
                                    <select style={{ width: '100px' }}>
                                        <option>TECNICAS</option>
                                        {
                                            oferta?.habilidades_tecnicas.split(',').map(
                                                h => <option>
                                                    {h}
                                                </option>
                                            )
                                        }
                                    </select>
                                    <select style={{ width: '100px' }}>
                                        <option>BLANDAS</option>
                                        {
                                            oferta?.habilidades_blandas.split(',').map(
                                                h => <option>
                                                    {h}
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Área:</strong></p>
                                        <p>{oferta?.departamento_area}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Modalidad:</strong></p>
                                        <p>{oferta?.modalidad}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Experiencia:</strong></p>
                                        <p>{oferta?.experiencia}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.3rem', width: '190px', backgroundColor: '#AEB784', height: '40px', justifyContent: 'center', alignItems: 'center' }}>
                                        <p><strong>Publicado:</strong></p>
                                        <p>{oferta?.fecha_publicacion.split('T')[0]}</p>
                                    </div>
                                </div>
                                <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenOferta(false) }}
                                    ><strong>CERRAR</strong></button>
                                    {
                                        oferta?.id_empresa === user?.organizacion && (
                                            <button className="btn-accion-2"
                                                onClick={async () => {
                                                    const res = await deleteOferta(oferta?.id)
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
                            <div style={{ width: '500px', height: 'auto' }}>
                                <div style={{ width: '100%', height: '600px' }}>
                                    <embed
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(oferta?.documento)}&embedded=true`}
                                        width="100%"
                                        height="100%"
                                        frameborder="0"
                                    >
                                    </embed>
                                    <a
                                        href={`https://docs.google.com/gview?url=${encodeURIComponent(oferta?.documento)}&embedded=true`}
                                        download={`Oferta_${oferta?.id || 'documento'}.pdf`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-download"
                                    >
                                        DESCARGAR ARCHIVO PDF
                                    </a>                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                openCreateOferta && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div style={{ width: '350px', height: '500px', maxHeight: '500px', minHeight: '500px', overflowY: 'scroll', backgroundColor: 'white', padding: '0.5rem', borderRadius: '10px' }}>
                                <div className="datos">
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Titulo:</h6>
                                    <input placeholder="Titulo" onChange={(e) => { setOfertaData({ ...ofertaData, titulo: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Descripcion:</h6>
                                    <textarea onChange={(e) => { setOfertaData({ ...ofertaData, descripcion: e.target.value }) }} placeholder="Descripcion" style={{ minWidth: '100%', maxWidth: '100%', minHeight: '50px', maxHeight: '50px' }} />
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Salario:</h6>
                                    <input placeholder="Salario" onChange={(e) => { setOfertaData({ ...ofertaData, salario: e.target.value }) }} />
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
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Vacantes:</h6>
                                    <input placeholder="Vacantes" onChange={(e) => { setOfertaData({ ...ofertaData, vacantes: e.target.value }) }} />
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Beneficios</h6>
                                    <textarea onChange={(e) => { setOfertaData({ ...ofertaData, beneficios: e.target.value }) }} placeholder="Beneficios - Separados por ," style={{ minWidth: '100%', maxWidth: '100%', minHeight: '50px', maxHeight: '50px' }} />
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '20px' }}>Habilidades</h6>
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Tecnicas</h6>
                                    <textarea onChange={(e) => { setOfertaData({ ...ofertaData, habilidades_tecnicas: e.target.value }) }} placeholder="Habilidades Tecnicas - Separados por ," style={{ minWidth: '100%', maxWidth: '100%', minHeight: '50px', maxHeight: '50px' }} />
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Blandas</h6>
                                    <textarea onChange={(e) => { setOfertaData({ ...ofertaData, habilidades_blandas: e.target.value }) }} placeholder="Habilidades Blandas - Separados por ," style={{ minWidth: '100%', maxWidth: '100%', minHeight: '50px', maxHeight: '50px' }} />
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
                                    <h6 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '18px' }}>Experencia</h6>
                                    <input onChange={(e) => { setOfertaData({ ...ofertaData, experiencia: e.target.value }) }} placeholder="Experencia" />
                                </div>
                                <div style={{ width: '100%', justifyContent: 'space-around', display: 'flex' }}>
                                    <button
                                        className="btn-accion-cancelar-1"
                                        onClick={() => { setOpenCreateOferta(false) }}
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
                            <div style={{ width: '350px', height: '500px' }}>
                                <embed src={documento} width={'100%'} height={'100%'}></embed>
                                <input id="documento" style={{ display: 'flex' }} type="file" accept="pdf" onChange={handleUploadDocument} />
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}