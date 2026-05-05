// src/pages/admin/AbsensiSiswa.jsx
import React, { useState } from 'react';
import './AbsensiSiswa.css';
import * as XLSX from 'xlsx';
import {
  FaPrint, FaFileImport, FaFileExport, FaSave,
  FaChevronLeft, FaChevronRight, FaCheckCircle, FaTimesCircle, FaUserSlash, FaBed
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const AbsensiSiswa = () => {
  const [selectedKelas, setSelectedKelas] = useState('X IPA 1');
  const [selectedTanggal, setSelectedTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Data siswa
  const [siswaData, setSiswaData] = useState([
    { id: 1, nis: '2024001', nama: 'Ahmad Fauzi Ramadhan', foto: 'AF', kelas: 'X IPA 1', status: 'Hadir', keterangan: '' },
    { id: 2, nis: '2024002', nama: 'Siti Aisyah Nuraini', foto: 'SA', kelas: 'X IPA 1', status: 'Hadir', keterangan: '' },
    { id: 3, nis: '2024003', nama: 'Muhammad Rizki Pratama', foto: 'MR', kelas: 'X IPA 1', status: 'Sakit', keterangan: 'Demam' },
    { id: 4, nis: '2024004', nama: 'Fatimah Azzahra', foto: 'FA', kelas: 'X IPA 1', status: 'Izin', keterangan: 'Ada acara keluarga' },
    { id: 5, nis: '2024005', nama: 'Abdul Rahman Hakim', foto: 'AR', kelas: 'X IPA 1', status: 'Alpha', keterangan: '' },
    { id: 6, nis: '2024006', nama: 'Khadijah Amani Putri', foto: 'KA', kelas: 'X IPA 1', status: 'Hadir', keterangan: '' },
    { id: 7, nis: '2024007', nama: 'Umar Faruq Ibrahim', foto: 'UF', kelas: 'X IPA 1', status: 'Hadir', keterangan: '' },
    { id: 8, nis: '2024008', nama: 'Zahra Safira Ayu', foto: 'ZS', kelas: 'X IPA 1', status: 'Hadir', keterangan: '' },
    { id: 9, nis: '2024009', nama: 'Ali Mahfud Hidayat', foto: 'AM', kelas: 'X IPA 1', status: 'Hadir', keterangan: '' },
    { id: 10, nis: '2024010', nama: 'Maryam Salsabila', foto: 'MS', kelas: 'X IPA 1', status: 'Hadir', keterangan: '' }
  ]);

  const kelasOptions = ['X IPA 1', 'X IPA 2', 'X IPS 1', 'X IPS 2', 'XI IPA 1', 'XI IPA 2', 'XI IPS 1', 'XI IPS 2', 'XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XII IPS 2'];

  // Filter data berdasarkan kelas
  const filteredData = siswaData.filter(item => item.kelas === selectedKelas);
  
  // Hitung statistik
  const totalSiswa = filteredData.length;
  const hadir = filteredData.filter(item => item.status === 'Hadir').length;
  const sakit = filteredData.filter(item => item.status === 'Sakit').length;
  const izin = filteredData.filter(item => item.status === 'Izin').length;
  const alpha = filteredData.filter(item => item.status === 'Alpha').length;

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

  const handleStatusChange = (id, newStatus) => {
    setSiswaData(siswaData.map(siswa => 
      siswa.id === id ? { ...siswa, status: newStatus, keterangan: newStatus === 'Sakit' ? 'Sakit' : newStatus === 'Izin' ? 'Izin' : '' } : siswa
    ));
  };

  const handleKeteranganChange = (id, keterangan) => {
    setSiswaData(siswaData.map(siswa => 
      siswa.id === id ? { ...siswa, keterangan } : siswa
    ));
  };

  const handleSaveAbsensi = () => {
    alert('Absensi berhasil disimpan!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTemplate = () => {
    const template = [
      { 'NIS': '2024001', 'Nama Siswa': 'Contoh Nama', 'Status': 'Hadir/Sakit/Izin/Alpha', 'Keterangan': 'Opsional' }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Absensi');
    XLSX.writeFile(wb, 'template_absensi_siswa.xlsx');
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
        if (row['NIS'] && row['Status']) {
          setSiswaData(prev => prev.map(siswa => 
            siswa.nis === String(row['NIS']) 
              ? { ...siswa, status: row['Status'], keterangan: row['Keterangan'] || '' }
              : siswa
          ));
        }
      });
      alert('Data absensi berhasil diimport!');
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const handleExportExcel = () => {
    const exportData = filteredData.map((item, index) => ({
      'No': index + 1,
      'NIS': item.nis,
      'Nama Siswa': item.nama,
      'Status': item.status,
      'Keterangan': item.keterangan
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Absensi_${selectedTanggal}`);
    XLSX.writeFile(wb, `absensi_${selectedTanggal}.xlsx`);
    alert('Data berhasil diexport ke Excel!');
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

  return (
    <div className="absensi-container">
      <div className="absensi-content">
        {/* Header */}
        <div className="page-header">
          <h1>Absensi Siswa</h1>
          <p>Kelola kehadiran siswa</p>
        </div>

        {/* Filter Section */}
        <div className="filter-bar">
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
            <label>Tanggal</label>
            <input 
              type="date" 
              value={selectedTanggal} 
              onChange={(e) => setSelectedTanggal(e.target.value)}
              className="filter-date"
            />
          </div>
        </div>

        {/* Stats Cards - Warna Netral */}
        <div className="stats-cards">
          <div className="stat-card total">
            <div className="stat-value">{totalSiswa}</div>
            <div className="stat-label">Total Siswa</div>
          </div>
          <div className="stat-card hadir">
            <div className="stat-value">{hadir}</div>
            <div className="stat-label">Hadir</div>
          </div>
          <div className="stat-card sakit">
            <div className="stat-value">{sakit}</div>
            <div className="stat-label">Sakit</div>
          </div>
          <div className="stat-card izin">
            <div className="stat-value">{izin}</div>
            <div className="stat-label">Izin</div>
          </div>
          <div className="stat-card alpha">
            <div className="stat-value">{alpha}</div>
            <div className="stat-label">Alpha</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-print" onClick={handlePrint}>
            <FaPrint /> Print
          </button>
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

        {/* Table */}
        <div className="table-responsive">
          <table className="absensi-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Foto</th>
                <th>NIS</th>
                <th>Nama Siswa</th>
                <th colSpan="4">Status Kehadiran</th>
                <th>Keterangan</th>
              </tr>
              <tr className="sub-header">
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Hadir</th>
                <th>Sakit</th>
                <th>Izin</th>
                <th>Alpha</th>
                <th></th>
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
                  <td className="student-name">{item.nama}</td>
                  <td className="status-radio">
                    <input
                      type="radio"
                      name={`status_${item.id}`}
                      checked={item.status === 'Hadir'}
                      onChange={() => handleStatusChange(item.id, 'Hadir')}
                    />
                  </td>
                  <td className="status-radio">
                    <input
                      type="radio"
                      name={`status_${item.id}`}
                      checked={item.status === 'Sakit'}
                      onChange={() => handleStatusChange(item.id, 'Sakit')}
                    />
                  </td>
                  <td className="status-radio">
                    <input
                      type="radio"
                      name={`status_${item.id}`}
                      checked={item.status === 'Izin'}
                      onChange={() => handleStatusChange(item.id, 'Izin')}
                    />
                  </td>
                  <td className="status-radio">
                    <input
                      type="radio"
                      name={`status_${item.id}`}
                      checked={item.status === 'Alpha'}
                      onChange={() => handleStatusChange(item.id, 'Alpha')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="keterangan-input"
                      placeholder="Keterangan"
                      value={item.keterangan}
                      onChange={(e) => handleKeteranganChange(item.id, e.target.value)}
                      disabled={item.status === 'Hadir' || item.status === 'Alpha'}
                    />
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

        {/* Save Button */}
        <div className="save-section">
          <button className="btn-save" onClick={handleSaveAbsensi}>
            <FaSave /> Simpan Absensi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbsensiSiswa;