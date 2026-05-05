// src/pages/admin/InputNilai.jsx
import React, { useState } from 'react';
import './InputNilai.css';
import * as XLSX from 'xlsx';
import {
  FaSearch, FaSave, FaFileImport, FaFileExport, 
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

const InputNilai = () => {
  const [selectedKelas, setSelectedKelas] = useState('X IPA 1');
  const [selectedMapel, setSelectedMapel] = useState('Matematika');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const kelasOptions = ['X IPA 1', 'X IPA 2', 'X IPS 1', 'X IPS 2', 'XI IPA 1', 'XI IPA 2', 'XI IPS 1', 'XI IPS 2', 'XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XII IPS 2'];
  const mapelOptions = ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS', 'Al-Quran Hadits', 'Fiqih', 'Akidah Akhlak', 'Sejarah Kebudayaan Islam', 'Bahasa Arab', 'PKN', 'Seni Budaya', 'PJOK'];

  // Data nilai siswa
  const [nilaiData, setNilaiData] = useState([
    { id: 1, foto: 'AF', nis: '2024001', nama: 'Ahmad Fauzi Ramadhan', nilaiHarian: 85, nilaiUTS: 88, nilaiUAS: 90, nilaiAkhir: 88, predikat: 'A' },
    { id: 2, foto: 'SA', nis: '2024002', nama: 'Siti Aisyah Nuraini', nilaiHarian: 90, nilaiUTS: 92, nilaiUAS: 95, nilaiAkhir: 92, predikat: 'A' },
    { id: 3, foto: 'MR', nis: '2024003', nama: 'Muhammad Rizki Pratama', nilaiHarian: 78, nilaiUTS: 80, nilaiUAS: 82, nilaiAkhir: 80, predikat: 'B' },
    { id: 4, foto: 'FA', nis: '2024004', nama: 'Fatimah Azzahra', nilaiHarian: 88, nilaiUTS: 85, nilaiUAS: 87, nilaiAkhir: 87, predikat: 'A' },
    { id: 5, foto: 'AR', nis: '2024005', nama: 'Abdul Rahman Hakim', nilaiHarian: 75, nilaiUTS: 78, nilaiUAS: 80, nilaiAkhir: 78, predikat: 'B' },
    { id: 6, foto: 'KA', nis: '2024006', nama: 'Khadijah Amani Putri', nilaiHarian: 92, nilaiUTS: 95, nilaiUAS: 93, nilaiAkhir: 93, predikat: 'A' },
    { id: 7, foto: 'UF', nis: '2024007', nama: 'Umar Faruq Ibrahim', nilaiHarian: 70, nilaiUTS: 72, nilaiUAS: 75, nilaiAkhir: 72, predikat: 'B' },
    { id: 8, foto: 'ZS', nis: '2024008', nama: 'Zahra Safira Ayu', nilaiHarian: 95, nilaiUTS: 98, nilaiUAS: 96, nilaiAkhir: 96, predikat: 'A' },
    { id: 9, foto: 'AM', nis: '2024009', nama: 'Ali Mahfud Hidayat', nilaiHarian: 82, nilaiUTS: 85, nilaiUAS: 88, nilaiAkhir: 85, predikat: 'A' },
    { id: 10, foto: 'MS', nis: '2024010', nama: 'Maryam Salsabila', nilaiHarian: 88, nilaiUTS: 90, nilaiUAS: 92, nilaiAkhir: 90, predikat: 'A' },
  ]);

  // Filter data berdasarkan pencarian
  const filteredData = nilaiData.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nis.includes(searchTerm)
  );

  // Hitung nilai akhir dan predikat
  const hitungNilaiAkhir = (harian, uts, uas) => {
    const akhir = (harian * 0.3) + (uts * 0.3) + (uas * 0.4);
    return Math.round(akhir);
  };

  const getPredikat = (nilai) => {
    if (nilai >= 85) return 'A';
    if (nilai >= 75) return 'B';
    if (nilai >= 60) return 'C';
    if (nilai >= 50) return 'D';
    return 'E';
  };

  // Handle perubahan nilai
  const handleNilaiChange = (id, field, value) => {
    const numValue = parseInt(value) || 0;
    setNilaiData(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: numValue };
        const nilaiAkhir = hitungNilaiAkhir(updated.nilaiHarian, updated.nilaiUTS, updated.nilaiUAS);
        updated.nilaiAkhir = nilaiAkhir;
        updated.predikat = getPredikat(nilaiAkhir);
        return updated;
      }
      return item;
    }));
  };

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

  const handleSaveNilai = () => {
    alert('Nilai berhasil disimpan!');
  };

  const handleTemplate = () => {
    const template = [
      { 'NIS': '2024001', 'Nama Siswa': 'Contoh Nama', 'Nilai Harian (30%)': 85, 'Nilai UTS (30%)': 88, 'Nilai UAS (40%)': 90 }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Nilai');
    XLSX.writeFile(wb, 'template_input_nilai.xlsx');
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
          setNilaiData(prev => prev.map(siswa => 
            siswa.nis === String(row['NIS']) 
              ? { 
                  ...siswa, 
                  nilaiHarian: row['Nilai Harian (30%)'] || siswa.nilaiHarian,
                  nilaiUTS: row['Nilai UTS (30%)'] || siswa.nilaiUTS,
                  nilaiUAS: row['Nilai UAS (40%)'] || siswa.nilaiUAS
                }
              : siswa
          ));
        }
      });
      alert('Data nilai berhasil diimport!');
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const handleExportExcel = () => {
    const exportData = filteredData.map((item, index) => ({
      'No': index + 1,
      'NIS': item.nis,
      'Nama Siswa': item.nama,
      'Nilai Harian (30%)': item.nilaiHarian,
      'Nilai UTS (30%)': item.nilaiUTS,
      'Nilai UAS (40%)': item.nilaiUAS,
      'Nilai Akhir': item.nilaiAkhir,
      'Predikat': item.predikat
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Input Nilai');
    XLSX.writeFile(wb, `input_nilai_${selectedKelas}_${selectedMapel}.xlsx`);
    alert('Data berhasil diexport ke Excel!');
  };

  return (
    <div className="input-nilai-container">
      <div className="input-nilai-content">
        {/* Header */}
        <div className="page-header">
          <h1>Input Nilai Siswa</h1>
          <p>Kelola nilai siswa per mata pelajaran</p>
        </div>

        {/* Baris 1: Kelas dan Mata Pelajaran */}
        <div className="filter-row">
          <div className="filter-group">
            <label>Kelas</label>
            <select 
              value={selectedKelas} 
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="filter-select"
            >
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Mata Pelajaran</label>
            <select 
              value={selectedMapel} 
              onChange={(e) => setSelectedMapel(e.target.value)}
              className="filter-select"
            >
              {mapelOptions.map(mapel => (
                <option key={mapel} value={mapel}>{mapel}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Baris 2: Cari Siswa, Template, Import Excel, Export Excel (sejajar) */}
        <div className="action-row">
          <div className="search-group">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Cari nama atau NIS..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
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
          <table className="nilai-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Foto</th>
                <th>NIS</th>
                <th>Nama Siswa</th>
                <th>Nilai Harian<br/>(30%)</th>
                <th>Nilai UTS<br/>(30%)</th>
                <th>Nilai UAS<br/>(40%)</th>
                <th>Nilai Akhir</th>
                <th>Predikat</th>
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
                  <td className="nilai-cell">
                    <input
                      type="number"
                      className="nilai-input"
                      value={item.nilaiHarian}
                      onChange={(e) => handleNilaiChange(item.id, 'nilaiHarian', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="nilai-cell">
                    <input
                      type="number"
                      className="nilai-input"
                      value={item.nilaiUTS}
                      onChange={(e) => handleNilaiChange(item.id, 'nilaiUTS', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="nilai-cell">
                    <input
                      type="number"
                      className="nilai-input"
                      value={item.nilaiUAS}
                      onChange={(e) => handleNilaiChange(item.id, 'nilaiUAS', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="nilai-akhir">{item.nilaiAkhir}</td>
                  <td className={`predikat predikat-${item.predikat.toLowerCase()}`}>{item.predikat}</td>
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
          <button className="btn-save" onClick={handleSaveNilai}>
            <FaSave /> Simpan Nilai
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNilai;