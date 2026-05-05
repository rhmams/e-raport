// src/pages/admin/DetailSiswa.jsx
import React from 'react';
import './DetailSiswa.css';
import { 
  FaUserGraduate, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, 
  FaPhone, FaEnvelope, FaVenusMars, FaBookOpen, FaUsers,
  FaSchool, FaHome, FaUser
} from 'react-icons/fa';

const DetailSiswa = ({ siswa, onBack }) => {
  if (!siswa) {
    return (
      <div className="detail-siswa-container">
        <div className="detail-siswa-header">
          <button className="btn-back" onClick={onBack}>
            ←
          </button>
          <div className="header-title">
            <h2>Detail Siswa</h2>
            <p>Informasi lengkap data siswa</p>
          </div>
        </div>
        <div className="not-found">
          <p>Data siswa tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Data tambahan
  const additionalData = {
    statusKeluarga: 'Anak Kandung',
    anakKe: '1',
    agama: 'Islam',
    sekolahAsal: 'SMP Negeri 1 Jakarta',
    diterimaDiKelas: 'X',
    namaAyah: 'Budi Ramadhan',
    pekerjaanAyah: 'PNS',
    namaIbu: 'Siti Nurhaliza',
    pekerjaanIbu: 'Guru',
    alamatOrangTua: 'Jl. Mawar No. 12, Jakarta Selatan',
    noTeleponOrangTua: '081234567890',
    noTeleponRumah: '021-7654321'
  };

  return (
    <div className="detail-siswa-container">
      {/* Header */}
      <div className="detail-siswa-header">
        <button className="btn-back" onClick={onBack} title="Kembali">
          ←
        </button>
        <div className="header-title">
          <h2>Detail Siswa</h2>
          <p>Informasi lengkap data siswa</p>
        </div>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {siswa.nama?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h3>{siswa.nama}</h3>
          <div className="profile-badges">
            <span className="badge"><FaIdCard /> NIS: {siswa.nis}</span>
            <span className="badge"><FaIdCard /> NISN: {siswa.nisn}</span>
            <span className="badge"><FaBookOpen /> Kelas: {siswa.kelas}</span>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Kolom */}
      <div className="detail-main-content">
        {/* Kolom Kiri - Data Pribadi */}
        <div className="detail-left-column">
          <div className="detail-card">
            <div className="card-header">
              <FaUserGraduate className="card-icon" />
              <h4>Data Pribadi</h4>
            </div>
            <div className="card-body">
              <div className="info-group">
                <div className="info-row">
                  <div className="info-label">Nama Lengkap</div>
                  <div className="info-value">{siswa.nama}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">No Absen</div>
                  <div className="info-value">{siswa.noAbsen || '-'}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">NIS</div>
                  <div className="info-value">{siswa.nis}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">NISN</div>
                  <div className="info-value">{siswa.nisn}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tempat Lahir</div>
                  <div className="info-value">{siswa.tempatLahir || '-'}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tanggal Lahir</div>
                  <div className="info-value">{formatDate(siswa.tanggalLahir)}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Jenis Kelamin</div>
                  <div className="info-value">{siswa.jenisKelamin || '-'}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Agama</div>
                  <div className="info-value">{additionalData.agama}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Status Keluarga</div>
                  <div className="info-value">{additionalData.statusKeluarga}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Anak Ke-</div>
                  <div className="info-value">{additionalData.anakKe}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Alamat</div>
                  <div className="info-value">{siswa.alamat || '-'}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">No Telepon</div>
                  <div className="info-value">{siswa.phone || '-'}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Email</div>
                  <div className="info-value">{siswa.email || '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Data Sekolah & Data Orang Tua */}
        <div className="detail-right-column">
          {/* Data Sekolah */}
          <div className="detail-card">
            <div className="card-header">
              <FaSchool className="card-icon" />
              <h4>Data Sekolah</h4>
            </div>
            <div className="card-body">
              <div className="info-group">
                <div className="info-row">
                  <div className="info-label">Sekolah Asal</div>
                  <div className="info-value">{additionalData.sekolahAsal}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Diterima di Kelas</div>
                  <div className="info-value">{additionalData.diterimaDiKelas}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tahun Masuk</div>
                  <div className="info-value">{siswa.tahunMasuk || '2024'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Orang Tua */}
          <div className="detail-card">
            <div className="card-header">
              <FaUsers className="card-icon" />
              <h4>Data Orang Tua</h4>
            </div>
            <div className="card-body">
              <div className="info-group">
                <div className="info-row">
                  <div className="info-label">Nama Ayah</div>
                  <div className="info-value">{additionalData.namaAyah}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Nama Ibu</div>
                  <div className="info-value">{additionalData.namaIbu}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Pekerjaan Ayah</div>
                  <div className="info-value">{additionalData.pekerjaanAyah}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Pekerjaan Ibu</div>
                  <div className="info-value">{additionalData.pekerjaanIbu}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Alamat Orang Tua</div>
                  <div className="info-value">{additionalData.alamatOrangTua}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">No Telepon Orang Tua</div>
                  <div className="info-value">{additionalData.noTeleponOrangTua}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">No Telepon Rumah</div>
                  <div className="info-value">{additionalData.noTeleponRumah}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSiswa;