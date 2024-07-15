import React, { useEffect, useState } from "react";
import SetToBox from "../components/SetToBox/SetToBox";
import Checkbox from "../components/Checkbox/Checkbox";
import PropTypes from "prop-types";
import { testHeader } from "./TableResources";

const TestHeader = (props) => {
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
    const relatedCheckboxes = document.getElementsByClassName("checkAllFile");
    for (let i = 0; i < relatedCheckboxes.length; i++) {
      relatedCheckboxes[i].checked = checked;
      props.onChange(checked, relatedCheckboxes[i].id.replace("check", ""));
    }
  };

  const handleCheck = (checked, fieldName) => {
    if (!checked) {
      document.getElementById("checkAllFile").checked = false;
    }
    props.onChange(checked, fieldName);
  };

  return (
    <div id="testPanel" className="field-panel">
      <div className="field-header">
        <div className="field-sub-header">
          <Checkbox
            id="checkAllFile"
            datatestid="checkAllFile"
            onChange={(e) => handleCheckAll(e.target.checked)}
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
        {testHeader.map((field) => (
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
              onChange={(e) => handleCheck(e.target.checked, field.fieldName)}
              fieldName={field.fieldName}
              disabled={!field.editable || setTo[field.fieldName]}
            />
            <div className="fieldname-box">{field.fieldName}</div>
            <div className="longname-box">{field.longName}</div>
            <SetToBox
              id={"set-to-box"}
              value={setTo[field.fieldName]}
              onChange={(value) => props.onChange(value, field.fieldName)}
              fieldName={field.fieldName}
              disabled={!field.editable}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

TestHeader.propTypes = {
  data: PropTypes.array.isRequired,
  listType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TestHeader;
