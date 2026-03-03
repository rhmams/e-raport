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
  ChevronLeft,
  User,
  MapPin,
  Download,
  Upload,
  Search,
  Filter,
  Save
} from "lucide-react";

import "./NilaiPengetahuan.css";
import { useNavigate, useParams } from 'react-router-dom';

function NilaiPengetahuan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const dataSiswa = [
    { no: 1, nis: "2024001", nisn: "0061234567", nama: "Ahmad Fauzan", jk: "Laki-laki", nilai: 85 },
    { no: 2, nis: "2024002", nisn: "0061234568", nama: "Fatimah Azzahra", jk: "Perempuan", nilai: 88 },
    { no: 3, nis: "2024003", nisn: "0061234569", nama: "Muhammad Rizki", jk: "Laki-laki", nilai: 82 },
    { no: 4, nis: "2024004", nisn: "0061234570", nama: "Khadijah Nur", jk: "Perempuan", nilai: 90 },
    { no: 5, nis: "2024005", nisn: "0061234571", nama: "Abdullah Hasan", jk: "Laki-laki", nilai: 78 },
    { no: 6, nis: "2024006", nisn: "0061234572", nama: "Aisyah Maryam", jk: "Perempuan", nilai: 92 },
    { no: 7, nis: "2024007", nisn: "0061234573", nama: "Umar Faruq", jk: "Laki-laki", nilai: 80 },
    { no: 8, nis: "2024008", nisn: "0061234574", nama: "Zahira Safira", jk: "Perempuan", nilai: 86 },
    { no: 9, nis: "2024009", nisn: "0061234575", nama: "Yusuf Ibrahim", jk: "Laki-laki", nilai: 84 },
    { no: 10, nis: "2024010", nisn: "0061234576", nama: "Miriam Hasna", jk: "Perempuan", nilai: 87 },
  ];

  const filteredSiswa = dataSiswa.filter(siswa =>
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    siswa.nis.includes(searchTerm)
  );

  const totalSiswa = 30;
  const rataRata = (dataSiswa.reduce((acc, curr) => acc + curr.nilai, 0) / dataSiswa.length).toFixed(1);
  const luas = 275;

  return (
    <div className="page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <div className="logo-circle">MQ</div>
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Guru &gt; Kelas &gt; {id} &gt; Nilai Pengetahuan
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
              <li><LayoutDashboard size={18}/> Beranda</li>
              <li className="active"><BookOpen size={18}/> Kelas</li>
              <li><Users size={18}/> Wali Kelas</li>
              <li><ClipboardList size={18}/> Ekstrakurikuler</li>
              <li><BookOpen size={18}/> Materi Pelajaran</li>
              <li><FileText size={18}/> Raport</li>
            </ul>
          </div>
          <div className="logout">
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">
          
          {/* ================= BACK BUTTON ================= */}
          <div className="back-button" onClick={() => navigate(`/kelas/${id}`)}>
            <ChevronLeft size={20} />
            <span>Kembali ke Detail Kelas</span>
          </div>

          {/* ================= HEADER KELAS ================= */}
          <div className="nilai-header">
            <h1>
              Kelas X-2 - Matematika
            </h1>
            <div className="header-info">
              <span><User size={16} /> Wali Kelas: Ustadz Ahmad Rahman</span>
              <span className="separator">•</span>
              <span><MapPin size={16} /> Ruang R-102</span>
            </div>
          </div>

          {/* ================= JUDUL HALAMAN ================= */}
          <div className="page-title">
            <h2>Nilai Pengetahuan</h2>
          </div>

          {/* ================= ACTION BAR ================= */}
          <div className="action-bar">
            <div className="action-buttons">
              <button className="btn-save">
                <Save size={16} /> Simpan Nilai
              </button>
              <button className="btn-import">
                <Upload size={16} /> Import Excel
              </button>
              <button className="btn-export">
                <Download size={16} /> Export Excel
              </button>
            </div>
            <div className="search-section">
              <div className="search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Cari siswa..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn-filter">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          {/* ================= TABLE NILAI ================= */}
          <div className="table-container">
            <table className="nilai-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>NIS</th>
                  <th>NISN</th>
                  <th>Nama Lengkap</th>
                  <th>Jenis Kelamin</th>
                  <th>Nilai</th>
                </tr>
              </thead>
              <tbody>
                {filteredSiswa.map((siswa) => (
                  <tr key={siswa.nis}>
                    <td>{siswa.no}</td>
                    <td>{siswa.nis}</td>
                    <td>{siswa.nisn}</td>
                    <td>{siswa.nama}</td>
                    <td>{siswa.jk}</td>
                    <td>
                      <input 
                        type="number" 
                        className="nilai-input" 
                        defaultValue={siswa.nilai}
                        min="0"
                        max="100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION INFO ================= */}
          <div className="pagination-info">
            Menampilkan 1 - 10 dari {totalSiswa} siswa
          </div>

          {/* ================= STATS CARDS ================= */}
          <div className="stats-cards">
            <div className="stat-card-small">
              <div className="stat-label">Total Siswa</div>
              <div className="stat-value-large">{totalSiswa}</div>
            </div>
            <div className="stat-card-small">
              <div className="stat-label">Rata-rata Nilai</div>
              <div className="stat-value-large">{rataRata}</div>
            </div>
            <div className="stat-card-small">
              <div className="stat-label">Luas (275)</div>
              <div className="stat-value-large">{luas}</div>
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

export default NilaiPengetahuan;