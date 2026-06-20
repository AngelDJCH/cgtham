export default function Objetivos(props){
    return(
        <div>
            <div className="overllay"></div>
            <div className="overllay-contenedor">
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:'100%', flexWrap : 'wrap', gap:'1rem'
                }}>
                    <div style={{width:'40vh', backgroundColor:'white', height:'50vh', display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'10px'}}>
                        <h1 style={{color:'#41431B'}}>MISIÓN</h1>
                        <p style={{width:'90%', textAlign:'justify', maxHeight:'30vh', overflowY:'scroll'}}>Impulsar el desarrollo integral de los colaboradores mediante el diseño y ejecución de políticas estratégicas de captación, retención y crecimiento profesional. Buscamos maximizar el potencial humano para garantizar un clima organizacional de excelencia y el cumplimiento de los objetivos institucionales, basándonos en la equidad y el bienestar.</p>
                    </div>
                    <div style={{width:'40vh', backgroundColor:'white', height:'50vh', display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'10px'}}>
                        <h1 style={{color:'#41431B'}}>VISIÓN</h1>
                        <p style={{width:'90%', textAlign:'justify', maxHeight:'30vh', overflowY:'scroll'}}>Ser reconocidos como el pilar estratégico fundamental de la organización, consolidando un modelo de gestión de talento humano innovador, humano y de vanguardia. Aspiramos a ser un referente nacional por nuestra cultura de alto desempeño, liderazgo inspirador y por convertir a nuestra institución en el mejor lugar para trabajar.</p>
                    </div>
                </div>
                <button
                style={{marginTop:'1rem'}}
                className="btn-accion"
                onClick={(e)=>{props.accion(false)}}>CERRAR</button>
            </div>
        </div>
    )
}