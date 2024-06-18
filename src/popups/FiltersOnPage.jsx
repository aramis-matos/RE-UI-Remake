import React, {useState} from 'react'

const FiltersOnPage = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const items = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
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
                  {items.map((item) =>  )}
                </form>

              </div>
            </div>
        </div>
    </div>
  )
}

export default FiltersOnPage