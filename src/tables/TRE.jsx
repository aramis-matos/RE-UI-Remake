import React, { useEffect, useState } from "react";
import SetToBox from "../components/SetToBox/SetToBox";
import Checkbox from "../components/Checkbox/Checkbox";
import PropTypes from "prop-types";
import { tres } from "./tresList";

const TRE = (props) => {
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
    const relatedCheckboxes = document.getElementsByClassName("checkAllTre");
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
      document.getElementById("checkAllTre").checked = false;
    }
    props.onChange(checked, fieldName);
  };

  const toggleTREFieldsPanel = (panelId) => {
    const panel = document.getElementById(panelId.concat("-fields"));
    const header = document.getElementById(panelId);
    if (panel.style.display !== "block") {
      panel.style.display = "block";
      header.classList.toggle("active");
    } else {
      panel.style.display = "none";
      header.classList.remove("active");
    }
  };

  return (
    <div id="trePanel" className="tre-panel">
      <div className="field-header">
        <div className="field-sub-header">
          <Checkbox
            id="checkAllTre"
            datatestid="checkAllTre"
            onChange={handleCheckAll}
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
        {Object.keys(tres).map((treName) => (
          <div key={treName}>
            <div
              id={treName}
              data-testid={treName}
              className="tre-header"
              onClick={() => toggleTREFieldsPanel(treName)}
            >
              {treName}
            </div>
            <div id={treName.concat("-fields")} className="tre-fields-list">
              {tres[treName].map((field) => (
                <div
                  key={field.key}
                  id={!field.editable ? "not-redactable" : undefined}
                  className="TRE-field-row"
                >
                  <Checkbox
                    className="checkAllTre"
                    id={"check".concat(field.fieldname)}
                    checked={
                      props.listType === "white list"
                        ? allowed[field.fieldname]
                        : redact[field.fieldname]
                    }
                    onChange={handleCheck}
                    fieldName={field.fieldname}
                    disabled={
                      !field.editable || setTo[field.fieldname] ? true : false
                    }
                    datatestid={treName + field.fieldname}
                  />
                  <div className="fieldname-box">{field.fieldname}</div>
                  <div className="longname-box">{field.longname}</div>
                  <SetToBox
                    id={"set-to-box"}
                    value={setTo[field.fieldname]}
                    onChange={props.onChange}
                    fieldName={field.fieldname}
                    disabled={!field.editable}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TRE.propTypes = {
  values: PropTypes.any,
  allowed: PropTypes.any,
  onChange: PropTypes.func,
};

export default TRE;
