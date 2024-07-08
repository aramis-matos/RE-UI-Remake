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
    const coll = document.getElementsByClassName("collapsible")
    const theFilters = coll[0].getElementsByClassName("collapsible-content");
    const theButton = coll[0].getElementsByClassName("collapsible-toggle");
    const collDivs = coll[0].getElementsByTagName("div")
    const theBoxes = coll[0].getElementsByTagName("input")
    const theLabels = coll[0].getElementsByTagName("label")
    if (theFilters[0].style.visibility == "visible") {
      theButton[0].style.borderRadius= "15px"
      theFilters[0].style.visibility = "hidden"
      theFilters[0].style.maxHeight = "0px"
      theFilters[0].style.padding = "0px"
      for (const div of collDivs) {
        div.style.visibility = "hidden"
        div.style.maxHeight = "0px"
      }
      for (const box of theBoxes) {
        box.style.visibility = "hidden"
        box.style.maxHeight = "0px"
      }
      for (const oneLabel of theLabels) {
        oneLabel.style.visibility = "hidden"
        oneLabel.style.maxHeight = "0px"
      }
    } else {
      theButton[0].style.borderRadius = "15px 15px 0px 0px"
      theFilters[0].style.visibility = "visible"
      theFilters[0].style.maxHeight = "360px"
      theFilters[0].style.padding = "10px"
      for (const div of collDivs) {
        div.style.visibility = "visible"
        div.style.maxHeight = "350px"
      }
      for (const box of theBoxes) {
        box.style.visibility = "visible"
        box.style.maxHeight = "20px"
      }
      for (const oneLabel of theLabels) {
        oneLabel.style.visibility = "visible"
        oneLabel.style.maxHeight = "20px"
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Checked items: ${JSON.stringify(checkedItems, null, 2)}`);
  };

  const handleChange = (e) => {
    const { id } = e.target;
    setSelectedName(id);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <div className="collapsible">
      <button onClick={toggleCollapsible} className="collapsible-toggle">
      <span>&#9660;</span>FILTERS<span>&#9660;</span>
      </button>
        <div className="collapsible-content">
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
            <div className="filterRadioButtons">
              <input
                type="radio"
                id="radioBoth"
                name="filterType"
                value="Both"
                checked="true"
              />
              <label htmlFor="radioFieldName">Both</label>
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
    </div>
  );
};

export default CollapsableFilters;
