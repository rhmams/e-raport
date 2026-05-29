import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  LogOut,
  MapPinned,
  Clock,
  Phone,
  Mail,
  Camera,
  Edit3,
  GraduationCap,
  BookMarked,
  CalendarDays,
  User
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import "./ProfilGuru.css";

function ProfilGuru() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    nama: "Ustadz Ahmad Rahman",
    nip: "NIP: 198012052003041001",
    email: "ahmad.rahman@alquds.sch.id",
    telepon: "+62 812-3456-7890",
    alamat: "Jl. Mawar No. 12, Kota Santri",
    tanggalLahir: "05 Desember 1980",
    jenisKelamin: "Laki-laki",
    pendidikan: "S1 Pendidikan Agama Islam",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
              <div className="breadcrumb">Dashboard &gt; Profil</div>
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
              <li
                className={location.pathname === '/' || location.pathname === '/beranda' ? 'active' : ''}
                onClick={() => navigate('/beranda')}
              >
                <LayoutDashboard size={18} /> Beranda
              </li>
              <li
                className={location.pathname.startsWith('/kelas') && !location.pathname.includes('/kelas/') ? 'active' : ''}
                onClick={() => navigate('/kelas')}
              >
                <BookOpen size={18} /> Kelas
              </li>
              <li
                className={location.pathname === '/wali-kelas' ? 'active' : ''}
                onClick={() => navigate('/wali-kelas')}
              >
                <Users size={18} /> Wali Kelas
              </li>
              <li
                className={location.pathname === '/ekstrakurikuler' ? 'active' : ''}
                onClick={() => navigate('/ekstrakurikuler')}
              >
                <ClipboardList size={18} /> Ekstrakurikuler
              </li>
              <li
                className={location.pathname === '/nilai' ? 'active' : ''}
                onClick={() => navigate('/nilai')}
              >
                <GraduationCap size={18} /> Nilai
              </li>
              <li
                className={location.pathname === '/raport' ? 'active' : ''}
                onClick={() => navigate('/raport')}
              >
                <FileText size={18} /> Raport
              </li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/logout')}>
            <LogOut size={18} /> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">

          <section className="welcome-section">
            <h1>Profil Saya</h1>
            <p>Kelola informasi profil dan jadwal mengajar Anda.</p>
          </section>

          <div className="profil-layout">

            {/* ======= KOLOM KIRI ======= */}
            <div className="profil-kiri">

              <div className="card profil-avatar-card">
                <div className="avatar-wrapper">
                  <div className="avatar-circle">UA</div>
                  <button className="avatar-camera-btn">
                    <Camera size={14} />
                  </button>
                </div>
                <h2 className="profil-nama">{form.nama}</h2>
                <p className="profil-nip">{form.nip}</p>
                <div className="profil-action-btns">
                  <button className="btn-outline-profil">
                    <Edit3 size={14} /> Edit Foto
                  </button>
                  <button className="btn-green-profil" onClick={() => setIsEditing(!isEditing)}>
                    <User size={14} /> {isEditing ? "Simpan Profil" : "Edit Profil"}
                  </button>
                </div>
              </div>

              <div className="card wali-kelas-card">
                <div className="wali-label">
                  <BookMarked size={16} /> Wali Kelas
                </div>
                <div className="wali-kelas-nama">Kelas X-2</div>
                <div className="wali-kelas-siswa">33 Siswa</div>
              </div>

              <div className="card statistik-card">
                <h4 className="statistik-title">Statistik Mengajar</h4>
                <div className="statistik-list">
                  <div className="statistik-item">
                    <div className="statistik-icon s-blue"><BookOpen size={18} /></div>
                    <div className="statistik-info">
                      <div className="statistik-number">7</div>
                      <div className="statistik-label">Total Kelas</div>
                    </div>
                  </div>
                  <div className="statistik-item">
                    <div className="statistik-icon s-green"><Users size={18} /></div>
                    <div className="statistik-info">
                      <div className="statistik-number">62</div>
                      <div className="statistik-label">Total Siswa</div>
                    </div>
                  </div>
                  <div className="statistik-item">
                    <div className="statistik-icon s-orange"><CalendarDays size={18} /></div>
                    <div className="statistik-info">
                      <div className="statistik-number">14</div>
                      <div className="statistik-label">Jam Mengajar/Minggu</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ======= KOLOM KANAN ======= */}
            <div className="profil-kanan">
              <div className="card">
                <div className="card-header">
                  <h3>Informasi Pribadi</h3>
                  {!isEditing && (
                    <button className="btn-outline-sm" onClick={() => setIsEditing(true)}>
                      <Edit3 size={14} /> Edit
                    </button>
                  )}
                </div>
                <div className="info-grid">
                  <div className="info-field">
                    <label>Nama Lengkap</label>
                    {isEditing ? <input name="nama" value={form.nama} onChange={handleChange} /> : <div className="info-value">{form.nama}</div>}
                  </div>
                  <div className="info-field">
                    <label>NIP</label>
                    {isEditing ? <input name="nip" value={form.nip} onChange={handleChange} /> : <div className="info-value">{form.nip}</div>}
                  </div>
                  <div className="info-field">
                    <label>Email</label>
                    {isEditing ? <input name="email" value={form.email} onChange={handleChange} /> : <div className="info-value">{form.email}</div>}
                  </div>
                  <div className="info-field">
                    <label>Telepon</label>
                    {isEditing ? <input name="telepon" value={form.telepon} onChange={handleChange} /> : <div className="info-value">{form.telepon}</div>}
                  </div>
                  <div className="info-field">
                    <label>Tanggal Lahir</label>
                    {isEditing ? <input name="tanggalLahir" value={form.tanggalLahir} onChange={handleChange} /> : <div className="info-value">{form.tanggalLahir}</div>}
                  </div>
                  <div className="info-field">
                    <label>Jenis Kelamin</label>
                    {isEditing ? (
                      <select name="jenisKelamin" value={form.jenisKelamin} onChange={handleChange}>
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                      </select>
                    ) : <div className="info-value">{form.jenisKelamin}</div>}
                  </div>
                  <div className="info-field full-width">
                    <label>Alamat</label>
                    {isEditing ? <input name="alamat" value={form.alamat} onChange={handleChange} /> : <div className="info-value">{form.alamat}</div>}
                  </div>
                  <div className="info-field full-width">
                    <label>Pendidikan Terakhir</label>
                    {isEditing ? <input name="pendidikan" value={form.pendidikan} onChange={handleChange} /> : <div className="info-value">{form.pendidikan}</div>}
                  </div>
                </div>
                {isEditing && (
                  <div className="form-actions">
                    <button className="btn-outline-profil" onClick={() => setIsEditing(false)}>Batal</button>
                    <button className="btn-green-profil" onClick={() => setIsEditing(false)}>Simpan Perubahan</button>
                  </div>
                )}
              </div>

              <div className="card" style={{ marginTop: '16px' }}>
                <div className="card-header">
                  <h3>Jadwal Mengajar</h3>
                  <span className="view-all">Lihat Semua</span>
                </div>
                <div className="table-container">
                  <table className="student-table">
                    <thead>
                      <tr>
                        <th>Hari</th>
                        <th>Jam</th>
                        <th>Mata Pelajaran</th>
                        <th>Kelas</th>
                        <th>Ruang</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Senin</td><td>07.30 – 09.00</td><td>Al-Quran Hadits</td><td>X IPA 1</td><td>R.101</td></tr>
                      <tr><td>Selasa</td><td>09.15 – 10.45</td><td>Fiqh</td><td>X IPA 2</td><td>R.102</td></tr>
                      <tr><td>Rabu</td><td>13.00 – 14.30</td><td>Akidah Akhlak</td><td>XI IPA 1</td><td>R.103</td></tr>
                      <tr><td>Kamis</td><td>10.00 – 11.30</td><td>SKI</td><td>XII IPA 1</td><td>R.104</td></tr>
                    </tbody>
                  </table>
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
              <p><Clock size={18} /> Senin - Jumat: 07:00 - 16:00</p>
              <p><Clock size={18} /> Sabtu: 07:00 - 14:00</p>
              <p><Clock size={18} /> Minggu: Tutup</p>
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

export default ProfilGuru;