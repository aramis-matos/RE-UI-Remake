import React, { useEffect } from 'react';

const OpenModalOnPage = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const toggles = document.querySelectorAll(".toggle");

        toggles.forEach(function (toggle) {
            toggle.addEventListener("click", function () {
                this.nextElementSibling.classList.toggle("active");
            });
        });

        return () => {
            toggles.forEach(function (toggle) {
                toggle.removeEventListener("click", function () {
                    this.nextElementSibling.classList.toggle("active");
                });
            });
        };
    }, []); 

    if (!isOpen) return null;

    return (
        <div className="open-modal-overlay">
            <div className="open-modal-content">
                <button className="open-close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="OpenModalOnPageContent">
                    <h2>Rulesets</h2>
                    <ul>
                        <li>
                            <span className="toggle">A1B2C: Protected, United States</span>
                            <div className="details">
                                Additional information for A1B2C
                            </div>
                        </li>
                        <li>
                            <span className="toggle">D3E4F: Classified, Russia</span>
                            <div className="details">
                                Additional information for D3E4F
                            </div>
                        </li>
                        <li>
                            <span className="toggle">G5H6I: Secret, China</span>
                            <div className="details">
                                Additional information for G5H6I
                            </div>
                        </li>
                        <li>
                            <span className="toggle">J7K8L: Top Secret, United Kingdom</span>
                            <div className="details">
                                Additional information for J7K8L
                            </div>
                        </li>
                        <li>
                            <span className="toggle">M9N0O: Secret, Germany</span>
                            <div className="details">
                                Additional information for M9N0O
                            </div>
                        </li>
                        <li>
                            <span className="toggle">P1Q2R: Classified, France</span>
                            <div className="details">
                                Additional information for P1Q2R
                            </div>
                        </li>
                        <li>
                            <span className="toggle">S3T4U: Top Secret, Australia</span>
                            <div className="details">
                                Additional information for S3T4U
                            </div>
                        </li>
                        <li>
                            <span className="toggle">V5W6X: Protected, Japan</span>
                            <div className="details">
                                Additional information for V5W6X
                            </div>
                        </li>
                    </ul>
                </div>
                {children}
            </div>
        </div>
    );
}

export default OpenModalOnPage;
