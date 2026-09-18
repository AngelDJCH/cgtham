import '../styles/tour.css'

export default function Tour(props) {
    return (
        <div>
            <div className="overllay" />
            <div className="overllay-contenedor">
                <div className='tour'>
                    <video className='video-tour' controls>
                        <source
                            src="Tour.mp4"
                        ></source>
                    </video>
                    <button
                        className="btn-accion"
                        onClick={() => { props?.accion(false) }}

                    >CERRAR</button>
                </div>
            </div>
        </div>
    )
}