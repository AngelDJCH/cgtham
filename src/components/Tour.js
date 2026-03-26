export default function Tour(props) {
    return (
        <div>

            <div className="overllay">

            </div>

            <div className="overllay-contenedor">

                <video style={{width:'100vh', height:'80vh'}} controls>
                    <source
                        src="Tour.mp4"
                    ></source>
                </video>
                <button

                    onClick={() => { props?.accion(false) }}

                >CERRAR</button>
            </div>
        </div>
    )
}