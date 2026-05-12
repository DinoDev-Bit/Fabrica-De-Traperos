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

  const [pedidosEliminados, setPedidosEliminados] = useState(() => {
    const saved = localStorage.getItem('app_pedidos_eliminados');
    return saved ? JSON.parse(saved) : [];
  });

  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('app_clientes');
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

  useEffect(() => {
    localStorage.setItem('app_pedidos_eliminados', JSON.stringify(pedidosEliminados));
  }, [pedidosEliminados]);

  useEffect(() => {
    localStorage.setItem('app_clientes', JSON.stringify(clientes));
  }, [clientes]);

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
  const getEstado = (stock) => {
    const s = parseInt(stock);
    if (s <= 10) return 'Crítico';
    if (s <= 50) return 'Stock Bajo';
    return 'En Stock';
  };

  const addPedido = (pedido) => {
    setPedidos(prev => [{ ...pedido, id: `PD-${Date.now().toString().slice(-4)}` }, ...prev]);
    
    // Descontar stock de los productos vendidos
    if (pedido.items && pedido.items.length > 0) {
      setProductos(prevProductos => 
        prevProductos.map(p => {
          const itemVendido = pedido.items.find(i => i.producto.id === p.id);
          if (itemVendido) {
            const nuevoStock = Math.max(0, p.stock - itemVendido.cantidad);
            return { ...p, stock: nuevoStock, estado: getEstado(nuevoStock) };
          }
          return p;
        })
      );
    }

    addNotificacion(`Nuevo pedido creado para: ${pedido.cliente}`, 'success');
  };

  const marcarPedidoCompletado = (id) => {
    setPedidos(prev => prev.map(p => 
      p.id === id ? { ...p, estado: 'Completado' } : p
    ));
    addNotificacion(`Pedido ${id} marcado como completado`, 'success');
  };

  const moverAPapelera = (id, devolverStock = false) => {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;
    
    if (devolverStock && pedido.items && pedido.items.length > 0) {
      setProductos(prevProductos => 
        prevProductos.map(p => {
          const itemVendido = pedido.items.find(i => i.producto.id === p.id);
          if (itemVendido) {
            const nuevoStock = p.stock + itemVendido.cantidad;
            return { ...p, stock: nuevoStock, estado: getEstado(nuevoStock) };
          }
          return p;
        })
      );
    }

    setPedidos(prev => prev.filter(p => p.id !== id));
    setPedidosEliminados(prev => [{ ...pedido, fechaEliminacion: new Date().toLocaleString() }, ...prev]);
    addNotificacion(`Pedido ${id} enviado a la papelera. ${devolverStock ? 'Stock devuelto.' : ''}`, 'warning');
  };

  const restaurarDePapelera = (id) => {
    const pedido = pedidosEliminados.find(p => p.id === id);
    if (!pedido) return;
    setPedidosEliminados(prev => prev.filter(p => p.id !== id));
    
    // Quitar la fecha de eliminación para restaurarlo limpio
    const { fechaEliminacion, ...pedidoRestaurado } = pedido;
    setPedidos(prev => [pedidoRestaurado, ...prev]);
    addNotificacion(`Pedido ${id} restaurado`, 'success');
  };

  // Funciones de Clientes
  const addCliente = (cliente) => {
    setClientes(prev => [{ ...cliente, id: `CL-${Date.now().toString().slice(-4)}`, status: 'Activo', pedidos: 0, totalComprado: 0 }, ...prev]);
    addNotificacion(`Cliente registrado: ${cliente.nombre}`, 'success');
  };

  const updateCliente = (id, updatedCliente) => {
    setClientes(prev => prev.map(c => c.id === id ? { ...updatedCliente, id } : c));
    addNotificacion(`Cliente actualizado: ${updatedCliente.nombre}`, 'info');
  };

  const deleteCliente = (id) => {
    const cliente = clientes.find(c => c.id === id);
    setClientes(prev => prev.filter(c => c.id !== id));
    if (cliente) addNotificacion(`Cliente eliminado: ${cliente.nombre}`, 'warning');
  };

  return (
    <DataContext.Provider value={{
      productos, addProducto, updateProducto, deleteProducto,
      pedidos, pedidosEliminados, addPedido, marcarPedidoCompletado, moverAPapelera, restaurarDePapelera,
      clientes, addCliente, updateCliente, deleteCliente,
      notificaciones, addNotificacion, limpiarNotificaciones
    }}>
      {children}
    </DataContext.Provider>
  );
};
