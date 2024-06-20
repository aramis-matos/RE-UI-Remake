import React, {useState} from 'react'

const FiltersOnPage = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const items = [
    { id: 1, label: 'NITF FILE HEADER' },
    { id: 2, label: 'IMAGE SUBHEADER' },
    { id: 3, label: 'GRAPHIC SUBHEADER' },
    { id: 4, label: 'TEXT SUBHEADER' },
    { id: 5, label: 'DES SUBHEADER' },
    { id: 6, label: 'TRE' },
  ];

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Checked items: ${JSON.stringify(checkedItems, null, 2)}`);
  };




  return (
    <div id = "filtersOnPage"className='filters_preview_modal'>
        <div className='content'>
            <div className = "filters-div">
              <h2>FILTERS</h2>
              <div>
                <form onSubmit={handleSubmit}>
                  {items.map((item) => (
                    <div key = {item.id}>
                      <label>
                        <input
                        type = "checkbox"
                        name={item.label}
                        checked={!!checkedItems[[item.label]]}
                        onChange={handleChange}
                        >
                        </input>
                        {item.label}
                      </label>
                    </div>
                ))}
                <button className = "filterSaveButton" type = "submit">Save</button>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default FiltersOnPage