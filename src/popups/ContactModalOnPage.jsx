import React from "react";

const ContactModalOnPage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal-content">
      </div>
    </div>
  );
};

export default ContactModalOnPage;