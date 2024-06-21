import React from 'react'


const HelpModalOnPage = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;


  return (
    <div className="help-page-modal-overlay">
    <div className="help-page-modal-content">
      <button className="help-page-close-button" onClick={onClose}>
        &times;
      </button>
      {children}
    </div>
  </div>
  )
}

export default HelpModalOnPage