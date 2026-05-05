// src/pages/DetailRaport.jsx
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
  ChevronLeft,
  Download,
  Printer,
  User,
  Award,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  GraduationCap
} from "lucide-react";

import "./DetailRaport.css";
import { useNavigate, useLocation } from 'react-router-dom';

function DetailRaport() {
  const navigate = useNavigate();
  const location = useLocation();

  // Data pencapaian kompetensi
  const kompetensiData = [
    { no: 1, nama: 'Pendidikan Agama dan Budi Pekerti', nilai: 87 },
    { no: 2, nama: 'Pendidikan Pancasila', nilai: 85 },
    { no: 3, nama: 'Bahasa Indonesia', nilai: 82 },
    { no: 4, nama: 'Matematika', nilai: 78 },
    { no: 5, nama: 'Ilmu Pengetahuan Alam', nilai: 80 },
    { no: 6, nama: 'Ilmu Pengetahuan Sosial', nilai: 83 },
  ];

  // Data ekstrakurikuler
  const ekstraData = [
    { no: 1, kategori: 'Pramuka', predikat: 'Sangat Baik', keterangan: 'Aktif mengikuti kegiatan dan menunjukkan performa yang memuaskan.' },
    { no: 2, kategori: 'Seni Musik', predikat: 'Baik', keterangan: 'Menunjukkan kemampuan yang baik dalam berkomposisi musik.' },
    { no: 3, kategori: '', predikat: '', keterangan: '' },
    { no: 4, kategori: '', predikat: '', keterangan: '' },
    { no: 5, kategori: '', predikat: '', keterangan: '' },
    { no: 6, kategori: '', predikat: '', keterangan: '' },
  ];

  return (
    <div className="page detail-raport-page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <img
              src="/logo-madinah.png"
              alt="Madinah Al-Quds"
              style={{ width: '40px', height: '40px', borderRadius: '8px' }}
            />
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Guru &gt; Raport &gt; Detail Raport
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
              <li onClick={() => navigate('/kelas')}>
                <BookOpen size={18}/> Kelas
              </li>
              <li onClick={() => navigate('/wali-kelas')}>
                <Users size={18}/> Wali Kelas
              </li>
              <li onClick={() => navigate('/ekstrakurikuler')}>
                <ClipboardList size={18}/> Ekstrakurikuler
              </li>
              <li onClick={() => navigate('/nilai')}>
                <GraduationCap size={18}/> Nilai
              </li>
              <li className="active" onClick={() => navigate('/raport')}>
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

          {/* ================= HEADER WITH BACK BUTTON (PANAH SAJA) ================= */}
          <div className="page-header">
            <div className="header-left">
              <button className="btn-back" onClick={() => navigate('/raport')} title="Kembali">
                ←
              </button>
              <div>
                <h1>Detail Raport Siswa</h1>
                <p className="subtitle">Informasi lengkap pencapaian kompetensi dan ekstrakurikuler</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn-download">
                <Download size={16} /> Unduh PDF
              </button>
              <button className="btn-print">
                <Printer size={16} /> Cetak
              </button>
            </div>
          </div>

          {/* ================= STUDENT INFO CARD ================= */}
          <div className="student-info-card">
            <div className="student-avatar">
              <User size={40} />
            </div>
            <div className="student-details">
              <h2>Murad Ali</h2>
              <div className="student-meta">
                <p><span className="label">NIS:</span> 202400100123456789</p>
                <p><span className="label">Kelas:</span> XII - A</p>
                <p><span className="label">Semester:</span> Ganjil 2025/2026</p>
              </div>
            </div>
            <div className="student-status">
              <span className="status-badge selesai">Selesai</span>
            </div>
          </div>

          {/* ================= PENCAPAIAN KOMPETENSI SECTION ================= */}
          <div className="section-card">
            <div className="section-header">
              <Award size={20} />
              <h2>PENCAPAIAN KOMPETENSI MURID</h2>
            </div>

            <div className="kompetensi-table-container">
              <table className="kompetensi-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Mata Pelajaran</th>
                    <th>Nilai Akhir</th>
                  </tr>
                </thead>
                <tbody>
                  {kompetensiData.map((item) => (
                    <tr key={item.no}>
                      <td>{item.no}</td>
                      <td>{item.nama}</td>
                      <td>
                        <span className="nilai-badge">{item.nilai}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= KURIKULUM SECTION ================= */}
          <div className="section-card">
            <div className="section-header">
              <BookOpen size={20} />
              <h2>Kurikulum</h2>
            </div>

            <div className="sub-section">
              <h3>Kelompok A</h3>
              <table className="kompetensi-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Mata Pelajaran</th>
                    <th>Nilai Akhir</th>
                    <th>Capaian Kompetensi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Pendidikan Agama dan Budi Pekerti</td>
                    <td>87</td>
                    <td><span className="capaian-baik">Baik</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Pendidikan Pancasila</td>
                    <td>85</td>
                    <td><span className="capaian-baik">Baik</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sub-section">
              <h3>Kelompok B</h3>
              <table className="kompetensi-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Mata Pelajaran</th>
                    <th>Nilai Akhir</th>
                    <th>Capaian Kompetensi</th>
                   </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Bahasa Indonesia</td>
                    <td>82</td>
                    <td><span className="capaian-baik">Baik</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Matematika</td>
                    <td>78</td>
                    <td><span className="capaian-cukup">Cukup</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= KOKURIKULER SECTION ================= */}
          <div className="section-card">
            <div className="section-header">
              <ClipboardList size={20} />
              <h2>Kokurikuler</h2>
            </div>

            <div className="kokurikuler-info">
              <p><span className="label">Dibuat oleh:</span> Ustadz Idris</p>
              <p><span className="label">Nama:</span> Murad</p>
              <p><span className="label">Nama Lengkap:</span> Murad Ali</p>
              <p><span className="label">NIS:</span> 202400100123456789</p>
            </div>
          </div>

          {/* ================= EKSTRAKURIKULER SECTION ================= */}
          <div className="section-card">
            <div className="section-header">
              <Award size={20} />
              <h2>Ekstrakurikuler</h2>
            </div>

            <div className="ekstra-table-container">
              <table className="ekstra-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Kegiatan Ekstrakurikuler</th>
                    <th>Predikat</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {ekstraData.map((item) => (
                    <tr key={item.no}>
                      <td>{item.no}</td>
                      <td>{item.kategori || '-'}</td>
                      <td>
                        {item.predikat && (
                          <span className={`predikat-badge ${item.predikat === 'Sangat Baik' ? 'blok' : 'sergel'}`}>
                            {item.predikat}
                          </span>
                        )}
                      </td>
                      <td className="kontenjan-text">{item.keterangan || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= KETIDAKHADIRAN SECTION ================= */}
          <div className="section-card">
            <div className="section-header">
              <XCircle size={20} />
              <h2>Ketidakhadiran</h2>
            </div>

            <div className="absensi-grid">
              <div className="absensi-item">
                <span className="absensi-label">Sakit:</span>
                <span className="absensi-value">2 Hari</span>
              </div>
              <div className="absensi-item">
                <span className="absensi-label">Izin:</span>
                <span className="absensi-value">1 Hari</span>
              </div>
              <div className="absensi-item">
                <span className="absensi-label">Tanpa Keterangan:</span>
                <span className="absensi-value">0 Hari</span>
              </div>
            </div>
          </div>

          {/* ================= CATATAN WALI KELAS ================= */}
          <div className="section-card">
            <div className="section-header">
              <FileText size={20} />
              <h2>Catatan Wali Kelas</h2>
            </div>

            <div className="catatan-content">
              <p><strong>Catatan Perkembangan:</strong> Siswa menunjukkan kondisi belajar yang aktif dan performa yang memuaskan secara keseluruhan.</p>
              <p><strong>Rekomendasi:</strong> Diharapkan dapat terus meningkatkan semangat belajar, khususnya pada mata pelajaran Matematika.</p>
              <p><strong>Kesimpulan:</strong> Siswa menunjukkan kemajuan yang baik dan komposisi nilai yang memuaskan.</p>
            </div>
          </div>

          {/* ================= TANGGAPAN ORANG TUA ================= */}
          <div className="section-card">
            <div className="section-header">
              <Users size={20} />
              <h2>Tanggapan Orangtua / Wali Murid</h2>
            </div>

            <div className="tanggapan-placeholder">
              <p>_________________________________________</p>
              <p>_________________________________________</p>
              <p>_________________________________________</p>
            </div>
          </div>

          {/* ================= KENAIKAN KELAS SECTION ================= */}
          <div className="section-card">
            <div className="section-header">
              <AlertCircle size={20} />
              <h2>Keterangan Kenaikan Kelas</h2>
            </div>

            <div className="kesflusin-content">
              <p><strong>Berdasarkan hasil penilaian selama satu semester, siswa dinyatakan:</strong></p>

              <div className="kesflusin-list">
                <p><span className="label">Status:</span> Naik Kelas</p>
                <p><span className="label">Catatan Khusus:</span> -</p>
                <p><span className="label">Rekomendasi:</span> Pertahankan prestasi dan tingkatkan kedisiplinan</p>
              </div>
            </div>
          </div>

          {/* ================= SIGNATURE SECTION ================= */}
          <div className="signature-section">
            <div className="signature-left">
              <p>Mengetahui,</p>
              <p>Bandung, 20 Desember 2025</p>
              <br />
              <br />
              <br />
              <p><strong>Wali Kelas</strong></p>
            </div>

            <div className="signature-right">
              <p>Menyetujui,</p>
              <p>Bandung, 20 Desember 2025</p>
              <br />
              <br />
              <br />
              <p><strong>Kepala Sekolah</strong></p>
              <p>NIP. 197001010001000001</p>
            </div>
          </div>

          {/* ================= PAGINATION INFO ================= */}
          <div className="pagination-info">
            Menampilkan raport lengkap untuk Murad Ali
          </div>

        </main>

      </div>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">

            {/* KOLOM 1: LOGO */}
            <div className="footer-section footer-logo">
              <img
                src="/logo-madinah.png"
                alt="Logo Madinah"
                className="footer-logo-img"
              />
              <h3 className="footer-brand">Madinah El - Quds</h3>
            </div>

            {/* KOLOM 2: Hubungi Kami */}
            <div className="footer-section">
              <h4>Hubungi Kami</h4>
              <p><MapPinned size={18} /> Jl. Pendidikan No. 123, Kota Santri, Indonesia</p>
              <p><Phone size={18} /><a href="tel:+622112345678">+62 21 1234-5678</a></p>
              <p><Mail size={18} /><a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a></p>
            </div>

            {/* KOLOM 3: Jam Layanan */}
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

export default DetailRaport;