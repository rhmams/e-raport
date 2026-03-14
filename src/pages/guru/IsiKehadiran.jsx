import { useState, useEffect } from "react";
import { X, Check, Calendar } from "lucide-react";
import "./IsiKehadiran.css";

function IsiKehadiran({ isOpen, onClose, kelasData, onSubmit }) {
  const [tanggal, setTanggal] = useState("");
  const [modul, setModul] = useState("");
  const [jamPelajaran, setJamPelajaran] = useState("");
  const [capaianPembelajaran, setCapaianPembelajaran] = useState("");
  const [semuaHadir, setSemuaHadir] = useState(false);
  const [kehadiran, setKehadiran] = useState({});

  // Data siswa contoh (nanti bisa diganti dengan props)
  const siswaList = [
    { nis: "2024001", nama: "Ahmad Fauzan", gender: "L" },
    { nis: "2024002", nama: "Fatimah Azzahra", gender: "P" },
    { nis: "2024003", nama: "Muhammad Rizki", gender: "L" },
    { nis: "2024004", nama: "Khadijah Nur", gender: "P" },
    { nis: "2024005", nama: "Abdullah Hasan", gender: "L" },
  ];

  // Inisialisasi status kehadiran
  useEffect(() => {
    const initialKehadiran = {};
    siswaList.forEach(siswa => {
      initialKehadiran[siswa.nis] = 'H'; // Default Hadir
    });
    setKehadiran(initialKehadiran);
  }, []);

  // Set tanggal hari ini sebagai default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTanggal(today);
  }, []);

  const handleSemuaHadir = () => {
    const newStatus = !semuaHadir;
    setSemuaHadir(newStatus);
    
    const updatedKehadiran = {};
    siswaList.forEach(siswa => {
      updatedKehadiran[siswa.nis] = newStatus ? 'H' : 'H';
    });
    setKehadiran(updatedKehadiran);
  };

  const handleKehadiranChange = (nis, value) => {
    setKehadiran(prev => ({
      ...prev,
      [nis]: value
    }));
  };

  const getGenderIcon = (gender) => {
    return gender === 'L' ? '♂️' : '♀️';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2>Tambah Kehadiran Baru</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Form Section */}
          <div className="form-section">
            <div className="form-group">
              <label>Tanggal Kehadiran</label>
              <div className="date-input-wrapper">
                <Calendar size={18} className="date-icon" />
                <input 
                  type="date" 
                  className="form-input date-input"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Modul</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Contoh: Pengenalan Aljabar"
                value={modul}
                onChange={(e) => setModul(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Jam Pelajaran</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Contoh: 08:00 - 09:30"
                  value={jamPelajaran}
                  onChange={(e) => setJamPelajaran(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Capaian Pembelajaran</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Contoh: Menjelaskan konsep aljabar"
                  value={capaianPembelajaran}
                  onChange={(e) => setCapaianPembelajaran(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-section">
            <div className="table-header">
              <h3>Tandai semua siswa hadir?</h3>
              <button 
                className={`btn-semua-hadir ${semuaHadir ? 'active' : ''}`}
                onClick={handleSemuaHadir}
              >
                <Check size={16} />
                Semua Hadir
              </button>
            </div>

            <div className="table-container">
              <table className="kehadiran-table">
                <thead>
                  <tr>
                    <th>NIS</th>
                    <th>Nama</th>
                    <th>L/P</th>
                    <th>H</th>
                    <th>S</th>
                    <th>I</th>
                    <th>A</th>
                  </tr>
                </thead>
                <tbody>
                  {siswaList.map((siswa) => (
                    <tr key={siswa.nis}>
                      <td>{siswa.nis}</td>
                      <td>{siswa.nama}</td>
                      <td className="gender-cell">{getGenderIcon(siswa.gender)}</td>
                      <td>
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`}
                            checked={kehadiran[siswa.nis] === 'H'}
                            onChange={() => handleKehadiranChange(siswa.nis, 'H')}
                          />
                          <span className="radio-custom"></span>
                        </label>
                      </td>
                      <td>
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`}
                            checked={kehadiran[siswa.nis] === 'S'}
                            onChange={() => handleKehadiranChange(siswa.nis, 'S')}
                          />
                          <span className="radio-custom"></span>
                        </label>
                      </td>
                      <td>
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`}
                            checked={kehadiran[siswa.nis] === 'I'}
                            onChange={() => handleKehadiranChange(siswa.nis, 'I')}
                          />
                          <span className="radio-custom"></span>
                        </label>
                      </td>
                      <td>
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name={`kehadiran-${siswa.nis}`}
                            checked={kehadiran[siswa.nis] === 'A'}
                            onChange={() => handleKehadiranChange(siswa.nis, 'A')}
                          />
                          <span className="radio-custom"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="modal-footer">
          <button className="btn-batal" onClick={onClose}>
            Batal
          </button>
          <button 
            className="btn-simpan" 
            onClick={() => {
              onSubmit({ tanggal, modul, jamPelajaran, capaianPembelajaran, kehadiran });
              onClose();
            }}
          >
            Simpan Kehadiran
          </button>
        </div>
      </div>
    </div>
  );
}

export default IsiKehadiran;