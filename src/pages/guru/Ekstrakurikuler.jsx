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
  Plus,
  Eye,
  Calendar,
  User,
  Award
} from "lucide-react";

import "./Ekstrakurikuler.css";
import { useNavigate, useLocation } from 'react-router-dom';

function Ekstrakurikuler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const dataEkstra = [
    {
      id: 1,
      nama: "Kompetisi Tilawah",
      jenis: "Keagamaan",
      peserta: 45,
      jadwal: "Setiap Jumat",
      pembimbing: "Ustadz Ahmad",
      status: "Aktif"
    },
    {
      id: 2,
      nama: "Klub Debat Bahasa Arab",
      jenis: "Akademik",
      peserta: 28,
      jadwal: "Selasa & Kamis",
      pembimbing: "Ustadz Muhammad",
      status: "Aktif"
    },
    {
      id: 3,
      nama: "Kaligrafi Islam",
      jenis: "Seni",
      peserta: 32,
      jadwal: "Rabu",
      pembimbing: "Ustadzah Fatimah",
      status: "Aktif"
    },
    {
      id: 4,
      nama: "Panitia Amal",
      jenis: "Sosial",
      peserta: 52,
      jadwal: "Bulanan",
      pembimbing: "Ustadzah Khadijah",
      status: "Aktif"
    },
    {
      id: 5,
      nama: "Paduan Suara Nasheed",
      jenis: "Seni",
      peserta: 38,
      jadwal: "Senin & Jumat",
      pembimbing: "Ustadz Umar",
      status: "Aktif"
    },
    {
      id: 6,
      nama: "Olahraga & Kebugaran",
      jenis: "Fisik",
      peserta: 65,
      jadwal: "Harian",
      pembimbing: "Ustadz Abdulrahman",
      status: "Aktif"
    }
  ];

  const filteredData = dataEkstra.filter(ekstra =>
    ekstra.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ekstra.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ekstra.pembimbing.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalKegiatan = dataEkstra.length;
  const totalPeserta = dataEkstra.reduce((acc, curr) => acc + curr.peserta, 0);
  const programAktif = dataEkstra.filter(ekstra => ekstra.status === "Aktif").length;

  const handleLihatDetail = (ekstraId) => {
    navigate(`/ekstrakurikuler/${ekstraId}`);
  };

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
                Guru &gt; Ekstrakurikuler
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
              <h1>Kegiatan Ekstrakurikuler</h1>
              <p className="subtitle">Kelola program ko-kurikuler dan partisipasi</p>
            </div>
            <button className="btn-tambah">
              <Plus size={18} /> Tambah Kegiatan
            </button>
          </div>

          {/* ================= STATS CARDS ================= */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e6f7f0', color: '#16a085' }}>
                <Award size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{totalKegiatan}</div>
                <div className="stat-label">Total Kegiatan</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e6f0f7', color: '#3498db' }}>
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{totalPeserta}</div>
                <div className="stat-label">Total Peserta</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fef3c7', color: '#f39c12' }}>
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{programAktif}</div>
                <div className="stat-label">Program Aktif</div>
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
            </div>
            <div className="search-section">
              <div className="search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Cari kegiatan..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn-filter">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          {/* ================= TABLE EKSTRAKURIKULER ================= */}
          <div className="table-container">
            <table className="ekstra-table">
              <thead>
                <tr>
                  <th>Nama Kegiatan</th>
                  <th>Jenis</th>
                  <th>Peserta</th>
                  <th>Jadwal</th>
                  <th>Pembimbing</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((ekstra) => (
                  <tr key={ekstra.id}>
                    <td>
                      <div className="nama-kegiatan">
                        <span>{ekstra.nama}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge-jenis">{ekstra.jenis}</span>
                    </td>
                    <td>{ekstra.peserta}</td>
                    <td>{ekstra.jadwal}</td>
                    <td>
                      <div className="pembimbing-info">
                        <User size={14} />
                        <span>{ekstra.pembimbing}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge-status aktif">{ekstra.status}</span>
                    </td>
                    <td>
                      <button 
                        className="btn-lihat-detail" 
                        onClick={() => handleLihatDetail(ekstra.id)}
                      >
                        <Eye size={16} />
                        <span>Lihat Detail</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION INFO ================= */}
          <div className="pagination-info">
            Menampilkan 1 - {filteredData.length} dari {dataEkstra.length} kegiatan
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

export default Ekstrakurikuler;