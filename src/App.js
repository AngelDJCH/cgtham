import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandinfPage from './pages/LandingPage';
import AutenticacionPage from './pages/AutenticacionPage';
import HomePage from './pages/HomePage';
import Perfil from './pages/Perfil';
import Mensajes from './pages/Mensajes';
import Eventos from './pages/Eventos';
import Inscripciones from './pages/Inscripciones';
import OfertasLaborales from './pages/OfertasLaborales';
import Postulaciones from './pages/Postulaciones';
import Comentarios from './pages/Comentarios';
import Convenios from './pages/Convenios';
import Usuarios from './pages/Usuarios';
import Organizaciones from './pages/Organizaciones';
import Historicos from './pages/Historicos';
import Organizacion from './pages/Organizacion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandinfPage/>}></Route>
        <Route path='/:autenticacion' element={<AutenticacionPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/mensajes' element={<Mensajes/>}></Route>
        <Route path='/inscripciones' element={<Inscripciones/>}></Route>
        <Route path='/eventos' element={<Eventos/>}></Route>
        <Route path='/ofertaslaborales' element={<OfertasLaborales/>}></Route>     
        <Route path='/postulaciones' element={<Postulaciones/>}></Route>
        <Route path='/comentarios' element={<Comentarios/>}></Route>
        <Route path='/convenios' element={<Convenios/>}></Route>
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        <Route path='/organizaciones' element={<Organizaciones/>}></Route>
        <Route path='/historicos' element={<Historicos/>}></Route>
        <Route path='/organizacion' element={<Organizacion/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
