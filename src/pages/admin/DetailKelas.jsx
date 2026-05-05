// src/pages/admin/DetailKelas.jsx
import React, { useState } from 'react';
import './DetailKelas.css';
import { FaArrowLeft, FaSave, FaUserTie, FaDoorOpen, FaBook, FaGraduationCap, FaCalendarAlt, FaUserGraduate, FaClock, FaEdit, FaTrashAlt, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';

const DetailKelas = ({ kelas, onBack, onSave }) => {
  const [form, setForm] = useState({
    id: kelas?.id || null,
    tingkat: kelas?.tingkat || '',
    kurikulum: kelas?.kurikulum || '',
    jurusan: kelas?.jurusan || '',
    jenisNama: kelas?.nama ? kelas.nama.split(' ').slice(1).join(' ') : '',
    nama: kelas?.nama || '',
    wali: kelas?.wali || '',
    ruangan: kelas?.ruangan || '',
    jumlah: kelas?.jumlah || 32,
    semester: kelas?.semester || 'Ganjil',
    tahunAjaran: kelas?.tahunAjaran || '2025/2026',
  });

  const [isEditing, setIsEditing] = useState(false);
  
  // State untuk edit siswa dan jadwal
  const [isEditingSiswa, setIsEditingSiswa] = useState(false);
  const [isEditingJadwal, setIsEditingJadwal] = useState(false);
  const [editSiswaId, setEditSiswaId] = useState(null);
  const [editJadwalIndex, setEditJadwalIndex] = useState(null);

  // Data 32 siswa
  const [daftarSiswa, setDaftarSiswa] = useState([
    { id: 1, nis: '2024001', nama: 'Ahmad Faiz', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 2, nis: '2024002', nama: 'Fatimah Azzahra', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 3, nis: '2024003', nama: 'Muhammad Rizki', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 4, nis: '2024004', nama: 'Siti Aisyah', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 5, nis: '2024005', nama: 'Abdullah Hasan', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 6, nis: '2024006', nama: 'Nurul Hikmah', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 7, nis: '2024007', nama: 'Muhammad Fadli', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 8, nis: '2024008', nama: 'Zahra Safira', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 9, nis: '2024009', nama: 'Rizki Fadillah', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 10, nis: '2024010', nama: 'Dewi Kartika', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 11, nis: '2024011', nama: 'Hasan Basri', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 12, nis: '2024012', nama: 'Aisyah Putri', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 13, nis: '2024013', nama: 'Muhammad Iqbal', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 14, nis: '2024014', nama: 'Khadijah Amani', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 15, nis: '2024015', nama: 'Umar Faruq', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 16, nis: '2024016', nama: 'Raisa Andini', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 17, nis: '2024017', nama: 'Fajar Siddiq', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 18, nis: '2024018', nama: 'Nadia Rahma', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 19, nis: '2024019', nama: 'Budi Santoso', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 20, nis: '2024020', nama: 'Sinta Dewi', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 21, nis: '2024021', nama: 'Andi Wijaya', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 22, nis: '2024022', nama: 'Maya Sari', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 23, nis: '2024023', nama: 'Rizal Maulana', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 24, nis: '2024024', nama: 'Laila Hasanah', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 25, nis: '2024025', nama: 'Rahmat Hidayat', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 26, nis: '2024026', nama: 'Fadhilah Nur', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 27, nis: '2024027', nama: 'Ilham Prasetyo', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 28, nis: '2024028', nama: 'Rina Safitri', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 29, nis: '2024029', nama: 'Dimas Aditya', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 30, nis: '2024030', nama: 'Putri Amelia', jenisKelamin: 'Perempuan', status: 'Aktif' },
    { id: 31, nis: '2024031', nama: 'Eko Prasetyo', jenisKelamin: 'Laki-laki', status: 'Aktif' },
    { id: 32, nis: '2024032', nama: 'Sarah Mardhiyah', jenisKelamin: 'Perempuan', status: 'Aktif' },
  ]);

  // Data jadwal pelajaran
  const [jadwalPelajaran, setJadwalPelajaran] = useState([
    { hari: 'Senin', jam: '07:00 - 08:30', mapel: 'Matematika', guru: 'Dr. Ahmad Hidayat, M.Pd' },
    { hari: 'Senin', jam: '08:45 - 10:15', mapel: 'Bahasa Indonesia', guru: 'Siti Aminah, S.Pd' },
    { hari: 'Senin', jam: '10:30 - 12:00', mapel: 'Pendidikan Agama', guru: 'Ustadz Ahmad Zaki, S.Pd.I' },
    { hari: 'Selasa', jam: '07:00 - 08:30', mapel: 'IPA', guru: 'Budi Santoso, M.Si' },
    { hari: 'Selasa', jam: '08:45 - 10:15', mapel: 'Bahasa Inggris', guru: 'Nurul Hikmah, S.Pd' },
    { hari: 'Selasa', jam: '10:30 - 12:00', mapel: 'IPS', guru: 'Dewi Kartika, S.Pd' },
    { hari: 'Rabu', jam: '07:00 - 08:30', mapel: 'Tahfidz Quran', guru: 'Ustadzah Fatimah, S.Pd.I' },
    { hari: 'Rabu', jam: '08:45 - 10:15', mapel: 'Prakarya', guru: 'Rina Safitri, S.Pd' },
    { hari: 'Rabu', jam: '10:30 - 12:00', mapel: 'Seni Budaya', guru: 'Andi Wijaya, S.Pd' },
    { hari: 'Kamis', jam: '07:00 - 08:30', mapel: 'Matematika', guru: 'Dr. Ahmad Hidayat, M.Pd' },
    { hari: 'Kamis', jam: '08:45 - 10:15', mapel: 'Bahasa Arab', guru: 'Ustadz Hasan Basri, S.Pd.I' },
    { hari: 'Kamis', jam: '10:30 - 12:00', mapel: 'PKN', guru: 'Dewi Kartika, S.Pd' },
    { hari: 'Jumat', jam: '07:00 - 08:30', mapel: 'Olahraga', guru: 'Andi Wijaya, S.Pd' },
    { hari: 'Jumat', jam: '08:45 - 10:15', mapel: 'Bimbingan Konseling', guru: 'Sinta Dewi, S.Pd' },
  ]);

  // State untuk form tambah/edit siswa
  const [siswaForm, setSiswaForm] = useState({ nis: '', nama: '', jenisKelamin: 'Laki-laki', status: 'Aktif' });
  
  // State untuk form tambah/edit jadwal
  const [jadwalForm, setJadwalForm] = useState({ hari: 'Senin', jam: '', mapel: '', guru: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'tingkat' || name === 'jurusan' || name === 'jenisNama') {
      const newTingkat = name === 'tingkat' ? value : form.tingkat;
      const newJurusan = name === 'jurusan' ? value : form.jurusan;
      const newJenisNama = name === 'jenisNama' ? value : form.jenisNama;
      
      if (newTingkat && newJurusan && newJenisNama) {
        setForm(prev => ({
          ...prev,
          nama: `${newTingkat} ${newJurusan} ${newJenisNama}`.trim()
        }));
      }
    }
  };

  const handleSimpan = () => {
    if (!form.tingkat || !form.kurikulum || !form.jurusan || !form.nama || !form.wali || !form.ruangan) {
      alert('Mohon lengkapi semua field yang bertanda *');
      return;
    }

    const updatedKelas = {
      id: form.id,
      nama: form.nama,
      jumlah: daftarSiswa.length,
      wali: form.wali,
      ruangan: form.ruangan,
      tingkat: form.tingkat,
      jurusan: form.jurusan,
      kurikulum: form.kurikulum,
      semester: form.semester,
      tahunAjaran: form.tahunAjaran,
    };

    if (onSave) {
      onSave(updatedKelas);
    } else {
      console.log('Data tersimpan:', updatedKelas);
      alert('Data kelas berhasil disimpan!');
    }
    
    setIsEditing(false);
    if (onBack && !onSave) {
      onBack();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm({
      id: kelas?.id || null,
      tingkat: kelas?.tingkat || '',
      kurikulum: kelas?.kurikulum || '',
      jurusan: kelas?.jurusan || '',
      jenisNama: kelas?.nama ? kelas.nama.split(' ').slice(1).join(' ') : '',
      nama: kelas?.nama || '',
      wali: kelas?.wali || '',
      ruangan: kelas?.ruangan || '',
      jumlah: kelas?.jumlah || 32,
      semester: kelas?.semester || 'Ganjil',
      tahunAjaran: kelas?.tahunAjaran || '2025/2026',
    });
    setIsEditing(false);
  };

  // CRUD Siswa
  const handleTambahSiswa = () => {
    if (!siswaForm.nis || !siswaForm.nama) {
      alert('NIS dan Nama Siswa wajib diisi!');
      return;
    }
    const newId = Math.max(...daftarSiswa.map(s => s.id), 0) + 1;
    setDaftarSiswa([...daftarSiswa, { id: newId, ...siswaForm }]);
    setSiswaForm({ nis: '', nama: '', jenisKelamin: 'Laki-laki', status: 'Aktif' });
    alert('Siswa berhasil ditambahkan!');
  };

  const handleEditSiswa = (siswa) => {
    setEditSiswaId(siswa.id);
    setSiswaForm({ ...siswa });
  };

  const handleUpdateSiswa = () => {
    setDaftarSiswa(daftarSiswa.map(s => s.id === editSiswaId ? { ...s, ...siswaForm } : s));
    setEditSiswaId(null);
    setSiswaForm({ nis: '', nama: '', jenisKelamin: 'Laki-laki', status: 'Aktif' });
    alert('Data siswa berhasil diupdate!');
  };

  const handleHapusSiswa = (id) => {
    if (window.confirm('Yakin ingin menghapus siswa ini?')) {
      setDaftarSiswa(daftarSiswa.filter(s => s.id !== id));
      alert('Siswa berhasil dihapus!');
    }
  };

  // CRUD Jadwal
  const handleTambahJadwal = () => {
    if (!jadwalForm.jam || !jadwalForm.mapel || !jadwalForm.guru) {
      alert('Jam, Mata Pelajaran, dan Guru wajib diisi!');
      return;
    }
    setJadwalPelajaran([...jadwalPelajaran, { ...jadwalForm }]);
    setJadwalForm({ hari: 'Senin', jam: '', mapel: '', guru: '' });
    alert('Jadwal berhasil ditambahkan!');
  };

  const handleEditJadwal = (index) => {
    setEditJadwalIndex(index);
    setJadwalForm({ ...jadwalPelajaran[index] });
  };

  const handleUpdateJadwal = () => {
    const newJadwal = [...jadwalPelajaran];
    newJadwal[editJadwalIndex] = { ...jadwalForm };
    setJadwalPelajaran(newJadwal);
    setEditJadwalIndex(null);
    setJadwalForm({ hari: 'Senin', jam: '', mapel: '', guru: '' });
    alert('Jadwal berhasil diupdate!');
  };

  const handleHapusJadwal = (index) => {
    if (window.confirm('Yakin ingin menghapus jadwal ini?')) {
      setJadwalPelajaran(jadwalPelajaran.filter((_, i) => i !== index));
      alert('Jadwal berhasil dihapus!');
    }
  };

  const getTingkatBadge = (tingkat) => {
    if (tingkat === 'X') return 'badge-x';
    if (tingkat === 'XI') return 'badge-xi';
    return 'badge-xii';
  };

  return (
    <div className="detail-kelas-container">
      {/* Header */}
      <div className="detail-kelas-header">
        <button className="btn-back" onClick={() => onBack && onBack()} title="Kembali">
          ←
        </button>
        <div className="header-title">
          <h2>Detail Kelas</h2>
          <p>Informasi lengkap dan pengaturan kelas</p>
        </div>
        {!isEditing && (
          <button className="btn-edit-header" onClick={handleEdit}>
            Edit Kelas
          </button>
        )}
      </div>

      {/* Info Card Ringkasan */}
      <div className="info-cards">
        <div className="info-card">
          <div className="info-icon"><FaGraduationCap /></div>
          <div className="info-content">
            <span className="info-label">Nama Kelas</span>
            <span className="info-value">{form.nama || '-'}</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaUserTie /></div>
          <div className="info-content">
            <span className="info-label">Wali Kelas</span>
            <span className="info-value">{form.wali || '-'}</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaDoorOpen /></div>
          <div className="info-content">
            <span className="info-label">Ruangan</span>
            <span className="info-value">{form.ruangan || '-'}</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon"><FaBook /></div>
          <div className="info-content">
            <span className="info-label">Jumlah Siswa</span>
            <span className="info-value">{daftarSiswa.length} Orang</span>
          </div>
        </div>
      </div>

      {/* Form Detail Kelas */}
      <div className="detail-kelas-card">
        <div className="card-header">
          <h3>Informasi Lengkap Kelas</h3>
          {isEditing && <span className="editing-badge">Mode Edit</span>}
        </div>

        <div className="detail-form">
          <div className="detail-form-row">
            <div className="detail-form-group">
              <label>Tingkatan Kelas <span className="required">*</span></label>
              {isEditing ? (
                <select name="tingkat" value={form.tingkat} onChange={handleChange} className="form-control">
                  <option value="">Pilih Tingkatan</option>
                  <option value="X">X (Sepuluh)</option>
                  <option value="XI">XI (Sebelas)</option>
                  <option value="XII">XII (Dua Belas)</option>
                </select>
              ) : (
                <div className="view-mode">
                  <span className={`badge-tingkat ${getTingkatBadge(form.tingkat)}`}>
                    {form.tingkat || '-'}
                  </span>
                </div>
              )}
            </div>

            <div className="detail-form-group">
              <label>Kurikulum <span className="required">*</span></label>
              {isEditing ? (
                <select name="kurikulum" value={form.kurikulum} onChange={handleChange} className="form-control">
                  <option value="">Pilih Kurikulum</option>
                  <option value="Kurikulum 2013">Kurikulum 2013 (K13)</option>
                  <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                  <option value="KTSP">KTSP</option>
                </select>
              ) : (
                <div className="view-mode">
                  <span className="kurikulum-value">{form.kurikulum || '-'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="detail-form-row">
            <div className="detail-form-group">
              <label>Jurusan <span className="required">*</span></label>
              {isEditing ? (
                <select name="jurusan" value={form.jurusan} onChange={handleChange} className="form-control">
                  <option value="">Pilih Jurusan</option>
                  <option value="IPA">IPA</option>
                  <option value="IPS">IPS</option>
                  <option value="Bahasa">Bahasa</option>
                </select>
              ) : (
                <div className="view-mode">
                  <span className="jurusan-value">{form.jurusan || '-'}</span>
                </div>
              )}
            </div>

            <div className="detail-form-group">
              <label>Jenis Nama Kelas</label>
              {isEditing ? (
                <input name="jenisNama" value={form.jenisNama} onChange={handleChange} className="form-control" placeholder="Contoh: IPA 1" />
              ) : (
                <div className="view-mode">
                  <span>{form.jenisNama || '-'}</span>
                </div>
              )}
              {isEditing && <small className="form-hint">*Akan otomatis digabung dengan Tingkatan & Jurusan</small>}
            </div>
          </div>

          <div className="detail-form-row">
            <div className="detail-form-group">
              <label>Nama Kelas <span className="required">*</span></label>
              {isEditing ? (
                <input name="nama" value={form.nama} onChange={handleChange} className="form-control" placeholder="Contoh: X IPA 1" />
              ) : (
                <div className="view-mode">
                  <strong className="nama-kelas">{form.nama || '-'}</strong>
                </div>
              )}
            </div>

            <div className="detail-form-group">
              <label>Wali Kelas <span className="required">*</span></label>
              {isEditing ? (
                <input name="wali" value={form.wali} onChange={handleChange} className="form-control" placeholder="Nama lengkap wali kelas" />
              ) : (
                <div className="view-mode">
                  <span>{form.wali || '-'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="detail-form-row">
            <div className="detail-form-group">
              <label>Ruangan <span className="required">*</span></label>
              {isEditing ? (
                <input name="ruangan" value={form.ruangan} onChange={handleChange} className="form-control" placeholder="Contoh: R.101" />
              ) : (
                <div className="view-mode">
                  <span>{form.ruangan || '-'}</span>
                </div>
              )}
            </div>

            <div className="detail-form-group">
              <label>Semester <span className="required">*</span></label>
              {isEditing ? (
                <select name="semester" value={form.semester} onChange={handleChange} className="form-control">
                  <option value="Ganjil">Semester Ganjil</option>
                  <option value="Genap">Semester Genap</option>
                </select>
              ) : (
                <div className="view-mode">
                  <span>{form.semester === 'Ganjil' ? '📖 Semester Ganjil' : '📘 Semester Genap'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="detail-form-row">
            <div className="detail-form-group">
              <label>Tahun Ajaran <span className="required">*</span></label>
              {isEditing ? (
                <select name="tahunAjaran" value={form.tahunAjaran} onChange={handleChange} className="form-control">
                  <option value="2023/2024">2023/2024</option>
                  <option value="2024/2025">2024/2025</option>
                  <option value="2025/2026">2025/2026</option>
                  <option value="2026/2027">2026/2027</option>
                  <option value="2027/2028">2027/2028</option>
                </select>
              ) : (
                <div className="view-mode">
                  <span><FaCalendarAlt style={{ marginRight: '6px' }} /> {form.tahunAjaran || '-'}</span>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="detail-form-actions">
              <button className="btn-batal" onClick={handleCancel}>Batal</button>
              <button className="btn-simpan-kelas" onClick={handleSimpan}><FaSave /> Simpan Perubahan</button>
            </div>
          )}
        </div>
      </div>

      {/* Jadwal Pelajaran - URUTAN PERTAMA */}
      <div className="detail-section">
        <div className="section-header">
          <h3><FaClock /> Jadwal Pelajaran</h3>
          <div className="section-actions">
            <span className="section-count">Total: {jadwalPelajaran.length} Mapel</span>
            <button className="btn-add" onClick={() => {
              setEditJadwalIndex(null);
              setJadwalForm({ hari: 'Senin', jam: '', mapel: '', guru: '' });
              setIsEditingJadwal(!isEditingJadwal);
            }}>
              <FaPlus /> Tambah Jadwal
            </button>
          </div>
        </div>
        
        {/* Form Tambah/Edit Jadwal */}
        {(isEditingJadwal || editJadwalIndex !== null) && (
          <div className="edit-form-panel">
            <h4>{editJadwalIndex !== null ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h4>
            <div className="edit-form-row">
              <select value={jadwalForm.hari} onChange={(e) => setJadwalForm({ ...jadwalForm, hari: e.target.value })}>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
              </select>
              <input type="text" placeholder="Jam (contoh: 07:00 - 08:30)" value={jadwalForm.jam} onChange={(e) => setJadwalForm({ ...jadwalForm, jam: e.target.value })} />
              <input type="text" placeholder="Mata Pelajaran" value={jadwalForm.mapel} onChange={(e) => setJadwalForm({ ...jadwalForm, mapel: e.target.value })} />
              <input type="text" placeholder="Guru Pengajar" value={jadwalForm.guru} onChange={(e) => setJadwalForm({ ...jadwalForm, guru: e.target.value })} />
              <button className="btn-save-small" onClick={editJadwalIndex !== null ? handleUpdateJadwal : handleTambahJadwal}>
                <FaCheck /> Simpan
              </button>
              <button className="btn-cancel-small" onClick={() => {
                setEditJadwalIndex(null);
                setIsEditingJadwal(false);
                setJadwalForm({ hari: 'Senin', jam: '', mapel: '', guru: '' });
              }}>
                <FaTimes /> Batal
              </button>
            </div>
          </div>
        )}

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Mata Pelajaran</th>
                <th>Guru Pengajar</th>
                <th style={{ width: '120px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jadwalPelajaran.map((jadwal, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{jadwal.hari}</td>
                  <td>{jadwal.jam}</td>
                  <td>{jadwal.mapel}</td>
                  <td>{jadwal.guru}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit-small" onClick={() => handleEditJadwal(index)}>
                        <FaEdit size={18} />
                      </button>
                      <button className="btn-delete-small" onClick={() => handleHapusJadwal(index)}>
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daftar Siswa - URUTAN KEDUA */}
      <div className="detail-section">
        <div className="section-header">
          <h3><FaUserGraduate /> Daftar Siswa</h3>
          <div className="section-actions">
            <span className="section-count">Total: {daftarSiswa.length} Siswa</span>
            <button className="btn-add" onClick={() => {
              setEditSiswaId(null);
              setSiswaForm({ nis: '', nama: '', jenisKelamin: 'Laki-laki', status: 'Aktif' });
              setIsEditingSiswa(!isEditingSiswa);
            }}>
              <FaPlus /> Tambah Siswa
            </button>
          </div>
        </div>

        {/* Form Tambah/Edit Siswa */}
        {(isEditingSiswa || editSiswaId !== null) && (
          <div className="edit-form-panel">
            <h4>{editSiswaId !== null ? 'Edit Siswa' : 'Tambah Siswa Baru'}</h4>
            <div className="edit-form-row">
              <input type="text" placeholder="NIS" value={siswaForm.nis} onChange={(e) => setSiswaForm({ ...siswaForm, nis: e.target.value })} />
              <input type="text" placeholder="Nama Lengkap" value={siswaForm.nama} onChange={(e) => setSiswaForm({ ...siswaForm, nama: e.target.value })} />
              <select value={siswaForm.jenisKelamin} onChange={(e) => setSiswaForm({ ...siswaForm, jenisKelamin: e.target.value })}>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <select value={siswaForm.status} onChange={(e) => setSiswaForm({ ...siswaForm, status: e.target.value })}>
                <option value="Aktif">Aktif</option>
                <option value="Pindah">Pindah</option>
                <option value="Lulus">Lulus</option>
              </select>
              <button className="btn-save-small" onClick={editSiswaId !== null ? handleUpdateSiswa : handleTambahSiswa}>
                <FaCheck /> Simpan
              </button>
              <button className="btn-cancel-small" onClick={() => {
                setEditSiswaId(null);
                setIsEditingSiswa(false);
                setSiswaForm({ nis: '', nama: '', jenisKelamin: 'Laki-laki', status: 'Aktif' });
              }}>
                <FaTimes /> Batal
              </button>
            </div>
          </div>
        )}

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>NIS</th>
                <th>Nama Siswa</th>
                <th>Jenis Kelamin</th>
                <th>Status</th>
                <th style={{ width: '120px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarSiswa.map((siswa, index) => (
                <tr key={siswa.id}>
                  <td>{index + 1}</td>
                  <td>{siswa.nis}</td>
                  <td>{siswa.nama}</td>
                  <td>{siswa.jenisKelamin}</td>
                  <td><span className={`status-${siswa.status.toLowerCase()}`}>{siswa.status}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit-small" onClick={() => handleEditSiswa(siswa)}>
                        <FaEdit size={18} />
                      </button>
                      <button className="btn-delete-small" onClick={() => handleHapusSiswa(siswa.id)}>
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailKelas;