// src/pages/admin/DetailKokurikuler.jsx
import React, { useState } from 'react';
import './DetailKokurikuler.css';
import { FaSave, FaTimes, FaUser, FaUsers, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';

const DetailKokurikuler = ({ kokurikuler, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(kokurikuler || {
    namaKelas: '',
    jumlahSiswa: '',
    tingkat: '',
    jurusan: '',
    koordinator: ''
  });

  if (!kokurikuler) {
    return (
      <div className="detail-kokurikuler-container">
        <div className="detail-kokurikuler-header">
          <button className="btn-back" onClick={onBack}>
            ←
          </button>
          <div className="header-title">
            <h2>Detail Kokurikuler</h2>
            <p>Data kokurikuler tidak ditemukan</p>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsEditing(false);
    alert('Data kokurikuler berhasil diupdate!');
  };

  const tingkatOptions = ['VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const jurusanOptions = ['Umum', 'IPA', 'IPS', 'Bahasa', 'Agama'];

  return (
    <div className="detail-kokurikuler-container">
      <div className="detail-kokurikuler-header">
        <button className="btn-back" onClick={onBack} title="Kembali">
          ←
        </button>
        <div className="header-title">
          <h2>Detail Kokurikuler</h2>
          <p>Edit data kelas kokurikuler</p>
        </div>
        {!isEditing ? (
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit Data
          </button>
        ) : (
          <div className="action-buttons">
            <button className="btn-cancel" onClick={() => {
              setIsEditing(false);
              setFormData(kokurikuler);
            }}>
              <FaTimes /> Batal
            </button>
            <button className="btn-save" onClick={handleSave}>
              <FaSave /> Simpan Perubahan
            </button>
          </div>
        )}
      </div>

      <div className="detail-card">
        <div className="detail-icon-header">
          <div className="icon-circle">
            <FaBookOpen />
          </div>
          <h3>Informasi Kelas Kokurikuler</h3>
        </div>

        <div className="detail-form">
          <div className="form-group">
            <label>
              <FaUser className="form-icon" />
              Nama Kelas
            </label>
            {isEditing ? (
              <input
                type="text"
                name="namaKelas"
                value={formData.namaKelas}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Masukkan nama kelas"
              />
            ) : (
              <div className="form-value">{kokurikuler.namaKelas}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaUsers className="form-icon" />
                Jumlah Siswa
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="jumlahSiswa"
                  value={formData.jumlahSiswa}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Jumlah siswa"
                />
              ) : (
                <div className="form-value">{kokurikuler.jumlahSiswa} Siswa</div>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaBookOpen className="form-icon" />
                Tingkat
              </label>
              {isEditing ? (
                <select
                  name="tingkat"
                  value={formData.tingkat}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  {tingkatOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <div className="form-value">{kokurikuler.tingkat}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaBookOpen className="form-icon" />
                Jurusan
              </label>
              {isEditing ? (
                <select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  {jurusanOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <div className="form-value">{kokurikuler.jurusan}</div>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaChalkboardTeacher className="form-icon" />
                Koordinator
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="koordinator"
                  value={formData.koordinator}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Nama koordinator"
                />
              ) : (
                <div className="form-value">{kokurikuler.koordinator || '-'}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKokurikuler;