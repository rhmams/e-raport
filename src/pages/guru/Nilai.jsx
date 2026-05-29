import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  GraduationCap,
  ChevronRight,
  Plus,
  Eye,
  Edit,
  Trash2,
  Save,
  X
} from "lucide-react";
import "./Nilai.css";

function Nilai() {
  const navigate = useNavigate();
  const location = useLocation();
  // Tab: uh, uts, uas, pengetahuan, keterampilan, kokurikuler
  const [activeTab, setActiveTab] = useState('uh');
  
  // State untuk filter kelas di tab kokurikuler
  const [filterKelasKoku, setFilterKelasKoku] = useState('semua');
  const [showModalKoku, setShowModalKoku] = useState(false);
  const [editModeKoku, setEditModeKoku] = useState(false);
  const [currentEditIdKoku, setCurrentEditIdKoku] = useState(null);

  // Data kelas yang diajar (tetap)
  const dataKelas = [
    {
      id: 1,
      kelas: "X-2",
      mapel: "Matematika",
      waliKelas: "Ustadz Ahmad Rahman",
      siswa: 30,
      progress: 83,
      terisi: 25,
      total: 30,
      icon: "📐"
    },
    {
      id: 2,
      kelas: "X-4",
      mapel: "Matematika",
      waliKelas: "Ustadzah Siti Aminah",
      siswa: 8,
      progress: 100,
      terisi: 8,
      total: 8,
      icon: "📏"
    },
    {
      id: 3,
      kelas: "XI-2",
      mapel: "Fisika",
      waliKelas: "Ustadz Muhammad Hasan",
      siswa: 6,
      progress: 67,
      terisi: 4,
      total: 6,
      icon: "⚛️"
    },
    {
      id: 4,
      kelas: "XI-3",
      mapel: "Kimia",
      waliKelas: "Ustadzah Khadijah",
      siswa: 6,
      progress: 70,
      terisi: 4.2,
      total: 6,
      icon: "🧪"
    },
    {
      id: 5,
      kelas: "XI-6",
      mapel: "Bahasa Inggris",
      waliKelas: "Ustadz Abdullah",
      siswa: 6,
      progress: 100,
      terisi: 6,
      total: 6,
      icon: "📚"
    },
    {
      id: 6,
      kelas: "XII-2",
      mapel: "Sejarah",
      waliKelas: "Ustadz Yusuf",
      siswa: 5,
      progress: 100,
      terisi: 5,
      total: 5,
      icon: "🏛️"
    }
  ];

  // ==================== DATA NILAI KOKURIKULER (P5) ====================
  const [dataNilaiKokurikuler, setDataNilaiKokurikuler] = useState([
    {
      id: 1,
      namaSiswa: "Aisyah Putri",
      kelas: "X-2",
      dimensi: "Beriman & Bertakwa",
      subElemen: "Melaksanakan ibadah tepat waktu",
      skor: 4,
      catatan: "Sangat konsisten dalam shalat berjamaah"
    },
    {
      id: 2,
      namaSiswa: "Muhammad Fathan",
      kelas: "X-2",
      dimensi: "Gotong Royong",
      subElemen: "Kerja sama tim dalam projek",
      skor: 3,
      catatan: "Aktif membantu teman, perlu konsistensi"
    },
    {
      id: 3,
      namaSiswa: "Zahra Naila",
      kelas: "XI-2",
      dimensi: "Kreatif",
      subElemen: "Menciptakan produk daur ulang",
      skor: 4,
      catatan: "Ide-ide inovatif, produk berkualitas"
    },
    {
      id: 4,
      namaSiswa: "Rafif Al Ghifari",
      kelas: "XI-2",
      dimensi: "Bernalar Kritis",
      subElemen: "Menganalisis masalah lingkungan",
      skor: 2,
      catatan: "Masih perlu bimbingan dalam pengumpulan data"
    }
  ]);

  // Form state untuk modal kokurikuler
  const [formKoku, setFormKoku] = useState({
    namaSiswa: '',
    kelas: '',
    dimensi: '',
    subElemen: '',
    skor: 4,
    catatan: ''
  });

  // Daftar dimensi P5
  const dimensiOptions = [
    'Beriman & Bertakwa',
    'Mandiri',
    'Bernalar Kritis',
    'Kreatif',
    'Gotong Royong',
    'Berkebinekaan Global'
  ];

  // Helper predikat
  const getPredikat = (skor) => {
    switch(skor) {
      case 1: return { singkat: "MB", panjang: "Mulai Berkembang" };
      case 2: return { singkat: "SB", panjang: "Sedang Berkembang" };
      case 3: return { singkat: "BSH", panjang: "Berkembang Sesuai Harapan" };
      case 4: return { singkat: "SAB", panjang: "Sangat Berkembang" };
      default: return { singkat: "-", panjang: "-" };
    }
  };

  // Filter data kokurikuler berdasarkan kelas
  const filteredKokurikuler = filterKelasKoku === 'semua'
    ? dataNilaiKokurikuler
    : dataNilaiKokurikuler.filter(item => item.kelas === filterKelasKoku);

  // Daftar kelas unik untuk filter
  const kelasOptionsKoku = ['semua', ...new Set(dataNilaiKokurikuler.map(item => item.kelas))];

  // CRUD functions untuk kokurikuler
  const handleInputKokuChange = (e) => {
    const { name, value } = e.target;
    setFormKoku(prev => ({ ...prev, [name]: value }));
  };

  const resetModalKoku = () => {
    setFormKoku({
      namaSiswa: '',
      kelas: '',
      dimensi: '',
      subElemen: '',
      skor: 4,
      catatan: ''
    });
    setEditModeKoku(false);
    setCurrentEditIdKoku(null);
    setShowModalKoku(false);
  };

  const handleTambahKoku = () => {
    if (!formKoku.namaSiswa || !formKoku.kelas || !formKoku.dimensi || !formKoku.subElemen) {
      alert('Mohon lengkapi data!');
      return;
    }
    const newId = Math.max(...dataNilaiKokurikuler.map(item => item.id), 0) + 1;
    const newData = { ...formKoku, id: newId, skor: parseInt(formKoku.skor) };
    setDataNilaiKokurikuler([...dataNilaiKokurikuler, newData]);
    resetModalKoku();
    alert('Data nilai kokurikuler berhasil ditambahkan!');
  };

  const handleEditKoku = (item) => {
    setEditModeKoku(true);
    setCurrentEditIdKoku(item.id);
    setFormKoku({
      namaSiswa: item.namaSiswa,
      kelas: item.kelas,
      dimensi: item.dimensi,
      subElemen: item.subElemen,
      skor: item.skor,
      catatan: item.catatan || ''
    });
    setShowModalKoku(true);
  };

  const handleUpdateKoku = () => {
    const updatedData = dataNilaiKokurikuler.map(item =>
      item.id === currentEditIdKoku
        ? { ...item, ...formKoku, skor: parseInt(formKoku.skor) }
        : item
    );
    setDataNilaiKokurikuler(updatedData);
    resetModalKoku();
    alert('Data nilai kokurikuler berhasil diupdate!');
  };

  const handleHapusKoku = (id, nama) => {
    if (window.confirm(`Yakin ingin menghapus data siswa "${nama}"?`)) {
      const newData = dataNilaiKokurikuler.filter(item => item.id !== id);
      setDataNilaiKokurikuler(newData);
      alert('Data berhasil dihapus!');
    }
  };

  // Data untuk tab lain (UH, UTS, UAS, Pengetahuan, Keterampilan) tetap menggunakan card kelas
  const getDataForTab = () => {
    switch(activeTab) {
      case 'uh':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: kelas.progress === 100 ? 87 : kelas.progress - 5,
          terisi: kelas.progress === 100 ? 26 : kelas.terisi - 1
        }));
      case 'uts':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: kelas.progress === 100 ? 73 : kelas.progress - 10,
          terisi: kelas.progress === 100 ? 22 : kelas.terisi - 2
        }));
      case 'uas':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: kelas.progress,
          terisi: kelas.terisi
        }));
      case 'pengetahuan':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: Math.min(100, Math.floor(kelas.progress * 0.7 + 10)),
          terisi: Math.floor(kelas.terisi * 0.7)
        }));
      case 'keterampilan':
        return dataKelas.map(kelas => ({
          ...kelas,
          progress: Math.min(100, Math.floor(kelas.progress * 0.8 + 5)),
          terisi: Math.floor(kelas.terisi * 0.8)
        }));
      default:
        return dataKelas;
    }
  };

  const displayedData = getDataForTab();

  const getStats = () => {
    const totalSiswa = displayedData.reduce((acc, curr) => acc + curr.siswa, 0);
    const totalTerisi = displayedData.reduce((acc, curr) => acc + curr.terisi, 0);
    const persentase = totalSiswa === 0 ? 0 : ((totalTerisi / totalSiswa) * 100).toFixed(1);
    return {
      totalKelas: displayedData.length,
      totalSiswa,
      persentase,
      terisi: totalTerisi.toFixed(0),
      total: totalSiswa
    };
  };

  const stats = getStats();

  const getTabTitle = () => {
    switch(activeTab) {
      case 'uh': return 'Ulangan Harian';
      case 'uts': return 'Ujian Tengah Semester (UTS)';
      case 'uas': return 'Ujian Akhir Semester (UAS)';
      case 'pengetahuan': return 'Pengetahuan';
      case 'keterampilan': return 'Keterampilan';
      case 'kokurikuler': return 'Kokurikuler (P5)';
      default: return 'Penilaian';
    }
  };

  // Navigasi
  const goToBeranda = () => navigate('/');
  const goToKelas = () => navigate('/kelas');
  const goToWaliKelas = () => navigate('/wali-kelas');
  const goToEkstrakurikuler = () => navigate('/ekstrakurikuler');
  const goToNilai = () => navigate('/nilai');
  const goToRaport = () => navigate('/raport');
  const handleInputNilai = (kelasId, jenis) => {
    navigate(`/nilai/input/${kelasId}/${jenis}`);
  };

  return (
    <div className="page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <img src="/logo-madinah.png" alt="Madinah Al-Quds" style={{ width: '40px', height: '40px', borderRadius: '8px' }} className="navbar-logo" />
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">Guru <ChevronRight size={12} /> Nilai</div>
            </div>
          </div>
          <div className="nav-profile">
            <div className="avatar-nav">UA</div>
            <div className="profile-text"><strong>Ustadz Ahmad</strong><p>Guru</p></div>
          </div>
        </div>
      </header>

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div>
            <ul className="menu">
              <li className={location.pathname === '/' || location.pathname === '/beranda' ? 'active' : ''} onClick={goToBeranda}><LayoutDashboard size={18}/> Beranda</li>
              <li className={location.pathname.startsWith('/kelas') && !location.pathname.includes('/kelas/') ? 'active' : ''} onClick={goToKelas}><BookOpen size={18}/> Kelas</li>
              <li className={location.pathname === '/wali-kelas' ? 'active' : ''} onClick={goToWaliKelas}><Users size={18}/> Wali Kelas</li>
              <li className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} onClick={goToEkstrakurikuler}><ClipboardList size={18}/> Ekstrakurikuler</li>
              <li className={location.pathname === '/nilai' ? 'active' : ''} onClick={goToNilai}><GraduationCap size={18}/> Nilai</li>
              <li className={location.pathname === '/raport' ? 'active' : ''} onClick={goToRaport}><FileText size={18}/> Raport</li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}><LogOut size={18}/> Keluar</div>
        </aside>

        {/* MAIN */}
        <main className="main nilai-main">
          <div className="container">
            <div className="nilai-header">
              <h1>Penilaian</h1>
              <p className="subtitle">Kelola dan input nilai siswa untuk semua kelas yang Anda ajar</p>
            </div>

            {/* TABS - Tambah tab Kokurikuler */}
            <div className="nilai-tabs">
              <button className={`tab-btn ${activeTab === 'uh' ? 'active' : ''}`} onClick={() => setActiveTab('uh')}>Ulangan Harian</button>
              <button className={`tab-btn ${activeTab === 'uts' ? 'active' : ''}`} onClick={() => setActiveTab('uts')}>Ujian Tengah Semester (UTS)</button>
              <button className={`tab-btn ${activeTab === 'uas' ? 'active' : ''}`} onClick={() => setActiveTab('uas')}>Ujian Akhir Semester (UAS)</button>
              <button className={`tab-btn ${activeTab === 'pengetahuan' ? 'active' : ''}`} onClick={() => setActiveTab('pengetahuan')}>Pengetahuan</button>
              <button className={`tab-btn ${activeTab === 'keterampilan' ? 'active' : ''}`} onClick={() => setActiveTab('keterampilan')}>Keterampilan</button>
              <button className={`tab-btn ${activeTab === 'kokurikuler' ? 'active' : ''}`} onClick={() => setActiveTab('kokurikuler')}>Kokurikuler (P5)</button>
            </div>

            {/* KONTEN BERDASARKAN TAB */}
            {activeTab === 'kokurikuler' ? (
              // ================= TABEL KOKURIKULER =================
              <div className="kokurikuler-section">
                {/* Keterangan Predikat */}
                <div className="keterangan-predikat" style={{ marginBottom: '20px', padding: '12px', background: '#eef2f7', borderRadius: '8px', fontSize: '13px' }}>
                  <strong>📊 Keterangan Predikat:</strong><br />
                  <span style={{ marginRight: '20px' }}>🔹 MB (1) = Mulai Berkembang</span>
                  <span style={{ marginRight: '20px' }}>🔹 SB (2) = Sedang Berkembang</span>
                  <span style={{ marginRight: '20px' }}>🔹 BSH (3) = Berkembang Sesuai Harapan</span>
                  <span>🔹 SAB (4) = Sangat Berkembang</span>
                </div>

                {/* Filter Kelas dan Tombol Tambah */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label style={{ fontWeight: 500 }}>Filter Kelas:</label>
                    <select value={filterKelasKoku} onChange={(e) => setFilterKelasKoku(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd' }}>
                      {kelasOptionsKoku.map(k => <option key={k} value={k}>{k === 'semua' ? 'Semua Kelas' : `Kelas ${k}`}</option>)}
                    </select>
                  </div>
                  <button className="btn-tambah" onClick={() => { setEditModeKoku(false); setShowModalKoku(true); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#16a085', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    <Plus size={16} /> Tambah Data Siswa
                  </button>
                </div>

                {/* Tabel Nilai Kokurikuler */}
                <div className="table-container" style={{ overflowX: 'auto' }}>
                  <table className="nilai-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>No</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Nama Siswa</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Kelas</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Dimensi P5</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Sub-Elemen yang Dinilai</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Skor Awal (1-4)</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Predikat Akhir</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Catatan Perilaku / Deskripsi</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKokurikuler.map((item, idx) => {
                        const predikat = getPredikat(item.skor);
                        return (
                          <tr key={item.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'center' }}>{idx+1}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>{item.namaSiswa}</strong></td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.kelas}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.dimensi}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.subElemen}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'center' }}>{item.skor}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                              <span className={`predikat-badge ${predikat.singkat.toLowerCase()}`} style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, background: '#e6f7f0', color: '#16a085' }}>
                                {predikat.singkat}
                              </span>
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.catatan}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                              <button onClick={() => handleEditKoku(item)} style={{ marginRight: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#3498db' }}><Edit size={16} /></button>
                              <button onClick={() => handleHapusKoku(item.id, item.namaSiswa)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c' }}><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredKokurikuler.length === 0 && (
                        <tr><td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>Tidak ada data untuk kelas ini.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pagination-info" style={{ marginTop: '16px', textAlign: 'right', fontSize: '14px', color: '#6c757d' }}>
                  Menampilkan {filteredKokurikuler.length} dari {dataNilaiKokurikuler.length} data
                </div>
              </div>
            ) : (
              // ================= TAMPILAN CARD KELAS UNTUK TAB LAIN =================
              <>
                <div className="stats-container">
                  <div className="stats-left">
                    <div className="stat-item"><span className="stat-label">Total Kelas:</span><span className="stat-value">{stats.totalKelas}</span></div>
                    <div className="stat-item"><span className="stat-label">Total Siswa:</span><span className="stat-value">{stats.totalSiswa}</span></div>
                  </div>
                  <div className="stats-right">
                    <div className="nilai-terisi">
                      <div className="nilai-persentase">{stats.persentase}%</div>
                      <div className="nilai-keterangan"><span>{stats.terisi} dari {stats.total} siswa</span></div>
                    </div>
                  </div>
                </div>
                <div className="kelas-nilai-grid">
                  {displayedData.map((kelas) => (
                    <div key={kelas.id} className="kelas-nilai-card">
                      <div className="kelas-header">
                        <div className="kelas-icon">{kelas.icon}</div>
                        <div className="kelas-title"><h3>Kelas {kelas.kelas} - {kelas.mapel}</h3><span className="kelas-badge">{kelas.kelas}</span></div>
                      </div>
                      <div className="kelas-content">
                        <div className="info-proses">
                          <div className="info-icon">📋</div>
                          <div className="info-text"><p>{kelas.siswa} Siswa</p><p className="wali">{kelas.waliKelas}</p></div>
                        </div>
                        <div className="progress-section">
                          <div className="progress-label"><span>Progress Penilaian {getTabTitle()}</span><span className="progress-value">{kelas.terisi}/{kelas.siswa} ({kelas.progress}%)</span></div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${kelas.progress}%` }}></div></div>
                        </div>
                        <button className="btn-input-nilai" onClick={() => handleInputNilai(kelas.id, activeTab)}><Plus size={16} /> Input Nilai {getTabTitle()}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* MODAL TAMBAH/EDIT KOKURIKULER */}
      {showModalKoku && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetModalKoku()} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-box" style={{ background: 'white', borderRadius: '12px', width: '500px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #eee' }}>
              <div><h3>{editModeKoku ? 'Edit Data Nilai Kokurikuler' : 'Tambah Data Nilai Kokurikuler'}</h3><p>{editModeKoku ? 'Ubah data nilai siswa' : 'Isi form untuk menambahkan nilai baru'}</p></div>
              <button className="modal-close" onClick={resetModalKoku} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <div className="modal-form-group" style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Nama Siswa *</label><input type="text" name="namaSiswa" value={formKoku.namaSiswa} onChange={handleInputKokuChange} className="form-control" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
              <div className="modal-form-group" style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Kelas *</label><input type="text" name="kelas" value={formKoku.kelas} onChange={handleInputKokuChange} className="form-control" placeholder="Contoh: X-2" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
              <div className="modal-form-group" style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Dimensi P5 *</label><select name="dimensi" value={formKoku.dimensi} onChange={handleInputKokuChange} className="form-control" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}><option value="">Pilih Dimensi</option>{dimensiOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
              <div className="modal-form-group" style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Sub-Elemen yang Dinilai *</label><input type="text" name="subElemen" value={formKoku.subElemen} onChange={handleInputKokuChange} className="form-control" placeholder="Contoh: Melaksanakan ibadah tepat waktu" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
              <div className="modal-form-group" style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Skor Awal (1-4) *</label><select name="skor" value={formKoku.skor} onChange={handleInputKokuChange} className="form-control" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}><option value="1">1 - Mulai Berkembang (MB)</option><option value="2">2 - Sedang Berkembang (SB)</option><option value="3">3 - Berkembang Sesuai Harapan (BSH)</option><option value="4">4 - Sangat Berkembang (SAB)</option></select></div>
              <div className="modal-form-group" style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Catatan Perilaku / Deskripsi</label><textarea name="catatan" value={formKoku.catatan} onChange={handleInputKokuChange} className="form-control" rows="3" placeholder="Catatan tambahan..." style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
            </div>
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 20px', borderTop: '1px solid #eee' }}>
              <button className="btn-batal" onClick={resetModalKoku} style={{ padding: '8px 16px', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Batal</button>
              <button className="btn-simpan" onClick={editModeKoku ? handleUpdateKoku : handleTambahKoku} style={{ padding: '8px 16px', background: '#16a085', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><Save size={16} /> {editModeKoku ? 'Update' : 'Simpan'}</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section footer-logo"><img src="/logo-madinah.png" alt="Logo Madinah" className="footer-logo-img" /><h3 className="footer-brand">Madinah El - Quds</h3></div>
            <div className="footer-section"><h4>Hubungi Kami</h4><p><MapPinned size={18} /> Jl. Pendidikan No. 123, Kota Santri, Indonesia</p><p><Phone size={18} /><a href="tel:+622112345678">+62 21 1234-5678</a></p><p><Mail size={18} /><a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a></p></div>
            <div className="footer-section"><h4>Jam Layanan</h4><p><ClockIcon size={18}/> Senin - Jumat: 07:00 - 16:00</p><p><ClockIcon size={18}/> Sabtu: 07:00 - 14:00</p><p><ClockIcon size={18}/> Minggu: Tutup</p></div>
          </div>
          <div className="footer-bottom"><p>© 2026 Pondok Pesantren Madinah Al-Quds. Semua Hak Dilindungi.</p></div>
        </div>
      </footer>
    </div>
  );
}

export default Nilai;