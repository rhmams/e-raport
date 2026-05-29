import React, { useState } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import './MutasiModal.css';

const MutasiModal = ({ isOpen, onClose }) => {
  const [jenis, setJenis] = useState('masuk');
  const [form, setForm] = useState({
    nama: '',
    nisn: '',
    sekolahAsal: '',
    kelasTujuan: '',
    tanggal: '',
    alasan: '',
    keterangan: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSimpan = () => {
    alert(`Data mutasi ${jenis === 'masuk' ? 'masuk' : 'keluar'} disimpan (simulasi).`);
    onClose();
  };

  return (
    <div className="mutasi-modal-overlay" onClick={onClose}>
      <div className="mutasi-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="mutasi-modal-header">
          <h2>🔄 Mutasi Siswa</h2>
          <button className="mutasi-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="mutasi-jenis-section">
          <label className="mutasi-jenis-label">Jenis Mutasi</label>
          <div className="mutasi-jenis-dropdown">
            <select
              className="mutasi-jenis-select"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
            >
              <option value="masuk">Mutasi Masuk</option>
              <option value="keluar">Mutasi Keluar</option>
            </select>
            <ChevronDown className="mutasi-dropdown-icon" size={18} />
          </div>
        </div>

        <div className="mutasi-modal-subtitle">
          {jenis === 'masuk'
            ? 'Form Mutasi Masuk - Pendaftaran Siswa Pindahan'
            : 'Form Mutasi Keluar - Pengeluaran Siswa'}
        </div>

        <div className="mutasi-modal-body">
          <div className="mutasi-form-group">
            <label>Nama Lengkap Siswa</label>
            <input
              type="text"
              name="nama"
              placeholder="Masukkan nama lengkap"
              value={form.nama}
              onChange={handleChange}
              className="mutasi-input"
            />
          </div>

          <div className="mutasi-row">
            <div className="mutasi-form-group">
              <label>NISN</label>
              <input
                type="text"
                name="nisn"
                placeholder="Nomor Induk Siswa Nasional"
                value={form.nisn}
                onChange={handleChange}
                className="mutasi-input"
              />
            </div>
            <div className="mutasi-form-group">
              <label>{jenis === 'masuk' ? 'Sekolah Asal' : 'Sekolah Tujuan'}</label>
              <input
                type="text"
                name="sekolahAsal"
                placeholder={jenis === 'masuk' ? 'Nama sekolah asal' : 'Nama sekolah tujuan'}
                value={form.sekolahAsal}
                onChange={handleChange}
                className="mutasi-input"
              />
            </div>
          </div>

          <div className="mutasi-row">
            <div className="mutasi-form-group">
              <label>{jenis === 'masuk' ? 'Kelas Tujuan' : 'Kelas Asal'}</label>
              <select
                name="kelasTujuan"
                value={form.kelasTujuan}
                onChange={handleChange}
                className="mutasi-select"
              >
                <option value="">Pilih Kelas</option>
                <option>X IPA 1</option>
                <option>X IPA 2</option>
                <option>XI IPA 1</option>
                <option>XI IPA 2</option>
                <option>XII IPA 1</option>
                <option>XII IPA 2</option>
              </select>
            </div>
            <div className="mutasi-form-group">
              <label>{jenis === 'masuk' ? 'Tanggal Masuk' : 'Tanggal Keluar'}</label>
              <div className="mutasi-date-wrapper">
                <Calendar size={18} className="mutasi-date-icon" />
                <input
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                  className="mutasi-input mutasi-date-input"
                />
              </div>
            </div>
          </div>

          <div className="mutasi-form-group">
            <label>Alasan Mutasi</label>
            <select
              name="alasan"
              value={form.alasan}
              onChange={handleChange}
              className="mutasi-select"
            >
              <option value="">Pilih Alasan</option>
              <option>Pindah Orang Tua</option>
              <option>Pindah Domisili</option>
              <option>Prestasi</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div className="mutasi-form-group">
            <label>Keterangan Tambahan</label>
            <textarea
              name="keterangan"
              rows="3"
              placeholder="Catatan atau keterangan lainnya..."
              value={form.keterangan}
              onChange={handleChange}
              className="mutasi-textarea"
            />
          </div>
        </div>

        <div className="mutasi-modal-footer">
          <button className="mutasi-btn-secondary" onClick={onClose}>Batal</button>
          <button className="mutasi-btn-primary" onClick={handleSimpan}>Simpan Data Mutasi</button>
        </div>
      </div>
    </div>
  );
};

export default MutasiModal;