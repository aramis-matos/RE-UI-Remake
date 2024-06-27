import React from 'react'


const RulesetModalOnPage = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

  return (
    <div className="ruleset-modal-overlay">
    <div className="ruleset-modal-content">
      <button className="ruleset-close-button" onClick={onClose}>
        &times;
      </button>
      <div className ="rulesetOnPageModalContent">
              <h2>New Ruleset</h2>
              <div className = "rulesetObject" >
                <h4>Classification</h4>
                <select>
                  <option value="unclassifiedOp">Unclassified</option>
                  <option value="confidentialOp">Confidential</option>
                  <option value="secretOp">Secret</option>
                  <option value="topSecretOp">Top Secret</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Country</h4>
                <select>
                  <option value="op">United States of America</option>
                  <option value="op">Canada</option>
                  <option value="op">Mexico</option>
                  <option value="op">France</option>
                  <option value="op">Newfoundland</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Releaseability</h4>
                <select>
                  <option value="op">An Option</option>
                  <option value="op">Another Option </option>
                  <option value="op">Some Other Option</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Sensor</h4>
                <select>
                  <option value="op">Yet Another Option</option>
                  <option value="op">Lawd it's an Option</option>
                  <option value="op">Too Many Options</option>
                  <option value="op">A man cannot step into the same river twice,
                    for it is not the same river, and he is not the same man.
                  </option>
                </select>
                <button className="ruleset-save-button">Create</button>
              </div>
            </div>
      {children}
    </div>
  </div>
  )
}

export default RulesetModalOnPage