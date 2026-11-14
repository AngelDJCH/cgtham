import PropTypes from 'prop-types';
import '../styles/modal-alerta.css';

const ICONOS_ALERTA = {
    error: (
        <div className="modal-alerta-icono modal-alerta-icono--error">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
        </div>
    ),
    exito: (
        <div className="modal-alerta-icono modal-alerta-icono--exito">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 11 12 14 22 4"></polyline>
            </svg>
        </div>
    ),
    advertencia: (
        <div className="modal-alerta-icono modal-alerta-icono--advertencia">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
        </div>
    ),
    info: (
        <div className="modal-alerta-icono modal-alerta-icono--info">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
        </div>
    )
};

const TITULO_POR_DEFECTO = {
    error: 'Atención',
    exito: '¡Operación Exitosa!',
    advertencia: 'Aviso',
    info: 'Información'
};

export default function ModalAlerta({
    abierto = false,
    tipo = 'info',
    titulo = '',
    mensaje = '',
    textoBoton = 'ACEPTAR',
    onAceptar,
    onCancelar,
    mostrarCancelar = false,
    textoCancelar = 'CANCELAR'
}) {
    if (!abierto) return null;

    const iconoSeleccionado = ICONOS_ALERTA[tipo] ?? ICONOS_ALERTA.info;
    const tituloDefecto = TITULO_POR_DEFECTO[tipo] ?? 'Mensaje';
    const tituloMostrado = titulo.trim().length > 0 ? titulo : tituloDefecto;
    const manejadorCierreFondo = onCancelar ?? onAceptar;

    return (
        <div className="modal-alerta-root">
            <button
                type="button"
                className="modal-alerta-overlay"
                aria-label="Cerrar ventana de aviso"
                onClick={manejadorCierreFondo}
            />
            <dialog open className="modal-alerta-contenedor" aria-modal="true">
                <div className={`modal-alerta-tarjeta modal-alerta-tarjeta--${tipo}`}>
                    <div className="modal-alerta-cabecera">
                        {iconoSeleccionado}
                        <h2 className="modal-alerta-titulo">{tituloMostrado}</h2>
                    </div>
                    <div className="modal-alerta-cuerpo">
                        <p>{mensaje}</p>
                    </div>
                    <div className="modal-alerta-acciones">
                        {mostrarCancelar && (
                            <button
                                type="button"
                                className="btn-accion-cancelar-1 modal-alerta-btn"
                                onClick={onCancelar}
                            >
                                <strong>{textoCancelar}</strong>
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn-accion-2 modal-alerta-btn"
                            onClick={onAceptar}
                        >
                            <strong>{textoBoton}</strong>
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

ModalAlerta.propTypes = {
    abierto: PropTypes.bool,
    tipo: PropTypes.oneOf(['error', 'exito', 'advertencia', 'info']),
    titulo: PropTypes.string,
    mensaje: PropTypes.string,
    textoBoton: PropTypes.string,
    onAceptar: PropTypes.func,
    onCancelar: PropTypes.func,
    mostrarCancelar: PropTypes.bool,
    textoCancelar: PropTypes.string
};
