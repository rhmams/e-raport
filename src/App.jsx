import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beranda from './pages/guru/Beranda';
import Kelas from './pages/guru/Kelas';
import DetailKelas from './pages/guru/DetailKelas';
import Absensi from './pages/guru/Absensi';
import WaliKelas from './pages/guru/WaliKelas';
import Ekstrakurikuler from './pages/guru/Ekstrakurikuler';
import DetailSiswa from './pages/guru/DetailSiswa';
import DetailEkskul from './pages/guru/DetailEkskul';
import Raport from './pages/guru/Raport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/kelas" element={<Kelas />} />
        <Route path="/kelas/:id" element={<DetailKelas />} />
        <Route path="/kelas/:id/absensi" element={<Absensi />} />
        <Route path="/wali-kelas" element={<WaliKelas />} /> 
        <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
        <Route path="/wali-kelas/siswa/:id/detail" element={<DetailSiswa />} />
        <Route path="/ekstrakurikuler/:id" element={<DetailEkskul />} />
        <Route path="/raport" element={<Raport />} />
      </Routes>
    </Router>
  );
}

export default App;