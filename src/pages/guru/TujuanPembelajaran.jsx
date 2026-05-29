// src/pages/guru/TujuanPembelajaran.jsx
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  MapPinned,
  Clock as ClockIcon,
  ArrowLeft,
  GraduationCap,
  Plus,
  X
} from "lucide-react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import "./TujuanPembelajaran.css";

function TujuanPembelajaran() {
  const navigate = useNavigate();
  const location = useLocation();
  const { kelasId } = useParams();
  
  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    mataPelajaran: "",
    kompetensi: "Pengetahuan",
    semester: "1",
    kode: "",
    kompetensiDasar: ""
  });

  const kelasData = {
    'x-2': { name: 'Kelas X-2', mapel: 'Matematika' },
    'x-4': { name: 'Kelas X-4', mapel: 'Bahasa Indonesia' },
    'xi-2': { name: 'Kelas XI-2', mapel: 'Fisika' },
    'xi-3': { name: 'Kelas XI-3', mapel: 'Kimia' },
    'xi-6': { name: 'Kelas XI-6', mapel: 'Bahasa Inggris' },
    'xii-1': { name: 'Kelas XII-1', mapel: 'Biologi' },
    'xii-2': { name: 'Kelas XII-2', mapel: 'Sejarah' }
  };
  
  const kelas = kelasData[kelasId] || { name: 'Kelas', mapel: '' };
  
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataKompetensi, setDataKompetensi] = useState([]);
  
  const totalEntries = dataKompetensi.length;
  const totalPages = Math.ceil(totalEntries / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentData = dataKompetensi.slice(startIndex, endIndex);
  
  const handleShowEntriesChange = (e) => {
    setShowEntries(parseInt(e.target.value));
    setCurrentPage(1);
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTambahData = () => {
    if (!formData.mataPelajaran || !formData.kode || !formData.kompetensiDasar) {
      alert("Harap isi Mata Pelajaran, Kode, dan Kompetensi Dasar!");
      return;
    }
    const newData = {
      mataPelajaran: formData.mataPelajaran,
      kompetensi: formData.kompetensi,
      tingkatanKelas: kelas.name,
      semester: formData.semester,
      kode: formData.kode,
      kompetensiDasar: formData.kompetensiDasar
    };
    setDataKompetensi([...dataKompetensi, newData]);
    setFormData({
      mataPelajaran: "",
      kompetensi: "Pengetahuan",
      semester: "1",
      kode: "",
      kompetensiDasar: ""
    });
    setIsModalOpen(false);
  };
  
  const goToBeranda = () => navigate('/beranda');
  const goToKelas = () => navigate('/kelas');
  const goToWaliKelas = () => navigate('/wali-kelas');
  const goToEkstrakurikuler = () => navigate('/ekstrakurikuler');
  const goToNilai = () => navigate('/nilai');
  const goToRaport = () => navigate('/raport');
  const handleLogout = () => navigate('/login');
  const goBack = () => navigate(-1);
  
  const isActive = (path) => location.pathname.includes(path);
  
  return (
    <div className="page">
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="nav-left">
            <img src="/logo-madinah.png" alt="Madinah Al-Quds" style={{ width: '40px', height: '40px', borderRadius: '8px' }} /> 
            <div className="nav-text">
              <div className="brand-nav">Madinah Al-Quds</div>
              <div className="breadcrumb">
                Guru <ChevronRight size={12} /> 
                <span onClick={goToKelas} style={{ cursor: 'pointer' }}>Kelas</span> 
                <ChevronRight size={12} /> 
                <span onClick={goBack} style={{ cursor: 'pointer' }}>{kelas.name}</span>
                <ChevronRight size={12} /> Tujuan Pembelajaran
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
      
      <div className="layout">
        <aside className="sidebar">
          <div>
            <ul className="menu">
              <li onClick={goToBeranda} className={isActive('/beranda') ? 'active' : ''}><LayoutDashboard size={18}/> Beranda</li>
              <li onClick={goToKelas} className={isActive('/kelas') ? 'active' : ''}><BookOpen size={18}/> Kelas</li>
              <li onClick={goToWaliKelas}><Users size={18}/> Wali Kelas</li>
              <li onClick={goToEkstrakurikuler}><ClipboardList size={18}/> Ekstrakurikuler</li>
              <li onClick={goToNilai}><GraduationCap size={18}/> Nilai</li>
              <li onClick={goToRaport}><FileText size={18}/> Raport</li>
            </ul>
          </div>
          <div className="logout" onClick={handleLogout}><LogOut size={18}/> Keluar</div>
        </aside>
        
        <main className="main tujuan-main">
          <div className="container">
            <button className="back-button" onClick={goBack}><ArrowLeft size={18} /></button>
            
            <div className="tujuan-header">
              <h1>Data Kompetensi Dasar</h1>
              <p className="header-subtitle">{kelas.name} - {kelas.mapel}</p>
            </div>
            
            <div className="tujuan-card">
              <div className="table-controls">
                <div className="show-entries">
                  <span>Show</span>
                  <select value={showEntries} onChange={handleShowEntriesChange}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>
                
                <button className="btn-tambah-data" onClick={() => setIsModalOpen(true)}>
                  <Plus size={18} /> Tambah Data
                </button>
              </div>
              
              <div className="table-container">
                <table className="kompetensi-table">
                  <thead>
                    <tr>
                      <th>No</th><th>Mata Pelajaran</th><th>Kompetensi</th><th>Tingkatan Kelas</th><th>Semester</th><th>Kode</th><th>Kompetensi Dasar</th><th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length === 0 ? (
                      <tr><td colSpan="8" className="empty-data">No data available in table</td></tr>
                    ) : (
                      currentData.map((item, idx) => (
                        <tr key={idx}>
                          <td>{startIndex + idx + 1}</td>
                          <td>{item.mataPelajaran}</td>
                          <td>{item.kompetensi}</td>
                          <td>{item.tingkatanKelas}</td>
                          <td>{item.semester}</td>
                          <td>{item.kode}</td>
                          <td>{item.kompetensiDasar}</td>
                          <td><button className="btn-delete" onClick={() => {
                            const newData = [...dataKompetensi];
                            newData.splice(startIndex + idx, 1);
                            setDataKompetensi(newData);
                          }}>Hapus</button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="pagination-footer">
                <div className="pagination-info-text">
                  Showing {totalEntries === 0 ? 0 : startIndex + 1} to {totalEntries === 0 ? 0 : Math.min(endIndex, totalEntries)} of {totalEntries} entries
                </div>
                <div className="pagination-buttons">
                  <button onClick={goToPrevPage} disabled={currentPage === 1 || totalEntries === 0} className="pagination-nav-btn">Previous</button>
                  <button onClick={goToNextPage} disabled={currentPage === totalPages || totalEntries === 0} className="pagination-nav-btn">Next</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* MODAL TAMBAH DATA - seperti di foto Catatan Prestasi Akhir */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Kompetensi Dasar</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Mata Pelajaran</label>
                <select name="mataPelajaran" value={formData.mataPelajaran} onChange={handleInputChange}>
                  <option value="">Pilih Mata Pelajaran</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Kimia">Kimia</option>
                  <option value="Biologi">Biologi</option>
                  <option value="Sejarah">Sejarah</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kompetensi</label>
                <select name="kompetensi" value={formData.kompetensi} onChange={handleInputChange}>
                  <option value="Pengetahuan">Pengetahuan</option>
                  <option value="Keterampilan">Keterampilan</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tingkatan Kelas</label>
                <input type="text" value={kelas.name} disabled />
              </div>
              <div className="form-group">
                <label>Semester</label>
                <select name="semester" value={formData.semester} onChange={handleInputChange}>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kode</label>
                <input type="text" name="kode" placeholder="Contoh: 3.1" value={formData.kode} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Kompetensi Dasar</label>
                <textarea name="kompetensiDasar" rows="4" placeholder="Deskripsi kompetensi dasar..." value={formData.kompetensiDasar} onChange={handleInputChange}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="btn-simpan" onClick={handleTambahData}>Simpan</button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section footer-logo">
              <img src="/logo-madinah.png" alt="Logo Madinah" className="footer-logo-img" />
              <h3 className="footer-brand">Madinah El - Quds</h3>
            </div>
            <div className="footer-section">
              <h4>Hubungi Kami</h4>
              <p><MapPinned size={18} /> Jl. Pendidikan No. 123, Kota Santri, Indonesia</p>
              <p><Phone size={18} /><a href="tel:+622112345678">+62 21 1234-5678</a></p>
              <p><Mail size={18} /><a href="mailto:info@alhanaan.sch.id">info@alhanaan.sch.id</a></p>
            </div>
            <div className="footer-section">
              <h4>Jam Layanan</h4>
              <p><ClockIcon size={18}/> Senin - Jumat: 07:00 - 16:00</p>
              <p><ClockIcon size={18}/> Sabtu: 07:00 - 14:00</p>
              <p><ClockIcon size={18}/> Minggu: Tutup</p>
            </div>
          </div>
          <div className="footer-bottom"><p>© 2026 Pondok Pesantren Madinah Al-Quds. Semua Hak Dilindungi.</p></div>
        </div>
      </footer>
    </div>
  );
}

export default TujuanPembelajaran;