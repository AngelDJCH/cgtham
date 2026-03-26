import { useState } from "react"
import '../styles/notas.css'
import InscripcionAlterta from "./InscripcionAlterta";

export default function Notas() {

  const [openInscripcion, setOpenInscripcion] = useState(false)
  const [valor, setValor] = useState('')

  const [eventos, setEventos] = useState([
    {
      id: 1,
      nombre: 'Hackathon Global 2026',
      descripcion: 'Compite con programadores de todo el mundo para resolver retos tecnológicos innovadores.',
      fecha: '15/05/2026',
      tipo: 'Desarrollo y Tecnologia',
      imagenes: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 1,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aa9c?q=80&w=150&auto=format&fit=crop',
        nombre: 'TechInnovate Global'
      }
    },
    {
      id: 2,
      nombre: 'Simposio de Inteligencia Artificial',
      descripcion: 'Explora los últimos avances en IA y aprendizaje automático con expertos líderes.',
      fecha: '22/06/2026',
      tipo: 'Conferencia Tecnológica',
      imagenes: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 2,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop',
        nombre: 'AI Research Institute'
      }
    },
    {
      id: 3,
      nombre: 'Taller de Desarrollo Web Moderno',
      descripcion: 'Aprende a construir aplicaciones web rápidas y escalables con las tecnologías más recientes.',
      fecha: '10/07/2026',
      tipo: 'Taller Práctico',
      imagenes: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 3,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
        nombre: 'CodeMasters Academy'
      }
    },
    {
      id: 4,
      nombre: 'Cumbre de Ciberseguridad 2026',
      descripcion: 'Únete a expertos para discutir estrategias y herramientas para proteger datos en la era digital.',
      fecha: '05/08/2026',
      tipo: 'Seguridad Digital',
      imagenes: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 4,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
        nombre: 'CyberGuardians'
      }
    },
    {
      id: 5,
      nombre: 'Encuentro de Startups Tecnológicas',
      descripcion: 'Conecta con fundadores, inversores y mentores en el ecosistema emprendedor.',
      fecha: '20/09/2026',
      tipo: 'Networking Empresarial',
      imagenes: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 5,
        logo: 'https://images.unsplash.com/photo-1556761175-b3e51249b6b9?q=80&w=150&auto=format&fit=crop',
        nombre: 'InnovateHub'
      }
    },
    {
      id: 6,
      nombre: 'Foro sobre el Futuro de la Computación en la Nube',
      descripcion: 'Debate sobre tendencias y desafíos en servicios y arquitectura cloud.',
      fecha: '12/10/2026',
      tipo: 'Tecnología en la Nube',
      imagenes: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 6,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aa9c?q=80&w=150&auto=format&fit=crop',
        nombre: 'Cloud Tech Alliance'
      }
    },
    {
      id: 7,
      nombre: 'Día del Internet de las Cosas (IoT)',
      descripcion: 'Descubre cómo los dispositivos conectados están transformando industrias y vidas.',
      fecha: '25/11/2026',
      tipo: 'IoT y Conectividad',
      imagenes: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 7,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
        nombre: 'Smart World Solutions'
      }
    },
    {
      id: 8,
      nombre: 'Conferencia de Videojuegos y Realidad Virtual',
      descripcion: 'Experimenta las últimas innovaciones en entretenimiento digital e inmersivo.',
      fecha: '08/12/2026',
      tipo: 'Entretenimiento Digital',
      imagenes: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 8,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aa9c?q=80&w=150&auto=format&fit=crop',
        nombre: 'GameChangers Expo'
      }
    },
    {
      id: 9,
      nombre: 'Expo Robótica Avanzada 2027',
      descripcion: 'Observa robots de vanguardia en acción, desde asistentes personales hasta automatización industrial.',
      fecha: '18/01/2027',
      tipo: 'Robótica y Automatización',
      imagenes: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 9,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop',
        nombre: 'RoboTech Dynamics'
      }
    },
    {
      id: 10,
      nombre: 'Seminario de Ciencia de Datos y Big Data',
      descripcion: 'Aprende a extraer insights valiosos de grandes conjuntos de datos.',
      fecha: '26/02/2027',
      tipo: 'Análisis de Datos',
      imagenes: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 10,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
        nombre: 'DataInsights Forum'
      }
    },
    {
      id: 11,
      nombre: 'Día de la Movilidad Sostenible',
      descripcion: 'Explora soluciones tecnológicas para el transporte limpio y eficiente.',
      fecha: '14/03/2027',
      tipo: 'Tecnología y Sostenibilidad',
      imagenes: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 11,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aa9c?q=80&w=150&auto=format&fit=crop',
        nombre: 'EcoMobility Collective'
      }
    },
    {
      id: 12,
      nombre: 'Taller de Diseño de Experiencia de Usuario (UX)',
      descripcion: 'Crea interfaces digitales intuitivas y centradas en el usuario.',
      fecha: '05/04/2027',
      tipo: 'Diseño Digital',
      imagenes: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 12,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop',
        nombre: 'UX/UI Masters'
      }
    },
    {
      id: 13,
      nombre: 'Simposio sobre Blockchain y Criptomonedas',
      descripcion: 'Entiende el impacto de la tecnología blockchain en finanzas y otros sectores.',
      fecha: '20/05/2027',
      tipo: 'Tecnología Financiera',
      imagenes: 'https://images.unsplash.com/photo-1621504450181-5d356f63d307?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 13,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
        nombre: 'CryptoEdge Research'
      }
    },
    {
      id: 14,
      nombre: 'Feria de Tecnología Educativa (EdTech)',
      descripcion: 'Descubre herramientas digitales que están transformando la enseñanza y el aprendizaje.',
      fecha: '08/06/2027',
      tipo: 'Educación y Tecnología',
      imagenes: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 14,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aa9c?q=80&w=150&auto=format&fit=crop',
        nombre: 'EdTech Innovators'
      }
    },
    {
      id: 15,
      nombre: 'Encuentro de Desarrolladores de Videojuegos Indies',
      descripcion: 'Muestra tu juego, recibe feedback y conecta con otros creadores independientes.',
      fecha: '15/07/2027',
      tipo: 'Desarrollo de Juegos',
      imagenes: 'https://images.unsplash.com/photo-1580894742597-8eb488951cdd?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 15,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop',
        nombre: 'IndieGame Devs United'
      }
    },
    {
      id: 16,
      nombre: 'Conferencia sobre Inteligencia Artificial Ética',
      descripcion: 'Debate sobre los desafíos sociales y morales en el desarrollo y uso de la IA.',
      fecha: '05/08/2027',
      tipo: 'Ética y Tecnología',
      imagenes: 'https://images.unsplash.com/photo-1507146110448-8b55fcc595e?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 16,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
        nombre: 'Responsible AI Forum'
      }
    },
    {
      id: 17,
      nombre: 'Taller de Impresión 3D y Fabricación Digital',
      descripcion: 'Aprende a diseñar y prototipar objetos físicos utilizando tecnologías de fabricación digital.',
      fecha: '22/09/2027',
      tipo: 'Fabricación Digital',
      imagenes: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 17,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aa9c?q=80&w=150&auto=format&fit=crop',
        nombre: 'MakerSpace Collective'
      }
    },
    {
      id: 18,
      nombre: 'Expo Tecnología para la Salud (HealthTech)',
      descripcion: 'Explora innovaciones digitales que mejoran el diagnóstico, tratamiento y cuidado del paciente.',
      fecha: '10/10/2027',
      tipo: 'Salud y Tecnología',
      imagenes: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 18,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop',
        nombre: 'HealthTech Solutions'
      }
    },
    {
      id: 19,
      nombre: 'Foro sobre Ciudades Inteligentes (Smart Cities)',
      descripcion: 'Discute soluciones tecnológicas para crear entornos urbanos más sostenibles y eficientes.',
      fecha: '25/11/2027',
      tipo: 'Desarrollo Urbano',
      imagenes: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 19,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop',
        nombre: 'SmartCity Alliance'
      }
    },
    {
      id: 20,
      nombre: 'Día del Desarrollador Open Source',
      descripcion: 'Celebra la comunidad de código abierto, comparte tus proyectos y colabora con otros.',
      fecha: '13/12/2027',
      tipo: 'Código Abierto',
      imagenes: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=600&auto=format&fit=crop',
      organizacion: {
        id: 20,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aa9c?q=80&w=150&auto=format&fit=crop',
        nombre: 'OpenSource Foundation'
      }
    }
  ]);

  return (
    <div className="notas">
      {
        eventos.map(
          evento =>
            <div className="nota" key={evento.id}>
              <div className="n-s1">
                <img className="logo" src={evento.organizacion.logo} />
                <h1>{evento.organizacion.nombre}</h1>
              </div>
              <div className="n-s2">
                <p>{evento.descripcion}</p>
              </div>
              <div className="n-s3">
                <div className="n-s3-s1">
                  <img src={evento.imagenes} alt="imagenes" />
                </div>
                <div className="n-s3-s2">
                  <div>
                    <h1>{evento.nombre}</h1>
                  </div>
                  <div>
                    <p><strong>Fecha:</strong>{evento.fecha}</p>
                  </div>
                  <div>
                    <p><strong>Tipo:</strong>{evento.tipo}</p>
                  </div>
                  <div className="n-s3-s2-s4">
                    <button

                      value={'INSCR'}
                      onClick={(e) => {
                        setOpenInscripcion(true);
                        setValor(e.target.value)
                      }}
                    >INSCRIBIRME</button>
                  </div>
                </div>
              </div>
            </div>
        )
      }

      {
        openInscripcion && (<InscripcionAlterta titulo={valor} accion={setOpenInscripcion}/>)
      }

    </div>
  )
}