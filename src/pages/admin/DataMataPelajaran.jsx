import React, { useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import './DataMataPelajaran.css';

const DataMataPelajaran = () => {
  const [mataPelajaran, setMataPelajaran] = useState([
    { id: 1, kode: 'MAT-01', nama: 'Matematika', kelompok: 'A' },
    { id: 2, kode: 'BIO-01', nama: 'Biologi', kelompok: 'A' },
    { id: 3, kode: 'FIS-01', nama: 'Fisika', kelompok: 'A' },
    { id: 4, kode: 'KIM-01', nama: 'Kimia', kelompok: 'A' },
    { id: 5, kode: 'ING-01', nama: 'Bahasa Inggris', kelompok: 'B' },
    { id: 6, kode: 'ARB-01', nama: 'Bahasa Arab', kelompok: 'B' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ kode: '', nama: '', kelompok: 'A' });

  const handleAdd = () => {
    if (formData.kode && formData.nama) {
      setMataPelajaran([...mataPelajaran, { id: Date.now(), ...formData }]);
      setFormData({ kode: '', nama: '', kelompok: 'A' });
      setShowModal(false);
    } else {
      alert('Kode dan Nama mata pelajaran harus diisi!');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
      setMataPelajaran(mataPelajaran.filter(item => item.id !== id));
    }
  };

  return (
    <div className="data-mata-pelajaran-container">
      <div className="data-mata-pelajaran-header">
        <h2>Data Mata Pelajaran</h2>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <FaPlus /> Tambah Mata Pelajaran
        </button>
      </div>
      <div className="table-wrapper">
        <table className="data-mata-pelajaran-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode</th>
              <th>Nama Mata Pelajaran</th>
              <th>Kelompok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mataPelajaran.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.kelompok}</td>
                <td>
                  <div className="action-icons">
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
            <h3>Tambah Mata Pelajaran</h3>
            <div className="modal-field">
              <label>Kode Mata Pelajaran</label>
              <input type="text" value={formData.kode} onChange={(e) => setFormData({...formData, kode: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Nama Mata Pelajaran</label>
              <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Kelompok</label>
              <select value={formData.kelompok} onChange={(e) => setFormData({...formData, kelompok: e.target.value})}>
                <option value="A">A (Umum)</option>
                <option value="B">B (Keagamaan)</option>
                <option value="C">C (Keterampilan)</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Batal</button>
              <button onClick={handleAdd}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataMataPelajaran;