import React, {useState} from 'react'

const CollapsableFilters = ({ theFunc}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    const defaultChecked = {
        "NITF FILE HEADER": false,
        "IMAGE SUBHEADER": false,
        "GRAPHIC SUBHEADER": false,
        "TEXT SUBHEADER": false,
        "DES SUBHEADER": false,
        TRE: false,
      };
    
      const [checkedItems, setCheckedItems] = useState(defaultChecked);
    
      const items = [
        { id: 1, label: "NITF FILE HEADER" },
        { id: 2, label: "IMAGE SUBHEADER" },
        { id: 3, label: "GRAPHIC SUBHEADER" },
        { id: 4, label: "TEXT SUBHEADER" },
        { id: 5, label: "DES SUBHEADER" },
        { id: 6, label: "TRE" },
      ];
    
      const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Checked items: ${JSON.stringify(checkedItems, null, 2)}`);
      };





    return (
        <div className="collapsible">
          <button onClick={toggleCollapsible} className="collapsible-toggle">
          Filters
          </button>
          {isOpen && (
            <div className="collapsible-content">
              <h2>Filters</h2>
              <div>
            <h5>Filter By Field/Long Name</h5>
            <div className="filterRadioButtons">
              <input
                type="radio"
                id="whiteList"
                name="listType"
                value="White List"
              />
              <label htmlFor="whiteList">Field Name</label>
            </div>
            <div className="filterRadioButtons">
              <input
                type="radio"
                id="blackList"
                name="listType"
                value="Black List"
              />
              <label htmlFor="blackList">Long Name</label>
            </div>
          </div>
          <div className="fieldDiv">
          <h5>Filter By Section</h5>
          <form onSubmit={handleSubmit}>
            {items.map((item) => (
              <div className="filterCheckboxes" key={item.id}>
                <input
                  type="checkbox"
                  name={item.label}
                  onChange={theFunc}
                  id={item.id}
                />
                <label htmlFor={item.id}>{item.label}</label>
              </div>
            ))}
          </form>
        </div>
              
            </div>
          )}
        </div>
      );
    };


export default CollapsableFilters;