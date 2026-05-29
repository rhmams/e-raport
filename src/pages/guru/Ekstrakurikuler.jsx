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
  Save,
  FileCheck,
  Target,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";

import "./Ekstrakurikuler.css";
import { useNavigate, useLocation } from 'react-router-dom';

function Ekstrakurikuler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('kokurikuler'); // default ke kokurikuler
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // ==================== DATA EKSTRAKURIKULER ====================
  const [dataEkstra, setDataEkstra] = useState([
    { id: 1, nama: "Kompetisi Tilawah", jenis: "Keagamaan", peserta: 45, jadwal: "Setiap Jumat", pembimbing: "Ustadz Ahmad", status: "Aktif" },
    { id: 2, nama: "Klub Debat Bahasa Arab", jenis: "Akademik", peserta: 28, jadwal: "Selasa & Kamis", pembimbing: "Ustadz Muhammad", status: "Aktif" },
    { id: 3, nama: "Kaligrafi Islam", jenis: "Seni", peserta: 32, jadwal: "Rabu", pembimbing: "Ustadzah Fatimah", status: "Aktif" },
    { id: 4, nama: "Panitia Amal", jenis: "Sosial", peserta: 52, jadwal: "Bulanan", pembimbing: "Ustadzah Khadijah", status: "Aktif" },
    { id: 5, nama: "Paduan Suara Nasheed", jenis: "Seni", peserta: 38, jadwal: "Senin & Jumat", pembimbing: "Ustadz Umar", status: "Aktif" },
    { id: 6, nama: "Olahraga & Kebugaran", jenis: "Fisik", peserta: 65, jadwal: "Harian", pembimbing: "Ustadz Abdulrahman", status: "Aktif" }
  ]);

  // ==================== DATA KOKURIKULER (PROJEK/KEGIATAN) ====================
  const [dataKokurikuler, setDataKokurikuler] = useState([
    {
      id: 101,
      namaKegiatan: "Projek Gaya Hidup Berkelanjutan",
      bentuk: "Projek P5",
      tema: "Gaya Hidup Berkelanjutan",
      kelas: "7A, 7B, 7C",
      semester: "Ganjil 2025/2026",
      tanggalMulai: "2025-08-01",
      tanggalSelesai: "2025-09-15",
      status: "Berlangsung",
      dimensi: ["Bernalar Kritis", "Kreatif", "Gotong Royong"],
      deskripsiUmum: "Siswa membuat produk daur ulang dari sampah plastik"
    },
    {
      id: 102,
      namaKegiatan: "Pameran Kearifan Lokal",
      bentuk: "Projek P5",
      tema: "Kearifan Lokal",
      kelas: "8A, 8B",
      semester: "Ganjil 2025/2026",
      tanggalMulai: "2025-09-01",
      tanggalSelesai: "2025-10-20",
      status: "Berlangsung",
      dimensi: ["Kreatif", "Berkebinekaan Global", "Mandiri"],
      deskripsiUmum: "Eksplorasi dan pameran budaya Betawi"
    },
    {
      id: 103,
      namaKegiatan: "Gerakan 7 Kebiasaan",
      bentuk: "Gerakan 7 Kebiasaan",
      tema: "Bangunlah Jiwa dan Raganya",
      kelas: "Semua Kelas",
      semester: "Ganjil 2025/2026",
      tanggalMulai: "2025-07-15",
      tanggalSelesai: "2025-12-15",
      status: "Berlangsung",
      dimensi: ["Mandiri", "Beriman & Bertakwa", "Bernalar Kritis"],
      deskripsiUmum: "Pembiasaan bangun pagi, shalat tepat waktu, dan pola hidup sehat"
    },
    {
      id: 104,
      namaKegiatan: "Bazar Kewirausahaan",
      bentuk: "Projek P5",
      tema: "Kewirausahaan",
      kelas: "9A, 9B, 9C",
      semester: "Genap 2025/2026",
      tanggalMulai: "2026-01-10",
      tanggalSelesai: "2026-02-28",
      status: "Rencana",
      dimensi: ["Kreatif", "Mandiri", "Gotong Royong"],
      deskripsiUmum: "Siswa membuat dan menjual produk hasil kreativitas"
    }
  ]);

  // Form state untuk modal kegiatan Kokurikuler
  const [formData, setFormData] = useState({
    namaKegiatan: '',
    bentuk: 'Projek P5',
    tema: '',
    kelas: '',
    semester: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    status: 'Rencana',
    dimensi: [],
    deskripsiUmum: ''
  });

  // Form state untuk ekstrakurikuler (edit/tambah)
  const [formEkstra, setFormEkstra] = useState({
    nama: '',
    jenis: '',
    peserta: '',
    jadwal: '',
    pembimbing: '',
    status: 'Aktif'
  });

  const bentukOptions = ['Projek P5', 'Gerakan 7 Kebiasaan', 'Studi Lapangan', 'Praktik Kewirausahaan', 'Bakti Sosial', 'Lainnya'];
  const temaP5Options = [
    'Gaya Hidup Berkelanjutan',
    'Kearifan Lokal',
    'Bhinneka Tunggal Ika',
    'Bangunlah Jiwa dan Raganya',
    'Suara Demokrasi',
    'Rekayasa dan Teknologi',
    'Kewirausahaan',
    'Kebekerjaan'
  ];
  const statusKegiatanOptions = ['Rencana', 'Berlangsung', 'Selesai', 'Ditiadakan'];

  // Filter data
  const filteredKokurikuler = dataKokurikuler.filter(item =>
    item.namaKegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.bentuk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEkstra = dataEkstra.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistik
  const totalKegiatanKokurikuler = dataKokurikuler.length;
  const kegiatanBerlangsung = dataKokurikuler.filter(k => k.status === 'Berlangsung').length;
  const kegiatanSelesai = dataKokurikuler.filter(k => k.status === 'Selesai').length;
  const totalPesertaEkstra = dataEkstra.reduce((acc, curr) => acc + curr.peserta, 0);
  const programAktifEkstra = dataEkstra.filter(item => item.status === "Aktif").length;

  // Handle form kegiatan kokurikuler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetModalKokurikuler = () => {
    setFormData({
      namaKegiatan: '',
      bentuk: 'Projek P5',
      tema: '',
      kelas: '',
      semester: '',
      tanggalMulai: '',
      tanggalSelesai: '',
      status: 'Rencana',
      dimensi: [],
      deskripsiUmum: ''
    });
    setEditMode(false);
    setCurrentEditId(null);
    setShowModal(false);
  };

  const handleTambahKegiatanKokurikuler = () => {
    if (!formData.namaKegiatan || !formData.bentuk || !formData.semester) {
      alert('Mohon lengkapi field yang diperlukan!');
      return;
    }
    const newId = Math.max(...dataKokurikuler.map(item => item.id), 0) + 1;
    const newKegiatan = {
      id: newId,
      ...formData,
      kelas: formData.kelas || 'Semua Kelas'
    };
    setDataKokurikuler([...dataKokurikuler, newKegiatan]);
    resetModalKokurikuler();
    alert('Kegiatan Kokurikuler berhasil ditambahkan!');
  };

  const handleEditKegiatanKokurikuler = (item) => {
    setEditMode(true);
    setCurrentEditId(item.id);
    setFormData({
      namaKegiatan: item.namaKegiatan,
      bentuk: item.bentuk,
      tema: item.tema || '',
      kelas: item.kelas,
      semester: item.semester,
      tanggalMulai: item.tanggalMulai || '',
      tanggalSelesai: item.tanggalSelesai || '',
      status: item.status,
      dimensi: item.dimensi || [],
      deskripsiUmum: item.deskripsiUmum || ''
    });
    setShowModal(true);
  };

  const handleUpdateKegiatanKokurikuler = () => {
    const updatedData = dataKokurikuler.map(item =>
      item.id === currentEditId
        ? { ...item, ...formData, kelas: formData.kelas || 'Semua Kelas' }
        : item
    );
    setDataKokurikuler(updatedData);
    resetModalKokurikuler();
    alert('Kegiatan Kokurikuler berhasil diupdate!');
  };

  const handleHapusKegiatan = (id, nama) => {
    if (window.confirm(`Yakin ingin menghapus kegiatan "${nama}"?`)) {
      const newData = dataKokurikuler.filter(item => item.id !== id);
      setDataKokurikuler(newData);
      alert(`Kegiatan "${nama}" berhasil dihapus!`);
    }
  };

  const handleLihatDetail = (itemId) => {
    navigate(`/kokurikuler/${itemId}`);
  };

  // Handler untuk ekstrakurikuler
  const resetModalEkstra = () => {
    setFormEkstra({
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

  const handleInputEkstraChange = (e) => {
    const { name, value } = e.target;
    setFormEkstra(prev => ({ ...prev, [name]: value }));
  };

  const handleTambahEkstra = () => {
    if (!formEkstra.nama || !formEkstra.jenis || !formEkstra.peserta || !formEkstra.jadwal || !formEkstra.pembimbing) {
      alert('Mohon lengkapi semua field!');
      return;
    }
    const newId = Math.max(...dataEkstra.map(item => item.id), 0) + 1;
    const newEkstra = { id: newId, ...formEkstra, peserta: parseInt(formEkstra.peserta) };
    setDataEkstra([...dataEkstra, newEkstra]);
    resetModalEkstra();
    alert('Ekstrakurikuler berhasil ditambahkan!');
  };

  const handleEditEkstra = (item) => {
    setEditMode(true);
    setCurrentEditId(item.id);
    setFormEkstra({
      nama: item.nama,
      jenis: item.jenis,
      peserta: item.peserta,
      jadwal: item.jadwal,
      pembimbing: item.pembimbing,
      status: item.status
    });
    setShowModal(true);
  };

  const handleUpdateEkstra = () => {
    const updatedData = dataEkstra.map(item =>
      item.id === currentEditId
        ? { ...item, ...formEkstra, peserta: parseInt(formEkstra.peserta) }
        : item
    );
    setDataEkstra(updatedData);
    resetModalEkstra();
    alert('Ekstrakurikuler berhasil diupdate!');
  };

  const handleHapusEkstra = (id, nama) => {
    if (window.confirm(`Yakin ingin menghapus ekstrakurikuler "${nama}"?`)) {
      const newData = dataEkstra.filter(item => item.id !== id);
      setDataEkstra(newData);
      alert(`Ekstrakurikuler "${nama}" berhasil dihapus!`);
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
              <li className={location.pathname.startsWith('/kelas') ? 'active' : ''} onClick={() => navigate('/kelas')}>
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
              <p className="subtitle">
                {activeTab === 'kokurikuler' 
                  ? 'Kelola Projek P5 dan kegiatan penguatan Profil Pelajar Pancasila (sesuai Permendikbudristek No. 12 Tahun 2024)'
                  : 'Kelola ekstrakurikuler dan pengembangan minat bakat siswa'}
              </p>
            </div>
            <button className="btn-tambah" onClick={() => {
              setEditMode(false);
              if (activeTab === 'kokurikuler') resetModalKokurikuler();
              else resetModalEkstra();
              setShowModal(true);
            }}>
              <Plus size={18} /> {activeTab === 'kokurikuler' ? 'Tambah Projek/Kegiatan' : 'Tambah Ekstrakurikuler'}
            </button>
          </div>

          {/* ================= TAB NAVIGATION ================= */}
          <div className="tab-navigation">
            <div 
              className={`tab-item ${activeTab === 'kokurikuler' ? 'active' : ''}`}
              onClick={() => { setActiveTab('kokurikuler'); setSearchTerm(''); }}
            >
              <FileCheck size={16} /> Kokurikuler (P5 & Projek)
            </div>
            <div 
              className={`tab-item ${activeTab === 'ekstrakurikuler' ? 'active' : ''}`}
              onClick={() => { setActiveTab('ekstrakurikuler'); setSearchTerm(''); }}
            >
              <Target size={16} /> Ekstrakurikuler
            </div>
          </div>

          {/* ================= INFO PENTING KOKURIKULER ================= */}
          {activeTab === 'kokurikuler' && (
            <div className="info-panel">
              <div className="info-panel-header">
                <GraduationCap size={20} />
                <h3>📖 Tentang Kokurikuler (Permendikbudristek No. 12/2024)</h3>
              </div>
              <div className="info-panel-body">
                <p><strong>Kokurikuler</strong> adalah kegiatan penguatan, pendalaman, dan pengayaan kompetensi intrakurikuler.</p>
                <p><strong>Bentuk kegiatan:</strong> Projek Penguatan Profil Pelajar Pancasila (P5), Gerakan 7 Kebiasaan Anak Indonesia Hebat, atau bentuk relevan lainnya.</p>
              </div>
            </div>
          )}

          {/* ================= STATS CARDS ================= */}
          {activeTab === 'kokurikuler' && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#e6f7f0', color: '#16a085' }}>
                  <FileSpreadsheet size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{totalKegiatanKokurikuler}</div>
                  <div className="stat-label">Total Projek/Kegiatan</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#e6f0f7', color: '#3498db' }}>
                  <TrendingUp size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{kegiatanBerlangsung}</div>
                  <div className="stat-label">Kegiatan Berlangsung</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fef3c7', color: '#f39c12' }}>
                  <Award size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{kegiatanSelesai}</div>
                  <div className="stat-label">Kegiatan Selesai</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ekstrakurikuler' && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#e6f7f0', color: '#16a085' }}>
                  <Award size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{dataEkstra.length}</div>
                  <div className="stat-label">Total Ekstrakurikuler</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#e6f0f7', color: '#3498db' }}>
                  <Users size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{totalPesertaEkstra}</div>
                  <div className="stat-label">Total Peserta</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fef3c7', color: '#f39c12' }}>
                  <Calendar size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{programAktifEkstra}</div>
                  <div className="stat-label">Program Aktif</div>
                </div>
              </div>
            </div>
          )}

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
                  placeholder={activeTab === 'kokurikuler' ? "Cari projek/kegiatan..." : "Cari ekstrakurikuler..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn-filter">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          {/* ================= TABEL KOKURIKULER ================= */}
          {activeTab === 'kokurikuler' && (
            <div className="table-container">
              <table className="ekstra-table">
                <thead>
                  <tr>
                    <th>Nama Project</th>
                    <th>Kelas</th>
                    <th>Tema</th>
                    <th>Semester</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKokurikuler.map((item) => (
                    <tr key={item.id}>
                      <td className="nama-kegiatan"><strong>{item.namaKegiatan}</strong></td>
                      <td>{item.kelas}</td>
                      <td>{item.tema || '-'}</td>
                      <td>{item.semester}</td>
                      <td>
                        <span className={`badge-status ${item.status === 'Berlangsung' ? 'aktif' : item.status === 'Selesai' ? 'selesai' : 'rencana'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="action-cell">
                        <button className="btn-edit-small" onClick={() => handleEditKegiatanKokurikuler(item)} title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                            <path d="M4 20h16" />
                          </svg>
                        </button>
                        <button className="btn-delete-small" onClick={() => handleHapusKegiatan(item.id, item.namaKegiatan)} title="Hapus">
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
          )}

          {/* ================= TABEL EKSTRAKURIKULER ================= */}
          {activeTab === 'ekstrakurikuler' && (
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
                  {filteredEkstra.map((item) => (
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
                        <button className="btn-edit-small" onClick={() => handleEditEkstra(item)} title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                            <path d="M4 20h16" />
                          </svg>
                        </button>
                        <button className="btn-delete-small" onClick={() => handleHapusEkstra(item.id, item.nama)} title="Hapus">
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
          )}

          <div className="pagination-info">
            Menampilkan {activeTab === 'kokurikuler' ? filteredKokurikuler.length : filteredEkstra.length} dari {activeTab === 'kokurikuler' ? dataKokurikuler.length : dataEkstra.length} kegiatan
          </div>

        </main>
      </div>

      {/* ================= MODAL TAMBAH/EDIT KOKURIKULER ================= */}
      {showModal && activeTab === 'kokurikuler' && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetModalKokurikuler()}>
          <div className="modal-box modal-large">
            <div className="modal-header">
              <div>
                <h3>{editMode ? 'Edit Kegiatan Kokurikuler' : 'Tambah Kegiatan Kokurikuler'}</h3>
                <p>{editMode ? 'Edit data kegiatan yang dipilih' : 'Lengkapi form untuk menambahkan kegiatan P5/Kokurikuler baru'}</p>
              </div>
              <button className="modal-close" onClick={resetModalKokurikuler}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Project <span className="required">*</span></label>
                <input
                  type="text"
                  name="namaKegiatan"
                  value={formData.namaKegiatan}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Contoh: Projek Gaya Hidup Berkelanjutan"
                />
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Bentuk Kegiatan <span className="required">*</span></label>
                  <select
                    name="bentuk"
                    value={formData.bentuk}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    {bentukOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Tema</label>
                  <select
                    name="tema"
                    value={formData.tema}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">Pilih Tema</option>
                    {temaP5Options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Kelas Target</label>
                  <input
                    type="text"
                    name="kelas"
                    value={formData.kelas}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Contoh: 7A, 7B, 7C atau Semua Kelas"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Semester <span className="required">*</span></label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Contoh: Ganjil 2025/2026"
                  />
                </div>
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Tanggal Mulai</label>
                  <input
                    type="date"
                    name="tanggalMulai"
                    value={formData.tanggalMulai}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Tanggal Selesai</label>
                  <input
                    type="date"
                    name="tanggalSelesai"
                    value={formData.tanggalSelesai}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    {statusKegiatanOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-form-group">
                <label>Deskripsi Umum Kegiatan</label>
                <textarea
                  name="deskripsiUmum"
                  value={formData.deskripsiUmum}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                  placeholder="Jelaskan secara singkat tentang kegiatan ini..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={resetModalKokurikuler}>
                Batal
              </button>
              <button className="btn-simpan" onClick={editMode ? handleUpdateKegiatanKokurikuler : handleTambahKegiatanKokurikuler}>
                <Save size={16} /> {editMode ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL TAMBAH/EDIT EKSTRAKURIKULER ================= */}
      {showModal && activeTab === 'ekstrakurikuler' && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetModalEkstra()}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>{editMode ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler'}</h3>
                <p>{editMode ? 'Edit data ekstrakurikuler yang dipilih' : 'Lengkapi form untuk menambahkan ekstrakurikuler baru'}</p>
              </div>
              <button className="modal-close" onClick={resetModalEkstra}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Kegiatan <span className="required">*</span></label>
                <input
                  type="text"
                  name="nama"
                  value={formEkstra.nama}
                  onChange={handleInputEkstraChange}
                  className="form-control"
                  placeholder="Masukkan nama ekstrakurikuler"
                />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jenis Kegiatan <span className="required">*</span></label>
                  <select
                    name="jenis"
                    value={formEkstra.jenis}
                    onChange={handleInputEkstraChange}
                    className="form-control"
                  >
                    <option value="">Pilih Jenis</option>
                    {['Keagamaan', 'Akademik', 'Seni', 'Sosial', 'Fisik', 'Olahraga'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Jumlah Peserta <span className="required">*</span></label>
                  <input
                    type="number"
                    name="peserta"
                    value={formEkstra.peserta}
                    onChange={handleInputEkstraChange}
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
                    value={formEkstra.jadwal}
                    onChange={handleInputEkstraChange}
                    className="form-control"
                    placeholder="Contoh: Senin & Rabu"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Pembimbing <span className="required">*</span></label>
                  <input
                    type="text"
                    name="pembimbing"
                    value={formEkstra.pembimbing}
                    onChange={handleInputEkstraChange}
                    className="form-control"
                    placeholder="Nama pembimbing"
                  />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formEkstra.status}
                  onChange={handleInputEkstraChange}
                  className="form-control"
                >
                  {['Aktif', 'Nonaktif', 'Selesai'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={resetModalEkstra}>
                Batal
              </button>
              <button className="btn-simpan" onClick={editMode ? handleUpdateEkstra : handleTambahEkstra}>
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