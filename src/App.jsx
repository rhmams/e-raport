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
import InputNilai from './pages/guru/InputNilai';
import DetailKokurikuler from './pages/guru/DetailKokurikuler';
import Login from './components/Login';
import CreateAcc from './components/CreateAcc';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import ProfilGuru from './pages/guru/ProfilGuru';
import TujuanPembelajaran from './pages/guru/TujuanPembelajaran';

function App() {
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
    { path: "/nilai/input/:kelasId/:jenis", element: <InputNilai /> },
    { path: "/kokurikuler/:id", element: <DetailKokurikuler /> },
    { path: "/admin", element: <Dashboard /> },
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/profil", element: <ProfilGuru /> },
    { path: "/tujuan-pembelajaran/:kelasId", element: <TujuanPembelajaran /> }, 
  ];

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAcc />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
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