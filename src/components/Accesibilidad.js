export default function Accesibilidad(props) {
    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="contenedor-interno-ventana">
                    <div className="titulo-ventana">
                        <h1>Accesibilidad</h1>
                    </div>
                    <div className="subtitulo-ventana">
                        <h6>Declaración de Accesibilidad Universal</h6>
                    </div>
                    <div className="descripcion-ventana">
                        <p>
                            <strong>Misión:</strong> Nuestra plataforma está diseñada bajo los principios de inclusión, buscando que cualquier persona, independientemente de sus capacidades técnicas o físicas, pueda acceder a las oportunidades de talento.
                        </p>
                    </div>
                    <ul className="lista-informacion">
                        <li>
                            <strong>Navegación:</strong> Implementamos etiquetas alt en todos nuestros logos e imágenes para lectores de pantalla.
                        </li>
                        <li>
                            <strong>Contraste y Diseño:</strong> Utilizamos una paleta de colores de alto contraste y tipografías legibles (Poppins) para facilitar la lectura.
                        </li>
                        <li>
                            <strong>Compatibilidad:</strong> El sitio es Responsive Design, adaptándose a dispositivos móviles y herramientas de asistencia.
                        </li>
                    </ul>
                    <button
                        className="boton-ventana"
                        onClick={() => {
                            props.accion(false)
                        }}

                    >CERRAR</button>
                </div>
            </div>
        </div>
    )
}