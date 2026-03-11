import React, { useState } from 'react';
import { X, Calendar, MapPin, FileText, ChevronDown } from "lucide-react";
import "./MutasiModal.css";

function MutasiModal({ isOpen, onClose }) {
  const [jenisMutasi, setJenisMutasi] = useState('masuk'); // 'masuk' atau 'keluar'
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nisn: '',
    sekolahAsal: '',
    kelasTujuan: '',
    tanggalMasuk: '',
    alasanMutasi: '',
    keterangan: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSimpan = () => {
    console.log('Jenis Mutasi:', jenisMutasi);
    console.log('Data Mutasi:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container mutasi-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>Mutasi Siswa</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Dropdown Jenis Mutasi */}
        <div className="jenis-mutasi-section">
          <label className="jenis-mutasi-label">Jenis Mutasi</label>
          <div className="jenis-mutasi-dropdown">
            <select 
              className="jenis-mutasi-select"
              value={jenisMutasi}
              onChange={(e) => setJenisMutasi(e.target.value)}
            >
              <option value="masuk">Mutasi Masuk</option>
              <option value="keluar">Mutasi Keluar</option>
            </select>
            <ChevronDown className="dropdown-icon" size={18} />
          </div>
        </div>

        <div className="modal-subtitle">
          {jenisMutasi === 'masuk' 
            ? 'Form Mutasi Masuk - Pendaftaran Siswa Pindahan' 
            : 'Form Mutasi Keluar - Pengeluaran Siswa'}
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Form Grid */}
          <div className="form-grid">
            {/* Nama Lengkap */}
            <div className="form-group full-width">
              <label className="form-label">Nama Lengkap Siswa</label>
              <input
                type="text"
                name="namaLengkap"
                placeholder="Masukkan nama lengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* NISN */}
            <div className="form-group">
              <label className="form-label">NISN</label>
              <input
                type="text"
                name="nisn"
                placeholder="Nomor Induk Siswa Nasional"
                value={formData.nisn}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Sekolah Asal / Sekolah Tujuan - Berubah berdasarkan jenis mutasi */}
            <div className="form-group">
              <label className="form-label">
                {jenisMutasi === 'masuk' ? 'Sekolah Asal' : 'Sekolah Tujuan'}
              </label>
              <input
                type="text"
                name="sekolahAsal"
                placeholder={jenisMutasi === 'masuk' ? 'Nama sekolah asal' : 'Nama sekolah tujuan'}
                value={formData.sekolahAsal}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Kelas Tujuan / Kelas Asal - Berubah berdasarkan jenis mutasi */}
            <div className="form-group">
              <label className="form-label">
                {jenisMutasi === 'masuk' ? 'Kelas Tujuan' : 'Kelas Asal'}
              </label>
              <select
                name="kelasTujuan"
                value={formData.kelasTujuan}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Pilih Kelas</option>
                <option value="X IPA 1">X IPA 1</option>
                <option value="X IPA 2">X IPA 2</option>
                <option value="XI IPA 1">XI IPA 1</option>
                <option value="XI IPA 2">XI IPA 2</option>
                <option value="XII IPA 1">XII IPA 1</option>
                <option value="XII IPA 2">XII IPA 2</option>
              </select>
            </div>

            {/* Tanggal Mutasi */}
            <div className="form-group">
              <label className="form-label">
                {jenisMutasi === 'masuk' ? 'Tanggal Masuk' : 'Tanggal Keluar'}
              </label>
              <div className="date-input-wrapper">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  name="tanggalMasuk"
                  value={formData.tanggalMasuk}
                  onChange={handleChange}
                  className="form-input date-input"
                />
              </div>
            </div>

            {/* Alasan Mutasi */}
            <div className="form-group">
              <label className="form-label">Alasan Mutasi</label>
              <select
                name="alasanMutasi"
                value={formData.alasanMutasi}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Pilih Alasan</option>
                <option value="Pindah Orang Tua">Pindah Orang Tua</option>
                <option value="Pindah Domisili">Pindah Domisili</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Keterangan Tambahan */}
            <div className="form-group full-width">
              <label className="form-label">Keterangan Tambahan</label>
              <textarea
                name="keterangan"
                rows="3"
                placeholder="Catatan atau keterangan lainnya..."
                value={formData.keterangan}
                onChange={handleChange}
                className="form-textarea"
              ></textarea>
            </div>
          </div>

          {/* Pembagian Pertumbuhan */}
          <div className="growth-section">
            <h4 className="growth-title">Pembagian Pertumbuhan</h4>
            <div className="growth-item">
              <span className="growth-label">Pendidikan Tertunda</span>
              <span className="growth-value">5 kelas menunggu penilaian keterampilan</span>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button className="btn-primary" onClick={handleSimpan}>
              Simpan Data Mutasi
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="modal-footer-info">
          <div className="info-row">
            <MapPin size={16} />
            <span>Jl. Pendidikan No. 123, Kota Santri, Indonesia</span>
          </div>
          <div className="info-row">
            <span>(021) 1234-5678</span>
            <span className="info-divider">|</span>
            <span>info@alhanaan.sch.id</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MutasiModal;