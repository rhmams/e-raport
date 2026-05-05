// src/pages/admin/JadwalMengajar.jsx
import React, { useState, useRef } from 'react';
import './JadwalMengajar.css';
import * as XLSX from 'xlsx';
import {
  FaEdit, FaTrashAlt, FaSearch, FaFileExport, FaFileImport,
  FaChevronLeft, FaChevronRight, FaEye, FaTimes, FaSave, FaUserPlus, FaFilter
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const JadwalMengajar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedHari, setSelectedHari] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState(null);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const fileInputRef = useRef(null);

  const [jadwalData, setJadwalData] = useState([
    { id: 1, hari: 'Senin', waktuMulai: '07:00', waktuSelesai: '08:30', mataPelajaran: 'Al-Quran Hadits', kelas: 'X IPA 1', guru: 'Dr. Ahmad Zainuddin, M.Ag', ruangan: 'R-101' },
    { id: 2, hari: 'Senin', waktuMulai: '08:30', waktuSelesai: '10:00', mataPelajaran: 'Matematika', kelas: 'X IPA 1', guru: 'Drs. Budi Santoso, M.Pd', ruangan: 'R-102' },
    { id: 3, hari: 'Senin', waktuMulai: '10:15', waktuSelesai: '11:45', mataPelajaran: 'Bahasa Indonesia', kelas: 'X IPA 1', guru: 'Siti Aminah, S.Pd', ruangan: 'R-103' },
    { id: 4, hari: 'Senin', waktuMulai: '12:45', waktuSelesai: '14:15', mataPelajaran: 'Fisika', kelas: 'X IPA 1', guru: 'Dr. Rina Kusumawati, M.Si', ruangan: 'Lab Fisika' },
    { id: 5, hari: 'Selasa', waktuMulai: '07:00', waktuSelesai: '08:30', mataPelajaran: 'Pendidikan Agama Islam', kelas: 'X IPA 1', guru: 'KH. M. Iqbal, S.Ag', ruangan: 'R-101' },
    { id: 6, hari: 'Selasa', waktuMulai: '08:30', waktuSelesai: '10:00', mataPelajaran: 'Bahasa Inggris', kelas: 'X IPA 1', guru: 'Hj. Nur Aisyah, M.Pd', ruangan: 'R-102' },
    { id: 7, hari: 'Selasa', waktuMulai: '10:15', waktuSelesai: '11:45', mataPelajaran: 'Kimia', kelas: 'X IPA 1', guru: 'Dr. Sri Wahyuni, M.Si', ruangan: 'Lab Kimia' },
    { id: 8, hari: 'Selasa', waktuMulai: '12:45', waktuSelesai: '14:15', mataPelajaran: 'Fiqih', kelas: 'X IPA 1', guru: 'Drs. H. Abdul Malik, M.Ag', ruangan: 'R-103' },
    { id: 9, hari: 'Rabu', waktuMulai: '07:00', waktuSelesai: '08:30', mataPelajaran: 'Matematika', kelas: 'X IPA 2', guru: 'Drs. Budi Santoso, M.Pd', ruangan: 'R-104' },
    { id: 10, hari: 'Rabu', waktuMulai: '08:30', waktuSelesai: '10:00', mataPelajaran: 'Biologi', kelas: 'X IPA 2', guru: 'Dr. Hj. Laila Hasanah, M.Si', ruangan: 'Lab Biologi' },
  ]);

  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const kelasOptions = ['X IPA 1', 'X IPA 2', 'X IPS 1', 'X IPS 2', 'XI IPA 1', 'XI IPA 2', 'XI IPS 1', 'XI IPS 2', 'XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XII IPS 2'];
  const ruanganOptions = ['R-101', 'R-102', 'R-103', 'R-104', 'R-105', 'R-106', 'Lab Fisika', 'Lab Kimia', 'Lab Biologi', 'Lab Komputer', 'Musholla', 'Aula', 'Perpustakaan'];

  const [formData, setFormData] = useState({
    hari: 'Senin', waktuMulai: '07:00', waktuSelesai: '08:30',
    mataPelajaran: '', kelas: '', guru: '', ruangan: ''
  });

  const filteredData = jadwalData.filter(item => {
    const matchesSearch =
      item.hari.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mataPelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.guru.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ruangan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHari = selectedHari === 'all' || item.hari === selectedHari;
    return matchesSearch && matchesHari;
  });

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

  const handleDelete = (id, mataPelajaran) => {
    if (window.confirm(`Yakin ingin menghapus jadwal "${mataPelajaran}"?`)) {
      setJadwalData(jadwalData.filter(item => item.id !== id));
    }
  };

  const handleEdit = (jadwal) => {
    setEditingJadwal(jadwal);
    setFormData({
      hari: jadwal.hari, waktuMulai: jadwal.waktuMulai, waktuSelesai: jadwal.waktuSelesai,
      mataPelajaran: jadwal.mataPelajaran, kelas: jadwal.kelas, guru: jadwal.guru, ruangan: jadwal.ruangan
    });
    setShowModal(true);
  };

  const handleDetail = (jadwal) => {
    setSelectedJadwal(jadwal);
    setShowDetailModal(true);
  };

  const handleAdd = () => {
    setEditingJadwal(null);
    setFormData({ hari: 'Senin', waktuMulai: '07:00', waktuSelesai: '08:30', mataPelajaran: '', kelas: '', guru: '', ruangan: '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.mataPelajaran || !formData.kelas || !formData.guru) {
      alert('Mohon lengkapi data yang diperlukan!');
      return;
    }
    if (editingJadwal) {
      setJadwalData(jadwalData.map(item => item.id === editingJadwal.id ? { ...item, ...formData } : item));
    } else {
      const newId = Math.max(...jadwalData.map(item => item.id), 0) + 1;
      setJadwalData([...jadwalData, { id: newId, ...formData }]);
    }
    setShowModal(false);
    setEditingJadwal(null);
  };

  const handleExportExcel = () => {
    const exportData = filteredData.map((item, index) => ({
      'No': index + 1, 'Hari': item.hari, 'Waktu Mulai': item.waktuMulai,
      'Waktu Selesai': item.waktuSelesai, 'Mata Pelajaran': item.mataPelajaran,
      'Kelas': item.kelas, 'Guru': item.guru, 'Ruangan': item.ruangan
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Jadwal Mengajar');
    XLSX.writeFile(wb, `jadwal_mengajar_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const newJadwal = [];
      let maxId = Math.max(...jadwalData.map(item => item.id), 0);
      jsonData.forEach((row) => {
        if (row['Hari'] && row['Mata Pelajaran'] && row['Kelas'] && row['Guru']) {
          maxId++;
          newJadwal.push({
            id: maxId, hari: row['Hari'],
            waktuMulai: row['Waktu Mulai'] || '07:00',
            waktuSelesai: row['Waktu Selesai'] || '08:30',
            mataPelajaran: row['Mata Pelajaran'],
            kelas: row['Kelas'], guru: row['Guru'],
            ruangan: row['Ruangan'] || '-'
          });
        }
      });
      if (newJadwal.length > 0) {
        setJadwalData([...jadwalData, ...newJadwal]);
        alert(`${newJadwal.length} data jadwal berhasil diimport!`);
      } else {
        alert('Tidak ada data yang valid untuk diimport');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const handleTemplate = () => {
    const template = [{ 'Hari': 'Senin', 'Waktu Mulai': '07:00', 'Waktu Selesai': '08:30', 'Mata Pelajaran': 'Contoh Mata Pelajaran', 'Kelas': 'X IPA 1', 'Guru': 'Nama Guru', 'Ruangan': 'R-101' }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Jadwal');
    XLSX.writeFile(wb, 'template_jadwal_mengajar.xlsx');
  };

  const getRowNumber = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  return (
    <div className="jadwal-mengajar-container">
      <div className="main-content">

        <div className="page-header">
          <h1>Jadwal Mengajar</h1>
          <p>Kelola dan monitor jadwal mengajar guru</p>
        </div>

        <div className="action-bar">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Cari jadwal mengajar..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="action-buttons">
            <button className="btn-tambah" onClick={handleAdd}>
              <FaUserPlus size={14} /> Tambah Jadwal
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

        <div className="filter-section">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select
              value={selectedHari}
              onChange={(e) => { setSelectedHari(e.target.value); setCurrentPage(1); }}
              className="filter-select"
            >
              <option value="all">Semua Hari</option>
              {hariOptions.map(hari => <option key={hari} value={hari}>{hari}</option>)}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="jadwal-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Hari</th>
                <th>Waktu</th>
                <th>Mata Pelajaran</th>
                <th>Kelas</th>
                <th>Guru</th>
                <th>Ruangan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{getRowNumber(index)}</td>
                  <td>{item.hari}</td>
                  <td>{item.waktuMulai} – {item.waktuSelesai}</td>
                  <td>{item.mataPelajaran}</td>
                  <td>{item.kelas}</td>
                  <td>{item.guru}</td>
                  <td>{item.ruangan}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn detail-btn" onClick={() => handleDetail(item)} title="Detail">
                        <FaEye size={15} />
                      </button>
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit size={15} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id, item.mataPelajaran)} title="Hapus">
                        <FaTrashAlt size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentItems.length === 0 && (
            <div className="empty-data"><p>Tidak ada data jadwal</p></div>
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

      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>{editingJadwal ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h3>
                <p>{editingJadwal ? 'Edit data jadwal yang dipilih' : 'Lengkapi form untuk menambahkan jadwal'}</p>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Hari <span className="required">*</span></label>
                <select className="form-control" value={formData.hari} onChange={(e) => setFormData({ ...formData, hari: e.target.value })}>
                  {hariOptions.map(hari => <option key={hari} value={hari}>{hari}</option>)}
                </select>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Waktu Mulai <span className="required">*</span></label>
                  <input type="time" className="form-control" value={formData.waktuMulai} onChange={(e) => setFormData({ ...formData, waktuMulai: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Waktu Selesai <span className="required">*</span></label>
                  <input type="time" className="form-control" value={formData.waktuSelesai} onChange={(e) => setFormData({ ...formData, waktuSelesai: e.target.value })} />
                </div>
              </div>
              <div className="modal-form-group">
                <label>Mata Pelajaran <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Masukkan mata pelajaran" value={formData.mataPelajaran} onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Kelas <span className="required">*</span></label>
                  <select className="form-control" value={formData.kelas} onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}>
                    <option value="">Pilih Kelas</option>
                    {kelasOptions.map(kelas => <option key={kelas} value={kelas}>{kelas}</option>)}
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Ruangan</label>
                  <select className="form-control" value={formData.ruangan} onChange={(e) => setFormData({ ...formData, ruangan: e.target.value })}>
                    <option value="">Pilih Ruangan</option>
                    {ruanganOptions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-form-group">
                <label>Guru <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Masukkan nama guru" value={formData.guru} onChange={(e) => setFormData({ ...formData, guru: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn-simpan" onClick={handleSave}><FaSave /> {editingJadwal ? 'Simpan Perubahan' : 'Simpan'}</button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedJadwal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowDetailModal(false)}>
          <div className="modal-box modal-detail">
            <div className="modal-header">
              <div>
                <h3>Detail Jadwal Mengajar</h3>
                <p>Informasi lengkap jadwal mengajar</p>
              </div>
              <button className="modal-close" onClick={() => setShowDetailModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="detail-info-grid">
                {[
                  { label: 'Hari', value: selectedJadwal.hari },
                  { label: 'Waktu', value: `${selectedJadwal.waktuMulai} – ${selectedJadwal.waktuSelesai}` },
                  { label: 'Mata Pelajaran', value: selectedJadwal.mataPelajaran },
                  { label: 'Kelas', value: selectedJadwal.kelas },
                  { label: 'Guru', value: selectedJadwal.guru },
                  { label: 'Ruangan', value: selectedJadwal.ruangan },
                ].map(({ label, value }) => (
                  <div className="detail-item" key={label}>
                    <div className="detail-label">{label}</div>
                    <div className="detail-value">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowDetailModal(false)}>Tutup</button>
              <button className="btn-simpan" onClick={() => { setShowDetailModal(false); handleEdit(selectedJadwal); }}>
                <FaEdit /> Edit Jadwal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalMengajar;