// src/pages/admin/PengaturanKelas.jsx
import React, { useState, useEffect } from 'react';
import './PengaturanKelas.css';
import { FaFileExcel, FaFileImport, FaFileDownload, FaTimes, FaFilter, FaChevronLeft, FaChevronRight, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
// Hapus import FiFileText, gunakan FaFileExcel untuk semua

// Data dummy: gabungan SMA dan SMP
const initialData = [
  { id: 1, nama: 'X 1', jumlah: 28, wali: 'Fatimah Azzahra, S.Pd', ruangan: 'R.101', tingkat: 'X', jenjang: 'SMA', kurikulum: 'Kurikulum Merdeka' },
  { id: 2, nama: 'X 2', jumlah: 30, wali: 'Ahmad Zaki, S.Pd.I', ruangan: 'R.102', tingkat: 'X', jenjang: 'SMA', kurikulum: 'Kurikulum Merdeka' },
  { id: 3, nama: 'XI 1', jumlah: 27, wali: 'Siti Nurhaliza, S.Pd', ruangan: 'R.201', tingkat: 'XI', jenjang: 'SMA', kurikulum: 'Kurikulum Merdeka' },
  { id: 4, nama: 'XI 2', jumlah: 29, wali: 'Muhammad Rizki, S.Pd', ruangan: 'R.202', tingkat: 'XI', jenjang: 'SMA', kurikulum: 'Kurikulum Merdeka' },
  { id: 5, nama: 'XII 1', jumlah: 26, wali: 'Nur Azizah, S.Pd.I', ruangan: 'R.301', tingkat: 'XII', jenjang: 'SMA', kurikulum: 'Kurikulum Merdeka' },
  { id: 6, nama: 'VII 1', jumlah: 32, wali: 'Dewi Kartika, S.Pd', ruangan: 'R.001', tingkat: 'VII', jenjang: 'SMP', kurikulum: 'Kurikulum Merdeka' },
  { id: 7, nama: 'VII 2', jumlah: 30, wali: 'Budi Santoso, S.Pd', ruangan: 'R.002', tingkat: 'VII', jenjang: 'SMP', kurikulum: 'Kurikulum Merdeka' },
  { id: 8, nama: 'VIII 1', jumlah: 31, wali: 'Siti Aminah, S.Pd', ruangan: 'R.003', tingkat: 'VIII', jenjang: 'SMP', kurikulum: 'Kurikulum Merdeka' },
  { id: 9, nama: 'VIII 2', jumlah: 29, wali: 'Agus Salim, S.Pd', ruangan: 'R.004', tingkat: 'VIII', jenjang: 'SMP', kurikulum: 'Kurikulum Merdeka' },
  { id: 10, nama: 'IX 1', jumlah: 33, wali: 'Rina Melati, S.Pd', ruangan: 'R.005', tingkat: 'IX', jenjang: 'SMP', kurikulum: 'Kurikulum Merdeka' },
];

const ITEMS_PER_PAGE = 8;

const emptyForm = { 
  id: null,
  jenjang: 'SMA',
  tingkat: '', 
  jenisNama: '', 
  nama: '', 
  wali: '', 
  ruangan: '' 
};

const PengaturanKelas = ({ onDetailKelas, onNavigate }) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filterJenjang, setFilterJenjang] = useState('');
  const [filterTingkat, setFilterTingkat] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Auto-generate nama kelas berdasarkan jenjang dan tingkat
  useEffect(() => {
    if (form.jenjang && form.tingkat && form.jenisNama) {
      const generatedNama = `${form.tingkat} ${form.jenisNama}`.trim();
      if (generatedNama !== form.nama) {
        setForm(prev => ({ ...prev, nama: generatedNama }));
      }
    }
  }, [form.jenjang, form.tingkat, form.jenisNama, form.nama]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const filtered = data.filter(k => {
    const matchSearch = k.nama.toLowerCase().includes(search.toLowerCase()) ||
      k.wali.toLowerCase().includes(search.toLowerCase()) ||
      k.ruangan.toLowerCase().includes(search.toLowerCase());
    const matchJenjang = filterJenjang === '' || k.jenjang === filterJenjang;
    const matchTingkat = filterTingkat === '' || k.tingkat === filterTingkat;
    return matchSearch && matchJenjang && matchTingkat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'jenjang') {
      setForm(prev => ({ ...prev, tingkat: '', jenisNama: '', nama: '' }));
    }
  };

  const handleEdit = (kelas) => {
    setEditId(kelas.id);
    setForm({
      id: kelas.id,
      jenjang: kelas.jenjang,
      tingkat: kelas.tingkat,
      jenisNama: kelas.nama.split(' ')[1] || '',
      nama: kelas.nama,
      wali: kelas.wali,
      ruangan: kelas.ruangan,
    });
    setShowModal(true);
  };

  const isDuplicateName = (nama, excludeId = null) => {
    return data.some(k => 
      k.nama.toLowerCase() === nama.toLowerCase() && 
      (excludeId ? k.id !== excludeId : true)
    );
  };

  const handleSimpan = () => {
    if (!form.jenjang || !form.tingkat || !form.nama || !form.wali || !form.ruangan) {
      setNotification({ show: true, message: 'Mohon lengkapi semua field yang bertanda *', type: 'error' });
      return;
    }
    if (isDuplicateName(form.nama, editId)) {
      setNotification({ show: true, message: `Kelas dengan nama "${form.nama}" sudah ada!`, type: 'error' });
      return;
    }
    
    if (editId) {
      const updatedData = data.map(k => 
        k.id === editId ? {
          ...k,
          nama: form.nama,
          wali: form.wali,
          ruangan: form.ruangan,
          tingkat: form.tingkat,
          jenjang: form.jenjang,
          kurikulum: 'Kurikulum Merdeka',
        } : k
      );
      setData(updatedData);
      setNotification({ show: true, message: `Data kelas "${form.nama}" berhasil diperbarui!`, type: 'success' });
    } else {
      const maxId = data.length > 0 ? Math.max(...data.map(k => k.id)) : 0;
      const newKelas = {
        id: maxId + 1,
        nama: form.nama,
        jumlah: 0,
        wali: form.wali,
        ruangan: form.ruangan,
        tingkat: form.tingkat,
        jenjang: form.jenjang,
        kurikulum: 'Kurikulum Merdeka',
      };
      setData([...data, newKelas]);
      setNotification({ show: true, message: `Kelas "${form.nama}" berhasil ditambahkan!`, type: 'success' });
    }
    
    setForm(emptyForm);
    setEditId(null);
    setShowModal(false);
  };

  const handleHapus = (id, namaKelas) => {
    if (window.confirm(`Yakin ingin menghapus kelas "${namaKelas}"?\nData yang terkait dengan kelas ini juga akan terhapus.`)) {
      setData(data.filter(k => k.id !== id));
      setNotification({ show: true, message: `Kelas "${namaKelas}" berhasil dihapus!`, type: 'success' });
    }
  };

  const handleDetail = (kelas) => {
    if (onDetailKelas) onDetailKelas(kelas);
    else if (onNavigate) onNavigate('detailKelas', kelas);
    else alert(`Detail Kelas: ${kelas.nama}\nWali Kelas: ${kelas.wali}\nRuangan: ${kelas.ruangan}\nJumlah Siswa: ${kelas.jumlah}\nKurikulum: ${kelas.kurikulum}\nJenjang: ${kelas.jenjang}`);
  };

  const getTingkatColor = (tingkat) => {
    if (tingkat === 'X' || tingkat === 'VII') return 'badge-x';
    if (tingkat === 'XI' || tingkat === 'VIII') return 'badge-xi';
    return 'badge-xii';
  };

  const handleFilterJenjangChange = (jenjang) => {
    setFilterJenjang(jenjang);
    setFilterTingkat('');
    setCurrentPage(1);
  };

  const handleFilterTingkatChange = (tingkat) => {
    setFilterTingkat(tingkat);
    setCurrentPage(1);
  };

  const countByJenjang = (jenjang) => data.filter(k => k.jenjang === jenjang).length;
  const countByTingkat = (tingkat) => data.filter(k => k.tingkat === tingkat).length;

  const resetModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const getTingkatOptions = () => {
    if (form.jenjang === 'SMA') return ['X', 'XI', 'XII'];
    if (form.jenjang === 'SMP') return ['VII', 'VIII', 'IX'];
    return [];
  };

  return (
    <div className="pengkelas-container">
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>{notification.message}</div>
      )}

      <div className="pengkelas-header">
        <div>
          <h2>Pengaturan Kelas</h2>
          <p>Kelola data kelas dan rombongan belajar - Kurikulum Merdeka</p>
        </div>
        <button className="btn-tambah" onClick={() => {
          setEditId(null);
          setForm(emptyForm);
          setShowModal(true);
        }}>
          + Tambah Kelas
        </button>
      </div>

      {/* Filter Jenjang (dengan ikon filter) */}
      <div className="filter-tingkat-section">
        <div className="filter-label">
          <FaFilter className="filter-icon" />
          <span>Filter Jenjang:</span>
        </div>
        <div className="filter-buttons">
          <button className={`filter-btn ${filterJenjang === '' ? 'active' : ''}`} onClick={() => handleFilterJenjangChange('')}>
            Semua <span className="count">({data.length})</span>
          </button>
          <button className={`filter-btn ${filterJenjang === 'SMA' ? 'active' : ''}`} onClick={() => handleFilterJenjangChange('SMA')}>
            SMA <span className="count">({countByJenjang('SMA')})</span>
          </button>
          <button className={`filter-btn ${filterJenjang === 'SMP' ? 'active' : ''}`} onClick={() => handleFilterJenjangChange('SMP')}>
            SMP <span className="count">({countByJenjang('SMP')})</span>
          </button>
        </div>
      </div>

      {/* Filter Tingkat Kelas (TANPA ikon filter - sudah dihapus) */}
      {filterJenjang !== '' && (
        <div className="filter-tingkat-section">
          <div className="filter-label">
            {/* Ikon FaFilter dihapus dari sini */}
            <span>Filter Tingkat Kelas:</span>
          </div>
          <div className="filter-buttons">
            <button className={`filter-btn ${filterTingkat === '' ? 'active' : ''}`} onClick={() => handleFilterTingkatChange('')}>
              Semua
            </button>
            {filterJenjang === 'SMA' && (
              <>
                <button className={`filter-btn ${filterTingkat === 'X' ? 'active' : ''}`} onClick={() => handleFilterTingkatChange('X')}>
                  Kelas X <span className="count">({countByTingkat('X')})</span>
                </button>
                <button className={`filter-btn ${filterTingkat === 'XI' ? 'active' : ''}`} onClick={() => handleFilterTingkatChange('XI')}>
                  Kelas XI <span className="count">({countByTingkat('XI')})</span>
                </button>
                <button className={`filter-btn ${filterTingkat === 'XII' ? 'active' : ''}`} onClick={() => handleFilterTingkatChange('XII')}>
                  Kelas XII <span className="count">({countByTingkat('XII')})</span>
                </button>
              </>
            )}
            {filterJenjang === 'SMP' && (
              <>
                <button className={`filter-btn ${filterTingkat === 'VII' ? 'active' : ''}`} onClick={() => handleFilterTingkatChange('VII')}>
                  Kelas VII <span className="count">({countByTingkat('VII')})</span>
                </button>
                <button className={`filter-btn ${filterTingkat === 'VIII' ? 'active' : ''}`} onClick={() => handleFilterTingkatChange('VIII')}>
                  Kelas VIII <span className="count">({countByTingkat('VIII')})</span>
                </button>
                <button className={`filter-btn ${filterTingkat === 'IX' ? 'active' : ''}`} onClick={() => handleFilterTingkatChange('IX')}>
                  Kelas IX <span className="count">({countByTingkat('IX')})</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="pengkelas-toolbar">
        <div className="toolbar-left">
          {/* Ikon tombol Template sekarang pakai FaFileExcel (sama dengan yang lain) */}
          <button className="btn-tool btn-template" onClick={() => alert('Download template kelas')}>
            <FaFileExcel size={15} /> Template
          </button>
          <button className="btn-tool btn-import" onClick={() => alert('Import data kelas dari Excel')}>
            <FaFileImport size={14} /> Import Excel
          </button>
          <button className="btn-tool btn-export" onClick={() => alert('Export data kelas ke Excel')}>
            <FaFileExcel size={14} /> Export Excel
          </button>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <input type="text" placeholder="Cari kelas, wali kelas, atau ruangan..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
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
              <th>Jenjang</th>
              <th>Tingkat</th>
              <th>Kurikulum</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={8} className="empty-row">{filterJenjang ? `Tidak ada data untuk ${filterJenjang}` : 'Tidak ada data ditemukan'}</td></tr>
            ) : (
              paginated.map((kelas) => (
                <tr key={kelas.id}>
                  <td className="td-nama">{kelas.nama}</td>
                  <td>{kelas.jumlah}</td>
                  <td>{kelas.wali}</td>
                  <td>{kelas.ruangan}</td>
                  <td>{kelas.jenjang}</td>
                  <td><span className={`badge-tingkat ${getTingkatColor(kelas.tingkat)}`}>{kelas.tingkat}</span></td>
                  <td>{kelas.kurikulum}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn detail-btn" onClick={() => handleDetail(kelas)} title="Detail"><FaEye size={14} /></button>
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(kelas)} title="Edit"><FaEdit size={14} /></button>
                      <button className="icon-btn delete-btn" onClick={() => handleHapus(kelas.id, kelas.nama)} title="Hapus"><FaTrashAlt size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} data</div>
          <div className="pagination">
            <button className="pagination-btn pagination-arrow" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}><FaChevronLeft size={14} /> Prev</button>
            <div className="pagination-numbers">
              {getPageNumbers().map((page, idx) => (
                <button key={idx} className={`pagination-number ${currentPage === page ? 'active' : ''} ${page === '...' ? 'dots' : ''}`} onClick={() => typeof page === 'number' && handlePageChange(page)} disabled={page === '...'}>
                  {page}
                </button>
              ))}
            </div>
            <button className="pagination-btn pagination-arrow" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages || totalPages === 0}>Next <FaChevronRight size={14} /></button>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit (tidak berubah) */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>{editId ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h3>
                <p>Lengkapi form untuk {editId ? 'mengedit' : 'menambahkan'} kelas (Kurikulum Merdeka)</p>
              </div>
              <button className="modal-close" onClick={resetModal}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jenjang <span className="required">*</span></label>
                  <select name="jenjang" value={form.jenjang} onChange={handleFormChange} className="form-control" required>
                    <option value="SMA">SMA</option>
                    <option value="SMP">SMP</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label>Tingkatan Kelas <span className="required">*</span></label>
                  <select name="tingkat" value={form.tingkat} onChange={handleFormChange} className="form-control" required>
                    <option value="">Pilih Tingkatan</option>
                    {getTingkatOptions().map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Jenis Nama Kelas</label>
                  <input name="jenisNama" value={form.jenisNama} onChange={handleFormChange} placeholder="Contoh: 1, 2, 3, A, B, ..." className="form-control" />
                  <small className="form-hint">*Akan otomatis digabung dengan Tingkatan (contoh: X 1 atau VII 1)</small>
                </div>
                <div className="modal-form-group">
                  <label>Nama Kelas <span className="required">*</span></label>
                  <input name="nama" value={form.nama} onChange={handleFormChange} placeholder="Contoh: X 1 atau VII 1" className="form-control" required />
                  {form.jenjang && form.tingkat && form.jenisNama && (
                    <small className="form-hint success">Nama kelas akan menjadi: <strong>{form.tingkat} {form.jenisNama}</strong></small>
                  )}
                </div>
              </div>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Wali Kelas <span className="required">*</span></label>
                  <input name="wali" value={form.wali} onChange={handleFormChange} placeholder="Nama lengkap wali kelas" className="form-control" required />
                </div>
                <div className="modal-form-group">
                  <label>Ruangan <span className="required">*</span></label>
                  <input name="ruangan" value={form.ruangan} onChange={handleFormChange} placeholder="Contoh: R.101" className="form-control" required />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={resetModal}>Batal</button>
              <button className="btn-simpan" onClick={handleSimpan}>{editId ? 'Update Kelas' : 'Simpan Kelas'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengaturanKelas;