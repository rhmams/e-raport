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
  ChevronLeft,
  Search,
  Filter,
  Download,
  User,
  MapPin,
  GraduationCap,
  Clock
} from "lucide-react";

import "./DetailKelas.css";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function DetailKelas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAbsensiClick = () => {
    navigate(`/kelas/${id}/absensi`);
  };

  const handleNilaiPengetahuanClick = () => {
    navigate(`/kelas/${id}/nilai-pengetahuan`);
  };

  const handleNilaiKeterampilanClick = () => {
    navigate(`/kelas/${id}/nilai-keterampilan`);
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
                Guru &gt; Kelas &gt; X-2 &gt; Detail Kelas
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
              <li><LayoutDashboard size={18}/> Beranda</li>
              <li className="active"><BookOpen size={18}/> Kelas</li>
              <li><Users size={18}/> Wali Kelas</li>
              <li><ClipboardList size={18}/> Ekstrakurikuler</li>
              <li><BookOpen size={18}/> Materi Pelajaran</li>
              <li><FileText size={18}/> Raport</li>
            </ul>
          </div>
          <div className="logout">
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">
          
          {/* ================= BACK BUTTON ================= */}
          <div className="back-button" onClick={() => navigate('/kelas')}>
            <ChevronLeft size={20} />
            <span>Kembali ke Daftar Kelas</span>
          </div>

          {/* ================= HEADER KELAS ================= */}
          <div className="class-header-card">
            <div className="class-header">
              <div>
                <h1>Kelas X-2 - Matematika</h1>
                <div className="class-info">
                  <span><User size={16} /> Wali Kelas: <strong>Ustadz Ahmad Rahman</strong></span>
                  <span className="separator">•</span>
                  <span><MapPin size={16} /> Ruang R-102</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= KELOLA NILAI ================= */}
          <div className="nilai-section">
            <div className="section-header">
              <h3>Kelola Nilai Siswa</h3>
              <p className="subtitle">Pilih jenis nilai untuk mulai melakukan penilaian.</p>
            </div>

            <div className="nilai-actions">
              <button className="btn-nilai absensi" onClick={handleAbsensiClick}>
                <ClipboardList size={18} /> Absensi
              </button>
              <button className="btn-nilai keterampilan" onClick={handleNilaiKeterampilanClick}>
                <Clock size={18} /> Nilai Keterampilan
              </button>
              <button className="btn-nilai pengetahuan" onClick={handleNilaiPengetahuanClick}>
                <GraduationCap size={18} /> Nilai Pengetahuan
              </button>
            </div>
          </div>

          {/* ================= TABEL SISWA ================= */}
          <div className="table-section">
            <div className="table-header">
              <h3>Daftar Siswa</h3>
              <div className="table-actions">
                <button className="btn-export">
                  <Download size={16} /> Export
                </button>
                <button className="btn-import">
                  <Download size={16} /> Import
                </button>
                <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Cari siswa..." />
                </div>
                <button className="btn-filter">
                  <Filter size={16} /> Filter
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="siswa-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NIS</th>
                    <th>NISN</th>
                    <th>Nama Lengkap</th>
                    <th>Jenis Kelamin</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>2024001</td>
                    <td>0051234567</td>
                    <td>Ahmad Fauzan</td>
                    <td>Laki-laki</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>2024002</td>
                    <td>0051234568</td>
                    <td>Fatimah Azzahra</td>
                    <td>Perempuan</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>2024003</td>
                    <td>0051234569</td>
                    <td>Muhammad Rizki</td>
                    <td>Laki-laki</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>2024004</td>
                    <td>0051234570</td>
                    <td>Khadijah Nur</td>
                    <td>Perempuan</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>2024005</td>
                    <td>0051234571</td>
                    <td>Abdullah Hasan</td>
                    <td>Laki-laki</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>2024006</td>
                    <td>0051234572</td>
                    <td>Aisyah Maryam</td>
                    <td>Perempuan</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>2024007</td>
                    <td>0051234573</td>
                    <td>Umar Faruq</td>
                    <td>Laki-laki</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>2024008</td>
                    <td>0051234574</td>
                    <td>Zahra Safira</td>
                    <td>Perempuan</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>2024009</td>
                    <td>0051234575</td>
                    <td>Yusuf Ibrahim</td>
                    <td>Laki-laki</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>2024010</td>
                    <td>0051234576</td>
                    <td>Mariam Hasna</td>
                    <td>Perempuan</td>
                    <td>
                      <button className="btn-action">Nilai</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pagination-info">
              Menampilkan 1 - 10 dari 30 siswa
            </div>
          </div>

        </main>

      </div>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Hubungi Kami</h4>
              <p>
                <MapPinned size={18} />
                Jl. Pendidikan No. 123, Kota Santri, Indonesia
              </p>
              <p>
                <Phone size={18} />
                <a href="tel:+622112345678">+62 21 1234-5678</a>
              </p>
              <p>
                <Mail size={18} />
                <a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a>
              </p>
            </div>
            <div className="footer-section">
              <h4>Jam Layanan</h4>
              <p>
                <ClockIcon size={18} />
                Senin - Jumat: 07:00 - 16:00
              </p>
              <p>
                <ClockIcon size={18} />
                Sabtu: 07:00 - 14:00
              </p>
              <p>
                <ClockIcon size={18} />
                Minggu: Tutup
              </p>
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

export default DetailKelas;