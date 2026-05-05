// src/pages/admin/DetailRaport.jsx
import React from 'react';
import './DetailRaport.css';
import { FaPrint, FaIdCard, FaBookOpen, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const DetailRaport = ({ rapor, onBack }) => {
  if (!rapor) {
    return (
      <div className="detail-raport-container">
        <div className="detail-raport-header">
          <button className="btn-back" onClick={onBack}>
            ←
          </button>
          <div className="header-title">
            <h2>Detail Rapor</h2>
            <p>Data rapor tidak ditemukan</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // Data nilai mata pelajaran
  const mataPelajaran = [
    { no: 1, nama: "Pendidikan Agama dan Budi Pekerti", nilai: 85, deskripsi: "Ananda mampu memahami dan mengamalkan nilai-nilai keimanan dengan baik, menunjukkan sikap yang baik untuk berakhlak mulia dalam kehidupan sehari-hari." },
    { no: 2, nama: "Pendidikan Pancasila", nilai: 88, deskripsi: "Ananda menunjukkan pemahaman yang baik tentang nilai-nilai pancasila dan mampu mengimplementasikan dalam kehidupan beragama dan bernegara." },
    { no: 3, nama: "Bahasa Indonesia", nilai: 87, deskripsi: "Ananda memiliki kemampuan berbahasa indonesia yang baik, mampu menulis bahasa Indonesia dengan standar yang tepat dan jelas." },
    { no: 4, nama: "Matematika", nilai: 92, deskripsi: "Ananda menggunakan konsep-konsep matematika dengan sangat baik, mampu menyelesaikan masalah matematika secara sistematis dan logis." },
    { no: 5, nama: "Ilmu Pengetahuan Alam", nilai: 86, deskripsi: "Ananda memahami konsep-konsep IPA dengan baik dan mampu melakukan praktikum dengan prosedur yang benar." },
    { no: 6, nama: "Ilmu Pengetahuan Sosial", nilai: 84, deskripsi: "Ananda memiliki pemahaman yang baik tentang fenomena sosial dan mampu mengidentifikasi masalah sosial di sekitarnya." },
    { no: 7, nama: "Bahasa Inggris", nilai: 89, deskripsi: "Ananda mampu berkomunikasi dalam bahasa Inggris dengan baik, baik lisan maupun tulisan, dengan tata bahasa yang benar." },
    { no: 8, nama: "Pendidikan Jasmani, Olahraga dan Kesehatan", nilai: 88, deskripsi: "Ananda aktif dalam kegiatan olahraga, memiliki kebugaran fisik yang baik dan memahami pentingnya kesehatan." },
    { no: 9, nama: "Informatika", nilai: 91, deskripsi: "Ananda memahami konsep informatika dengan sangat baik dan mampu mengembangkan kreativitas dalam berbagai informasi." },
    { no: 10, nama: "Seni dan Prakarya (Seni Musik)", nilai: 87, deskripsi: "Ananda mempunyai apresiasi yang baik terhadap seni musik dan mampu mengembangkan kreativitas dalam berkarya seni." },
    { no: 11, nama: "Bahasa Jawa", nilai: 86, deskripsi: "Ananda mampu berkomunikasi dalam bahasa Jawa dengan baik dan memahami nilai-nilai budaya Jawa." }
  ];

  // Data ekstrakurikuler
  const ekstrakurikuler = [
    { no: 1, kegiatan: "Pramuka", predikat: "Baik", keterangan: "Aktif dan bertanggung jawab" },
    { no: 2, kegiatan: "Tahfidz Al-Quran", predikat: "Sangat Baik", keterangan: "Hafal Juz 30" },
    { no: 3, kegiatan: "", predikat: "", keterangan: "" },
    { no: 4, kegiatan: "", predikat: "", keterangan: "" },
    { no: 5, kegiatan: "", predikat: "", keterangan: "" },
    { no: 6, kegiatan: "", predikat: "", keterangan: "" }
  ];

  return (
    <div className="detail-raport-container">
      {/* Header */}
      <div className="detail-raport-header">
        <button className="btn-back" onClick={onBack} title="Kembali">
          ←
        </button>
        <div className="header-title">
          <h2>Detail Rapor Siswa</h2>
          <p>Laporan hasil belajar siswa</p>
        </div>
        <button className="btn-print" onClick={handlePrint}>
          <FaPrint /> Cetak Rapor
        </button>
      </div>

      {/* Konten Rapor */}
      <div className="raport-paper">
        {/* Header Sekolah */}
        <div className="raport-header">
          <h1>PENCAPAIAN KOMPETENSI MURID</h1>
          <h2>MA NURUL HUDA</h2>
          <p>Jl. Pendidikan No. 123, Kota Santri, Indonesia</p>
        </div>

        {/* Info Siswa */}
        <div className="student-info-grid">
          <div className="info-left">
            <div className="info-field">
              <label>Nama Murid</label>
              <div className="field-value">{rapor.nama || 'AHMAD FAUZI RAMADHAN'}</div>
            </div>
            <div className="info-field">
              <label>NIS / NISN</label>
              <div className="field-value">{rapor.nis || '2024001'} / {rapor.nisn || '0056789012'}</div>
            </div>
            <div className="info-field">
              <label>Nama Sekolah</label>
              <div className="field-value">MA Nurul Huda</div>
            </div>
            <div className="info-field">
              <label>Alamat</label>
              <div className="field-value">Jl. Pendidikan No. 123, Kota Santri</div>
            </div>
          </div>
          <div className="info-right">
            <div className="info-field">
              <label>Kelas</label>
              <div className="field-value">{rapor.kelas || 'X IPA 1'}</div>
            </div>
            <div className="info-field">
              <label>Fase</label>
              <div className="field-value">D</div>
            </div>
            <div className="info-field">
              <label>Semester</label>
              <div className="field-value">1 (Satu)</div>
            </div>
            <div className="info-field">
              <label>Tahun Pelajaran</label>
              <div className="field-value">2024/2025</div>
            </div>
          </div>
        </div>

        {/* Tabel Nilai Akhir */}
        <div className="section-card">
          <h3 className="section-title">NILAI AKHIR</h3>
          <div className="table-responsive">
            <table className="nilai-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Mata Pelajaran</th>
                  <th>Nilai</th>
                  <th>Capaian Kompetensi</th>
                </tr>
              </thead>
              <tbody>
                {mataPelajaran.map((item) => (
                  <tr key={item.no}>
                    <td className="text-center">{item.no}</td>
                    <td>{item.nama}</td>
                    <td className="text-center nilai">{item.nilai}</td>
                    <td className="deskripsi">{item.deskripsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kokurikuler */}
        <div className="section-card">
          <h3 className="section-title">KOKURIKULER</h3>
          <div className="kokurikuler-content">
            <p>Ananda aktif mengikuti kegiatan membina Al-Quran dan menunjukkan peningkatannya dalam kemampuan membaca dan menghafal ayat-ayat suci.</p>
          </div>
        </div>

        {/* Ekstrakurikuler */}
        <div className="section-card">
          <h3 className="section-title">EKSTRAKURIKULER</h3>
          <div className="table-responsive">
            <table className="ekstra-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Kegiatan Ekstrakurikuler</th>
                  <th>Predikat</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {ekstrakurikuler.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.no || '-'}</td>
                    <td>{item.kegiatan || '-'}</td>
                    <td className="text-center">{item.predikat || '-'}</td>
                    <td>{item.keterangan || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ketidakhadiran */}
        <div className="section-card">
          <h3 className="section-title">KETIDAKHADIRAN</h3>
          <div className="absensi-grid">
            <div className="absensi-item">
              <span className="absensi-label">Sakit</span>
              <span className="absensi-value">2 hari</span>
            </div>
            <div className="absensi-item">
              <span className="absensi-label">Izin</span>
              <span className="absensi-value">1 hari</span>
            </div>
            <div className="absensi-item">
              <span className="absensi-label">Tanpa Keterangan</span>
              <span className="absensi-value">0 hari</span>
            </div>
          </div>
        </div>

        {/* Catatan Wali Kelas */}
        <div className="section-card">
          <h3 className="section-title">CATATAN WALI KELAS</h3>
          <div className="catatan-content">
            <p>Ananda Ahmad adalah siswa yang rajin dan berprestasi. Terus tingkatkan semangat belajar dan perhatiannya serta dapat mengukur ketepatan tugas belajarnya dalam mengumpulkan tugas tepat waktu.</p>
          </div>
        </div>

        {/* Tanda Tangan */}
        <div className="signature-section">
          <div className="signature-item">
            <p>Mengetahui,</p>
            <p>Orang Tua / Wali</p>
            <div className="signature-line"></div>
            <p>(_____________________)</p>
          </div>
          <div className="signature-item">
            <p>Mengetahui,</p>
            <p>Kepala Sekolah</p>
            <div className="signature-line"></div>
            <p>(_____________________)</p>
            <p className="nip-text">NIP. ________________</p>
          </div>
          <div className="signature-item">
            <p>Wali Kelas</p>
            <div className="signature-line"></div>
            <p>(_____________________)</p>
            <p className="nip-text">NIP. ________________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRaport;