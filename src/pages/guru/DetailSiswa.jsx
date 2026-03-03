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
  User,
  MapPin,
  GraduationCap,
  Calendar,
  Award,
  BookMarked,
  Medal,
  BookCheck,
  Users as UsersIcon
} from "lucide-react";

import "./DetailSiswa.css";
import { useNavigate, useParams } from 'react-router-dom';

function DetailSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy siswa (bukan wali kelas)
  const dataSiswa = {
    id: id,
    nis: "2024001",
    nisn: "0061234567",
    nama: "Ahmad Fauzan",
    kelas: "X-2",
    jurusan: "IPA",
    jk: "Laki-laki",
    tempatLahir: "Jakarta",
    tanggalLahir: "15 Mei 2009",
    alamat: "Jl. Merdeka No. 45, Jakarta",
    telp: "081234567890",
    email: "ahmad.fauzan@student.sch.id",
    namaAyah: "Bapak Ahmad",
    namaIbu: "Ibu Siti",
    pekerjaanOrtu: "Wiraswasta",
    waliKelas: "Ustadz Ahmad Rahman",
    prestasi: ["Juara 1 MTQ", "Juara 3 Olimpiade Matematika"],
    ekstrakurikuler: ["Tilawah", "Debat Bahasa Arab"],
    rataRataNilai: 89.5
  };

  // Data nilai per mata pelajaran
  const dataNilai = [
    { mapel: "Pendidikan Agama Islam", pengetahuan: 90, keterampilan: 88, sikap: "A" },
    { mapel: "Matematika", pengetahuan: 85, keterampilan: 82, sikap: "B" },
    { mapel: "Bahasa Indonesia", pengetahuan: 88, keterampilan: 86, sikap: "A" },
    { mapel: "Bahasa Inggris", pengetahuan: 92, keterampilan: 90, sikap: "A" },
    { mapel: "Fisika", pengetahuan: 78, keterampilan: 80, sikap: "B" },
    { mapel: "Kimia", pengetahuan: 82, keterampilan: 84, sikap: "B" },
    { mapel: "Biologi", pengetahuan: 88, keterampilan: 85, sikap: "A" },
    { mapel: "Sejarah", pengetahuan: 86, keterampilan: 84, sikap: "B" },
  ];

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
                Guru &gt; Wali Kelas &gt; Detail Siswa
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
              <li className="active" onClick={() => navigate('/wali-kelas')}><Users size={18}/> Wali Kelas</li>
              <li onClick={() => navigate('/ekstrakurikuler')}><ClipboardList size={18}/> Ekstrakurikuler</li>
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
          <div className="back-button" onClick={() => navigate('/wali-kelas')}>
            <ChevronLeft size={20} />
            <span>Kembali ke Daftar Wali Kelas</span>
          </div>

          {/* ================= PROFILE CARD SISWA ================= */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-large">
                {dataSiswa.nama.split(' ').map(word => word[0]).join('').substring(0, 2)}
              </div>
              <div className="profile-title">
                <h1>{dataSiswa.nama}</h1>
                <p className="profile-role">Siswa Kelas {dataSiswa.kelas} • {dataSiswa.jurusan}</p>
              </div>
              <div className="profile-badge">
                <span className="nis-badge">NIS: {dataSiswa.nis}</span>
                <span className="nisn-badge">NISN: {dataSiswa.nisn}</span>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <GraduationCap size={20} />
                <div>
                  <div className="stat-label">Kelas</div>
                  <div className="stat-value">{dataSiswa.kelas}</div>
                </div>
              </div>
              <div className="stat-item">
                <Medal size={20} />
                <div>
                  <div className="stat-label">Rata-rata Nilai</div>
                  <div className="stat-value">{dataSiswa.rataRataNilai}</div>
                </div>
              </div>
              <div className="stat-item">
                <Calendar size={20} />
                <div>
                  <div className="stat-label">Usia</div>
                  <div className="stat-value">16 Tahun</div>
                </div>
              </div>
            </div>

            <div className="profile-footer">
              <div className="info-wali">
                <UsersIcon size={16} />
                <span>Wali Kelas: <strong>{dataSiswa.waliKelas}</strong></span>
              </div>
            </div>
          </div>

          {/* ================= TABEL NILAI ================= */}
          <div className="nilai-section">
            <div className="nilai-header">
              <h3>
                <BookCheck size={20} />
                Nilai Per Mata Pelajaran
              </h3>
              <div className="nilai-legend">
                <span className="legend-item">Rata-rata: {dataSiswa.rataRataNilai}</span>
              </div>
            </div>

            <div className="table-container">
              <table className="nilai-table">
                <thead>
                  <tr>
                    <th>Mata Pelajaran</th>
                    <th>Nilai Pengetahuan</th>
                    <th>Nilai Keterampilan</th>
                    <th>Sikap</th>
                    <th>Rata-rata</th>
                  </tr>
                </thead>
                <tbody>
                  {dataNilai.map((item, index) => {
                    const rataMapel = ((item.pengetahuan + item.keterampilan) / 2).toFixed(1);
                    return (
                      <tr key={index}>
                        <td className="mapel-name">{item.mapel}</td>
                        <td className="nilai-angka">{item.pengetahuan}</td>
                        <td className="nilai-angka">{item.keterampilan}</td>
                        <td>
                          <span className={`badge-sikap ${item.sikap === 'A' ? 'sikap-a' : 'sikap-b'}`}>
                            {item.sikap}
                          </span>
                        </td>
                        <td className="nilai-rata">{rataMapel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= DETAIL GRID ================= */}
          <div className="detail-grid">
            {/* Informasi Pribadi Siswa */}
            <div className="detail-card">
              <h3>
                <User size={18} />
                Informasi Pribadi
              </h3>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Nama Lengkap</span>
                  <span className="detail-value">{dataSiswa.nama}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">NIS</span>
                  <span className="detail-value">{dataSiswa.nis}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">NISN</span>
                  <span className="detail-value">{dataSiswa.nisn}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Jenis Kelamin</span>
                  <span className="detail-value">{dataSiswa.jk}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tempat, Tanggal Lahir</span>
                  <span className="detail-value">{dataSiswa.tempatLahir}, {dataSiswa.tanggalLahir}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Alamat</span>
                  <span className="detail-value">{dataSiswa.alamat}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telepon</span>
                  <span className="detail-value">{dataSiswa.telp}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{dataSiswa.email}</span>
                </div>
              </div>
            </div>

            {/* Informasi Akademik */}
            <div className="detail-card">
              <h3>
                <GraduationCap size={18} />
                Informasi Akademik
              </h3>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Kelas</span>
                  <span className="detail-value">{dataSiswa.kelas}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Jurusan</span>
                  <span className="detail-value">{dataSiswa.jurusan}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wali Kelas</span>
                  <span className="detail-value">{dataSiswa.waliKelas}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rata-rata Nilai</span>
                  <span className="detail-value">{dataSiswa.rataRataNilai}</span>
                </div>
              </div>
            </div>

            {/* Informasi Orang Tua */}
            <div className="detail-card">
              <h3>
                <Users size={18} />
                Informasi Orang Tua
              </h3>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Nama Ayah</span>
                  <span className="detail-value">{dataSiswa.namaAyah}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Nama Ibu</span>
                  <span className="detail-value">{dataSiswa.namaIbu}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pekerjaan Orang Tua</span>
                  <span className="detail-value">{dataSiswa.pekerjaanOrtu}</span>
                </div>
              </div>
            </div>

            {/* Prestasi & Ekstrakurikuler */}
            <div className="detail-card">
              <h3>
                <Award size={18} />
                Prestasi & Ekstrakurikuler
              </h3>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Prestasi</span>
                  <div className="badge-list">
                    {dataSiswa.prestasi.map((item, index) => (
                      <span key={index} className="badge-prestasi">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ekstrakurikuler</span>
                  <div className="badge-list">
                    {dataSiswa.ekstrakurikuler.map((item, index) => (
                      <span key={index} className="badge-ekstra">{item}</span>
                    ))}
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

export default DetailSiswa;