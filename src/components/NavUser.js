import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/navuser.css'
import { useAuth } from '../hooks/useAuth.js'

export default function NavUser(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()

    const img_mensajes = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbWVzc2FnZXMtc3F1YXJlLWljb24gbHVjaWRlLW1lc3NhZ2VzLXNxdWFyZSI+PHBhdGggZD0iTTE2IDEwYTIgMiAwIDAgMS0yIDJINi44MjhhMiAyIDAgMCAwLTEuNDE0LjU4NmwtMi4yMDIgMi4yMDJBLjcxLjcxIDAgMCAxIDIgMTQuMjg2VjRhMiAyIDAgMCAxIDItMmgxMGEyIDIgMCAwIDEgMiAyeiIvPjxwYXRoIGQ9Ik0yMCA5YTIgMiAwIDAgMSAyIDJ2MTAuMjg2YS43MS43MSAwIDAgMS0xLjIxMi41MDJsLTIuMjAyLTIuMjAyQTIgMiAwIDAgMCAxNy4xNzIgMTlIMTBhMiAyIDAgMCAxLTItMnYtMSIvPjwvc3ZnPg=='
    const img_inscripciones = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbm90ZWJvb2stcGVuLWljb24gbHVjaWRlLW5vdGVib29rLXBlbiI+PHBhdGggZD0iTTEzLjQgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0ydi03LjQiLz48cGF0aCBkPSJNMiA2aDQiLz48cGF0aCBkPSJNMiAxMGg0Ii8+PHBhdGggZD0iTTIgMTRoNCIvPjxwYXRoIGQ9Ik0yIDE4aDQiLz48cGF0aCBkPSJNMjEuMzc4IDUuNjI2YTEgMSAwIDEgMC0zLjAwNC0zLjAwNGwtNS4wMSA1LjAxMmEyIDIgMCAwIDAtLjUwNi44NTRsLS44MzcgMi44N2EuNS41IDAgMCAwIC42Mi42MmwyLjg3LS44MzdhMiAyIDAgMCAwIC44NTQtLjUwNnoiLz48L3N2Zz4='
    const img_eventos = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtY2FsZW5kYXItY2xvY2staWNvbiBsdWNpZGUtY2FsZW5kYXItY2xvY2siPjxwYXRoIGQ9Ik0xNiAxNHYyLjJsMS42IDEiLz48cGF0aCBkPSJNMTYgMnY0Ii8+PHBhdGggZD0iTTIxIDcuNVY2YTIgMiAwIDAgMC0yLTJINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMy41Ii8+PHBhdGggZD0iTTMgMTBoNSIvPjxwYXRoIGQ9Ik04IDJ2NCIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiLz48L3N2Zz4='
    const img_ofertas_laborales = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYnJpZWZjYXNlLWJ1c2luZXNzLWljb24gbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcyI+PHBhdGggZD0iTTEyIDEyaC4wMSIvPjxwYXRoIGQ9Ik0xNiA2VjRhMiAyIDAgMCAwLTItMmgtNGEyIDIgMCAwIDAtMiAydjIiLz48cGF0aCBkPSJNMjIgMTNhMTguMTUgMTguMTUgMCAwIDEtMjAgMCIvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgeD0iMiIgeT0iNiIgcng9IjIiLz48L3N2Zz4='
    const img_comentarios = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbWVzc2FnZS1jaXJjbGUtaWNvbiBsdWNpZGUtbWVzc2FnZS1jaXJjbGUiPjxwYXRoIGQ9Ik0yLjk5MiAxNi4zNDJhMiAyIDAgMCAxIC4wOTQgMS4xNjdsLTEuMDY1IDMuMjlhMSAxIDAgMCAwIDEuMjM2IDEuMTY4bDMuNDEzLS45OThhMiAyIDAgMCAxIDEuMDk5LjA5MiAxMCAxMCAwIDEgMC00Ljc3Ny00LjcxOSIvPjwvc3ZnPg=='
    const img_convenios = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtaGFuZHNoYWtlLWljb24gbHVjaWRlLWhhbmRzaGFrZSI+PHBhdGggZD0ibTExIDE3IDIgMmExIDEgMCAxIDAgMy0zIi8+PHBhdGggZD0ibTE0IDE0IDIuNSAyLjVhMSAxIDAgMSAwIDMtM2wtMy44OC0zLjg4YTMgMyAwIDAgMC00LjI0IDBsLS44OC44OGExIDEgMCAxIDEtMy0zbDIuODEtMi44MWE1Ljc5IDUuNzkgMCAwIDEgNy4wNi0uODdsLjQ3LjI4YTIgMiAwIDAgMCAxLjQyLjI1TDIxIDQiLz48cGF0aCBkPSJtMjEgMyAxIDExaC0yIi8+PHBhdGggZD0iTTMgMyAyIDE0bDYuNSA2LjVhMSAxIDAgMSAwIDMtMyIvPjxwYXRoIGQ9Ik0zIDRoOCIvPjwvc3ZnPg=='
    const img_organizaciones = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYnVpbGRpbmcyLWljb24gbHVjaWRlLWJ1aWxkaW5nLTIiPjxwYXRoIGQ9Ik0xMCAxMmg0Ii8+PHBhdGggZD0iTTEwIDhoNCIvPjxwYXRoIGQ9Ik0xNCAyMXYtM2EyIDIgMCAwIDAtNCAwdjMiLz48cGF0aCBkPSJNNiAxMEg0YTIgMiAwIDAgMC0yIDJ2N2EyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yaC0yIi8+PHBhdGggZD0iTTYgMjFWNWEyIDIgMCAwIDEgMi0yaDhhMiAyIDAgMCAxIDIgMnYxNiIvPjwvc3ZnPg=='
    const img_historicos = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYWxidW0taWNvbiBsdWNpZGUtYWxidW0iPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PHBvbHlsaW5lIHBvaW50cz0iMTEgMyAxMSAxMSAxNCA4IDE3IDExIDE3IDMiLz48L3N2Zz4='
    const img_organizacion = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNEMxQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYnVpbGRpbmctaWNvbiBsdWNpZGUtYnVpbGRpbmciPjxwYXRoIGQ9Ik0xMiAxMGguMDEiLz48cGF0aCBkPSJNMTIgMTRoLjAxIi8+PHBhdGggZD0iTTEyIDZoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48cGF0aCBkPSJNMTYgNmguMDEiLz48cGF0aCBkPSJNOCAxMGguMDEiLz48cGF0aCBkPSJNOCAxNGguMDEiLz48cGF0aCBkPSJNOCA2aC4wMSIvPjxwYXRoIGQ9Ik05IDIydi0zYTEgMSAwIDAgMSAxLTFoNGExIDEgMCAwIDEgMSAxdjMiLz48cmVjdCB4PSI0IiB5PSIyIiB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHJ4PSIyIi8+PC9zdmc+'
    const img_curso = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbGlwYm9hcmQtY2xvY2staWNvbiBsdWNpZGUtY2xpcGJvYXJkLWNsb2NrIj48cGF0aCBkPSJNMTYgMTR2Mi4ybDEuNiAxIi8+PHBhdGggZD0iTTE2IDRoMmEyIDIgMCAwIDEgMiAydi44MzIiLz48cGF0aCBkPSJNOCA0SDZhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2Ii8+PHJlY3QgeD0iOCIgeT0iMiIgd2lkdGg9IjgiIGhlaWdodD0iNCIgcng9IjEiLz48L3N2Zz4='
    const img_visitas = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MTQzMUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluLXBsdXMtaWNvbiBsdWNpZGUtbWFwLXBpbi1wbHVzIj48cGF0aCBkPSJNMTkuOTE0IDExLjEwNUE3LjI5OCA3LjI5OCAwIDAgMCAyMCAxMGE4IDggMCAwIDAtMTYgMGMwIDQuOTkzIDUuNTM5IDEwLjE5MyA3LjM5OSAxMS43OTlhMSAxIDAgMCAwIDEuMjAyIDAgMzIgMzIgMCAwIDAgLjgyNC0uNzM4Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjxwYXRoIGQ9Ik0xNiAxOGg2Ii8+PHBhdGggZD0iTTE5IDE1djYiLz48L3N2Zz4='

    const rutaActual = location.pathname;

    const renderItem = ({ key, etiqueta, ruta, icono, activo, onClickExtra }) => (
        <li
            key={key}
            className={`navuser-item ${activo ? 'activo' : ''}`}
            onClick={(e) => {
                if (onClickExtra) onClickExtra(e);
                navigate(ruta);
            }}
            title={`Ir a ${etiqueta}`}
        >
            <div className="navuser-item-content">
                <div className="navuser-icono-box">
                    <img src={icono} alt={etiqueta} />
                </div>
                <p className="navuser-item-texto">{etiqueta}</p>
            </div>
            <span className="navuser-chevron">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </span>
        </li>
    );

    return (
        <aside 
            className="navuser" 
            style={{ 
                left: props.left ? props.left : '30px',
                top: props.top ? props.top : undefined 
            }} 
            aria-label="Menú principal de usuario"
        >
            <div className="navuser-card">
                {/* Cabecera Institucional del Menú */}
                <div className="navuser-header">
                    <div className="navuser-header-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </div>
                    <div className="navuser-header-texto">
                        <h3 className="navuser-header-titulo">Panel Principal</h3>
                        <span className="navuser-header-subtitulo">
                            {user?.tipo ? `${user.tipo}` : 'Gestión Institucional'}
                        </span>
                    </div>
                </div>

                {/* Lista de Navegación */}
                <ul className="navuser-lista">
                    {/* Organización */}
                    {(user.rol.includes('ADMIN_ORG') && !user.rol.includes('ADMIN_SYS')) && (
                        renderItem({
                            key: 'organizacion',
                            etiqueta: 'Organización',
                            ruta: `/organizacion/${user.organizacion}`,
                            icono: img_organizacion,
                            activo: rutaActual.startsWith('/organizacion'),
                            onClickExtra: () => navigate(0)
                        })
                    )}

                    {/* Mensajes */}
                    {user.tipo !== 'Comité' && (
                        renderItem({
                            key: 'mensajes',
                            etiqueta: 'Mensajes',
                            ruta: '/mensajes',
                            icono: img_mensajes,
                            activo: rutaActual === '/mensajes'
                        })
                    )}

                    {/* Inscripciones */}
                    {user.tipo !== 'Escuela' && (
                        renderItem({
                            key: 'inscripciones',
                            etiqueta: 'Inscripciones',
                            ruta: '/inscripciones',
                            icono: img_inscripciones,
                            activo: rutaActual === '/inscripciones'
                        })
                    )}

                    {/* Eventos */}
                    {renderItem({
                        key: 'eventos',
                        etiqueta: 'Eventos',
                        ruta: '/eventos',
                        icono: img_eventos,
                        activo: rutaActual === '/eventos'
                    })}

                    {/* Cursos */}
                    {user.tipo !== 'Cámara' && (
                        renderItem({
                            key: 'cursos',
                            etiqueta: 'Cursos',
                            ruta: '/cursos',
                            icono: img_curso,
                            activo: rutaActual === '/cursos'
                        })
                    )}

                    {/* Visitas */}
                    {user.tipo !== 'Cámara' && (
                        renderItem({
                            key: 'visitas',
                            etiqueta: 'Visitas',
                            ruta: '/visitas',
                            icono: img_visitas,
                            activo: rutaActual === '/visitas'
                        })
                    )}

                    {/* Ofertas Laborales */}
                    {user.tipo !== 'Cámara' && (
                        renderItem({
                            key: 'ofertaslaborales',
                            etiqueta: 'Ofertas Laborales',
                            ruta: '/ofertaslaborales',
                            icono: img_ofertas_laborales,
                            activo: rutaActual === '/ofertaslaborales'
                        })
                    )}

                    {/* Comentarios */}
                    {renderItem({
                        key: 'comentarios',
                        etiqueta: 'Comentarios',
                        ruta: '/comentarios',
                        icono: img_comentarios,
                        activo: rutaActual === '/comentarios'
                    })}

                    {/* Convenios */}
                    {renderItem({
                        key: 'convenios',
                        etiqueta: 'Convenios',
                        ruta: '/convenios',
                        icono: img_convenios,
                        activo: rutaActual === '/convenios'
                    })}

                    {/* Organizaciones (Solo Admin Sys) */}
                    {user.rol.includes('ADMIN_SYS') && (
                        renderItem({
                            key: 'organizaciones',
                            etiqueta: 'Organizaciones',
                            ruta: '/organizaciones',
                            icono: img_organizaciones,
                            activo: rutaActual === '/organizaciones'
                        })
                    )}

                    {/* Históricos (Solo Admin Sys) */}
                    {user.rol.includes('ADMIN_SYS') && (
                        renderItem({
                            key: 'historicos',
                            etiqueta: 'Históricos',
                            ruta: '/historicos',
                            icono: img_historicos,
                            activo: rutaActual === '/historicos'
                        })
                    )}
                </ul>
            </div>
        </aside>
    )
}
