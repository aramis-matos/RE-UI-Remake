import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const OpenModalOnPage = ({ isOpen, onClose, children }) => {
    const [rules, setRules] = useState();
    const [reqDone, setReqDone] = useState(false);
    const togglesRef = useRef([]);

    const handleRuleOpen = (key) => {
        const index = key-1;
        const header = document.getElementsByClassName("toggle")[index];
        const details = header.document.getElementsByClassName("details")[0];
        if (details.style.maxHeight == 0) { //Not open to open
            details.style.maxHeight = "80px";
            details.style.opacity = "1"
        } else { //open to not open
            details.style.maxHeight = "0px";
            details.style.opacity = "0"
        }
    }

    if (isOpen) {
            
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

    const handleModalClose = () => {
        onClose();
        setReqDone(false)
    }

    if (!isOpen) return null;

    return reqDone ? (
        <div className="open-modal-overlay">
            <div className="open-modal-content">
                <button className="open-close-button" onClick={handleModalClose}>
                    &times;
                </button>
                <div className="OpenModalOnPageContent">
                    <h2>Rulesets</h2>
                    <ul>
                        {rules.map((rule) => (
                            <li className="toggle" key={rule.id} onClick = {handleRuleOpen(rule.id)}>
                                <span>{rule.Name}</span>
                                <div className="details">
                                    Classification: {rule.Classification}\n
                                    Country: {rule.Country}<br />
                                    Releasability: {rule.Releasability}<br />
                                    Sensor: {rule.Sensor}
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/*
                    <ul>
                        {rules.map((rule) => (
                            <li className="toggle" key={rule[0].id}>
                                <span>{rule[0].Name}</span>
                                <div className="details">
                                    Classification: {rule[0].Classification}<br />
                                    Country: {rule[0].Country} <br />
                                    Releasability: {rule[0].Releasability} <br />
                                    Sensor:{rule[0].Sensor} <br />
                                </div>
                            </li>
                            
                        ))}
                        </ul>
                    
                    
                    
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
                    </ul> */}
                </div>
                {children}
            </div>
        </div>
    ) : (
        <div className="open-modal-overlay">
            <div className="open-modal-content">
                <button className="open-close-button" onClick={handleModalClose}>
                    &times;
                </button>
                <div className="OpenModalOnPageContent">
                    <h2>Rulesets</h2>
                        <p color="grey">Loading...</p>
                </div>
            </div>
        </div>
    )
}

export default OpenModalOnPage;