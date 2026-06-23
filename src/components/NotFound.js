import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', paddingTop:'2rem', gap:'2rem'}}>
            <h1 style={{ color: 'white' }} className="subtitulo">PÁGINA NO ENCONTRADA</h1>
            <div style={{
                width: '250px', height: '250px'
            }}>
                <img 
                style={{
                    width:'100%',
                    height:'100%'
                }}
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXJvdXRlLW9mZi1pY29uIGx1Y2lkZS1yb3V0ZS1vZmYiPjxjaXJjbGUgY3g9IjYiIGN5PSIxOSIgcj0iMyIvPjxwYXRoIGQ9Ik05IDE5aDguNWMuNCAwIC45LS4xIDEuMy0uMiIvPjxwYXRoIGQ9Ik01LjIgNS4yQTMuNSAzLjUzIDAgMCAwIDYuNSAxMkgxMiIvPjxwYXRoIGQ9Im0yIDIgMjAgMjAiLz48cGF0aCBkPSJNMjEgMTUuM2EzLjUgMy41IDAgMCAwLTMuMy0zLjMiLz48cGF0aCBkPSJNMTUgNWgtNC4zIi8+PGNpcmNsZSBjeD0iMTgiIGN5PSI1IiByPSIzIi8+PC9zdmc+" />
            </div>
            <button
                className="btn-accion"
                onClick={() => { navigate(-1) }}
            ><strong>REGRESAR</strong></button>
        </div>
    )
}