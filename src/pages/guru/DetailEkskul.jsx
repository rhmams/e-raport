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
  Calendar,
  MapPin,
  Clock,
  Award,
  Info
} from "lucide-react";

import "./DetailEkskul.css";
import { useNavigate, useParams } from 'react-router-dom';

function DetailEkskul() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy detail ekstrakurikuler
  const dataEkskul = {
    id: id,
    nama: "Kaligrafi Islam",
    jenis: "Seni",
    pembimbing: "Ustadzah Fatimah",
    status: "Aktif",
    totalPeserta: 32,
    jadwal: "Rabu",
    waktu: "14:00 - 16:00",
    lokasi: "Ruang Seni B-101",
    deskripsi: "Belajar seni kaligrafi Islam untuk menulis ayat-ayat Al-Qur'an dengan indah dan artistik.",
    pesertaBerprestasi: [
      { nama: "Aisyah Nurhaliza", kelas: "X-2", prestasi: "Best Artwork" }
    ],
    kegiatan: [
      { no: 1, tanggal: "8 Jan 2024", nama: "Pengenalan Alat dan Bahan Kaligrafi", peserta: 32, status: "Selesai" },
      { no: 2, tanggal: "15 Jan 2024", nama: "Latihan Menulis Huruf Hijaiyah", peserta: 30, status: "Selesai" },
      { no: 3, tanggal: "22 Jan 2024", nama: "Praktik Kaligrafi Asmaul Husna", peserta: 32, status: "Selesai" },
      { no: 4, tanggal: "29 Jan 2024", nama: "Teknik Pewarnaan Kaligrafi", peserta: 31, status: "Selesai" },
      { no: 5, tanggal: "5 Feb 2024", nama: "Membuat Karya Kaligrafi", peserta: 32, status: "Selesai" },
    ]
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
                Guru &gt; Ekstrakurikuler &gt; Detail
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
              <li className="active" onClick={() => navigate('/ekstrakurikuler')}><ClipboardList size={18}/> Ekstrakurikuler</li>
              <li onClick={() => navigate('/materi-pelajaran')}><BookOpen size={18}/> Materi Pelajaran</li>
              <li onClick={() => navigate('/raport')}><FileText size={18}/> Raport</li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/logout')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">
          
          {/* ================= BACK BUTTON ================= */}
          <div className="back-button" onClick={() => navigate('/ekstrakurikuler')}>
            <ChevronLeft size={20} />
            <span>Kembali ke Daftar Ekstrakurikuler</span>
          </div>

          {/* ================= HEADER ================= */}
          <div className="detail-header">
            <h1>{dataEkskul.nama}</h1>
            <p className="detail-subtitle">Detail kegiatan ekstrakurikuler dan daftar aksi</p>
          </div>

          {/* ================= INFO GRID ================= */}
          <div className="info-grid">
            {/* Informasi Umum */}
            <div className="info-card">
              <h3>
                <Info size={18} />
                Informasi Umum
              </h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Jenis Kegiatan</span>
                  <span className="info-value">{dataEkskul.jenis}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Pembimbing</span>
                  <span className="info-value">{dataEkskul.pembimbing}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="badge-status aktif">{dataEkskul.status}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Peserta</span>
                  <span className="info-value">{dataEkskul.totalPeserta} siswa</span>
                </div>
              </div>
            </div>

            {/* Jadwal & Lokasi */}
            <div className="info-card">
              <h3>
                <Calendar size={18} />
                Jadwal & Lokasi
              </h3>
              <div className="jadwal-detail">
                <div className="jadwal-item">
                  <span className="jadwal-hari">{dataEkskul.jadwal}</span>
                  <div className="jadwal-waktu">
                    <Clock size={14} />
                    <span>{dataEkskul.waktu}</span>
                  </div>
                  <div className="jadwal-lokasi">
                    <MapPin size={14} />
                    <span>{dataEkskul.lokasi}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="info-card full-width">
              <h3>
                <BookOpen size={18} />
                Deskripsi
              </h3>
              <p className="deskripsi-text">{dataEkskul.deskripsi}</p>
            </div>

            {/* Peserta Berprestasi */}
            <div className="info-card">
              <h3>
                <Award size={18} />
                Peserta Berprestasi
              </h3>
              <div className="prestasi-list">
                {dataEkskul.pesertaBerprestasi.map((item, index) => (
                  <div key={index} className="prestasi-item">
                    <span className="prestasi-nama">{item.nama}</span>
                    <span className="prestasi-kelas">{item.kelas}</span>
                    <span className="prestasi-badge">{item.prestasi}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= DAFTAR KEGIATAN ================= */}
          <div className="kegiatan-section">
            <h3>Daftar Aksi & Kegiatan</h3>
            
            <div className="table-container">
              <table className="kegiatan-table">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>TANGGAL</th>
                    <th>NAMA KEGIATAN</th>
                    <th>PESERTA</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {dataEkskul.kegiatan.map((item) => (
                    <tr key={item.no}>
                      <td>{item.no}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.nama}</td>
                      <td>{item.peserta} siswa</td>
                      <td>
                        <span className="badge-status selesai">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default DetailEkskul;