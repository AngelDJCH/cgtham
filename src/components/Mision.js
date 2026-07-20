export default function Mision(props) {
    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="contenedor-interno-ventana">
                    <div className="titulo-ventana">
                        <h1>MISIÓN</h1>
                    </div>
                    <div className="descripcion-ventana">
                        <p>
                            Impulsar el desarrollo integral de los colaboradores mediante el diseño y ejecución de políticas estratégicas de captación, retención y crecimiento profesional. Buscamos maximizar el potencial humano para garantizar un clima organizacional de excelencia y el cumplimiento de los objetivos institucionales, basándonos en la equidad y el bienestar.
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