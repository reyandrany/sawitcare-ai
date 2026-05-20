import { useEffect, useState } from 'react';

interface NurseryData {
  id: number;
  name: string;
  age: string;
  total: number;
  health: string;
}

export default function Nursery() {
  const [nurseries, setNurseries] = useState<NurseryData[]>([]);

  const [form, setForm] = useState({
    name: '',
    age: '',
    total: '',
    health: 'Sehat',
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const startEdit = (item: NurseryData) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      age: item.age,
      total: item.total.toString(),
      health: item.health,
    });
  };

  // load localStorage
  useEffect(() => {
    const stored = localStorage.getItem('nurseries');

    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNurseries(JSON.parse(stored));
    }
  }, []);

  // add nursery
  const addNursery = () => {
    if (!form.name || !form.age || !form.total) {
      alert('Lengkapi data');
      return;
    }

    // EDIT MODE
    if (editingId) {
      const updated = nurseries.map((item) =>
        item.id === editingId
          ? {
              ...item,
              name: form.name,
              age: form.age,
              total: Number(form.total),
              health: form.health,
            }
          : item,
      );

      setNurseries(updated);

      localStorage.setItem('nurseries', JSON.stringify(updated));

      setEditingId(null);
    } else {
      // CREATE MODE
      const newData: NurseryData = {
        id: Date.now(),
        name: form.name,
        age: form.age,
        total: Number(form.total),
        health: form.health,
      };

      const updated = [newData, ...nurseries];

      setNurseries(updated);

      localStorage.setItem('nurseries', JSON.stringify(updated));
    }

    setForm({
      name: '',
      age: '',
      total: '',
      health: 'Sehat',
    });
  };

  const deleteNursery = (id: number) => {
    const filtered = nurseries.filter((item) => item.id !== id);

    setNurseries(filtered);

    localStorage.setItem('nurseries', JSON.stringify(filtered));
  };

  const totalBibit = nurseries.reduce((acc, item) => acc + item.total, 0);

  const getHealthColor = (health: string) => {
    if (health === 'Kritis') {
      return 'bg-red-500 text-black';
    }

    if (health === 'Perlu Perhatian') {
      return 'bg-yellow-500 text-black';
    }

    return 'bg-green-500 text-black';
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-black">Nursery Management 🌱</h1>

        <p className="text-zinc-400 mt-3">Monitoring data bibit sawit</p>
      </div>

      {/* FORM */}
      <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 mb-10">
        <h2 className="text-2xl font-bold mb-5">Tambah Data Bibit</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Blok"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="bg-zinc-800 rounded-2xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Umur bibit (dalam bulan)"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age: e.target.value,
              })
            }
            className="bg-zinc-800 rounded-2xl px-4 py-3 outline-none"
          />

          <input
            type="number"
            placeholder="Jumlah bibit"
            value={form.total}
            onChange={(e) =>
              setForm({
                ...form,
                total: e.target.value,
              })
            }
            className="bg-zinc-800 rounded-2xl px-4 py-3 outline-none"
          />

          <select
            value={form.health}
            onChange={(e) =>
              setForm({
                ...form,
                health: e.target.value,
              })
            }
            className="bg-zinc-800 rounded-2xl px-4 py-3 outline-none"
          >
            <option>Sehat</option>
            <option>Perlu Perhatian</option>
            <option>Kritis</option>
          </select>
        </div>

        <button onClick={addNursery} className="mt-5 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-2xl">
          {editingId ? 'Update Bibit' : 'Simpan Bibit'}
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          <p className="text-zinc-400">Total Bibit</p>

          <h2 className="text-4xl font-black mt-3">{totalBibit}</h2>
        </div>

        <div className="bg-green-500 rounded-3xl p-6 text-black">
          <p>Nursery</p>

          <h2 className="text-4xl font-black mt-3">{nurseries.length}</h2>
        </div>

        <div className="bg-blue-500 rounded-3xl p-6 text-black">
          <p>Status Monitoring</p>

          <h2 className="text-2xl font-black mt-3">Active</h2>
        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {nurseries.length === 0 ? (
          <div className="col-span-full bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center">
            <div className="text-7xl mb-5">🌱</div>

            <h2 className="text-3xl font-black mb-3">Belum Ada Data Bibit</h2>

            <p className="text-zinc-400 max-w-md mx-auto">Tambahkan data nursery pertama untuk mulai monitoring kesehatan bibit sawit.</p>
          </div>
        ) : (
          nurseries.map((item) => (
            <div key={item.id} className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
              <h2 className="text-2xl font-bold mb-3">{item.name}</h2>

              <div className="space-y-2 text-zinc-300">
                <p>🌱 Umur: {item.age}</p>

                <p>📦 Jumlah: {item.total}</p>

                <div className={`${getHealthColor(item.health)} inline-block px-4 py-2 rounded-full font-bold mt-2`}>{item.health}</div>

                <div className="flex gap-3 mt-5">
                  <button onClick={() => startEdit(item)} className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-xl font-semibold text-black">
                    Edit
                  </button>

                  <button onClick={() => deleteNursery(item.id)} className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl font-semibold text-black">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
