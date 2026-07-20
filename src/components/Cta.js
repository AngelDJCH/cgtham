import { useNavigate } from 'react-router-dom'
import '../styles/cta.css'

export default function Cta() {

    const navigate = useNavigate()

    return (
        <div className='cta'>
            <div className='subtitulo'>
                <h5>¡UNETE!</h5>
            </div>
            <h2 className='texto-informativo'>¿Listo/a para ser parte de la transformación?</h2>
            <button
                onClick={() => { navigate('/register_org') }}
            >REGISTRARME</button>
        </div>
    )
}