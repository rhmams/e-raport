import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Beranda from './pages/guru/Beranda';
import Kelas from './pages/guru/Kelas';
import DetailKelas from './pages/guru/DetailKelas';
import WaliKelas from './pages/guru/WaliKelas';
import Ekstrakurikuler from './pages/guru/Ekstrakurikuler';
import DetailSiswa from './pages/guru/DetailSiswa';
import DetailEkskul from './pages/guru/DetailEkskul';
import Raport from './pages/guru/Raport';
import DetailRaport from './pages/guru/DetailRaport';
import Kehadiran from './pages/guru/Kehadiran';
import DetailMuridWakel from './pages/guru/DetailMuridWakel';
import Nilai from './pages/guru/Nilai';
import DetailKokurikuler from './pages/guru/DetailKokurikuler';
import Login from './components/Login';
import CreateAcc from './components/CreateAcc';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Daftar halaman yang perlu dilindungi
  const protectedRoutes = [
    { path: "/beranda", element: <Beranda /> },
    { path: "/kelas", element: <Kelas /> },
    { path: "/kelas/:id", element: <DetailKelas /> },
    { path: "/kehadiran/:kelasId", element: <Kehadiran /> },
    { path: "/wali-kelas", element: <WaliKelas /> },
    { path: "/ekstrakurikuler", element: <Ekstrakurikuler /> },
    { path: "/wali-kelas/siswa/:id/detail", element: <DetailSiswa /> },
    { path: "/ekstrakurikuler/:id", element: <DetailEkskul /> },
    { path: "/raport", element: <Raport /> },
    { path: "/raport/:id", element: <DetailRaport /> },
    { path: "/wali-kelas/murid/:id/detail", element: <DetailMuridWakel /> },
    { path: "/nilai", element: <Nilai /> },
    { path: "/kokurikuler/:id", element: <DetailKokurikuler /> }
  ];

  return (
    <Router>
      <Routes>
        {/* Halaman publik */}
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAcc />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Halaman protected - loop array */}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute>
                {route.element}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;