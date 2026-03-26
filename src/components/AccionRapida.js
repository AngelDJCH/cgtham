import '../styles/accionrapida.css'

export default function AccionRapida(){

    const img_evento = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLXBsdXMtaWNvbiBsdWNpZGUtY2FsZW5kYXItcGx1cyI+PHBhdGggZD0iTTE2IDE5aDYiLz48cGF0aCBkPSJNMTYgMnY0Ii8+PHBhdGggZD0iTTE5IDE2djYiLz48cGF0aCBkPSJNMjEgMTIuNTk4VjZhMiAyIDAgMCAwLTItMkg1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmg4LjUiLz48cGF0aCBkPSJNMyAxMGgxOCIvPjxwYXRoIGQ9Ik04IDJ2NCIvPjwvc3ZnPg=='
    const img_oferta_laboral = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcy1pY29uIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MiPjxwYXRoIGQ9Ik0xMiAxMmguMDEiLz48cGF0aCBkPSJNMTYgNlY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTIyIDEzYTE4LjE1IDE4LjE1IDAgMCAxLTIwIDAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+'

    return(
        <div className='accion-rapida-contenedor'>
            <img src="" alt="foto"/>
            <div className='a-r-s1'>
                <h1>José Remires Velázquez</h1>
                <p>Instituto Tecnologico de Orizaba</p>
            </div>
            <div className='a-r-s2'>
                <img src={img_evento}/>
                <img src={img_oferta_laboral}/>
            </div>
        </div>
    )
}