import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  const [checked, setChecked] = useState(false)
  const handleChange = (event) => {

    setChecked(prev => !prev)
    props.onChange(event.target.checked, props.fieldName);
  };

  useEffect(() => {
    if (props.checked) {
      setChecked(props.checked)
    }
  }, [props.checked])


  return (
    <input
      type="checkbox"
      data-testid={props.datatestid}
      className={props.className}
      id={props.id}

      disabled={props.disabled}
      onChange={handleChange}
    />
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  fieldName: PropTypes.string,
  datatestid: PropTypes.string,
};

export default Checkbox;
