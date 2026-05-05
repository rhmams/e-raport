// src/pages/admin/PengaturanKelas.jsx
import React, { useState, useEffect } from 'react';
import './PengaturanKelas.css';
import { FaSearch, FaFileExcel, FaFileImport, FaFileDownload, FaTimes, FaFilter, FaChevronLeft, FaChevronRight, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const initialData = [
  { id: 1, nama: 'X IPA 1', jumlah: 28, wali: 'Fatimah Azzahra, S.Pd', ruangan: 'R.101', tingkat: 'X', jurusan: 'IPA', kurikulum: 'Kurikulum 2013' },
  { id: 2, nama: 'X IPA 2', jumlah: 30, wali: 'Ahmad Zaki, S.Pd.I', ruangan: 'R.102', tingkat: 'X', jurusan: 'IPA', kurikulum: 'Kurikulum 2013' },
  { id: 3, nama: 'X IPS 1', jumlah: 27, wali: 'Siti Nurhaliza, S.Pd', ruangan: 'R.103', tingkat: 'X', jurusan: 'IPS', kurikulum: 'Kurikulum 2013' },
  { id: 4, nama: 'X IPS 2', jumlah: 29, wali: 'Muhammad Rizki, S.Pd', ruangan: 'R.104', tingkat: 'X', jurusan: 'IPS', kurikulum: 'Kurikulum 2013' },
  { id: 5, nama: 'XI IPA 3', jumlah: 26, wali: 'Nur Azizah, S.Pd.I', ruangan: 'R.201', tingkat: 'XI', jurusan: 'IPA', kurikulum: 'Kurikulum 2013' },
  { id: 6, nama: 'XI IPA 4', jumlah: 28, wali: 'Hasan Basri, S.Pd', ruangan: 'R.202', tingkat: 'XI', jurusan: 'IPA', kurikulum: 'Kurikulum Merdeka' },
  { id: 7, nama: 'XI IPS 1', jumlah: 27, wali: 'Aisyah Putri, S.Pd', ruangan: 'R.203', tingkat: 'XI', jurusan: 'IPS', kurikulum: 'Kurikulum 2013' },
  { id: 8, nama: 'XI IPS 2', jumlah: 29, wali: 'Abdul Rahman, S.Pd.I', ruangan: 'R.204', tingkat: 'XI', jurusan: 'IPS', kurikulum: 'Kurikulum Merdeka' },
  { id: 9, nama: 'XII IPA 6', jumlah: 25, wali: 'Khadijah Amani, S.Pd', ruangan: 'R.301', tingkat: 'XII', jurusan: 'IPA', kurikulum: 'KTSP' },
  { id: 10, nama: 'XII IPA 7', jumlah: 28, wali: 'Umar Faruq, S.Pd.I', ruangan: 'R.302', tingkat: 'XII', jurusan: 'IPA', kurikulum: 'KTSP' },
  { id: 11, nama: 'XII IPS 1', jumlah: 26, wali: 'Zahra Safira, S.Pd', ruangan: 'R.303', tingkat: 'XII', jurusan: 'IPS', kurikulum: 'KTSP' },
  { id: 12, nama: 'XII IPS 2', jumlah: 27, wali: 'Ali Mahfud, S.Pd', ruangan: 'R.304', tingkat: 'XII', jurusan: 'IPS', kurikulum: 'KTSP' },
  { id: 13, nama: 'XI IPA 8', jumlah: 26, wali: 'Cata Hanum, S.Pd.I', ruangan: 'R.503', tingkat: 'XI', jurusan: 'IPA', kurikulum: 'Kurikulum 2013' },
  { id: 14, nama: 'XI IPA 9', jumlah: 28, wali: 'Harry Robert, S.Pd', ruangan: 'R.501', tingkat: 'XI', jurusan: 'IPA', kurikulum: 'Kurikulum Merdeka' },
  { id: 15, nama: 'XI IPS 3', jumlah: 27, wali: 'Raisa Loui, S.Pd', ruangan: 'R.402', tingkat: 'XI', jurusan: 'IPS', kurikulum: 'Kurikulum 2013' },
  { id: 16, nama: 'XI IPS 4', jumlah: 29, wali: 'Reanita Helena, S.Pd.I', ruangan: 'R.301', tingkat: 'XI', jurusan: 'IPS', kurikulum: 'Kurikulum Merdeka' },
  { id: 17, nama: 'X IPA 3', jumlah: 26, wali: 'Fajar Siddiq, S.Pd', ruangan: 'R.105', tingkat: 'X', jurusan: 'IPA', kurikulum: 'Kurikulum 2013' },
  { id: 18, nama: 'X IPA 4', jumlah: 27, wali: 'Nadia Rahma, S.Pd', ruangan: 'R.106', tingkat: 'X', jurusan: 'IPA', kurikulum: 'Kurikulum Merdeka' },
  { id: 19, nama: 'XII IPA 8', jumlah: 24, wali: 'Budi Santoso, S.Pd', ruangan: 'R.305', tingkat: 'XII', jurusan: 'IPA', kurikulum: 'Kurikulum 2013' },
  { id: 20, nama: 'XII IPS 3', jumlah: 26, wali: 'Dewi Kartika, S.Pd', ruangan: 'R.306', tingkat: 'XII', jurusan: 'IPS', kurikulum: 'Kurikulum Merdeka' },
  { id: 21, nama: 'XII IPS 4', jumlah: 25, wali: 'Rizki Fadillah, S.Pd', ruangan: 'R.307', tingkat: 'XII', jurusan: 'IPS', kurikulum: 'KTSP' },
  { id: 22, nama: 'X IPS 3', jumlah: 28, wali: 'Maya Sari, S.Pd.I', ruangan: 'R.107', tingkat: 'X', jurusan: 'IPS', kurikulum: 'Kurikulum 2013' },
  { id: 23, nama: 'X IPS 4', jumlah: 27, wali: 'Andi Wijaya, S.Pd', ruangan: 'R.108', tingkat: 'X', jurusan: 'IPS', kurikulum: 'Kurikulum Merdeka' },
  { id: 24, nama: 'XI IPA 10', jumlah: 26, wali: 'Sinta Dewi, S.Pd', ruangan: 'R.205', tingkat: 'XI', jurusan: 'IPA', kurikulum: 'Kurikulum 2013' },
];

const ITEMS_PER_PAGE = 8;

const emptyForm = { 
  id: null,
  tingkat: '', 
  kurikulum: '', 
  jurusan: '', 
  jenisNama: '', 
  nama: '', 
  wali: '', 
  ruangan: '' 
};

const PengaturanKelas = ({ onDetailKelas, onNavigate }) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filterTingkat, setFilterTingkat] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Auto-generate nama kelas
  useEffect(() => {
    if (form.tingkat && form.jurusan && form.jenisNama) {
      const generatedNama = `${form.tingkat} ${form.jurusan} ${form.jenisNama}`.trim();
      if (generatedNama !== form.nama) {
        setForm(prev => ({ ...prev, nama: generatedNama }));
      }
    }
  }, [form.tingkat, form.jurusan, form.jenisNama, form.nama]);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // Filter data berdasarkan search dan tingkat
  const filtered = data.filter(k => {
    const matchSearch = k.nama.toLowerCase().includes(search.toLowerCase()) ||
      k.wali.toLowerCase().includes(search.toLowerCase()) ||
      k.ruangan.toLowerCase().includes(search.toLowerCase());
    
    const matchTingkat = filterTingkat === '' || k.tingkat === filterTingkat;
    
    return matchSearch && matchTingkat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Generate page numbers dengan ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page === 'prev') {
      setCurrentPage(prev => Math.max(1, prev - 1));
    } else if (page === 'next') {
      setCurrentPage(prev => Math.min(totalPages, prev + 1));
    } else if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (kelas) => {
    setEditId(kelas.id);
    setForm({
      id: kelas.id,
      tingkat: kelas.tingkat,
      kurikulum: kelas.kurikulum,
      jurusan: kelas.jurusan,
      jenisNama: kelas.nama.split(' ').slice(2).join(' ') || '',
      nama: kelas.nama,
      wali: kelas.wali,
      ruangan: kelas.ruangan,
    });
    setShowModal(true);
  };

  // Cek duplikasi nama kelas
  const isDuplicateName = (nama, excludeId = null) => {
    return data.some(k => 
      k.nama.toLowerCase() === nama.toLowerCase() && 
      (excludeId ? k.id !== excludeId : true)
    );
  };

  const handleSimpan = () => {
    // Validasi field wajib
    if (!form.tingkat || !form.kurikulum || !form.jurusan || !form.nama || !form.wali || !form.ruangan) {
      setNotification({
        show: true,
        message: 'Mohon lengkapi semua field yang bertanda *',
        type: 'error'
      });
      return;
    }
    
    // Cek duplikasi nama kelas
    if (isDuplicateName(form.nama, editId)) {
      setNotification({
        show: true,
        message: `Kelas dengan nama "${form.nama}" sudah ada!`,
        type: 'error'
      });
      return;
    }
    
    if (editId) {
      // Mode edit
      const updatedData = data.map(k => 
        k.id === editId ? {
          ...k,
          nama: form.nama,
          wali: form.wali,
          ruangan: form.ruangan,
          tingkat: form.tingkat,
          jurusan: form.jurusan,
          kurikulum: form.kurikulum,
        } : k
      );
      setData(updatedData);
      setNotification({
        show: true,
        message: `Data kelas "${form.nama}" berhasil diperbarui!`,
        type: 'success'
      });
    } else {
      // Mode tambah
      const maxId = data.length > 0 ? Math.max(...data.map(k => k.id)) : 0;
      const newKelas = {
        id: maxId + 1,
        nama: form.nama,
        jumlah: 0,
        wali: form.wali,
        ruangan: form.ruangan,
        tingkat: form.tingkat,
        jurusan: form.jurusan,
        kurikulum: form.kurikulum,
      };
      setData([...data, newKelas]);
      setNotification({
        show: true,
        message: `Kelas "${form.nama}" berhasil ditambahkan!`,
        type: 'success'
      });
    }
    
    setForm(emptyForm);
    setEditId(null);
    setShowModal(false);
  };

  const handleHapus = (id, namaKelas) => {
    if (window.confirm(`Yakin ingin menghapus kelas "${namaKelas}"?\nData yang terkait dengan kelas ini juga akan terhapus.`)) {
      setData(data.filter(k => k.id !== id));
      setNotification({
        show: true,
        message: `Kelas "${namaKelas}" berhasil dihapus!`,
        type: 'success'
      });
    }
  };

  const handleDetail = (kelas) => {
    if (onDetailKelas) {
      onDetailKelas(kelas);
    } else if (onNavigate) {
      onNavigate('detailKelas', kelas);
    } else {
      alert(`Detail Kelas: ${kelas.nama}\nWali Kelas: ${kelas.wali}\nRuangan: ${kelas.ruangan}\nJumlah Siswa: ${kelas.jumlah}\nKurikulum: ${kelas.kurikulum}`);
    }
  };

  const getTingkatColor = (tingkat) => {
    if (tingkat === 'X') return 'badge-x';
    if (tingkat === 'XI') return 'badge-xi';
    return 'badge-xii';
  };

  const handleFilterChange = (tingkat) => {
    setFilterTingkat(tingkat);
    setCurrentPage(1);
  };

  const countByTingkat = (tingkat) => {
    return data.filter(k => k.tingkat === tingkat).length;
  };

  // Reset modal
  const resetModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
  };

  // Handle Template
  const handleTemplate = () => {
    alert('Download template kelas');
  };

  // Handle Import Excel
  const handleImportExcel = () => {
    alert('Import data kelas dari Excel');
  };

  // Handle Export Excel
  const handleExportExcel = () => {
    alert('Export data kelas ke Excel');
  };

  return (
    <div className="pengkelas-container">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="pengkelas-header">
        <div>
          <h2>Pengaturan Kelas</h2>
          <p>Kelola data kelas dan rombongan belajar</p>
        </div>
        <button className="btn-tambah" onClick={() => {
          setEditId(null);
          setForm(emptyForm);
          setShowModal(true);
        }}>
          + Tambah Kelas
        </button>
      </div>

      {/* Filter Tingkat */}
      <div className="filter-tingkat-section">
        <div className="filter-label">
          <FaFilter className="filter-icon" />
          <span>Filter Tingkat Kelas:</span>
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterTingkat === '' ? 'active' : ''}`}
            onClick={() => handleFilterChange('')}
          >
            Semua <span className="count">({data.length})</span>
          </button>
          <button 
            className={`filter-btn ${filterTingkat === 'X' ? 'active' : ''}`}
            onClick={() => handleFilterChange('X')}
          >
            Kelas X <span className="count">({countByTingkat('X')})</span>
          </button>
          <button 
            className={`filter-btn ${filterTingkat === 'XI' ? 'active' : ''}`}
            onClick={() => handleFilterChange('XI')}
          >
            Kelas XI <span className="count">({countByTingkat('XI')})</span>
          </button>
          <button 
            className={`filter-btn ${filterTingkat === 'XII' ? 'active' : ''}`}
            onClick={() => handleFilterChange('XII')}
          >
            Kelas XII <span className="count">({countByTingkat('XII')})</span>
          </button>
        </div>
      </div>

      <div className="pengkelas-toolbar">
        <div className="toolbar-left">
          <button className="btn-tool btn-template" onClick={handleTemplate}>
            <FiFileText size={15} /> Template
          </button>
          <button className="btn-tool btn-import" onClick={handleImportExcel}>
            <FaFileImport size={14} /> Import Excel
          </button>
          <button className="btn-tool btn-export" onClick={handleExportExcel}>
            <FaFileExcel size={14} /> Export Excel
          </button>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Cari kelas, wali kelas, atau ruangan..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
      </div>

      <div className="pengkelas-table-wrap">
        <table className="pengkelas-table">
          <thead>
            <tr>
              <th>Nama Kelas</th>
              <th>Jumlah Siswa</th>
              <th>Wali Kelas</th>
              <th>Ruangan</th>
              <th>Tingkat</th>
              <th>Jurusan</th>
              <th>Kurikulum</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={8} className="empty-row">
                {filterTingkat ? `Tidak ada data untuk Kelas ${filterTingkat}` : 'Tidak ada data ditemukan'}
              </td></tr>
            ) : (
              paginated.map((kelas) => (
                <tr key={kelas.id}>
                  <td className="td-nama">{kelas.nama}</td>
                  <td>{kelas.jumlah}</td>
                  <td>{kelas.wali}</td>
                  <td>{kelas.ruangan}</td>
                  <td><span className={`badge-tingkat ${getTingkatColor(kelas.tingkat)}`}>{kelas.tingkat}</span></td>
                  <td>{kelas.jurusan}</td>
                  <td>{kelas.kurikulum}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn detail-btn" onClick={() => handleDetail(kelas)} title="Detail">
                        <FaEye size={14} />
                      </button>
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(kelas)} title="Edit">
                        <FaEdit size={14} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => handleHapus(kelas.id, kelas.nama)} title="Hapus">
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} data
          </div>
          <div className="pagination">
            <button 
              className="pagination-btn pagination-arrow"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <FaChevronLeft size={14} /> Prev
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
            
            <button 
              className="pagination-btn pagination-arrow"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>{editId ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h3>
                <p>Lengkapi form untuk {editId ? 'mengedit' : 'menambahkan'} kelas</p>
              </div>
              <button className="modal-close" onClick={resetModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Tingkatan Kelas <span className="required">*</span></label>
                  <select 
                    name="tingkat" 
                    value={form.tingkat} 
                    onChange={handleFormChange} 
                    className="form-control"
                    required
                  >
                    <option value="">Pilih Tingkatan</option>
                    <option value="X">X (Sepuluh)</option>
                    <option value="XI">XI (Sebelas)</option>
                    <option value="XII">XII (Dua Belas)</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Kurikulum <span className="required">*</span></label>
                  <select 
                    name="kurikulum" 
                    value={form.kurikulum} 
                    onChange={handleFormChange} 
                    className="form-control"
                    required
                  >
                    <option value="">Pilih Kurikulum</option>
                    <option value="Kurikulum 2013">Kurikulum 2013 (K13)</option>
                    <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                    <option value="KTSP">KTSP</option>
                  </select>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jurusan <span className="required">*</span></label>
                  <select 
                    name="jurusan" 
                    value={form.jurusan} 
                    onChange={handleFormChange} 
                    className="form-control"
                    required
                  >
                    <option value="">Pilih Jurusan</option>
                    <option value="IPA">IPA (Ilmu Pengetahuan Alam)</option>
                    <option value="IPS">IPS (Ilmu Pengetahuan Sosial)</option>
                    <option value="Bahasa">Bahasa</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Jenis Nama Kelas</label>
                  <input 
                    name="jenisNama" 
                    value={form.jenisNama} 
                    onChange={handleFormChange} 
                    placeholder="Contoh: IPA 1" 
                    className="form-control" 
                  />
                  <small className="form-hint">
                    *Akan otomatis digabung dengan Tingkatan & Jurusan
                  </small>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Nama Kelas <span className="required">*</span></label>
                  <input 
                    name="nama" 
                    value={form.nama} 
                    onChange={handleFormChange} 
                    placeholder="Contoh: X IPA 1" 
                    className="form-control" 
                    required
                  />
                  {form.tingkat && form.jurusan && form.jenisNama && (
                    <small className="form-hint success">
                      Nama kelas akan menjadi: <strong>{form.tingkat} {form.jurusan} {form.jenisNama}</strong>
                    </small>
                  )}
                </div>
                <div className="modal-form-group">
                  <label>Wali Kelas <span className="required">*</span></label>
                  <input 
                    name="wali" 
                    value={form.wali} 
                    onChange={handleFormChange} 
                    placeholder="Nama lengkap wali kelas" 
                    className="form-control" 
                    required
                  />
                </div>
              </div>
              <div className="modal-form-group full-width">
                <label>Ruangan <span className="required">*</span></label>
                <input 
                  name="ruangan" 
                  value={form.ruangan} 
                  onChange={handleFormChange} 
                  placeholder="Contoh: R.101" 
                  className="form-control" 
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={resetModal}>
                Batal
              </button>
              <button className="btn-simpan" onClick={handleSimpan}>
                {editId ? 'Update Kelas' : 'Simpan Kelas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengaturanKelas;