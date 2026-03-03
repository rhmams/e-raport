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
  User,
  MapPin,
  Plus,
  X
} from "lucide-react";

import "./Absensi.css";
import { useParams } from 'react-router-dom';

function Absensi() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const dataSiswa = [
    { nis: "2024001", nama: "Ahmad Fauzan", lhp: "L" },
    { nis: "2024002", nama: "Fatimah Azzahra", lhp: "P" },
    { nis: "2024003", nama: "Muhammad Rizki", lhp: "L" },
    { nis: "2024004", nama: "Khadijah Nur", lhp: "P" },
    { nis: "2024005", nama: "Abdullah Hasan", lhp: "L" },
  ];

  const [kehadiran, setKehadiran] = useState(
    dataSiswa.reduce((acc, siswa) => ({ ...acc, [siswa.nis]: "H" }), {})
  );

  const [semuaHadir, setSemuaHadir] = useState(true);

  const handleKehadiranChange = (nis, value) => {
    setKehadiran(prev => ({ ...prev, [nis]: value }));
    const allHadir = Object.values({ ...kehadiran, [nis]: value }).every(v => v === "H");
    setSemuaHadir(allHadir);
  };

  const handleSemuaHadirChange = (e) => {
    const checked = e.target.checked;
    setSemuaHadir(checked);
    
    if (checked) {
      const newKehadiran = {};
      dataSiswa.forEach(siswa => {
        newKehadiran[siswa.nis] = "H";
      });
      setKehadiran(newKehadiran);
    }
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
                Guru &gt; Kelas &gt; {id} &gt; Absensi
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
          <div className="back-button" onClick={() => window.history.back()}>
            <ChevronLeft size={20} />
            <span>Kembali ke Detail Kelas</span>
          </div>

          {/* ================= HEADER KELAS ================= */}
          <div className="absensi-header">
            <h1>
              Kehadiran Kelas X-2 <span className="header-sub">- Matematika</span>
            </h1>
            <div className="header-info">
              <span><User size={16} /> Wali Kelas: Ustadz Ahmad Rahman</span>
              <span className="separator">•</span>
              <span><MapPin size={16} /> Ruang R-102</span>
            </div>
          </div>

          {/* ================= EMPTY STATE ================= */}
          <div className="empty-state">
            <div className="empty-icon">
              <ClipboardList size={64} />
            </div>
            <h2>Belum Ada Data Kehadiran</h2>
            <p>Klik tombol "Tambah Kehadiran Baru" untuk mulai mencatat kehadiran siswa</p>
            <button className="btn-tambah" onClick={() => setShowModal(true)}>
              <Plus size={20} /> Tambah Kehadiran Baru
            </button>
          </div>

        </main>

      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tambah Kehadiran Baru</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Tanggal Kehadiran</label>
                <input type="date" className="form-control" defaultValue="2026-02-25" />
              </div>

              <div className="form-group">
                <label>Modul</label>
                <input type="text" className="form-control" placeholder="Contoh: Pengenalan Aljabar" />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={semuaHadir} 
                    onChange={handleSemuaHadirChange}
                  />
                  <span>Tandai semua siswa hadir?</span>
                </label>
                <span className="badge-all">Semua Hadir</span>
              </div>

              <div className="table-responsive">
                <table className="kehadiran-table">
                  <thead>
                    <tr>
                      <th>NIS</th>
                      <th>Nama</th>
                      <th>L/P</th>
                      <th>H</th>
                      <th>S</th>
                      <th>I</th>
                      <th>A</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSiswa.map((siswa) => (
                      <tr key={siswa.nis}>
                        <td>{siswa.nis}</td>
                        <td>{siswa.nama}</td>
                        <td>{siswa.lhp}</td>
                        <td>
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`} 
                            value="H"
                            checked={kehadiran[siswa.nis] === "H"}
                            onChange={() => handleKehadiranChange(siswa.nis, "H")}
                          />
                        </td>
                        <td>
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`}
                            value="S"
                            checked={kehadiran[siswa.nis] === "S"}
                            onChange={() => handleKehadiranChange(siswa.nis, "S")}
                          />
                        </td>
                        <td>
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`}
                            value="I"
                            checked={kehadiran[siswa.nis] === "I"}
                            onChange={() => handleKehadiranChange(siswa.nis, "I")}
                          />
                        </td>
                        <td>
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`}
                            value="A"
                            checked={kehadiran[siswa.nis] === "A"}
                            onChange={() => handleKehadiranChange(siswa.nis, "A")}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn-simpan">Simpan Kehadiran</button>
            </div>
          </div>
        </div>
      )}

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

export default Absensi;