// src/pages/admin/ProfilAdmin.jsx
import React, { useState, useRef } from 'react';
import './ProfilAdmin.css';
import { 
  FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCamera,
  FaLock, FaBell, FaGlobe, FaIdCard, FaUserGraduate,
  FaVenusMars, FaBuilding, FaClock, FaUserCheck, FaUser
} from 'react-icons/fa';

const ProfilAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profile, setProfile] = useState({
    id: 'ADM001',
    username: 'admin',
    email: 'admin@madinah.edu.id',
    phone: '081234567890',
    address: 'Jl. Pendidikan No. 123, Kota Santri, Indonesia',
    fullName: 'Admin Sistem',
    gender: 'Laki-laki',
    birthDate: '1990-01-15',
    birthPlace: 'Jakarta',
    joinDate: '2020-01-01',
    lastLogin: '2026-04-14 08:30:00',
    role: 'Super Administrator',
    department: 'IT & Sistem Informasi',
    avatar: null,
    bio: 'Administrator sistem E-Raport dengan pengalaman lebih dari 5 tahun di bidang manajemen pendidikan.',
    notificationEmail: true,
    notificationWhatsapp: true,
    language: 'Indonesia'
  });

  const [formData, setFormData] = useState({ ...profile });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    alert('Profil berhasil disimpan!');
  };

  const handleCancel = () => {
    setFormData(profile);
    setAvatarPreview(null);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwordForm.currentPassword) {
      alert('Masukkan password saat ini!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Password baru minimal 6 karakter!');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Konfirmasi password baru tidak sesuai!');
      return;
    }
    
    alert('Password berhasil diubah!');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="profil-admin-container">
      <div className="profil-admin-header">
        <h1>Profil Administrator</h1>
        <p>Kelola informasi profil dan pengaturan akun Anda</p>
      </div>

      <div className="profil-admin-wrapper">
        {/* Left Column - Profile Info */}
        <div className="profile-left">
          <div className="profile-avatar-container">
            <div className="avatar-wrapper">
              {avatarPreview || formData.avatar ? (
                <img src={avatarPreview || formData.avatar} alt="Avatar" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">AD</div>
              )}
              {isEditing && (
                <button className="avatar-edit-btn" onClick={handleAvatarClick}>
                  <FaCamera />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            <h3 className="profile-name">{profile.fullName}</h3>
            <p className="profile-role">{profile.role}</p>
            <p className="profile-id">ID: {profile.id}</p>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <FaUserCheck className="stat-icon" />
              <div>
                <span className="stat-label">Bergabung Sejak</span>
                <span className="stat-value">{formatDate(profile.joinDate)}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaClock className="stat-icon" />
              <div>
                <span className="stat-label">Terakhir Login</span>
                <span className="stat-value">{profile.lastLogin}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaBuilding className="stat-icon" />
              <div>
                <span className="stat-label">Departemen</span>
                <span className="stat-value">{profile.department}</span>
              </div>
            </div>
          </div>

          {/* Informasi Akun - Dipindah ke kolom kiri */}
          <div className="info-card-small">
            <h4 className="card-title-small">
              <FaIdCard className="card-icon" />
              Informasi Akun
            </h4>
            <div className="info-list">
              <div className="info-list-item">
                <span className="info-list-label">Username</span>
                <span className="info-list-value">{profile.username}</span>
              </div>
              <div className="info-list-item">
                <span className="info-list-label">Role</span>
                {isEditing ? (
                  <input type="text" name="role" value={formData.role} onChange={handleInputChange} className="info-list-input" />
                ) : (
                  <span className="info-list-value">{profile.role}</span>
                )}
              </div>
            </div>
          </div>

          {/* Pengaturan Notifikasi - Dipindah ke kolom kiri */}
          <div className="info-card-small">
            <h4 className="card-title-small">
              <FaBell className="card-icon" />
              Pengaturan Notifikasi
            </h4>
            <div className="settings-list-small">
              <div className="setting-item-small">
                <span>Notifikasi Email</span>
                {isEditing ? (
                  <label className="switch-small">
                    <input type="checkbox" name="notificationEmail" checked={formData.notificationEmail} onChange={handleInputChange} />
                    <span className="slider-small"></span>
                  </label>
                ) : (
                  <span className={`setting-badge-small ${profile.notificationEmail ? 'active' : 'inactive'}`}>
                    {profile.notificationEmail ? 'Aktif' : 'Nonaktif'}
                  </span>
                )}
              </div>
              <div className="setting-item-small">
                <span>Notifikasi WhatsApp</span>
                {isEditing ? (
                  <label className="switch-small">
                    <input type="checkbox" name="notificationWhatsapp" checked={formData.notificationWhatsapp} onChange={handleInputChange} />
                    <span className="slider-small"></span>
                  </label>
                ) : (
                  <span className={`setting-badge-small ${profile.notificationWhatsapp ? 'active' : 'inactive'}`}>
                    {profile.notificationWhatsapp ? 'Aktif' : 'Nonaktif'}
                  </span>
                )}
              </div>
              <div className="setting-item-small">
                <span>Bahasa</span>
                {isEditing ? (
                  <select name="language" value={formData.language} onChange={handleInputChange} className="language-select-small">
                    <option value="Indonesia">Indonesia</option>
                    <option value="English">English</option>
                  </select>
                ) : (
                  <span className="info-list-value">{profile.language}</span>
                )}
              </div>
            </div>
          </div>

          <button className="btn-change-password" onClick={() => setShowPasswordModal(true)}>
            <FaLock /> Ganti Password
          </button>
        </div>

        {/* Right Column - Form Informasi Pribadi dan Kontak */}
        <div className="profile-right">
          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Profil
              </button>
            ) : (
              <div className="action-buttons">
                <button className="btn-cancel" onClick={handleCancel}>
                  <FaTimes /> Batal
                </button>
                <button className="btn-save" onClick={handleSave}>
                  <FaSave /> Simpan
                </button>
              </div>
            )}
          </div>

          {/* Informasi Pribadi */}
          <div className="info-card">
            <h4 className="card-title">
              <FaUserGraduate className="card-icon" />
              Informasi Pribadi
            </h4>
            <div className="info-grid">
              <div className="info-row">
                <div className="info-label">Nama Lengkap</div>
                {isEditing ? (
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="info-input" />
                ) : (
                  <div className="info-value">{profile.fullName}</div>
                )}
              </div>
              <div className="info-row">
                <div className="info-label">Jenis Kelamin</div>
                {isEditing ? (
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="info-input">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                ) : (
                  <div className="info-value">{profile.gender}</div>
                )}
              </div>
              <div className="info-row">
                <div className="info-label">Tempat Lahir</div>
                {isEditing ? (
                  <input type="text" name="birthPlace" value={formData.birthPlace} onChange={handleInputChange} className="info-input" />
                ) : (
                  <div className="info-value">{profile.birthPlace}</div>
                )}
              </div>
              <div className="info-row">
                <div className="info-label">Tanggal Lahir</div>
                {isEditing ? (
                  <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className="info-input" />
                ) : (
                  <div className="info-value">{formatDate(profile.birthDate)}</div>
                )}
              </div>
            </div>
          </div>

          {/* Informasi Kontak */}
          <div className="info-card">
            <h4 className="card-title">
              <FaEnvelope className="card-icon" />
              Informasi Kontak
            </h4>
            <div className="info-grid">
              <div className="info-row">
                <div className="info-label">Email</div>
                {isEditing ? (
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="info-input" />
                ) : (
                  <div className="info-value">{profile.email}</div>
                )}
              </div>
              <div className="info-row">
                <div className="info-label">Nomor Telepon</div>
                {isEditing ? (
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="info-input" />
                ) : (
                  <div className="info-value">{profile.phone}</div>
                )}
              </div>
              <div className="info-row full-width">
                <div className="info-label">Alamat</div>
                {isEditing ? (
                  <textarea name="address" value={formData.address} onChange={handleInputChange} className="info-input" rows="3" />
                ) : (
                  <div className="info-value">{profile.address}</div>
                )}
              </div>
              <div className="info-row full-width">
                <div className="info-label">Bio</div>
                {isEditing ? (
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="info-input" rows="4" />
                ) : (
                  <div className="info-value bio-value">{profile.bio}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ganti Password */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowPasswordModal(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Ganti Password</h3>
                <p>Masukkan password baru untuk akun Anda</p>
              </div>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-form-group">
                <label>Password Saat Ini</label>
                <input type="password" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} className="form-control" placeholder="Masukkan password saat ini" />
              </div>
              <div className="modal-form-group">
                <label>Password Baru</label>
                <input type="password" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} className="form-control" placeholder="Minimal 6 karakter" />
              </div>
              <div className="modal-form-group">
                <label>Konfirmasi Password Baru</label>
                <input type="password" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} className="form-control" placeholder="Ketik ulang password baru" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-batal" onClick={() => setShowPasswordModal(false)}>Batal</button>
              <button className="btn-simpan" onClick={handleChangePassword}><FaLock /> Ganti Password</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilAdmin;