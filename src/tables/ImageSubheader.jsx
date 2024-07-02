import React, { useEffect, useState } from "react";
import SetToBox from "../components/SetToBox/SetToBox";
import Checkbox from "../components/Checkbox/Checkbox";
import PropTypes from "prop-types";
import { imageSubHeader } from "./TableResources";

const ImageSubheader = (props) => {
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
    const relatedCheckboxes = document.getElementsByClassName("checkAllImage");
    if (checked) {
      for (let i = 0; i < relatedCheckboxes.length; i++) {
        if (!relatedCheckboxes[i].checked) {
          relatedCheckboxes[i].checked = true;
          props.onChange(true, relatedCheckboxes[i].id.replace("check", ""));
        }
      }
    } else {
      for (let i = 0; i < relatedCheckboxes.length; i++) {
        if (relatedCheckboxes[i].checked) {
          relatedCheckboxes[i].checked = false;
          props.onChange(false, relatedCheckboxes[i].id.replace("check", ""));
        }
      }
    }
  };

  const handleCheck = (checked, fieldName) => {
    if (!checked) {
      document.getElementById("checkAllImage").checked = false;
    }
    props.onChange(checked, fieldName);
  };

  return (
    <div id="imagePanel" className="field-panel">
      <div className="field-header">
        <div className="field-sub-header">
          <Checkbox
            id="checkAllImage"
            datatestid="checkAllImage"
            onChange={handleCheckAll}
            disabled={true}
          />
          {props.listType === "white list" ? (
            <div style={{ color: "green", paddingLeft: "5px" }}>✔</div>
          ) : (
            <div style={{ color: "red", paddingLeft: "5px" }}>X</div>
          )}
        </div>
        <h4>Field Name</h4>
        <h4 className="longName-header">Long Name</h4>
        <h4>Set To</h4>
      </div>
      <div className="field-table">
        {imageSubHeader.map((field) => (
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
              onChange={props.onChange}
              fieldName={field.fieldName}
              disabled={!field.editable}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ImageSubheader.propTypes = {
  values: PropTypes.any,
  allowed: PropTypes.any,
  onChange: PropTypes.func,
};

export default ImageSubheader;
