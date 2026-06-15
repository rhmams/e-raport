import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, FileText, LogOut,
  Phone, Mail, MapPinned, Clock as ClockIcon, GraduationCap,
  ChevronRight, ChevronDown, Edit, Trash2,
  Brain, Wrench, Sparkles, Heart, Scale
} from "lucide-react";
import "./ObservatifKarakterSpiritual.css";

function ObservatifKarakterSpiritual() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [data, setData] = useState([]);

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
                Dashboard <ChevronRight size={12} /> Rencana KD/Butir Spiritual
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
                      className={`dropdown-item ${location.pathname === '/rencana-penilaian' ? 'active' : ''}`}
                      onClick={() => navigate('/rencana-penilaian')}
                    >
                      <Brain size={14} />
                      <span>Rencana Nilai Pengetahuan</span>
                    </li>
                    <li
                      className={`dropdown-item ${location.pathname === '/rencana-penilaian' ? 'active' : ''}`}
                      onClick={() => navigate('/rencana-penilaian')}
                    >
                      <Wrench size={14} />
                      <span>Rencana Penilaian Keterampilan</span>
                    </li>
                    <li
                      className={`dropdown-item ${location.pathname === '/observatif-karakter-spiritual' ? 'active' : ''}`}
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
        <main className="main obs-main">
          <div className="container">

            <div className="obs-page-header">
              <h1>Rencana KD/Butir Spiritual</h1>
              <div className="obs-breadcrumb-right">
                <span className="obs-bread-link" onClick={() => navigate('/beranda')}>Dashboard</span>
                <span> / </span>
                <span>Rencana KD/Butir Spiritual</span>
              </div>
            </div>

            <div className="obs-card">
              <div className="obs-card-title">
                <FileText size={16} />
                <span>Rencana KD/Butir Spiritual</span>
              </div>

              <div className="obs-table-controls">
                <div className="obs-show-entries">
                  <span>Show</span>
                  <select value={entriesPerPage} onChange={handleEntriesChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="obs-search-box">
                  <span>Search:</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="obs-table-responsive">
                <table className="obs-table">
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
                          <td className="obs-aksi-buttons">
                            <button onClick={() => {}} className="obs-btn-edit"><Edit size={15} /></button>
                            <button onClick={() => handleDelete(item.id)} className="obs-btn-delete"><Trash2 size={15} /></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="obs-no-data">No data available in table</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="obs-pagination-controls">
                <div>Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries</div>
                <div className="obs-pagination-buttons">
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

export default ObservatifKarakterSpiritual;