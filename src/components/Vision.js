export default function Vision(props) {
    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="contenedor-interno-ventana">
                    <div className="titulo-ventana">
                        <h1>visión</h1>
                    </div>
                    <div className="descripcion-ventana">
                        <p>
                            Ser reconocidos como el pilar estratégico fundamental de la organización, consolidando un modelo de gestión de talento humano innovador, humano y de vanguardia. Aspiramos a ser un referente nacional por nuestra cultura de alto desempeño, liderazgo inspirador y por convertir a nuestra institución en el mejor lugar para trabajar.
                        </p>
                    </div>
                    <button className="boton-ventana"

                        onClick={() => { props.accion(false) }}

                    >
                        CERRAR
                    </button>
                </div>
            </div>
        </div>
    )
}