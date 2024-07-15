import React, { useState } from 'react';

const PreferencesOnPage = ({onSelectPreference}) => {
  const [preference, setPreference] = useState('Black List');
  const [inputSecuritySystem, setInputSecuritySystem] = useState('');

  const handleChange = (event) => {
    setPreference(event.target.value);
    handlePreferenceSelect(event);
  };

  const handlePreferenceSelect = (event) => {
    onSelectPreference(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Your Preference is: ${preference}
Classification Security System: ${inputSecuritySystem}`);
  };

  const handleInputChange = (event) => {
    setInputSecuritySystem(event.target.value);
  };

  return (
    <div id="preferencesOnPage" className="preferences_preview_modal">
      <div className="preferences-div">
        <h2>PREFERENCES</h2>
        <form onSubmit={handleSubmit}>
          <div className="preference-option">
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
          <div className="preference-option">
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
          <div className="preference-option">
            <label>Classification System:</label>
            <input
              type="text"
              value={inputSecuritySystem}
              onChange={handleInputChange}
              placeholder="Enter something..."
            />
          </div>
          <button className="prefSaveButton" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PreferencesOnPage;
