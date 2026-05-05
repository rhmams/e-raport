// src/pages/admin/Kokurikuler.jsx
import React, { useState, useRef } from 'react';
import './Kokurikuler.css';
import * as XLSX from 'xlsx';
import {
  FaSearch, FaPlus, FaEdit, FaTrashAlt, FaEye,
  FaChevronLeft, FaChevronRight, FaTimes, FaSave,
  FaFileImport, FaFileExport, FaUserPlus
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const Kokurikuler = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedKokurikuler, setSelectedKokurikuler] = useState(null);
  const fileInputRef = useRef(null);

  // Data kokurikuler
  const [kokurikulerData, setKokurikulerData] = useState([
    { id: 1, namaKelas: 'Kelas VII A', jumlahSiswa: 32, tingkat: 'VII', jurusan: 'Umum', koordinator: 'Dr. Ahmad Zainuddin, M.Ag' },
    { id: 2, namaKelas: 'Kelas VIII B', jumlahSiswa: 30, tingkat: 'VIII', jurusan: 'Umum', koordinator: 'Drs. Budi Santoso, M.Pd' },
    { id: 3, namaKelas: 'Kelas IX A', jumlahSiswa: 28, tingkat: 'IX', jurusan: 'IPA', koordinator: 'Dr. Rina Kusumawati, M.Si' },
    { id: 4, namaKelas: 'Kelas IX B', jumlahSiswa: 27, tingkat: 'IX', jurusan: 'IPS', koordinator: 'Drs. H. Abdul Malik, M.Ag' },
    { id: 5, namaKelas: 'Kelas X IPA 1', jumlahSiswa: 35, tingkat: 'X', jurusan: 'IPA', koordinator: 'Dr. Sri Wahyuni, M.Si' },
    { id: 6, namaKelas: 'Kelas X IPA 2', jumlahSiswa: 33, tingkat: 'X', jurusan: 'IPA', koordinator: 'Drs. Budi Santoso, M.Pd' },
    { id: 7, namaKelas: 'Kelas X IPS 1', jumlahSiswa: 34, tingkat: 'X', jurusan: 'IPS', koordinator: 'Hj. Nur Aisyah, M.Pd' },
    { id: 8, namaKelas: 'Kelas X IPS 2', jumlahSiswa: 32, tingkat: 'X', jurusan: 'IPS', koordinator: 'Siti Aminah, S.Pd' },
  ]);

  const tingkatOptions = ['VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const jurusanOptions = ['Umum', 'IPA', 'IPS', 'Bahasa', 'Agama'];

  // Form state untuk tambah/edit
  const [formData, setFormData] = useState({
    namaKelas: '',
    jumlahSiswa: '',
    tingkat: 'X',
    jurusan: 'IPA',
    koordinator: ''
  });

  // Navigasi ke detail
  const handleDetail = (item) => {
    if (onNavigate) {
      onNavigate('detail_kokurikuler', item);
    }
  };

  // Filter data
  const filteredData = kokurikulerData.filter(item =>
    item.namaKelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tingkat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jurusan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.koordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDelete = (id, namaKelas) => {
    setSelectedKokurikuler({ id, namaKelas });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedKokurikuler) {
      setKokurikulerData(kokurikulerData.filter(item => item.id !== selectedKokurikuler.id));
      alert(`Kelas "${selectedKokurikuler.namaKelas}" berhasil dihapus!`);
      setShowDeleteConfirm(false);
      setSelectedKokurikuler(null);
    }
  };

  const handleEdit = (item) => {
    setSelectedKokurikuler(item);
    setFormData({
      namaKelas: item.namaKelas,
      jumlahSiswa: item.jumlahSiswa,
      tingkat: item.tingkat,
      jurusan: item.jurusan,
      koordinator: item.koordinator
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setSelectedKokurikuler(null);
    setFormData({
      namaKelas: '',
      jumlahSiswa: '',
      tingkat: 'X',
      jurusan: 'IPA',
      koordinator: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.namaKelas || !formData.jumlahSiswa) {
      alert('Mohon lengkapi data yang diperlukan!');
      return;
    }

    if (selectedKokurikuler) {
      const updatedData = kokurikulerData.map(item =>
        item.id === selectedKokurikuler.id ? { ...item, ...formData, jumlahSiswa: parseInt(formData.jumlahSiswa) } : item
      );
      setKokurikulerData(updatedData);
      alert('Data kokurikuler berhasil diupdate!');
      setShowEditModal(false);
    } else {
      const newId = Math.max(...kokurikulerData.map(item => item.id), 0) + 1;
      setKokurikulerData([...kokurikulerData, {
        id: newId,
        ...formData,
        jumlahSiswa: parseInt(formData.jumlahSiswa)
      }]);
      alert('Data kokurikuler berhasil ditambahkan!');
      setShowModal(false);
    }
    setSelectedKokurikuler(null);
  };

  const handleExportExcel = () => {
    const exportData = filteredData.map((item, index) => ({
      'No': index + 1,
      'Nama Kelas': item.namaKelas,
      'Jumlah Siswa': item.jumlahSiswa,
      'Tingkat': item.tingkat,
      'Jurusan': item.jurusan,
      'Koordinator': item.koordinator
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Kokurikuler');
    XLSX.writeFile(wb, `data_kokurikuler_${new Date().toISOString().split('T')[0]}.xlsx`);
    alert('Data berhasil diexport ke Excel!');
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
      const newKokurikuler = [];
      let maxId = Math.max(...kokurikulerData.map(item => item.id), 0);
      
      jsonData.forEach((row) => {
        if (row['Nama Kelas']) {
          maxId++;
          newKokurikuler.push({
            id: maxId,
            namaKelas: row['Nama Kelas'],
            jumlahSiswa: row['Jumlah Siswa'] || 0,
            tingkat: row['Tingkat'] || 'X',
            jurusan: row['Jurusan'] || 'Umum',
            koordinator: row['Koordinator'] || ''
          });
        }
      });
      
      if (newKokurikuler.length > 0) {
        setKokurikulerData([...kokurikulerData, ...newKokurikuler]);
        alert(`${newKokurikuler.length} data kokurikuler berhasil diimport!`);
      } else {
        alert('Tidak ada data yang valid untuk diimport');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const handleTemplate = () => {
    const template = [{
      'Nama Kelas': 'Contoh Kelas',
      'Jumlah Siswa': 30,
      'Tingkat': 'X',
      'Jurusan': 'IPA',
      'Koordinator': 'Nama Koordinator'
    }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Kokurikuler');
    XLSX.writeFile(wb, 'template_kokurikuler.xlsx');
    alert('Template berhasil diunduh!');
  };

  const getRowNumber = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  return (
    <div className="kokurikuler-container">
      <div className="kokurikuler-content">
        <div className="page-header">
          <h1>Data Kokurikuler</h1>
          <p>Kelola data kokurikuler dan koordinator</p>
        </div>

        <div className="action-bar">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Cari nama kelas, tingkat, jurusan, atau koordinator..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="action-buttons">
            <button className="btn-tambah" onClick={handleAdd}>
              <FaUserPlus size={14} /> Tambah Kokurikuler
            </button>
            <button className="btn-template" onClick={handleTemplate}>
              <FiFileText size={16} /> Template
            </button>
            <button className="btn-import" onClick={() => fileInputRef.current?.click()}>
              <FaFileImport size={14} /> Import Excel
            </button>
            <button className="btn-export" onClick={handleExportExcel}>
              <FaFileExport size={14} /> Export Excel
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImportExcel} accept=".xlsx, .xls" style={{ display: 'none' }} />
          </div>
        </div>

        <div className="table-responsive">
          <table className="kokurikuler-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kelas</th>
                <th>Jumlah Siswa</th>
                <th>Tingkat</th>
                <th>Jurusan</th>
                <th>Koordinator</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{getRowNumber(index)}</td>
                  <td><strong>{item.namaKelas}</strong></td>
                  <td>{item.jumlahSiswa}</td>
                  <td>{item.tingkat}</td>
                  <td>{item.jurusan}</td>
                  <td>{item.koordinator}</td>
                  <td className="action-cell">
                    <button className="icon-btn detail-btn" onClick={() => handleDetail(item)} title="Detail">
                      <FaEye size={14} />
                    </button>
                    <button className="icon-btn edit-btn" onClick={() => handleEdit(item)} title="Edit">
                      <FaEdit size={14} />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id, item.namaKelas)} title="Hapus">
                      <FaTrashAlt size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentItems.length === 0 && (
            <div className="empty-data">
              <p>Tidak ada data kokurikuler</p>
            </div>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Menampilkan {startIndex + 1}–{Math.min(endIndex, filteredData.length)} dari {filteredData.length} data
            </div>
            <div className="pagination">
              <button className="pagination-arrow" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                <FaChevronLeft /> Prev
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
              <button className="pagination-arrow" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah Kokurikuler */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Tambah Kokurikuler</h3>
                <p>Lengkapi form untuk menambahkan data kokurikuler</p>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Kelas <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Contoh: Kelas X IPA 1" value={formData.namaKelas} onChange={(e) => setFormData({ ...formData, namaKelas: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jumlah Siswa <span className="required">*</span></label>
                  <input type="number" className="form-control" placeholder="Jumlah siswa" value={formData.jumlahSiswa} onChange={(e) => setFormData({ ...formData, jumlahSiswa: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Tingkat</label>
                  <select className="form-control" value={formData.tingkat} onChange={(e) => setFormData({ ...formData, tingkat: e.target.value })}>
                    {tingkatOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jurusan</label>
                  <select className="form-control" value={formData.jurusan} onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}>
                    {jurusanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Koordinator</label>
                  <input type="text" className="form-control" placeholder="Nama koordinator" value={formData.koordinator} onChange={(e) => setFormData({ ...formData, koordinator: e.target.value })} />
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

      {/* Modal Edit Kokurikuler */}
      {showEditModal && selectedKokurikuler && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Edit Kokurikuler</h3>
                <p>Edit data kokurikuler yang dipilih</p>
              </div>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Kelas <span className="required">*</span></label>
                <input type="text" className="form-control" value={formData.namaKelas} onChange={(e) => setFormData({ ...formData, namaKelas: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jumlah Siswa <span className="required">*</span></label>
                  <input type="number" className="form-control" value={formData.jumlahSiswa} onChange={(e) => setFormData({ ...formData, jumlahSiswa: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Tingkat</label>
                  <select className="form-control" value={formData.tingkat} onChange={(e) => setFormData({ ...formData, tingkat: e.target.value })}>
                    {tingkatOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jurusan</label>
                  <select className="form-control" value={formData.jurusan} onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}>
                    {jurusanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Koordinator</label>
                  <input type="text" className="form-control" value={formData.koordinator} onChange={(e) => setFormData({ ...formData, koordinator: e.target.value })} />
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
      {showDeleteConfirm && selectedKokurikuler && (
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
              <p>Anda akan menghapus data kokurikuler <strong>"{selectedKokurikuler.namaKelas}"</strong></p>
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

export default Kokurikuler;