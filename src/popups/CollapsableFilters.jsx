import React, { useState } from 'react';

const CollapsableFilters = ({ theFunc, onFilterChange }) => {
  const [filterValue, setFilterValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [checkedItems, setCheckedItems] = useState({
    "NITF FILE HEADER": false,
    "IMAGE SUBHEADER": false,
    "GRAPHIC SUBHEADER": false,
    "TEXT SUBHEADER": false,
    "DES SUBHEADER": false,
    TRE: false,
  });

  const items = [
    { id: 1, label: "NITF FILE HEADER" },
    { id: 2, label: "IMAGE SUBHEADER" },
    { id: 3, label: "GRAPHIC SUBHEADER" },
    { id: 4, label: "TEXT SUBHEADER" },
    { id: 5, label: "DES SUBHEADER" },
    { id: 6, label: "TRE" },
  ];

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Checked items: ${JSON.stringify(checkedItems, null, 2)}`);
  };

  const handleChange = (e) => {
    const { id } = e.target;
    setSelectedName(id);
    console.log(id);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterValue(value);
    onFilterChange(value);
    console.log(value + " From CollapsableFilters.jsx");
  };

  return (
    <div className="collapsible">
      <button onClick={toggleCollapsible} className="collapsible-toggle">
        Filters
      </button>
      {isOpen && (
        <div className="collapsible-content">
          <h2>Filters</h2>
          <div className="filterByFieldLong" onChange={handleFilterChange}>
            <h4>Filter By Field/Long Name</h4>
            <div className="filterRadioButtons">
              <input
                type="radio"
                id="radioFieldName"
                name="filterType"
                value="Field Name"
              />
              <label htmlFor="radioFieldName">Field Name</label>
            </div>
            <div className="filterRadioButtons">
              <input
                type="radio"
                id="radioLongName"
                name="filterType"
                value="Long Name"
              />
              <label htmlFor="radioLongName">Long Name</label>
            </div>
          </div>
          <div className="fieldDiv">
            <h4>Filter By Section</h4>
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
