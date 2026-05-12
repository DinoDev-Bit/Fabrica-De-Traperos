import { useData } from '../context/DataContext';

export const Contabilidad = () => {
  const { pedidos } = useData();

  // Calcular ingresos solo de pedidos completados
  const ingresosReales = pedidos
    .filter(p => p.estado === 'Completado')
    .reduce((sum, p) => sum + p.total, 0);

  const gastos = ingresosReales * 0.30;
  const margenNeto = ingresosReales - gastos;
  const rentabilidad = ingresosReales > 0 ? ((margenNeto / ingresosReales) * 100).toFixed(1) : 0;

  const handleDownload = () => {
    const content = `
========================================
   FÁBRICA DE TRAPEROS - BALANCE FINAL
========================================
Fecha de Reporte: ${new Date().toLocaleString()}

- Ingresos Totales: $${ingresosReales.toLocaleString()}
- Gastos Operativos Estimados (30%): $${gastos.toLocaleString()}
- Margen Neto / Utilidad: $${margenNeto.toLocaleString()}
- Rentabilidad del Negocio: ${rentabilidad}%

Pedidos Completados Registrados: ${pedidos.filter(p => p.estado === 'Completado').length}

========================================
Documento generado automáticamente.
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Balance_Fabrica_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Contabilidad y Finanzas</h1>
        <button 
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-blue-500/50 shadow-lg shadow-blue-500/20"
        >
          Descargar Balance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 border-t-4 border-t-emerald-500">
          <p className="text-slate-400 font-medium mb-1">Ingresos del Mes</p>
          <h3 className="text-3xl font-bold text-white mb-2">${ingresosReales.toLocaleString()}</h3>
          <p className="text-sm font-bold text-emerald-400">Total Validado</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 border-t-4 border-t-red-500">
          <p className="text-slate-400 font-medium mb-1">Gastos Operativos (30%)</p>
          <h3 className="text-3xl font-bold text-white mb-2">${gastos.toLocaleString()}</h3>
          <p className="text-sm font-bold text-red-400">Gasto estimado automático</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 border-t-4 border-t-blue-500">
          <p className="text-slate-400 font-medium mb-1">Margen Neto</p>
          <h3 className="text-3xl font-bold text-white mb-2">${margenNeto.toLocaleString()}</h3>
          <p className="text-sm font-bold text-emerald-400">{rentabilidad}% Rentabilidad</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 p-6 flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Módulo Financiero Activo</h2>
        <p className="text-slate-400 max-w-md">
          El análisis financiero ahora está sincronizado directamente con tus ventas. El cálculo de gastos es una provisión automática del 30% basada en ingresos.
        </p>
      </div>
    </div>
  );
};
