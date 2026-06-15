// src/pages/guru/DetailKokurikuler.jsx
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
  Edit,
  Save,
  Printer,
  GraduationCap,
  Trash2,
  Plus,
  X,
  Brain,
  Wrench,
  Sparkles,
  Heart,
  Scale,
  ChevronDown
} from "lucide-react";

import "./DetailKokurikuler.css";
import { useNavigate } from 'react-router-dom';

function DetailKokurikuler() {
  const navigate = useNavigate();
  const [filterKelas, setFilterKelas] = useState('semua');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [rencanaDropdownOpen, setRencanaDropdownOpen] = useState(true);

  // Data nilai kokurikuler (skor hanya 1-4)
  const [dataNilai, setDataNilai] = useState([
    { id: 1, namaSiswa: "Aisyah Putri", kelas: "7A", tema: "Gaya Hidup Berkelanjutan", subElemen: "Mengidentifikasi masalah lingkungan", skor: 4, catatan: "Aktif dalam diskusi kelompok" },
    { id: 2, namaSiswa: "Muhammad Fathan", kelas: "7A", tema: "Gaya Hidup Berkelanjutan", subElemen: "Mendesain produk daur ulang", skor: 3, catatan: "Kreatif namun perlu ketelitian" },
    { id: 3, namaSiswa: "Zahra Naila", kelas: "8A", tema: "Kearifan Lokal", subElemen: "Eksplorasi budaya Betawi", skor: 4, catatan: "Menjadi ketua kelompok" },
    { id: 4, namaSiswa: "Rafif Al Ghifari", kelas: "8A", tema: "Kearifan Lokal", subElemen: "Presentasi hasil pameran", skor: 3, catatan: "Percaya diri saat presentasi" },
    { id: 5, namaSiswa: "Khadijah Azzahra", kelas: "9A", tema: "Kewirausahaan", subElemen: "Membuat produk kreatif", skor: 4, catatan: "Inovatif dan rajin" },
    { id: 6, namaSiswa: "Umar Faruq", kelas: "7B", tema: "Gaya Hidup Berkelanjutan", subElemen: "Pengelolaan sampah plastik", skor: 2, catatan: "Perlu bimbingan lebih" },
    { id: 7, namaSiswa: "Fatimah Azzahra", kelas: "7C", tema: "Gaya Hidup Berkelanjutan", subElemen: "Membuat ecobrick", skor: 4, catatan: "Karya terbaik se-kelas" },
    { id: 8, namaSiswa: "Abdurrahman", kelas: "8B", tema: "Kearifan Lokal", subElemen: "Mempelajari tari tradisional", skor: 3, catatan: "Semangat berlatih" },
    { id: 9, namaSiswa: "Hafizh", kelas: "9B", tema: "Kewirausahaan", subElemen: "Promosi produk", skor: 2, catatan: "Perlu meningkatkan komunikasi" },
    { id: 10, namaSiswa: "Naila", kelas: "9C", tema: "Kewirausahaan", subElemen: "Manajemen keuangan sederhana", skor: 4, catatan: "Teliti dan bertanggung jawab" },
  ]);

  // Form state untuk modal tambah/edit
  const [formData, setFormData] = useState({
    namaSiswa: '',
    kelas: '',
    tema: '',
    subElemen: '',
    skor: 4,
    catatan: ''
  });

  // Fungsi untuk mengubah skor ke predikat
  const getPredikat = (skor) => {
    switch(skor) {
      case 1: return { singkat: "MB", panjang: "Mulai Berkembang" };
      case 2: return { singkat: "SB", panjang: "Sedang Berkembang" };
      case 3: return { singkat: "BSH", panjang: "Berkembang Sesuai Harapan" };
      case 4: return { singkat: "SAB", panjang: "Sangat Berkembang" };
      default: return { singkat: "-", panjang: "-" };
    }
  };

  // Filter data berdasarkan kelas
  const filteredData = filterKelas === 'semua' 
    ? dataNilai 
    : dataNilai.filter(item => item.kelas === filterKelas);

  // Daftar kelas unik untuk dropdown filter
  const kelasOptions = ['semua', ...new Set(dataNilai.map(item => item.kelas))];

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset modal
  const resetModal = () => {
    setFormData({
      namaSiswa: '',
      kelas: '',
      tema: '',
      subElemen: '',
      skor: 4,
      catatan: ''
    });
    setEditMode(false);
    setCurrentEditId(null);
    setShowModal(false);
  };

  // Tambah data baru
  const handleTambah = () => {
    if (!formData.namaSiswa || !formData.kelas || !formData.tema || !formData.subElemen) {
      alert('Mohon lengkapi data!');
      return;
    }
    const newId = Math.max(...dataNilai.map(item => item.id), 0) + 1;
    const newData = { ...formData, id: newId, skor: parseInt(formData.skor) };
    setDataNilai([...dataNilai, newData]);
    resetModal();
    alert('Data berhasil ditambahkan!');
  };

  // Edit data (buka modal dengan data yang dipilih)
  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentEditId(item.id);
    setFormData({
      namaSiswa: item.namaSiswa,
      kelas: item.kelas,
      tema: item.tema,
      subElemen: item.subElemen,
      skor: item.skor,
      catatan: item.catatan || ''
    });
    setShowModal(true);
  };

  // Update data
  const handleUpdate = () => {
    const updatedData = dataNilai.map(item =>
      item.id === currentEditId
        ? { ...item, ...formData, skor: parseInt(formData.skor) }
        : item
    );
    setDataNilai(updatedData);
    resetModal();
    alert('Data berhasil diupdate!');
  };

  // Hapus data
  const handleHapus = (id, nama) => {
    if (window.confirm(`Yakin ingin menghapus data siswa "${nama}"?`)) {
      const newData = dataNilai.filter(item => item.id !== id);
      setDataNilai(newData);
      alert('Data berhasil dihapus!');
    }
  };

  return (
    <div className="page detail-kokurikuler-page">

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

              {/* DROPDOWN RENCANA PENILAIAN */}
              <div className="dropdown-wrapper">
                <div className="dropdown-header" onClick={() => setRencanaDropdownOpen(prev => !prev)}>
                  <FileText size={18} />
                  <span className="dropdown-label">Rencana Penilaian</span>
                  <ChevronDown size={16} className={`dropdown-arrow ${rencanaDropdownOpen ? 'open' : ''}`} />
                </div>
                {rencanaDropdownOpen && (
                  <ul className="dropdown-list">
                    <li className="dropdown-item" onClick={() => navigate('/rencana-nilai-pengetahuan')}>
                      <Brain size={14} /> <span>Rencana Nilai Pengetahuan</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/rencana-penilaian-keterampilan')}>
                      <Wrench size={14} /> <span>Rencana Penilaian Keterampilan</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/observatif-karakter-spiritual')}>
                      <Sparkles size={14} /> <span>Rencana KD/Butir Spiritual</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/observatif-karakter-sosial')}>
                      <Heart size={14} /> <span>Rencana KD/Butir Sosial</span>
                    </li>
                    <li className="dropdown-item" onClick={() => navigate('/rencana-bobot-ujian')}>
                      <Scale size={14} /> <span>Rencana Bobot PH PTS & PAS</span>
                    </li>
                  </ul>
                )}
              </div>

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
              <button className="btn-back" onClick={() => navigate('/ekstrakurikuler')} title="Kembali">
                ←
              </button>
              <div>
                <h1>Detail Nilai Kokurikuler</h1>
                <p className="subtitle">Kelola nilai projek P5 dan kegiatan kokurikuler per siswa</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn-tambah" onClick={() => { setEditMode(false); setShowModal(true); }}>
                <Plus size={16} /> Tambah Data
              </button>
              <button className="btn-print">
                <Printer size={16} /> Cetak
              </button>
            </div>
          </div>

          {/* ================= KETERANGAN PREDIKAT (DI ATAS TABEL) ================= */}
          <div className="keterangan-predikat" style={{ marginBottom: '20px', padding: '12px', background: '#eef2f7', borderRadius: '8px', fontSize: '13px', borderLeft: '4px solid #3498db' }}>
            <strong>📊 Keterangan Predikat:</strong><br />
            <span style={{ marginRight: '20px' }}>🔹 MB (1) = Mulai Berkembang</span>
            <span style={{ marginRight: '20px' }}>🔹 SB (2) = Sedang Berkembang</span>
            <span style={{ marginRight: '20px' }}>🔹 BSH (3) = Berkembang Sesuai Harapan</span>
            <span>🔹 SAB (4) = Sangat Berkembang</span>
          </div>

          {/* ================= FILTER KELAS ================= */}
          <div className="filter-kelas-container" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <label style={{ fontWeight: 500 }}>Filter Kelas:</label>
            <select 
              value={filterKelas} 
              onChange={(e) => setFilterKelas(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd' }}
            >
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>
                  {kelas === 'semua' ? 'Semua Kelas' : `Kelas ${kelas}`}
                </option>
              ))}
            </select>
          </div>

          {/* ================= TABEL NILAI KOKURIKULER ================= */}
          <div className="nilai-table-wrapper">
            <table className="nilai-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Siswa</th>
                  <th>Kelas</th>
                  <th>Tema</th>
                  <th>Sub elemen yang dinilai</th>
                  <th>Skor awal</th>
                  <th>Predikat akhir</th>
                  <th>Catatan perilaku/deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  const predikat = getPredikat(item.skor);
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td><strong>{item.namaSiswa}</strong></td>
                      <td>{item.kelas}</td>
                      <td>{item.tema}</td>
                      <td>{item.subElemen}</td>
                      <td>{item.skor}</td>
                      <td>
                        <span className={`predikat-badge ${predikat.singkat.toLowerCase()}`}>
                          {predikat.singkat}
                        </span>
                      </td>
                      <td>{item.catatan}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-edit-small" onClick={() => handleEdit(item)} title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="btn-delete-small" onClick={() => handleHapus(item.id, item.namaSiswa)} title="Hapus">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                      Tidak ada data untuk kelas ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION INFO ================= */}
          <div className="pagination-info">
            Menampilkan {filteredData.length} dari {dataNilai.length} siswa
          </div>

        </main>

      </div>

      {/* ================= MODAL TAMBAH/EDIT DATA ================= */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetModal()}>
          <div className="modal-box" style={{ width: '500px' }}>
            <div className="modal-header">
              <div>
                <h3>{editMode ? 'Edit Data Nilai' : 'Tambah Data Nilai'}</h3>
                <p>{editMode ? 'Ubah data nilai siswa' : 'Isi form untuk menambahkan nilai baru'}</p>
              </div>
              <button className="modal-close" onClick={resetModal}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Siswa <span className="required">*</span></label>
                <input type="text" name="namaSiswa" value={formData.namaSiswa} onChange={handleInputChange} className="form-control" placeholder="Masukkan nama siswa" />
              </div>
              <div className="modal-form-group">
                <label>Kelas <span className="required">*</span></label>
                <input type="text" name="kelas" value={formData.kelas} onChange={handleInputChange} className="form-control" placeholder="Contoh: 7A" />
              </div>
              <div className="modal-form-group">
                <label>Tema <span className="required">*</span></label>
                <input type="text" name="tema" value={formData.tema} onChange={handleInputChange} className="form-control" placeholder="Contoh: Gaya Hidup Berkelanjutan" />
              </div>
              <div className="modal-form-group">
                <label>Sub elemen yang dinilai <span className="required">*</span></label>
                <input type="text" name="subElemen" value={formData.subElemen} onChange={handleInputChange} className="form-control" placeholder="Contoh: Mengidentifikasi masalah lingkungan" />
              </div>
              <div className="modal-form-group">
                <label>Skor awal (1-4) <span className="required">*</span></label>
                <select name="skor" value={formData.skor} onChange={handleInputChange} className="form-control">
                  <option value="1">1 - Mulai Berkembang (MB)</option>
                  <option value="2">2 - Sedang Berkembang (SB)</option>
                  <option value="3">3 - Berkembang Sesuai Harapan (BSH)</option>
                  <option value="4">4 - Sangat Berkembang (SAB)</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Catatan perilaku/deskripsi</label>
                <textarea name="catatan" value={formData.catatan} onChange={handleInputChange} className="form-control" rows="3" placeholder="Catatan tambahan..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={resetModal}>Batal</button>
              <button className="btn-simpan" onClick={editMode ? handleUpdate : handleTambah}>
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

export default DetailKokurikuler;