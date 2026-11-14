/**
 * Catálogo Canónico de Perfiles, Sectores y Giros Institucionales de CGTHAM
 * Utilizado para el registro de organizaciones y filtros de eventos.
 */
export const SECTORES_ORGANIZACION = [
    {
        id: 1,
        nombre: 'Industria y Manufactura',
        tipo: 'Empresa',
        giros: [
            { id: 1, nombre: 'Automotriz (Manufactura de componentes)' },
            { id: 2, nombre: 'Industrial (Destilación de alcohol)' },
            { id: 3, nombre: 'Minero e industrial' },
            { id: 4, nombre: 'Materiales de construcción (Cementera)' },
            { id: 5, nombre: 'Manufactura de productos de consumo' },
            { id: 6, nombre: 'Alimentario (Procesamiento de cárnicos)' },
            { id: 7, nombre: 'Industrial y de infraestructura' },
            { id: 8, nombre: 'Siderúrgico (Producción de acero)' }
        ]
    },
    {
        id: 2,
        nombre: 'Logística, Transporte y Distribución',
        tipo: 'Empresa',
        giros: [
            { id: 1, nombre: 'Transporte de carga y logística' }
        ]
    },
    {
        id: 3,
        nombre: 'Comercio y Servicios al Cliente',
        tipo: 'Empresa',
        giros: [
            { id: 1, nombre: 'Comercializadora de insumos' },
            { id: 2, nombre: 'Comercial (Retail/Tienda departamental)' },
            { id: 3, nombre: 'Servicios (Administración de centros comerciales)' }
        ]
    },
    {
        id: 4,
        nombre: 'Comunicación, Medios y Publicidad',
        tipo: 'Empresa',
        giros: [
            { id: 1, nombre: 'Telecomunicaciones y medios de comunicación' }
        ]
    },
    {
        id: 5,
        nombre: 'Educación y Formación Técnica',
        tipo: 'Escuela',
        giros: [
            { id: 1, nombre: 'Educación media superior tecnológica' },
            { id: 2, nombre: 'Formación técnica para el trabajo' },
            { id: 3, nombre: 'Educación técnica bachiller' },
            { id: 4, nombre: 'Educación general y formación integral' },
            { id: 5, nombre: 'Educación superior tecnológica (Ingenierías)' },
            { id: 6, nombre: 'Educación superior tecnológica rural y regional' }
        ]
    },
    {
        id: 6,
        nombre: 'Gestión Empresarial y Vinculación',
        tipo: 'Cámara de Comercio',
        giros: [
            { id: 1, nombre: 'Representación gremial del comercio y turismo' },
            { id: 2, nombre: 'Representación gremial de la industria de transformación' },
            { id: 3, nombre: 'Representación gremial del sector restaurantero' }
        ]
    }
];

export const TIPOS_ORGANIZACION = [
    'Escuela',
    'Empresa',
    'Cámara de Comercio'
];
