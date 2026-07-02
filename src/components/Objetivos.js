import { useMediaQuery } from "@uidotdev/usehooks"
import { useState } from "react"


export default function Objetivos(props) {

    const isSmallOrMediumDevice = useMediaQuery('(max-width:768px) or (max-width:1024px)')

    const [openVision, setOpenVision] = useState(false)

    const [openMision, setOpenMision] = useState(false)

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div style={{
                    display: 'flex', flexDirection: isSmallOrMediumDevice ? 'column' : 'row', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ width: '40vh', backgroundColor: 'white', height: isSmallOrMediumDevice ? 'auto' : '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px', padding: isSmallOrMediumDevice ? '1rem' : null }}>
                        <h1 style={{ color: '#41431B' }}>MISIÓN</h1>
                        {
                            !openMision && isSmallOrMediumDevice && (
                                <button
                                    onClick={() => {
                                        setOpenMision(true);
                                        setOpenVision(false)
                                    }}
                                    className="btn-accion-2"><strong>MOSTRAR</strong></button>
                            )
                        }
                        {
                            openMision || !isSmallOrMediumDevice && (
                                <p style={{ width: '90%', textAlign: 'justify', maxHeight: '30vh', overflowY: 'scroll' }}>Impulsar el desarrollo integral de los colaboradores mediante el diseño y ejecución de políticas estratégicas de captación, retención y crecimiento profesional. Buscamos maximizar el potencial humano para garantizar un clima organizacional de excelencia y el cumplimiento de los objetivos institucionales, basándonos en la equidad y el bienestar.</p>
                            )
                        }
                    </div>
                    <div style={{ width: '40vh', backgroundColor: 'white', height: isSmallOrMediumDevice ? 'auto' : '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px', padding: isSmallOrMediumDevice ? '1rem' : null }}>
                        <h1 style={{ color: '#41431B' }}>VISIÓN</h1>
                        {
                            !openVision && isSmallOrMediumDevice && (
                                <button
                                    onClick={() => {
                                        setOpenMision(false);
                                        setOpenVision(true)
                                    }}
                                    className="btn-accion-2"><strong>MOSTRAR</strong></button>
                            )
                        }
                        {
                            openVision || !isSmallOrMediumDevice && (
                                <p style={{ width: '90%', textAlign: 'justify', maxHeight: '30vh', overflowY: 'scroll' }}>Ser reconocidos como el pilar estratégico fundamental de la organización, consolidando un modelo de gestión de talento humano innovador, humano y de vanguardia. Aspiramos a ser un referente nacional por nuestra cultura de alto desempeño, liderazgo inspirador y por convertir a nuestra institución en el mejor lugar para trabajar.</p>
                            )
                        }
                    </div>
                </div>
                <button
                    style={{ marginTop: '1rem' }}
                    className="btn-accion"
                    onClick={(e) => {
                        setOpenMision(false)
                        setOpenVision(false)
                        props.accion(false)
                    }}>CERRAR</button>
            </div>
        </div>
    )
}