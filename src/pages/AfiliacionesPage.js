import { useMediaQuery } from "@uidotdev/usehooks";
import NavBarAutenticado from "../components/NavBarAutenticado";
import NavUser from "../components/NavUser";
import { useAuth } from "../hooks/useAuth";
import { createAfiliacion } from "../services/Afiliacion";
import '../styles/afiliaciones.css'

export default function Afiliaciones() {
    const isLargeDevice = useMediaQuery('(min-width:992px) or (min-width: 1400px)');

    const crearAfiliacion = async (empresa, camara) => {
        const res = await createAfiliacion(empresa, camara)
        if (res == 201) alert('Afiliación creada')
    }

    const { user } = useAuth()
    return (
        <>
            <NavBarAutenticado />
            {
                isLargeDevice && (
                    <div style={{ marginTop: '8rem' }}>
                        <NavUser left='30px' />
                    </div>
                )
            }
            <div style={{ width: '100%', marginTop: isLargeDevice ? '5vh' : '16vh', display: 'flex', justifyContent: isLargeDevice ? 'end' : 'center' }}>
                <div style={{ width: isLargeDevice ? '70%' : '90%', height: isLargeDevice ? '75vh' : '80vh', backgroundColor: 'white', marginRight: isLargeDevice ? '2rem' : '0rem' }}>
                    <div style={{ width: '100%', height: '20px',display:'flex', gap:'1rem', justifyContent:'center', marginTop:'1rem', flexWrap:'wrap'}}>
                        <input placeholder="Ingresa el nombre de la empresa"
                            style={{
                                border: '1px solid black',
                                fontFamily: 'Poppins',
                                fontSize: "12px",
                                textAlign: 'center',
                                width: '500px',
                                height: '100%'
                            }}
                        />
                        <button className="btn-accion-2">
                            <strong>BUSCAR</strong>
                        </button>
                    </div>
                    <div style={{display:'flex', marginTop:'1rem'}}>
                                            <div
                        className="card-afiliacion"
                    >
                        <div><h6>PETICIONES</h6></div>
                        <div><textarea value={'En esta sección encontras las peticiones de afiliación de otras empresas a tu camara de comercio.'}/></div>
                        <div><button><strong>ABRIR</strong></button></div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}