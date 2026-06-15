import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './DataTahunPelajaran.css';

const DataTahunPelajaran = () => {
  const [tahunPelajaran, setTahunPelajaran] = useState([
    { id: 1, tahun: '2024/2025', semester: 'Ganjil', status: 'Aktif', tanggalMulai: '2024-07-15', tanggalSelesai: '2025-06-30' },
    { id: 2, tahun: '2023/2024', semester: 'Genap', status: 'Selesai', tanggalMulai: '2023-07-10', tanggalSelesai: '2024-06-25' },
    { id: 3, tahun: '2023/2024', semester: 'Ganjil', status: 'Selesai', tanggalMulai: '2023-07-10', tanggalSelesai: '2023-12-20' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ tahun: '', semester: 'Ganjil', tanggalMulai: '', tanggalSelesai: '' });

  const handleAdd = () => {
    if (formData.tahun && formData.tanggalMulai && formData.tanggalSelesai) {
      setTahunPelajaran([...tahunPelajaran, { 
        id: Date.now(), 
        ...formData, 
        status: 'Aktif' 
      }]);
      setFormData({ tahun: '', semester: 'Ganjil', tanggalMulai: '', tanggalSelesai: '' });
      setShowModal(false);
    } else {
      alert('Semua field harus diisi!');
    }
  };

  const setActive = (id) => {
    setTahunPelajaran(tahunPelajaran.map(item => ({
      ...item,
      status: item.id === id ? 'Aktif' : 'Selesai'
    })));
  };

  return (
    <div className="data-tahun-pelajaran-container">
      <div className="data-tahun-pelajaran-header">
        <h2>Data Tahun Pelajaran</h2>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <FaPlus /> Tambah Tahun Pelajaran
        </button>
      </div>
      <div className="table-wrapper">
        <table className="data-tahun-pelajaran-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Tahun Pelajaran</th>
              <th>Semester</th>
              <th>Status</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tahunPelajaran.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.tahun}</td>
                <td>{item.semester}</td>
                <td>
                  <span className={`status-badge ${item.status === 'Aktif' ? 'status-active' : 'status-inactive'}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.tanggalMulai}</td>
                <td>{item.tanggalSelesai}</td>
                <td>
                  {item.status !== 'Aktif' && (
                    <button className="btn-set-active" onClick={() => setActive(item.id)}>
                      Set Aktif
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>Tambah Tahun Pelajaran</h3>
            <div className="modal-field">
              <label>Tahun Pelajaran (contoh: 2025/2026)</label>
              <input type="text" value={formData.tahun} onChange={(e) => setFormData({...formData, tahun: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Semester</label>
              <select value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}>
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Tanggal Mulai</label>
              <input type="date" value={formData.tanggalMulai} onChange={(e) => setFormData({...formData, tanggalMulai: e.target.value})} />
            </div>
            <div className="modal-field">
              <label>Tanggal Selesai</label>
              <input type="date" value={formData.tanggalSelesai} onChange={(e) => setFormData({...formData, tanggalSelesai: e.target.value})} />
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

export default DataTahunPelajaran;