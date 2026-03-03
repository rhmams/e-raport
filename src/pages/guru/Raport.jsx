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
  Eye,
  Edit,
  Printer,
  Award,
  Calendar
} from "lucide-react";

import "./Raport.css";
import { useNavigate, useLocation } from 'react-router-dom';

function Raport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const dataRaport = [
    {
      id: 1,
      inisial: "AZ",
      nama: "Ahmad Zaki",
      nis: "2024001",
      kelas: "X",
      semester: "Ganjil - 2025/2026",
      status: "Selesai",
      tanggalTerbit: "20 Des 2025",
      warna: "#e6f7f0"
    },
    {
      id: 2,
      inisial: "FA",
      nama: "Fatimah Azzahra",
      nis: "2024002",
      kelas: "X",
      semester: "Ganjil - 2025/2026",
      status: "Selesai",
      tanggalTerbit: "20 Des 2025",
      warna: "#e6f0f7"
    },
    {
      id: 3,
      inisial: "MR",
      nama: "Muhammad Rizki",
      nis: "2024003",
      kelas: "X",
      semester: "Ganjil - 2025/2026",
      status: "Draft",
      tanggalTerbit: "-",
      warna: "#fef3c7"
    },
    {
      id: 4,
      inisial: "AS",
      nama: "Aisha Salsabila",
      nis: "2024004",
      kelas: "X",
      semester: "Ganjil - 2025/2026",
      status: "Selesai",
      tanggalTerbit: "20 Des 2025",
      warna: "#fee2e2"
    },
    {
      id: 5,
      inisial: "UF",
      nama: "Umar Faruq",
      nis: "2024005",
      kelas: "XI",
      semester: "Ganjil - 2025/2026",
      status: "Selesai",
      tanggalTerbit: "20 Des 2025",
      warna: "#e6f7f0"
    }
  ];

  const filteredData = dataRaport.filter(raport =>
    raport.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    raport.nis.includes(searchTerm) ||
    raport.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRaport = dataRaport.length;
  const selesai = dataRaport.filter(r => r.status === "Selesai").length;
  const draft = dataRaport.filter(r => r.status === "Draft").length;

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
                Guru &gt; Raport
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
                onClick={() => navigate('/beranda')}
              >
                <LayoutDashboard size={18}/> Beranda
              </li>
              <li 
                className={location.pathname.startsWith('/kelas') && !location.pathname.includes('/kelas/') ? 'active' : ''} 
                onClick={() => navigate('/kelas')}
              >
                <BookOpen size={18}/> Kelas
              </li>
              <li 
                className={location.pathname === '/wali-kelas' ? 'active' : ''} 
                onClick={() => navigate('/wali-kelas')}
              >
                <Users size={18}/> Wali Kelas
              </li>
              <li 
                className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} 
                onClick={() => navigate('/ekstrakurikuler')}
              >
                <ClipboardList size={18}/> Ekstrakurikuler
              </li>
              <li 
                className={location.pathname === '/materi-pelajaran' ? 'active' : ''} 
                onClick={() => navigate('/materi-pelajaran')}
              >
                <BookOpen size={18}/> Materi Pelajaran
              </li>
              <li 
                className={location.pathname === '/raport' ? 'active' : ''} 
                onClick={() => navigate('/raport')}
              >
                <FileText size={18}/> Raport 
              </li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/logout')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">
          
          {/* ================= HEADER ================= */}
          <div className="page-header">
            <div>
              <h1>Raport</h1>
              <p className="subtitle">Kelola dan cetak raport siswa untuk setiap semester</p>
            </div>
          </div>

          {/* ================= STATS CARDS ================= */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e6f7f0', color: '#16a085' }}>
                <FileText size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{totalRaport}</div>
                <div className="stat-label">Total Raport</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e6f0f7', color: '#3498db' }}>
                <Award size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{selesai}</div>
                <div className="stat-label">Sudah Selesai</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fef3c7', color: '#f39c12' }}>
                <ClockIcon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{draft}</div>
                <div className="stat-label">Draft</div>
              </div>
            </div>
          </div>

          {/* ================= ACTION BAR ================= */}
          <div className="action-bar">
            <div className="action-buttons">
              <button className="btn-import">
                <Upload size={16} /> Import Excel
              </button>
              <button className="btn-export">
                <Download size={16} /> Export Excel
              </button>
              <button className="btn-cetak">
                <Printer size={16} /> Cetak Raport
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

          {/* ================= TABLE RAPORT ================= */}
          <div className="table-container">
            <table className="raport-table">
              <thead>
                <tr>
                  <th>Nama Siswa</th>
                  <th>NIS</th>
                  <th>Kelas</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Tanggal Terbit</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((raport) => (
                  <tr key={raport.id}>
                    <td>
                      <div className="nama-siswa">
                        <div className="avatar-small" style={{ background: raport.warna, color: '#1e293b' }}>
                          {raport.inisial}
                        </div>
                        <span>{raport.nama}</span>
                      </div>
                    </td>
                    <td>{raport.nis}</td>
                    <td>
                      <span className="badge-kelas">{raport.kelas}</span>
                    </td>
                    <td>{raport.semester}</td>
                    <td>
                      <span className={`badge-status ${raport.status === 'Selesai' ? 'selesai' : 'draft'}`}>
                        {raport.status}
                      </span>
                    </td>
                    <td>{raport.tanggalTerbit}</td>
                    <td>
                      <button className="btn-edit-raport">
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION INFO ================= */}
          <div className="pagination-info">
            Menampilkan 1 - {filteredData.length} dari {dataRaport.length} raport
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

export default Raport;