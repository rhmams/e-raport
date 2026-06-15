// NilaiUjian.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, FileText, LogOut,
  Phone, Mail, MapPinned, Clock as ClockIcon, GraduationCap,
  ChevronRight, ChevronDown, Plus, Brain, Wrench, Heart, Smile
} from "lucide-react";
import "./NilaiUjian.css";

function NilaiUjian() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('uh');
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const isNilaiPath = location.pathname === '/nilai' || location.pathname.startsWith('/nilai-');

  const dataKelas = [
    { id: 1, kelas: "X-2", mapel: "Matematika", waliKelas: "Ustadz Ahmad Rahman", siswa: 30, progress: 83, terisi: 25, total: 30, icon: "📐" },
    { id: 2, kelas: "X-4", mapel: "Matematika", waliKelas: "Ustadzah Siti Aminah", siswa: 8, progress: 100, terisi: 8, total: 8, icon: "📏" },
    { id: 3, kelas: "XI-2", mapel: "Fisika", waliKelas: "Ustadz Muhammad Hasan", siswa: 6, progress: 67, terisi: 4, total: 6, icon: "⚛️" },
    { id: 4, kelas: "XI-3", mapel: "Kimia", waliKelas: "Ustadzah Khadijah", siswa: 6, progress: 70, terisi: 4.2, total: 6, icon: "🧪" },
    { id: 5, kelas: "XI-6", mapel: "Bahasa Inggris", waliKelas: "Ustadz Abdullah", siswa: 6, progress: 100, terisi: 6, total: 6, icon: "📚" },
    { id: 6, kelas: "XII-2", mapel: "Sejarah", waliKelas: "Ustadz Yusuf", siswa: 5, progress: 100, terisi: 5, total: 5, icon: "🏛️" }
  ];

  const getDataForTab = () => {
    switch (activeTab) {
      case 'uh':
        return dataKelas.map(k => ({ ...k, progress: k.progress === 100 ? 87 : k.progress - 5, terisi: k.progress === 100 ? 26 : k.terisi - 1 }));
      case 'uts':
        return dataKelas.map(k => ({ ...k, progress: k.progress === 100 ? 73 : k.progress - 10, terisi: k.progress === 100 ? 22 : k.terisi - 2 }));
      case 'uas':
        return dataKelas.map(k => ({ ...k }));
      default:
        return dataKelas;
    }
  };

  const displayedData = getDataForTab();

  const getStats = () => {
    const totalSiswa = displayedData.reduce((acc, curr) => acc + curr.siswa, 0);
    const totalTerisi = displayedData.reduce((acc, curr) => acc + curr.terisi, 0);
    const persentase = totalSiswa === 0 ? 0 : ((totalTerisi / totalSiswa) * 100).toFixed(1);
    return { totalKelas: displayedData.length, totalSiswa, persentase, terisi: totalTerisi.toFixed(0), total: totalSiswa };
  };
  const stats = getStats();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'uh': return 'Ulangan Harian';
      case 'uts': return 'Ujian Tengah Semester (UTS)';
      case 'uas': return 'Ujian Akhir Semester (UAS)';
      default: return 'Penilaian Ujian';
    }
  };

  const goToBeranda = () => navigate('/beranda');
  const goToKelas = () => navigate('/kelas');
  const goToWaliKelas = () => navigate('/wali-kelas');
  const goToEkstrakurikuler = () => navigate('/ekstrakurikuler');
  const goToNilaiUjian = () => navigate('/nilai-ujian');
  const goToNilaiSpiritual = () => navigate('/nilai-spiritual');
  const goToNilaiSosial = () => navigate('/nilai-social');
  const goToRaport = () => navigate('/raport');

  const handleInputNilai = (kelasId, jenis) => navigate(`/nilai/input/${kelasId}/${jenis}`);

  const handleTabFromSidebar = (tab) => {
    navigate('/nilai', { state: { tab } });
  };

  const submenuStyle = {
    listStyle: 'none',
    margin: '2px 0 6px 0',
    padding: '0 0 0 28px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'block',
    position: 'static',
  };

  const submenuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '13px',
    borderRadius: '8px',
    marginBottom: '2px',
    color: isActive ? '#2ecc71' : '#aab8c5',
    fontWeight: isActive ? '600' : '400',
    background: isActive ? 'rgba(46, 204, 113, 0.12)' : 'transparent',
    transition: 'background 0.2s, color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
    position: 'static',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flexShrink: 0,
  });

  return (
    <div className="page">
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <img src="/logo-madinah.png" alt="Madinah Al-Quds" style={{ width: '40px', height: '40px', borderRadius: '8px' }} className="navbar-logo" />
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">Guru <ChevronRight size={12} /> Nilai Ujian</div>
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
              <li className={location.pathname === '/beranda' ? 'active' : ''} onClick={goToBeranda}><LayoutDashboard size={18} /> Beranda</li>
              <li className={location.pathname.startsWith('/kelas') ? 'active' : ''} onClick={goToKelas}><BookOpen size={18} /> Kelas</li>
              <li className={location.pathname === '/wali-kelas' ? 'active' : ''} onClick={goToWaliKelas}><Users size={18} /> Wali Kelas</li>
              <li className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} onClick={goToEkstrakurikuler}><ClipboardList size={18} /> Ekstrakurikuler</li>

              <li style={{ display: 'block', padding: 0, background: 'transparent', cursor: 'default', position: 'static', overflow: 'visible' }}>
                <div
                  onClick={() => setDropdownOpen(prev => !prev)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
                    cursor: 'pointer', borderRadius: '12px', fontSize: '14px', fontWeight: '500',
                    color: isNilaiPath ? '#2ecc71' : 'inherit',
                    background: isNilaiPath ? 'rgba(46, 204, 113, 0.15)' : 'transparent',
                    userSelect: 'none', width: '100%', boxSizing: 'border-box',
                  }}
                >
                  <GraduationCap size={18} />
                  <span style={{ flex: 1 }}>Nilai</span>
                  <ChevronDown size={16} style={{ transition: 'transform 0.25s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.7, flexShrink: 0 }} />
                </div>

                {dropdownOpen && (
                  <ul style={submenuStyle}>
                    <li
                      style={submenuItemStyle(false)}
                      onClick={() => handleTabFromSidebar('pengetahuan')}
                    >
                      <Brain size={14} />
                      <span>Nilai Pengetahuan</span>
                    </li>
                    <li
                      style={submenuItemStyle(false)}
                      onClick={() => handleTabFromSidebar('keterampilan')}
                    >
                      <Wrench size={14} />
                      <span>Nilai Keterampilan</span>
                    </li>
                    <li
                      style={submenuItemStyle(location.pathname === '/nilai-spiritual')}
                      onClick={goToNilaiSpiritual}
                    >
                      <Heart size={14} />
                      <span>Nilai Spiritual</span>
                    </li>
                    <li
                      style={submenuItemStyle(location.pathname === '/nilai-social')}
                      onClick={goToNilaiSosial}
                    >
                      <Smile size={14} />
                      <span>Nilai Sosial</span>
                    </li>
                    <li
                      style={submenuItemStyle(location.pathname === '/nilai-ujian')}
                      onClick={goToNilaiUjian}
                    >
                      <FileText size={14} />
                      <span>Nilai Ujian</span>
                    </li>
                  </ul>
                )}
              </li>

              <li className={location.pathname === '/raport' ? 'active' : ''} onClick={goToRaport}><FileText size={18} /> Raport</li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}><LogOut size={18} /> Keluar</div>
        </aside>

        <main className="main nilai-ujian-main">
          <div className="container">
            <div className="nilai-header">
              <h1>Penilaian Ujian</h1>
              <p className="subtitle">Kelola nilai Ulangan Harian, UTS, dan UAS untuk semua kelas yang Anda ajar</p>
            </div>
            <div className="nilai-tabs">
              <button className={`tab-btn ${activeTab === 'uh' ? 'active' : ''}`} onClick={() => setActiveTab('uh')}>Ulangan Harian</button>
              <button className={`tab-btn ${activeTab === 'uts' ? 'active' : ''}`} onClick={() => setActiveTab('uts')}>Ujian Tengah Semester (UTS)</button>
              <button className={`tab-btn ${activeTab === 'uas' ? 'active' : ''}`} onClick={() => setActiveTab('uas')}>Ujian Akhir Semester (UAS)</button>
            </div>
            <div className="stats-container">
              <div className="stats-left">
                <div className="stat-item"><span className="stat-label">Total Kelas:</span><span className="stat-value">{stats.totalKelas}</span></div>
                <div className="stat-item"><span className="stat-label">Total Siswa:</span><span className="stat-value">{stats.totalSiswa}</span></div>
              </div>
              <div className="stats-right">
                <div className="nilai-terisi">
                  <div className="nilai-persentase">{stats.persentase}%</div>
                  <div className="nilai-keterangan"><span>{stats.terisi} dari {stats.total} siswa</span></div>
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
                    <div className="progress-section">
                      <div className="progress-label">
                        <span>Progress Penilaian {getTabTitle()}</span>
                        <span className="progress-value">{kelas.terisi}/{kelas.siswa} ({kelas.progress}%)</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${kelas.progress}%` }}></div>
                      </div>
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
            <div className="footer-section footer-logo"><img src="/logo-madinah.png" alt="Logo Madinah" className="footer-logo-img" /><h3 className="footer-brand">Madinah El - Quds</h3></div>
            <div className="footer-section"><h4>Hubungi Kami</h4><p><MapPinned size={18} /> Jl. Pendidikan No. 123, Kota Santri, Indonesia</p><p><Phone size={18} /> <a href="tel:+622112345678">+62 21 1234-5678</a></p><p><Mail size={18} /> <a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a></p></div>
            <div className="footer-section"><h4>Jam Layanan</h4><p><ClockIcon size={18} /> Senin - Jumat: 07:00 - 16:00</p><p><ClockIcon size={18} /> Sabtu: 07:00 - 14:00</p><p><ClockIcon size={18} /> Minggu: Tutup</p></div>
          </div>
          <div className="footer-bottom"><p>© 2026 Pondok Pesantren Madinah Al-Quds. Semua Hak Dilindungi.</p></div>
        </div>
      </footer>
    </div>
  );
}

export default NilaiUjian;