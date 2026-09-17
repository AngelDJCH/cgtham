import '../styles/loader.css'

export default function Loader({ color = '#41431B', texto = 'Cargando...', background = '#AEB784' }) {
    return (
        <>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <div className="loader"
                        style={{
                            border: `3px solid ${background}`,
                            borderTop: `3px solid ${color}`
                        }}
                    >
                    </div>
                    <h1
                        style={{
                            color: color
                        }}
                    >{texto}</h1>
                </div>
            </div>
        </>
    )
}