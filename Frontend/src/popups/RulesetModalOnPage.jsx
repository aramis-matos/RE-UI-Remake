import React, { useState } from 'react';
import axios from "axios";

const RulesetModalOnPage = ({isOpen, onClose, children}) =>{

  const [rule, setRule] = useState({
      name : '',
      classification : 'Unclassified',
      country : 'United States of America',
      releaseability : 'An Option',
      sensor : 'Yet Another Option',
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(e.target.name)
    console.log(e.target.value)
    setRule(prevRule => ({...prevRule, [name]: value}))

  }

  const createRuleset = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/new", rule)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("Server Responded")
        } else if (error.request) {
          console.log("Network Error")
        } else {
          console.log(error);
        }
      })
    setRule({
      name : '',
      classification : '',
      country : '',
      releaseability : '',
      sensor : ''
    })
    alert(`Ruleset Created Successfully`);
    onClose();
  }

  if (!isOpen) {return(null)};

    return (
      <div className="ruleset-modal-overlay">
      <div className="ruleset-modal-content">
        <button className="ruleset-close-button" onClick={onClose}>
          &times;
        </button>
        <div className ="rulesetOnPageModalContent">
                <h2>New Ruleset</h2>
                <div className = "rulesetObject" >
                  <h4>Name</h4>
                    <input
                      name="name"
                      id="nameBox"
                      className="nameBox"
                      type="text"
                      placeholder="Enter a name..."
                      onChange={handleInput}
                    ></input>
                  <h4>Classification</h4>
                  <select name="classification" id="classification" onChange={handleInput}>
                    <option value="unclassified">Unclassified</option>
                    <option value="confidential">Confidential</option>
                    <option value="secret">Secret</option>
                    <option value="topSecret">Top Secret</option>
                  </select>
                </div>
                <div className = "rulesetObject" >
                  <h4>Country</h4>
                  <select name="country" id="country" onChange={handleInput}>
                    <option value="United States of America">United States of America</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="France">France</option>
                    <option value="Newfoundland">Newfoundland</option>
                  </select>
                </div>
                <div className = "rulesetObject" onChange={handleInput}>
                  <h4>Releaseability</h4>
                  <select name="releaseability" id="releaseability">
                    <option value="An Option">An Option</option>
                    <option value="Another Option">Another Option</option>
                    <option value="Some Other Option">Some Other Option</option>
                  </select>
                </div>
                <div className = "rulesetObject" >
                  <h4>Sensor</h4>
                  <select name="sensor" id="sensor" onChange={handleInput}>
                    <option value="Yet Another Option">Yet Another Option</option>
                    <option value="Lawd its an Option">Lawd its an Option</option>
                    <option value="Too Many Options">Too Many Options</option>
                    <option value="Sometimes you win, sometimes you learn">Sometimes you win, sometimes you learn</option>
                  </select>
                  <button className="createRulesetButton" id="createRulesetButton" onClick={createRuleset}>Create</button>
                </div>
              </div>
        {children}
      </div>
    </div>
    )
};

export default RulesetModalOnPage
