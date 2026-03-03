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
  ChevronRight
} from "lucide-react";

import "./Kelas.css";
import { useNavigate } from 'react-router-dom';

function Kelas() {
  const navigate = useNavigate();

  const handleKelasClick = (kelasId) => {
    navigate(`/kelas/${kelasId}`);
  };

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
                Guru <ChevronRight size={12} /> Kelas
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
          <div className="container">

            {/* ================= JADWAL HARI INI (BACKGROUND HIJAU) ================= */}
            <div className="jadwal-wrapper">
              <div className="jadwal-header">
                <h3>Jadwal Hari Ini</h3>
                <p className="jadwal-date">Rabu, 25 Februari 2026</p>
              </div>

              <div className="jadwal-cards">
                <div className="jadwal-card">
                  <div className="badge selesai">Selesai</div>
                  <h4>Kelas X-2</h4>
                  <p className="mapel-jadwal">Matematika</p>
                  <div className="info-jadwal">
                    <Clock size={15} />
                    <span>08.00 - 09.30</span>
                  </div>
                  <div className="info-jadwal">
                    <MapPin size={15} />
                    <span>R-102</span>
                  </div>
                </div>

                <div className="jadwal-card">
                  <div className="badge sedang">Sedang Berlangsung</div>
                  <h4>Kelas XI-2</h4>
                  <p className="mapel-jadwal">Fisika</p>
                  <div className="info-jadwal">
                    <Clock size={15} />
                    <span>10.00 - 11.30</span>
                  </div>
                  <div className="info-jadwal">
                    <MapPin size={15} />
                    <span>R-202</span>
                  </div>
                </div>

                <div className="jadwal-card">
                  <div className="badge akan">Akan Datang</div>
                  <h4>Kelas XI-6</h4>
                  <p className="mapel-jadwal">Bahasa Inggris</p>
                  <div className="info-jadwal">
                    <Clock size={15} />
                    <span>13.00 - 14.30</span>
                  </div>
                  <div className="info-jadwal">
                    <MapPin size={15} />
                    <span>R-206</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= SEMUA KELAS YANG DIAMPU ================= */}
            <div className="kelas-section">
              <h2>Semua Kelas yang Diampu</h2>
              <p className="subtitle">Informasi kelas dan mata pelajaran yang Anda ajar</p>

              <div className="kelas-grid">
                {/* Kelas X-2 */}
                <div className="kelas-card" onClick={() => handleKelasClick('x-2')}>
                  <div className="card-header">
                    <span className="room-badge">R-102</span>
                  </div>
                  <h3>Kelas X-2</h3>
                  <p className="mapel-name">Matematika</p>
                  <div className="kelas-detail">
                    <p>32 Siswa</p>
                    <p>Senin, Rabu • 08.00-09.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadz Ahmad Rahman</span>
                  </div>
                </div>

                {/* Kelas X-4 */}
                <div className="kelas-card" onClick={() => handleKelasClick('x-4')}>
                  <div className="card-header">
                    <span className="room-badge">R-104</span>
                  </div>
                  <h3>Kelas X-4</h3>
                  <p className="mapel-name">Bahasa Indonesia</p>
                  <div className="kelas-detail">
                    <p>30 Siswa</p>
                    <p>Selasa, Kamis • 08.00-09.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadzah Aminah</span>
                  </div>
                </div>

                {/* Kelas X-1 */}
                <div className="kelas-card" onClick={() => handleKelasClick('x-1')}>
                  <div className="card-header">
                    <span className="room-badge">R-101</span>
                  </div>
                  <h3>Kelas X-1</h3>
                  <p className="mapel-name">Tahfidz</p>
                  <div className="kelas-detail">
                    <p>31 Siswa</p>
                    <p>Senin, Rabu • 07.00-08.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadz Hafidz</span>
                  </div>
                </div>

                {/* Kelas XI-2 */}
                <div className="kelas-card" onClick={() => handleKelasClick('xi-2')}>
                  <div className="card-header">
                    <span className="room-badge">R-202</span>
                  </div>
                  <h3>Kelas XI-2</h3>
                  <p className="mapel-name">Fisika</p>
                  <div className="kelas-detail">
                    <p>28 Siswa</p>
                    <p>Senin, Rabu • 10.00-11.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadz Muhammad Hasan</span>
                  </div>
                </div>

                {/* Kelas XI-3 */}
                <div className="kelas-card" onClick={() => handleKelasClick('xi-3')}>
                  <div className="card-header">
                    <span className="room-badge">R-203</span>
                  </div>
                  <h3>Kelas XI-3</h3>
                  <p className="mapel-name">Kimia</p>
                  <div className="kelas-detail">
                    <p>29 Siswa</p>
                    <p>Selasa, Kamis • 10.00-11.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadzah Khadijah</span>
                  </div>
                </div>

                {/* Kelas XI-6 */}
                <div className="kelas-card" onClick={() => handleKelasClick('xi-6')}>
                  <div className="card-header">
                    <span className="room-badge">R-206</span>
                  </div>
                  <h3>Kelas XI-6</h3>
                  <p className="mapel-name">Bahasa Inggris</p>
                  <div className="kelas-detail">
                    <p>27 Siswa</p>
                    <p>Rabu, Jumat • 13.00-14.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadz Abdullah</span>
                  </div>
                </div>

                {/* Kelas XI-1 */}
                <div className="kelas-card" onClick={() => handleKelasClick('xi-1')}>
                  <div className="card-header">
                    <span className="room-badge">R-201</span>
                  </div>
                  <h3>Kelas XI-1</h3>
                  <p className="mapel-name">Biologi</p>
                  <div className="kelas-detail">
                    <p>26 Siswa</p>
                    <p>Senin, Kamis • 13.00-14.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadzah Aisyah</span>
                  </div>
                </div>

                {/* Kelas XII-2 */}
                <div className="kelas-card" onClick={() => handleKelasClick('xii-2')}>
                  <div className="card-header">
                    <span className="room-badge">R-302</span>
                  </div>
                  <h3>Kelas XII-2</h3>
                  <p className="mapel-name">Sejarah</p>
                  <div className="kelas-detail">
                    <p>25 Siswa</p>
                    <p>Selasa, Jumat • 10.00-11.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadz Yusuf</span>
                  </div>
                </div>

                {/* Kelas XII-1 */}
                <div className="kelas-card" onClick={() => handleKelasClick('xii-1')}>
                  <div className="card-header">
                    <span className="room-badge">R-301</span>
                  </div>
                  <h3>Kelas XII-1</h3>
                  <p className="mapel-name">Bahasa Arab</p>
                  <div className="kelas-detail">
                    <p>24 Siswa</p>
                    <p>Senin, Kamis • 08.00-09.30</p>
                  </div>
                  <div className="wali-info">
                    <span className="label">Wali Kelas:</span>
                    <span className="value">Ustadzah Fatimah</span>
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

export default Kelas;