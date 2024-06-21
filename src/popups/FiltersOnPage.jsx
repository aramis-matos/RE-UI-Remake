import React, {useState} from 'react'
//use props below to pass the functions and checked items
const FiltersOnPage = ({theFunc}) => {
  const defaultChecked =
    {'NITF FILE HEADER': false,
    'IMAGE SUBHEADER': false,
    'GRAPHIC SUBHEADER': false,
    'TEXT SUBHEADER': false,
    'DES SUBHEADER': false,
    'TRE': false,};
  
  const [checkedItems, setCheckedItems] = useState(defaultChecked);

  const items = [
    { id: 1, label: 'NITF FILE HEADER' },
    { id: 2, label: 'IMAGE SUBHEADER' },
    { id: 3, label: 'GRAPHIC SUBHEADER' },
    { id: 4, label: 'TEXT SUBHEADER' },
    { id: 5, label: 'DES SUBHEADER' },
    { id: 6, label: 'TRE' },
  ];


/*
  const handleChange = (event) => {
    const { name, checked, id } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
    theFunc(Number(id)-1, checked);
    console.log("changed" + id + checked)
  };*/

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
                        onChange={theFunc}
                        id = {item.id}
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