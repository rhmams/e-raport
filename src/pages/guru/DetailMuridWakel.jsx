import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  LogOut,
  ArrowLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPinned,
  Clock as ClockIcon,
  Calendar,
  Award,
  GraduationCap
} from "lucide-react";
import "./DetailMuridWakel.css";

function DetailMuridWakel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Data murid wali kelas (contoh) - bisa diganti dengan data dari API berdasarkan id
  const muridData = {
    id: 1,
    nama: "Ahmad Fauzi",
    nis: "2023001",
    kelas: "X-2",
    jenisKelamin: "Laki-Laki",
    tempatTglLahir: "Jakarta, 15 Mei 2008",
    alamat: "Jl. Raya Malani No. 45, Jakarta Timur",
    namaAyah: "Bagus Faizan Rahman",
    namaIbu: "Siti Aminah",
    noTelp: "0812-3456-7890",
    email: "ahmad.fauzi@edu.id",
    
    // Data kehadiran
    hadir: 152,
    sakit: 5,
    izin: 3,
    alpha: 0,
    
    // Data nilai per semester
    semester1: {
      rataRata: 85.2,
      peringkat: 5
    },
    semester2: {
      rataRata: 87.5,
      peringkat: 3
    },
    
    // Prestasi
    prestasi: [
      "Juara 1 Olimpiade Matematika Tingkat Provinsi 2023",
      "Best Student Award Semester Ganjil 2023/2024",
      "Juara 2 Lomba Tahfiz Al-Quran"
    ],
    
    // Nilai per mata pelajaran
    nilaiMapel: [
      { no: 1, mapel: "Al-Quran Hadith", nilai: 90, predikat: "A" },
      { no: 2, mapel: "Matematika", nilai: 85, predikat: "A+" },
      { no: 3, mapel: "Bahasa Indonesia", nilai: 88, predikat: "A+" },
      { no: 4, mapel: "Bahasa Inggris", nilai: 87, predikat: "A+" },
      { no: 5, mapel: "Fisika", nilai: 89, predikat: "A+" },
      { no: 6, mapel: "Kimia", nilai: 86, predikat: "A+" },
      { no: 7, mapel: "Biologi", nilai: 86, predikat: "A+" },
      { no: 8, mapel: "Sejarah Kebudayaan Islam", nilai: 92, predikat: "A" }
    ]
  };

  // Hitung rata-rata nilai
  const rataRataNilai = (muridData.nilaiMapel.reduce((acc, curr) => acc + curr.nilai, 0) / muridData.nilaiMapel.length).toFixed(1);
  
  // Hitung persentase kehadiran
  const totalKehadiran = muridData.hadir + muridData.sakit + muridData.izin + muridData.alpha;
  const persentaseKehadiran = ((muridData.hadir / totalKehadiran) * 100).toFixed(0);

  // Navigasi
  const goToBeranda = () => navigate('/');
  const goToKelas = () => navigate('/kelas');
  const goToWaliKelas = () => navigate('/wali-kelas');
  const goToEkstrakurikuler = () => navigate('/ekstrakurikuler');
  const goToNilai = () => navigate('/nilai');
  const goToRaport = () => navigate('/raport');
  const goToWaliKelasPage = () => navigate('/wali-kelas');

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
                Guru <ChevronRight size={12} /> 
                <span onClick={goToWaliKelasPage} style={{ cursor: 'pointer' }}>Wali Kelas</span>
                <ChevronRight size={12} /> Detail Murid
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
                onClick={goToBeranda}
              >
                <LayoutDashboard size={18}/> Beranda
              </li>
              <li 
                className={location.pathname.startsWith('/kelas') && !location.pathname.includes('/kelas/') ? 'active' : ''} 
                onClick={goToKelas}
              >
                <BookOpen size={18}/> Kelas
              </li>
              <li 
                className={location.pathname === '/wali-kelas' ? 'active' : ''} 
                onClick={goToWaliKelas}
              >
                <Users size={18}/> Wali Kelas
              </li>
              <li 
                className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} 
                onClick={goToEkstrakurikuler}
              >
                <ClipboardList size={18}/> Ekstrakurikuler
              </li>
              <li 
                className={location.pathname === '/nilai' ? 'active' : ''} 
                onClick={goToNilai}
              >
                <GraduationCap size={18}/> Nilai
              </li>
              <li 
                className={location.pathname === '/raport' ? 'active' : ''} 
                onClick={goToRaport}
              >
                <FileText size={18}/> Raport 
              </li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}>
            <LogOut size={18}/> Keluar
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main detail-murid-main">
          <div className="container">

            {/* Back Button */}
            <button className="back-button" onClick={goToWaliKelasPage}>
              <ArrowLeft size={18} />
              Kembali ke Daftar Murid
            </button>

            {/* Header */}
            <div className="detail-header">
              <h1>Detail Murid</h1>
              <p className="header-subtitle">Informasi lengkap murid wali kelas: {muridData.nama}</p>
            </div>

            {/* Garis Pemisah */}
            <hr className="divider" />

            {/* Profile Section */}
            <div className="profile-section">
              <div className="profile-avatar">
                {muridData.nama.split(' ').map(word => word[0]).join('').substring(0, 2)}
              </div>
              <div className="profile-info">
                <h2>{muridData.nama}</h2>
                <p className="profile-meta">NIS: {muridData.nis} • Kelas {muridData.kelas}</p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="detail-grid">
              
              {/* Left Column - Biodata */}
              <div className="left-column">
                
                {/* Biodata Pribadi */}
                <div className="info-card">
                  <h3>A. Biodata Pribadi</h3>
                  <div className="info-list">
                    <div className="info-row">
                      <span className="info-label">Jenis Kelamin:</span>
                      <span className="info-value">{muridData.jenisKelamin}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Tempat, Tanggal Lahir:</span>
                      <span className="info-value">{muridData.tempatTglLahir}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Alamat:</span>
                      <span className="info-value">{muridData.alamat}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Nama Ayah:</span>
                      <span className="info-value">{muridData.namaAyah}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Nama Ibu:</span>
                      <span className="info-value">{muridData.namaIbu}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">No. Telepon:</span>
                      <span className="info-value">{muridData.noTelp}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{muridData.email}</span>
                    </div>
                  </div>
                </div>

                {/* Prestasi dan Penghargaan */}
                <div className="info-card">
                  <h3>Prestasi dan Penghargaan</h3>
                  <ul className="prestasi-list">
                    {muridData.prestasi.map((item, index) => (
                      <li key={index}>
                        <Award size={16} color="#16a085" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Kehadiran & Akademik */}
              <div className="right-column">
                
                {/* Kehadiran Card */}
                <div className="kehadiran-card">
                  <h3>B. Detail Kehadiran</h3>
                  <div className="kehadiran-grid">
                    <div className="kehadiran-item">
                      <span className="kehadiran-label">Hadir</span>
                      <span className="kehadiran-value hadir">{muridData.hadir}</span>
                    </div>
                    <div className="kehadiran-item">
                      <span className="kehadiran-label">Sakit</span>
                      <span className="kehadiran-value sakit">{muridData.sakit}</span>
                    </div>
                    <div className="kehadiran-item">
                      <span className="kehadiran-label">Izin</span>
                      <span className="kehadiran-value izin">{muridData.izin}</span>
                    </div>
                    <div className="kehadiran-item">
                      <span className="kehadiran-label">Alpha</span>
                      <span className="kehadiran-value alpha">{muridData.alpha}</span>
                    </div>
                  </div>
                  <div className="kehadiran-footer">
                    <div className="persentase">
                      <span>Persentase Kehadiran:</span>
                      <strong>{persentaseKehadiran}%</strong>
                    </div>
                    <div className="total">
                      <span>Total Perolehan:</span>
                      <strong>100%</strong>
                    </div>
                  </div>
                </div>

                {/* Perkembangan Akademik */}
                <div className="info-card">
                  <h3>C. Perkembangan Akademik</h3>
                  <div className="akademik-grid">
                    <div className="semester-card">
                      <h4>Semester 1</h4>
                      <div className="semester-detail">
                        <p>
                          <span>Rata-rata:</span>
                          <strong>{muridData.semester1.rataRata}</strong>
                        </p>
                        <p>
                          <span>Peringkat:</span>
                          <strong>#{muridData.semester1.peringkat}</strong>
                        </p>
                      </div>
                    </div>
                    <div className="semester-card">
                      <h4>Semester 2</h4>
                      <div className="semester-detail">
                        <p>
                          <span>Rata-rata:</span>
                          <strong>{muridData.semester2.rataRata}</strong>
                        </p>
                        <p>
                          <span>Peringkat:</span>
                          <strong>#{muridData.semester2.peringkat}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nilai Per Mata Pelajaran */}
            <div className="nilai-section">
              <h3>D. Nilai Per Mata Pelajaran</h3>
              
              <div className="table-container">
                <table className="nilai-table">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>MATERI PELAJARAN</th>
                      <th>NILAI</th>
                      <th>PREDIKAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {muridData.nilaiMapel.map((item) => (
                      <tr key={item.no}>
                        <td>{item.no}</td>
                        <td>{item.mapel}</td>
                        <td>
                          <span className="nilai-badge">{item.nilai}</span>
                        </td>
                        <td>
                          <span className={`predikat-badge ${item.predikat.toLowerCase().replace('+', 'plus')}`}>
                            {item.predikat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Rata-rata */}
              <div className="rata-rata">
                <span>Rata-rata Kemampuan:</span>
                <strong>{rataRataNilai}</strong>
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

export default DetailMuridWakel;