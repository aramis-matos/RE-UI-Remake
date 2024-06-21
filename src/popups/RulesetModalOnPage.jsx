import React from 'react'


const RulesetModalOnPage = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;


  return (
    <div className="ruleset-modal-overlay">
    <div className="ruleset-modal-content">
      <button className="ruleset-close-button" onClick={onClose}>
        &times;
      </button>
      {children}
    </div>
  </div>
  )
}

export default RulesetModalOnPage