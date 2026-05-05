// src/pages/Ekstrakurikuler.jsx
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
  Award,
  GraduationCap,
  X,
  Save
} from "lucide-react";

import "./Ekstrakurikuler.css";
import { useNavigate, useLocation } from 'react-router-dom';

function Ekstrakurikuler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ekstrakurikuler');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // Data Ekstrakurikuler
  const [dataEkstra, setDataEkstra] = useState([
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
  ]);

  // Data Kokurikuler
  const [dataKokurikuler, setDataKokurikuler] = useState([
    {
      id: 101,
      nama: "Tahfidz Al-Quran",
      jenis: "Keagamaan",
      peserta: 248,
      jadwal: "Setiap Hari",
      pembimbing: "Ustadz Ahmad",
      status: "Aktif"
    },
    {
      id: 102,
      nama: "Bahasa Arab Terapan",
      jenis: "Akademik",
      peserta: 248,
      jadwal: "Senin & Rabu",
      pembimbing: "Ustadz Zali Fatimah",
      status: "Aktif"
    },
    {
      id: 103,
      nama: "Studi Islam Kontemporer",
      jenis: "Keagamaan",
      peserta: 180,
      jadwal: "Selasa & Kamis",
      pembimbing: "Ustadz Muhammad",
      status: "Aktif"
    },
    {
      id: 104,
      nama: "Praktik Ibadah",
      jenis: "Keagamaan",
      peserta: 248,
      jadwal: "Setiap Hari",
      pembimbing: "Ustadz Abdullah",
      status: "Aktif"
    }
  ]);

  // Form state untuk modal
  const [formData, setFormData] = useState({
    nama: '',
    jenis: '',
    peserta: '',
    jadwal: '',
    pembimbing: '',
    status: 'Aktif'
  });

  const jenisOptions = ['Keagamaan', 'Akademik', 'Seni', 'Sosial', 'Fisik', 'Olahraga'];
  const statusOptions = ['Aktif', 'Nonaktif', 'Selesai'];

  // Tentukan data yang ditampilkan berdasarkan tab aktif
  const currentData = activeTab === 'ekstrakurikuler' ? dataEkstra : dataKokurikuler;
  const setCurrentData = activeTab === 'ekstrakurikuler' ? setDataEkstra : setDataKokurikuler;

  const filteredData = currentData.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pembimbing.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalKegiatan = currentData.length;
  const totalPeserta = currentData.reduce((acc, curr) => acc + curr.peserta, 0);
  const programAktif = currentData.filter(item => item.status === "Aktif").length;

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset modal
  const resetModal = () => {
    setFormData({
      nama: '',
      jenis: '',
      peserta: '',
      jadwal: '',
      pembimbing: '',
      status: 'Aktif'
    });
    setEditMode(false);
    setCurrentEditId(null);
    setShowModal(false);
  };

  // Handle tambah kegiatan
  const handleTambahKegiatan = () => {
    if (!formData.nama || !formData.jenis || !formData.peserta || !formData.jadwal || !formData.pembimbing) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    const newId = Math.max(...currentData.map(item => item.id), 0) + 1;
    const newKegiatan = {
      id: newId,
      nama: formData.nama,
      jenis: formData.jenis,
      peserta: parseInt(formData.peserta),
      jadwal: formData.jadwal,
      pembimbing: formData.pembimbing,
      status: formData.status
    };

    setCurrentData([...currentData, newKegiatan]);
    resetModal();
    alert(`Kegiatan ${activeTab === 'ekstrakurikuler' ? 'Ekstrakurikuler' : 'Kokurikuler'} berhasil ditambahkan!`);
  };

  // Handle edit kegiatan
  const handleEditKegiatan = (item) => {
    setEditMode(true);
    setCurrentEditId(item.id);
    setFormData({
      nama: item.nama,
      jenis: item.jenis,
      peserta: item.peserta.toString(),
      jadwal: item.jadwal,
      pembimbing: item.pembimbing,
      status: item.status
    });
    setShowModal(true);
  };

  // Handle update kegiatan
  const handleUpdateKegiatan = () => {
    if (!formData.nama || !formData.jenis || !formData.peserta || !formData.jadwal || !formData.pembimbing) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    const updatedData = currentData.map(item =>
      item.id === currentEditId
        ? {
            ...item,
            nama: formData.nama,
            jenis: formData.jenis,
            peserta: parseInt(formData.peserta),
            jadwal: formData.jadwal,
            pembimbing: formData.pembimbing,
            status: formData.status
          }
        : item
    );

    setCurrentData(updatedData);
    resetModal();
    alert(`Kegiatan ${activeTab === 'ekstrakurikuler' ? 'Ekstrakurikuler' : 'Kokurikuler'} berhasil diupdate!`);
  };

  // Handle hapus kegiatan
  const handleHapusKegiatan = (id, nama) => {
    if (window.confirm(`Yakin ingin menghapus kegiatan "${nama}"?`)) {
      const newData = currentData.filter(item => item.id !== id);
      setCurrentData(newData);
      alert(`Kegiatan "${nama}" berhasil dihapus!`);
    }
  };

  // Handle lihat detail
  const handleLihatDetail = (itemId) => {
    if (activeTab === 'kokurikuler') {
      navigate(`/kokurikuler/${itemId}`);
    } else {
      navigate(`/ekstrakurikuler/${itemId}`);
    }
  };

  return (
    <div className="page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-inner">
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
                Guru &gt; {activeTab === 'ekstrakurikuler' ? 'Ekstrakurikuler' : 'Kokurikuler'}
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
              <li className={location.pathname === '/' || location.pathname === '/beranda' ? 'active' : ''} onClick={() => navigate('/beranda')}>
                <LayoutDashboard size={18}/> Beranda
              </li>
              <li className={location.pathname.startsWith('/kelas') && !location.pathname.includes('/kelas/') ? 'active' : ''} onClick={() => navigate('/kelas')}>
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
          <div className="logout" onClick={() => navigate('/logout')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">
          
          {/* ================= HEADER ================= */}
          <div className="page-header">
            <div>
              <h1>Kegiatan {activeTab === 'ekstrakurikuler' ? 'Ekstrakurikuler' : 'Kokurikuler'}</h1>
              <p className="subtitle">Kelola program ko-kurikuler dan partisipasi siswa</p>
            </div>
            <button className="btn-tambah" onClick={() => {
              setEditMode(false);
              setFormData({ nama: '', jenis: '', peserta: '', jadwal: '', pembimbing: '', status: 'Aktif' });
              setShowModal(true);
            }}>
              <Plus size={18} /> Tambah Kegiatan
            </button>
          </div>

          {/* ================= TAB NAVIGATION ================= */}
          <div className="tab-navigation">
            <div 
              className={`tab-item ${activeTab === 'kokurikuler' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('kokurikuler');
                setSearchTerm('');
              }}
            >
              Kokurikuler
            </div>
            <div 
              className={`tab-item ${activeTab === 'ekstrakurikuler' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('ekstrakurikuler');
                setSearchTerm('');
              }}
            >
              Ekstrakurikuler
            </div>
          </div>

          {/* ================= INPUT NILAI SECTION ================= */}
          {activeTab === 'kokurikuler' && (
            <div className="input-nilai-section">
              <div className="input-nilai-header">
                <GraduationCap size={20} />
                <h3>Input Nilai Kokurikuler</h3>
              </div>
              <p className="input-nilai-desc">Kelola nilai dimensi profil lulusan untuk kegiatan kokurikuler</p>
            </div>
          )}

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

          {/* ================= TABLE ================= */}
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
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="nama-kegiatan">{item.nama}</td>
                    <td><span className="badge-jenis">{item.jenis}</span></td>
                    <td>{item.peserta}</td>
                    <td>{item.jadwal}</td>
                    <td>
                      <div className="pembimbing-info">
                        <User size={14} />
                        <span>{item.pembimbing}</span>
                      </div>
                    </td>
                    <td><span className="badge-status aktif">{item.status}</span></td>
                    <td className="action-cell">
                      <button className="btn-edit-small" onClick={() => handleEditKegiatan(item)} title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                          <path d="M4 20h16" />
                        </svg>
                      </button>
                      <button className="btn-delete-small" onClick={() => handleHapusKegiatan(item.id, item.nama)} title="Hapus">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>
                      <button className="btn-lihat-detail" onClick={() => handleLihatDetail(item.id)} title="Lihat Detail">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION INFO ================= */}
          <div className="pagination-info">
            Menampilkan 1 - {filteredData.length} dari {currentData.length} kegiatan
          </div>

        </main>

      </div>

      {/* ================= MODAL TAMBAH/EDIT KEGIATAN ================= */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>{editMode ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h3>
                <p>{editMode ? 'Edit data kegiatan yang dipilih' : `Lengkapi form untuk menambahkan kegiatan ${activeTab === 'ekstrakurikuler' ? 'Ekstrakurikuler' : 'Kokurikuler'} baru`}</p>
              </div>
              <button className="modal-close" onClick={resetModal}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Kegiatan <span className="required">*</span></label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Masukkan nama kegiatan"
                />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jenis Kegiatan <span className="required">*</span></label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">Pilih Jenis</option>
                    {jenisOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Jumlah Peserta <span className="required">*</span></label>
                  <input
                    type="number"
                    name="peserta"
                    value={formData.peserta}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Jumlah peserta"
                  />
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jadwal <span className="required">*</span></label>
                  <input
                    type="text"
                    name="jadwal"
                    value={formData.jadwal}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Contoh: Senin & Rabu"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Pembimbing <span className="required">*</span></label>
                  <input
                    type="text"
                    name="pembimbing"
                    value={formData.pembimbing}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nama pembimbing"
                  />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={resetModal}>
                Batal
              </button>
              <button className="btn-simpan" onClick={editMode ? handleUpdateKegiatan : handleTambahKegiatan}>
                <Save size={16} /> {editMode ? 'Update' : 'Simpan'}
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

export default Ekstrakurikuler;