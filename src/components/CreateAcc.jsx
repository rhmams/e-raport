import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAcc.css';

const CreateAcc = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    nip: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    subject: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Account creation attempted:', formData);
    // Here you would typically send data to backend
    alert('Akun berhasil dibuat! Silakan login.');
    navigate('/login');
  };

  return (
    <div className="create-acc-container">
      <div className="create-acc-wrapper">
        {/* Left side - Image */}
        <div className="create-acc-left">
          <img 
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop" 
            alt="Pondok Pesantren" 
            className="create-acc-image"
          />
        </div>

        {/* Right side - Registration Form */}
        <div className="create-acc-right">
          <div className="create-acc-card">
            <div className="create-acc-header">
              <div className="logo-container">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                  alt="Logo Pondok Pesantren" 
                  className="logo-ponpes"
                />
              </div>
              <h1 className="raport-title">RAPORT DIGITAL</h1>
              <h2 className="pesantren-title">Pondok Pesantren</h2>
              <h3 className="pesantren-subtitle">Madinah El-Quds</h3>
              <p className="create-acc-welcome">Pendaftaran Akun Guru Baru</p>
            </div>

            <form onSubmit={handleSubmit} className="create-acc-form">
              <div className="form-group">
                <label htmlFor="fullName">NAMA LENGKAP</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="nip">NIP/NUPTK</label>
                  <input
                    type="text"
                    id="nip"
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="NIP atau NUPTK"
                    required
                  />
                </div>

                <div className="form-group half">
                  <label htmlFor="phone">NO. TELP</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nomor telepon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Masukkan email aktif"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">USERNAME</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Buat username"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Min. 8 karakter"
                    required
                  />
                </div>

                <div className="form-group half">
                  <label htmlFor="confirmPassword">KONFIRMASI</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ulangi password"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">MATA PELAJARAN</label>
                <select 
                  className="form-select" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Pilih Mata Pelajaran</option>
                  <option>Matematika</option>
                  <option>Bahasa Indonesia</option>
                  <option>Bahasa Inggris</option>
                  <option>IPA</option>
                  <option>IPS</option>
                  <option>Pendidikan Agama Islam</option>
                  <option>Tahfidz Qur'an</option>
                  <option>Bahasa Arab</option>
                  <option>Fiqih</option>
                  <option>Aqidah Akhlak</option>
                  <option>Sejarah Kebudayaan Islam</option>
                  <option>Qur'an Hadits</option>
                </select>
              </div>

              <div className="terms-text">
                Dengan mendaftar, Anda menyetujui{' '}
                <a href="/terms">Syarat & Ketentuan</a> yang berlaku
              </div>

              <button type="submit" className="create-acc-button">
                DAFTAR SEKARANG
              </button>

              <div className="login-link-section">
                <p>Sudah memiliki akun?</p>
                <Link to="/login" className="login-link-button">
                  LOGIN
                </Link>
              </div>

              {/* Info panel */}
              <div className="info-panel">
                <i>INFO</i> Data guru akan diverifikasi oleh admin sebelum dapat mengakses sistem
              </div>
            </form>

            <div className="create-acc-footer">
              <p className="version-text">Pondok Pesantren Madinah El-Quds © 2024 | v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAcc;