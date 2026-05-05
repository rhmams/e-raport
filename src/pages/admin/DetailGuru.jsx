// src/pages/admin/DetailGuru.jsx
import React, { useState } from 'react';
import './DetailGuru.css';
import { 
  FaUserTie, FaEnvelope, FaPhone, FaBook, 
  FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaClock, 
  FaGraduationCap, FaEdit, FaSave, FaTimes, FaTrash 
} from 'react-icons/fa';

const DetailGuru = ({ guru, onBack, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGuru, setEditedGuru] = useState(guru);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Reset form saat batal edit
  const handleCancelEdit = () => {
    setEditedGuru(guru);
    setIsEditing(false);
  };

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGuru(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle simpan perubahan
  const handleSaveEdit = () => {
    if (onUpdate) {
      onUpdate(editedGuru);
    }
    setIsEditing(false);
  };

  // Handle hapus guru
  const handleDelete = () => {
    if (onDelete) {
      onDelete(guru.id);
    }
    setShowDeleteConfirm(false);
  };

  if (!guru) {
    return (
      <div className="detail-guru-container">
        <div className="detail-guru-header">
          <button className="btn-back" onClick={onBack}>
            ←
          </button>
          <div className="header-title">
            <h2>Detail Guru</h2>
            <p>Data guru tidak ditemukan</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-guru-container">
      {/* Header dengan tombol aksi */}
      <div className="detail-guru-header">
        <button className="btn-back" onClick={onBack} title="Kembali">
          ←
        </button>
        <div className="header-title">
          <h2>Detail Guru</h2>
          <p>Informasi lengkap data guru dan tenaga pendidik</p>
        </div>
        {!isEditing && (
          <div className="header-actions">
            <button className="btn-edit" onClick={() => setIsEditing(true)} title="Edit Data">
              <FaEdit /> Edit
            </button>
            <button className="btn-delete" onClick={() => setShowDeleteConfirm(true)} title="Hapus Guru">
              <FaTrash /> Hapus
            </button>
          </div>
        )}
        {isEditing && (
          <div className="header-actions">
            <button className="btn-save" onClick={handleSaveEdit} title="Simpan Perubahan">
              <FaSave /> Simpan
            </button>
            <button className="btn-cancel" onClick={handleCancelEdit} title="Batal">
              <FaTimes /> Batal
            </button>
          </div>
        )}
      </div>

      {/* Info Card Ringkasan */}
      <div className="info-cards">
        <div className="info-card">
          <div className="info-icon"><FaIdCard /></div>
          <div className="info-content">
            <span className="info-label">NIP</span>
            <span className="info-value">
              {isEditing ? (
                <input
                  type="text"
                  name="nip"
                  value={editedGuru.nip}
                  onChange={handleInputChange}
                  className="edit-input-small"
                />
              ) : (
                guru.nip
              )}
            </span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaUserTie /></div>
          <div className="info-content">
            <span className="info-label">Nama Guru</span>
            <span className="info-value">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedGuru.name}
                  onChange={handleInputChange}
                  className="edit-input-small"
                />
              ) : (
                guru.name
              )}
            </span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaBook /></div>
          <div className="info-content">
            <span className="info-label">Mata Pelajaran</span>
            <span className="info-value">
              {isEditing ? (
                <input
                  type="text"
                  name="subject"
                  value={editedGuru.subject}
                  onChange={handleInputChange}
                  className="edit-input-small"
                />
              ) : (
                guru.subject
              )}
            </span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaGraduationCap /></div>
          <div className="info-content">
            <span className="info-label">Status</span>
            <span className={`status-badge status-${guru.status?.toLowerCase() || 'aktif'}`}>
              {isEditing ? (
                <select
                  name="status"
                  value={editedGuru.status}
                  onChange={handleInputChange}
                  className="edit-select-small"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                  <option value="Cuti">Cuti</option>
                </select>
              ) : (
                guru.status
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Informasi Card */}
      <div className="detail-guru-card">
        <div className="card-header">
          <h3><FaUserTie /> Informasi Lengkap Guru</h3>
        </div>

        <div className="detail-form">
          <div className="detail-form-row">
            <div className="detail-form-group">
              <label>NIP</label>
              <div className="view-mode">
                {isEditing ? (
                  <input
                    type="text"
                    name="nip"
                    value={editedGuru.nip}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{guru.nip}</span>
                )}
              </div>
            </div>
            <div className="detail-form-group">
              <label>Nama Lengkap</label>
              <div className="view-mode">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedGuru.name}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{guru.name}</span>
                )}
              </div>
            </div>
          </div>

          <div className="detail-form-row">
            <div className="detail-form-group">
              <label>Mata Pelajaran</label>
              <div className="view-mode">
                {isEditing ? (
                  <input
                    type="text"
                    name="subject"
                    value={editedGuru.subject}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{guru.subject}</span>
                )}
              </div>
            </div>
            <div className="detail-form-group">
              <label>Status</label>
              <div className="view-mode">
                {isEditing ? (
                  <select
                    name="status"
                    value={editedGuru.status}
                    onChange={handleInputChange}
                    className="edit-select"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                    <option value="Cuti">Cuti</option>
                  </select>
                ) : (
                  <span className={`status-badge status-${guru.status?.toLowerCase() || 'aktif'}`}>
                    {guru.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="detail-form-row">
            <div className="detail-form-group">
              <label><FaEnvelope /> Email</label>
              <div className="view-mode">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedGuru.email}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{guru.email}</span>
                )}
              </div>
            </div>
            <div className="detail-form-group">
              <label><FaPhone /> Telepon</label>
              <div className="view-mode">
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedGuru.phone}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{guru.phone}</span>
                )}
              </div>
            </div>
          </div>

          {/* Field tambahan yang bisa diedit */}
          {isEditing && (
            <div className="detail-form-row">
              <div className="detail-form-group">
                <label><FaCalendarAlt /> TMT Mulai Bertugas</label>
                <input
                  type="date"
                  name="startDate"
                  value={editedGuru.startDate || ''}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-form-group">
                <label><FaGraduationCap /> Pendidikan Terakhir</label>
                <input
                  type="text"
                  name="education"
                  value={editedGuru.education || ''}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="detail-section">
        <div className="section-header">
          <h3><FaCalendarAlt /> Informasi Tambahan</h3>
        </div>
        <div className="additional-grid">
          <div className="additional-item">
            <div className="additional-icon"><FaCalendarAlt /></div>
            <div className="additional-content">
              <span className="additional-label">TMT Mulai Bertugas</span>
              <span className="additional-value">
                {isEditing ? (
                  <input
                    type="date"
                    name="startDate"
                    value={editedGuru.startDate || '2020-01-01'}
                    onChange={handleInputChange}
                    className="edit-input-small"
                  />
                ) : (
                  editedGuru.startDate || '1 Januari 2020'
                )}
              </span>
            </div>
          </div>
          <div className="additional-item">
            <div className="additional-icon"><FaMapMarkerAlt /></div>
            <div className="additional-content">
              <span className="additional-label">Alamat</span>
              <span className="additional-value">
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editedGuru.address || ''}
                    onChange={handleInputChange}
                    className="edit-textarea"
                    rows="2"
                  />
                ) : (
                  editedGuru.address || 'Jl. Pendidikan No. 123, Kota Santri'
                )}
              </span>
            </div>
          </div>
          <div className="additional-item">
            <div className="additional-icon"><FaClock /></div>
            <div className="additional-content">
              <span className="additional-label">Jam Mengajar per Minggu</span>
              <span className="additional-value">
                {isEditing ? (
                  <input
                    type="number"
                    name="teachingHours"
                    value={editedGuru.teachingHours || 24}
                    onChange={handleInputChange}
                    className="edit-input-small"
                  />
                ) : (
                  `${editedGuru.teachingHours || 24} Jam`
                )}
              </span>
            </div>
          </div>
          <div className="additional-item">
            <div className="additional-icon"><FaGraduationCap /></div>
            <div className="additional-content">
              <span className="additional-label">Pendidikan Terakhir</span>
              <span className="additional-value">
                {isEditing ? (
                  <input
                    type="text"
                    name="education"
                    value={editedGuru.education || ''}
                    onChange={handleInputChange}
                    className="edit-input-small"
                  />
                ) : (
                  editedGuru.education || 'S2 Pendidikan'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-confirm">
            <div className="modal-header">
              <h3>Konfirmasi Hapus</h3>
              <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p>Apakah Anda yakin ingin menghapus data guru <strong>{guru.name}</strong>?</p>
              <p>Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel-modal" onClick={() => setShowDeleteConfirm(false)}>
                Batal
              </button>
              <button className="btn-confirm-delete" onClick={handleDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailGuru;