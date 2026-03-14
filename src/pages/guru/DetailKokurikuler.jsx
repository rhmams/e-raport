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
  Edit,
  Save,
  Printer,
  ChevronLeft,
  GraduationCap
} from "lucide-react";

import "./DetailKokurikuler.css";
import { useNavigate, useLocation } from 'react-router-dom';

function DetailKokurikuler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState('1');

  // Data program kokurikuler
  const programData = [
    { kode: '1', semester: '4', tipe: 'Program E' },
    { kode: '2', semester: '3', tipe: 'Program E' },
    { kode: '3', semester: '2', tipe: 'Program E' },
    { kode: '4', semester: '1', tipe: 'Program E' },
  ];

  // Data nilai siswa (diperpanjang sampai 20 row)
  const siswaData = [
    { id: 1, nama: 'AGAMA ISLAM AKTIF', s1: 4, s2: 4, s3: 4, s4: 4, s5: 3, s6: 3, s7: 1 },
    { id: 2, nama: 'BENTY LUMINTING', s1: 4, s2: 4, s3: 3, s4: 3, s5: 2, s6: 2, s7: 2 },
    { id: 3, nama: 'SHARIAH PENGUATAN', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 4, nama: 'GURU YUDHO MUNIRAH', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 5, nama: 'MUHAMMAD ALI RIZKI', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 6, nama: 'HIDAYATUL HUDAHARI', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 7, nama: 'HASAN SEITU FIKRIHOMI', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 8, nama: 'RESTRUPTION HEDNYAT', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 9, nama: 'UMATI CHULANMANO', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 10, nama: 'KEPALA DINI YANTOS', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 11, nama: 'ARDI KURNIAWAN', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 12, nama: 'MIGUEL FIRDAUSIN', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 13, nama: 'EVOLUTION', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 14, nama: 'MANUFACTURING', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 15, nama: 'REMA INDUSTRIALISMA', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 16, nama: 'ALWAYS ON (SHARING IDEAS)', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 17, nama: 'DARI KURIHANING', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 18, nama: 'MIGUEL FIRDAUSIN', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 19, nama: 'EVOLUTION', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
    { id: 20, nama: 'MANUFACTURING', s1: 4, s2: 4, s3: 4, s4: 4, s5: 4, s6: 2, s7: 2 },
  ];

  const filteredSiswa = siswaData.filter(siswa =>
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page detail-kokurikuler-page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <div className="logo-circle">MQ</div>
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Guru &gt; Kokurikuler &gt; Detail Nilai
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
              <li onClick={() => navigate('/kelas')}>
                <BookOpen size={18}/> Kelas
              </li>
              <li onClick={() => navigate('/wali-kelas')}>
                <Users size={18}/> Wali Kelas
              </li>
              <li className="active" onClick={() => navigate('/ekstrakurikuler')}>
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
          <div className="logout" onClick={() => navigate('/logout')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="main-content">
          
          {/* ================= HEADER WITH BACK BUTTON ================= */}
          <div className="page-header">
            <div className="header-left">
              <button className="btn-back" onClick={() => navigate('/ekstrakurikuler')}>
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1>Nilai Kokurikuler</h1>
                <p className="subtitle">Ingat, dari buku ini akan ditemukan jumlah kokurikuler.</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn-edit">
                <Edit size={16} /> Edit
              </button>
              <button className="btn-save">
                <Save size={16} /> Simpan
              </button>
              <button className="btn-print">
                <Printer size={16} /> Cetak
              </button>
            </div>
          </div>

          {/* ================= PROGRAM TABLE ================= */}
          <div className="program-table-container">
            <table className="program-table">
              <thead>
                <tr>
                  <th>KODE</th>
                  <th>SEMESTER</th>
                  <th>TIPE/PROGRAM</th>
                </tr>
              </thead>
              <tbody>
                {programData.map((program) => (
                  <tr 
                    key={program.kode} 
                    className={selectedRow === program.kode ? 'selected' : ''}
                    onClick={() => setSelectedRow(program.kode)}
                  >
                    <td>{program.kode}</td>
                    <td>{program.semester}</td>
                    <td>{program.tipe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= FORMULA ================= */}
          <div className="formula-container">
            <span className="formula-text">Nilai Nilai = (Kurikulasi * Total) / Standar Esa</span>
          </div>

          {/* ================= SEARCH AND FILTER ================= */}
          <div className="search-filter-container">
            <div className="search-box">
              <Search size={16} className="search-icon" />
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

          {/* ================= NILAI TABLE ================= */}
          <div className="nilai-table-wrapper">
            <table className="nilai-table">
              <thead>
                <tr>
                  <th rowSpan="2">No.</th>
                  <th rowSpan="2">Nama</th>
                  <th colSpan="7" className="semester-main-header">semester</th>
                </tr>
                <tr>
                  <th>menengah</th>
                  <th>menengah</th>
                  <th>menengah</th>
                  <th>menengah</th>
                  <th>menengah</th>
                  <th>menenth</th>
                  <th>menenth</th>
                </tr>
                <tr>
                  <th colSpan="2"></th>
                  <th>nilai standar</th>
                  <th>nilai standar</th>
                  <th>nilai standar</th>
                  <th>nilai standar</th>
                  <th>nilai standart</th>
                  <th>nilai standart</th>
                  <th>nilai standart</th>
                </tr>
                <tr>
                  <th colSpan="2"></th>
                  <th>C</th>
                  <th>C</th>
                  <th>C</th>
                  <th>C</th>
                  <th>C</th>
                  <th>C</th>
                  <th>C</th>
                </tr>
              </thead>
              <tbody>
                {filteredSiswa.map((siswa, index) => (
                  <tr key={siswa.id}>
                    <td>{index + 1}</td>
                    <td className="nama-siswa">{siswa.nama}</td>
                    <td>{siswa.s1}</td>
                    <td>{siswa.s2}</td>
                    <td>{siswa.s3}</td>
                    <td>{siswa.s4}</td>
                    <td>{siswa.s5}</td>
                    <td>{siswa.s6}</td>
                    <td>{siswa.s7}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION INFO ================= */}
          <div className="pagination-info">
            Menampilkan 1 - {filteredSiswa.length} dari {siswaData.length} siswa
          </div>

          {/* ================= HETEROGENE SECTION ================= */}
          <div className="heterogene-section">
            <h3>HETEROGENE</h3>
            
            <div className="heterogene-grid">
              <div className="heterogene-item">
                <h4>Jenis Pendek:</h4>
                <ul>
                  <li><span className="label">PT :</span> Menulis</li>
                  <li><span className="label">PR :</span> Penulis</li>
                </ul>
              </div>

              <div className="heterogene-item">
                <h4>Nilai Standar:</h4>
                <ul>
                  <li>C: 0.75</li>
                  <li>C: 0.50</li>
                  <li>C: 0.25</li>
                  <li>C: 0.00</li>
                </ul>
              </div>

              <div className="heterogene-item">
                <h4>Standar Sumbangan:</h4>
                <ul>
                  <li>C: 0.75</li>
                  <li>C: 0.50</li>
                  <li>C: 0.25</li>
                  <li>C: 0.00</li>
                </ul>
              </div>
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

export default DetailKokurikuler;