export const Inventario = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Control de Inventario y Materia Prima</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
          <div className="bg-slate-800/80 p-4 border-b border-slate-700/50">
            <h2 className="font-bold text-white text-lg">Materia Prima Crítica</h2>
          </div>
          <div className="p-4 space-y-4">
            <AlertItem name="Hilo de Algodón" current="15 kg" min="20 kg" status="Crítico" />
            <AlertItem name="Palos de Madera 1.2m" current="45 und" min="100 und" status="Bajo" />
            <AlertItem name="Adaptadores Plásticos" current="120 und" min="150 und" status="Bajo" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden">
          <div className="bg-slate-800/80 p-4 border-b border-slate-700/50">
            <h2 className="font-bold text-white text-lg">Últimos Movimientos</h2>
          </div>
          <div className="p-4 space-y-4 text-sm">
            <Movimiento date="Hoy 10:30" desc="Entrada: 50kg Hilo Poliéster" type="in" />
            <Movimiento date="Hoy 08:15" desc="Salida: 120 Traperos (Pedido PD-1024)" type="out" />
            <Movimiento date="Ayer 16:45" desc="Salida: 45 Traperos Industriales" type="out" />
            <Movimiento date="Ayer 11:20" desc="Entrada: 500 Palos Metálicos" type="in" />
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertItem = ({ name, current, min, status }) => (
  <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
    <div>
      <p className="font-bold text-slate-200 text-sm">{name}</p>
      <p className="text-xs text-slate-400 mt-0.5">Actual: <span className="font-bold text-white">{current}</span> | Mínimo: {min}</p>
    </div>
    <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${
      status === 'Crítico' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    }`}>
      {status}
    </span>
  </div>
);

const Movimiento = ({ date, desc, type }) => (
  <div className="flex gap-3 items-start border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 shadow-sm ${type === 'in' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-blue-500 shadow-blue-500/50'}`}></div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">{date}</p>
      <p className="font-medium text-slate-300">{desc}</p>
    </div>
  </div>
);
