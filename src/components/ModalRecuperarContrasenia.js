import PropTypes from 'prop-types';
import '../styles/modal-recuperar-contrasenia.css';

export default function ModalRecuperarContrasenia({
    abierto = false,
    paso = 1,
    correo = '',
    codigo = '',
    nuevaContrasenia = '',
    confirmarContrasenia = '',
    mostrarContrasenia = false,
    cargando = false,
    errorLocal = '',
    onCerrar,
    onCorreoChange,
    onCodigoChange,
    onNuevaContraseniaChange,
    onConfirmarContraseniaChange,
    onToggleMostrarContrasenia,
    onSolicitarCodigo,
    onVerificarCodigo,
    onRestablecerContrasenia,
    onVolverPaso1
}) {
    if (!abierto) return null;

    const manejarEnvioPaso1 = (e) => {
        e.preventDefault();
        if (onSolicitarCodigo) onSolicitarCodigo();
    };

    const manejarEnvioPaso2 = (e) => {
        e.preventDefault();
        if (onVerificarCodigo) onVerificarCodigo();
    };

    const manejarEnvioPaso3 = (e) => {
        e.preventDefault();
        if (onRestablecerContrasenia) onRestablecerContrasenia();
    };

    const obtenerSubtitulo = () => {
        if (paso === 1) {
            return 'Ingresa el correo vinculado a tu cuenta institucional para recibir un código de verificación.';
        }
        if (paso === 2) {
            return `Ingresa el código de 6 dígitos enviado a ${correo || 'tu correo'}.`;
        }
        return 'Código verificado exitosamente. Define tu nueva contraseña de acceso.';
    };

    return (
        <div className="modal-recuperar-root">
            <button
                type="button"
                className="modal-recuperar-overlay"
                aria-label="Cerrar ventana de recuperación"
                onClick={onCerrar}
            />
            <dialog open className="modal-recuperar-dialog" aria-modal="true">
                <div className="modal-recuperar-tarjeta">
                    {/* Botón de cierre superior (X) */}
                    <button
                        type="button"
                        className="modal-recuperar-btn-cerrar"
                        onClick={onCerrar}
                        aria-label="Cerrar"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Cabecera Institucional */}
                    <div className="modal-recuperar-cabecera">
                        <div className="modal-recuperar-icono-wrap">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h2 className="modal-recuperar-titulo">Recuperación de Contraseña</h2>
                        <p className="modal-recuperar-subtitulo">{obtenerSubtitulo()}</p>

                        {/* Indicador de 3 pasos visual */}
                        <div className="modal-recuperar-stepper">
                            <div className={`stepper-paso ${paso >= 1 ? 'stepper-paso--activo' : ''}`}>
                                <span className="stepper-numero">1</span>
                                <span className="stepper-texto">Correo</span>
                            </div>
                            <div className={`stepper-linea ${paso >= 2 ? 'stepper-linea--activo' : ''}`}></div>
                            <div className={`stepper-paso ${paso >= 2 ? 'stepper-paso--activo' : ''}`}>
                                <span className="stepper-numero">2</span>
                                <span className="stepper-texto">Código</span>
                            </div>
                            <div className={`stepper-linea ${paso >= 3 ? 'stepper-linea--activo' : ''}`}></div>
                            <div className={`stepper-paso ${paso >= 3 ? 'stepper-paso--activo' : ''}`}>
                                <span className="stepper-numero">3</span>
                                <span className="stepper-texto">Contraseña</span>
                            </div>
                        </div>
                    </div>

                    {/* Alerta de error inline */}
                    {errorLocal && (
                        <div className="modal-recuperar-alerta-inline" role="alert">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>{errorLocal}</span>
                        </div>
                    )}

                    {/* Cuerpo del formulario según el paso actual */}
                    <div className="modal-recuperar-cuerpo">
                        {paso === 1 && (
                            <form onSubmit={manejarEnvioPaso1} className="modal-recuperar-form">
                                <div className="modal-recuperar-campo">
                                    <label htmlFor="recuperar-correo" className="modal-recuperar-label">
                                        Correo Electrónico
                                    </label>
                                    <div className="modal-recuperar-input-icon-wrap">
                                        <svg className="modal-recuperar-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        <input
                                            id="recuperar-correo"
                                            type="email"
                                            placeholder="correo@ejemplo.com"
                                            className="modal-recuperar-input"
                                            value={correo}
                                            onChange={(e) => onCorreoChange && onCorreoChange(e.target.value)}
                                            required
                                            disabled={cargando}
                                            autoFocus
                                        />
                                    </div>
                                    <span className="modal-recuperar-pista">
                                        Te enviaremos un código de 6 dígitos con vigencia de 10 minutos.
                                    </span>
                                </div>

                                <div className="modal-recuperar-acciones">
                                    <button
                                        type="button"
                                        className="modal-recuperar-btn-secundario"
                                        onClick={onCerrar}
                                        disabled={cargando}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="modal-recuperar-btn-primario"
                                        disabled={cargando}
                                    >
                                        {cargando ? (
                                            <span className="modal-recuperar-loader-text">
                                                <span className="modal-recuperar-spinner" />
                                                Enviando código...
                                            </span>
                                        ) : (
                                            'Enviar Código'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        {paso === 2 && (
                            <form onSubmit={manejarEnvioPaso2} className="modal-recuperar-form">
                                <div className="modal-recuperar-campo">
                                    <div className="modal-recuperar-label-row">
                                        <label htmlFor="recuperar-codigo" className="modal-recuperar-label">
                                            Código de 6 Dígitos
                                        </label>
                                        {onVolverPaso1 && (
                                            <button
                                                type="button"
                                                className="modal-recuperar-enlace-volver"
                                                onClick={onVolverPaso1}
                                                disabled={cargando}
                                            >
                                                ¿Correo equivocado? Cambiarlo
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        id="recuperar-codigo"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]{6}"
                                        maxLength="6"
                                        placeholder="000000"
                                        className="modal-recuperar-input modal-recuperar-input--codigo"
                                        value={codigo}
                                        onChange={(e) => onCodigoChange && onCodigoChange(e.target.value)}
                                        required
                                        disabled={cargando}
                                        autoFocus
                                    />
                                    <span className="modal-recuperar-pista">
                                        Ingresa el código numérico recibido antes de definir tu nueva clave.
                                    </span>
                                </div>

                                <div className="modal-recuperar-acciones">
                                    <button
                                        type="button"
                                        className="modal-recuperar-btn-secundario"
                                        onClick={onCerrar}
                                        disabled={cargando}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="modal-recuperar-btn-primario"
                                        disabled={cargando}
                                    >
                                        {cargando ? (
                                            <span className="modal-recuperar-loader-text">
                                                <span className="modal-recuperar-spinner" />
                                                Verificando...
                                            </span>
                                        ) : (
                                            'Verificar Código'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        {paso === 3 && (
                            <form onSubmit={manejarEnvioPaso3} className="modal-recuperar-form">
                                <div className="modal-recuperar-campo">
                                    <label htmlFor="recuperar-nueva-contrasenia" className="modal-recuperar-label">
                                        Nueva Contraseña
                                    </label>
                                    <div className="modal-recuperar-input-icon-wrap">
                                        <input
                                            id="recuperar-nueva-contrasenia"
                                            type={mostrarContrasenia ? 'text' : 'password'}
                                            placeholder="Mínimo 6 caracteres"
                                            className="modal-recuperar-input modal-recuperar-input--con-toggle"
                                            value={nuevaContrasenia}
                                            onChange={(e) => onNuevaContraseniaChange && onNuevaContraseniaChange(e.target.value)}
                                            required
                                            disabled={cargando}
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            className="modal-recuperar-btn-toggle-pwd"
                                            onClick={onToggleMostrarContrasenia}
                                            aria-label={mostrarContrasenia ? 'Ocultar contraseña' : 'Ver contraseña'}
                                            tabIndex={-1}
                                        >
                                            {mostrarContrasenia ? (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                                </svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="modal-recuperar-campo">
                                    <label htmlFor="recuperar-confirmar-contrasenia" className="modal-recuperar-label">
                                        Confirmar Nueva Contraseña
                                    </label>
                                    <div className="modal-recuperar-input-icon-wrap">
                                        <input
                                            id="recuperar-confirmar-contrasenia"
                                            type={mostrarContrasenia ? 'text' : 'password'}
                                            placeholder="Repite la nueva contraseña"
                                            className="modal-recuperar-input modal-recuperar-input--con-toggle"
                                            value={confirmarContrasenia}
                                            onChange={(e) => onConfirmarContraseniaChange && onConfirmarContraseniaChange(e.target.value)}
                                            required
                                            disabled={cargando}
                                        />
                                    </div>
                                </div>

                                <div className="modal-recuperar-acciones">
                                    <button
                                        type="button"
                                        className="modal-recuperar-btn-secundario"
                                        onClick={onCerrar}
                                        disabled={cargando}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="modal-recuperar-btn-primario"
                                        disabled={cargando}
                                    >
                                        {cargando ? (
                                            <span className="modal-recuperar-loader-text">
                                                <span className="modal-recuperar-spinner" />
                                                Actualizando...
                                            </span>
                                        ) : (
                                            'Guardar Contraseña'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </dialog>
        </div>
    );
}

ModalRecuperarContrasenia.propTypes = {
    abierto: PropTypes.bool,
    paso: PropTypes.number,
    correo: PropTypes.string,
    codigo: PropTypes.string,
    nuevaContrasenia: PropTypes.string,
    confirmarContrasenia: PropTypes.string,
    mostrarContrasenia: PropTypes.bool,
    cargando: PropTypes.bool,
    errorLocal: PropTypes.string,
    onCerrar: PropTypes.func,
    onCorreoChange: PropTypes.func,
    onCodigoChange: PropTypes.func,
    onNuevaContraseniaChange: PropTypes.func,
    onConfirmarContraseniaChange: PropTypes.func,
    onToggleMostrarContrasenia: PropTypes.func,
    onSolicitarCodigo: PropTypes.func,
    onVerificarCodigo: PropTypes.func,
    onRestablecerContrasenia: PropTypes.func,
    onVolverPaso1: PropTypes.func
};
