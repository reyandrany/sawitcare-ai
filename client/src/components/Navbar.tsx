import { Link, useLocation } from 'react-router-dom';
import { FiCamera, FiGrid, FiClock, FiBox } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navs = [
    {
      name: 'Scanner',
      path: '/',
      icon: <FiCamera />,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FiGrid />,
    },
    {
      name: 'History',
      path: '/history',
      icon: <FiClock />,
    },
    {
      name: 'Nursery',
      path: '/nursery',
      icon: <FiBox />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-400">SawitCare AI</h1>

        <div className="hidden md:flex gap-3">
          {navs.map((nav) => (
            <Link key={nav.path} to={nav.path} className={`px-4 py-2 rounded-2xl flex items-center gap-2 transition ${location.pathname === nav.path ? 'bg-green-500 text-black' : 'text-zinc-300 hover:bg-zinc-800'}`}>
              {nav.icon}
              {nav.name}
            </Link>
          ))}
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden bg-zinc-900 px-4 py-2 rounded-xl text-white">
          ☰
        </button>
      </div>
      {/* OVERLAY */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/70 z-40" />}

      {/* MOBILE SIDEBAR */}
      <div className={`fixed top-0 right-0 h-screen w-[260px] bg-zinc-950 border-l border-zinc-800 z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-green-400">Menu</h2>

            <button onClick={() => setOpen(false)} className="text-3xl text-white">
              ×
            </button>
          </div>

          {/* MOBILE MENU */}
          <div className="flex flex-col gap-3">
            {navs.map((nav) => (
              <Link
                key={nav.path}
                to={nav.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition ${location.pathname === nav.path ? 'bg-green-500 text-black' : 'text-zinc-300 bg-zinc-900'}`}
              >
                {nav.icon}
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
