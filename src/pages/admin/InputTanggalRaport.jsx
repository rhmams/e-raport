// src/pages/admin/InputTanggalRaport.jsx
import React, { useState, useEffect } from 'react';
import './InputTanggalRaport.css';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes, FaCalendarAlt } from 'react-icons/fa';

const InputTanggalRaport = () => {
  const [tanggalList, setTanggalList] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    tahunAjaran: '',
    semester: 'Ganjil',
    tanggalRaport: '',
    keterangan: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('tanggal_raport_data');
    if (storedData) {
      setTanggalList(JSON.parse(storedData));
    } else {
      // Demo data
      const demoData = [
        {
          id: 1,
          tahunAjaran: '2025/2026',
          semester: 'Ganjil',
          tanggalRaport: '2025-12-20',
          keterangan: 'Rapor Semester Ganjil'
        },
        {
          id: 2,
          tahunAjaran: '2025/2026',
          semester: 'Genap',
          tanggalRaport: '2026-06-15',
          keterangan: 'Rapor Semester Genap'
        }
      ];
      setTanggalList(demoData);
      localStorage.setItem('tanggal_raport_data', JSON.stringify(demoData));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (tanggalList.length > 0) {
      localStorage.setItem('tanggal_raport_data', JSON.stringify(tanggalList));
    }
  }, [tanggalList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      tahunAjaran: '',
      semester: 'Ganjil',
      tanggalRaport: '',
      keterangan: ''
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tahunAjaran || !formData.tanggalRaport) {
      alert('Tahun Ajaran dan Tanggal Raport wajib diisi!');
      return;
    }

    if (isEditing) {
      // Update existing
      setTanggalList(prev =>
        prev.map(item => (item.id === formData.id ? { ...formData } : item))
      );
      alert('Data berhasil diperbarui!');
    } else {
      // Add new
      const newId = tanggalList.length > 0 ? Math.max(...tanggalList.map(i => i.id)) + 1 : 1;
      setTanggalList(prev => [...prev, { ...formData, id: newId }]);
      alert('Data berhasil ditambahkan!');
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      tahunAjaran: item.tahunAjaran,
      semester: item.semester,
      tanggalRaport: item.tanggalRaport,
      keterangan: item.keterangan || ''
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data tanggal rapor ini?')) {
      setTanggalList(prev => prev.filter(item => item.id !== id));
      if (isEditing && formData.id === id) resetForm();
      alert('Data berhasil dihapus!');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="tanggal-raport-container">
      <div className="tanggal-raport-header">
        <h2>
          <FaCalendarAlt className="header-icon" />
          Pengaturan Tanggal Raport
        </h2>
        <p>Kelola tanggal penerbitan rapor untuk setiap tahun ajaran dan semester.</p>
      </div>

      <div className="tanggal-raport-content">
        {/* Form Section */}
        <div className="form-card">
          <h3>{isEditing ? 'Edit Tanggal Raport' : 'Tambah Tanggal Raport Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Tahun Ajaran <span className="required">*</span></label>
                <input
                  type="text"
                  name="tahunAjaran"
                  placeholder="Contoh: 2025/2026"
                  value={formData.tahunAjaran}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Semester</label>
                <select name="semester" value={formData.semester} onChange={handleChange}>
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tanggal Raport <span className="required">*</span></label>
                <input
                  type="date"
                  name="tanggalRaport"
                  value={formData.tanggalRaport}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Keterangan (Opsional)</label>
                <input
                  type="text"
                  name="keterangan"
                  placeholder="Misal: Rapor Tengah Semester"
                  value={formData.keterangan}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-save">
                <FaSave /> {isEditing ? 'Update' : 'Simpan'}
              </button>
              {isEditing && (
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  <FaTimes /> Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table List Section */}
        <div className="list-card">
          <h3>Daftar Tanggal Raport</h3>
          {tanggalList.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada data tanggal raport. Silakan tambah data baru.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="tanggal-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tahun Ajaran</th>
                    <th>Semester</th>
                    <th>Tanggal Raport</th>
                    <th>Keterangan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {tanggalList.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.tahunAjaran}</td>
                      <td>{item.semester}</td>
                      <td>
                        <span className="date-badge">
                          {formatDate(item.tanggalRaport)}
                        </span>
                      </td>
                      <td>{item.keterangan || '-'}</td>
                      <td className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(item.id)}
                          title="Hapus"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputTanggalRaport;