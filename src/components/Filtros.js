import '../styles/filtros.css'

export default function Filtros(props) {
    return (
        <div className="filtro-contenedor">
            <h1>
                {props.titulo}
            </h1>
            <input placeholder={props.placeholder} />
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
                props.accion && (
                    <button className="accion">
                        {props.accion}
                    </button>
                )
            }
        </div>
    )
}