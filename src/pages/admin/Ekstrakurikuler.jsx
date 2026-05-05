// src/pages/admin/Ekstrakurikuler.jsx
import React, { useState, useRef } from 'react';
import './Ekstrakurikuler.css';
import * as XLSX from 'xlsx';
import {
  FaSearch, FaEdit, FaTrashAlt, FaEye,
  FaChevronLeft, FaChevronRight, FaTimes, FaSave,
  FaFileImport, FaFileExport, FaUserPlus, FaCalendarAlt, FaUsers
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const Ekstrakurikuler = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEkstra, setSelectedEkstra] = useState(null);
  const fileInputRef = useRef(null);

  // Data ekstrakurikuler
  const [ekstrakurikulerData, setEkstrakurikulerData] = useState([
    { id: 1, nama: 'Pramuka', pembina: 'Ahmad Fauzi, S.Pd', jadwal: 'Jumat, 14.00–16.00', jumlahPeserta: 45, tingkat: 'VII–IX' },
    { id: 2, nama: 'Tahfidz Quran', pembina: 'Ustadz Abdullah, Lc', jadwal: 'Senin & Rabu, 15.00–16.30', jumlahPeserta: 38, tingkat: 'VII–IX' },
    { id: 3, nama: 'Futsal', pembina: 'Rizki Pratama, S.Or', jadwal: 'Selasa & Kamis, 15.00–17.00', jumlahPeserta: 22, tingkat: 'VIII–IX' },
    { id: 4, nama: 'English Club', pembina: 'Sarah Johnson, M.Pd', jadwal: 'Rabu, 14.00–15.30', jumlahPeserta: 30, tingkat: 'VII–IX' },
    { id: 5, nama: 'Seni Kaligrafi', pembina: 'Ahmad Fauzi, S.Pd', jadwal: 'Kamis, 14.00–16.00', jumlahPeserta: 25, tingkat: 'VII–IX' },
    { id: 6, nama: 'Basketball', pembina: 'Budi Santoso, S.Or', jadwal: 'Senin & Jumat, 15.00–17.00', jumlahPeserta: 28, tingkat: 'VIII–X' },
    { id: 7, nama: 'Paduan Suara', pembina: 'Siti Aminah, S.Sn', jadwal: 'Rabu, 15.00–17.00', jumlahPeserta: 35, tingkat: 'VII–X' },
    { id: 8, nama: 'Robotik', pembina: 'Dr. Ahmad Zainuddin', jadwal: 'Sabtu, 08.00–11.00', jumlahPeserta: 20, tingkat: 'IX–XII' },
  ]);

  const tingkatOptions = ['VII–IX', 'VIII–X', 'IX–XII', 'VII–XII', 'X–XII'];

  // Form state untuk tambah/edit
  const [formData, setFormData] = useState({
    nama: '',
    pembina: '',
    jadwal: '',
    jumlahPeserta: '',
    tingkat: 'VII–IX'
  });

  // Navigasi ke detail
  const handleDetail = (item) => {
    if (onNavigate) {
      onNavigate('detail_ekstrakurikuler', item);
    }
  };

  // Filter data
  const filteredData = ekstrakurikulerData.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pembina.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jadwal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tingkat.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleDelete = (id, nama) => {
    setSelectedEkstra({ id, nama });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedEkstra) {
      setEkstrakurikulerData(ekstrakurikulerData.filter(item => item.id !== selectedEkstra.id));
      alert(`Ekstrakurikuler "${selectedEkstra.nama}" berhasil dihapus!`);
      setShowDeleteConfirm(false);
      setSelectedEkstra(null);
    }
  };

  const handleEdit = (item) => {
    setSelectedEkstra(item);
    setFormData({
      nama: item.nama,
      pembina: item.pembina,
      jadwal: item.jadwal,
      jumlahPeserta: item.jumlahPeserta,
      tingkat: item.tingkat
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setSelectedEkstra(null);
    setFormData({
      nama: '',
      pembina: '',
      jadwal: '',
      jumlahPeserta: '',
      tingkat: 'VII–IX'
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.nama || !formData.pembina || !formData.jadwal || !formData.jumlahPeserta) {
      alert('Mohon lengkapi data yang diperlukan!');
      return;
    }

    if (selectedEkstra) {
      const updatedData = ekstrakurikulerData.map(item =>
        item.id === selectedEkstra.id ? { ...item, ...formData, jumlahPeserta: parseInt(formData.jumlahPeserta) } : item
      );
      setEkstrakurikulerData(updatedData);
      alert('Data ekstrakurikuler berhasil diupdate!');
      setShowEditModal(false);
    } else {
      const newId = Math.max(...ekstrakurikulerData.map(item => item.id), 0) + 1;
      setEkstrakurikulerData([...ekstrakurikulerData, {
        id: newId,
        ...formData,
        jumlahPeserta: parseInt(formData.jumlahPeserta)
      }]);
      alert('Data ekstrakurikuler berhasil ditambahkan!');
      setShowModal(false);
    }
    setSelectedEkstra(null);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const exportData = filteredData.map((item, index) => ({
      'No': index + 1,
      'Nama Ekstrakurikuler': item.nama,
      'Pembina': item.pembina,
      'Jadwal': item.jadwal,
      'Jumlah Peserta': item.jumlahPeserta,
      'Tingkat': item.tingkat
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Ekstrakurikuler');
    XLSX.writeFile(wb, `data_ekstrakurikuler_${new Date().toISOString().split('T')[0]}.xlsx`);
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
      const newEkstra = [];
      let maxId = Math.max(...ekstrakurikulerData.map(item => item.id), 0);
      
      jsonData.forEach((row) => {
        if (row['Nama Ekstrakurikuler']) {
          maxId++;
          newEkstra.push({
            id: maxId,
            nama: row['Nama Ekstrakurikuler'],
            pembina: row['Pembina'] || '',
            jadwal: row['Jadwal'] || '',
            jumlahPeserta: row['Jumlah Peserta'] || 0,
            tingkat: row['Tingkat'] || 'VII–IX'
          });
        }
      });
      
      if (newEkstra.length > 0) {
        setEkstrakurikulerData([...ekstrakurikulerData, ...newEkstra]);
        alert(`${newEkstra.length} data ekstrakurikuler berhasil diimport!`);
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
      'Nama Ekstrakurikuler': 'Contoh Ekstrakurikuler',
      'Pembina': 'Nama Pembina',
      'Jadwal': 'Senin, 14.00–16.00',
      'Jumlah Peserta': 30,
      'Tingkat': 'VII–IX'
    }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Ekstrakurikuler');
    XLSX.writeFile(wb, 'template_ekstrakurikuler.xlsx');
    alert('Template berhasil diunduh!');
  };

  const getRowNumber = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  return (
    <div className="ekstrakurikuler-container">
      <div className="ekstrakurikuler-content">
        <div className="page-header">
          <h1>Data Ekstrakurikuler</h1>
          <p>Kelola data ekstrakurikuler dan pembina</p>
        </div>

        <div className="action-bar">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Cari nama ekstrakurikuler, pembina, atau jadwal..." 
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
              <FaUserPlus size={14} /> Tambah Ekstrakurikuler
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
          <table className="ekstrakurikuler-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Ekstrakurikuler</th>
                <th>Pembina</th>
                <th>Jadwal</th>
                <th>Jumlah Peserta</th>
                <th>Tingkat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{getRowNumber(index)}</td>
                  <td><strong>{item.nama}</strong></td>
                  <td>{item.pembina}</td>
                  <td><FaCalendarAlt className="jadwal-icon" /> {item.jadwal}</td>
                  <td><FaUsers className="peserta-icon" /> {item.jumlahPeserta}</td>
                  <td>{item.tingkat}</td>
                  <td className="action-cell">
                    <button className="icon-btn detail-btn" onClick={() => handleDetail(item)} title="Detail">
                      <FaEye size={14} />
                    </button>
                    <button className="icon-btn edit-btn" onClick={() => handleEdit(item)} title="Edit">
                      <FaEdit size={14} />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id, item.nama)} title="Hapus">
                      <FaTrashAlt size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentItems.length === 0 && (
            <div className="empty-data">
              <p>Tidak ada data ekstrakurikuler</p>
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

      {/* Modal Tambah Ekstrakurikuler */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Tambah Ekstrakurikuler</h3>
                <p>Lengkapi form untuk menambahkan data ekstrakurikuler</p>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Ekstrakurikuler <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Contoh: Pramuka" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Pembina <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Nama pembina" value={formData.pembina} onChange={(e) => setFormData({ ...formData, pembina: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Jadwal <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Contoh: Jumat, 14.00–16.00" value={formData.jadwal} onChange={(e) => setFormData({ ...formData, jadwal: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jumlah Peserta <span className="required">*</span></label>
                  <input type="number" className="form-control" placeholder="Jumlah peserta" value={formData.jumlahPeserta} onChange={(e) => setFormData({ ...formData, jumlahPeserta: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Tingkat</label>
                  <select className="form-control" value={formData.tingkat} onChange={(e) => setFormData({ ...formData, tingkat: e.target.value })}>
                    {tingkatOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
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

      {/* Modal Edit Ekstrakurikuler */}
      {showEditModal && selectedEkstra && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Edit Ekstrakurikuler</h3>
                <p>Edit data ekstrakurikuler yang dipilih</p>
              </div>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Nama Ekstrakurikuler <span className="required">*</span></label>
                <input type="text" className="form-control" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Pembina <span className="required">*</span></label>
                <input type="text" className="form-control" value={formData.pembina} onChange={(e) => setFormData({ ...formData, pembina: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Jadwal <span className="required">*</span></label>
                <input type="text" className="form-control" value={formData.jadwal} onChange={(e) => setFormData({ ...formData, jadwal: e.target.value })} />
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jumlah Peserta <span className="required">*</span></label>
                  <input type="number" className="form-control" value={formData.jumlahPeserta} onChange={(e) => setFormData({ ...formData, jumlahPeserta: e.target.value })} />
                </div>
                <div className="modal-form-group">
                  <label>Tingkat</label>
                  <select className="form-control" value={formData.tingkat} onChange={(e) => setFormData({ ...formData, tingkat: e.target.value })}>
                    {tingkatOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
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
      {showDeleteConfirm && selectedEkstra && (
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
              <p>Anda akan menghapus data ekstrakurikuler <strong>"{selectedEkstra.nama}"</strong></p>
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

export default Ekstrakurikuler;