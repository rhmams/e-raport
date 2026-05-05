// src/pages/InputNilai.jsx
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
  User,
  MapPin,
  Plus,
  X,
  Save,
  GraduationCap,
  Calendar,
  CheckCircle,
  AlertCircle,
  Search
} from "lucide-react";

import "./InputNilai.css";
import { useNavigate } from 'react-router-dom';

function InputNilai() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [savingStatus, setSavingStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Data kelas (default)
  const kelasData = {
    namaKelas: 'X-2',
    mapel: 'Matematika',
    semester: 'Ganjil',
    tahunAjaran: '2025/2026',
    waliKelas: 'Ustadz Ahmad Rahman',
    ruang: 'R-102',
    siswa: [
      { id: 1, nis: '12001', nama: 'Ahmad Fauzan', gender: 'L' },
      { id: 2, nis: '12002', nama: 'Budi Santoso', gender: 'L' },
      { id: 3, nis: '12003', nama: 'Citra Dewi', gender: 'P' },
      { id: 4, nis: '12004', nama: 'Dinda Aulia', gender: 'P' },
      { id: 5, nis: '12005', nama: 'Eka Pratama', gender: 'L' },
      { id: 6, nis: '12006', nama: 'Fahmi Hidayat', gender: 'L' },
      { id: 7, nis: '12007', nama: 'Gita Purnama', gender: 'P' },
      { id: 8, nis: '12008', nama: 'Hendra Setiawan', gender: 'L' },
    ]
  };
  
  // State untuk form modal
  const [modulForm, setModulForm] = useState({
    namaModul: '',
    tanggal: new Date().toISOString().split('T')[0],
    kkm: 75
  });

  // State untuk nilai siswa
  const [nilaiSiswa, setNilaiSiswa] = useState({});

  // Filter siswa berdasarkan search
  const filteredSiswa = kelasData.siswa.filter(siswa =>
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    siswa.nis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistik
  const totalSiswa = kelasData.siswa.length;
  const sudahDinilai = Object.keys(nilaiSiswa).filter(id => nilaiSiswa[id]?.nilai).length;
  const belumDinilai = totalSiswa - sudahDinilai;
  const rataRata = sudahDinilai > 0 
    ? Math.round(Object.values(nilaiSiswa).filter(v => v?.nilai).reduce((acc, curr) => acc + (curr.nilai || 0), 0) / sudahDinilai)
    : 0;

  const handleNilaiChange = (siswaId, nilai) => {
    let nilaiValid = nilai === '' ? '' : Math.min(100, Math.max(0, Number(nilai)));
    setNilaiSiswa(prev => ({
      ...prev,
      [siswaId]: {
        ...prev[siswaId],
        nilai: nilaiValid
      }
    }));
  };

  const handleCatatanChange = (siswaId, catatan) => {
    setNilaiSiswa(prev => ({
      ...prev,
      [siswaId]: {
        ...prev[siswaId],
        catatan
      }
    }));
  };

  const getNilaiGrade = (nilai) => {
    if (!nilai && nilai !== 0) return null;
    if (nilai >= 90) return { grade: 'A', color: '#27ae60' };
    if (nilai >= 80) return { grade: 'B', color: '#3498db' };
    if (nilai >= 70) return { grade: 'C', color: '#f39c12' };
    if (nilai >= 60) return { grade: 'D', color: '#e67e22' };
    return { grade: 'E', color: '#e74c3c' };
  };

  const handleSimpanSemua = async () => {
    for (const siswa of kelasData.siswa) {
      setSavingStatus(prev => ({ ...prev, [siswa.id]: 'saving' }));
      await new Promise(resolve => setTimeout(resolve, 100));
      setSavingStatus(prev => ({ ...prev, [siswa.id]: 'success' }));
    }
    setTimeout(() => {
      setSavingStatus({});
      setTimeout(() => {
        setShowModal(false);
        setModulForm({
          namaModul: '',
          tanggal: new Date().toISOString().split('T')[0],
          kkm: 75
        });
        setNilaiSiswa({});
      }, 1500);
    }, 1000);
  };

  const handleSimpanPerSiswa = (siswaId) => {
    setSavingStatus(prev => ({ ...prev, [siswaId]: 'saving' }));
    setTimeout(() => {
      setSavingStatus(prev => ({ ...prev, [siswaId]: 'success' }));
      setTimeout(() => {
        setSavingStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[siswaId];
          return newStatus;
        });
      }, 1500);
    }, 500);
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
                Guru &gt; Nilai &gt; Input Nilai
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
              <li onClick={() => navigate('/beranda')}><LayoutDashboard size={18}/> Beranda</li>
              <li onClick={() => navigate('/kelas')}><BookOpen size={18}/> Kelas</li>
              <li onClick={() => navigate('/wali-kelas')}><Users size={18}/> Wali Kelas</li>
              <li onClick={() => navigate('/ekstrakurikuler')}><ClipboardList size={18}/> Ekstrakurikuler</li>
              <li className="active"><GraduationCap size={18}/> Nilai</li>
              <li onClick={() => navigate('/raport')}><FileText size={18}/> Raport</li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/logout')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">
          
          {/* ================= BACK BUTTON (PANAH BIASA) ================= */}
          <div className="back-button" onClick={() => navigate('/nilai')}>
            ←
          </div>

          {/* ================= HEADER ================= */}
          <div className="header-simple">
            <h1>Input Nilai</h1>
            <div className="info-banner-simple">
              <div className="info-row">
                <User size={16} />
                <span>Wali Kelas: <strong>{kelasData.waliKelas}</strong></span>
              </div>
              <div className="info-row">
                <MapPin size={16} />
                <span>Ruang: <strong>{kelasData.ruang}</strong></span>
              </div>
              <div className="info-row">
                <Calendar size={16} />
                <span>Semester: <strong>{kelasData.semester} {kelasData.tahunAjaran}</strong></span>
              </div>
            </div>
          </div>

          {/* ================= EMPTY STATE ================= */}
          {!showModal && (
            <div className="empty-state-simple">
              <div className="empty-icon-simple">
                <ClipboardList size={64} />
              </div>
              <h3>Belum Ada Data Nilai</h3>
              <p>Klik tombol "Tambah Nilai Baru" untuk mulai menginput nilai siswa</p>
              <button className="btn-tambah-simple" onClick={() => setShowModal(true)}>
                <Plus size={20} /> Tambah Nilai Baru
              </button>
            </div>
          )}

        </main>

      </div>

      {/* ================= MODAL INPUT NILAI ================= */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tambah Nilai Baru</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Form Informasi Modul */}
              <div className="form-modul">
                <div className="form-row">
                  <div className="form-group">
                    <label>Judul Modul / Ujian <span className="required">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Contoh: Ulangan Harian 1 - Bab 1 Bilangan"
                      value={modulForm.namaModul}
                      onChange={(e) => setModulForm({ ...modulForm, namaModul: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tanggal Pelaksanaan <span className="required">*</span></label>
                    <input 
                      type="date" 
                      className="form-control"
                      value={modulForm.tanggal}
                      onChange={(e) => setModulForm({ ...modulForm, tanggal: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>KKM</label>
                    <input 
                      type="number" 
                      className="form-control"
                      value={modulForm.kkm}
                      onChange={(e) => setModulForm({ ...modulForm, kkm: e.target.value })}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="search-wrapper">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Cari nama siswa atau NIS..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Tabel Daftar Siswa */}
              <div className="table-wrapper">
                <table className="siswa-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NIS</th>
                      <th>Nama Siswa</th>
                      <th>L/P</th>
                      <th>Nilai</th>
                      <th>Grade</th>
                      <th>Catatan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSiswa.map((siswa, index) => {
                      const nilaiData = nilaiSiswa[siswa.id];
                      const nilai = nilaiData?.nilai;
                      const catatan = nilaiData?.catatan || '';
                      const grade = getNilaiGrade(nilai);
                      const isSaving = savingStatus[siswa.id] === 'saving';
                      const isSuccess = savingStatus[siswa.id] === 'success';
                      
                      return (
                        <tr key={siswa.id}>
                          <td>{index + 1}</td>
                          <td>{siswa.nis}</td>
                          <td>
                            <span className="gender-icon">{siswa.gender === 'L' ? '👨' : '👩'}</span>
                            {siswa.nama}
                          </td>
                          <td>{siswa.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                          <td>
                            <input 
                              type="number"
                              className="nilai-input"
                              value={nilai || ''}
                              onChange={(e) => handleNilaiChange(siswa.id, e.target.value)}
                              placeholder="0-100"
                            />
                          </td>
                          <td>
                            {grade && (
                              <span className="grade-badge" style={{ backgroundColor: grade.color }}>
                                {grade.grade}
                              </span>
                            )}
                          </td>
                          <td>
                            <input 
                              type="text"
                              className="catatan-input"
                              value={catatan}
                              onChange={(e) => handleCatatanChange(siswa.id, e.target.value)}
                              placeholder="Catatan..."
                            />
                          </td>
                          <td>
                            {isSaving && <div className="spinner"></div>}
                            {isSuccess && <CheckCircle size={18} className="success-icon" />}
                            {!isSaving && !isSuccess && (
                              <button className="btn-save-single" onClick={() => handleSimpanPerSiswa(siswa.id)}>
                                <Save size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Ringkasan */}
              <div className="ringkasan">
                <div className="ringkasan-item">
                  <span>Total Siswa:</span>
                  <strong>{totalSiswa}</strong>
                </div>
                <div className="ringkasan-item">
                  <span>Sudah Dinilai:</span>
                  <strong className="text-success">{sudahDinilai}</strong>
                </div>
                <div className="ringkasan-item">
                  <span>Belum Dinilai:</span>
                  <strong className="text-warning">{belumDinilai}</strong>
                </div>
                <div className="ringkasan-item">
                  <span>Rata-rata:</span>
                  <strong className="text-primary">{rataRata}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowModal(false)}>Batal</button>
              <button 
                className="btn-simpan" 
                onClick={handleSimpanSemua}
                disabled={!modulForm.namaModul || !modulForm.tanggal}
              >
                Simpan Semua Nilai
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

export default InputNilai;