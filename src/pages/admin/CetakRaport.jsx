// src/pages/admin/CetakRaport.jsx
import React, { useState } from 'react';
import './CetakRaport.css';
import * as XLSX from 'xlsx';
import {
  FaSearch, FaPrint, FaFileImport, FaFileExport, FaEye, FaDownload,
  FaChevronLeft, FaChevronRight, FaUserCircle, FaCheckCircle, FaClock, FaTimesCircle
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const CetakRaport = ({ onNavigate }) => {
  const [selectedKelas, setSelectedKelas] = useState('X IPA 1');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const kelasOptions = ['X IPA 1', 'X IPA 2', 'X IPS 1', 'X IPS 2', 'XI IPA 1', 'XI IPA 2', 'XI IPS 1', 'XI IPS 2', 'XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XII IPS 2'];
  const semesterOptions = ['Ganjil', 'Genap'];
  const statusOptions = ['all', 'Siap Cetak', 'Draft', 'Sudah Dicetak'];

  // Data rapor siswa
  const [raporData, setRaporData] = useState([
    { id: 1, foto: 'AF', nis: '2024001', nisn: '0056789012', nama: 'Ahmad Fauzi Ramadhan', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
    { id: 2, foto: 'SA', nis: '2024002', nisn: '0056789013', nama: 'Siti Aisyah Nuraini', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
    { id: 3, foto: 'MR', nis: '2024003', nisn: '0056789014', nama: 'Muhammad Rizki Pratama', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Draft' },
    { id: 4, foto: 'FA', nis: '2024004', nisn: '0056789015', nama: 'Fatimah Azzahra', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
    { id: 5, foto: 'AR', nis: '2024005', nisn: '0056789016', nama: 'Abdul Rahman Hakim', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
    { id: 6, foto: 'KA', nis: '2024006', nisn: '0056789017', nama: 'Khadijah Amani Putri', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
    { id: 7, foto: 'UF', nis: '2024007', nisn: '0056789018', nama: 'Umar Faruq Ibrahim', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
    { id: 8, foto: 'ZS', nis: '2024008', nisn: '0056789019', nama: 'Zahra Safira Ayu', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
    { id: 9, foto: 'AM', nis: '2024009', nisn: '0056789020', nama: 'Ali Mahfud Hidayat', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Draft' },
    { id: 10, foto: 'MS', nis: '2024010', nisn: '0056789021', nama: 'Maryam Salsabila', kelas: 'X IPA 1', semester: 'Ganjil', status: 'Siap Cetak' },
  ]);

  // Filter data
  const filteredData = raporData.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.nis.includes(searchTerm) ||
                          item.nisn.includes(searchTerm);
    const matchesKelas = item.kelas === selectedKelas;
    const matchesSemester = item.semester === selectedSemester;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesKelas && matchesSemester && matchesStatus;
  });

  // Statistik
  const totalSiswa = filteredData.length;
  const siapCetak = filteredData.filter(item => item.status === 'Siap Cetak').length;
  const draft = filteredData.filter(item => item.status === 'Draft').length;
  const sudahDicetak = filteredData.filter(item => item.status === 'Sudah Dicetak').length;

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page === 'prev') setCurrentPage(prev => Math.max(1, prev - 1));
    else if (page === 'next') setCurrentPage(prev => Math.min(totalPages, prev + 1));
    else if (typeof page === 'number') setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  // Navigasi ke halaman Detail Raport
  const handleDetail = (siswa) => {
    if (onNavigate) {
      onNavigate('detail_raport', siswa);
    }
  };

  const handleCetakRaport = (siswa) => {
    alert(`Cetak raport untuk ${siswa.nama} (${siswa.kelas} - Semester ${siswa.semester})`);
  };

  const handleCetakMassal = () => {
    alert('Cetak raport massal untuk semua siswa yang siap cetak');
  };

  const handleTemplate = () => {
    const template = [
      { 'NIS': '2024001', 'Nama Siswa': 'Contoh Nama', 'Kelas': 'X IPA 1', 'Semester': 'Ganjil', 'Status': 'Siap Cetak' }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Cetak Raport');
    XLSX.writeFile(wb, 'template_cetak_raport.xlsx');
    alert('Template berhasil diunduh!');
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      jsonData.forEach((row) => {
        if (row['NIS']) {
          setRaporData(prev => prev.map(siswa => 
            siswa.nis === String(row['NIS']) 
              ? { ...siswa, status: row['Status'] || siswa.status }
              : siswa
          ));
        }
      });
      alert('Data berhasil diimport!');
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const handleExportExcel = () => {
    const exportData = filteredData.map((item, index) => ({
      'No': index + 1,
      'NIS': item.nis,
      'NISN': item.nisn,
      'Nama Siswa': item.nama,
      'Kelas': item.kelas,
      'Semester': item.semester,
      'Status': item.status
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cetak Raport');
    XLSX.writeFile(wb, `cetak_raport_${selectedKelas}_${selectedSemester}.xlsx`);
    alert('Data berhasil diexport ke Excel!');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Siap Cetak':
        return <span className="status-badge status-siap"><FaCheckCircle /> Siap Cetak</span>;
      case 'Draft':
        return <span className="status-badge status-draft"><FaClock /> Draft</span>;
      case 'Sudah Dicetak':
        return <span className="status-badge status-cetak"><FaCheckCircle /> Sudah Dicetak</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="cetak-raport-container">
      <div className="cetak-raport-content">
        {/* Header */}
        <div className="page-header">
          <h1>Cetak Rapor</h1>
          <p>Cetak dokumen rapor siswa</p>
        </div>

        {/* Filter Baris 1: Kelas dan Semester */}
        <div className="filter-row">
          <div className="filter-group">
            <label>Kelas</label>
            <select 
              value={selectedKelas} 
              onChange={(e) => {
                setSelectedKelas(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Semester</label>
            <select 
              value={selectedSemester} 
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              {semesterOptions.map(semester => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistik Cards */}
        <div className="stats-cards">
          <div className="stat-card total">
            <div className="stat-value">{totalSiswa}</div>
            <div className="stat-label">Total Siswa</div>
          </div>
          <div className="stat-card siap">
            <div className="stat-value">{siapCetak}</div>
            <div className="stat-label">Siap Cetak</div>
          </div>
          <div className="stat-card draft">
            <div className="stat-value">{draft}</div>
            <div className="stat-label">Draft</div>
          </div>
          <div className="stat-card cetak">
            <div className="stat-value">{sudahDicetak}</div>
            <div className="stat-label">Sudah Dicetak</div>
          </div>
        </div>

        {/* Baris 2: Cari Siswa, Status, Template, Import, Export */}
        <div className="action-row">
          <div className="search-group">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Cari nama, NIS, atau NISN..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="filter-group status-filter">
            <label>Status</label>
            <select 
              value={selectedStatus} 
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Semua Status' : option}
                </option>
              ))}
            </select>
          </div>
          <div className="action-buttons">
            <button className="btn-template" onClick={handleTemplate}>
              <FiFileText /> Template
            </button>
            <button className="btn-import" onClick={() => document.getElementById('importExcel').click()}>
              <FaFileImport /> Import Excel
            </button>
            <button className="btn-export" onClick={handleExportExcel}>
              <FaFileExport /> Export Excel
            </button>
            <input type="file" id="importExcel" onChange={handleImportExcel} accept=".xlsx, .xls" style={{ display: 'none' }} />
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="raport-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Foto</th>
                <th>NIS</th>
                <th>NISN</th>
                <th>Nama Siswa</th>
                <th>Kelas</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    <div className="avatar-circle">{item.foto}</div>
                  </td>
                  <td>{item.nis}</td>
                  <td>{item.nisn}</td>
                  <td className="student-name">{item.nama}</td>
                  <td>{item.kelas}</td>
                  <td>{item.semester}</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td className="action-cell">
                    <button 
                      className="action-btn detail-btn" 
                      onClick={() => handleDetail(item)}
                      title="Detail Rapor"
                    >
                      <FaEye /> Detail
                    </button>
                    <button 
                      className="action-btn print-btn" 
                      onClick={() => handleCetakRaport(item)}
                      title="Cetak Raport"
                    >
                      <FaPrint /> Cetak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Menampilkan {startIndex + 1}–{Math.min(endIndex, filteredData.length)} dari {filteredData.length} data
            </div>
            <div className="pagination">
              <button className="pagination-arrow" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                <FaChevronLeft /> Prev
              </button>
              <div className="pagination-numbers">
                {getPageNumbers().map((page, idx) => (
                  <button
                    key={idx}
                    className={`pagination-number ${currentPage === page ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="pagination-arrow" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* Cetak Massal Button */}
        <div className="print-massal-section">
          <button className="btn-print-massal" onClick={handleCetakMassal}>
            <FaPrint /> Cetak Massal (Siap Cetak)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CetakRaport;