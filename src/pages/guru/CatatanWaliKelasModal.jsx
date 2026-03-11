import React, { useState } from 'react';
import { X } from "lucide-react";
import "./CatatanWaliKelasModal.css";

function CatatanWaliKelasModal({ isOpen, onClose }) {
  const [selectedSiswa, setSelectedSiswa] = useState('');
  const [catatan, setCatatan] = useState('');

  // Data siswa untuk dropdown
  const siswaList = [
    { id: 1, nama: 'Ahmad' },
    { id: 2, nama: 'Aisyah' },
    { id: 3, nama: 'Arif' },
    { id: 4, nama: 'Asri' },
    { id: 5, nama: 'Azhar' },
    { id: 6, nama: 'Bahrul' },
    { id: 7, nama: 'Candra' },
    { id: 8, nama: 'Dwi' },
    { id: 9, nama: 'Eka' },
    { id: 10, nama: 'Firdaus' },
  ];

  if (!isOpen) return null;

  const handleSimpan = () => {
    console.log('Menyimpan catatan untuk:', selectedSiswa, catatan);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container catatan-wali-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>Catatan Wali Kelas</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content-sederhana">
          {/* Pilih Siswa - Dropdown */}
          <div className="form-group">
            <label className="form-label">Pilih Siswa</label>
            <select 
              className="form-select"
              value={selectedSiswa}
              onChange={(e) => setSelectedSiswa(e.target.value)}
            >
              <option value="">-- Pilih Siswa --</option>
              {siswaList.map((siswa) => (
                <option key={siswa.id} value={siswa.id}>
                  {siswa.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Catatan Wali Kelas */}
          <div className="form-group">
            <label className="form-label">Catatan Wali Kelas</label>
            <textarea 
              className="form-textarea"
              rows="5"
              placeholder="Tulis catatan untuk siswa yang dipilih..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            ></textarea>
          </div>

          {/* Catatan Info */}
          <div className="catatan-info">
            <p>* Catatan ini akan muncul di raport siswa</p>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button className="btn-primary" onClick={handleSimpan}>
              Simpan Catatan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatatanWaliKelasModal;