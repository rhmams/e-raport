import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import './IntervalPredikat.css';

const IntervalPredikat = () => {
  const [data, setData] = useState([
    { id: 1, mataPelajaran: 'Matematika', semester: 'Ganjil', kelas: 'X-1', batasC: 60, batasB: 75, batasA: 90 },
    { id: 2, mataPelajaran: 'Bahasa Indonesia', semester: 'Ganjil', kelas: 'X-1', batasC: 65, batasB: 78, batasA: 92 },
    { id: 3, mataPelajaran: 'Inggris', semester: 'Genap', kelas: 'XI-2', batasC: 70, batasB: 80, batasA: 95 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    mataPelajaran: '',
    semester: 'Ganjil',
    kelas: '',
    batasC: '',
    batasB: '',
    batasA: ''
  });

  const semesterOptions = ['Ganjil', 'Genap'];

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ mataPelajaran: '', semester: 'Ganjil', kelas: '', batasC: '', batasB: '', batasA: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      mataPelajaran: item.mataPelajaran,
      semester: item.semester,
      kelas: item.kelas,
      batasC: item.batasC,
      batasB: item.batasB,
      batasA: item.batasA
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.mataPelajaran || !formData.semester || !formData.kelas || !formData.batasC || !formData.batasB || !formData.batasA) {
      alert('Semua field harus diisi!');
      return;
    }
    const newData = {
      mataPelajaran: formData.mataPelajaran,
      semester: formData.semester,
      kelas: formData.kelas,
      batasC: parseInt(formData.batasC),
      batasB: parseInt(formData.batasB),
      batasA: parseInt(formData.batasA)
    };
    if (editMode) {
      setData(data.map(item => item.id === currentId ? { ...item, ...newData } : item));
    } else {
      setData([...data, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
    setFormData({ mataPelajaran: '', semester: 'Ganjil', kelas: '', batasC: '', batasB: '', batasA: '' });
  };

  return (
    <div className="interval-container">
      <div className="interval-header">
        <h2>Interval Predikat</h2>
        <button className="btn-add" onClick={handleAdd}>
          <FaPlus /> Tambah Interval
        </button>
      </div>

      <div className="table-wrapper">
        <table className="interval-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Mata Pelajaran</th>
              <th>Semester</th>
              <th>Kelas</th>
              <th>Batas Bawah Predikat C</th>
              <th>Batas Bawah Predikat B</th>
              <th>Batas Bawah Predikat A</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.mataPelajaran}</td>
                <td>{item.semester}</td>
                <td>{item.kelas}</td>
                <td>{item.batasC}</td>
                <td>{item.batasB}</td>
                <td>{item.batasA}</td>
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
            <h3>{editMode ? 'Edit Interval' : 'Tambah Interval'}</h3>
            <div className="modal-field">
              <label>Mata Pelajaran</label>
              <input type="text" value={formData.mataPelajaran} onChange={(e) => setFormData({...formData, mataPelajaran: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Semester</label>
              <select value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}>
                {semesterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Kelas</label>
              <input type="text" value={formData.kelas} onChange={(e) => setFormData({...formData, kelas: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Batas Bawah Predikat C</label>
              <input type="number" value={formData.batasC} onChange={(e) => setFormData({...formData, batasC: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Batas Bawah Predikat B</label>
              <input type="number" value={formData.batasB} onChange={(e) => setFormData({...formData, batasB: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Batas Bawah Predikat A</label>
              <input type="number" value={formData.batasA} onChange={(e) => setFormData({...formData, batasA: e.target.value})} />
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

export default IntervalPredikat;