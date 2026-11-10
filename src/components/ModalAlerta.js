import React from 'react';
import '../styles/modal-alerta.css';

export default function ModalAlerta({
    abierto = false,
    tipo = 'info', // 'error' | 'exito' | 'advertencia' | 'info'
    titulo = '',
    mensaje = '',
    textoBoton = 'ACEPTAR',
    onAceptar,
    onCancelar,
    mostrarCancelar = false,
    textoCancelar = 'CANCELAR'
}) {
    if (!abierto) return null;

    const iconos = {
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

    const tituloPorDefecto = {
        error: 'Atención',
        exito: '¡Operación Exitosa!',
        advertencia: 'Aviso',
        info: 'Información'
    };

    return (
        <div className="modal-alerta-root">
            <div className="modal-alerta-overlay" onClick={onCancelar || onAceptar}></div>
            <div className="modal-alerta-contenedor" role="dialog" aria-modal="true">
                <div className={`modal-alerta-tarjeta modal-alerta-tarjeta--${tipo}`}>
                    <div className="modal-alerta-cabecera">
                        {iconos[tipo] || iconos.info}
                        <h2 className="modal-alerta-titulo">{titulo || tituloPorDefecto[tipo] || 'Mensaje'}</h2>
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
                            autoFocus
                            onClick={onAceptar}
                        >
                            <strong>{textoBoton}</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
