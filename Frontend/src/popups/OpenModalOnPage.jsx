import React, { useEffect, useRef } from 'react';

const OpenModalOnPage = ({ isOpen, onClose, children }) => {
    const togglesRef = useRef([]);

    useEffect(() => {
        const handleClick = (event) => {
            event.target.children[1].classList.toggle("active");
        };

        if (isOpen) {
            togglesRef.current = document.querySelectorAll(".toggle");

            togglesRef.current.forEach(toggle => {
                toggle.addEventListener("click", handleClick);
            });
        }

        return () => {
            togglesRef.current.forEach(toggle => {
                toggle.removeEventListener("click", handleClick);
            });
        };
    }, [isOpen]);

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
                        <li className="toggle">
                            <span>A1B2C: Protected, United States</span>
                            <div className="details">
                                Coordinates: 37.7749° N, 122.4194° W<br />
                                Security Level: Protected<br />
                                Description: This location is under federal protection due to its strategic importance.
                            </div>
                        </li>
                        <li className="toggle">
                            <span>D3E4F: Classified, Russia</span>
                            <div className="details">
                                Coordinates: 55.7558° N, 37.6176° E<br />
                                Security Level: Classified<br />
                                Description: This site contains sensitive information crucial to national security.
                            </div>
                        </li>
                        <li className="toggle">
                            
                            <span>G5H6I: Secret, China</span>
                            <div className="details">
                                Coordinates: 39.9042° N, 116.4074° E<br />
                                Security Level: Secret<br />
                                Description: The area is highly restricted and monitored by advanced surveillance systems.
                            </div>
                        </li>
                        <li className="toggle">
                            <span>J7K8L: Top Secret, United Kingdom</span>
                            <div className="details">
                                Coordinates: 51.5074° N, 0.1278° W<br />
                                Security Level: Top Secret<br />
                                Description: The location is a key operational hub for top-secret missions.
                            </div>
                        </li>
                        <li className="toggle">
                            <span>M9N0O: Secret, Germany</span>
                            <div className="details">
                                Coordinates: 52.5200° N, 13.4050° E<br />
                                Security Level: Secret<br />
                                Description: This facility hosts critical infrastructure projects of national importance.
                            </div>
                        </li>
                        <li className="toggle">
                            <span>P1Q2R: Classified, France</span>
                            <div className="details">
                                Coordinates: 48.8566° N, 2.3522° E<br />
                                Security Level: Classified<br />
                                Description: The site is known for housing classified documents and sensitive data.
                            </div>
                        </li>
                        <li className="toggle">
                            <span>S3T4U: Top Secret, Australia</span>
                            <div className="details">
                                Coordinates: -33.8688° S, 151.2093° E<br />
                                Security Level: Top Secret<br />
                                Description: This area is restricted and guarded due to its significance in defense.
                            </div>
                        </li>
                        <li className="toggle">
                            <span>V5W6X: Protected, Japan</span>
                            <div className="details">
                                Coordinates: 35.6895° N, 139.6917° E<br />
                                Security Level: Protected<br />
                                Description: The location is safeguarded because of its critical technological assets.
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