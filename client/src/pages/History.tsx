import { useState } from 'react';
import { FiTrash2, FiAlertTriangle } from 'react-icons/fi';

interface ScanHistory {
  image: string;
  result: string;
  createdAt: string;
}

export default function History() {
  const [histories, setHistories] = useState<ScanHistory[]>(JSON.parse(localStorage.getItem('scan_histories') || '[]'));

  const deleteHistory = (index: number) => {
    const updated = histories.filter((_, i) => i !== index);

    setHistories(updated);

    localStorage.setItem('scan_histories', JSON.stringify(updated));
  };

  const extractSeverity = (result: string) => {
    const match = result.match(/SEVERITY:\s*(.*)/i);

    if (!match) return 'Sedang';

    const severity = match[1].toLowerCase();

    if (severity.includes('berat')) {
      return 'Berat';
    }

    if (severity.includes('ringan')) {
      return 'Ringan';
    }

    return 'Sedang';
  };
  const getSeverity = (result: string) => {
    const severity = extractSeverity(result);

    if (severity === 'Berat') {
      return {
        label: 'Berat',
        className: 'bg-red-500/20 text-red-400',
      };
    }

    if (severity === 'Sedang') {
      return {
        label: 'Sedang',
        className: 'bg-yellow-500/20 text-yellow-400',
      };
    }

    return {
      label: 'Ringan',
      className: 'bg-green-500/20 text-green-400',
    };
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen pb-10 px-6">
      <div className="mb-10">
        <h1 className="text-5xl font-black">Riwayat Scan</h1>

        <p className="text-zinc-400 mt-3">Semua hasil analisa tanaman sawit</p>
      </div>

      {histories.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center">
          <div className="flex justify-center mb-4 text-5xl text-green-400">🌱</div>

          <h2 className="text-2xl font-bold mb-2">Belum ada riwayat scan</h2>

          <p className="text-zinc-400">Mulai analisa tanaman sawit pertama kamu.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {histories.map((item: ScanHistory, index: number) => (
            <div key={index} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-green-500/40 transition-all duration-300 shadow-xl">
              <div className="overflow-hidden">
                <img src={item.image} alt="history" className="w-full h-64 object-cover hover:scale-105 transition duration-500" />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-zinc-500">{new Date(item.createdAt).toLocaleString()}</p>

                  <button onClick={() => deleteHistory(index)} className="text-red-400 hover:text-red-300 transition">
                    <FiTrash2 />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {(() => {
                    const severity = getSeverity(item.result);

                    return (
                      <span className={`${severity.className} px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                        <FiAlertTriangle />
                        {severity.label}
                      </span>
                    );
                  })()}
                </div>

                <div className="text-zinc-300 whitespace-pre-line max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">{item.result}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
