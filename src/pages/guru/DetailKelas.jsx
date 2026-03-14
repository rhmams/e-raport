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
  Search,
  Filter,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import "./DetailKelas.css";

function DetailKelas() {
  const navigate = useNavigate();
  const { kelasId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Data kelas berdasarkan ID
  const kelasData = {
    'x-2': {
      name: 'Kelas X-2',
      mapel: 'Matematika',
      waliKelas: 'Ustadz Ahmad Rahman',
      ruangan: 'R-102',
      totalSiswa: 30
    },
    'x-4': {
      name: 'Kelas X-4',
      mapel: 'Bahasa Indonesia',
      waliKelas: 'Ustadzah Siti Aminah',
      ruangan: 'R-104',
      totalSiswa: 30
    },
    'xi-2': {
      name: 'Kelas XI-2',
      mapel: 'Fisika',
      waliKelas: 'Ustadz Muhammad Hasan',
      ruangan: 'R-202',
      totalSiswa: 28
    },
    'xi-3': {
      name: 'Kelas XI-3',
      mapel: 'Kimia',
      waliKelas: 'Ustadzah Khadijah',
      ruangan: 'R-203',
      totalSiswa: 29
    },
    'xi-6': {
      name: 'Kelas XI-6',
      mapel: 'Bahasa Inggris',
      waliKelas: 'Ustadz Abdullah',
      ruangan: 'R-206',
      totalSiswa: 27
    },
    'xii-1': {
      name: 'Kelas XII-1',
      mapel: 'Biologi',
      waliKelas: 'Ustadzah Aisyah',
      ruangan: 'R-301',
      totalSiswa: 26
    },
    'xii-2': {
      name: 'Kelas XII-2',
      mapel: 'Sejarah',
      waliKelas: 'Ustadz Yusuf',
      ruangan: 'R-302',
      totalSiswa: 25
    }
  };

  const kelas = kelasData[kelasId] || {
    name: 'Kelas X-2',
    mapel: 'Matematika',
    waliKelas: 'Ustadz Ahmad Rahman',
    ruangan: 'R-102',
    totalSiswa: 30
  };

  // Data siswa sesuai gambar
  const allSiswa = [
    { no: 1, nis: '2024001', nsn: '0051234567', nama: 'Ahmad Fauzzan', jenisKelamin: 'Laki-laki' },
    { no: 2, nis: '2024002', nsn: '0051234568', nama: 'Faisnah Azzahra', jenisKelamin: 'Perempuan' },
    { no: 3, nis: '2024003', nsn: '0051234569', nama: 'Muhammad Rizki', jenisKelamin: 'Laki-laki' },
    { no: 4, nis: '2024004', nsn: '0051234570', nama: 'Khadijah Nur', jenisKelamin: 'Perempuan' },
    { no: 5, nis: '2024005', nsn: '0051234571', nama: 'Abduliah Hasan', jenisKelamin: 'Laki-laki' },
    { no: 6, nis: '2024006', nsn: '0051234572', nama: 'Aisyah Maryam', jenisKelamin: 'Perempuan' },
    { no: 7, nis: '2024007', nsn: '0051234573', nama: 'Umar Faruq', jenisKelamin: 'Laki-laki' },
    { no: 8, nis: '2024008', nsn: '0051234574', nama: 'Zahra Sofia', jenisKelamin: 'Perempuan' },
    { no: 9, nis: '2024009', nsn: '0051234575', nama: 'Yusuf Ibrahim', jenisKelamin: 'Laki-laki' },
    { no: 10, nis: '2024010', nsn: '0051234576', nama: 'Marian Hania', jenisKelamin: 'Perempuan' },
    { no: 11, nis: '2024011', nsn: '0051234577', nama: 'Hafiz Abdurrahman', jenisKelamin: 'Laki-laki' },
    { no: 12, nis: '2024012', nsn: '0051234578', nama: 'Sababia Putri', jenisKelamin: 'Perempuan' },
    { no: 13, nis: '2024013', nsn: '0051234579', nama: 'Farhan Muslima', jenisKelamin: 'Laki-laki' },
    { no: 14, nis: '2024014', nsn: '0051234580', nama: 'Nurain Zahra', jenisKelamin: 'Perempuan' },
    { no: 15, nis: '2024015', nsn: '0051234581', nama: 'Rizal Ahmed', jenisKelamin: 'Laki-laki' },
    { no: 16, nis: '2024016', nsn: '0051234582', nama: 'Azzahra Kamila', jenisKelamin: 'Perempuan' },
    { no: 17, nis: '2024017', nsn: '0051234583', nama: 'Ibrahim Malik', jenisKelamin: 'Laki-laki' },
    { no: 18, nis: '2024018', nsn: '0051234584', nama: 'Hanifah Qorita', jenisKelamin: 'Perempuan' },
    { no: 19, nis: '2024019', nsn: '0051234585', nama: 'Amir Hamdani', jenisKelamin: 'Laki-laki' },
    { no: 20, nis: '2024020', nsn: '0051234586', nama: 'Laila Rahmah', jenisKelamin: 'Perempuan' },
    { no: 21, nis: '2024021', nsn: '0051234587', nama: 'Muhammad Alif', jenisKelamin: 'Laki-laki' },
    { no: 22, nis: '2024022', nsn: '0051234588', nama: 'Siti Aisyah', jenisKelamin: 'Perempuan' },
    { no: 23, nis: '2024023', nsn: '0051234589', nama: 'Ahmad Rizki', jenisKelamin: 'Laki-laki' },
    { no: 24, nis: '2024024', nsn: '0051234590', nama: 'Nadia Putri', jenisKelamin: 'Perempuan' },
    { no: 25, nis: '2024025', nsn: '0051234591', nama: 'Fajar Siddiq', jenisKelamin: 'Laki-laki' },
    { no: 26, nis: '2024026', nsn: '0051234592', nama: 'Dina Amalia', jenisKelamin: 'Perempuan' },
    { no: 27, nis: '2024027', nsn: '0051234593', nama: 'Rafi Ahmad', jenisKelamin: 'Laki-laki' },
    { no: 28, nis: '2024028', nsn: '0051234594', nama: 'Maya Sari', jenisKelamin: 'Perempuan' },
    { no: 29, nis: '2024029', nsn: '0051234595', nama: 'Hasan Basri', jenisKelamin: 'Laki-laki' },
    { no: 30, nis: '2024030', nsn: '0051234596', nama: 'Fitriani', jenisKelamin: 'Perempuan' }
  ];

  // Pagination
  const totalPages = Math.ceil(kelas.totalSiswa / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSiswa = allSiswa.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Navigasi ke halaman Beranda
  const goToBeranda = () => {
    navigate('/');
  };

  // Navigasi ke halaman Kelas
  const goToKelas = () => {
    navigate('/kelas');
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
                <ChevronRight size={12} /> {kelas.name}
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
        <main className="main detail-main">
          <div className="container">

            {/* Back Button */}
            <button className="back-button" onClick={goToKelas}>
              <ArrowLeft size={18} />
              Kembali
            </button>

            {/* Header Kelas - Posisi di atas */}
            <div className="detail-header">
              <h1>{kelas.name} - {kelas.mapel}</h1>
              <p className="header-subtitle">
                Wali Kelas: {kelas.waliKelas} • Ruang {kelas.ruangan}
              </p>
            </div>

            {/* Kelola Data Siswa Card */}
            <div className="kelola-card">
              <div className="kelola-content">
                <div className="kelola-text">
                  <h3>Kelola Data Siswa</h3>
                  <p>Lihat data kelola data siswa kelas {kelas.name}</p>
                </div>
                <button className="btn-kelola" onClick={() => navigate(`/kehadiran/${kelasId}`)}>
                  Isi Kehadiran
                  </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="table-toolbar">
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Cari siswa..." />
              </div>
              <button className="btn-filter">
                <Filter size={18} />
                Filter
              </button>
            </div>

            {/* Tabel Siswa */}
            <div className="table-container">
              <table className="siswa-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NIS</th>
                    <th>NSN</th>
                    <th>Nama Lengkap</th>
                    <th>Jenis Kelamin</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSiswa.map((siswa) => (
                    <tr key={siswa.no}>
                      <td>{siswa.no}</td>
                      <td>{siswa.nis}</td>
                      <td>{siswa.nsn}</td>
                      <td>{siswa.nama}</td>
                      <td>
                        <span className={`gender-badge ${siswa.jenisKelamin === 'Laki-laki' ? 'gender-laki' : 'gender-perempuan'}`}>
                          {siswa.jenisKelamin}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Info */}
            <div className="pagination-info">
              <p>
                Memeriksa ke {startIndex + 1} - {Math.min(endIndex, kelas.totalSiswa)} dari {kelas.totalSiswa} siswa
              </p>
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft size={16} />
              </button>
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight size={16} />
              </button>
            </div>

            {/* Page Indicator */}
            <div className="page-indicator">
              <p>Halaman {currentPage} dari {totalPages}</p>
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
                Jl. Pendidikan No. 122, Kota Santri, Indonesia
              </p>
              <p>
                <Phone size={18} />
                <a href="tel:+622112345678">(021) 1234-5678</a>
              </p>
              <p>
                <Mail size={18} />
                <a href="mailto:info@idhuan.com.id">info@idhuan.com.id</a>
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
            <p>© 2025 Pondok Pesantren Madinah Al-Quds. Semua Hak Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DetailKelas;