// src/pages/admin/DetailEkstrakurikuler.jsx
import React, { useState } from 'react';
import './DetailEkstrakurikuler.css';
import { FaSave, FaTimes, FaCalendarAlt, FaUsers, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';

const DetailEkstrakurikuler = ({ ekstrakurikuler, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(ekstrakurikuler || {
    nama: '',
    pembina: '',
    jadwal: '',
    jumlahPeserta: '',
    tingkat: ''
  });

  if (!ekstrakurikuler) {
    return (
      <div className="detail-ekstrakurikuler-container">
        <div className="detail-ekstrakurikuler-header">
          <button className="btn-back" onClick={onBack}>
            ←
          </button>
          <div className="header-title">
            <h2>Detail Ekstrakurikuler</h2>
            <p>Data ekstrakurikuler tidak ditemukan</p>
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
    alert('Data ekstrakurikuler berhasil diupdate!');
  };

  const tingkatOptions = ['VII–IX', 'VIII–X', 'IX–XII', 'VII–XII', 'X–XII'];

  return (
    <div className="detail-ekstrakurikuler-container">
      <div className="detail-ekstrakurikuler-header">
        <button className="btn-back" onClick={onBack} title="Kembali">
          ←
        </button>
        <div className="header-title">
          <h2>Detail Ekstrakurikuler</h2>
          <p>Edit data ekstrakurikuler</p>
        </div>
        {!isEditing ? (
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit Data
          </button>
        ) : (
          <div className="action-buttons">
            <button className="btn-cancel" onClick={() => {
              setIsEditing(false);
              setFormData(ekstrakurikuler);
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
          <h3>Informasi Ekstrakurikuler</h3>
        </div>

        <div className="detail-form">
          <div className="form-group">
            <label>
              <FaChalkboardTeacher className="form-icon" />
              Nama Ekstrakurikuler
            </label>
            {isEditing ? (
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Masukkan nama ekstrakurikuler"
              />
            ) : (
              <div className="form-value">{ekstrakurikuler.nama}</div>
            )}
          </div>

          <div className="form-group">
            <label>
              <FaChalkboardTeacher className="form-icon" />
              Pembina
            </label>
            {isEditing ? (
              <input
                type="text"
                name="pembina"
                value={formData.pembina}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Masukkan nama pembina"
              />
            ) : (
              <div className="form-value">{ekstrakurikuler.pembina}</div>
            )}
          </div>

          <div className="form-group">
            <label>
              <FaCalendarAlt className="form-icon" />
              Jadwal
            </label>
            {isEditing ? (
              <input
                type="text"
                name="jadwal"
                value={formData.jadwal}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Contoh: Jumat, 14.00–16.00"
              />
            ) : (
              <div className="form-value">{ekstrakurikuler.jadwal}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaUsers className="form-icon" />
                Jumlah Peserta
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="jumlahPeserta"
                  value={formData.jumlahPeserta}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Jumlah peserta"
                />
              ) : (
                <div className="form-value">{ekstrakurikuler.jumlahPeserta} Peserta</div>
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
                <div className="form-value">{ekstrakurikuler.tingkat}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEkstrakurikuler;