import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fields } from "./inputValidation";

const SetToBox = (props) => {
  const [style, setStyle] = useState({ position: "center", color: "black", marginTop: "5%" });
  const [errMsg, setErrMsg] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    } else {
      setValue("");
    }
  }, [props.value]);

  const handleChange = (input) => {
    //no input validation for unsupported fields
    if (fields[props.fieldName]) {
      validateInput(input);
    } else {
      setValue(input);
      props.onChange(input, props.fieldName);
    }
  };

  const validateInput = (input) => {
    if (
      !new RegExp(fields[props.fieldName].valid).test(input) &&
      input !== ""
    ) {
      setValue(input);
      setStyle({ color: "red", marginTop: "10%" });
      setErrMsg(fields[props.fieldName].message);
    } else {
      setValue(input);
      setStyle({ color: "white", marginTop: "5%"});
      setErrMsg("");
      props.onChange(input, props.fieldName);
    }
  };

  return (
    <div>
      <input
        id={props.id}
        type="text"
        data-testid={props.id}
        value={value}
        disabled={props.disabled}
        onChange={(e) => handleChange(e.target.value)}
        style={style}
      />
      <p style={{ color: "red", fontSize: "10px" }}>{errMsg}</p>
    </div>
  );
};

SetToBox.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  fieldName: PropTypes.string,
  id: PropTypes.string,
};

export default SetToBox;
