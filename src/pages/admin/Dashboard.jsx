// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import ProfilMadrasah from './ProfilMadrasah';
import PengaturanUmum from './PengaturanUmum';
import PengaturanKelas from './PengaturanKelas';
import DetailKelas from './DetailKelas';
import DaftarGuru from './DaftarGuru';
import DetailGuru from './DetailGuru';
import JadwalMengajar from './JadwalMengajar';
import DaftarSiswa from './DaftarSiswa';
import DetailSiswa from './DetailSiswa';
import AbsensiSiswa from './AbsensiSiswa';
import InputNilai from './InputNilai';
import CetakRaport from './CetakRaport';
import DetailRaport from './DetailRaport';
import Kokurikuler from './Kokurikuler';
import DetailKokurikuler from './DetailKokurikuler';
import Ekstrakurikuler from './Ekstrakurikuler';
import DetailEkstrakurikuler from './DetailEkstrakurikuler';
import ProfilAdmin from './ProfilAdmin';

import { 
  FaUserGraduate, 
  FaBookOpen, 
  FaTrophy,
  FaUserPlus,
  FaEdit,
  FaCog,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaCalendarAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaUserCircle,
  FaPlus
} from 'react-icons/fa';
import { 
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  School,
  GraduationCap,
  Activity,
  Users,
  Clock as ClockIcon
} from 'lucide-react';

// Modal komponen sederhana (inline)
const AddModal = ({ isOpen, onClose, title, fields, onSubmit }) => {
  if (!isOpen) return null;
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
    onClose();
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {fields.map((field) => (
          <div key={field.name} className="modal-field">
            <label>{field.label}</label>
            <input type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleChange} />
          </div>
        ))}
        <div className="modal-buttons">
          <button onClick={onClose}>Batal</button>
          <button onClick={handleSubmit}>Simpan</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [selectedRaport, setSelectedRaport] = useState(null);
  const [selectedKokurikuler, setSelectedKokurikuler] = useState(null);
  const [selectedEkstrakurikuler, setSelectedEkstrakurikuler] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // State untuk modal
  const [showJadwalModal, setShowJadwalModal] = useState(false);
  const [showPengumumanModal, setShowPengumumanModal] = useState(false);

  // Data dinamis dengan state
  const [pengumuman, setPengumuman] = useState([
    { judul: "Libur Hari Raya Idul Fitri", isi: "Sekolah libur mulai tanggal 28 Maret – 5 April 2026 untuk perayaan Idul Fitri 1447 H.", tanggal: "20 Feb 2026" },
    { judul: "Pengumpulan Nilai Semester Genap", isi: "Batas akhir pengumpulan nilai semester genap adalah tanggal 25 Februari 2026.", tanggal: "13 Feb 2026" },
    { judul: "Rapat Koordinasi Guru", isi: "Akan diadakan rapat koordinasi guru pada hari Senin, 17 Februari 2026 pukul 08.00 WIB.", tanggal: "12 Feb 2026" },
    { judul: "Pendaftaran Siswa Baru", isi: "Pendaftaran siswa baru tahun ajaran 2026/2027 dibuka mulai 1 Maret 2026.", tanggal: "10 Feb 2026" }
  ]);

  const [jadwalMinggu, setJadwalMinggu] = useState([
    { hari: "Upacara Bendera", waktu: "07:00 – 08:00", tempat: "Lapangan Sekolah" },
    { hari: "Kajian Ustadz Ahmad", waktu: "12:30 – 14:30", tempat: "Aula Utama" },
    { hari: "Rapat Wali Kelas", waktu: "09:00 – 10:00", tempat: "Ruang Guru" },
    { hari: "Ekstrakurikuler Tahfidz", waktu: "16:00 – 18:30", tempat: "Masjid Sekolah" },
    { hari: "Jum'at Bersih", waktu: "07:30 – 08:30", tempat: "Seluruh Area Sekolah" }
  ]);

  // Handler tambah jadwal
  const addJadwal = (data) => {
    if (data.hari && data.waktu && data.tempat) {
      setJadwalMinggu([...jadwalMinggu, { hari: data.hari, waktu: data.waktu, tempat: data.tempat }]);
    } else {
      alert("Semua field harus diisi!");
    }
  };

  // Handler tambah pengumuman
  const addPengumuman = (data) => {
    if (data.judul && data.isi && data.tanggal) {
      setPengumuman([...pengumuman, { judul: data.judul, isi: data.isi, tanggal: data.tanggal }]);
    } else {
      alert("Semua field harus diisi!");
    }
  };

  const renderContent = () => {
    // ... (semua renderContent sebelumnya hingga dashboard default)
    if (activePage === 'profil_madrasah') return <ProfilMadrasah />;
    if (activePage === 'pengaturan_umum') return <PengaturanUmum />;
    if (activePage === 'pengaturan_kelas') {
      return selectedKelas
        ? <DetailKelas kelas={selectedKelas} onBack={() => setSelectedKelas(null)} />
        : <PengaturanKelas onDetailKelas={(kelas) => setSelectedKelas(kelas)} />;
    }
    if (activePage === 'daftar_guru') {
      return <DaftarGuru onNavigate={(page, data) => {
        if (page === 'detail_guru') {
          setSelectedGuru(data);
          setActivePage('detail_guru');
        }
      }} />;
    }
    if (activePage === 'detail_guru' && selectedGuru) {
      return <DetailGuru guru={selectedGuru} onBack={() => {
        setActivePage('daftar_guru');
        setSelectedGuru(null);
      }} />;
    }
    if (activePage === 'jadwal_mengajar') return <JadwalMengajar />;
    if (activePage === 'daftar_siswa') {
      return <DaftarSiswa onNavigate={(page, data) => {
        if (page === 'detail_siswa') {
          setSelectedSiswa(data);
          setActivePage('detail_siswa');
        }
      }} />;
    }
    if (activePage === 'detail_siswa' && selectedSiswa) {
      return <DetailSiswa siswa={selectedSiswa} onBack={() => {
        setActivePage('daftar_siswa');
        setSelectedSiswa(null);
      }} />;
    }
    if (activePage === 'absensi') return <AbsensiSiswa />;
    if (activePage === 'input_nilai') return <InputNilai />;
    if (activePage === 'cetak_raport') {
      return <CetakRaport onNavigate={(page, data) => {
        if (page === 'detail_raport') {
          setSelectedRaport(data);
          setActivePage('detail_raport');
        }
      }} />;
    }
    if (activePage === 'detail_raport' && selectedRaport) {
      return <DetailRaport rapor={selectedRaport} onBack={() => {
        setActivePage('cetak_raport');
        setSelectedRaport(null);
      }} />;
    }
    if (activePage === 'kokurikuler') {
      return <Kokurikuler onNavigate={(page, data) => {
        if (page === 'detail_kokurikuler') {
          setSelectedKokurikuler(data);
          setActivePage('detail_kokurikuler');
        }
      }} />;
    }
    if (activePage === 'detail_kokurikuler' && selectedKokurikuler) {
      return <DetailKokurikuler 
        kokurikuler={selectedKokurikuler} 
        onBack={() => {
          setActivePage('kokurikuler');
          setSelectedKokurikuler(null);
        }}
        onUpdate={(updatedData) => {
          console.log('Update data kokurikuler:', updatedData);
        }}
      />;
    }
    if (activePage === 'ekstrakurikuler') {
      return <Ekstrakurikuler onNavigate={(page, data) => {
        if (page === 'detail_ekstrakurikuler') {
          setSelectedEkstrakurikuler(data);
          setActivePage('detail_ekstrakurikuler');
        }
      }} />;
    }
    if (activePage === 'detail_ekstrakurikuler' && selectedEkstrakurikuler) {
      return <DetailEkstrakurikuler 
        ekstrakurikuler={selectedEkstrakurikuler} 
        onBack={() => {
          setActivePage('ekstrakurikuler');
          setSelectedEkstrakurikuler(null);
        }}
        onUpdate={(updatedData) => {
          console.log('Update data ekstrakurikuler:', updatedData);
        }}
      />;
    }
    if (activePage === 'profil_admin') return <ProfilAdmin />;
    
    // Dashboard default
    return (
      <>
        <div className="welcome-section">
          <h2>Selamat Datang, Admin!</h2>
          <p>Kelola sistem E-Raport dengan mudah. Pantau data siswa, guru, dan aktivitas madrasah dalam satu platform terpercaya.</p>
        </div>

        <div className="cards-section">
          <div className="cards-grid">
            <div className="card card-primary">
              <div className="card-icon"><FaChalkboardTeacher /></div>
              <div className="card-info"><h3>Total Guru</h3><p className="card-number">48</p></div>
            </div>
            <div className="card card-success">
              <div className="card-icon"><FaUserGraduate /></div>
              <div className="card-info"><h3>Total Siswa</h3><p className="card-number">802</p></div>
            </div>
            <div className="card card-warning">
              <div className="card-icon"><FaBookOpen /></div>
              <div className="card-info"><h3>Ekstrakurikuler</h3><p className="card-number">12</p></div>
            </div>
            <div className="card card-info">
              <div className="card-icon"><FaBookOpen /></div>
              <div className="card-info"><h3>Mata Pelajaran</h3><p className="card-number">18</p></div>
            </div>
            <div className="card card-purple">
              <div className="card-icon"><FaTrophy /></div>
              <div className="card-info"><h3>Prestasi Bulan Ini</h3><p className="card-number">24</p></div>
            </div>
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat-box">
            <div className="stat-header"><FaCalendarAlt className="stat-icon" /><span>Hari Ini</span></div>
            <p className="stat-date">13 Februari 2026</p>
            <p className="stat-day">Jumat, Semester Genap</p>
          </div>
          <div className="stat-box">
            <div className="stat-header"><FaBell className="stat-icon" /><span>Notifikasi</span></div>
            <p className="stat-number">8</p>
            <p className="stat-label">Pesan Baru</p>
          </div>
          <div className="stat-box">
            <div className="stat-header"><FaUsers className="stat-icon" /><span>Kehadiran Hari Ini</span></div>
            <p className="stat-number">88.2%</p>
            <p className="stat-label">602 dari 612 siswa hadir</p>
          </div>
        </div>

        <div className="statistik-section">
          <h3>Statistik Data</h3>
          <p className="statistik-subtitle">Perkembangan siswa dan guru 6 bulan terakhir</p>
          <div className="chart-wrapper">
            <div className="bar-chart">
              <div className="y-axis">
                <span>800</span><span>600</span><span>400</span><span>200</span><span>0</span>
              </div>
              <div className="chart-bars-container">
                {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'].map((month, index) => (
                  <div key={month} className="bar-group">
                    <div className="bars">
                      <div className="bar siswa-bar" style={{height: `${[65, 70, 75, 80, 85, 90][index]}%`}}></div>
                      <div className="bar guru-bar" style={{height: `${[30, 35, 40, 45, 50, 55][index]}%`}}></div>
                    </div>
                    <span className="month-label">{month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-color siswa"></span> Total Siswa</span>
              <span className="legend-item"><span className="legend-color guru"></span> Total Guru</span>
            </div>
          </div>
        </div>

        <div className="aksi-cepat-section">
          <h3>Aksi Cepat</h3>
          <div className="aksi-grid">
            <div className="aksi-card" onClick={() => setActivePage('daftar_siswa')}>
              <FaUserPlus className="aksi-icon" />
              <span className="aksi-title">Tambah Siswa</span>
              <span className="aksi-desc">Daftarkan siswa baru</span>
            </div>
            <div className="aksi-card" onClick={() => setActivePage('input_nilai')}>
              <FaEdit className="aksi-icon" />
              <span className="aksi-title">Input Nilai</span>
              <span className="aksi-desc">Masukkan nilai rapor</span>
            </div>
            <div className="aksi-card" onClick={() => setActivePage('pengaturan_umum')}>
              <FaCog className="aksi-icon" />
              <span className="aksi-title">Pengaturan</span>
              <span className="aksi-desc">Kelola sistem</span>
            </div>
            <div className="aksi-card" onClick={() => setActivePage('cetak_raport')}>
              <FaDownload className="aksi-icon" />
              <span className="aksi-title">Raport</span>
              <span className="aksi-desc">Lihat Raport</span>
            </div>
          </div>
        </div>

        {/* Info Grid baru: Jadwal Minggu Ini (kiri) dan Pengumuman Terbaru (kanan) */}
        <div className="info-grid">
          {/* Kolom Kiri: Jadwal Minggu Ini */}
          <div className="jadwal-section">
            <div className="section-header">
              <h3>Jadwal Minggu Ini</h3>
              <button className="btn-add" onClick={() => setShowJadwalModal(true)}>
                <FaPlus /> Tambah
              </button>
            </div>
            <div className="jadwal-list">
              {jadwalMinggu.map((item, index) => (
                <div key={index} className="jadwal-item">
                  <div className="jadwal-acara">{item.hari}</div>
                  <div className="jadwal-detail">
                    <span className="jadwal-waktu">{item.waktu}</span>
                    <span className="jadwal-tempat">{item.tempat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Pengumuman Terbaru */}
          <div className="pengumuman-section">
            <div className="section-header">
              <h3>Pengumuman Terbaru</h3>
              <button className="btn-add" onClick={() => setShowPengumumanModal(true)}>
                <FaPlus /> Tambah
              </button>
            </div>
            {pengumuman.map((item, index) => (
              <div key={index} className="pengumuman-item">
                <h4>{item.judul}</h4>
                <p>{item.isi}</p>
                <span className="pengumuman-tanggal">{item.tanggal}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  // ... (fungsi toggleMenu, handleMenuClick, getBreadcrumb sama seperti sebelumnya)

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleMenuClick = (menu, subpage = null) => {
    if (subpage) {
      setActivePage(subpage);
      setSelectedKelas(null);
      setSelectedGuru(null);
      setSelectedSiswa(null);
      setSelectedRaport(null);
      setSelectedKokurikuler(null);
      setSelectedEkstrakurikuler(null);
      setOpenMenu(null);
    } else if (menu === 'dashboard') {
      setActivePage('dashboard');
      setSelectedKelas(null);
      setSelectedGuru(null);
      setSelectedSiswa(null);
      setSelectedRaport(null);
      setSelectedKokurikuler(null);
      setSelectedEkstrakurikuler(null);
      setOpenMenu(null);
    } else if (menu === 'profil_madrasah') {
      setActivePage('profil_madrasah');
      setSelectedKelas(null);
      setSelectedGuru(null);
      setSelectedSiswa(null);
      setSelectedRaport(null);
      setSelectedKokurikuler(null);
      setSelectedEkstrakurikuler(null);
      setOpenMenu(null);
    } else if (menu === 'pengaturan_umum') {
      setActivePage('pengaturan_umum');
      setSelectedKelas(null);
      setSelectedGuru(null);
      setSelectedSiswa(null);
      setSelectedRaport(null);
      setSelectedKokurikuler(null);
      setSelectedEkstrakurikuler(null);
      setOpenMenu(null);
    } else if (menu === 'profil_admin') {
      setActivePage('profil_admin');
      setSelectedKelas(null);
      setSelectedGuru(null);
      setSelectedSiswa(null);
      setSelectedRaport(null);
      setSelectedKokurikuler(null);
      setSelectedEkstrakurikuler(null);
      setOpenMenu(null);
      setShowProfileDropdown(false);
    } else {
      toggleMenu(menu);
    }
  };

  const getBreadcrumb = () => {
    if (activePage === 'dashboard') return 'Dashboard';
    if (activePage === 'profil_madrasah') return 'Profil Madrasah';
    if (activePage === 'pengaturan_umum') return 'Pengaturan Umum';
    if (activePage === 'pengaturan_kelas') return selectedKelas ? `Kelas > ${selectedKelas.nama}` : 'Pengaturan Kelas';
    if (activePage === 'daftar_guru') return 'Daftar Guru';
    if (activePage === 'detail_guru' && selectedGuru) return `Detail Guru > ${selectedGuru.name}`;
    if (activePage === 'jadwal_mengajar') return 'Jadwal Mengajar';
    if (activePage === 'daftar_siswa') return 'Daftar Siswa';
    if (activePage === 'detail_siswa' && selectedSiswa) return `Detail Siswa > ${selectedSiswa.nama}`;
    if (activePage === 'absensi') return 'Absensi';
    if (activePage === 'input_nilai') return 'Input Nilai';
    if (activePage === 'cetak_raport') return 'Cetak Raport';
    if (activePage === 'detail_raport' && selectedRaport) return `Detail Raport > ${selectedRaport.nama}`;
    if (activePage === 'kokurikuler') return 'Kokurikuler';
    if (activePage === 'detail_kokurikuler' && selectedKokurikuler) return `Detail Kokurikuler > ${selectedKokurikuler.namaKelas}`;
    if (activePage === 'ekstrakurikuler') return 'Ekstrakurikuler';
    if (activePage === 'detail_ekstrakurikuler' && selectedEkstrakurikuler) return `Detail Ekstrakurikuler > ${selectedEkstrakurikuler.nama}`;
    if (activePage === 'profil_admin') return 'Profil Admin';
    return activePage.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <div className="dashboard-container">
      <header className="top-header">
        <div className="header-left">
          <div className="logo-wrapper">
            <div className="logo-box"><img src="/logo-madinah.png" alt="Madinah Al-Quds" /></div>
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb-nav">Admin &gt; {getBreadcrumb()}</div>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="nav-profile" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <div className="avatar-nav">AD</div>
            <div className="profile-text">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
            <FaChevronDown size={12} className={`dropdown-icon ${showProfileDropdown ? 'rotate' : ''}`} />
          </div>
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">AD</div>
                <div className="dropdown-info">
                  <strong>Admin</strong>
                  <span>Administrator</span>
                  <span className="dropdown-email">admin@madinah.edu.id</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => handleMenuClick('profil_admin')}>
                <FaUserCircle size={16} /> Profil Saya
              </button>
              <button className="dropdown-item" onClick={() => handleMenuClick('pengaturan_umum')}>
                <Settings size={16} /> Pengaturan
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={() => {/* logout logic */}}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul className="menu">
              <li className={activePage === 'dashboard' ? 'active' : ''}>
                <div className="menu-item" onClick={() => handleMenuClick('dashboard')}>
                  <LayoutDashboard size={18} /><span>Dashboard</span>
                </div>
              </li>
              <li className={activePage === 'profil_madrasah' ? 'active' : ''}>
                <div className="menu-item" onClick={() => handleMenuClick('profil_madrasah')}>
                  <School size={18} /><span>Profil Madrasah</span>
                </div>
              </li>
              <li className={openMenu === 'pengaturan' ? 'active' : ''}>
                <div className="menu-item" onClick={() => toggleMenu('pengaturan')}>
                  <Settings size={18} /><span>Pengaturan</span>
                  {openMenu === 'pengaturan' ? <FaChevronUp size={12} style={{marginLeft: 'auto'}} /> : <FaChevronDown size={12} style={{marginLeft: 'auto'}} />}
                </div>
                <ul className={`submenu ${openMenu === 'pengaturan' ? 'show' : ''}`}>
                  <li onClick={() => handleMenuClick('pengaturan', 'pengaturan_umum')}><span className="submenu-dot">•</span><span>Umum</span></li>
                  <li onClick={() => handleMenuClick('pengaturan', 'pengaturan_kelas')}><span className="submenu-dot">•</span><span>Kelas</span></li>
                </ul>
              </li>
              <li className={openMenu === 'guru' ? 'active' : ''}>
                <div className="menu-item" onClick={() => toggleMenu('guru')}>
                  <Users size={18} /><span>Guru</span>
                  {openMenu === 'guru' ? <FaChevronUp size={12} style={{marginLeft: 'auto'}} /> : <FaChevronDown size={12} style={{marginLeft: 'auto'}} />}
                </div>
                <ul className={`submenu ${openMenu === 'guru' ? 'show' : ''}`}>
                  <li onClick={() => handleMenuClick('guru', 'daftar_guru')}><span className="submenu-dot">•</span><span>Daftar Guru</span></li>
                  <li onClick={() => handleMenuClick('guru', 'jadwal_mengajar')}><span className="submenu-dot">•</span><span>Jadwal Mengajar</span></li>
                </ul>
              </li>
              <li className={openMenu === 'siswa' ? 'active' : ''}>
                <div className="menu-item" onClick={() => toggleMenu('siswa')}>
                  <GraduationCap size={18} /><span>Siswa</span>
                  {openMenu === 'siswa' ? <FaChevronUp size={12} style={{marginLeft: 'auto'}} /> : <FaChevronDown size={12} style={{marginLeft: 'auto'}} />}
                </div>
                <ul className={`submenu ${openMenu === 'siswa' ? 'show' : ''}`}>
                  <li onClick={() => handleMenuClick('siswa', 'daftar_siswa')}><span className="submenu-dot">•</span><span>Daftar Siswa</span></li>
                  <li onClick={() => handleMenuClick('siswa', 'absensi')}><span className="submenu-dot">•</span><span>Absensi</span></li>
                </ul>
              </li>
              <li className={openMenu === 'rapor' ? 'active' : ''}>
                <div className="menu-item" onClick={() => toggleMenu('rapor')}>
                  <FileText size={18} /><span>Sistem Rapor</span>
                  {openMenu === 'rapor' ? <FaChevronUp size={12} style={{marginLeft: 'auto'}} /> : <FaChevronDown size={12} style={{marginLeft: 'auto'}} />}
                </div>
                <ul className={`submenu ${openMenu === 'rapor' ? 'show' : ''}`}>
                  <li onClick={() => handleMenuClick('rapor', 'input_nilai')}><span className="submenu-dot">•</span><span>Input Nilai</span></li>
                  <li onClick={() => handleMenuClick('rapor', 'cetak_raport')}><span className="submenu-dot">•</span><span>Cetak Raport</span></li>
                </ul>
              </li>
              <li className={openMenu === 'kegiatan' ? 'active' : ''}>
                <div className="menu-item" onClick={() => toggleMenu('kegiatan')}>
                  <Activity size={18} /><span>Kegiatan</span>
                  {openMenu === 'kegiatan' ? <FaChevronUp size={12} style={{marginLeft: 'auto'}} /> : <FaChevronDown size={12} style={{marginLeft: 'auto'}} />}
                </div>
                <ul className={`submenu ${openMenu === 'kegiatan' ? 'show' : ''}`}>
                  <li onClick={() => handleMenuClick('kegiatan', 'kokurikuler')}><span className="submenu-dot">•</span><span>Kokurikuler</span></li>
                  <li onClick={() => handleMenuClick('kegiatan', 'ekstrakurikuler')}><span className="submenu-dot">•</span><span>Ekstrakurikuler</span></li>
                </ul>
              </li>
              <li className="logout">
                <div className="menu-item" onClick={() => {/* logout */}}>
                  <LogOut size={18} /><span>Logout</span>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-brand">
              <div className="footer-logo"><img src="/logo-madinah.png" alt="Madinah Al-Quds" /></div>
              <div><h3>Madinah Al-Quds</h3></div>
            </div>
          </div>
          <div className="footer-center">
            <h4>Jam Layanan</h4>
            <div className="hours-info">
              <p><ClockIcon className="footer-icon" size={16} /><span>Senin – Jumat</span> 07:00 – 16:00</p>
              <p><ClockIcon className="footer-icon" size={16} /><span>Sabtu</span> 07:00 – 14:00</p>
              <p><ClockIcon className="footer-icon" size={16} /><span>Minggu</span> Tutup</p>
            </div>
          </div>
          <div className="footer-right">
            <h4>Hubungi Kami</h4>
            <div className="contact-info">
              <p><FaPhone className="footer-icon" /><a href="tel:+622112345678">+62 21 1234-5678</a></p>
              <p><FaEnvelope className="footer-icon" /><a href="mailto:info@madinah.edu.id">info@madinah.edu.id</a></p>
              <p><ClockIcon className="footer-icon" size={14} /> Fast Response: 24 Jam</p>
            </div>
            <div className="social-links">
              <div className="social-icon"><FaFacebook /></div>
              <div className="social-icon"><FaInstagram /></div>
              <div className="social-icon"><FaYoutube /></div>
              <div className="social-icon"><FaWhatsapp /></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Pondok Pesantren Madinah Al-Quds. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Modal tambah jadwal */}
      <AddModal
        isOpen={showJadwalModal}
        onClose={() => setShowJadwalModal(false)}
        title="Tambah Jadwal Minggu Ini"
        fields={[
          { name: "hari", label: "Hari/Acara", type: "text" },
          { name: "waktu", label: "Waktu (contoh: 07:00 - 08:00)", type: "text" },
          { name: "tempat", label: "Tempat", type: "text" }
        ]}
        onSubmit={addJadwal}
      />

      {/* Modal tambah pengumuman */}
      <AddModal
        isOpen={showPengumumanModal}
        onClose={() => setShowPengumumanModal(false)}
        title="Tambah Pengumuman"
        fields={[
          { name: "judul", label: "Judul Pengumuman", type: "text" },
          { name: "isi", label: "Isi Pengumuman", type: "text" },
          { name: "tanggal", label: "Tanggal (contoh: 20 Feb 2026)", type: "text" }
        ]}
        onSubmit={addPengumuman}
      />
    </div>
  );
};

export default Dashboard;