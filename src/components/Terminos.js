export default function Terminos(props) {
    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="contenedor-interno-ventana">
                    <div className="titulo-ventana">
                        <h1>Términos de Uso</h1>
                    </div>
                    <div className="subtitulo-ventana">
                        <h6>Condiciones de Uso de la Plataforma</h6>
                    </div>
                    <div className="descripcion-ventana">
                        <p>
                            <strong>Aceptación:</strong> Al navegar en este sitio, el usuario acepta utilizar los recursos de la Comisión de manera ética y profesional.
                        </p>
                    </div>

                    <ul className="lista-informacion">
                        <li>
                            <strong>Uso del Contenido:</strong> Queda prohibida la reproducción total o parcial de los logotipos, nombres de aliados y materiales educativos sin autorización previa de la CGTHAM.
                        </li>
                        <li>
                            <strong>Veracidad de la Información:</strong> Los candidatos e instituciones se comprometen a proporcionar datos reales en sus registros. La Comisión no se hace responsable por información falsa proporcionada por terceros.
                        </li>
                        <li>
                            <strong>Responsabilidad:</strong> Nos reservamos el derecho de dar de baja cualquier perfil que atente contra los valores de integridad y respeto de la comunidad de las Altas Montañas.
                        </li>
                    </ul>

                    <button
                        className="boton-ventana"
                        onClick={() => props.accion(false)}
                    >CERRAR</button>
                </div>
            </div>
        </div>
    )
}