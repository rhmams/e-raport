import React, { useState } from 'react';
import { X, ChevronDown, Download } from "lucide-react";
import "./SampulModal.css";

function SampulModal({ isOpen, onClose }) {
  const [selectedTemplate, setSelectedTemplate] = useState('1');

  if (!isOpen) return null;

  // Function untuk download template
  const downloadTemplate = () => {
    const templateName = selectedTemplate === '1' ? 'sampul1.png' : 'sampul2.png';
    const link = document.createElement('a');
    link.href = `/${templateName}`;
    link.download = templateName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container sampul-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>Sampul Raport</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-subtitle">
          Pilih dan download template sampul untuk raport
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Dropdown Pilihan Sampul */}
          <div className="form-section">
            <label className="section-label">Pilih Template Sampul</label>
            <div className="dropdown-wrapper">
              <select 
                className="template-select"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                <option value="1">Sampul 1</option>
                <option value="2">Sampul 2</option>
              </select>
              <ChevronDown className="dropdown-icon" size={18} />
            </div>
          </div>

          {/* Preview Gambar */}
          <div className="preview-section">
            <div className="preview-header">
              <span className="preview-title">Preview Sampul</span>
            </div>
            
            <div className="template-preview">
              <img 
                src={selectedTemplate === '1' ? "/sampul1.png" : "/sampul2.png"} 
                alt={`Template Sampul ${selectedTemplate}`} 
                className="template-image"
              />
            </div>
          </div>

          {/* Info */}
          <div className="info-note">
            <p>Template tersedia dalam format PNG siap cetak.</p>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button className="btn-primary" onClick={downloadTemplate}>
              <Download size={18} style={{ marginRight: '8px' }} />
              Download Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampulModal;