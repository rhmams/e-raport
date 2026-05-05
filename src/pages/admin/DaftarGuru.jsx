// DaftarGuru.jsx
import React, { useState } from 'react';
import './DaftarGuru.css';
import { FaEdit, FaTrashAlt, FaSearch, FaFileExcel, FaFileExport, FaFileImport, FaUserCircle, FaChevronLeft, FaChevronRight, FaEye, FaTimes, FaSave, FaUserPlus } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const DaftarGuru = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // State untuk modal tambah guru
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [tambahForm, setTambahForm] = useState({
    initials: '',
    nip: '',
    name: '',
    subject: '',
    email: '',
    phone: '',
    status: 'PNS'
  });
  const [editForm, setEditForm] = useState({
    nip: '',
    name: '',
    subject: '',
    email: '',
    phone: '',
    status: ''
  });

  // Data guru
  const [teachers, setTeachers] = useState([
    { no: 1, initials: "AZ", nip: "197801012005011001", name: "Ahmad Zaki, S.Pd.I", subject: "Al-Quran Hadits", email: "ahmad.zaki@madrasah.sch.id", phone: "081234567890", status: "PNS" },
    { no: 2, initials: "FA", nip: "198205152006042002", name: "Fatimah Azzahra, S.Pd.", subject: "Pendidikan Agama Islam", email: "fatimah.azzahra@madrasah.sch.id", phone: "081234567891", status: "PNS" },
    { no: 3, initials: "SN", nip: "199003102015031003", name: "Siti Nurhaliza, S.Pd.", subject: "Bahasa Indonesia", email: "siti.nurhaliza@madrasah.sch.id", phone: "081234567892", status: "GTY" },
    { no: 4, initials: "MR", nip: "198706202012011004", name: "Muhammad Rizki, S.Pd.", subject: "Matematika", email: "muhammad.rizki@madrasah.sch.id", phone: "081234567893", status: "PNS" },
    { no: 5, initials: "NA", nip: "199204152016042005", name: "Nur Azizah, S.Pd.I", subject: "Fiqih", email: "nur.azizah@madrasah.sch.id", phone: "081234567894", status: "GTY" },
    { no: 6, initials: "HB", nip: "198508252010011006", name: "Hasan Basri, S.Pd.", subject: "Fisika", email: "hasan.basri@madrasah.sch.id", phone: "081234567895", status: "PNS" },
    { no: 7, initials: "AP", nip: "199105102015042007", name: "Aisyah Putri, S.Pd.", subject: "Bahasa Inggris", email: "aisyah.putri@madrasah.sch.id", phone: "081234567896", status: "GTY" },
    { no: 8, initials: "AR", nip: "198409182009011008", name: "Abdul Rahman, S.Pd.I", subject: "Akidah Akhlak", email: "abdul.rahman@madrasah.sch.id", phone: "081234567897", status: "PNS" },
    { no: 9, initials: "KA", nip: "199306222016042009", name: "Khadijah Amani, S.Pd", subject: "Kimia", email: "khadijah.amani@madrasah.sch.id", phone: "081234567898", status: "GTT" },
    { no: 10, initials: "UF", nip: "198712102011011010", name: "Umar Faruq, S.Pd.I", subject: "Sejarah Kebudayaan Islam", email: "umar.faruq@madrasah.sch.id", phone: "081234567899", status: "PNS" },
    { no: 11, initials: "ZS", nip: "199408152017042011", name: "Zahra Safira, S.Pd", subject: "Biologi", email: "zahra.safira@madrasah.sch.id", phone: "081234567900", status: "GTY" },
    { no: 12, initials: "AM", nip: "198610252012011012", name: "Ali Mahfud, S.Pd", subject: "Geografi", email: "ali.mahfud@madrasah.sch.id", phone: "081234567901", status: "PNS" },
    { no: 13, initials: "MS", nip: "199509102018042013", name: "Maryam Salsabila, S.Pd", subject: "Ekonomi", email: "maryam.salsabila@madrasah.sch.id", phone: "081234567902", status: "GTT" },
    { no: 14, initials: "IK", nip: "198811202013011014", name: "Ibrahim Khalil, S.Pd.I", subject: "Bahasa Arab", email: "ibrahim.khalil@madrasah.sch.id", phone: "081234567903", status: "PNS" },
    { no: 15, initials: "RZ", nip: "199607252019042015", name: "Raihan Zahra, S.Pd", subject: "Sosiologi", email: "raihan.zahra@madrasah.sch.id", phone: "081234567904", status: "GTY" }
  ]);

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.nip.includes(searchTerm) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page === 'prev') setCurrentPage(prev => Math.max(1, prev - 1));
    else if (page === 'next') setCurrentPage(prev => Math.min(totalPages, prev + 1));
    else if (typeof page === 'number') setCurrentPage(page);
  };

  // Navigasi ke halaman Detail Guru
  const handleDetail = (guru) => {
    if (onNavigate) {
      onNavigate('detail_guru', guru);
    }
  };

  // Handle Edit
  const handleEdit = (guru) => {
    setSelectedGuru(guru);
    setEditForm({
      nip: guru.nip,
      name: guru.name,
      subject: guru.subject,
      email: guru.email,
      phone: guru.phone,
      status: guru.status
    });
    setShowEditModal(true);
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    const updatedTeachers = teachers.map(teacher => 
      teacher.nip === selectedGuru.nip 
        ? { ...teacher, ...editForm, initials: editForm.name.substring(0, 2).toUpperCase() }
        : teacher
    );
    setTeachers(updatedTeachers);
    setShowEditModal(false);
    setSelectedGuru(null);
    alert('Data guru berhasil diupdate!');
  };

  // Handle Tambah Guru
  const handleTambahGuru = () => {
    if (!tambahForm.nip || !tambahForm.name || !tambahForm.subject) {
      alert('Mohon lengkapi data yang diperlukan!');
      return;
    }
    
    const newId = teachers.length + 1;
    const newGuru = {
      no: newId,
      initials: tambahForm.name.substring(0, 2).toUpperCase(),
      ...tambahForm
    };
    setTeachers([...teachers, newGuru]);
    setShowTambahModal(false);
    setTambahForm({ initials: '', nip: '', name: '', subject: '', email: '', phone: '', status: 'PNS' });
    alert('Guru berhasil ditambahkan!');
  };

  // Handle Delete
  const handleDelete = (nip, name) => {
    if (window.confirm(`Yakin ingin menghapus guru "${name}"?`)) {
      const updatedTeachers = teachers.filter(teacher => teacher.nip !== nip);
      setTeachers(updatedTeachers);
      alert(`Guru "${name}" berhasil dihapus!`);
    }
  };

  const getRowNumber = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  return (
    <div className="daftar-guru-container">
      <div className="main-content">
        {/* Header Section */}
        <div className="page-header">
          <h1>Daftar Guru</h1>
          <p>Kelola data guru dan tenaga pendidik</p>
        </div>

        {/* Search and Action Buttons */}
        <div className="action-bar">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Cari nama guru, NIP, atau mata pelajaran..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="action-buttons">
            <button className="btn-tambah" onClick={() => setShowTambahModal(true)}>
              <FaUserPlus size={14} /> Tambah Guru
            </button>
            <button className="btn-template">
              <FiFileText size={16} /> Template
            </button>
            <button className="btn-import">
              <FaFileImport size={14} /> Import Excel
            </button>
            <button className="btn-export">
              <FaFileExport size={14} /> Export Excel
            </button>
          </div>
        </div>

        {/* Tabel Data Guru */}
        <div className="table-responsive">
          <table className="guru-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Foto</th>
                <th>NIP</th>
                <th>Nama Guru</th>
                <th>Mata Pelajaran</th>
                <th>Email</th>
                <th>Telepon</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.map((teacher, index) => (
                <tr key={teacher.nip}>
                  <td>{getRowNumber(index)}</td>
                  <td><div className="avatar-circle">{teacher.initials}</div></td>
                  <td>{teacher.nip}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>
                    <span className={`status-badge status-${teacher.status.toLowerCase()}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn detail-btn" onClick={() => handleDetail(teacher)} title="Detail">
                        <FaEye size={16} />
                      </button>
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(teacher)} title="Edit">
                        <FaEdit size={16} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(teacher.nip, teacher.name)} title="Hapus">
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredTeachers.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Menampilkan {startIndex + 1}–{Math.min(endIndex, filteredTeachers.length)} dari {filteredTeachers.length} data
            </div>
            <div className="pagination">
              <button className="pagination-btn pagination-arrow" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                <FaChevronLeft size={14} /> Prev
              </button>
              <div className="pagination-numbers">
                {getPageNumbers().map((page, idx) => (
                  <button key={idx} className={`pagination-number ${currentPage === page ? 'active' : ''} ${page === '...' ? 'dots' : ''}`} onClick={() => typeof page === 'number' && handlePageChange(page)} disabled={page === '...'}>
                    {page}
                  </button>
                ))}
              </div>
              <button className="pagination-btn pagination-arrow" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                Next <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah Guru */}
      {showTambahModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowTambahModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Tambah Guru Baru</h3>
                <p>Lengkapi form untuk menambahkan guru</p>
              </div>
              <button className="modal-close" onClick={() => setShowTambahModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>NIP <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Masukkan NIP" value={tambahForm.nip} onChange={(e) => setTambahForm({ ...tambahForm, nip: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Nama Lengkap <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Masukkan nama lengkap" value={tambahForm.name} onChange={(e) => setTambahForm({ ...tambahForm, name: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Mata Pelajaran <span className="required">*</span></label>
                  <input type="text" className="form-control" placeholder="Mata pelajaran" value={tambahForm.subject} onChange={(e) => setTambahForm({ ...tambahForm, subject: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Status <span className="required">*</span></label>
                  <select className="form-control" value={tambahForm.status} onChange={(e) => setTambahForm({ ...tambahForm, status: e.target.value })}>
                    <option value="PNS">PNS</option>
                    <option value="GTY">GTY</option>
                    <option value="GTT">GTT</option>
                  </select>
                </div>
              </div>
              <div className="modal-form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="email@example.com" value={tambahForm.email} onChange={(e) => setTambahForm({ ...tambahForm, email: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Telepon</label>
                <input type="tel" className="form-control" placeholder="Nomor telepon" value={tambahForm.phone} onChange={(e) => setTambahForm({ ...tambahForm, phone: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowTambahModal(false)}>Batal</button>
              <button className="btn-simpan" onClick={handleTambahGuru}><FaSave /> Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Guru */}
      {showEditModal && selectedGuru && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Edit Guru</h3>
                <p>Edit data guru yang dipilih</p>
              </div>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>NIP <span className="required">*</span></label>
                <input type="text" className="form-control" value={editForm.nip} disabled />
              </div>
              <div className="modal-form-group">
                <label>Nama Lengkap <span className="required">*</span></label>
                <input type="text" className="form-control" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Mata Pelajaran <span className="required">*</span></label>
                  <input type="text" className="form-control" value={editForm.subject} onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Status <span className="required">*</span></label>
                  <select className="form-control" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                    <option value="PNS">PNS</option>
                    <option value="GTY">GTY</option>
                    <option value="GTT">GTT</option>
                  </select>
                </div>
              </div>
              <div className="modal-form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Telepon</label>
                <input type="tel" className="form-control" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowEditModal(false)}>Batal</button>
              <button className="btn-simpan" onClick={handleSaveEdit}><FaSave /> Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarGuru;