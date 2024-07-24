import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const getRuleset = (rules, setRules, reqDone, setReqDone) => {
        axios
                .get("http://localhost:8080/open")
                .then((response) => {
                    setRules(response.data)
                    
                    setReqDone(true)
                })
                .catch((error) => {
                    if (error.response) {
                        console.log("Server responded with error: ", error.response);
                    } else if (error.request) {
                        console.log("Network error: ", error.request)
                    } else {
                        console.log("Other error: ", error);
                    }
                })
}

const OpenModalOnPage = ({ isOpen, onClose, children }) => {
    const [rules, setRules] = useState();
    const [reqDone, setReqDone] = useState(false);
    const togglesRef = useRef([]);
    useEffect(() => {
        const handleClick = (event) => {
            event.target.children[1].classList.toggle("active");
        };

        if (isOpen) {
            
            getRuleset(rules,setRules,reqDone,setReqDone);
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

    
    const handleModalClose = () => {
        onClose();
        setReqDone(false)
    }
    

    if (!isOpen || !rules) return null;

    return reqDone && rules ? (
        <div className="open-modal-overlay">
            <div className="open-modal-content">
                <button className="open-close-button" onClick={handleModalClose}>
                    &times;
                </button>
                <div className="OpenModalOnPageContent">
                    <h2>Rulesets</h2>
                    <div>
                        {rules.map((rule) => (
                            <li key={rule.id}>Name: {rule.Name + ' | Created: ' + rule.Created}</li>
                        ))}
                    </div>
                    {/* <ul>
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
                    </ul> */}
                </div>
                {children}
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    )
}

export default OpenModalOnPage; 