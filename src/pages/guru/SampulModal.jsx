import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import './SampulModal.css';

const SampulModal = ({ isOpen, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('sampul1');
  const templates = [
    { id: 'sampul1', name: 'Sampul 1', image: '/sampul1.png' },
    { id: 'sampul2', name: 'Sampul 2', image: '/sampul2.png' },
  ];

  if (!isOpen) return null;

  const handleDownload = () => {
    alert(`Download template ${selectedTemplate} (simulasi)`);
    onClose();
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="sampul-modal-overlay" onClick={onClose}>
      <div className="sampul-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="sampul-modal-header">
          <h2>📄 Pilih Template Sampul Raport</h2>
          <button className="sampul-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="sampul-modal-body">
          <div className="sampul-preview">
            <img src={currentTemplate?.image || '/placeholder.png'} alt="Preview Sampul" />
          </div>
          <div className="sampul-dropdown-wrapper">
            <label className="sampul-dropdown-label">Pilih Template</label>
            <div className="sampul-select-wrapper">
              <select
                className="sampul-select"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                {templates.map(tpl => (
                  <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
                ))}
              </select>
              <ChevronDown className="sampul-select-icon" size={18} />
            </div>
          </div>
        </div>
        <div className="sampul-modal-footer">
          <button className="sampul-btn-secondary" onClick={onClose}>Batal</button>
          <button className="sampul-btn-primary" onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default SampulModal;