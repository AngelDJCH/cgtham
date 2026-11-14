import { useAuth } from '../hooks/useAuth'
import '../styles/filtros.css'

export default function Filtros(props) {
    const { user } = useAuth()
    return (
        <div className="filtro-contenedor">
            <h2 className='subtitulo'>
                {props.titulo}
            </h2>
            <div className="filtro-controles">
                {
                    props.filtro && (
                        <div className="filtro-search-box">
                            <svg className="filtro-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input placeholder={props.placeholder} onChange={((e) => { props.filtro(e.target.value) })} />
                        </div>
                    )
                }
                {
                    props?.selector && (
                        <select onChange={(e)=>{props?.setSeleccionado(e.target.value)}}>
                            <option>{props?.opcionDefault}</option>
                            {
                                props?.selectorOpciones?.map(o => <option key={o.id || o.tipo}>{o.tipo}</option>)
                            }
                        </select>
                    )
                }
                {
                    props.accion && props?.enableAccion && user.rol.includes('ADMIN_ORG') && (
                        <button className="accion"
                            onClick={(e) => {
                                e.preventDefault()
                                props.btn_accion(true)
                            }}
                        >
                            <span style={{ fontSize: '16px', lineHeight: 1, marginRight: '4px' }}>+</span> {props.accion}
                        </button>
                    )
                }
                {
                    props?.btn_accion_solicitud && (
                        <button
                            className='accion accion-solicitudes'
                            onClick={(e) => {
                                e.preventDefault()
                                props?.btn_accion_solicitudes(true)
                            }}
                        >
                            SOLICITUDES
                        </button>
                    )
                }
            </div>
        </div>
    )
}