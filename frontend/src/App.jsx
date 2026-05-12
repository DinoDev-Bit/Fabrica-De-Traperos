import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Catalogo } from './pages/Catalogo';
import { Pedidos } from './pages/Pedidos';
import { NuevoPedido } from './pages/NuevoPedido';
import { Contabilidad } from './pages/Contabilidad';
import { Inventario } from './pages/Inventario';
import { Clientes } from './pages/Clientes';
import { Configuracion } from './pages/Configuracion';
import { Preventa } from './pages/Preventa';
import { Papelera } from './pages/Papelera';

import { Roles } from './pages/Roles';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="nuevo-pedido" element={<NuevoPedido />} />
              <Route path="contabilidad" element={<Contabilidad />} />
              <Route path="inventario" element={<Inventario />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="preventa" element={<Preventa />} />
              <Route path="papelera" element={<Papelera />} />
              <Route path="roles" element={<Roles />} />
              <Route path="configuracion" element={<Configuracion />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
