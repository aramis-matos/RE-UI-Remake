import React, {useState} from 'react'
import axios from 'axios'
//import index from '../../../Backend/index.js'


const RulesetModalOnPage = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

const [newRuleset, setNewRuleset] = useState({
  idRuleset: 3,
  class: 'confidential',
  country: 'USA',
  releasability: 'R1',
  sensor: 'S1',
})

const handleSelectChange = (e) => {
  const {name, value} = e.target;
  setNewRuleset(prevRS =>({...prevRS, [name]:value}))
}

const axiosUse = axios.create({baseURL: 'http://localhost:3306'})
const handleSubmit = (e) => {
  e.preventDefault();
  //const url = "127.0.0.1:3306/"
  axiosUse.post('/new_table',
    newRuleset,
  )
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err))
  alert("Submitted!")
}

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
                <select name='class' onChange = {handleSelectChange}>
                  <option value="unclassified">Unclassified</option>
                  <option value="confidential">Confidential</option>
                  <option value="secret">Secret</option>
                  <option value="topSecret">Top Secret</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Country</h4>
                <select name='country' onChange = {handleSelectChange}>
                  <option value="USA">United States of America</option>
                  <option value="CAN">Canada</option>
                  <option value="MEX">Mexico</option>
                  <option value="FRAN">France</option>
                  <option value="NZLD">New Zealand</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Releaseability</h4>
                <select name='releasability' onChange = {handleSelectChange}>
                  <option value="R1">An Option</option>
                  <option value="R2">Another Option </option>
                  <option value="R3">Some Other Option</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Sensor</h4>
                <select name='sensor' onChange = {handleSelectChange}>
                  <option value="S1">Yet Another Option</option>
                  <option value="S2">Lawd it's an Option</option>
                  <option value="S3">Too Many Options</option>
                  <option value="S4">A man cannot step into the same river twice,
                    for it is not the same river, and he is not the same man.
                  </option>
                </select>
                <button className="ruleset-save-button" onClick={handleSubmit}>Create</button>
              </div>
            </div>
      {children}
    </div>
  </div>
  )
}

export default RulesetModalOnPage