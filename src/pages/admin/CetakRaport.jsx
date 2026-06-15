// src/pages/admin/CetakRaport.jsx
import React, { useState } from 'react';
import './CetakRaport.css';
import * as XLSX from 'xlsx';
import {
  FaSearch, FaPrint, FaFileImport, FaFileExport, FaEye,
  FaChevronLeft, FaChevronRight, FaCheckCircle, FaClock
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const CetakRaport = ({ onNavigate }) => {
  const [jenisRapor, setJenisRapor] = useState('semester');
  const [selectedKelas, setSelectedKelas] = useState('X IPA 1');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const kelasOptions = ['X IPA 1', 'X IPA 2', 'X IPS 1', 'X IPS 2', 'XI IPA 1', 'XI IPA 2', 'XI IPS 1', 'XI IPS 2', 'XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XII IPS 2'];
  const semesterOptions = ['Ganjil', 'Genap'];
  const statusOptions = ['all', 'Siap Cetak', 'Draft', 'Sudah Dicetak'];

  // Data contoh (dengan jenisRapor)
  const [raporData, setRaporData] = useState([
    { id: 1, foto: 'AF', nis: '2024001', nisn: '0056789012', nama: 'Ahmad Fauzi', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak', jenisRapor: 'semester' },
    { id: 2, foto: 'SA', nis: '2024002', nisn: '0056789013', nama: 'Siti Aisyah', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak', jenisRapor: 'semester' },
    { id: 3, foto: 'MR', nis: '2024003', nisn: '0056789014', nama: 'Muhammad Rizki', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Draft', jenisRapor: 'semester' },
    { id: 11, foto: 'AR', nis: '2024011', nisn: '0056789022', nama: 'Arjuna Wijaya', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak', jenisRapor: 'tengah_semester' },
    { id: 12, foto: 'DN', nis: '2024012', nisn: '0056789023', nama: 'Dewi Nirmala', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Draft', jenisRapor: 'tengah_semester' },
  ]);

  // Filter data
  const filteredData = raporData.filter(item => {
    return item.jenisRapor === jenisRapor &&
           item.kelas === selectedKelas &&
           item.semester === selectedSemester &&
           (item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nis.includes(searchTerm) ||
            item.nisn.includes(searchTerm)) &&
           (selectedStatus === 'all' || item.status === selectedStatus);
  });

  const totalSiswa = filteredData.length;
  const siapCetak = filteredData.filter(i => i.status === 'Siap Cetak').length;
  const draft = filteredData.filter(i => i.status === 'Draft').length;
  const sudahDicetak = filteredData.filter(i => i.status === 'Sudah Dicetak').length;

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page === 'prev') setCurrentPage(prev => Math.max(1, prev - 1));
    else if (page === 'next') setCurrentPage(prev => Math.min(totalPages, prev + 1));
    else setCurrentPage(page);
  };

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) pages.push(i);
    else {
      if (currentPage <= 3) pages = [1,2,3,4, '...', totalPages];
      else if (currentPage >= totalPages - 2) pages = [1, '...', totalPages-3, totalPages-2, totalPages-1, totalPages];
      else pages = [1, '...', currentPage-1, currentPage, currentPage+1, '...', totalPages];
    }
    return pages;
  };

  const handleDetail = (siswa) => onNavigate && onNavigate('detail_raport', siswa);
  const handleCetakRaport = (siswa) => alert(`Cetak ${jenisRapor === 'semester' ? 'Rapor Semester' : 'Rapor Tengah Semester'} untuk ${siswa.nama}`);
  const handleCetakMassal = () => alert(`Cetak massal ${jenisRapor === 'semester' ? 'Rapor Semester' : 'Rapor Tengah Semester'}`);

  const handleTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([{ NIS: '2024001', Nama: 'Contoh', Kelas: 'X IPA 1', Semester: 'Ganjil', JenisRapor: jenisRapor }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, `template_${jenisRapor}.xlsx`);
  };

  const handleExportExcel = () => {
    const exportData = filteredData.map((item, idx) => ({ No: idx+1, NIS: item.nis, NISN: item.nisn, Nama: item.nama, Kelas: item.kelas, Semester: item.semester, Status: item.status }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CetakRaport');
    XLSX.writeFile(wb, `cetak_${jenisRapor}_${selectedKelas}.xlsx`);
  };

  const getStatusBadge = (status) => {
    if (status === 'Siap Cetak') return <span className="badge siap"><FaCheckCircle /> Siap Cetak</span>;
    if (status === 'Draft') return <span className="badge draft"><FaClock /> Draft</span>;
    if (status === 'Sudah Dicetak') return <span className="badge cetak"><FaCheckCircle /> Sudah Dicetak</span>;
    return <span className="badge">{status}</span>;
  };

  return (
    <div className="cetak-raport-container">
      <div className="cetak-raport-content">
        <div className="page-header">
          <h1>Cetak Rapor</h1>
          <p>Cetak dokumen rapor siswa</p>
        </div>

        {/* Pilihan Jenis Rapor - DIPERBAIKI */}
        <div className="jenis-rapor-section">
          <span className="jenis-rapor-title">Jenis Rapor :</span>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" value="semester" checked={jenisRapor === 'semester'} onChange={() => setJenisRapor('semester')} />
              <span>Rapor Semester</span>
            </label>
            <label className="radio-option">
              <input type="radio" value="tengah_semester" checked={jenisRapor === 'tengah_semester'} onChange={() => setJenisRapor('tengah_semester')} />
              <span>Rapor Tengah Semester</span>
            </label>
          </div>
        </div>

        {/* Filter Kelas & Semester */}
        <div className="filter-row">
          <div className="filter-group">
            <label>Kelas</label>
            <select value={selectedKelas} onChange={(e) => setSelectedKelas(e.target.value)}>
              {kelasOptions.map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Semester</label>
            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
              {semesterOptions.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Statistik */}
        <div className="stats-cards">
          <div className="stat-card"><div className="value">{totalSiswa}</div><div className="label">Total Siswa</div></div>
          <div className="stat-card"><div className="value">{siapCetak}</div><div className="label">Siap Cetak</div></div>
          <div className="stat-card"><div className="value">{draft}</div><div className="label">Draft</div></div>
          <div className="stat-card"><div className="value">{sudahDicetak}</div><div className="label">Sudah Dicetak</div></div>
        </div>

        {/* Search & Aksi */}
        <div className="action-row">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Cari nama, NIS, atau NISN..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              {statusOptions.map(s => <option key={s} value={s}>{s === 'all' ? 'Semua Status' : s}</option>)}
            </select>
          </div>
          <div className="action-buttons">
            <button onClick={handleTemplate}><FiFileText /> Template</button>
            <button onClick={() => document.getElementById('importExcel').click()}><FaFileImport /> Import Excel</button>
            <button onClick={handleExportExcel}><FaFileExport /> Export Excel</button>
            <input id="importExcel" type="file" style={{ display: 'none' }} />
          </div>
        </div>

        {/* Tabel */}
        <div className="table-responsive">
          <table className="raport-table">
            <thead>
              <tr><th>No</th><th>Foto</th><th>NIS</th><th>NISN</th><th>Nama Siswa</th><th>Kelas</th><th>Semester</th><th>Status</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={item.id}>
                  <td>{startIndex + idx + 1}</td>
                  <td><div className="avatar">{item.foto}</div></td>
                  <td>{item.nis}</td><td>{item.nisn}</td>
                  <td className="nama">{item.nama}</td>
                  <td>{item.kelas}</td><td>{item.semester}</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td className="actions">
                    <button className="btn-detail" onClick={() => handleDetail(item)}><FaEye /> Detail</button>
                    <button className="btn-cetak" onClick={() => handleCetakRaport(item)}><FaPrint /> Cetak</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="pagination">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}><FaChevronLeft /> Prev</button>
            {getPageNumbers().map((p, i) => (
              <button key={i} className={p === currentPage ? 'active' : ''} onClick={() => typeof p === 'number' && handlePageChange(p)} disabled={p === '...'}>{p}</button>
            ))}
            <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next <FaChevronRight /></button>
          </div>
        )}

        <div className="print-massal">
          <button onClick={handleCetakMassal}><FaPrint /> Cetak Massal (Siap Cetak)</button>
        </div>
      </div>
    </div>
  );
};

export default CetakRaport;