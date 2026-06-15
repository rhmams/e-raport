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
  ChevronDown,
  Plus,
  Brain,
  Wrench,
  Heart,
  Smile,
  Sparkles,
  Scale
} from "lucide-react";
import "./Nilai.css";

function Nilai() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('pengetahuan');
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [rencanaDropdownOpen, setRencanaDropdownOpen] = useState(true);

  const dataKelas = [
    { id: 1, kelas: "X-2", mapel: "Matematika", waliKelas: "Ustadz Ahmad Rahman", siswa: 30, progress: 83, terisi: 25, total: 30, icon: "📐" },
    { id: 2, kelas: "X-4", mapel: "Matematika", waliKelas: "Ustadzah Siti Aminah", siswa: 8, progress: 100, terisi: 8, total: 8, icon: "📏" },
    { id: 3, kelas: "XI-2", mapel: "Fisika", waliKelas: "Ustadz Muhammad Hasan", siswa: 6, progress: 67, terisi: 4, total: 6, icon: "⚛️" },
    { id: 4, kelas: "XI-3", mapel: "Kimia", waliKelas: "Ustadzah Khadijah", siswa: 6, progress: 70, terisi: 4.2, total: 6, icon: "🧪" },
    { id: 5, kelas: "XI-6", mapel: "Bahasa Inggris", waliKelas: "Ustadz Abdullah", siswa: 6, progress: 100, terisi: 6, total: 6, icon: "📚" },
    { id: 6, kelas: "XII-2", mapel: "Sejarah", waliKelas: "Ustadz Yusuf", siswa: 5, progress: 100, terisi: 5, total: 5, icon: "🏛️" }
  ];

  const getDataForTab = () => {
    if (activeTab === 'pengetahuan') {
      return dataKelas.map(k => ({
        ...k,
        progress: Math.min(100, Math.floor(k.progress * 0.7 + 10)),
        terisi: Math.floor(k.terisi * 0.7)
      }));
    } else {
      return dataKelas.map(k => ({
        ...k,
        progress: Math.min(100, Math.floor(k.progress * 0.8 + 5)),
        terisi: Math.floor(k.terisi * 0.8)
      }));
    }
  };

  const displayedData = getDataForTab();

  const getStats = () => {
    const totalSiswa = displayedData.reduce((acc, curr) => acc + curr.siswa, 0);
    const totalTerisi = displayedData.reduce((acc, curr) => acc + curr.terisi, 0);
    const persentase = totalSiswa === 0 ? 0 : ((totalTerisi / totalSiswa) * 100).toFixed(1);
    return {
      totalKelas: displayedData.length,
      totalSiswa,
      persentase,
      terisi: totalTerisi.toFixed(0),
      total: totalSiswa
    };
  };
  const stats = getStats();

  const getTabTitle = () => activeTab === 'pengetahuan' ? 'Pengetahuan' : 'Keterampilan';

  const handleInputNilai = (kelasId, jenis) => {
    navigate(`/nilai/input/${kelasId}/${jenis}`);
  };

  return (
    <div className="page">
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <img src="/logo-madinah.png" alt="Madinah Al-Quds" style={{ width: '40px', height: '40px', borderRadius: '8px' }} className="navbar-logo" />
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">Guru <ChevronRight size={12} /> Nilai <ChevronRight size={12} /> {getTabTitle()}</div>
            </div>
          </div>
          <div className="nav-profile">
            <div className="avatar-nav">UA</div>
            <div className="profile-text"><strong>Ustadz Ahmad</strong><p>Guru</p></div>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" style={{ overflow: 'visible' }}>
          <div style={{ overflow: 'visible' }}>
            <ul className="menu" style={{ overflow: 'visible' }}>
              <li className={location.pathname === '/beranda' ? 'active' : ''} onClick={() => navigate('/beranda')}>
                <LayoutDashboard size={18} /> Beranda
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

              <li className={location.pathname.startsWith('/kelas') ? 'active' : ''} onClick={() => navigate('/kelas')}>
                <BookOpen size={18} /> Kelas
              </li>
              <li className={location.pathname === '/wali-kelas' ? 'active' : ''} onClick={() => navigate('/wali-kelas')}>
                <Users size={18} /> Wali Kelas
              </li>
              <li className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} onClick={() => navigate('/ekstrakurikuler')}>
                <ClipboardList size={18} /> Ekstrakurikuler
              </li>

              {/* DROPDOWN NILAI (yang sudah ada) */}
              <li style={{ display: 'block', padding: 0, background: 'transparent', cursor: 'default', position: 'static', overflow: 'visible' }}>
                <div onClick={() => setDropdownOpen(prev => !prev)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer' }}>
                  <GraduationCap size={18} />
                  <span style={{ flex: 1 }}>Nilai</span>
                  <ChevronDown size={16} style={{ transition: 'transform 0.25s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </div>
                {dropdownOpen && (
                  <ul style={{ listStyle: 'none', margin: '2px 0 6px 0', padding: '0 0 0 28px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => { setActiveTab('pengetahuan'); navigate('/nilai'); }}>
                      <Brain size={14} /> <span>Nilai Pengetahuan</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => { setActiveTab('keterampilan'); navigate('/nilai'); }}>
                      <Wrench size={14} /> <span>Nilai Keterampilan</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => navigate('/nilai-spiritual')}>
                      <Heart size={14} /> <span>Nilai Spiritual</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => navigate('/nilai-sosial')}>
                      <Smile size={14} /> <span>Nilai Sosial</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => navigate('/nilai-ujian')}>
                      <FileText size={14} /> <span>Nilai Ujian</span>
                    </li>
                  </ul>
                )}
              </li>

              <li className={location.pathname === '/raport' ? 'active' : ''} onClick={() => navigate('/raport')}>
                <FileText size={18} /> Raport
              </li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}>
            <LogOut size={18} /> Keluar
          </div>
        </aside>

        <main className="main nilai-main">
          <div className="container">
            <div className="nilai-header">
              <div className="nilai-header-top">
                <div className="nilai-header-icon">
                  {activeTab === 'pengetahuan' ? <Brain size={28} /> : <Wrench size={28} />}
                </div>
                <div>
                  <h1>Nilai {getTabTitle()}</h1>
                  <p className="subtitle">
                    {activeTab === 'pengetahuan'
                      ? 'Kelola penilaian pengetahuan (kognitif) untuk semua kelas yang Anda ajar'
                      : 'Kelola penilaian keterampilan (psikomotorik) untuk semua kelas yang Anda ajar'}
                  </p>
                </div>
              </div>

              <div className="nilai-tab-switcher">
                <button className={`tab-switcher-btn ${activeTab === 'pengetahuan' ? 'active' : ''}`} onClick={() => setActiveTab('pengetahuan')}>
                  <Brain size={14} /> Pengetahuan
                </button>
                <button className={`tab-switcher-btn ${activeTab === 'keterampilan' ? 'active' : ''}`} onClick={() => setActiveTab('keterampilan')}>
                  <Wrench size={14} /> Keterampilan
                </button>
              </div>
            </div>

            <div className="stats-container">
              <div className="stats-left">
                <div className="stat-item"><span className="stat-label">Total Kelas:</span><span className="stat-value">{stats.totalKelas}</span></div>
                <div className="stat-item"><span className="stat-label">Total Siswa:</span><span className="stat-value">{stats.totalSiswa}</span></div>
              </div>
              <div className="stats-right">
                <div className="nilai-terisi">
                  <div className="nilai-persentase">{stats.persentase}%</div>
                  <div className="nilai-keterangan"><span>{stats.terisi} dari {stats.total} siswa terisi</span></div>
                </div>
              </div>
            </div>

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
                    <div className="progress-teks">
                      <span>Progress Penilaian {getTabTitle()}</span>
                      <span className="progress-value">{Math.floor(kelas.terisi)}/{kelas.siswa} ({kelas.progress}%)</span>
                    </div>
                    <button className="btn-input-nilai" onClick={() => handleInputNilai(kelas.id, activeTab)}>
                      <Plus size={16} /> Input Nilai {getTabTitle()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

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

export default Nilai;