import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

interface ScanHistory {
  image: string;
  result: string;
  createdAt: string;
}
export default function Dashboard() {
  const histories = JSON.parse(localStorage.getItem('scan_histories') || '[]');

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
  const ringan = histories.filter((item: ScanHistory) => extractSeverity(item.result) === 'Ringan').length;

  const sedang = histories.filter((item: ScanHistory) => extractSeverity(item.result) === 'Sedang').length;

  const berat = histories.filter((item: ScanHistory) => extractSeverity(item.result) === 'Berat').length;

  const pieData = [
    {
      name: 'Ringan',
      value: ringan,
    },
    {
      name: 'Sedang',
      value: sedang,
    },
    {
      name: 'Berat',
      value: berat,
    },
  ];

  const diseaseData = [
    {
      name: 'Ringan',
      total: ringan,
    },
    {
      name: 'Sedang',
      total: sedang,
    },
    {
      name: 'Berat',
      total: berat,
    },
  ];

  return (
    <div className="min-h-screen px-6 md:max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-black">Dashboard 🌱</h1>

        <p className="text-zinc-400 mt-3">Monitoring kesehatan bibit sawit</p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-5 mb-10">
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          <p className="text-zinc-400">Total Scan</p>

          <h2 className="text-4xl font-black mt-3">{histories.length}</h2>
        </div>

        <div className="bg-green-500 rounded-3xl p-6 text-black">
          <p>Ringan</p>

          <h2 className="text-4xl font-black mt-3">{ringan}</h2>
        </div>

        <div className="bg-yellow-500 rounded-3xl p-6 text-black">
          <p>Sedang</p>

          <h2 className="text-4xl font-black mt-3">{sedang}</h2>
        </div>

        <div className="bg-red-500 rounded-3xl p-6 text-black">
          <p>Berat</p>

          <h2 className="text-4xl font-black mt-3">{berat}</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* PIE */}
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 h-[400px]">
          <h2 className="text-2xl font-bold mb-5">Severity Distribution</h2>

          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={120}>
                <Cell fill="#22c55e" />
                <Cell fill="#eab308" />
                <Cell fill="#ef4444" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 h-[400px]">
          <h2 className="text-2xl font-bold mb-5">Statistik Penyakit</h2>

          <ResponsiveContainer>
            <BarChart data={diseaseData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="total" fill="#184a3b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT */}
      <div className="mt-10 bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
        <h2 className="text-2xl font-bold mb-5">Scan Terbaru</h2>

        <div className="space-y-4">
          {histories.slice(0, 5).map((item: ScanHistory, index: number) => (
            <div key={index} className="flex items-center gap-4 bg-zinc-800 rounded-2xl p-4">
              <img src={item.image} alt="scan" className="w-20 h-20 rounded-2xl object-cover" />

              <div>
                <p className="font-semibold">{item.result.slice(0, 80)}...</p>

                <p className="text-zinc-400 text-sm mt-1">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
