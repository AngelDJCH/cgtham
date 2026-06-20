import { useState } from "react"
import '../styles/aliados.css'

export default function Aliados() {
    const [aliados, setAliados] = useState([
        // EMPRESAS
        {
            id: 1,
            nombre: 'AKWEL',
            url: 'https://www.akwel-automotive.com',
            logo: 'https://th.bing.com/th/id/OIP.T_Hehr8kj8o19GEK3QfLqgHaFs?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 2,
            nombre: 'Alcoholera',
            url: 'https://diexmexico.com',
            logo: 'https://tse1.mm.bing.net/th/id/OIP.MGtcFhOsHPPB6ZOCkMlpzAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 3,
            nombre: 'Comervic',
            url: 'https://www.facebook.com/comervic',
            logo: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/461719803_2565004863700215_8981737667406763614_n.png?stp=dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=53a332&_nc_ohc=EPvo0_rMeogQ7kNvwGHYrT1&_nc_oc=Adpm_O4YnF2_hLfBJYtCTEAvTZiiqn1cA4uAJAtNM8RonvUzf17jMcVzKcEUuMOGNMI&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=Jm3il6a_pt4kHx2h0G2gxg&_nc_ss=7a30f&oh=00_AfyH5wTXa4OWA9myoYbR75oIE1j0rMoBQiXYaVVGkmivtQ&oe=69C908ED'
        },
        {
            id: 4,
            nombre: 'Fletes HESA',
            url: 'https://www.facebook.com/FletesHESA',
            logo: 'http://www.hesa.com.mx/images/logo-light.png'
        },
        {
            id: 5,
            nombre: 'Grupo Mineroni',
            url: 'https://www.grupomineroni.com',
            logo: 'https://tse2.mm.bing.net/th/id/OIP.drvZZ9lInX1x9szUo_rUAgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 6,
            nombre: 'Holcim',
            url: 'https://www.holcim.com.mx',
            logo: 'https://cdn.brandfetch.io/idZ5TRl0IY/w/1757/h/1757/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1751374667888'
        },
        {
            id: 7,
            nombre: 'Kimberly Clark de México',
            url: 'https://www.kimberly-clark.com.mx',
            logo: 'https://tse1.mm.bing.net/th/id/OIP.NhJbV7XBcsDs5zz_55Af6AAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 8,
            nombre: 'Liverpool Orizaba',
            url: 'https://www.liverpool.com.mx',
            logo: 'https://th.bing.com/th/id/R.b8eb6e8085ae291ac8b000bc13109c1b?rik=K7OTduLeP38fEA&pid=ImgRaw&r=0'
        },
        {
            id: 9,
            nombre: 'Plaza Valle',
            url: 'https://www.facebook.com/PlazaValleOrizaba',
            logo: 'https://th.bing.com/th/id/R.bbc352c830ec6c9b7dc173e053f7b5fc?rik=5oHtnaZBcyBCfg&riu=http%3a%2f%2fplazavalle.com%2fplazavalle%2fwp-content%2fuploads%2f2016%2f03%2flogor-1.png&ehk=6nCOQYH8x6cpbgezXHbKErl%2b93E434N5wJCCtx6VlPI%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 10,
            nombre: 'Rovianda',
            url: 'https://www.rovianda.com',
            logo: 'https://tse4.mm.bing.net/th/id/OIP.-j5E9mf3H-QJ7VTlYt9WzwHaD-?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 11,
            nombre: 'TIUSA',
            url: 'https://www.tiusa.com.mx',
            logo: 'https://tse2.mm.bing.net/th/id/OIP.aIwBr_W4zwZq3S8Dr0bDQAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 12,
            nombre: 'TVEO',
            url: 'https://www.facebook.com/tveorizaba',
            logo: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/464818685_8664752130229852_3708995208199340020_n.png?stp=dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=53a332&_nc_ohc=h2MQWFr2lMIQ7kNvwED2ieE&_nc_oc=Adp6ck2EvSzM_hyie4S6UVrgn8vujQCCOoqGitVG6sgh3p8F8MbITgENdgvchXtGEY0&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=KzhKD2XPqEcJFcAkzTB4Vw&_nc_ss=7a30f&oh=00_Afzj4R6rg3ZMg_xflZeqHfNv7GwBTzKIzEn_0zLmrJGExA&oe=69C8F80B'
        },
        {
            id: 13,
            nombre: 'TYASA',
            url: 'https://www.tyasa.com.mx',
            logo: 'https://media.glassdoor.com/sqls/2793560/tyasa-squarelogo-1672741087022.png'
        },

        // INSTITUCIONES EDUCATIVAS
        {
            id: 14,
            nombre: 'CBTIS 142',
            url: 'https://www.gob.mx/sep',
            logo: 'https://tse4.mm.bing.net/th/id/OIP.422fezbaNFQAq8Ke9eHedQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 15,
            nombre: 'CECATI 170',
            url: 'https://www.gob.mx/dgcft',
            logo: 'https://www.gob.mx/cms/uploads/article/main_image/70802/cecati.jpg'
        },
        {
            id: 16,
            nombre: 'CONALEP',
            url: 'https://www.conalep.edu.mx',
            logo: 'https://tse3.mm.bing.net/th/id/OIP.r9bECMBXe_pqJnqyuIsV7wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 17,
            nombre: 'Comunidad Morelos',
            url: 'https://www.facebook.com/ComunidadMorelos',
            logo: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/352560753_1183059996424091_4028914562758461492_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=Jd2UPP3jWPgQ7kNvwFGLFaM&_nc_oc=Adrj5R90lHBF0cTM08aS9qoYV1XgbRffKsnWqS82cTTCEWZEzho3nL16jDSVnJrn6GA&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=VhBsKnLbokBl8bnn_E1eFw&_nc_ss=7a30f&oh=00_AfxD1X1VJNxC1cKsnIOJUVPuWiQRirEjacgqNYuVE0QM5A&oe=69C92717'
        },
        {
            id: 18,
            nombre: 'ITOrizaba',
            url: 'https://orizaba.tecnm.mx',
            logo: 'https://tse1.explicit.bing.net/th/id/OIP.52V6_zMnhndWqovqoDF_gQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 19,
            nombre: 'ITSZ',
            url: 'https://www.itszongolica.edu.mx',
            logo: 'https://tse2.mm.bing.net/th/id/OIP.AxbAHJvtAXgHlbdXiqxEqAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
        },

        // CÁMARAS
        {
            id: 20,
            nombre: 'CANACO',
            url: 'https://www.canaco.org.mx',
            logo: 'https://tse2.mm.bing.net/th/id/OIP.jW-IZBB_5KfbHJ4r1gjFfQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
            id: 21,
            nombre: 'CANACINTRA',
            url: 'https://www.canacintra.org.mx',
            logo: 'https://www.gob.mx/cms/uploads/article/main_image/5335/post_canacintra.jpg'
        },
        {
            id: 22,
            nombre: 'CANIRAC',
            url: 'https://www.gob.mx/economia',
            logo: 'https://laextra.mx/wp-content/uploads/1970/01/canirac1.png'
        }
    ]);

    return (
        <div className="aliados-contenedor">
            <div className="carousel">
                <div className="group">
                    {
                        aliados.map(
                            aliado =>
                                <div key={aliado.id} className="card">
                                    <div className="contenedor-img">
                                        <img src={aliado.logo} alt={`logo ${aliado.nombre}`} />
                                    </div>
                                    <p>{aliado.nombre}</p>
                                </div>
                        )
                    }
                </div>
                <div className="group">
                    {
                        aliados.map(
                            aliado =>
                                <div key={aliado.id} className="card">
                                    <div className="contenedor-img">
                                        <img src={aliado.logo} alt={`logo ${aliado.nombre}`} />
                                    </div>
                                    <p>{aliado.nombre}</p>
                                </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}