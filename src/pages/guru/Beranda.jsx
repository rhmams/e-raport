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
  Award,
  Bookmark,
  UserCheck,
  Repeat,
  GraduationCap
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import "./Beranda.css";
import CatatanPrestasiModal from "./CatatanPrestasiModal";
import SampulModal from "./SampulModal";
import CatatanWaliKelasModal from "./CatatanWaliKelasModal";
import MutasiModal from "./MutasiModal";

function Beranda() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSampulModalOpen, setIsSampulModalOpen] = useState(false);
  const [isWaliKelasModalOpen, setIsWaliKelasModalOpen] = useState(false);
  const [isMutasiModalOpen, setIsMutasiModalOpen] = useState(false);

  // Function untuk buka/tutup modal Catatan Prestasi
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Function untuk buka/tutup modal Sampul
  const openSampulModal = () => setIsSampulModalOpen(true);
  const closeSampulModal = () => setIsSampulModalOpen(false);

  const openWaliKelasModal = () => setIsWaliKelasModalOpen(true);
  const closeWaliKelasModal = () => setIsWaliKelasModalOpen(false);

  
  const openMutasiModal = () => setIsMutasiModalOpen(true);
  const closeMutasiModal = () => setIsMutasiModalOpen(false);
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
                className={location.pathname === '/nilai' ? 'active' : ''} 
                onClick={() => navigate('/nilai')}
              >
                <GraduationCap size={18}/> Nilai
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

            {/* ================= STATS CARDS (3 SEJAJAR) ================= */}
            <section className="stats-grid">
              <div className="stat-card">
                <h3>Total Siswa</h3>
                <div className="stat-number">248</div>
                <div className="stat-trend">
                  <TrendingUp size={16} /> +12 <span>dari tahun lalu</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Kesiapan Akhlak</h3>
                <div className="stat-number">12</div>
                <div className="stat-trend">
                  <span>3 tingkatan</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Total Mata Pelajaran</h3>
                <div className="stat-number">18</div>
                <div className="stat-trend">
                  <span>Waktu & Pilihan</span>
                </div>
              </div>
            </section>

            {/* ================= ROW DUA KOLOM: Aktivitas Terbaru + Aksi Cepat ================= */}
            <div className="row-dua-kolom">
              {/* KOLOM KIRI: Aktivitas Terbaru (Lebih Besar) */}
              <div className="kolom-aktivitas">
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
                        <div className="activity-title">Pendidikan Pengenalan Diperburuk</div>
                        <div className="activity-desc">Nilai Studi Belum Kelas: 10-A di SMPN 1 Al-Qur'an Hadi</div>
                        <div className="activity-time">2 jam yang lalu</div>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon">
                        <Users size={20} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Sewa Baru Tertibah</div>
                        <div className="activity-desc">Ahmad Fauzan bergabung di Kelas 11-B</div>
                        <div className="activity-time">5 jam yang lalu</div>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon">
                        <FileText size={20} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Laporan Dihasilkan</div>
                        <div className="activity-desc">Rupoet Semester 1 sudah siap</div>
                        <div className="activity-time">1 hari yang lalu</div>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon">
                        <BookOpen size={20} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Pendidikan Terbuka</div>
                        <div className="activity-desc">6 kelas menunggu penilaian keterampilan</div>
                        <div className="activity-time">2 hari yang lalu</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KOLOM KANAN: Aksi Cepat (Lebih Kecil) */}
              <div className="kolom-aksi-cepat">
                <div className="card">
                  <div className="card-header">
                    <h3>Aksi Cepat</h3>
                  </div>
                  <div className="quick-actions">
                    <div className="quick-action-btn" onClick={openModal}>
                      <Award size={20} />
                      Catatan Prestasi Akhlak
                    </div>
                    <div className="quick-action-btn" onClick={openSampulModal}>
                      <Bookmark size={20} />
                      Sampul
                    </div>
                    <div className="quick-action-btn" onClick={openWaliKelasModal}>
                      <UserCheck size={20} />
                      Catatan Wali Kelas
                    </div>
                    <div className="quick-action-btn" onClick={openMutasiModal}>
                      <Repeat size={20} />
                      Mutasi
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= ROW TIGA KOLOM: Siswa Terbaik + Jadwal Hari Ini + Tugas Mendesak ================= */}
            <div className="row-tiga-kolom">
              {/* KOLOM 1: Siswa Terbaik */}
              <div className="kolom-siswa-terbaik">
                <div className="card">
                  <div className="card-header">
                    <h3>Siswa Terbaik</h3>
                    <span className="view-all">Lihat Semua</span>
                  </div>
                  <div className="table-container">
                    <table className="student-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Nama</th>
                          <th>Kelas</th>
                          <th>Nilai</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="rank-badge">1</span></td>
                          <td>Fadimah Azzahra</td>
                          <td>X IPA 1</td>
                          <td>95.5</td>
                        </tr>
                        <tr>
                          <td><span className="rank-badge">2</span></td>
                          <td>Ahmad Zaki</td>
                          <td>XI IPA 2</td>
                          <td>94.2</td>
                        </tr>
                        <tr>
                          <td><span className="rank-badge">3</span></td>
                          <td>Khadijah Nur</td>
                          <td>XI IPA 1</td>
                          <td>92.8</td>
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
                          <td>XI IPA 1</td>
                          <td>91.7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* KOLOM 2: Jadwal Hari Ini */}
              <div className="kolom-jadwal">
                <div className="card">
                  <div className="card-header">
                    <h3>Jadwal Hari Ini</h3>
                    <span className="view-all">Lihat Semua</span>
                  </div>
                  <div className="schedule-list">
                    <div className="schedule-item">
                      <div className="schedule-time">07.30 - 08.00</div>
                      <div className="schedule-info">
                        <h4>Al-Quran Hadits</h4>
                        <p><MapPin size={14} /> X IPA 1 • R.101</p>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-time">09.16 - 10.45</div>
                      <div className="schedule-info">
                        <h4>Figh</h4>
                        <p><MapPin size={14} /> X IPA 2 • R.102</p>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-time">13.00 - 14.00</div>
                      <div className="schedule-info">
                        <h4>Akidah Akhlak</h4>
                        <p><MapPin size={14} /> XI IPA 1 • R.103</p>
                      </div>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-time">13.00 - 14.00</div>
                      <div className="schedule-info">
                        <h4>SKI</h4>
                        <p><MapPin size={14} /> XII IPA 1 • R.104</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KOLOM 3: Tugas Mendesak */}
              <div className="kolom-tugas">
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
                        <h4>Verifikasi kebutuhan semester</h4>
                      </div>
                    </div>

                    <div className="task-item">
                      <div className="task-icon">
                        <Users size={20} />
                      </div>
                      <div className="task-content">
                        <h4>Rupoet koordinasi wali kelas</h4>
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
                        <h4>Citak raport semester gajil</h4>
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


      <CatatanPrestasiModal isOpen={isModalOpen} onClose={closeModal} />
      <SampulModal isOpen={isSampulModalOpen} onClose={closeSampulModal} />
      <CatatanWaliKelasModal isOpen={isWaliKelasModalOpen} onClose={closeWaliKelasModal} />
      <MutasiModal isOpen={isMutasiModalOpen} onClose={closeMutasiModal} />


    </div>
  );
}

export default Beranda;