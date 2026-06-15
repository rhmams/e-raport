import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import './ButirSikap.css';

const ButirSikap = () => {
  const [data, setData] = useState([
    { id: 1, kompetensi: 'Sosial', kode: 'KD-01', butir: 'Bertanggung jawab dalam tugas kelompok' },
    { id: 2, kompetensi: 'Spiritual', kode: 'KD-02', butir: 'Menjalankan ibadah tepat waktu' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    kompetensi: 'Sosial',
    kode: '',
    butir: ''
  });

  const kompetensiOptions = ['Sosial', 'Spiritual'];

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ kompetensi: 'Sosial', kode: '', butir: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      kompetensi: item.kompetensi,
      kode: item.kode,
      butir: item.butir
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.kompetensi || !formData.kode || !formData.butir) {
      alert('Semua field harus diisi!');
      return;
    }
    const newData = {
      kompetensi: formData.kompetensi,
      kode: formData.kode,
      butir: formData.butir
    };
    if (editMode) {
      setData(data.map(item => item.id === currentId ? { ...item, ...newData } : item));
    } else {
      setData([...data, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
    setFormData({ kompetensi: 'Sosial', kode: '', butir: '' });
  };

  return (
    <div className="butir-container">
      <div className="butir-header">
        <h2>Butir-Butir Sikap</h2>
        <button className="btn-add" onClick={handleAdd}>
          <FaPlus /> Tambah Butir
        </button>
      </div>

      <div className="table-wrapper">
        <table className="butir-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kompetensi</th>
              <th>Kode Butir Sikap</th>
              <th>Butir-Butir Sikap</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.kompetensi}</td>
                <td>{item.kode}</td>
                <td>{item.butir}</td>
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
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>{editMode ? 'Edit Butir Sikap' : 'Tambah Butir Sikap'}</h3>
            <div className="modal-field">
              <label>Kompetensi</label>
              <select
                value={formData.kompetensi}
                onChange={(e) => setFormData({ ...formData, kompetensi: e.target.value })}
              >
                {kompetensiOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>Kode Butir Sikap</label>
              <input
                type="text"
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                placeholder="Contoh: KD-01"
              />
            </div>
            <div className="modal-field">
              <label>Butir-Butir Sikap</label>
              <textarea
                rows="3"
                value={formData.butir}
                onChange={(e) => setFormData({ ...formData, butir: e.target.value })}
                placeholder="Deskripsi butir sikap..."
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

export default ButirSikap;