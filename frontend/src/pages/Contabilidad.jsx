export const Contabilidad = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Contabilidad y Finanzas</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-blue-500/50">
          Descargar Balance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 border-t-4 border-t-emerald-500">
          <p className="text-slate-400 font-medium mb-1">Ingresos del Mes</p>
          <h3 className="text-3xl font-bold text-white mb-2">$15,450,000</h3>
          <p className="text-sm font-bold text-emerald-400">+12% vs mes anterior</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 border-t-4 border-t-red-500">
          <p className="text-slate-400 font-medium mb-1">Gastos Operativos</p>
          <h3 className="text-3xl font-bold text-white mb-2">$4,230,000</h3>
          <p className="text-sm font-bold text-red-400">+5% vs mes anterior</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 border-t-4 border-t-blue-500">
          <p className="text-slate-400 font-medium mb-1">Margen Neto</p>
          <h3 className="text-3xl font-bold text-white mb-2">$11,220,000</h3>
          <p className="text-sm font-bold text-emerald-400">72.6% Rentabilidad</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 p-6 flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Módulo Financiero Completo</h2>
        <p className="text-slate-400 max-w-md">
          El análisis detallado de facturación, cuentas por cobrar, cuentas por pagar y reportes contables NIIF estará disponible en la próxima actualización.
        </p>
      </div>
    </div>
  );
};
