import { useNavigate } from 'react-router-dom'
import '../styles/cta.css'

export default function Cta(){

    const navigate = useNavigate()

    return(
        <div className='cta'>
            <h1>¡UNETE!</h1>
            <h5>¿Listo/a para ser parte de la transformación?</h5>
            <button
            
             onClick={() => { navigate('/register') }}
            
            >REGISTRARME</button>
        </div>
    )
}