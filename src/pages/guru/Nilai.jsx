import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  GraduationCap,
  ChevronRight,
  Plus,
  Eye
} from "lucide-react";
import "./Nilai.css";

function Nilai() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('uh'); // 'uh', 'uts', 'uas'

  // Data kelas yang diajar
  const dataKelas = [
    {
      id: 1,
      kelas: "X-2",
      mapel: "Matematika",
      waliKelas: "Ustadz Ahmad Rahman",
      siswa: 30,
      progress: 83,
      terisi: 25,
      total: 30,
      icon: "📐"
    },
    {
      id: 2,
      kelas: "X-4",
      mapel: "Matematika",
      waliKelas: "Ustadzah Siti Aminah",
      siswa: 8,
      progress: 100,
      terisi: 8,
      total: 8,
      icon: "📏"
    },
    {
      id: 3,
      kelas: "XI-2",
      mapel: "Fisika",
      waliKelas: "Ustadz Muhammad Hasan",
      siswa: 6,
      progress: 67,
      terisi: 4,
      total: 6,
      icon: "⚛️"
    },
    {
      id: 4,
      kelas: "XI-3",
      mapel: "Kimia",
      waliKelas: "Ustadzah Khadijah",
      siswa: 6,
      progress: 70,
      terisi: 4.2,
      total: 6,
      icon: "🧪"
    },
    {
      id: 5,
      kelas: "XI-6",
      mapel: "Bahasa Inggris",
      waliKelas: "Ustadz Abdullah",
      siswa: 6,
      progress: 100,
      terisi: 6,
      total: 6,
      icon: "📚"
    },
    {
      id: 6,
      kelas: "XII-2",
      mapel: "Sejarah",
      waliKelas: "Ustadz Yusuf",
      siswa: 5,
      progress: 100,
      terisi: 5,
      total: 5,
      icon: "🏛️"
    }
  ];

  // Data untuk tab yang berbeda (bisa disesuaikan)
  const getDataForTab = () => {
    switch(activeTab) {
      case 'uh':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: kelas.progress === 100 ? 87 : kelas.progress - 5, // Contoh variasi
          terisi: kelas.progress === 100 ? 26 : kelas.terisi - 1
        }));
      case 'uts':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: kelas.progress === 100 ? 73 : kelas.progress - 10,
          terisi: kelas.progress === 100 ? 22 : kelas.terisi - 2
        }));
      case 'uas':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: kelas.progress,
          terisi: kelas.terisi
        }));
      default:
        return dataKelas;
    }
  };

  const displayedData = getDataForTab();

  // Statistik berdasarkan tab
  const getStats = () => {
    const totalSiswa = displayedData.reduce((acc, curr) => acc + curr.siswa, 0);
    const totalTerisi = displayedData.reduce((acc, curr) => acc + curr.terisi, 0);
    const persentase = ((totalTerisi / totalSiswa) * 100).toFixed(1);
    
    return {
      totalKelas: displayedData.length,
      totalSiswa,
      persentase,
      terisi: totalTerisi.toFixed(0),
      total: totalSiswa
    };
  };

  const stats = getStats();

  // Navigasi
  const goToBeranda = () => navigate('/');
  const goToKelas = () => navigate('/kelas');
  const goToWaliKelas = () => navigate('/wali-kelas');
  const goToEkstrakurikuler = () => navigate('/ekstrakurikuler');
  const goToNilai = () => navigate('/nilai');
  const goToRaport = () => navigate('/raport');

  const handleInputNilai = (kelasId, jenis) => {
    navigate(`/nilai/input/${kelasId}/${jenis}`);
  };

  const getTabTitle = () => {
    switch(activeTab) {
      case 'uh': return 'Ulangan Harian';
      case 'uts': return 'Ujian Tengah Semester (UTS)';
      case 'uas': return 'Ujian Akhir Semester (UAS)';
      default: return 'Penilaian';
    }
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
                Guru <ChevronRight size={12} /> Nilai
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
              <li 
                className={location.pathname === '/' || location.pathname === '/beranda' ? 'active' : ''} 
                onClick={goToBeranda}
              >
                <LayoutDashboard size={18}/> Beranda
              </li>
              <li 
                className={location.pathname.startsWith('/kelas') && !location.pathname.includes('/kelas/') ? 'active' : ''} 
                onClick={goToKelas}
              >
                <BookOpen size={18}/> Kelas
              </li>
              <li 
                className={location.pathname === '/wali-kelas' ? 'active' : ''} 
                onClick={goToWaliKelas}
              >
                <Users size={18}/> Wali Kelas
              </li>
              <li 
                className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} 
                onClick={goToEkstrakurikuler}
              >
                <ClipboardList size={18}/> Ekstrakurikuler
              </li>
              <li 
                className={location.pathname === '/nilai' ? 'active' : ''} 
                onClick={goToNilai}
              >
                <GraduationCap size={18}/> Nilai
              </li>
              <li 
                className={location.pathname === '/raport' ? 'active' : ''} 
                onClick={goToRaport}
              >
                <FileText size={18}/> Raport 
              </li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main nilai-main">
          <div className="container">

            {/* Header */}
            <div className="nilai-header">
              <h1>Penilaian</h1>
              <p className="subtitle">Kelola dan input nilai siswa untuk semua kelas yang Anda ajar</p>
            </div>

            {/* Tabs */}
            <div className="nilai-tabs">
              <button 
                className={`tab-btn ${activeTab === 'uh' ? 'active' : ''}`}
                onClick={() => setActiveTab('uh')}
              >
                Ulangan Harian
              </button>
              <button 
                className={`tab-btn ${activeTab === 'uts' ? 'active' : ''}`}
                onClick={() => setActiveTab('uts')}
              >
                Ujian Tengah Semester (UTS)
              </button>
              <button 
                className={`tab-btn ${activeTab === 'uas' ? 'active' : ''}`}
                onClick={() => setActiveTab('uas')}
              >
                Ujian Akhir Semester (UAS)
              </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
              <div className="stats-left">
                <div className="stat-item">
                  <span className="stat-label">Total Kelas:</span>
                  <span className="stat-value">{stats.totalKelas}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Siswa:</span>
                  <span className="stat-value">{stats.totalSiswa}</span>
                </div>
              </div>
              <div className="stats-right">
                <div className="nilai-terisi">
                  <div className="nilai-persentase">{stats.persentase}%</div>
                  <div className="nilai-keterangan">
                    <span>{stats.terisi} dari {stats.total} siswa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kelas Grid */}
            <div className="kelas-nilai-grid">
              {displayedData.map((kelas) => (
                <div key={kelas.id} className="kelas-nilai-card">
                  <div className="kelas-header">
                    <div className="kelas-icon">{kelas.icon}</div>
                    <div className="kelas-title">
                      <h3>Kelas {kelas.kelas} - {kelas.mapel}</h3>
                      <span className="kelas-badge">{kelas.kelas}</span>
                    </div>
                  </div>

                  <div className="kelas-content">
                    <div className="info-proses">
                      <div className="info-icon">📋</div>
                      <div className="info-text">
                        <p>{kelas.siswa} Siswa</p>
                        <p className="wali">{kelas.waliKelas}</p>
                      </div>
                    </div>

                    <div className="progress-section">
                      <div className="progress-label">
                        <span>Progress Penilaian {activeTab.toUpperCase()}</span>
                        <span className="progress-value">{kelas.terisi}/{kelas.siswa} ({kelas.progress}%)</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${kelas.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button 
                      className="btn-input-nilai"
                      onClick={() => handleInputNilai(kelas.id, activeTab)}
                    >
                      <Plus size={16} />
                      Input Nilai {activeTab.toUpperCase()}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Hubungi Kami</h4>
              <p>
                <MapPinned size={18} />
                Jl. Pendidikan No. 123, Kota Santri, Indonesia
              </p>
              <p>
                <Phone size={18} />
                <a href="tel:+622112345678">+62 21 1234-5678</a>
              </p>
              <p>
                <Mail size={18} />
                <a href="mailto:info@madinaq.com.id">info@madinaq.com.id</a>
              </p>
            </div>
            <div className="footer-section">
              <h4>Jam Layanan</h4>
              <p>
                <ClockIcon size={18} />
                Senin - Jumat: 07:00 - 16:00
              </p>
              <p>
                <ClockIcon size={18} />
                Sabtu: 07:00 - 14:00
              </p>
              <p>
                <ClockIcon size={18} />
                Minggu: Tutup
              </p>
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

export default Nilai;