// src/pages/admin/LegerNilaiSiswa.jsx
import React, { useState } from 'react';
import './LegerNilaiSiswa.css';
import { FaDownload, FaPrint, FaSearch } from 'react-icons/fa';

const LegerNilaiSiswa = () => {
  const [selectedKelas, setSelectedKelas] = useState('10-2');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');

  // Data contoh – nanti diambil dari API
  const dataSiswa = [
    {
      no: 1,
      nis: '8278381538',
      nama: 'OLIVIA',
      kelas: '10-2',
      pengetahuan: 85,
      keterampilan: 88,
      spiritual: 90,
      sosial: 86,
      sakit: 0,
      izin: 0,
      alpa: 0,
      pramuka: 'B',
    },
    {
      no: 2,
      nis: '8278381539',
      nama: 'BUDI SANTOSO',
      kelas: '10-2',
      pengetahuan: 78,
      keterampilan: 75,
      spiritual: 82,
      sosial: 80,
      sakit: 1,
      izin: 0,
      alpa: 2,
      pramuka: 'C',
    },
    {
      no: 3,
      nis: '8278381540',
      nama: 'CITRA DEWI',
      kelas: '10-2',
      pengetahuan: 92,
      keterampilan: 94,
      spiritual: 88,
      sosial: 90,
      sakit: 0,
      izin: 1,
      alpa: 0,
      pramuka: 'A',
    },
  ];

  const kelasOptions = ['10-1', '10-2', '10-3', '11-1', '11-2', '12-1', '12-2'];

  const handleDownload = () => {
    alert('Fitur download Leger Nilai dalam pengembangan (Excel/PDF)');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="leger-container">
      <div className="leger-header">
        <h2>Leger Nilai Siswa</h2>
        <p>Rekapitulasi nilai akhir siswa per kelas – Kurikulum Merdeka</p>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Kelas:</label>
          <select value={selectedKelas} onChange={(e) => setSelectedKelas(e.target.value)}>
            {kelasOptions.map((kelas) => (
              <option key={kelas} value={kelas}>
                {kelas}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Semester:</label>
          <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            <option value="Ganjil">Ganjil</option>
            <option value="Genap">Genap</option>
          </select>
        </div>
        <button className="btn-download" onClick={handleDownload}>
          <FaDownload /> Download Leger
        </button>
        <button className="btn-print" onClick={handlePrint}>
          <FaPrint /> Cetak
        </button>
      </div>

      <div className="table-wrapper">
        <table className="leger-table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIS</th>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Pengetahuan</th>
              <th>Keterampilan</th>
              <th>Spiritual</th>
              <th>Sosial</th>
              <th>S</th>
              <th>I</th>
              <th>A</th>
              <th>Pramuka</th>
            </tr>
            <tr className="subheader">
              <th colSpan="4">Capaian Akademik & Non-Akademik</th>
              <th>Nilai</th>
              <th>Nilai</th>
              <th>Deskripsi</th>
              <th>Deskripsi</th>
              <th colSpan="3">Kehadiran</th>
              <th>Ekskul</th>
            </tr>
          </thead>
          <tbody>
            {dataSiswa.map((siswa) => (
              <tr key={siswa.nis}>
                <td>{siswa.no}</td>
                <td>{siswa.nis}</td>
                <td>{siswa.nama}</td>
                <td>{siswa.kelas}</td>
                <td>{siswa.pengetahuan}</td>
                <td>{siswa.keterampilan}</td>
                <td>{siswa.spiritual}</td>
                <td>{siswa.sosial}</td>
                <td>{siswa.sakit}</td>
                <td>{siswa.izin}</td>
                <td>{siswa.alpa}</td>
                <td>{siswa.pramuka}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dataSiswa.length === 0 && (
        <div className="empty-data">Belum ada data untuk kelas ini.</div>
      )}

      <div className="leger-footer">
        <p>© {new Date().getFullYear()} E-Raport | Leger Nilai Siswa - Kurikulum Merdeka</p>
      </div>
    </div>
  );
};

export default LegerNilaiSiswa;