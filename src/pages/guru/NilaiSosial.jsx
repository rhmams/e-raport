import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, FileText, LogOut,
  Phone, Mail, MapPinned, Clock as ClockIcon, GraduationCap,
  ChevronRight, ChevronDown, Plus, Brain, Wrench, Star, Heart,
  Search, Save, CheckCircle, AlertCircle, ChevronLeft, Smile
} from "lucide-react";
import "./NilaiSosial.css";

const dataSiswaContoh = [
  { id: 1, nama: "Ahmad Fauzi", nis: "2024001", avatar: "AF" },
  { id: 2, nama: "Budi Santoso", nis: "2024002", avatar: "BS" },
  { id: 3, nama: "Citra Dewi", nis: "2024003", avatar: "CD" },
  { id: 4, nama: "Dina Rahayu", nis: "2024004", avatar: "DR" },
  { id: 5, nama: "Eko Prasetyo", nis: "2024005", avatar: "EP" },
  { id: 6, nama: "Fatimah Azzahra", nis: "2024006", avatar: "FA" },
];

const aspekSosial = [
  { id: "disiplin", label: "Disiplin", desc: "Kepatuhan terhadap aturan sekolah" },
  { id: "kerjasama", label: "Kerjasama", desc: "Kemampuan bekerja dalam kelompok" },
  { id: "tanggung_jawab", label: "Tanggung Jawab", desc: "Menyelesaikan tugas dengan baik" },
  { id: "toleransi", label: "Toleransi", desc: "Menghargai perbedaan antar sesama" },
  { id: "santun", label: "Santun", desc: "Perilaku sopan di lingkungan sekolah" },
];

const nilaiOptions = [
  { value: "A", label: "A — Sangat Baik", color: "#2ecc71" },
  { value: "B", label: "B — Baik", color: "#3498db" },
  { value: "C", label: "C — Cukup", color: "#f39c12" },
  { value: "D", label: "D — Perlu Bimbingan", color: "#e74c3c" },
];

function NilaiSosial() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);
  const [nilaiData, setNilaiData] = useState({});
  const [catatanData, setCatatanData] = useState({});
  const [activeKelas] = useState({ kelas: "X-2", mapel: "Matematika" });

  const isNilaiPath = location.pathname === '/nilai' || location.pathname.startsWith('/nilai-');

  const filteredSiswa = dataSiswaContoh.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search)
  );

  const handleNilai = (siswaId, aspekId, value) => {
    setNilaiData(prev => ({ ...prev, [`${siswaId}-${aspekId}`]: value }));
  };

  const handleCatatan = (siswaId, value) => {
    setCatatanData(prev => ({ ...prev, [siswaId]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalTerisi = dataSiswaContoh.filter(s =>
    aspekSosial.every(a => nilaiData[`${s.id}-${a.id}`])
  ).length;

  const submenuStyle = {
    listStyle: 'none', margin: '2px 0 6px 0', padding: '0 0 0 28px',
    width: '100%', boxSizing: 'border-box', display: 'block', position: 'static',
  };

  const submenuItemStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
    cursor: 'pointer', fontSize: '13px', borderRadius: '8px', marginBottom: '2px',
    color: isActive ? '#2ecc71' : '#aab8c5',
    fontWeight: isActive ? '600' : '400',
    background: isActive ? 'rgba(46, 204, 113, 0.12)' : 'transparent',
    transition: 'background 0.2s, color 0.2s',
    width: '100%', boxSizing: 'border-box', position: 'static',
    whiteSpace: 'nowrap', overflow: 'hidden', flexShrink: 0,
  });

  return (
    <div className="page">
      <header className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <img src="/logo-madinah.png" alt="Madinah Al-Quds" style={{ width: '40px', height: '40px', borderRadius: '8px' }} className="navbar-logo" />
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">Guru <ChevronRight size={12} /> Nilai <ChevronRight size={12} /> Sosial</div>
            </div>
          </div>
          <div className="nav-profile">
            <div className="avatar-nav">UA</div>
            <div className="profile-text"><strong>Ustadz Ahmad</strong><p>Guru</p></div>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" style={{ overflow: 'visible' }}>
          <div style={{ overflow: 'visible' }}>
            <ul className="menu" style={{ overflow: 'visible' }}>
              <li className={location.pathname === '/beranda' ? 'active' : ''} onClick={() => navigate('/beranda')}><LayoutDashboard size={18} /> Beranda</li>
              <li className={location.pathname.startsWith('/kelas') ? 'active' : ''} onClick={() => navigate('/kelas')}><BookOpen size={18} /> Kelas</li>
              <li className={location.pathname === '/wali-kelas' ? 'active' : ''} onClick={() => navigate('/wali-kelas')}><Users size={18} /> Wali Kelas</li>
              <li className={location.pathname === '/ekstrakurikuler' ? 'active' : ''} onClick={() => navigate('/ekstrakurikuler')}><ClipboardList size={18} /> Ekstrakurikuler</li>

              <li style={{ display: 'block', padding: 0, background: 'transparent', cursor: 'default', position: 'static', overflow: 'visible' }}>
                <div onClick={() => setDropdownOpen(prev => !prev)} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
                  cursor: 'pointer', borderRadius: '12px', fontSize: '14px', fontWeight: '500',
                  color: isNilaiPath ? '#2ecc71' : 'inherit',
                  background: isNilaiPath ? 'rgba(46, 204, 113, 0.15)' : 'transparent',
                  userSelect: 'none', width: '100%', boxSizing: 'border-box',
                }}>
                  <GraduationCap size={18} />
                  <span style={{ flex: 1 }}>Nilai</span>
                  <ChevronDown size={16} style={{ transition: 'transform 0.25s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.7, flexShrink: 0 }} />
                </div>
                {dropdownOpen && (
                  <ul style={submenuStyle}>
                    <li style={submenuItemStyle(false)} onClick={() => navigate('/nilai', { state: { tab: 'pengetahuan' } })}><Brain size={14} /><span>Nilai Pengetahuan</span></li>
                    <li style={submenuItemStyle(false)} onClick={() => navigate('/nilai', { state: { tab: 'keterampilan' } })}><Wrench size={14} /><span>Nilai Keterampilan</span></li>
                    <li style={submenuItemStyle(location.pathname.startsWith('/nilai-spiritual'))} onClick={() => navigate('/nilai-spiritual')}><Heart size={14} /><span>Nilai Spiritual</span></li>
                    <li style={submenuItemStyle(location.pathname.startsWith('/nilai-sosial'))} onClick={() => navigate('/nilai-sosial')}><Smile size={14} /><span>Nilai Sosial</span></li>
                    <li style={submenuItemStyle(false)} onClick={() => navigate('/nilai-ujian')}><FileText size={14} /><span>Nilai Ujian</span></li>
                  </ul>
                )}
              </li>

              <li className={location.pathname === '/raport' ? 'active' : ''} onClick={() => navigate('/raport')}><FileText size={18} /> Raport</li>
            </ul>
          </div>
          <div className="logout" onClick={() => navigate('/login')}><LogOut size={18} /> Keluar</div>
        </aside>

        <main className="main sosial-main">
          <div className="container">
            <div className="sosial-header">
              <div className="sosial-header-left">
                <button className="btn-back" onClick={() => navigate(-1)}><ChevronLeft size={16} /> Kembali</button>
                <div className="sosial-title-wrap">
                  <div className="sosial-icon-wrap"><Heart size={26} /></div>
                  <div>
                    <h1>Nilai Sosial</h1>
                    <p className="subtitle">Penilaian sikap sosial siswa — Kelas {activeKelas.kelas} · {activeKelas.mapel}</p>
                  </div>
                </div>
              </div>
              <div className="sosial-header-right">
                <div className="progress-pill"><CheckCircle size={14} /><span>{totalTerisi}/{dataSiswaContoh.length} siswa lengkap</span></div>
                <button className={`btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
                  {saved ? <><CheckCircle size={16} /> Tersimpan</> : <><Save size={16} /> Simpan Nilai</>}
                </button>
              </div>
            </div>

            <div className="kelas-info-bar">
              <div className="kelas-info-item"><span className="kelas-info-label">Kelas</span><span className="kelas-info-value">{activeKelas.kelas}</span></div>
              <div className="kelas-info-divider" />
              <div className="kelas-info-item"><span className="kelas-info-label">Mata Pelajaran</span><span className="kelas-info-value">{activeKelas.mapel}</span></div>
              <div className="kelas-info-divider" />
              <div className="kelas-info-item"><span className="kelas-info-label">Total Siswa</span><span className="kelas-info-value">{dataSiswaContoh.length} siswa</span></div>
              <div className="kelas-info-divider" />
              <div className="kelas-info-item"><span className="kelas-info-label">Semester</span><span className="kelas-info-value">Ganjil 2025/2026</span></div>
            </div>

            <div className="legend-bar">
              <span className="legend-title">Keterangan:</span>
              {nilaiOptions.map(opt => (
                <span key={opt.value} className="legend-item" style={{ '--legend-color': opt.color }}>
                  <span className="legend-badge">{opt.value}</span>{opt.label.split('—')[1].trim()}
                </span>
              ))}
            </div>

            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Cari nama atau NIS siswa..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
            </div>

            <div className="nilai-table-wrap">
              <table className="nilai-table">
                <thead>
                  <tr>
                    <th className="th-no">No</th>
                    <th className="th-siswa">Nama Siswa</th>
                    {aspekSosial.map(aspek => (
                      <th key={aspek.id} className="th-aspek">
                        <div className="aspek-label">{aspek.label}</div>
                        <div className="aspek-desc">{aspek.desc}</div>
                      </th>
                    ))}
                    <th className="th-catatan">Catatan</th>
                    <th className="th-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.map((siswa, idx) => {
                    const semua = aspekSosial.every(a => nilaiData[`${siswa.id}-${a.id}`]);
                    return (
                      <tr key={siswa.id} className={semua ? 'row-complete' : ''}>
                        <td className="td-no">{idx + 1}</td>
                        <td className="td-siswa">
                          <div className="siswa-info">
                            <div className="siswa-avatar">{siswa.avatar}</div>
                            <div><div className="siswa-nama">{siswa.nama}</div><div className="siswa-nis">{siswa.nis}</div></div>
                          </div>
                        </td>
                        {aspekSosial.map(aspek => {
                          const key = `${siswa.id}-${aspek.id}`;
                          const val = nilaiData[key];
                          return (
                            <td key={aspek.id} className="td-nilai">
                              <div className="nilai-select-group">
                                {nilaiOptions.map(opt => (
                                  <button key={opt.value} className={`nilai-chip ${val === opt.value ? 'selected' : ''}`} style={{ '--chip-color': opt.color }} onClick={() => handleNilai(siswa.id, aspek.id, opt.value)} title={opt.label}>{opt.value}</button>
                                ))}
                              </div>
                            </td>
                          );
                        })}
                        <td className="td-catatan">
                          <textarea className="catatan-input" placeholder="Catatan..." value={catatanData[siswa.id] || ''} onChange={e => handleCatatan(siswa.id, e.target.value)} rows={2} />
                        </td>
                        <td className="td-status">
                          {semua ? <span className="status-badge complete"><CheckCircle size={13} /> Lengkap</span> : <span className="status-badge pending"><AlertCircle size={13} /> Belum</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="action-footer">
              <p className="action-hint"><AlertCircle size={14} />Pastikan semua aspek telah diisi sebelum menyimpan.</p>
              <button className={`btn-save-lg ${saved ? 'saved' : ''}`} onClick={handleSave}>
                {saved ? <><CheckCircle size={18} /> Nilai Berhasil Disimpan</> : <><Save size={18} /> Simpan Semua Nilai Sosial</>}
              </button>
            </div>
          </div>
        </main>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section footer-logo"><img src="/logo-madinah.png" alt="Logo Madinah" className="footer-logo-img" /><h3 className="footer-brand">Madinah El - Quds</h3></div>
            <div className="footer-section"><h4>Hubungi Kami</h4><p><MapPinned size={18} /> Jl. Pendidikan No. 123, Kota Santri, Indonesia</p><p><Phone size={18} /> <a href="tel:+622112345678">+62 21 1234-5678</a></p><p><Mail size={18} /> <a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a></p></div>
            <div className="footer-section"><h4>Jam Layanan</h4><p><ClockIcon size={18} /> Senin - Jumat: 07:00 - 16:00</p><p><ClockIcon size={18} /> Sabtu: 07:00 - 14:00</p><p><ClockIcon size={18} /> Minggu: Tutup</p></div>
          </div>
          <div className="footer-bottom"><p>© 2026 Pondok Pesantren Madinah Al-Quds. Semua Hak Dilindungi.</p></div>
        </div>
      </footer>
    </div>
  );
}

export default NilaiSosial;