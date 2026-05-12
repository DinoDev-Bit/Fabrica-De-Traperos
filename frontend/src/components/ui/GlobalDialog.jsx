import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { AlertCircle, HelpCircle, X, Check } from 'lucide-react';

export const GlobalDialog = () => {
  const { dialog, closeDialog } = useData();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (dialog && dialog.type === 'prompt') {
      setInputValue(dialog.defaultValue || '');
    }
  }, [dialog]);

  if (!dialog) return null;

  const handleConfirm = () => {
    const onConfirmCallback = dialog.onConfirm;
    const inputValueToPass = inputValue;
    const type = dialog.type;
    
    closeDialog();
    
    setTimeout(() => {
      if (type === 'prompt') {
        onConfirmCallback(inputValueToPass);
      } else {
        onConfirmCallback();
      }
    }, 10);
  };

  const handleCancel = () => {
    const onCancelCallback = dialog.onCancel;
    closeDialog();
    if (onCancelCallback) {
      setTimeout(() => onCancelCallback(), 10);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4">
        <div className="p-6">
          <div className="flex gap-4 items-start">
            <div className={`p-3 rounded-full flex-shrink-0 ${dialog.type === 'confirm' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {dialog.type === 'confirm' ? <AlertCircle size={24} /> : <HelpCircle size={24} />}
            </div>
            <div className="flex-1 mt-1">
              <h3 className="text-xl font-bold text-white mb-2">{dialog.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{dialog.message}</p>
              
              {dialog.type === 'prompt' && (
                <div className="mt-4">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white font-bold"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-slate-800/80 border-t border-slate-700/50 flex justify-end gap-3">
          <button 
            onClick={handleCancel}
            className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <X size={16} /> {dialog.cancelText}
          </button>
          <button 
            onClick={handleConfirm}
            className={`px-5 py-2 text-white rounded-lg font-bold shadow-lg transition-all flex items-center gap-2 ${
              dialog.type === 'confirm' ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20 border border-amber-500/50' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20 border border-blue-500/50'
            }`}
          >
            <Check size={16} /> {dialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
