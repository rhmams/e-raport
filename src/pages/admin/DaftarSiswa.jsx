// src/pages/admin/DaftarSiswa.jsx
import React, { useState, useRef } from 'react';
import './DaftarSiswa.css';
import * as XLSX from 'xlsx';
import {
  FaEdit, FaTrashAlt, FaSearch, FaFileExport, FaFileImport,
  FaChevronLeft, FaChevronRight, FaEye, FaTimes, FaSave, FaUserPlus,
  FaCalendarAlt, FaVenusMars, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaUserGraduate, FaIdCard
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const DaftarSiswa = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const fileInputRef = useRef(null);

  // Data siswa
  const [siswaData, setSiswaData] = useState([
    { 
      id: 1, noAbsen: '01', nama: 'Ahmad Fauzi Ramadhan', nis: '2024001', nisn: '0056789012', 
      tempatLahir: 'Jakarta', tanggalLahir: '2010-01-15', jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Merdeka No. 10, Jakarta', phone: '081234567890', email: 'ahmad.fauzi@siswa.sch.id',
      kelas: 'X IPA 1', tahunMasuk: '2024'
    },
    { 
      id: 2, noAbsen: '02', nama: 'Siti Aisyah Nuraini', nis: '2024002', nisn: '0056789013', 
      tempatLahir: 'Bogor', tanggalLahir: '2010-03-20', jenisKelamin: 'Perempuan',
      alamat: 'Jl. Pajajaran No. 5, Bogor', phone: '081234567891', email: 'siti.aisyah@siswa.sch.id',
      kelas: 'X IPA 1', tahunMasuk: '2024'
    },
    { 
      id: 3, noAbsen: '03', nama: 'Muhammad Rizki Pratama', nis: '2024003', nisn: '0056789014', 
      tempatLahir: 'Bandung', tanggalLahir: '2010-02-10', jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Asia Afrika No. 15, Bandung', phone: '081234567892', email: 'rizki.pratama@siswa.sch.id',
      kelas: 'X IPA 1', tahunMasuk: '2024'
    },
    { 
      id: 4, noAbsen: '04', nama: 'Zahra Amalia Putri', nis: '2024004', nisn: '0056789015', 
      tempatLahir: 'Tangerang', tanggalLahir: '2010-05-08', jenisKelamin: 'Perempuan',
      alamat: 'Jl. Raya Serpong No. 8, Tangerang', phone: '081234567893', email: 'zahra.amalia@siswa.sch.id',
      kelas: 'X IPA 1', tahunMasuk: '2024'
    },
    { 
      id: 5, noAbsen: '05', nama: 'Abdullah Azzam', nis: '2024005', nisn: '0056789016', 
      tempatLahir: 'Bekasi', tanggalLahir: '2010-07-12', jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Jatiasih No. 3, Bekasi', phone: '081234567894', email: 'abdullah.azzam@siswa.sch.id',
      kelas: 'X IPA 2', tahunMasuk: '2024'
    },
    { 
      id: 6, noAbsen: '06', nama: 'Fatimah Azzahra', nis: '2024006', nisn: '0056789017', 
      tempatLahir: 'Depok', tanggalLahir: '2010-04-25', jenisKelamin: 'Perempuan',
      alamat: 'Jl. Margonda Raya No. 12, Depok', phone: '081234567895', email: 'fatimah.azzahra@siswa.sch.id',
      kelas: 'X IPA 2', tahunMasuk: '2024'
    },
    { 
      id: 7, noAbsen: '07', nama: 'Umar Faruq', nis: '2024007', nisn: '0056789018', 
      tempatLahir: 'Jakarta', tanggalLahir: '2010-06-18', jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Sudirman No. 25, Jakarta', phone: '081234567896', email: 'umar.faruq@siswa.sch.id',
      kelas: 'X IPA 2', tahunMasuk: '2024'
    },
    { 
      id: 8, noAbsen: '08', nama: 'Nuraini Safitri', nis: '2024008', nisn: '0056789019', 
      tempatLahir: 'Bogor', tanggalLahir: '2010-08-30', jenisKelamin: 'Perempuan',
      alamat: 'Jl. Cibinong No. 7, Bogor', phone: '081234567897', email: 'nuraini.safitri@siswa.sch.id',
      kelas: 'X IPA 2', tahunMasuk: '2024'
    },
    { 
      id: 9, noAbsen: '09', nama: 'Hamzah Ibrahim', nis: '2024009', nisn: '0056789020', 
      tempatLahir: 'Bandung', tanggalLahir: '2010-09-14', jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Cihampelas No. 30, Bandung', phone: '081234567898', email: 'hamzah.ibrahim@siswa.sch.id',
      kelas: 'X IPS 1', tahunMasuk: '2024'
    },
    { 
      id: 10, noAbsen: '10', nama: 'Khadijah Amani', nis: '2024010', nisn: '0056789021', 
      tempatLahir: 'Tangerang', tanggalLahir: '2010-11-22', jenisKelamin: 'Perempuan',
      alamat: 'Jl. Alam Sutera No. 20, Tangerang', phone: '081234567899', email: 'khadijah.amani@siswa.sch.id',
      kelas: 'X IPS 1', tahunMasuk: '2024'
    }
  ]);

  // Form state untuk tambah/edit
  const [formData, setFormData] = useState({
    noAbsen: '', nama: '', nis: '', nisn: '', tempatLahir: '', tanggalLahir: '',
    jenisKelamin: 'Laki-laki', alamat: '', phone: '', email: '', kelas: 'X IPA 1', tahunMasuk: '2024'
  });

  const kelasOptions = ['X IPA 1', 'X IPA 2', 'X IPS 1', 'X IPS 2', 'XI IPA 1', 'XI IPA 2', 'XI IPS 1', 'XI IPS 2', 'XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XII IPS 2'];

  // Filter data
  const filteredData = siswaData.filter(item => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nisn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kelas.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

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

  const handleDelete = (id, nama) => {
    setSelectedSiswa({ id, nama });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedSiswa) {
      setSiswaData(siswaData.filter(item => item.id !== selectedSiswa.id));
      alert(`Siswa "${selectedSiswa.nama}" berhasil dihapus!`);
      setShowDeleteConfirm(false);
      setSelectedSiswa(null);
    }
  };

  // Navigasi ke halaman Detail Siswa
  const handleDetail = (siswa) => {
    if (onNavigate) {
      onNavigate('detail_siswa', siswa);
    }
  };

  const handleEdit = (siswa) => {
    setEditingSiswa(siswa);
    setFormData({
      noAbsen: siswa.noAbsen, nama: siswa.nama, nis: siswa.nis, nisn: siswa.nisn,
      tempatLahir: siswa.tempatLahir, tanggalLahir: siswa.tanggalLahir,
      jenisKelamin: siswa.jenisKelamin, alamat: siswa.alamat, phone: siswa.phone,
      email: siswa.email, kelas: siswa.kelas, tahunMasuk: siswa.tahunMasuk
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setEditingSiswa(null);
    setFormData({
      noAbsen: '', nama: '', nis: '', nisn: '', tempatLahir: '', tanggalLahir: '',
      jenisKelamin: 'Laki-laki', alamat: '', phone: '', email: '', kelas: 'X IPA 1', tahunMasuk: '2024'
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.nama || !formData.nis || !formData.nisn) {
      alert('Mohon lengkapi data yang diperlukan (Nama, NIS, NISN)!');
      return;
    }

    if (editingSiswa) {
      // Update existing siswa
      const updatedData = siswaData.map(item =>
        item.id === editingSiswa.id ? { ...item, ...formData } : item
      );
      setSiswaData(updatedData);
      alert('Data siswa berhasil diupdate!');
      setShowEditModal(false);
    } else {
      // Add new siswa
      const newId = Math.max(...siswaData.map(item => item.id), 0) + 1;
      let newNoAbsen = formData.noAbsen;
      if (!newNoAbsen) {
        newNoAbsen = String(siswaData.length + 1).padStart(2, '0');
      }
      setSiswaData([...siswaData, { id: newId, noAbsen: newNoAbsen, ...formData }]);
      alert('Siswa berhasil ditambahkan!');
      setShowModal(false);
    }
    setEditingSiswa(null);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const exportData = filteredData.map((item, index) => ({
      'No': index + 1,
      'No Absen': item.noAbsen,
      'Nama Lengkap': item.nama,
      'NIS': item.nis,
      'NISN': item.nisn,
      'Tempat Lahir': item.tempatLahir,
      'Tanggal Lahir': item.tanggalLahir,
      'Jenis Kelamin': item.jenisKelamin,
      'Alamat': item.alamat,
      'No Telepon': item.phone,
      'Email': item.email,
      'Kelas': item.kelas,
      'Tahun Masuk': item.tahunMasuk
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daftar Siswa');
    XLSX.writeFile(wb, `daftar_siswa_${new Date().toISOString().split('T')[0]}.xlsx`);
    alert('Data berhasil diexport ke Excel!');
  };

  // Import from Excel
  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const newSiswa = [];
      let maxId = Math.max(...siswaData.map(item => item.id), 0);
      
      jsonData.forEach((row) => {
        if (row['Nama Lengkap'] && row['NIS']) {
          maxId++;
          newSiswa.push({
            id: maxId,
            noAbsen: row['No Absen'] || String(maxId).padStart(2, '0'),
            nama: row['Nama Lengkap'],
            nis: String(row['NIS']),
            nisn: String(row['NISN'] || ''),
            tempatLahir: row['Tempat Lahir'] || '',
            tanggalLahir: row['Tanggal Lahir'] || '',
            jenisKelamin: row['Jenis Kelamin'] || 'Laki-laki',
            alamat: row['Alamat'] || '',
            phone: row['No Telepon'] || '',
            email: row['Email'] || '',
            kelas: row['Kelas'] || 'X IPA 1',
            tahunMasuk: row['Tahun Masuk'] || '2024'
          });
        }
      });
      
      if (newSiswa.length > 0) {
        setSiswaData([...siswaData, ...newSiswa]);
        alert(`${newSiswa.length} data siswa berhasil diimport!`);
      } else {
        alert('Tidak ada data yang valid untuk diimport');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  // Download Template
  const handleTemplate = () => {
    const template = [{
      'No Absen': '01',
      'Nama Lengkap': 'Contoh Nama Siswa',
      'NIS': '2024001',
      'NISN': '0056789012',
      'Tempat Lahir': 'Jakarta',
      'Tanggal Lahir': '2010-01-15',
      'Jenis Kelamin': 'Laki-laki',
      'Alamat': 'Jl. Contoh No. 123',
      'No Telepon': '081234567890',
      'Email': 'siswa@example.com',
      'Kelas': 'X IPA 1',
      'Tahun Masuk': '2024'
    }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Siswa');
    XLSX.writeFile(wb, 'template_daftar_siswa.xlsx');
    alert('Template berhasil diunduh!');
  };

  const getRowNumber = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  // Format tanggal untuk display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="daftar-siswa-container">
      <div className="main-content">
        <div className="page-header">
          <h1>Daftar Siswa</h1>
          <p>Kelola data siswa secara lengkap</p>
        </div>

        <div className="action-bar">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Cari nama siswa, NIS, atau NISN..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="action-buttons">
            <button className="btn-tambah" onClick={handleAdd}>
              <FaUserPlus size={14} /> Tambah Siswa
            </button>
            <button className="btn-template" onClick={handleTemplate}>
              <FiFileText size={15} /> Template
            </button>
            <button className="btn-import" onClick={() => fileInputRef.current?.click()}>
              <FaFileImport size={14} /> Import Excel
            </button>
            <button className="btn-export" onClick={handleExportExcel}>
              <FaFileExport size={14} /> Export Excel
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportExcel}
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="siswa-table">
            <thead>
              <tr>
                <th>No</th>
                <th>No Absen</th>
                <th>Nama Peserta Didik</th>
                <th>NIS</th>
                <th>NISN</th>
                <th>Tempat / Tgl Lahir</th>
                <th>Kelas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{getRowNumber(index)}</td>
                  <td>{item.noAbsen}</td>
                  <td><strong>{item.nama}</strong></td>
                  <td>{item.nis}</td>
                  <td>{item.nisn}</td>
                  <td>{item.tempatLahir}, {formatDate(item.tanggalLahir)}</td>
                  <td>{item.kelas}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn detail-btn" onClick={() => handleDetail(item)} title="Detail">
                        <FaEye size={14} />
                      </button>
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit size={14} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id, item.nama)} title="Hapus">
                        <FaTrashAlt size={12} />
                      </button>
                    </div>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
          {currentItems.length === 0 && (
            <div className="empty-data"><p>Tidak ada data siswa</p></div>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Menampilkan {startIndex + 1}–{Math.min(endIndex, filteredData.length)} dari {filteredData.length} data
            </div>
            <div className="pagination">
              <button className="pagination-btn pagination-arrow" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                <FaChevronLeft size={13} /> Prev
              </button>
              <div className="pagination-numbers">
                {getPageNumbers().map((page, idx) => (
                  <button
                    key={idx}
                    className={`pagination-number ${currentPage === page ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="pagination-btn pagination-arrow" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                Next <FaChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah Siswa */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Tambah Siswa Baru</h3>
                <p>Lengkapi form untuk menambahkan siswa</p>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>No Absen</label>
                  <input type="text" className="form-control" placeholder="Contoh: 01" value={formData.noAbsen} onChange={(e) => setFormData({ ...formData, noAbsen: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>NIS <span className="required">*</span></label>
                  <input type="text" className="form-control" placeholder="Nomor Induk Siswa" value={formData.nis} onChange={(e) => setFormData({ ...formData, nis: e.target.value })} />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Nama Lengkap <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Nama lengkap siswa" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>NISN <span className="required">*</span></label>
                  <input type="text" className="form-control" placeholder="Nomor Induk Siswa Nasional" value={formData.nisn} onChange={(e) => setFormData({ ...formData, nisn: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Kelas <span className="required">*</span></label>
                  <select className="form-control" value={formData.kelas} onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}>
                    {kelasOptions.map(kelas => <option key={kelas} value={kelas}>{kelas}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Tempat Lahir</label>
                  <input type="text" className="form-control" placeholder="Tempat lahir" value={formData.tempatLahir} onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Tanggal Lahir</label>
                  <input type="date" className="form-control" value={formData.tanggalLahir} onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })} />
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jenis Kelamin</label>
                  <select className="form-control" value={formData.jenisKelamin} onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Tahun Masuk</label>
                  <input type="text" className="form-control" placeholder="Tahun masuk" value={formData.tahunMasuk} onChange={(e) => setFormData({ ...formData, tahunMasuk: e.target.value })} />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Alamat</label>
                <textarea className="form-control" rows="2" placeholder="Alamat lengkap" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>No Telepon</label>
                  <input type="tel" className="form-control" placeholder="Nomor telepon" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn-simpan" onClick={handleSave}><FaSave /> Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Siswa */}
      {showEditModal && editingSiswa && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Edit Data Siswa</h3>
                <p>Edit data siswa yang dipilih</p>
              </div>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>No Absen</label>
                  <input type="text" className="form-control" value={formData.noAbsen} onChange={(e) => setFormData({ ...formData, noAbsen: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>NIS <span className="required">*</span></label>
                  <input type="text" className="form-control" value={formData.nis} disabled />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Nama Lengkap <span className="required">*</span></label>
                <input type="text" className="form-control" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>NISN <span className="required">*</span></label>
                  <input type="text" className="form-control" value={formData.nisn} onChange={(e) => setFormData({ ...formData, nisn: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Kelas <span className="required">*</span></label>
                  <select className="form-control" value={formData.kelas} onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}>
                    {kelasOptions.map(kelas => <option key={kelas} value={kelas}>{kelas}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Tempat Lahir</label>
                  <input type="text" className="form-control" value={formData.tempatLahir} onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Tanggal Lahir</label>
                  <input type="date" className="form-control" value={formData.tanggalLahir} onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })} />
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jenis Kelamin</label>
                  <select className="form-control" value={formData.jenisKelamin} onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Tahun Masuk</label>
                  <input type="text" className="form-control" value={formData.tahunMasuk} onChange={(e) => setFormData({ ...formData, tahunMasuk: e.target.value })} />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Alamat</label>
                <textarea className="form-control" rows="2" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>No Telepon</label>
                  <input type="tel" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowEditModal(false)}>Batal</button>
              <button className="btn-simpan" onClick={handleSave}><FaSave /> Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteConfirm && selectedSiswa && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowDeleteConfirm(false)}>
          <div className="modal-box modal-confirm">
            <div className="modal-header">
              <div>
                <h3>Konfirmasi Hapus</h3>
                <p>Apakah Anda yakin ingin menghapus data ini?</p>
              </div>
              <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}><FaTimes /></button>
            </div>
            <div className="modal-body confirm-body">
              <p>Anda akan menghapus data siswa <strong>"{selectedSiswa.nama}"</strong></p>
              <p className="confirm-warning">Tindakan ini tidak dapat dibatalkan!</p>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowDeleteConfirm(false)}>Batal</button>
              <button className="btn-delete-confirm" onClick={confirmDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarSiswa;