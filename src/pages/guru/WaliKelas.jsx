import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  LogOut,
  Phone,
  Mail,
  MapPinned,
  Clock as ClockIcon,
  Search,
  Filter,
  Download,
  Upload,
  User,
  MapPin,
  GraduationCap,
  Plus,
  Eye,
  Calendar,
  FileEdit,
  BarChart,
  Brain,
  Wrench,
  Sparkles,
  Heart,
  Scale,
  ChevronDown
} from "lucide-react";

import "./WaliKelas.css";
import { useNavigate, useLocation } from 'react-router-dom';

function WaliKelas() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [rencanaDropdownOpen, setRencanaDropdownOpen] = useState(true);

  // Data siswa
  const dataSiswa = [
    { id: 1, nis: "2024001", nama: "Ahmad Fauzan", kelas: "X-2", rataRata: 89.5, hadir: 90, sakit: 5, izin: 3, alpha: 2, catatan: "Aktif dalam organisasi" },
    { id: 2, nis: "2024002", nama: "Fatimah Azzahra", kelas: "X-2", rataRata: 92.3, hadir: 95, sakit: 3, izin: 2, alpha: 0, catatan: "Peringkat 1 kelas" },
    { id: 3, nis: "2024003", nama: "Muhammad Rizki", kelas: "X-2", rataRata: 85.7, hadir: 88, sakit: 7, izin: 3, alpha: 2, catatan: "Perlu bimbingan Matematika" },
    { id: 4, nis: "2024004", nama: "Khadijah Nur", kelas: "X-2", rataRata: 91.8, hadir: 92, sakit: 4, izin: 4, alpha: 0, catatan: "Aktif di ekstrakurikuler" },
    { id: 5, nis: "2024005", nama: "Abdullah Hasan", kelas: "X-2", rataRata: 84.2, hadir: 85, sakit: 8, izin: 5, alpha: 2, catatan: "Membaik dalam kehadiran" },
    { id: 6, nis: "2024006", nama: "Aisyah Maryam", kelas: "X-2", rataRata: 90.5, hadir: 93, sakit: 4, izin: 2, alpha: 1, catatan: "Rajin mengikuti kajian" },
    { id: 7, nis: "2024007", nama: "Umar Faruq", kelas: "X-2", rataRata: 82.9, hadir: 80, sakit: 10, izin: 6, alpha: 4, catatan: "Perlu perhatian khusus" },
    { id: 8, nis: "2024008", nama: "Zahra Safira", kelas: "X-2", rataRata: 88.6, hadir: 91, sakit: 5, izin: 3, alpha: 1, catatan: "Aktif bertanya di kelas" },
    { id: 9, nis: "2024009", nama: "Yusuf Ibrahim", kelas: "X-2", rataRata: 86.3, hadir: 87, sakit: 6, izin: 4, alpha: 3, catatan: "Membaik dalam akademik" },
  ];

  const filteredData = dataSiswa.filter(siswa =>
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    siswa.nis.includes(searchTerm)
  );

  const totalSiswa = dataSiswa.length;
  const totalHadir = dataSiswa.reduce((acc, curr) => acc + curr.hadir, 0) / totalSiswa;
  const rataKelas = (dataSiswa.reduce((acc, curr) => acc + curr.rataRata, 0) / totalSiswa).toFixed(1);

  const handleLihatDetail = (muridId) => {
    navigate(`/wali-kelas/murid/${muridId}/detail`);
  };

  return (
    <div className="page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <img 
              src="/logo-madinah.png" 
              alt="Madinah Al-Quds" 
              style={{ width: '40px', height: '40px', borderRadius: '8px' }} 
              className="navbar-logo" 
            />
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Guru &gt; Wali Kelas
              </div>
            </div>
          </div>
          <div className="nav-profile">
            <div className="avatar-nav">UA</div>
            <div className="profile-text">
              <strong>Ustadz Ahmad</strong>
              <p>Guru</p>
            </div>
          </div>
        </div>
      </header>

      {/* ================= LAYOUT ================= */}
      <div className="layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">
          <div>
            <ul className="menu">
              <li onClick={() => navigate('/beranda')}>
                <LayoutDashboard size={18}/> Beranda
              </li>

              {/* DROPDOWN RENCANA PENILAIAN */}
              <div className="dropdown-wrapper">
                <div className="dropdown-header" onClick={() => setRencanaDropdownOpen(prev => !prev)}>
                  <FileText size={18} />
                  <span className="dropdown-label">Rencana Penilaian</span>
                  <ChevronDown size={16} className={`dropdown-arrow ${rencanaDropdownOpen ? 'open' : ''}`} />
                </div>
                {rencanaDropdownOpen && (
                  <ul className="dropdown-list">
                    <li className="dropdown-item" onClick={() => navigate('/rencana-nilai-pengetahuan')}>
                      <Brain size={14} /> <span>Rencana Nilai Pengetahuan</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/rencana-penilaian-keterampilan')}>
                      <Wrench size={14} /> <span>Rencana Penilaian Keterampilan</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/observatif-karakter-spiritual')}>
                      <Sparkles size={14} /> <span>Rencana KD/Butir Spiritual</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/observatif-karakter-sosial')}>
                      <Heart size={14} /> <span>Rencana KD/Butir Sosial</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/rencana-bobot-ujian')}>
                      <Scale size={14} /> <span>Rencana Bobot PH PTS & PAS</span>
                    </li>
                  </ul>
                )}
              </div>

              <li onClick={() => navigate('/kelas')}>
                <BookOpen size={18}/> Kelas
              </li>
              <li className="active" onClick={() => navigate('/wali-kelas')}>
                <Users size={18}/> Wali Kelas
              </li>
              <li onClick={() => navigate('/ekstrakurikuler')}>
                <ClipboardList size={18}/> Ekstrakurikuler
              </li>
              <li onClick={() => navigate('/nilai')}>
                <GraduationCap size={18}/> Nilai
              </li>
              <li onClick={() => navigate('/raport')}>
                <FileText size={18}/> Raport
              </li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">
          
          <div className="page-header">
            <div>
              <h1>Wali Kelas X-2</h1>
              <p className="subtitle">Kelas X-2 • Wali Kelas: Ustadz Ahmad Rahman</p>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e6f7f0', color: '#16a085' }}>
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{totalSiswa}</div>
                <div className="stat-label">Total Siswa</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e6f0f7', color: '#3498db' }}>
                <GraduationCap size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{rataKelas}</div>
                <div className="stat-label">Rata-rata Nilai</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fef3c7', color: '#f39c12' }}>
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{totalHadir.toFixed(1)}%</div>
                <div className="stat-label">Rata-rata Kehadiran</div>
              </div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="action-bar">
            <div className="action-buttons">
              <button className="btn-import"><Upload size={16} /> Import Excel</button>
              <button className="btn-export"><Download size={16} /> Export Excel</button>
            </div>
            <div className="search-section">
              <div className="search-box">
                <Search size={16} />
                <input type="text" placeholder="Cari siswa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <button className="btn-filter"><Filter size={16} /> Filter</button>
            </div>
          </div>

          {/* TABLE SISWA */}
          <div className="table-container">
            <table className="siswa-table">
              <thead>
                <tr><th>NIS</th><th>Nama Siswa</th><th>Rata-rata Nilai</th><th>Kehadiran</th><th>Catatan</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                {filteredData.map((siswa) => (
                  <tr key={siswa.id}>
                    <td><span className="badge-nis">{siswa.nis}</span></td>
                    <td><div className="nama-siswa"><div className="avatar-small">{siswa.nama.split(' ').map(w=>w[0]).join('').substring(0,2)}</div><span>{siswa.nama}</span></div></td>
                    <td><span className="nilai-badge">{siswa.rataRata}</span></td>
                    <td><div className="kehadiran-info"><span className="kehadiran-hadir">H:{siswa.hadir}</span><span className="kehadiran-sakit">S:{siswa.sakit}</span><span className="kehadiran-izin">I:{siswa.izin}</span><span className="kehadiran-alpha">A:{siswa.alpha}</span></div></td>
                    <td><span className="catatan-text">{siswa.catatan}</span></td>
                    <td><button className="btn-lihat-detail" onClick={() => handleLihatDetail(siswa.id)}><Eye size={16} /><span>Lihat Detail</span></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-info">Menampilkan 1 - {filteredData.length} dari {dataSiswa.length} siswa</div>

        </main>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section footer-logo">
              <img src="/logo-madinah.png" alt="Logo Madinah" className="footer-logo-img" />
              <h3 className="footer-brand">Madinah El - Quds</h3>
            </div>
            <div className="footer-section">
              <h4>Hubungi Kami</h4>
              <p><MapPinned size={18} /> Jl. Pendidikan No. 123, Kota Santri, Indonesia</p>
              <p><Phone size={18} /><a href="tel:+622112345678">+62 21 1234-5678</a></p>
              <p><Mail size={18} /><a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a></p>
            </div>
            <div className="footer-section">
              <h4>Jam Layanan</h4>
              <p><ClockIcon size={18}/> Senin - Jumat: 07:00 - 16:00</p>
              <p><ClockIcon size={18}/> Sabtu: 07:00 - 14:00</p>
              <p><ClockIcon size={18}/> Minggu: Tutup</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Pondok Pesantren Madinah Al-Quds. Semua Hak Dilindungi.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default WaliKelas;