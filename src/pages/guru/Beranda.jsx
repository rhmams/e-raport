import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  LogOut,
  Clock,
  MapPin,
  Phone,
  Mail,
  MapPinned,
  Clock as ClockIcon,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Settings
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom'; // <-- TAMBAHKAN INI

import "./Beranda.css";

function Beranda() {
  const navigate = useNavigate(); // <-- TAMBAHKAN INI
  const location = useLocation(); // <-- TAMBAHKAN INI

  return (
    <div className="page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="nav-left">
            <div className="logo-circle">MQ</div>
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Dashboard &gt; Beranda
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
              <li 
                className={location.pathname === '/' || location.pathname === '/beranda' ? 'active' : ''} 
                onClick={() => navigate('/beranda')}
              >
                <LayoutDashboard size={18}/> Beranda
              </li>
              <li 
                className={location.pathname.startsWith('/kelas') && !location.pathname.includes('/kelas/') ? 'active' : ''} 
                onClick={() => navigate('/kelas')}
              >
                <BookOpen size={18}/> Kelas
              </li>
              <li 
                className={location.pathname === '/wali-kelas' ? 'active' : ''} 
                onClick={() => navigate('/wali-kelas')}
              >
                <Users size={18}/> Wali Kelas
              </li>
              <li 
                className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} 
                onClick={() => navigate('/ekstrakurikuler')}
              >
                <ClipboardList size={18}/> Ekstrakurikuler
              </li>
              <li 
                className={location.pathname === '/materi-pelajaran' ? 'active' : ''} 
                onClick={() => navigate('/materi-pelajaran')}
              >
                <BookOpen size={18}/> Materi Pelajaran
              </li>
              <li 
                className={location.pathname === '/raport' ? 'active' : ''} 
                onClick={() => navigate('/raport')}
              >
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
          <div className="container">

            {/* ================= WELCOME SECTION ================= */}
            <section className="welcome-section">
              <h1>Beranda</h1>
              <p>Selamat datang kembali, Ustadz Ahmad! Berikut ringkasan sekolah Anda.</p>
            </section>

            {/* ================= STATS CARDS ================= */}
            <section className="stats-grid">
              <div className="stat-card">
                <h3>Total Siswa</h3>
                <div className="stat-number">248</div>
                <div className="stat-trend">
                  <TrendingUp size={16} /> +12 <span>dari tahun lalu</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Kelas Aktif</h3>
                <div className="stat-number">12</div>
                <div className="stat-trend">
                  <span>3 tingkatan</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Total Mata Pelajaran</h3>
                <div className="stat-number">18</div>
                <div className="stat-trend">
                  <span>Wajib & Pilihan</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Prestasi Siswa</h3>
                <div className="stat-number">15</div>
                <div className="stat-trend">
                  <span>Bulan ini</span>
                </div>
              </div>
            </section>

            {/* ================= CONTENT GRID ================= */}
            <div className="content-grid">
              {/* LEFT COLUMN */}
              <div>
                {/* Aktivitas Terbaru */}
                <div className="card">
                  <div className="card-header">
                    <h3>Aktivitas Terbaru</h3>
                    <span className="view-all">Lihat Semua</span>
                  </div>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">
                        <FileText size={20} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Penilaian Pengetahuan Diperbarui</div>
                        <div className="activity-desc">Nilai Studi Islam Kelas 10-A ditambahkan</div>
                        <div className="activity-time">2 jam yang lalu</div>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon">
                        <Users size={20} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Siswa Baru Terdaftar</div>
                        <div className="activity-desc">Ahmad Fauzan bergabung di Kelas 11-B</div>
                        <div className="activity-time">5 jam yang lalu</div>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon">
                        <ClipboardList size={20} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Laporan Dihasilkan</div>
                        <div className="activity-desc">Raport Semester 1 sudah siap</div>
                        <div className="activity-time">1 hari yang lalu</div>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon">
                        <AlertCircle size={20} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Penilaian Tertunda</div>
                        <div className="activity-desc">5 kelas menunggu penilaian keterampilan</div>
                        <div className="activity-time">2 hari yang lalu</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Siswa Terbaik */}
                <div className="card">
                  <div className="card-header">
                    <h3>Siswa Terbaik</h3>
                    <span className="view-all">Lihat Semua</span>
                  </div>
                  <div className="table-container">
                    <table className="student-table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Nama</th>
                          <th>Kelas</th>
                          <th>Nilai</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="rank-badge">1</span></td>
                          <td>Fatimah Azzahra</td>
                          <td>X IPA 1</td>
                          <td>95.5</td>
                        </tr>
                        <tr>
                          <td><span className="rank-badge">2</span></td>
                          <td>Ahmad Zaki</td>
                          <td>X IPA 2</td>
                          <td>94.2</td>
                        </tr>
                        <tr>
                          <td><span className="rank-badge">3</span></td>
                          <td>Khadijah Nur</td>
                          <td>X IPA 1</td>
                          <td>93.8</td>
                        </tr>
                        <tr>
                          <td><span className="rank-badge">4</span></td>
                          <td>Ali Hassan</td>
                          <td>X IPA 2</td>
                          <td>92.5</td>
                        </tr>
                        <tr>
                          <td><span className="rank-badge">5</span></td>
                          <td>Maryam Khalid</td>
                          <td>X IPA 1</td>
                          <td>91.7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                {/* Aksi Cepat */}
                <div className="card">
                  <div className="card-header">
                    <h3>Aksi Cepat</h3>
                  </div>
                  <div className="quick-actions">
                    <div className="quick-action-btn">
                      <Plus size={20} />
                      Tambah Penilaian
                    </div>
                    <div className="quick-action-btn">
                      <Eye size={20} />
                      Lihat Semua Siswa
                    </div>
                    <div className="quick-action-btn">
                      <Settings size={20} />
                      Kelola Mata Pelajaran
                    </div>
                  </div>
                </div>

                {/* Jadwal Hari Ini */}
                <div className="card">
                  <div className="card-header">
                    <h3>Jadwal Hari Ini</h3>
                    <span className="view-all">Lihat Semua</span>
                  </div>
                  <div className="schedule-list">
                    <div className="schedule-item">
                      <div className="schedule-time">07:30</div>
                      <div className="schedule-info">
                        <h4>Al-Qur'an Hadits</h4>
                        <p><MapPin size={14} /> X IPA 1 • R-101</p>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-time">09:15</div>
                      <div className="schedule-info">
                        <h4>Fiqh</h4>
                        <p><MapPin size={14} /> X IPA 2 • R-102</p>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-time">11:00</div>
                      <div className="schedule-info">
                        <h4>Akidah Akhlak</h4>
                        <p><MapPin size={14} /> XI IPA 1 • R-103</p>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-time">13:00</div>
                      <div className="schedule-info">
                        <h4>SKI</h4>
                        <p><MapPin size={14} /> XI IPA 1 • R-104</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tugas Mendesak */}
                <div className="card">
                  <div className="card-header">
                    <h3>Tugas Mendesak</h3>
                    <span className="view-all">Lihat Semua</span>
                  </div>
                  <div className="task-list">
                    <div className="task-item">
                      <div className="task-icon">
                        <AlertCircle size={20} />
                      </div>
                      <div className="task-content">
                        <h4>Input nilai UTS Kelas X IPA 1</h4>
                        <div className="task-deadline">
                          <Clock size={14} /> 3 hari lagi
                        </div>
                      </div>
                    </div>

                    <div className="task-item">
                      <div className="task-icon">
                        <CheckCircle size={20} />
                      </div>
                      <div className="task-content">
                        <h4>Verifikasi kehadiran semester/agama</h4>
                      </div>
                    </div>

                    <div className="task-item">
                      <div className="task-icon">
                        <Users size={20} />
                      </div>
                      <div className="task-content">
                        <h4>Rapat koordinasi wali kelas</h4>
                        <div className="task-deadline">
                          <Clock size={14} /> 1 minggu lagi
                        </div>
                      </div>
                    </div>

                    <div className="task-item">
                      <div className="task-icon">
                        <FileText size={20} />
                      </div>
                      <div className="task-content">
                        <h4>Cetak raport semester ganjil</h4>
                        <div className="task-deadline">
                          <Clock size={14} /> 2 minggu lagi
                        </div>
                      </div>
                    </div>
                  </div>
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
            {/* Hubungi Kami */}
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

            {/* Jam Layanan */}
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

export default Beranda;