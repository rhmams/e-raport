import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import './CatatanWaliKelasModal.css';

const CatatanWaliKelasModal = ({ isOpen, onClose }) => {
  // 🧑‍🏫 Asumsikan wali kelas ini mengampu kelas "XI IPA 2"
  // Nanti bisa diambil dari props atau context sesuai login user
  const kelasWali = "XI IPA 2";

  // Daftar siswa hanya dari kelas tersebut
  const daftarSiswa = [
    { id: 1, nama: 'Ahmad Zaki', kelas: 'XI IPA 2' },
    { id: 2, nama: 'Budi Santoso', kelas: 'XI IPA 2' },
    { id: 3, nama: 'Citra Dewi', kelas: 'XI IPA 2' },
    { id: 4, nama: 'Dewi Sartika', kelas: 'XI IPA 2' },
    { id: 5, nama: 'Eko Prasetyo', kelas: 'XI IPA 2' },
  ];

  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [catatan, setCatatan] = useState('');

  if (!isOpen) return null;

  // Filter siswa berdasarkan search (hanya dari kelas yang sama)
  const filteredSiswa = daftarSiswa.filter(s =>
    s.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSiswa = (siswa) => {
    setSelectedSiswa(siswa);
    setSearchTerm(siswa.nama);
    setIsDropdownOpen(false);
  };

  const handleSimpan = () => {
    if (!selectedSiswa) {
      alert('Pilih siswa terlebih dahulu');
      return;
    }
    alert(`Catatan wali kelas untuk ${selectedSiswa.nama} (kelas ${kelasWali}) disimpan.`);
    onClose();
  };

  return (
    <div className="walikelas-modal-overlay" onClick={onClose}>
      <div className="walikelas-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="walikelas-modal-header">
          <h2>✏️ Catatan Wali Kelas - {kelasWali}</h2>
          <button className="walikelas-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="walikelas-modal-body">
          <div className="walikelas-form-group">
            <label>Pilih Siswa (Kelas {kelasWali})</label>
            <div className="walikelas-dropdown">
              <div
                className="walikelas-dropdown-input"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <input
                  type="text"
                  placeholder="Cari nama siswa dalam satu kelas..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                    if (e.target.value === '') setSelectedSiswa(null);
                  }}
                  className="walikelas-search-input"
                />
                <ChevronDown size={18} className="walikelas-dropdown-icon" />
              </div>
              {isDropdownOpen && (
                <div className="walikelas-dropdown-list">
                  {filteredSiswa.length > 0 ? (
                    filteredSiswa.map((siswa) => (
                      <div
                        key={siswa.id}
                        className={`walikelas-dropdown-item ${selectedSiswa?.id === siswa.id ? 'selected' : ''}`}
                        onClick={() => handleSelectSiswa(siswa)}
                      >
                        <div className="walikelas-siswa-nama">{siswa.nama}</div>
                      </div>
                    ))
                  ) : (
                    <div className="walikelas-dropdown-no-data">Tidak ada siswa dengan nama tersebut</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="walikelas-form-group">
            <label>Catatan untuk raport</label>
            <textarea
              className="walikelas-textarea"
              rows="5"
              placeholder="Tulis catatan wali kelas untuk siswa ini..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </div>
        </div>

        <div className="walikelas-modal-footer">
          <button className="walikelas-btn-secondary" onClick={onClose}>Batal</button>
          <button className="walikelas-btn-primary" onClick={handleSimpan}>Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default CatatanWaliKelasModal;