import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Catalogo } from './pages/Catalogo';
import { Pedidos } from './pages/Pedidos';
import { NuevoPedido } from './pages/NuevoPedido';
import { Contabilidad } from './pages/Contabilidad';
import { Inventario } from './pages/Inventario';
import { Clientes } from './pages/Clientes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="nuevo-pedido" element={<NuevoPedido />} />
            <Route path="contabilidad" element={<Contabilidad />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="clientes" element={<Clientes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
