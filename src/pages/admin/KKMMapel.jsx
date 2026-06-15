import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes, } from 'react-icons/fa';
import './KKMMapel.css';

const KKMMapel = () => {
  // Data dummy KKM
  const [data, setData] = useState([
    { id: 1, mataPelajaran: 'Matematika', tahunPelajaran: '2024/2025', semester: 'Genap', kelas: 'X-1', kkm: 75 },
    { id: 2, mataPelajaran: 'Bahasa Indonesia', tahunPelajaran: '2024/2025', semester: 'Genap', kelas: 'X-1', kkm: 78 },
    { id: 3, mataPelajaran: 'Inggris', tahunPelajaran: '2024/2025', semester: 'Ganjil', kelas: 'XI-2', kkm: 70 },
  ]);

  // Data master untuk dropdown
  const [mataPelajaranList, setMataPelajaranList] = useState([
    'Matematika', 'Bahasa Indonesia', 'Inggris', 'Fisika', 'Kimia', 'Biologi'
  ]);
  const [tahunPelajaranList, setTahunPelajaranList] = useState([
    '2024/2025', '2023/2024'
  ]);
  const [kelasList, setKelasList] = useState([
    'X-1', 'X-2', 'XI-1', 'XI-2', 'XII-1', 'XII-2', 'VII-1', 'VII-2', 'VIII-1', 'VIII-2', 'IX-1', 'IX-2'
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    mataPelajaran: '',
    tahunPelajaran: '2024/2025',
    semester: 'Ganjil',
    kelas: '',
    kkm: ''
  });

  // State untuk search dan pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const semesterOptions = ['Ganjil', 'Genap'];

  // Filter data berdasarkan search
  const filteredData = data.filter(item =>
    item.mataPelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${item.tahunPelajaran} ${item.semester}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ mataPelajaran: '', tahunPelajaran: '2024/2025', semester: 'Ganjil', kelas: '', kkm: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      mataPelajaran: item.mataPelajaran,
      tahunPelajaran: item.tahunPelajaran,
      semester: item.semester,
      kelas: item.kelas,
      kkm: item.kkm
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.mataPelajaran || !formData.tahunPelajaran || !formData.semester || !formData.kelas || !formData.kkm) {
      alert('Semua field harus diisi!');
      return;
    }
    if (formData.kkm < 0 || formData.kkm > 100) {
      alert('KKM harus antara 0 - 100');
      return;
    }
    const newData = {
      mataPelajaran: formData.mataPelajaran,
      tahunPelajaran: formData.tahunPelajaran,
      semester: formData.semester,
      kelas: formData.kelas,
      kkm: parseInt(formData.kkm)
    };
    if (editMode) {
      setData(data.map(item => item.id === currentId ? { ...item, ...newData } : item));
    } else {
      setData([...data, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
    setFormData({ mataPelajaran: '', tahunPelajaran: '2024/2025', semester: 'Ganjil', kelas: '', kkm: '' });
  };

  return (
    <div className="kkm-container">
      <div className="kkm-header">
        <h2>KKM Mata Pelajaran</h2>
        <button className="btn-add" onClick={handleAdd}>
          <FaPlus /> Tambah KKM
        </button>
      </div>

      <div className="kkm-toolbar">
        <div className="entries-selector">
          <label>Show</label>
          <select value={entriesPerPage} onChange={handleEntriesChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <label>entries</label>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari mata pelajaran, kelas, atau semester..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="kkm-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Mata Pelajaran</th>
              <th>Semester</th>
              <th>Kelas</th>
              <th>KKM</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">Tidak ada data ditemukan</td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{item.mataPelajaran}</td>
                  <td>{item.tahunPelajaran} {item.semester}</td>
                  <td>{item.kelas}</td>
                  <td>{item.kkm}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit size={14} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id)} title="Hapus">
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

      {totalPages > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map(page => (
              <button
                key={page + 1}
                className={`pagination-number ${currentPage === page + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>{editMode ? 'Edit KKM' : 'Tambah KKM'}</h3>
            <div className="modal-field">
              <label>Mata Pelajaran</label>
              <select
                value={formData.mataPelajaran}
                onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
              >
                <option value="">Pilih Mata Pelajaran</option>
                {mataPelajaranList.map(mapel => (
                  <option key={mapel} value={mapel}>{mapel}</option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>Tahun Pelajaran</label>
              <select
                value={formData.tahunPelajaran}
                onChange={(e) => setFormData({ ...formData, tahunPelajaran: e.target.value })}
              >
                {tahunPelajaranList.map(tahun => (
                  <option key={tahun} value={tahun}>{tahun}</option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              >
                {semesterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Kelas</label>
              <select
                value={formData.kelas}
                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
              >
                <option value="">Pilih Kelas</option>
                {kelasList.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>KKM (0 - 100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.kkm}
                onChange={(e) => setFormData({ ...formData, kkm: e.target.value })}
              />
            </div>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}><FaTimes /> Batal</button>
              <button onClick={handleSave}><FaSave /> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KKMMapel;