import { useEffect, useState, useMemo } from 'react';
import '../styles/listausuarios.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { getAllOrganizaciones } from '../services/Organizacion.js';

export default function ListaUsuarios(props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [organizaciones, setOrganizaciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [openChats, setOpenChats] = useState(false);

  useEffect(() => {
    const cargarOrganizaciones = async () => {
      try {
        const res = await getAllOrganizaciones();
        setOrganizaciones(res || []);
      } catch (err) {
        console.error("Error al cargar organizaciones en ListaUsuarios:", err);
      }
    };
    cargarOrganizaciones();
  }, []);

  const organizacionesRecomendadas = useMemo(() => {
    return organizaciones
      ?.filter(o => !user?.organizacion || o.id !== user?.organizacion)
      ?.filter(o => o.tipo !== 'Comité' && !o.nombre_comercial?.toLowerCase().includes('cgtham'))
      ?.filter(f => f.nombre_comercial?.toLowerCase().includes(busqueda.toLowerCase()));
  }, [organizaciones, user?.organizacion, busqueda]);

  // Componente de avatar con respaldo automático si falla la imagen
  const AvatarItem = ({ src, nombre }) => {
    const [imgError, setImgError] = useState(false);
    const inicial = nombre ? nombre.trim().charAt(0).toUpperCase() : 'O';

    if (!src || imgError) {
      return (
        <div className="listausuarios-avatar-fallback">
          {inicial}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={nombre}
        onError={() => setImgError(true)}
      />
    );
  };

  const handleSeleccionar = (orgId) => {
    if (props?.selectUsuario) {
      props.selectUsuario(orgId);
    } else {
      navigate(`/organizacion/${orgId}`);
    }
  };

  return (
    <aside
      className="listausuarios"
      style={{
        position: props.position,
        width: props.width ? props.width : null,
        left: props.left ? `${props.left}` : null,
        right: props.right ? `${props.right}` : null,
        height: props.height,
        maxHeight: props.height,
        minHeight: props.height,
        bottom: props?.bottom
      }}
    >
      {/* Selector colapsable para dispositivos móviles */}
      {props.isSmallDevice && (
        <div className="listausuarios-selector-movil">
          <div
            className="listausuarios-selector-btn"
            onClick={() => setOpenChats(!openChats)}
          >
            <h6>RECOMENDACIONES ({organizacionesRecomendadas.length})</h6>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#41431B"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: openChats ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      )}

      {/* Contenido principal en tarjeta institucional */}
      {(!props.isSmallDevice || openChats) && (
        <div className="listausuarios-card">
          {/* Cabecera institucional simétrica con NavUser */}
          <div className="listausuarios-header">
            <div className="listausuarios-header-left">
              <div className="listausuarios-header-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="listausuarios-header-texto">
                <h3 className="listausuarios-header-titulo">RECOMENDACIONES</h3>
                <span className="listausuarios-header-subtitulo">RED DE VINCULACIÓN</span>
              </div>
            </div>
            <span className="listausuarios-badge-conteo" title="Organizaciones activas">
              {organizacionesRecomendadas.length}
            </span>
          </div>

          {/* Buscador integrado dentro de la tarjeta */}
          <div className="listausuarios-buscador-caja">
            <svg className="listausuarios-lupa-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar organización..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                type="button"
                className="listausuarios-btn-limpiar"
                onClick={() => setBusqueda('')}
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Lista de entidades recomendadas */}
          <ul className="listausuarios-lista">
            {organizacionesRecomendadas.length === 0 ? (
              <li className="listausuarios-vacio">
                <span>No se encontraron organizaciones disponibles.</span>
              </li>
            ) : (
              organizacionesRecomendadas.map((o) => {
                const esSeleccionado = props.usuarioActivo === o.id;
                return (
                  <li
                    key={o.id}
                    className={`listausuarios-item ${esSeleccionado ? 'item-seleccionado' : ''}`}
                    onClick={() => handleSeleccionar(o.id)}
                    title={`Ver perfil de ${o.nombre_comercial}`}
                  >
                    <div className="listausuarios-item-left">
                      <div className="listausuarios-avatar-box">
                        <AvatarItem src={o.logo} nombre={o.nombre_comercial} />
                      </div>
                      <div className="listausuarios-info">
                        <h4 className="listausuarios-nombre">
                          {o.nombre_comercial}
                        </h4>
                        {o.tipo && (
                          <span className="listausuarios-badge-tipo">
                            {o.tipo}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="listausuarios-chevron">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </aside>
  );
}
