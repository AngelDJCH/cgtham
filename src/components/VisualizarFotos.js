import { useEffect, useState } from "react"
import { getFotosByIdEvento } from "../services/Foto";

export default function VisualizarFotos(props) {
    const [fotos, setFotos] = useState([])
    const [fotoSeleccionada, setFotoSeleccionada] = useState('')

    useEffect(() => {
        const getFotos = async () => {
            const res = await getFotosByIdEvento(props?.id_evento)
            if (Array.isArray(res)) {
                setFotos(res)
                const first = typeof res[0] === 'object' ? res[0]?.url_imagen : res[0]
                setFotoSeleccionada(first || '')
            }
        }
        if (props?.id_evento) {
            getFotos()
        }
    }, [props?.id_evento]);

    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor" style={{ backgroundColor: 'white' }}>
                <div style={{ display: 'flex', width: '600px', height: 'auto', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '250px', height: '450px', display: 'flex', justifyContent: 'center' }}>
                        <img src={fotoSeleccionada} alt="Foto seleccionada" style={{ width: '100%', height: '100%', margin: 0, objectFit: 'contain' }} />
                    </div>
                    <div style={{ width: '100%', height: '50px', maxWidth: '100%', overflowX: 'scroll', overflowY: 'hidden', display: 'flex', gap: '1rem', scrollbarWidth: 'none', justifyContent: 'center' }}>
                        {
                            fotos?.map(
                                (foto, index) => {
                                    const url = typeof foto === 'object' ? foto.url_imagen : foto
                                    const id = typeof foto === 'object' ? foto.id : index
                                    return (
                                        <div key={id} style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
                                            <img src={url} alt={`Foto ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onClick={() => { setFotoSeleccionada(url) }}
                                            />
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => { props?.accion(false) }}
                        className="btn-accion-cancelar-1"
                    >
                        <strong>
                            CERRAR
                        </strong>
                    </button>
                </div>
            </div>
        </div>
    )
}
