import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, FileText, LogOut,
  Phone, Mail, MapPinned, Clock as ClockIcon, GraduationCap,
  Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, X, ArrowLeft
} from "lucide-react";

import "./Beranda.css"; // CSS Bawaan layout Sidebar/Navbar Anda
import "./DataKompetensiDasar.css"; // CSS Khusus yang baru kita buat

function DataKompetensiDasar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State untuk tabel
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // State untuk Modal Tambah KD
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data dummy Kompetensi Dasar
  const semuaData = [
    { id: 1, mataPelajaran: "Matematika", kompetensi: "Pengetahuan", tingkatKelas: "X", semester: "1", kode: "3.1", kompetensiDasar: "Memahami konsep matriks dan operasi matriks." },
    { id: 2, mataPelajaran: "Matematika", kompetensi: "Pengetahuan", tingkatKelas: "X", semester: "1", kode: "3.2", kompetensiDasar: "Menganalisis sifat determinan dan invers matriks." },
    { id: 3, mataPelajaran: "Matematika", kompetensi: "Keterampilan", tingkatKelas: "X", semester: "1", kode: "4.1", kompetensiDasar: "Menyajikan pemecahan masalah nyata menggunakan operasi matriks." },
    { id: 4, mataPelajaran: "Bahasa Indonesia", kompetensi: "Pengetahuan", tingkatKelas: "XI", semester: "2", kode: "3.1", kompetensiDasar: "Mengidentifikasi teks prosedur kompleks." },
    { id: 5, mataPelajaran: "Bahasa Indonesia", kompetensi: "Keterampilan", tingkatKelas: "XI", semester: "2", kode: "4.1", kompetensiDasar: "Memproduksi teks prosedur kompleks." },
    { id: 6, mataPelajaran: "Pendidikan Agama Islam", kompetensi: "Spiritual", tingkatKelas: "XII", semester: "1", kode: "1.1", kompetensiDasar: "Meyakini adanya Allah SWT." },
    { id: 7, mataPelajaran: "Pendidikan Agama Islam", kompetensi: "Sosial", tingkatKelas: "XII", semester: "1", kode: "2.1", kompetensiDasar: "Menghayati nilai-nilai toleransi." },
  ];

  // Filter data berdasarkan search
  const filteredData = semuaData.filter(item =>
    item.mataPelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kompetensi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tingkatKelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kompetensiDasar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // reset ke halaman pertama
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="page">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container navbar-inner">
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
                Dashboard &gt; Kompetensi Dasar
              </div>
            </div>
          </div>
          <div className="nav-profile" onClick={() => navigate('/profil')} style={{ cursor: 'pointer' }}>
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
              <li className={location.pathname === '/beranda' ? 'active' : ''} onClick={() => navigate('/beranda')}>
                <LayoutDashboard size={18}/> Beranda
              </li>
              <li className={location.pathname === '/kelas' ? 'active' : ''} onClick={() => navigate('/kelas')}>
                <BookOpen size={18}/> Kelas
              </li>
              <li className={location.pathname === '/wali-kelas' ? 'active' : ''} onClick={() => navigate('/wali-kelas')}>
                <Users size={18}/> Wali Kelas
              </li>
              <li className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} onClick={() => navigate('/ekstrakurikuler')}>
                <ClipboardList size={18}/> Ekstrakurikuler
              </li>
              <li className={location.pathname === '/nilai' ? 'active' : ''} onClick={() => navigate('/nilai')}>
                <GraduationCap size={18}/> Nilai
              </li>
              <li className={location.pathname === '/raport' ? 'active' : ''} onClick={() => navigate('/raport')}>
                <FileText size={18}/> Raport 
              </li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="main" style={{ padding: '24px' }}>
          <div className="dkd-main-content">
            
            {/* ====== HEADER KONTEN (TOMBOL KEMBALI & JUDUL) ====== */}
            <div className="dkd-header-section">
              {/* Tombol Panah Kembali */}
              <div>
                <button 
                  onClick={() => navigate(-1)}
                  className="btn-back"
                  title="Kembali ke halaman sebelumnya"
                >
                  <ArrowLeft size={24} strokeWidth={2} />
                </button>
              </div>

              {/* Baris Judul & Tombol Tambah */}
              <div className="dkd-title-row">
                <h1 className="dkd-title">Data Kompetensi Dasar</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn-add">
                  <Plus size={16} /> Tambah KD
                </button>
              </div>
            </div>

            {/* Tabel dengan kontrol */}
            <div className="card dkd-card">
              
              {/* Baris atas: Show entries dan Search */}
              <div className="dkd-controls">
                <div className="dkd-control-group">
                  <span className="dkd-text-sm">Show</span>
                  <select value={entriesPerPage} onChange={handleEntriesChange} className="dkd-select">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="dkd-text-sm">entries</span>
                </div>
                <div className="dkd-control-group">
                  <span className="dkd-text-sm">Search:</span>
                  <div className="dkd-search-box">
                    <Search size={16} style={{ color: '#94a3b8', marginRight: '6px' }} />
                    <input 
                      type="text" 
                      value={searchTerm} 
                      onChange={handleSearch}
                      placeholder="Cari..." 
                      className="dkd-search-input"
                    />
                  </div>
                </div>
              </div>

              {/* Tabel */}
              <div className="dkd-table-wrapper">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Mata Pelajaran</th>
                      <th>Kompetensi</th>
                      <th>Tingkatan Kelas</th>
                      <th>Semester</th>
                      <th>Kode</th>
                      <th>Kompetensi Dasar</th>
                      <th style={{ textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{startIndex + idx + 1}</td>
                          <td>{item.mataPelajaran}</td>
                          <td>{item.kompetensi}</td>
                          <td>{item.tingkatKelas}</td>
                          <td>{item.semester}</td>
                          <td><span className="badge-kode">{item.kode}</span></td>
                          <td>{item.kompetensiDasar}</td>
                          <td style={{ textAlign: 'center' }}>
                            <button className="btn-action edit">
                              <Edit size={16} color="#3b82f6" />
                            </button>
                            <button className="btn-action">
                              <Trash2 size={16} color="#ef4444" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="dkd-empty-row">
                          No data available in table
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="dkd-pagination-container">
                <div className="dkd-text-sm">
                  Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
                </div>
                <div className="dkd-pagination-buttons">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="btn-page"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <span className="page-current">{currentPage}</span>
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="btn-page"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* ================= MODAL TAMBAH KOMPETENSI DASAR ================= */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title-wrapper">
                <h2>📝 Tambah Kompetensi Dasar</h2>
                <p className="modal-subtitle">
                  Data kompetensi dasar yang akan ditampilkan di halaman penilaian.
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="btn-close">
                <X size={20} color="#64748b" />
              </button>
            </div>

            {/* Modal Body (Form) */}
            <div className="modal-body">
              
              {/* Mata Pelajaran */}
              <div className="form-group">
                <label>Pilih Mata Pelajaran</label>
                <div className="input-search-group">
                  <input type="text" placeholder="Cari nama mata pelajaran..." className="form-input" />
                  <button className="btn-search-icon">
                    <Search size={22} color="white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Tingkat Kelas & Semester */}
              <div className="form-grid-2 form-group">
                <div>
                  <label>Tingkat Kelas</label>
                  <select className="form-select">
                    <option>Kelas X</option>
                    <option>Kelas XI</option>
                    <option>Kelas XII</option>
                  </select>
                </div>
                <div>
                  <label>Semester</label>
                  <select className="form-select">
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                  </select>
                </div>
              </div>

              {/* Kompetensi & Kode */}
              <div className="form-grid-2 form-group">
                <div>
                  <label>Aspek Kompetensi</label>
                  <select className="form-select">
                    <option>Pengetahuan</option>
                    <option>Keterampilan</option>
                    <option>Sikap Spiritual</option>
                    <option>Sikap Sosial</option>
                  </select>
                </div>
                <div>
                  <label>Kode KD</label>
                  <input type="text" placeholder="Contoh: 3.1" className="form-input" />
                </div>
              </div>

              {/* Deskripsi Kompetensi Dasar */}
              <div className="form-group">
                <label>Deskripsi Kompetensi Dasar</label>
                <textarea 
                  rows="4"
                  placeholder="Masukkan deskripsi kompetensi dasar di sini..."
                  className="form-textarea"
                ></textarea>
                <p className="form-helper">
                  Pastikan deskripsi KD sesuai dengan kurikulum yang berlaku.
                </p>
              </div>

            </div>

            {/* Modal Footer (Action Buttons) */}
            <div className="modal-footer">
              <button onClick={() => setIsModalOpen(false)} className="btn-cancel">
                Batal
              </button>
              <button className="btn-save">
                Simpan
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
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

export default DataKompetensiDasar;