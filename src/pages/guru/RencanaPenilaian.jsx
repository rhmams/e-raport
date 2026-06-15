import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, FileText, LogOut,
  Phone, Mail, MapPinned, Clock as ClockIcon, GraduationCap,
  ChevronRight, ChevronDown, Plus, Search, Edit, Trash2, ChevronLeft, X,
  Brain, Wrench, Sparkles, Heart, Scale
} from "lucide-react";
import "./RencanaPenilaian.css";

function RencanaPenilaian() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('pengetahuan');
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState({
    mataPelajaran: '',
    kelas: '',
    jumlahRencana: ''
  });

  const [dataPengetahuan, setDataPengetahuan] = useState([
    { id: 1, mataPelajaran: "Matematika", kelas: "X-1", jumlahRencana: 5 },
    { id: 2, mataPelajaran: "Fisika", kelas: "XI-2", jumlahRencana: 4 },
    { id: 3, mataPelajaran: "Kimia", kelas: "XII-3", jumlahRencana: 6 },
    { id: 4, mataPelajaran: "Biologi", kelas: "X-4", jumlahRencana: 3 },
    { id: 5, mataPelajaran: "Bahasa Indonesia", kelas: "XI-1", jumlahRencana: 5 },
  ]);

  const [dataKeterampilan, setDataKeterampilan] = useState([
    { id: 1, mataPelajaran: "Matematika", kelas: "X-1", jumlahRencana: 4 },
    { id: 2, mataPelajaran: "Fisika", kelas: "XI-2", jumlahRencana: 3 },
    { id: 3, mataPelajaran: "Kimia", kelas: "XII-3", jumlahRencana: 5 },
    { id: 4, mataPelajaran: "Biologi", kelas: "X-4", jumlahRencana: 2 },
    { id: 5, mataPelajaran: "Bahasa Inggris", kelas: "XI-1", jumlahRencana: 4 },
  ]);

  const currentDataRaw = activeTab === 'pengetahuan' ? dataPengetahuan : dataKeterampilan;

  const filteredData = currentDataRaw.filter(item =>
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

  const openAddModal = () => {
    setEditingId(null);
    setFormValues({ mataPelajaran: '', kelas: '', jumlahRencana: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormValues({
      mataPelajaran: item.mataPelajaran,
      kelas: item.kelas,
      jumlahRencana: item.jumlahRencana.toString()
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formValues.mataPelajaran || !formValues.kelas || !formValues.jumlahRencana) {
      alert("Semua field wajib diisi!");
      return;
    }
    const newItem = {
      id: editingId !== null ? editingId : Date.now(),
      mataPelajaran: formValues.mataPelajaran,
      kelas: formValues.kelas,
      jumlahRencana: parseInt(formValues.jumlahRencana)
    };

    if (activeTab === 'pengetahuan') {
      if (editingId !== null) {
        setDataPengetahuan(prev => prev.map(item => item.id === editingId ? newItem : item));
      } else {
        setDataPengetahuan(prev => [...prev, newItem]);
      }
    } else {
      if (editingId !== null) {
        setDataKeterampilan(prev => prev.map(item => item.id === editingId ? newItem : item));
      } else {
        setDataKeterampilan(prev => [...prev, newItem]);
      }
    }
    closeModal();
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus rencana ini?")) {
      if (activeTab === 'pengetahuan') {
        setDataPengetahuan(prev => prev.filter(item => item.id !== id));
      } else {
        setDataKeterampilan(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const goToBeranda = () => navigate('/beranda');
  const goToKelas = () => navigate('/kelas');
  const goToWaliKelas = () => navigate('/wali-kelas');
  const goToEkstrakurikuler = () => navigate('/ekstrakurikuler');
  const goToNilai = () => navigate('/nilai');
  const goToRaport = () => navigate('/raport');

  const getTabTitle = () => activeTab === 'pengetahuan' ? 'Pengetahuan' : 'Keterampilan';

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
                Dashboard <ChevronRight size={12} /> Rencana Penilaian <ChevronRight size={12} /> {getTabTitle()}
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
                      className={`dropdown-item ${activeTab === 'pengetahuan' && location.pathname === '/rencana-penilaian' ? 'active' : ''}`}
                      onClick={() => { setActiveTab('pengetahuan'); navigate('/rencana-penilaian'); }}
                    >
                      <Brain size={14} />
                      <span>Rencana Nilai Pengetahuan</span>
                    </li>
                    <li
                      className={`dropdown-item ${activeTab === 'keterampilan' && location.pathname === '/rencana-penilaian' ? 'active' : ''}`}
                      onClick={() => { setActiveTab('keterampilan'); navigate('/rencana-penilaian'); }}
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
        <main className="main rencana-main">
          <div className="container">
            <div className="rencana-header">
              <div className="rencana-header-top">
                <div className="rencana-header-icon">
                  {activeTab === 'pengetahuan' ? <Brain size={28} /> : <Wrench size={28} />}
                </div>
                <div>
                  <h1>Rencana Nilai {getTabTitle()}</h1>
                  <p className="subtitle">
                    {activeTab === 'pengetahuan'
                      ? 'Kelola rencana penilaian pengetahuan (kognitif) per mata pelajaran dan kelas'
                      : 'Kelola rencana penilaian keterampilan (psikomotorik) per mata pelajaran dan kelas'}
                  </p>
                </div>
              </div>
              <button className="btn-add-rencana" onClick={openAddModal}>
                <Plus size={16} /> Tambah Rencana
              </button>
            </div>

            <div className="card">
              <div className="table-controls">
                <div className="show-entries">
                  <span>Show</span>
                  <select value={entriesPerPage} onChange={handleEntriesChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="search-box">
                  <span>Search:</span>
                  <div className="search-input-wrapper">
                    <Search size={16} />
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Cari..." />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="rencana-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Mata Pelajaran</th>
                      <th>Kelas</th>
                      <th>Jumlah Rencana Penilaian</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{startIndex + idx + 1}</td>
                          <td>{item.mataPelajaran}</td>
                          <td>{item.kelas}</td>
                          <td><span className="badge-jumlah">{item.jumlahRencana}</span></td>
                          <td className="aksi-buttons">
                            <button onClick={() => openEditModal(item)} className="btn-edit"><Edit size={16} /></button>
                            <button onClick={() => handleDelete(item.id)} className="btn-delete"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">No data available in table</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pagination-controls">
                <div>Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries</div>
                <div className="pagination-buttons">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <span className="current-page">{currentPage}</span>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId !== null ? 'Edit Rencana Penilaian' : 'Tambah Rencana Penilaian'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Mata Pelajaran *</label>
                <input type="text" name="mataPelajaran" value={formValues.mataPelajaran} onChange={handleInputChange} placeholder="Contoh: Matematika" />
              </div>
              <div className="form-group">
                <label>Kelas *</label>
                <input type="text" name="kelas" value={formValues.kelas} onChange={handleInputChange} placeholder="Contoh: X-1" />
              </div>
              <div className="form-group">
                <label>Jumlah Rencana Penilaian *</label>
                <input type="number" name="jumlahRencana" value={formValues.jumlahRencana} onChange={handleInputChange} placeholder="Contoh: 5" min="1" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={closeModal}>Batal</button>
              <button className="btn-simpan" onClick={handleSave}>Simpan</button>
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

export default RencanaPenilaian;