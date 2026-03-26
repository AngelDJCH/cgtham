import '../styles/inscripcionalterta.css'

export default function InscripcionAlterta(props) {
    return (
        <div>
            <div className='overllay'>
            </div>
            <div className='alterta-inscripcion-contenedor'>
                <div className='alterta-inscripcion-cuerpo'>
                    <h1>{props.titulo}</h1>
                    <p>¿Estas seguro/a de inscribirte?</p>
                    <div className='contenedor-botones'>

                        <button className='boton-accion-alteta btn-cancelar'

                            onClick={() => { props.accion(false) }}

                        >CANCELAR</button>
                        <button className='boton-accion-alteta btn-aceptar'>ACEPTAR</button>
                    </div>

                </div>
            </div>
        </div>
    )
}