import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";

export default function Eventos(prop) {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Eventos' placeholder='Buscar por nombre' opciones={['Mas recientes','Menos recientes']} accion='Crear evento'/>

            

           {
            /*

         <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    width: '90%',
                    backgroundColor: 'white',
                    height: '70vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '400px',
                        height: '460px',
                        backgroundColor: '#F5F3E7',
                        borderRadius: '10px'
                    }
                    }>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '45px', height: '45px' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '100%' }} src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            </div>
                            <div>
                                <h1 style={{ margin: 0, padding: 0, fontFamily: 'Poppins', fontSize: '16px' }}>Dia del programador</h1>
                                <p>Instituto Tecnologico de Orizaba</p>
                            </div>
                        </div>

                        <div>
                            <p>
                                Este evento le permite al usuario el poner en practica sus habilidades como programador y estudiante de la carrera perteneciente a la tecnología.
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '190px', height: '230px' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

                            </div>
                            <div style={{ width: '190px', height: '230px' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button>INSCRIBIRME</button>
                            <button style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '100%',
                                border: 'none',
                                backgroundColor: '#AEB784',
                                cursor: 'pointer'
                            }}>
                                <img
                                    style={{ width: '100%', height: '100%' }}
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdBNjAxRCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBlbmNpbC1pY29uIGx1Y2lkZS1wZW5jaWwiPjxwYXRoIGQ9Ik0yMS4xNzQgNi44MTJhMSAxIDAgMCAwLTMuOTg2LTMuOTg3TDMuODQyIDE2LjE3NGEyIDIgMCAwIDAtLjUuODNsLTEuMzIxIDQuMzUyYS41LjUgMCAwIDAgLjYyMy42MjJsNC4zNTMtMS4zMmEyIDIgMCAwIDAgLjgzLS40OTd6Ii8+PHBhdGggZD0ibTE1IDUgNCA0Ii8+PC9zdmc+" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            */
           }
        </div>
    )
}