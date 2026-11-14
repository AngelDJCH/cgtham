export default function Paginacion(props) {
    return (
        <div style={{
            width: '90%',
            maxWidth: '1200px',
            margin: '1.2rem auto 2.5rem auto',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0 4px',
            boxSizing: 'border-box',
            fontFamily: 'Poppins, sans-serif'
        }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    disabled={props.offset === 0}
                    style={{
                        padding: '7px 18px',
                        border: '1.5px solid #CCD5AE',
                        cursor: props.offset === 0 ? 'not-allowed' : 'pointer',
                        borderRadius: '20px',
                        color: props.offset === 0 ? '#999999' : '#41431B',
                        backgroundColor: props.offset === 0 ? '#F0F2EB' : '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                    }}
                    onClick={() => {
                        props.setOffset(props.offset > 0 ? props.offset - 20 : 0)
                    }}
                >
                    Anterior
                </button>
                <button
                    style={{
                        padding: '7px 18px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '20px',
                        color: '#FFFFFF',
                        backgroundColor: '#41431B',
                        fontWeight: 700,
                        fontSize: '12px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                    }}
                    onClick={() => {
                        props.setOffset(props.offset + 20)
                    }}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}