import React, { useState } from 'react';

const PreferencesOnPage = () => {
  const [preference, setPreference] = useState('');
  const [inputSecuritySystem, setInputSecuritySystem] = useState('');

  const handleChange = (event) => {
    setPreference(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Your Preference is: ${preference}
Classification Secuirty System: ${inputSecuritySystem}`);
  };

  const handleInputChange = (event) => {
    setInputSecuritySystem(event.target.value);
  };

  return (
    <div id="preferencesOnPage" className="preferences_preview_modal">
      <div className="content">
        <div className="preferences-div">
          <h2>PREFERENCES</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="radio"
                id="whiteList"
                name="listType"
                checked={preference === 'White List'}
                onChange={handleChange}
                value="White List"
              />
              <label htmlFor="whiteList">White List</label>
            </div>
            <div>
              <input
                type="radio"
                id="blackList"
                name="listType"
                checked={preference === 'Black List'}
                onChange={handleChange}
                value="Black List"
              />
              <label htmlFor="blackList">Black List</label>
            </div>
            <div>
              <div> 
              </div>
              <label>Classification System:</label>
              <div className='classificationSystemInput'>
                <input
                  type="text"
                  value={inputSecuritySystem}
                  onChange={handleInputChange}
                  placeholder="Enter something..."
                />
              </div>
            </div>
            <button className = "prefSaveButton" type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreferencesOnPage;
