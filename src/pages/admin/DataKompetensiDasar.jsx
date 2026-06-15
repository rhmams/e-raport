import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import './DataKompetensiDasar.css';

const DataKompetensiDasar = () => {
  const [data, setData] = useState([
    { id: 1, mataPelajaran: 'Pop', kompetensi: 'Keterampilan', tingkatKelas: '9', semester: 'Genap', kode: 'pop', kompetensiDasar: 'pembuatan lirik lagu' },
    { id: 2, mataPelajaran: 'Matematika', kompetensi: 'Pengetahuan', tingkatKelas: '10', semester: 'Ganjil', kode: 'MAT-3.1', kompetensiDasar: 'Menjelaskan fungsi kuadrat' },
    { id: 3, mataPelajaran: 'Bahasa Inggris', kompetensi: 'Keterampilan', tingkatKelas: '11', semester: 'Genap', kode: 'ING-4.2', kompetensiDasar: 'Menyusun teks deskriptif' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    mataPelajaran: '',
    kompetensi: 'Pengetahuan',
    tingkatKelas: '',
    semester: 'Ganjil',
    kode: '',
    kompetensiDasar: ''
  });

  const kompetensiOptions = ['Pengetahuan', 'Keterampilan'];
  const semesterOptions = ['Ganjil', 'Genap'];

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ mataPelajaran: '', kompetensi: 'Pengetahuan', tingkatKelas: '', semester: 'Ganjil', kode: '', kompetensiDasar: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      mataPelajaran: item.mataPelajaran,
      kompetensi: item.kompetensi,
      tingkatKelas: item.tingkatKelas,
      semester: item.semester,
      kode: item.kode,
      kompetensiDasar: item.kompetensiDasar
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.mataPelajaran || !formData.kompetensi || !formData.tingkatKelas || !formData.semester || !formData.kode || !formData.kompetensiDasar) {
      alert('Semua field harus diisi!');
      return;
    }
    const newData = {
      mataPelajaran: formData.mataPelajaran,
      kompetensi: formData.kompetensi,
      tingkatKelas: formData.tingkatKelas,
      semester: formData.semester,
      kode: formData.kode,
      kompetensiDasar: formData.kompetensiDasar
    };
    if (editMode) {
      setData(data.map(item => item.id === currentId ? { ...item, ...newData } : item));
    } else {
      setData([...data, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
    setFormData({ mataPelajaran: '', kompetensi: 'Pengetahuan', tingkatKelas: '', semester: 'Ganjil', kode: '', kompetensiDasar: '' });
  };

  return (
    <div className="kompetensi-container">
      <div className="kompetensi-header">
        <h2>Data Kompetensi Dasar</h2>
        <button className="btn-add" onClick={handleAdd}>
          <FaPlus /> Tambah KD
        </button>
      </div>

      <div className="table-wrapper">
        <table className="kompetensi-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Mata Pelajaran</th>
              <th>Kompetensi</th>
              <th>Tingkatan Kelas</th>
              <th>Semester</th>
              <th>Kode</th>
              <th>Kompetensi Dasar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.mataPelajaran}</td>
                <td>{item.kompetensi}</td>
                <td>{item.tingkatKelas}</td>
                <td>{item.semester}</td>
                <td>{item.kode}</td>
                <td>{item.kompetensiDasar}</td>
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
            <h3>{editMode ? 'Edit Kompetensi Dasar' : 'Tambah Kompetensi Dasar'}</h3>
            <div className="modal-field">
              <label>Mata Pelajaran</label>
              <input type="text" value={formData.mataPelajaran} onChange={(e) => setFormData({...formData, mataPelajaran: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Kompetensi</label>
              <select value={formData.kompetensi} onChange={(e) => setFormData({...formData, kompetensi: e.target.value})}>
                {kompetensiOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Tingkatan Kelas</label>
              <input type="text" value={formData.tingkatKelas} onChange={(e) => setFormData({...formData, tingkatKelas: e.target.value})} placeholder="Contoh: 10, 11, 12" />
            </div>
            <div className="modal-field">
              <label>Semester</label>
              <select value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}>
                {semesterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Kode</label>
              <input type="text" value={formData.kode} onChange={(e) => setFormData({...formData, kode: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Kompetensi Dasar</label>
              <textarea rows="3" value={formData.kompetensiDasar} onChange={(e) => setFormData({...formData, kompetensiDasar: e.target.value})} />
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

export default DataKompetensiDasar;