// src/pages/admin/ProfilMadrasah.jsx
import React, { useState } from 'react';
import './ProfilMadrasah.css';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaCheckCircle,
  FaStar,
  FaChalkboardTeacher,
  FaBookOpen,
  FaLaptopCode,
  FaLanguage,
  FaMicrophoneAlt,
  FaFlask,
  FaFutbol,
  FaMosque,
  FaUtensils,
  FaParking,
  FaUsers,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';

const ProfilMadrasah = () => {
  // State untuk data profil
  const [profileData, setProfileData] = useState({
    namaMadrasah: 'Madrasah Madinah El-Quds',
    tagline: 'Membentuk Generasi Qurani yang Berakhir Mulia',
    tahunBerdiri: '2005',
    akreditasi: 'A',
    alamat: 'Jl. Pendidikan Islam No. 123, Kelurahan Madinah, Kecamatan Batul Madiq, Jakarta Timur 13450',
    telepon: '(021) 8765-4321',
    email: 'info@madinahlequds.sch.id',
    website: 'www.madinahlequds.sch.id',
    visi: 'Menjadi lembaga pendidikan Islam terdepan yang menghasilkan generasi Qurani, berakhir mulia, berprestasi, dan mampu berkontribusi positif bagi masyarakat dan bangsa.',
    misi: [
      'Menyelenggarakan pendidikan berbasis Al-Quran dan As-Sunnah',
      'Membentuk karakter islami yang kuat pada peserta didik',
      'Mengembangkan potensi akademik dan non-akademik',
      'Membangun lingkungan belajar yang kondusif dan islami',
      'Menjalin kerjasama dengan orang tua dan masyarakat'
    ]
  });

  // State untuk mode edit
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  // Handle misi item change
  const handleMisiChange = (index, value) => {
    const newMisi = [...editData.misi];
    newMisi[index] = value;
    setEditData(prev => ({ ...prev, misi: newMisi }));
  };

  // Add misi item
  const addMisiItem = () => {
    setEditData(prev => ({
      ...prev,
      misi: [...prev.misi, 'Misi baru']
    }));
  };

  // Remove misi item
  const removeMisiItem = (index) => {
    const newMisi = editData.misi.filter((_, i) => i !== index);
    setEditData(prev => ({ ...prev, misi: newMisi }));
  };

  // Save changes
  const handleSave = () => {
    setProfileData({ ...editData });
    setEditMode(false);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditData({ ...profileData });
    setEditMode(false);
  };

  return (
    <div className="profil-container">
      {/* Tombol Edit/Save */}
      <div className="edit-actions">
        {!editMode ? (
          <button className="btn-edit" onClick={() => setEditMode(true)}>
            <FaEdit /> Edit Profil
          </button>
        ) : (
          <div className="edit-buttons">
            <button className="btn-save" onClick={handleSave}>
              <FaSave /> Simpan
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              <FaTimes /> Batal
            </button>
          </div>
        )}
      </div>

      {/* Header Profil dengan Background */}
      <div className="profil-header">
        <div className="profil-header-overlay">
          <div className="profil-title-section">
            {!editMode ? (
              <>
                <h1 className="profil-title">{profileData.namaMadrasah}</h1>
                <p className="profil-tagline">{profileData.tagline}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="namaMadrasah"
                  value={editData.namaMadrasah}
                  onChange={handleInputChange}
                  className="edit-input-title"
                  placeholder="Nama Madrasah"
                />
                <input
                  type="text"
                  name="tagline"
                  value={editData.tagline}
                  onChange={handleInputChange}
                  className="edit-input-tagline"
                  placeholder="Tagline"
                />
              </>
            )}
            <div className="badge-container">
              <span className="badge-akreditasi">
                <FaCheckCircle /> Terakreditasi {!editMode ? profileData.akreditasi : 
                  <select 
                    name="akreditasi" 
                    value={editData.akreditasi} 
                    onChange={handleInputChange}
                    className="edit-select"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                }
              </span>
              <span className="badge-tahun">
                <FaStar /> Berdiri sejak {!editMode ? profileData.tahunBerdiri :
                  <input
                    type="text"
                    name="tahunBerdiri"
                    value={editData.tahunBerdiri}
                    onChange={handleInputChange}
                    className="edit-input-small"
                    style={{ width: '70px' }}
                  />
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Kontak Info Cards */}
      <div className="contact-cards">
        <div className="contact-card">
          <div className="contact-icon"><FaMapMarkerAlt /></div>
          <div className="contact-detail">
            <h4>Alamat</h4>
            {!editMode ? (
              <p>{profileData.alamat}</p>
            ) : (
              <textarea
                name="alamat"
                value={editData.alamat}
                onChange={handleInputChange}
                className="edit-textarea"
                rows="3"
              />
            )}
          </div>
        </div>
        <div className="contact-card">
          <div className="contact-icon"><FaPhone /></div>
          <div className="contact-detail">
            <h4>Telepon</h4>
            {!editMode ? (
              <p>{profileData.telepon}</p>
            ) : (
              <input
                type="text"
                name="telepon"
                value={editData.telepon}
                onChange={handleInputChange}
                className="edit-input"
              />
            )}
          </div>
        </div>
        <div className="contact-card">
          <div className="contact-icon"><FaEnvelope /></div>
          <div className="contact-detail">
            <h4>Email</h4>
            {!editMode ? (
              <p>{profileData.email}</p>
            ) : (
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className="edit-input"
              />
            )}
          </div>
        </div>
        <div className="contact-card">
          <div className="contact-icon"><FaGlobe /></div>
          <div className="contact-detail">
            <h4>Website</h4>
            {!editMode ? (
              <p>{profileData.website}</p>
            ) : (
              <input
                type="text"
                name="website"
                value={editData.website}
                onChange={handleInputChange}
                className="edit-input"
              />
            )}
          </div>
        </div>
      </div>

      {/* Visi Misi Section */}
      <div className="visi-misi-section">
        <div className="visi-card">
          <div className="visi-icon">🎯</div>
          <h3>Visi</h3>
          {!editMode ? (
            <p>{profileData.visi}</p>
          ) : (
            <textarea
              name="visi"
              value={editData.visi}
              onChange={handleInputChange}
              className="edit-textarea"
              rows="4"
            />
          )}
        </div>
        <div className="misi-card">
          <div className="misi-icon">📋</div>
          <h3>Misi</h3>
          {!editMode ? (
            <ul>
              {profileData.misi.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <div className="edit-misi-list">
              {editData.misi.map((item, index) => (
                <div key={index} className="edit-misi-item">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleMisiChange(index, e.target.value)}
                    className="edit-input-misi"
                  />
                  <button
                    type="button"
                    className="btn-remove-misi"
                    onClick={() => removeMisiItem(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add-misi" onClick={addMisiItem}>
                + Tambah Misi
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Program Unggulan */}
      <div className="unggulan-section">
        <h2 className="section-title">Program Unggulan</h2>
        <div className="unggulan-grid">
          <div className="unggulan-item">
            <div className="unggulan-icon"><FaBookOpen /></div>
            <h4>Tahfidz Al-Quran</h4>
            <p>Program menghafal Al-Quran 30 Juz</p>
          </div>
          <div className="unggulan-item">
            <div className="unggulan-icon"><FaLanguage /></div>
            <h4>Bahasa Arab & Inggris</h4>
            <p>Pembelajaran bilingual interaktif</p>
          </div>
          <div className="unggulan-item">
            <div className="unggulan-icon"><FaFlask /></div>
            <h4>Sains & Teknologi</h4>
            <p>Laboratorium dan coding untuk siswa</p>
          </div>
          <div className="unggulan-item">
            <div className="unggulan-icon"><FaMicrophoneAlt /></div>
            <h4>Leadership Training</h4>
            <p>Pembentukan karakter kepemimpinan</p>
          </div>
        </div>
      </div>

      {/* Fasilitas */}
      <div className="fasilitas-section">
        <h2 className="section-title">Fasilitas</h2>
        <div className="fasilitas-grid">
          <div className="fasilitas-item"><FaChalkboardTeacher /> Ruang Kelas Ber-AC</div>
          <div className="fasilitas-item"><FaLaptopCode /> Laboratorium Komputer</div>
          <div className="fasilitas-item"><FaFlask /> Laboratorium IPA</div>
          <div className="fasilitas-item"><FaBookOpen /> Perpustakaan Digital</div>
          <div className="fasilitas-item"><FaMosque /> Masjid Sekolah</div>
          <div className="fasilitas-item"><FaUsers /> Aula Serbaguna</div>
          <div className="fasilitas-item"><FaFutbol /> Lapangan Olahraga</div>
          <div className="fasilitas-item"><FaUtensils /> Kantin Sehat</div>
          <div className="fasilitas-item"><FaParking /> Area Parkir Luas</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilMadrasah;