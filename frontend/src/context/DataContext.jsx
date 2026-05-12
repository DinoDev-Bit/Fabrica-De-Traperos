import { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Initialize from localStorage or empty
  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem('app_productos');
    return saved ? JSON.parse(saved) : [];
  });

  const [pedidos, setPedidos] = useState(() => {
    const saved = localStorage.getItem('app_pedidos');
    return saved ? JSON.parse(saved) : [];
  });

  const [notificaciones, setNotificaciones] = useState(() => {
    const saved = localStorage.getItem('app_notificaciones');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('app_productos', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('app_pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  useEffect(() => {
    localStorage.setItem('app_notificaciones', JSON.stringify(notificaciones));
  }, [notificaciones]);

  // Helper to add notification
  const addNotificacion = (mensaje, tipo = 'info') => {
    const nueva = {
      id: Date.now(),
      mensaje,
      tipo,
      fecha: new Date().toLocaleString()
    };
    setNotificaciones(prev => [nueva, ...prev].slice(0, 20)); // Keep last 20
  };

  const limpiarNotificaciones = () => {
    setNotificaciones([]);
  };

  // Funciones de Productos
  const addProducto = (prod) => {
    setProductos(prev => [{ ...prod, id: Date.now() }, ...prev]);
    addNotificacion(`Producto agregado: ${prod.nombre}`, 'success');
  };

  const updateProducto = (id, updatedProd) => {
    setProductos(prev => prev.map(p => p.id === id ? { ...updatedProd, id } : p));
    addNotificacion(`Producto actualizado: ${updatedProd.nombre}`, 'info');
  };

  const deleteProducto = (id) => {
    const prod = productos.find(p => p.id === id);
    setProductos(prev => prev.filter(p => p.id !== id));
    if (prod) addNotificacion(`Producto eliminado: ${prod.nombre}`, 'warning');
  };

  // Funciones de Pedidos
  const addPedido = (pedido) => {
    setPedidos(prev => [{ ...pedido, id: `PD-${Date.now().toString().slice(-4)}` }, ...prev]);
    addNotificacion(`Nuevo pedido creado para: ${pedido.cliente}`, 'success');
  };

  return (
    <DataContext.Provider value={{
      productos, addProducto, updateProducto, deleteProducto,
      pedidos, addPedido,
      notificaciones, addNotificacion, limpiarNotificaciones
    }}>
      {children}
    </DataContext.Provider>
  );
};
