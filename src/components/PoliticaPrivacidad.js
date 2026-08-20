export default function PoliticaPrivacidad(props) {
    return (
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div className="contenedor-interno-ventana">
                    <div className="titulo-ventana">
                        <h1>Política de Privacidad</h1>
                    </div>
                    <div className="subtitulo-ventana">
                        <h5>Protección de Datos Personales – CGTHAM</h5>
                    </div>
                    <div className="descripcion-ventana">
                        <p>
                            <stron>Compromiso:</stron> En el Comité de Gestión de Talento Humano de las Altas Montañas, valoramos la privacidad de nuestros usuarios y aliados. Los datos recolectados a través de nuestra plataforma serán utilizados exclusivamente para:
                        </p>
                    </div>
                    <ul className="lista-informacion">
                        <li>
                            Vincular perfiles profesionales con oportunidades laborales en la región.
                        </li>
                        <li>
                            Gestionar convenios con instituciones educativas y cámaras empresariales.
                        </li>
                        <li>
                            Enviar información relevante sobre capacitación y desarrollo de talento.
                        </li>
                    </ul>
                    <div className="descripcion-ventana">
                        <p>
                            <strong>Derechos ARCO:</strong> Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al manejo de sus datos enviando una solicitud a nuestro comité de transparencia. No compartimos información con terceros sin su consentimiento explícito, salvo por requerimientos legales.
                        </p>
                    </div>
                    <button
                        className="boton-ventana"
                        onClick={() => { props.accion(false) }}
                    >CERRAR</button>
                </div>
            </div>
        </div>
    )
}