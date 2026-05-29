import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './CatatanPrestasiModal.css';

const CatatanPrestasiModal = ({ isOpen, onClose }) => {
  const [siswa, setSiswa] = useState('');
  const [semester, setSemester] = useState('Semester 1');
  const [tahunAjaran, setTahunAjaran] = useState('2025/2026');
  const [catatan, setCatatan] = useState('');
  const [rekomendasi, setRekomendasi] = useState('');

  if (!isOpen) return null;

  return (
    <div className="prestasi-modal-overlay" onClick={onClose}>
      <div className="prestasi-modal-container" onClick={e => e.stopPropagation()}>
        <div className="prestasi-modal-header">
          <h2>📝 Catatan Prestasi Akhir</h2>
          <button className="prestasi-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="prestasi-modal-subtitle">
          Pencapaian yang akan ditampilkan di halaman akhir raport
        </div>
        <div className="prestasi-modal-body">
          <div className="prestasi-form-group">
            <label>Pilih Siswa</label>
            <div className="prestasi-search-wrapper">
              <input
                type="text"
                placeholder="Cari nama siswa..."
                value={siswa}
                onChange={(e) => setSiswa(e.target.value)}
                className="prestasi-input"
              />
              <button className="prestasi-search-btn"><Search size={18} /></button>
            </div>
          </div>

          <div className="prestasi-row">
            <div className="prestasi-form-group">
              <label>Semester</label>
              <select className="prestasi-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                <option>Semester 1</option>
                <option>Semester 2</option>
              </select>
            </div>
            <div className="prestasi-form-group">
              <label>Tahun Ajaran</label>
              <select className="prestasi-select" value={tahunAjaran} onChange={(e) => setTahunAjaran(e.target.value)}>
                <option>2025/2026</option>
                <option>2024/2025</option>
              </select>
            </div>
          </div>

          <div className="prestasi-form-group">
            <label>Catatan Prestasi & Pencapaian</label>
            <textarea
              className="prestasi-textarea"
              rows="4"
              placeholder="Contoh: Meraih juara 1 lomba MTQ tingkat kabupaten..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
            <small className="prestasi-hint">Catatan ini akan ditampilkan di halaman akhir raport sebagai penguat.</small>
          </div>

          <div className="prestasi-form-group">
            <label>Rekomendasi untuk Semester Berikutnya (Opsional)</label>
            <textarea
              className="prestasi-textarea"
              rows="3"
              placeholder="Saran untuk perkembangan siswa..."
              value={rekomendasi}
              onChange={(e) => setRekomendasi(e.target.value)}
            />
          </div>

          <div className="prestasi-preview">
            <div className="prestasi-preview-title">Preview Siswa</div>
            <div className="prestasi-preview-item">
              <span>Ahmad Zaki</span>
              <span className="prestasi-preview-nilai">94.2</span>
            </div>
          </div>
        </div>
        <div className="prestasi-modal-footer">
          <button className="prestasi-btn-secondary" onClick={onClose}>Batal</button>
          <button className="prestasi-btn-primary" onClick={() => { alert('Catatan disimpan (simulasi)'); onClose(); }}>Simpan Catatan</button>
        </div>
      </div>
    </div>
  );
};

export default CatatanPrestasiModal;