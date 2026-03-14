import React from 'react';
import { Search } from "lucide-react"; // Hapus X dari import
import "./CatatanPrestasiModal.css";

function CatatanPrestasiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2>Catatan Prestasi Akhir</h2>
          <button className="close-button" onClick={onClose}>
            X {/* Ganti dari <X size={20} /> menjadi huruf X */}
          </button>
        </div>

        <div className="modal-subtitle">
          Cicilan prestasi yang akan ditampilkan di halaman akhir report
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Pilih Siswa Section */}
          <div className="form-section">
            <label className="section-label">Pilih Siswa</label>
            <div className="student-search">
              <input 
                type="text" 
                placeholder="Cari nama siswa..." 
                className="search-input"
              />
              <button className="search-button">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Semester & Tahun Ajaran */}
          <div className="form-row">
            <div className="form-group">
              <label>Semester</label>
              <select className="form-select">
                <option>Semester 1</option>
                <option>Semester 2</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tahun Ajaran</label>
              <select className="form-select">
                <option>2025/2026</option>
                <option>2024/2025</option>
                <option>2023/2024</option>
              </select>
            </div>
          </div>

          {/* Catatan Prestasi */}
          <div className="form-section">
            <label className="section-label">
              Catatan Prestasi & Pencapaian
            </label>
            <p className="section-desc">
              Tulis catatan prestasi dan pencapaian siswa selama semester ini, termasuk prestasi akademik dan non-akademik.
            </p>
            <textarea 
              className="form-textarea"
              rows="4"
              placeholder="Contoh: Meraih juara 1 lomba MTQ tingkat kabupaten, peningkatan nilai Matematika dari 75 menjadi 85..."
            ></textarea>
            <p className="note-text">
              Catatan ini akan ditampilkan di halaman akhir raport sebagai penguat.
            </p>
          </div>

          {/* Rekomendasi */}
          <div className="form-section">
            <label className="section-label">
              Rekomendasi untuk Semester Berikutnya (Opsional)
            </label>
            <textarea 
              className="form-textarea"
              rows="3"
              placeholder="Masukkan saran atau rekomendasi untuk perkembangan siswa di semester mendatang..."
            ></textarea>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button className="btn-primary">
              Simpan Catatan
            </button>
          </div>

          {/* Preview Siswa */}
          <div className="preview-section">
            <div className="preview-header">
              <span className="preview-title">Preview</span>
            </div>
            <div className="preview-item">
              <div className="preview-info">
                <span className="preview-name">Ahmad Zaki</span>
                <span className="preview-nilai">94.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatatanPrestasiModal;