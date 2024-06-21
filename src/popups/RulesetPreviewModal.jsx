/*
 RULESETPREVIEWMODAL.JS
  CREATED: 17 JUL 23 PERCY EADER
  MODIFIED: 
    04 MAR 24 PERCY EADER
    05 MAR 24 PERCY EADER
    21 MAR 24 ODERA UNIGWE
*/
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "reactjs-popup/dist/index.css";

const RulesetPreviewModal = ({ initialData, data, listType }) => {
  const [redacted, setRedacted] = useState([]);
  const [modified, setModified] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      addToArrays(data);
    }
  }, [data, listType]);

  useEffect(() => {
    setModified([]);
    setRedacted([]);
    if (initialData[0]) {
      for (const field in initialData[0]) {
        if (initialData[0][field]) {
          setModified((prevModified) => [...prevModified, field]);
        }
      }
    }
    if (listType === "white list") {
      if (initialData[1]) {
        for (const field in initialData[1]) {
          if (!initialData[1][field]) {
            setRedacted((prevRedacted) => [...prevRedacted, field]);
          }
        }
      }
    } else {
      if (initialData[2]) {
        for (const field in initialData[2]) {
          if (initialData[2][field]) {
            setRedacted((prevRedacted) => [...prevRedacted, field]);
          }
        }
      }
    }
  }, [initialData, listType]);

  const addToArrays = (data) => {
    if (data.setTo) {
      setModified((prevModified) =>
        prevModified.some((item) => item.fieldName === data.fieldName)
          ? prevModified.map((item) =>
              item.fieldName === data.fieldName ? { ...item, setTo: data.setTo } : item
            )
          : [...prevModified, { fieldName: data.fieldName, setTo: data.setTo }]
      );
      setRedacted((prevRedacted) =>
        prevRedacted.filter((fieldName) => fieldName !== data.fieldName)
      );
    } else {
      setModified((prevModified) =>
        prevModified.filter((item) => item.fieldName !== data.fieldName)
      );
      if (listType === "white list") {
        setRedacted((prevRedacted) =>
          data.check === false
            ? [...prevRedacted, data.fieldName]
            : prevRedacted.filter((fieldName) => fieldName !== data.fieldName)
        );
      } else {
        setRedacted((prevRedacted) =>
          data.check === true
            ? [...prevRedacted, data.fieldName]
            : prevRedacted.filter((fieldName) => fieldName !== data.fieldName)
        );
      }
    }
  };

  return (
    <div id="previewRuleset" className="ruleset_preview_modal">
    <div className="content">
      <div className="redact-div">
        <h2>REDACT</h2>
        <div className="selections">
          {console.log(redacted)}
          {redacted.length === 0 && <span>No ruleset selected</span>}
          {redacted.length > 0 &&
            redacted.map((field) => <p key={field + uuidv4()}>{field}</p>)}
        </div>
      </div>
      <div className="modify-div">
        <h2>MODIFY</h2>
        <div className="selections">
          {modified.length === 0 && <span>No ruleset selected</span>}
          {modified.length > 0 &&
            modified.map((item) => (
              <p key={item.fieldName + uuidv4()}>
                {item.fieldName} <span className="arrow">→</span> {item.setTo}
              </p>
            ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default RulesetPreviewModal;
