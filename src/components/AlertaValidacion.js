import '../styles/alertavalidacion.css'

export const FORMATOS_IMAGEN = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
export const EXTENSIONES_IMAGEN = 'PNG, JPG, JPEG o WEBP'
export const TAMANIO_MAX_IMAGEN_MB = 20

export default function AlertaValidacion({ errores = [], onAceptar }) {
    const secciones = errores.reduce((acc, err) => {
        if (!acc[err.seccion]) acc[err.seccion] = []
        acc[err.seccion].push(err)
        return acc
    }, {})

    return (
        <div>
            <div className='overllay-validacion'></div>
            <div className='alerta-validacion-contenedor' role='alertdialog' aria-modal='true' aria-labelledby='alerta-validacion-titulo'>
                <div className='alerta-validacion-cuerpo'>
                    <h1 id='alerta-validacion-titulo'>Revisa tu información</h1>
                    <p className='alerta-validacion-subtitulo'>
                        {errores.length === 1
                            ? 'Hay 1 campo que necesita corrección:'
                            : `Hay ${errores.length} campos que necesitan corrección:`}
                    </p>

                    <div className='alerta-validacion-lista'>
                        {Object.keys(secciones).map(seccion => (
                            <div key={seccion} className='alerta-validacion-seccion'>
                                <h2>{seccion}</h2>
                                <ul>
                                    {secciones[seccion].map(err => (
                                        <li key={err.id}>
                                            <strong>{err.campo}:</strong> {err.mensaje}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className='alerta-validacion-formatos'>
                        <strong>Formato de imágenes aceptado (logo y banner):</strong>
                        <span> solo PNG ({EXTENSIONES_IMAGEN}), tamaño máximo {TAMANIO_MAX_IMAGEN_MB} MB.</span>
                    </div>

                    <button className='alerta-validacion-boton' autoFocus onClick={onAceptar}>
                        ACEPTAR Y CORREGIR
                    </button>
                </div>
            </div>
        </div>
    )
}
