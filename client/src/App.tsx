import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CameraScanner from './pages/CameraScanner';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import History from './pages/History';
import Nursery from './pages/Nursery';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-screen text-white">
        <Navbar />
        <div className="pt-24">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<CameraScanner />} />
            <Route path="/history" element={<History />} />
            <Route path="/nursery" element={<Nursery />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
