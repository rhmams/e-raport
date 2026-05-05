// src/pages/admin/PengaturanUmum.jsx
import React, { useState } from 'react';
import './PengaturanUmum.css';
import { FaSave } from 'react-icons/fa';

const PengaturanUmum = () => {
  const [jamLayanan, setJamLayanan] = useState({
    senin_jumat: '07:00 – 16:00',
    sabtu: '07:00 – 14:00',
    minggu: 'Tutup'
  });

  const [kontak, setKontak] = useState({
    telepon: '+62 21 1234-5678',
    email: 'info@madinah.edu.id',
    fast_response: '24 Jam'
  });

  return (
    <div className="pengaturan-container">

      {/* ===== INFORMASI SEKOLAH ===== */}
      <div className="page-header">
        <h2>Pengaturan Umum</h2>
        <p className="page-subtitle">Kelola informasi dan pengaturan umum sekolah</p>
      </div>

      <div className="settings-card">
        <div className="card-header">
          <h3>Informasi Sekolah</h3>
        </div>
        <div className="settings-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nama Sekolah</label>
              <input type="text" defaultValue="Madrasah Madinah El-Quds" className="form-control" />
            </div>
            <div className="form-group">
              <label>NIS/NSS/NPSN</label>
              <input type="text" defaultValue="20345678" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Alamat Sekolah</label>
              <input type="text" defaultValue="Jl. Pendidikan Islam No. 123" className="form-control" />
            </div>
            <div className="form-group">
              <label>Kode Pos</label>
              <input type="text" defaultValue="13450" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>No. Telepon</label>
              <input type="text" defaultValue="(021) 8765-4321" className="form-control" />
            </div>
            <div className="form-group">
              <label>Kelurahan/Desa</label>
              <input type="text" defaultValue="Kelurahan Madinah" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Kecamatan</label>
              <input type="text" defaultValue="Kecamatan Batul Madiq" className="form-control" />
            </div>
            <div className="form-group">
              <label>Kota/Kabupaten</label>
              <input type="text" defaultValue="Jakarta Timur" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Provinsi</label>
              <input type="text" defaultValue="DKI Jakarta" className="form-control" />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="text" defaultValue="www.madinahelquds.sch.id" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" defaultValue="info@madinahelquds.sch.id" className="form-control" />
            </div>
            <div className="form-group">
              <label>Kelas</label>
              <input type="text" defaultValue="VII, VIII, IX" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tahun Pelajaran</label>
              <select className="form-control">
                <option>2023/2024</option>
                <option>2024/2025</option>
                <option defaultValue>2025/2026</option>
                <option>2026/2027</option>
              </select>
            </div>
            <div className="form-group"></div>
          </div>
          <div className="form-actions">
            <button className="btn-save">
              <FaSave /> Simpan Perubahan
            </button>
          </div>
        </div>
      </div>

      {/* ===== JAM LAYANAN ===== */}
      <div className="settings-card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <h3>Jam Layanan</h3>
        </div>
        <div className="settings-form">
          <div className="form-row">
            <div className="form-group">
              <label>Senin – Jumat</label>
              <input
                type="text"
                className="form-control"
                value={jamLayanan.senin_jumat}
                onChange={(e) => setJamLayanan({ ...jamLayanan, senin_jumat: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Sabtu</label>
              <input
                type="text"
                className="form-control"
                value={jamLayanan.sabtu}
                onChange={(e) => setJamLayanan({ ...jamLayanan, sabtu: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Minggu</label>
              <input
                type="text"
                className="form-control"
                value={jamLayanan.minggu}
                onChange={(e) => setJamLayanan({ ...jamLayanan, minggu: e.target.value })}
              />
            </div>
            <div className="form-group"></div>
          </div>
          <div className="form-actions">
            <button className="btn-save">
              <FaSave /> Simpan Jam Layanan
            </button>
          </div>
        </div>
      </div>

      {/* ===== HUBUNGI KAMI ===== */}
      <div className="settings-card" style={{ marginTop: '24px', marginBottom: '24px' }}>
        <div className="card-header">
          <h3>Hubungi Kami</h3>
        </div>
        <div className="settings-form">
          <div className="form-row">
            <div className="form-group">
              <label>No. Telepon</label>
              <input
                type="text"
                className="form-control"
                value={kontak.telepon}
                onChange={(e) => setKontak({ ...kontak, telepon: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={kontak.email}
                onChange={(e) => setKontak({ ...kontak, email: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Fast Response</label>
              <input
                type="text"
                className="form-control"
                value={kontak.fast_response}
                onChange={(e) => setKontak({ ...kontak, fast_response: e.target.value })}
              />
            </div>
            <div className="form-group"></div>
          </div>
          <div className="form-actions">
            <button className="btn-save">
              <FaSave /> Simpan Kontak
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PengaturanUmum;