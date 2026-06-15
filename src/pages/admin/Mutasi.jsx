import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './Mutasi.css';

const Mutasi = () => {
  // State untuk jenis mutasi: 'masuk' atau 'keluar'
  const [jenisMutasi, setJenisMutasi] = useState('masuk');

  // Data Mutasi Masuk
  const [mutasiMasuk, setMutasiMasuk] = useState([
    { id: 1, namaSiswa: 'Ahmad Fauzi', asalSekolah: 'SMP Negeri 1', tanggalMasuk: '2026-01-10', kelasDiterima: 'X-1', alasan: 'Pindahan' },
    { id: 2, namaSiswa: 'Siti Aminah', asalSekolah: 'MTs Al-Ikhlas', tanggalMasuk: '2026-02-01', kelasDiterima: 'IX-2', alasan: 'Pindah orang tua' },
  ]);

  // Data Mutasi Keluar
  const [mutasiKeluar, setMutasiKeluar] = useState([
    { id: 1, namaSiswa: 'Budi Santoso', tujuanSekolah: 'SMA Negeri 5', tanggalKeluar: '2026-01-20', kelasAsal: 'XI-1', alasan: 'Pindah domisili' },
    { id: 2, namaSiswa: 'Dewi Lestari', tujuanSekolah: 'SMK PGRI', tanggalKeluar: '2026-02-15', kelasAsal: 'XII-2', alasan: 'Pindah sekolah' },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({});

  // Pilihan kelas untuk form masuk (disesuaikan dengan data kelas sebenarnya)
  const kelasOptions = ['X-1', 'X-2', 'XI-1', 'XI-2', 'XII-1', 'XII-2', 'VII-1', 'VII-2', 'VIII-1', 'VIII-2', 'IX-1', 'IX-2'];

  // Pilihan kelas asal untuk mutasi keluar
  const kelasAsalOptions = kelasOptions;

  const handleJenisChange = (jenis) => {
    setJenisMutasi(jenis);
    setShowModal(false);
    setEditMode(false);
  };

  // Tambah data
  const handleAdd = () => {
    setEditMode(false);
    if (jenisMutasi === 'masuk') {
      setFormData({ namaSiswa: '', asalSekolah: '', tanggalMasuk: '', kelasDiterima: 'X-1', alasan: '' });
    } else {
      setFormData({ namaSiswa: '', tujuanSekolah: '', tanggalKeluar: '', kelasAsal: 'X-1', alasan: '' });
    }
    setShowModal(true);
  };

  // Edit data
  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    if (jenisMutasi === 'masuk') {
      setFormData({
        namaSiswa: item.namaSiswa,
        asalSekolah: item.asalSekolah,
        tanggalMasuk: item.tanggalMasuk,
        kelasDiterima: item.kelasDiterima,
        alasan: item.alasan,
      });
    } else {
      setFormData({
        namaSiswa: item.namaSiswa,
        tujuanSekolah: item.tujuanSekolah,
        tanggalKeluar: item.tanggalKeluar,
        kelasAsal: item.kelasAsal,
        alasan: item.alasan,
      });
    }
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      if (jenisMutasi === 'masuk') {
        setMutasiMasuk(mutasiMasuk.filter(item => item.id !== id));
      } else {
        setMutasiKeluar(mutasiKeluar.filter(item => item.id !== id));
      }
    }
  };

  const handleSave = () => {
    // Validasi sederhana
    const requiredFields = jenisMutasi === 'masuk' 
      ? ['namaSiswa', 'asalSekolah', 'tanggalMasuk', 'kelasDiterima']
      : ['namaSiswa', 'tujuanSekolah', 'tanggalKeluar', 'kelasAsal'];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert('Semua field harus diisi!');
        return;
      }
    }

    if (editMode) {
      if (jenisMutasi === 'masuk') {
        setMutasiMasuk(mutasiMasuk.map(item =>
          item.id === currentId ? { ...item, ...formData } : item
        ));
      } else {
        setMutasiKeluar(mutasiKeluar.map(item =>
          item.id === currentId ? { ...item, ...formData } : item
        ));
      }
    } else {
      if (jenisMutasi === 'masuk') {
        setMutasiMasuk([...mutasiMasuk, { id: Date.now(), ...formData }]);
      } else {
        setMutasiKeluar([...mutasiKeluar, { id: Date.now(), ...formData }]);
      }
    }
    setShowModal(false);
  };

  const currentData = jenisMutasi === 'masuk' ? mutasiMasuk : mutasiKeluar;

  return (
    <div className="mutasi-container">
      <div className="mutasi-header">
        <h2>Data Mutasi</h2>
        <div className="mutasi-tabs">
          <button 
            className={`tab-btn ${jenisMutasi === 'masuk' ? 'active' : ''}`}
            onClick={() => handleJenisChange('masuk')}
          >
            <FaSignInAlt /> Mutasi Masuk
          </button>
          <button 
            className={`tab-btn ${jenisMutasi === 'keluar' ? 'active' : ''}`}
            onClick={() => handleJenisChange('keluar')}
          >
            <FaSignOutAlt /> Mutasi Keluar
          </button>
        </div>
        <button className="btn-add" onClick={handleAdd}>
          <FaPlus /> Tambah {jenisMutasi === 'masuk' ? 'Mutasi Masuk' : 'Mutasi Keluar'}
        </button>
      </div>

      <div className="table-wrapper">
        {jenisMutasi === 'masuk' ? (
          <table className="mutasi-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>Asal Sekolah</th>
                <th>Tanggal Masuk</th>
                <th>Kelas Diterima</th>
                <th>Alasan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mutasiMasuk.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.namaSiswa}</td>
                  <td>{item.asalSekolah}</td>
                  <td>{item.tanggalMasuk}</td>
                  <td>{item.kelasDiterima}</td>
                  <td>{item.alasan}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit size={14} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id)} title="Hapus">
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="mutasi-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>Tujuan Sekolah</th>
                <th>Tanggal Keluar</th>
                <th>Kelas Asal</th>
                <th>Alasan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mutasiKeluar.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.namaSiswa}</td>
                  <td>{item.tujuanSekolah}</td>
                  <td>{item.tanggalKeluar}</td>
                  <td>{item.kelasAsal}</td>
                  <td>{item.alasan}</td>
                  <td>
                    <div className="action-icons">
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit size={14} />
                      </button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id)} title="Hapus">
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>{editMode ? 'Edit' : 'Tambah'} {jenisMutasi === 'masuk' ? 'Mutasi Masuk' : 'Mutasi Keluar'}</h3>
            
            {jenisMutasi === 'masuk' ? (
              <>
                <div className="modal-field">
                  <label>Nama Siswa</label>
                  <input type="text" value={formData.namaSiswa || ''} onChange={(e) => setFormData({...formData, namaSiswa: e.target.value})} />
                </div>
                <div className="modal-field">
                  <label>Asal Sekolah</label>
                  <input type="text" value={formData.asalSekolah || ''} onChange={(e) => setFormData({...formData, asalSekolah: e.target.value})} />
                </div>
                <div className="modal-field">
                  <label>Tanggal Masuk</label>
                  <input type="date" value={formData.tanggalMasuk || ''} onChange={(e) => setFormData({...formData, tanggalMasuk: e.target.value})} />
                </div>
                <div className="modal-field">
                  <label>Kelas Diterima</label>
                  <select value={formData.kelasDiterima || 'X-1'} onChange={(e) => setFormData({...formData, kelasDiterima: e.target.value})}>
                    {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div className="modal-field">
                  <label>Alasan</label>
                  <textarea rows="2" value={formData.alasan || ''} onChange={(e) => setFormData({...formData, alasan: e.target.value})} />
                </div>
              </>
            ) : (
              <>
                <div className="modal-field">
                  <label>Nama Siswa</label>
                  <input type="text" value={formData.namaSiswa || ''} onChange={(e) => setFormData({...formData, namaSiswa: e.target.value})} />
                </div>
                <div className="modal-field">
                  <label>Tujuan Sekolah</label>
                  <input type="text" value={formData.tujuanSekolah || ''} onChange={(e) => setFormData({...formData, tujuanSekolah: e.target.value})} />
                </div>
                <div className="modal-field">
                  <label>Tanggal Keluar</label>
                  <input type="date" value={formData.tanggalKeluar || ''} onChange={(e) => setFormData({...formData, tanggalKeluar: e.target.value})} />
                </div>
                <div className="modal-field">
                  <label>Kelas Asal</label>
                  <select value={formData.kelasAsal || 'X-1'} onChange={(e) => setFormData({...formData, kelasAsal: e.target.value})}>
                    {kelasAsalOptions.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div className="modal-field">
                  <label>Alasan</label>
                  <textarea rows="2" value={formData.alasan || ''} onChange={(e) => setFormData({...formData, alasan: e.target.value})} />
                </div>
              </>
            )}
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}><FaTimes /> Batal</button>
              <button onClick={handleSave}><FaSave /> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mutasi;