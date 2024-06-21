import React, { useState } from "react";
import img1 from "./contactUsPage.jpg"; // Import the image file

const HelpModalOnPage = ({ isOpen, onClose, children }) => {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  if (!isOpen) return null;

  return (
    <div className="help-page-modal-overlay">
      <div className="help-page-modal-content">
        <div className="contact-modal">
          <button
            className="contact-page"
            id="contactButton"
            data-testid="openContact"
            onClick={toggleImage}
          >
            Contact Us
          </button>
          {showImage && (
            <div className="image-container">
              <img src={img1} alt="Contact Us" />
            </div>
          )}
        </div>
        <button className="help-page-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default HelpModalOnPage;