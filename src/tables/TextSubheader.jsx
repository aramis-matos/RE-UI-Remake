import React, { useEffect, useState } from "react";
import SetToBox from "../components/SetToBox/SetToBox";
import Checkbox from "../components/Checkbox/Checkbox";
import PropTypes from "prop-types";
import { textSubheader } from "./TableResources";

const TextSubheader = (props) => {
  const [setTo, setSetTo] = useState([]);
  const [allowed, setAllowed] = useState([]);
  const [redact, setRedact] = useState([]);

  useEffect(() => {
    if (props.data.length > 0) {
      setSetTo(props.data[0]);
      setAllowed(props.data[1]);
      setRedact(props.data[2]);
    }
  }, [props.data]);

  const handleCheckAll = (checked) => {
    const relatedCheckboxes = document.getElementsByClassName("checkAllText");
    if (checked) {
      for (let i = 0; i < relatedCheckboxes.length; i++) {
        if (!relatedCheckboxes[i].checked) {
          relatedCheckboxes[i].checked = true;
          props.onRedactChange(true, relatedCheckboxes[i].id.replace("check", ""));
        }
      }
    } else {
      for (let i = 0; i < relatedCheckboxes.length; i++) {
        if (relatedCheckboxes[i].checked) {
          relatedCheckboxes[i].checked = false;
          props.onRedactChange(false, relatedCheckboxes[i].id.replace("check", ""));
        }
      }
    }
  };

  const handleCheck = (checked, fieldName) => {
    if (!checked) {
      document.getElementById("checkAllText").checked = false;
    }
    props.onRedactChange(checked, fieldName);
  };

  const hiddenStyle = {
    display: "none"
  }

  const visStyle = {
    display: ""
  }

  return (
    <div id="textPanel" className="field-panel" style = {(props.toShow[3] ||
      !(
        props.toShow[0] ||
        props.toShow[1] ||
        props.toShow[2] ||
        props.toShow[3] ||
        props.toShow[4] ||
        props.toShow[5]
      )) ? visStyle : hiddenStyle}>
      <div className="field-header">
        <div className="field-sub-header">
          <Checkbox
            id="checkAllText"
            datatestid="checkAllText"
            onChange={handleCheckAll}
            disabled={true}
          />
          {props.selectedPreference === "White List" ? (
            <div style={{ color: "green", paddingLeft: "5px" }}>✔</div>
          ) : (
            <div style={{ color: "red", paddingLeft: "5px" }}>X</div>
          )}
        </div>
        <h4>Field Name</h4>
        <h4 className="longName-header">Long Name</h4>
        <h4>Set To</h4>
      </div>
      <div className="field-table" style = {(props.toShow[3] ||
        !(
          props.toShow[0] ||
          props.toShow[1] ||
          props.toShow[2] ||
          props.toShow[3] ||
          props.toShow[4] ||
          props.toShow[5]
        )) ? visStyle : hiddenStyle}>
        {textSubheader.map((field) => (
          <div
            key={field.fieldName}
            id={!field.editable ? "not-redactable" : undefined}
            className="field-row"
            data-testid={field.fieldName.concat("row")}
          >
            <Checkbox
              className="checkAllFile"
              id={"check".concat(field.fieldName)}
              datatestid={"check".concat(field.fieldName)}
              checked={
                props.listType === "white list"
                  ? allowed[field.fieldName]
                  : redact[field.fieldName]
              }
              onChange={handleCheck}
              fieldName={field.fieldName}
              disabled={
                !field.editable || setTo[field.fieldName] ? true : false
              }
            />
            <div className="fieldname-box">{field.fieldName}</div>
            <div className="longname-box">{field.longName}</div>
            <SetToBox
              id={"set-to-box"}
              value={setTo[field.fieldName]}
              onChange={props.onRedactChange}
              fieldName={field.fieldName}
              disabled={!field.editable}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

TextSubheader.propTypes = {
  values: PropTypes.any,
  allowed: PropTypes.any,
  onChange: PropTypes.func,
};

export default TextSubheader;
