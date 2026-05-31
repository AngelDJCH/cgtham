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

import { ProtectedRoute } from './components/ProtectedRoute.js'
import { AuthProvider } from './context/AuthContext.js';
import Cursos from './pages/Cursos.js';
import Visitas from './pages/Visitas.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandinfPage />}></Route>
          <Route path='/:autenticacion' element={<AutenticacionPage />}></Route>
          <Route path='/home' element={
            <ProtectedRoute redirectTo='/'>
              <HomePage />
            </ProtectedRoute>
          }></Route>
          <Route path='/mensajes' element={
            <ProtectedRoute redirectTo={'/home'} roles={['ADMIN_ORG']}>
              <Mensajes />
            </ProtectedRoute>
          }></Route>
          <Route path='/inscripciones' element={
            <ProtectedRoute redirectTo='/home' roles={['ADMIN_ORG']} tipo={'Escuela'}>
              <Inscripciones />
            </ProtectedRoute>
          }></Route>
          <Route path='/eventos' element={
            <ProtectedRoute>
              <Eventos />
            </ProtectedRoute>
          }></Route>
          <Route path='/ofertaslaborales' element={
            <ProtectedRoute>
              <OfertasLaborales />
            </ProtectedRoute>
          }></Route>
          <Route path='/comentarios' element={
            <ProtectedRoute redirectTo='/'>
              <Comentarios />
            </ProtectedRoute>
          } redirectTo='/'></Route>
          <Route path='/convenios' element={
            <ProtectedRoute redirectTo={'/'}>
              <Convenios />
            </ProtectedRoute>
          }></Route>
          <Route path='/organizaciones' element={
            <ProtectedRoute roles={['ADMIN_SYS']} redirectTo={'/home'}>
              <Organizaciones />
            </ProtectedRoute>
          }></Route>
          <Route path='/historicos' element={
            <ProtectedRoute redirectTo={'/home'} roles={['ADMIN_SYS']}>
              <Historicos />
            </ProtectedRoute>
          }></Route>
          <Route path='/organizacion/:id' element={
            <ProtectedRoute redirectTo={'/'}> {
              //<ProtectedRoute roles={['ADMIN_SYS']}  redirectTo={'/'}>
            }
              <Organizacion />
            </ProtectedRoute>
          }></Route>
          <Route
            path='/visitas'
            element={
              <ProtectedRoute
                redirectTo={'/'}
              >
                <Visitas/>
              </ProtectedRoute>
            }
          >
          </Route>
          <Route
            path='/cursos'
            element={
              <ProtectedRoute
                redirectTo={'/'}
              >
                <Cursos/>
              </ProtectedRoute>
            }
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
