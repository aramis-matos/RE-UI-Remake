import React, { useState } from "react";
import img1 from "./contactUsPage.jpg"; // Import the image file
import ContactModalOnPage from "./ContactModalOnPage"; // Assuming you have a ContactModalOnPage component

const HelpModalOnPage = ({ isOpen, onClose, children }) => {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  if (!isOpen) return null;

  return (
    <div className="help-page-modal-overlay">
      <div className="help-page-modal-content">
        {showImage ? (
          <div className="image-container">
            <img src={img1} alt="Contact Us" />
            <button className="help-page-close-button" onClick={toggleImage}>
              Back to Help
            </button>
          </div>
        ) : (
          <div className="contact-modal">
            <button
              className="contact-page"
              id="contactButton"
              data-testid="openContact"
              onClick={toggleImage}
            >
              Contact Us
            </button>
            <button className="help-page-close-button" onClick={onClose}>
              back
            </button>
            {children}
          </div>
        )}
        <ContactModalOnPage isOpen={showImage} onClose={toggleImage} />
      </div>
    </div>
  );
};

export default HelpModalOnPage;