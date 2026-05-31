import { useAuth } from '../hooks/useAuth'
import '../styles/filtros.css'

export default function Filtros(props) {

    const {user} = useAuth()

    return (
        <div className="filtro-contenedor">
            <h1>
                {props.titulo}
            </h1>
            {
                props.filtro && (
                    <input placeholder={props.placeholder} onChange={((e)=>{props.filtro(e.target.value)})}/>
                )
            }
            <select>
                <option>
                    FILTRAR
                </option>

                {
                    props.opciones?.map(
                        opcion => <option>{opcion}</option>
                    )
                }
            </select>
            {
                props.accion && props?.enableAccion && user.rol.includes('ADMIN_ORG')&& (
                    <button className="accion"

                        onClick={(e) => {
                            e.preventDefault()
                            props.btn_accion(true)
                        }}

                    >
                        {props.accion}
                    </button>
                )
            }

            {
                props?.btn_accion_solicitud && (
                    <button
                        className='accion'
                        onClick={(e)=>{
                            e.preventDefault()
                            props?.btn_accion_solicitudes(true)
                        }}
                    >
                        SOLICITUDES
                    </button>
                )
            }
        </div>
    )
}