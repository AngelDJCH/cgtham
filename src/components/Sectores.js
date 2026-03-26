import { useState } from "react"
import '../styles/sectores.css'

export default function Sectores() {

    const [openSector, setOpenSector] = useState(false)
    const [sectorSeleccionado, setSectorSeleccionado] = useState(0)
    const [sectorData, setSectorData] = useState({
        nombre: '',
        descripcion: ''
    })

    const [sectores, setSectores] = useState([
        {
            id: 1,
            nombre: 'Industria y Manufactura',
            descripcion: 'Producción y transformación de materias primas, procesos industriales, mantenimiento e ingeniería.',
            imagen: 'https://images.unsplash.com/photo-1764185800646-f75f7e16e465?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 2,
            nombre: 'Logística, Transporte y Distribución',
            descripcion: 'Movimiento, almacenamiento y distribución de mercancías mediante transporte y control logístico.',
            imagen: 'https://images.unsplash.com/photo-1773126378587-d30f7a716b14?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 3,
            nombre: 'Comercio y Servicios al Cliente',
            descripcion: 'Venta de productos y servicios, atención al cliente y operación de establecimientos comerciales.',
            imagen: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 4,
            nombre: 'Comunicación, Medios y Publicidad',
            descripcion: 'Creación y difusión de contenidos informativos, audiovisuales y publicitarios.',
            imagen: 'https://images.unsplash.com/photo-1589878722745-a808de2fe798?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 5,
            nombre: 'Educación y Formación Técnica',
            descripcion: 'Docencia, capacitación técnica, formación profesional y gestión académica.',
            imagen: 'https://plus.unsplash.com/premium_photo-1726664912946-7bacadb20f3f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 6,
            nombre: 'Gestión Empresarial y Vinculación',
            descripcion: 'Representación empresarial, asesoría, administración y vinculación laboral e institucional.',
            imagen: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    ]);

    const [count, setCount] = useState(0)

    let valor = 0;

    return (
        <div className="sectores" id="sectores">
            <div className="etiqueta">
                <h5>SECTORES DE TRANSFORMACIÓN</h5>
            </div>
            <div className="subtitulo">
                <h2>¡Estamos en expansión!</h2>
            </div>
            <div className="descripcion">
                <p>Las mejores alianzas para desarrollar grandes profesionales</p>
            </div>

            <div className="contenedor-sectores">
                {
                    sectores.map(
                        sector =>
                            <div key={sector.id} className="sector-tarjeta" style={{ transform: valor % 2 == 0 ? 'translateY(-30px)' : 'translateY(30px)' }}>
                                <div style={{ width: '90%', height:'100px'}} id={`sector${sector.id}`}>
                                    <p><strong id="nombre-sector">{sector.nombre}</strong></p>
                                </div>
                                <div className="contenedor-imagen-tarjeta">
                                    <img src={sector.imagen} alt={`logo ${sector.imagen}`} />
                                </div>
                                <p style={{ display: 'none' }} id="descripcion-sector">{sector.descripcion}</p>
                                <div style={{width:'100%', padding:'1rem', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <button
                                        className="btn-sector"

                                        value={sector.id}

                                        onClick={(e) => {
                                            const idSelect = parseInt(e.target.value);
                                            const data = sectores.find(sect => sect.id === idSelect);
                                            setSectorData(data);
                                            setOpenSector(true);
                                        }}
                                    >ABRIR</button>
                                </div>
                            </div>
                    )
                }
            </div>
            {
                openSector && (
                    <div>
                        <div className="overllay"></div>
                        <div className="overllay-contenedor">
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', backgroundColor: '#AEB784', borderRadius: '10px', padding: '1rem' }}>
                                <h1 style={{ fontFamily: 'Poppins', color: '#E3DBBB', textAlign: 'center' }}>
                                    {sectorData.nombre}
                                </h1>
                                <div style={{ width: '80%' }}>
                                    <p style={{ fontFamily: 'Poppins', color: '#fff', textAlign: 'center' }}>
                                        {sectorData.descripcion}
                                    </p>
                                </div>
                                <button className="btn-sector"

                                    onClick={() => { setOpenSector(false) }}

                                >
                                    CERRAR
                                </button>
                            </div>
                        </div>
                    </div>
                )

            }

        </div>
    )
}