import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  LogOut,
  ArrowLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPinned,
  Clock as ClockIcon,
  Plus,
  Download,
  Upload
} from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import "./Kehadiran.css";
import IsiKehadiran from "./IsiKehadiran"; 

function Kehadiran() {
  const navigate = useNavigate();
  const { kelasId } = useParams();
  const [showModal, setShowModal] = useState(false);

  // Data kelas berdasarkan ID
  const kelasData = {
    'x-2': {
      name: 'Kelas X-2',
      mapel: 'Matematika',
      waliKelas: 'Ustadz Ahmad Rahman',
      ruangan: 'R-102'
    },
    'x-4': {
      name: 'Kelas X-4',
      mapel: 'Bahasa Indonesia',
      waliKelas: 'Ustadzah Siti Aminah',
      ruangan: 'R-104'
    },
    'xi-2': {
      name: 'Kelas XI-2',
      mapel: 'Fisika',
      waliKelas: 'Ustadz Muhammad Hasan',
      ruangan: 'R-202'
    },
    'xi-3': {
      name: 'Kelas XI-3',
      mapel: 'Kimia',
      waliKelas: 'Ustadzah Khadijah',
      ruangan: 'R-203'
    },
    'xi-6': {
      name: 'Kelas XI-6',
      mapel: 'Bahasa Inggris',
      waliKelas: 'Ustadz Abdullah',
      ruangan: 'R-206'
    },
    'xii-1': {
      name: 'Kelas XII-1',
      mapel: 'Biologi',
      waliKelas: 'Ustadzah Aisyah',
      ruangan: 'R-301'
    },
    'xii-2': {
      name: 'Kelas XII-2',
      mapel: 'Sejarah',
      waliKelas: 'Ustadz Yusuf',
      ruangan: 'R-302'
    }
  };

  const kelas = kelasData[kelasId] || {
    name: 'Kelas X-2',
    mapel: 'Matematika',
    waliKelas: 'Ustadz Ahmad Rahman',
    ruangan: 'R-102'
  };

  // Navigasi ke halaman Beranda
  const goToBeranda = () => {
    navigate('/');
  };

  // Navigasi ke halaman Kelas
  const goToKelas = () => {
    navigate('/kelas');
  };

  // Navigasi ke halaman Detail Kelas
  const goToDetailKelas = () => {
    navigate(`/kelas/${kelasId}`);
  };

  // Handler untuk modal
  const handleTambahKehadiran = () => {
    setShowModal(true); // Buka modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Tutup modal
  };

  const handleSubmitKehadiran = (data) => {
    console.log("Data kehadiran:", data);
    // Di sini nanti logic untuk menyimpan data ke database
    alert("Data kehadiran berhasil disimpan!");
  };

  // Navigasi ke halaman lain
  const goToWaliKelas = () => {
    navigate('/wali-kelas');
  };

  const goToEkstrakurikuler = () => {
    navigate('/ekstrakurikuler');
  };

  const goToMateriPelajaran = () => {
    navigate('/materi');
  };

  const goToRaport = () => {
    navigate('/raport');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleImportExcel = () => {
    alert('Fitur import Excel akan segera tersedia');
  };

  const handleExportExcel = () => {
    alert('Fitur export Excel akan segera tersedia');
  };

  return (
    <div className="page">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="nav-left">
            <div className="logo-circle">MQ</div>
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Guru <ChevronRight size={12} /> 
                <span onClick={goToKelas} style={{ cursor: 'pointer' }}>Kelas</span> 
                <ChevronRight size={12} /> 
                <span onClick={goToDetailKelas} style={{ cursor: 'pointer' }}>{kelas.name}</span>
                <ChevronRight size={12} /> Kehadiran
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
              <li onClick={goToBeranda}><LayoutDashboard size={18}/> Beranda</li>
              <li className="active" onClick={goToKelas}><BookOpen size={18}/> Kelas</li>
              <li onClick={goToWaliKelas}><Users size={18}/> Wali Kelas</li>
              <li onClick={goToEkstrakurikuler}><ClipboardList size={18}/> Ekstrakurikuler</li>
              <li onClick={goToMateriPelajaran}><FileText size={18}/> Materi Pelajaran</li>
              <li onClick={goToRaport}><BookOpen size={18}/> Raport</li>
            </ul>
          </div>
          <div className="logout" onClick={handleLogout}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main kehadiran-main">
          <div className="container">

            {/* Back Button */}
            <button className="back-button" onClick={goToDetailKelas}>
              <ArrowLeft size={18} />
              Kembali ke Detail Kelas
            </button>

            {/* Header Kehadiran */}
            <div className="kehadiran-header">
              <h1>Kehadiran {kelas.name}</h1>
              <h2>- {kelas.mapel}</h2>
              <p className="header-subtitle">
                Wali Kelas: {kelas.waliKelas} • Ruang {kelas.ruangan}
              </p>
            </div>

            {/* Action Buttons - Import & Export Excel */}
            <div className="action-buttons">
              <button className="btn-excel btn-import" onClick={handleImportExcel}>
                <Upload size={18} />
                Import Excel
              </button>
              <button className="btn-excel btn-export" onClick={handleExportExcel}>
                <Download size={18} />
                Export Excel
              </button>
            </div>

            {/* Garis Pemisah */}
            <hr className="divider" />

            {/* Empty State - Belum Ada Data Kehadiran */}
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>Belum Ada Data Kehadiran</h3>
              <p>Klik tombol "Tambah Kehadiran Baru" untuk mulai mencatat kehadiran siswa</p>
              <button className="btn-tambah" onClick={handleTambahKehadiran}>
                <Plus size={18} />
                Tambah Kehadiran Baru
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* ================= MODAL ISI KEHADIRAN ================= */}
      <IsiKehadiran 
        isOpen={showModal}
        onClose={handleCloseModal}
        kelasData={kelas}
        onSubmit={handleSubmitKehadiran}
      />

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
                <a href="tel:+622112345678">(021) 1234-5678</a>
              </p>
              <p>
                <Mail size={18} />
                <a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a>
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

export default Kehadiran;