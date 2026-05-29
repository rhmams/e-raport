// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [jenjang, setJenjang] = useState('SMP');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Login untuk Guru
    if (username === 'racha' && password === 'rachanun') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('role', 'guru');
      localStorage.setItem('jenjang', jenjang);
      navigate('/beranda');
      return;
    }
    
    // Login untuk Admin → diarahkan ke dashboard admin
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('jenjang', jenjang);
      navigate('/admin/dashboard');  // ✅ arahkan ke halaman admin
      return;
    }

    setError('Username atau password salah!');
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left"></div>
        <div className="login-right">
          <div className="login-card">
            <div className="login-header">
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
              <p className="login-welcome">Silakan login menggunakan akun Anda</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="username">USERNAME</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  placeholder="Masukkan username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="**********"
                  required
                />
              </div>

              <div className="form-row">
                <div className="select-group">
                  <label htmlFor="tahun" className="select-label">TAHUN PELAJARAN</label>
                  <select id="tahun" className="form-select" defaultValue="2024/2025">
                    <option>2021/2022</option>
                    <option>2022/2023</option>
                    <option>2023/2024</option>
                    <option>2024/2025</option>
                    <option>2025/2026</option>
                  </select>
                </div>
                <div className="select-group">
                  <label htmlFor="semester" className="select-label">SEMESTER</label>
                  <select id="semester" className="form-select" defaultValue="Genap">
                    <option>Ganjil</option>
                    <option>Genap</option>
                  </select>
                </div>
              </div>

              <div className="form-group jenjang-group">
                <label htmlFor="jenjang">JENJANG PENDIDIKAN</label>
                <select
                  id="jenjang"
                  className="form-input jenjang-select"
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value)}
                  required
                >
                  <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                  <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                </select>
              </div>

              <button type="submit" className="login-button">LOGIN</button>

              <div className="forgot-password">
                <Link to="/forgot-password">Lupa Password?</Link>
              </div>
            </form>

            <div className="login-footer">
              <p className="version-text">Pondok Pesantren Madinah El-Quds © 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;