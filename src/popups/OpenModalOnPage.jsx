import React from 'react'


const OpenModalOnPage = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

  return (
    <div className="open-modal-overlay">
    <div className="open-modal-content">
      <button className="open-close-button" onClick={onClose}>
        &times;
      </button>
      <div className ="OpenModalOnPageContent">
        <h2>Rulesets</h2>
        <ul>
            <li>A1B2C: Protected, United States</li>
            <li>D3E4F: Classified, Russia</li>
            <li>G5H6I: Secret, China</li>
            <li>J7K8L: Top Secret, United Kingdom</li>
            <li>M9N0O: Secret, Germany</li>
            <li>P1Q2R: Classified, France</li>
            <li>S3T4U: Top Secret, Australia</li>
            <li>V5W6X: Protected, Japan</li>
        </ul>
              
        </div>
      {children}
    </div>
  </div>
  )
}

export default OpenModalOnPage