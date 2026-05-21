import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface ScanHistory {
  image: string;
  result: string;
  createdAt: string;
}

const CameraScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const [histories, setHistories] = useState<ScanHistory[]>([]);
  const [parsedResult, setParsedResult] = useState({
    penyakit: '',
    severity: '',
    solusi: '',
    confidence: '',
  });

  // =========================
  // START CAMERA
  // =========================
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true);
        };
      }
    } catch (error) {
      console.error(error);
      alert('Camera tidak bisa diakses');
    }
  };

  // =========================
  // LOAD HISTORY
  // =========================
  useEffect(() => {
    const stored = localStorage.getItem('scan_histories');

    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistories(JSON.parse(stored));
    }
  }, []);

  // =========================
  // INIT CAMERA
  // =========================
  useEffect(() => {
    startCamera();

    // cleanup camera saat keluar page
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const video = videoRef.current;

      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;

        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // =========================
  // CAPTURE PHOTO
  // =========================
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    // compress image
    const image = canvas.toDataURL('image/jpeg', 0.6);

    setPhoto(image);

    // reset result lama
    setResult('');
  };

  // =========================
  // ANALYZE IMAGE
  // =========================
  const analyzeImage = async () => {
    if (!photo) {
      alert('Capture gambar dulu');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'https://sawitcare-ai-production.up.railway.app/analyze', // 'http://localhost:5000/analyze' switch untuk local testing
        {
          image: photo,
        },
        {
          timeout: 60000,
        },
      );

      const aiResult = response.data.result;
      const penyakit = aiResult.match(/PENYAKIT:\s*(.*)/i)?.[1] || '-';

      const severity = aiResult.match(/SEVERITY:\s*(.*)/i)?.[1] || '-';

      const confidence = aiResult.match(/CONFIDENCE:\s*(.*)/i)?.[1] || '-';

      const solusiMatch = aiResult.match(/SOLUSI:\s*([\s\S]*?)CONFIDENCE:/i);

      const solusi = solusiMatch?.[1] || '-';

      setParsedResult({
        penyakit,
        severity,
        solusi,
        confidence,
      });
      setResult(aiResult);

      const newHistory: ScanHistory = {
        image: photo,
        result: aiResult,
        createdAt: new Date().toISOString(),
      };

      const updatedHistories = [newHistory, ...histories];

      setHistories(updatedHistories);

      localStorage.setItem('scan_histories', JSON.stringify(updatedHistories));
    } catch (error) {
      console.log(error);

      alert('Analisa AI gagal');
    } finally {
      setLoading(false);
    }
  };

  const severityText = parsedResult.severity.toLowerCase();

  const severityColor =
    severityText.includes('berat') || severityText.includes('sangat') || severityText.includes('tinggi')
      ? 'bg-red-500'
      : severityText.includes('sedang') || severityText.includes('menengah') || severityText.includes('medium') || severityText.includes('moderate')
        ? 'bg-yellow-500'
        : 'bg-green-500';

  return (
    <div className="min-h-screen px-4 py-10">
      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4">SawitCare AI 🌱</h1>

        <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto">AI Assistant untuk monitoring kesehatan bibit tanaman sawit menggunakan teknologi computer vision.</p>
      </div>

      {/* CAMERA CARD */}
      <div className="relative w-full max-w-3xl mx-auto bg-zinc-900 rounded-[2rem] p-4 border border-zinc-800 shadow-2xl overflow-hidden">
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <p className="text-zinc-400 animate-pulse">Membuka kamera...</p>
          </div>
        )}

        <video ref={videoRef} autoPlay playsInline className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl" />

        {/* Scanner Border */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-green-400 rounded-tl-2xl" />

          <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-green-400 rounded-tr-2xl" />

          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-green-400 rounded-bl-2xl" />

          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-green-400 rounded-br-2xl" />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="max-w-3xl mx-auto mt-5">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={capturePhoto} className="bg-green-600 hover:bg-green-500 transition-all py-3 rounded-2xl font-semibold">
            Capture
          </button>

          <button onClick={analyzeImage} disabled={loading} className={`bg-blue-600 hover:bg-blue-500 transition-all py-3 rounded-2xl font-semibold disabled:opacity-50 ${loading ? 'animate-pulse' : ''}`}>
            {loading ? 'AI Menganalisa...' : 'Analyze AI'}
          </button>
        </div>
      </div>

      {/* HIDDEN CANVAS */}
      <canvas ref={canvasRef} className="hidden" />

      {/* PHOTO PREVIEW */}
      {photo && (
        <div className="mt-10 mx-auto max-w-3xl">
          <h2 className="text-xl mb-4 font-bold text-center">Hasil Capture</h2>

          <img src={photo} alt="capture" className="rounded-3xl w-full border border-zinc-700" />
        </div>
      )}

      {/* AI RESULT */}
      {result && (
        <div className="mt-8 max-w-3xl mx-auto bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-3xl">
          <h2 className="text-2xl font-black mb-5 text-center">Hasil Analysis AI</h2>
          <p className="text-zinc-500 text-sm mt-2">AI berhasil menganalisa kondisi tanaman</p>
          <div className="space-y-5 text-zinc-300">
            <div>
              <h3 className="text-green-400 font-bold mb-1">🦠 Penyakit</h3>

              <p>{parsedResult.penyakit}</p>
            </div>

            <div>
              <h3 className="text-yellow-400 font-bold mb-2">⚠️ Keparahan</h3>

              <div className={`${severityColor} inline-block px-4 py-2 rounded-full text-black font-bold`}>{parsedResult.severity}</div>
            </div>

            <div>
              <h3 className="text-blue-400 font-bold mb-1">💊 Solusi</h3>

              <p className="whitespace-pre-line">{parsedResult.solusi}</p>
            </div>

            <div>
              <h3 className="text-purple-400 font-bold mb-1">📊 Tingkat Keyakinan AI</h3>

              <p>{parsedResult.confidence}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraScanner;
