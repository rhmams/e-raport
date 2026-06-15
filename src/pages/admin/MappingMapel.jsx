// src/pages/admin/MappingMapel.jsx
import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import './MappingMapel.css';

const MappingMapel = () => {
  const [mapping, setMapping] = useState([
    { id: 1, mataPelajaran: 'film', kelompok: 'Kelompok B', noUrut: 1 },
    { id: 2, mataPelajaran: 'jj', kelompok: 'Kelompok A', noUrut: 0 },
    { id: 3, mataPelajaran: 'Pop', kelompok: 'Kelompok A', noUrut: 2 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    mataPelajaran: '',
    kelompok: 'Kelompok A',
    noUrut: '',
  });

  const kelompokOptions = ['Kelompok A', 'Kelompok B'];

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ mataPelajaran: '', kelompok: 'Kelompok A', noUrut: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      mataPelajaran: item.mataPelajaran,
      kelompok: item.kelompok,
      noUrut: item.noUrut,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setMapping(mapping.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.mataPelajaran || !formData.kelompok || formData.noUrut === '') {
      alert('Semua field harus diisi!');
      return;
    }
    const noUrutNumber = Number(formData.noUrut);
    if (isNaN(noUrutNumber) || !Number.isInteger(noUrutNumber) || noUrutNumber < 0) {
      alert('Nomor urut harus berupa angka positif!');
      return;
    }
    const newData = {
      mataPelajaran: formData.mataPelajaran,
      kelompok: formData.kelompok,
      noUrut: noUrutNumber,
    };
    if (editMode) {
      setMapping(mapping.map(item =>
        item.id === currentId ? { ...item, ...newData } : item
      ));
    } else {
      setMapping([...mapping, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
    setFormData({ mataPelajaran: '', kelompok: 'Kelompok A', noUrut: '' });
  };

  return (
    <div className="mapping-container">
      <div className="mapping-header">
        <h2>Mapping Mata Pelajaran</h2>
        <button className="btn-add" onClick={handleAdd}>
          <FaPlus /> Tambah Mapping
        </button>
      </div>

      <div className="table-wrapper">
        <table className="mapping-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Mata Pelajaran</th>
              <th>Kelompok</th>
              <th>No Urut Raport</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mapping.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.mataPelajaran}</td>
                <td>{item.kelompok}</td>
                <td>{item.noUrut}</td>
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

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>{editMode ? 'Edit Mapping' : 'Tambah Mapping'}</h3>
            <div className="modal-field">
              <label>Mata Pelajaran</label>
              <input
                type="text"
                value={formData.mataPelajaran}
                onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label>Kelompok</label>
              <select
                value={formData.kelompok}
                onChange={(e) => setFormData({ ...formData, kelompok: e.target.value })}
              >
                {kelompokOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="modal-field">
              <label>No Urut Raport</label>
              <input
                type="number"
                value={formData.noUrut}
                onChange={(e) => setFormData({ ...formData, noUrut: e.target.value })}
                placeholder="Masukkan angka"
                min="0"
                step="1"
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

export default MappingMapel;