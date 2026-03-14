import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Validasi credentials
    if (username === 'admin' && password === 'password123') {
      console.log('Login berhasil!');
      
      // Simpan status login di localStorage (opsional)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      // Redirect ke halaman Beranda (dashboard)
      navigate('/beranda');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left side - Image */}
        <div className="login-left">
          <img 
            src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2070&auto=format&fit=crop" 
            alt="Pondok Pesantren" 
            className="login-image"
          />
        </div>

        {/* Right side - Login Form */}
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
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
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
                  <select className="form-select" defaultValue="2021/2022">
                    <option>2021/2022</option>
                    <option>2022/2023</option>
                    <option>2023/2024</option>
                  </select>
                </div>
                <div className="select-group">
                  <select className="form-select" defaultValue="Genap">
                    <option>Genap</option>
                    <option>Ganjil</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="login-button">
                LOGIN
              </button>

              <div className="forgot-password">
                <Link to="/forgot-password">Lupa Password?</Link>
              </div>

              <div className="create-account-section">
                <p>Belum punya akun?</p>
                <Link to="/create-account" className="create-account-button">
                  Create Account
                </Link>
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