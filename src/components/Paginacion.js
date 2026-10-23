export default function Paginacion(props) {
    return (
        <>
            <div style={{
                width: '100%',
                height: '50px',
                display: 'flex',
                justifyContent: 'end',
                marginTop: '20px',
                gap: '10px'
            }}>
                <button
                    style={{
                        width: '100px',
                        height: '30px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        color: 'white',
                        backgroundColor: '#41431B'
                    }}
                    onClick={() => {
                        props.setOffset(props.offset > 0 ? props.offset - 20 : 0)
                    }}
                >
                    <strong>Anterior</strong>
                </button>
                <button
                    style={{
                        width: '100px',
                        height: '30px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        color: 'white',
                        backgroundColor: '#41431B',
                        marginRight: '20px'
                    }}
                    onClick={() => {
                        props.setOffset(props.offset + 20)
                    }}
                >
                    <strong>Siguiente</strong>
                </button>
            </div>
        </>
    )
}