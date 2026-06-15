import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, FileText, LogOut,
  Phone, Mail, MapPinned, Clock as ClockIcon, GraduationCap,
  ChevronRight, ChevronDown, Edit, Trash2, ChevronLeft, X,
  Brain, Wrench, Sparkles, Heart, Scale
} from "lucide-react";
import "./ObservatifKarakterSosial.css";

function ObservatifKarakterSosial() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Contoh data dummy
  const [data, setData] = useState([
    { id: 1, mataPelajaran: "Pendidikan Agama Islam", kelas: "7A", jumlahRencana: 4 },
    { id: 2, mataPelajaran: "Bahasa Indonesia", kelas: "7B", jumlahRencana: 3 },
    { id: 3, mataPelajaran: "Matematika", kelas: "8A", jumlahRencana: 5 },
    { id: 4, mataPelajaran: "Ilmu Pengetahuan Alam", kelas: "8B", jumlahRencana: 2 },
    { id: 5, mataPelajaran: "Bahasa Inggris", kelas: "9A", jumlahRencana: 4 },
  ]);

  const filteredData = data.filter(item =>
    item.mataPelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const goToBeranda = () => navigate('/beranda');
  const goToKelas = () => navigate('/kelas');
  const goToWaliKelas = () => navigate('/wali-kelas');
  const goToEkstrakurikuler = () => navigate('/ekstrakurikuler');
  const goToNilai = () => navigate('/nilai');
  const goToRaport = () => navigate('/raport');

  return (
    <div className="page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <img src="/logo-madinah.png" alt="Madinah Al-Quds" style={{ width: '40px', height: '40px', borderRadius: '8px' }} className="navbar-logo" />
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Dashboard <ChevronRight size={12} /> Rencana KD/Butir Sosial
              </div>
            </div>
          </div>
          <div className="nav-profile">
            <div className="avatar-nav">UA</div>
            <div className="profile-text"><strong>Ustadz Ahmad</strong><p>Guru</p></div>
          </div>
        </div>
      </header>

      <div className="layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">
          <div>
            <ul className="menu">

              <li
                className={location.pathname === '/beranda' ? 'active' : ''}
                onClick={goToBeranda}
              >
                <LayoutDashboard size={18} /> Beranda
              </li>

              {/* Dropdown Rencana Penilaian */}
              <div className="dropdown-wrapper">
                <div
                  className="dropdown-header"
                  onClick={() => setDropdownOpen(prev => !prev)}
                >
                  <FileText size={18} />
                  <span className="dropdown-label">Rencana Penilaian</span>
                  <ChevronDown
                    size={16}
                    className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}
                  />
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-list">
                    <li
                      className="dropdown-item"
                      onClick={() => navigate('/rencana-nilai-pengetahuan')}
                    >
                      <Brain size={14} />
                      <span>Rencana Nilai Pengetahuan</span>
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => navigate('/rencana-penilaian-keterampilan')}
                    >
                      <Wrench size={14} />
                      <span>Rencana Penilaian Keterampilan</span>
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => navigate('/observatif-karakter-spiritual')}
                    >
                      <Sparkles size={14} />
                      <span>Rencana KD/Butir Spiritual</span>
                    </li>
                    <li
                      className={`dropdown-item ${location.pathname === '/observatif-karakter-sosial' ? 'active' : ''}`}
                      onClick={() => navigate('/observatif-karakter-sosial')}
                    >
                      <Heart size={14} />
                      <span>Rencana KD/Butir Sosial</span>
                    </li>
                    <li
                      className={`dropdown-item ${location.pathname === '/rencana-bobot-ujian' ? 'active' : ''}`}
                      onClick={() => navigate('/rencana-bobot-ujian')}
                    >
                      <Scale size={14} />
                      <span>Rencana Bobot PH PTS & PAS</span>
                    </li>
                  </ul>
                )}
              </div>

              <li
                className={location.pathname === '/kelas' ? 'active' : ''}
                onClick={goToKelas}
              >
                <BookOpen size={18} /> Kelas
              </li>
              <li
                className={location.pathname === '/wali-kelas' ? 'active' : ''}
                onClick={goToWaliKelas}
              >
                <Users size={18} /> Wali Kelas
              </li>
              <li
                className={location.pathname === '/ekstrakurikuler' ? 'active' : ''}
                onClick={goToEkstrakurikuler}
              >
                <ClipboardList size={18} /> Ekstrakurikuler
              </li>
              <li
                className={location.pathname === '/nilai' ? 'active' : ''}
                onClick={goToNilai}
              >
                <GraduationCap size={18} /> Nilai
              </li>
              <li
                className={location.pathname === '/raport' ? 'active' : ''}
                onClick={goToRaport}
              >
                <FileText size={18} /> Raport
              </li>

            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}>
            <LogOut size={18} /> Keluar
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="main obs-sosial-main">
          <div className="container">

            <div className="obs-sosial-page-header">
              <h1>Rencana KD/Butir Sosial</h1>
              <div className="obs-sosial-breadcrumb-right">
                <span className="obs-sosial-bread-link" onClick={() => navigate('/beranda')}>Dashboard</span>
                <span> / </span>
                <span>Rencana KD/Butir Sosial</span>
              </div>
            </div>

            <div className="obs-sosial-card">
              <div className="obs-sosial-card-title">
                <FileText size={16} />
                <span>Rencana KD/Butir Sosial</span>
              </div>

              <div className="obs-sosial-table-controls">
                <div className="obs-sosial-show-entries">
                  <span>Show</span>
                  <select value={entriesPerPage} onChange={handleEntriesChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="obs-sosial-search-box">
                  <span>Search:</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="obs-sosial-table-responsive">
                <table className="obs-sosial-table">
                  <thead>
                    <tr>
                      <th>No <span className="sort-icon">↑↓</span></th>
                      <th>Mata Pelajaran <span className="sort-icon">↑↓</span></th>
                      <th>Kelas <span className="sort-icon">↑↓</span></th>
                      <th>Jumlah Rencana Penilaian <span className="sort-icon">↑↓</span></th>
                      <th>Aksi <span className="sort-icon">↑↓</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{startIndex + idx + 1}</td>
                          <td>{item.mataPelajaran}</td>
                          <td>{item.kelas}</td>
                          <td>{item.jumlahRencana}</td>
                          <td className="obs-sosial-aksi-buttons">
                            <button onClick={() => {}} className="obs-sosial-btn-edit"><Edit size={15} /></button>
                            <button onClick={() => handleDelete(item.id)} className="obs-sosial-btn-delete"><Trash2 size={15} /></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="obs-sosial-no-data">No data available in table</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="obs-sosial-pagination-controls">
                <div>Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries</div>
                <div className="obs-sosial-pagination-buttons">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                    Next
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

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
              <p><ClockIcon size={18} /> Senin - Jumat: 07:00 - 16:00</p>
              <p><ClockIcon size={18} /> Sabtu: 07:00 - 14:00</p>
              <p><ClockIcon size={18} /> Minggu: Tutup</p>
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

export default ObservatifKarakterSosial;