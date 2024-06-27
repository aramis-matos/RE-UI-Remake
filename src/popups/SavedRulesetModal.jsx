import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cycle from "../assets/favicon/refresh.svg";
import close from "../assets/favicon/close.svg";
import closeMini from "../assets/favicon/close-mini.svg";

const SavedRulesetModal = (props) => {
  const [sortedRulesets, setSortedRulesets] = useState({});

  useEffect(() => {
    retrieveSavedRulesets();
  }, [props.rulespecsChanged]);

  const retrieveSavedRulesets = () => {
    const x = new Promise(() => {});
    x.then((response) => {
      sortRulesets(response.data);
    });
  };

  const sortRulesets = (rulesets) => {
    let tempObj = {};
    for (const ruleset of rulesets) {
      if (!tempObj[ruleset.forCountry]) {
        tempObj[ruleset.forCountry] = {};
      }
      tempObj[ruleset.forCountry][ruleset.forClassification] = tempObj[
        ruleset.forCountry
      ][ruleset.forClassification]
        ? [...tempObj[ruleset.forCountry][ruleset.forClassification], ruleset]
        : [ruleset];
    }
    setSortedRulesets(tempObj);
  };

  useEffect(() => {}, [sortedRulesets]);

  const getRulesetName = (ruleset) => {
    // if (ruleset.name !== null) {
    //   return ruleset.name;
    // } else {
    return ruleset.forClassification.concat(
      "_",
      ruleset.forReleasability,
      "_",
      ruleset.forSensor
    );
    // }
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  const refresh = () => {
    retrieveSavedRulesets();
  };

  const onOpenRuleset = (rulesetId) => {
    closeModal();
    props.onOpenRuleset(rulesetId);
  };

  const deleteRuleset = (_rulesetId) => {
    const x = new Promise();
    x.then((_response) => {
      refresh();
    });
  };

  return (
    <div id="myModal" className="modal" data-testid="savedRulesets">
      <button onClick={closeModal} className="modalBack" />
      <div className="modal_content">
        <div className="modalOptions">
          <button onClick={refresh}>
            <img src={cycle} alt="+" />
          </button>
          <button data-testid="srm-close" onClick={closeModal}>
            <img src={close} alt="x" />
          </button>
        </div>
        <h3 className="modalHeader">SAVED RULESETS</h3>
        <div className="savedList">
          {Object.keys(sortedRulesets).map((country) => (
            <div key={country}>
              <h4>{country.toUpperCase()}</h4>
              {Object.keys(sortedRulesets[country]).map((classification) => (
                <div key={classification}>
                  {classification == "UNCLASSIFIED" && (
                    <span style={{ color: "var(--success)" }}>
                      {classification}
                    </span>
                  )}
                  {classification == "CLASSIFIED" && (
                    <span style={{ color: "#3093D8" }}>{classification}</span>
                  )}
                  {classification == "RESTRICTED" && (
                    <span style={{ color: "#3093D8" }}>{classification}</span>
                  )}
                  {classification == "SECRET" && (
                    <span style={{ color: "var(--error)" }}>
                      {classification}
                    </span>
                  )}
                  {classification == "TOP SECRET" && (
                    <span style={{ color: "	orange" }}>{classification}</span>
                  )}
                  {sortedRulesets[country][classification].map((ruleset) => (
                    <div className="rulesetContent" key={ruleset.rulesetId}>
                      <button
                        rulesetId={ruleset.rulesetId}
                        key={ruleset.rulesetId}
                        onClick={() => onOpenRuleset(ruleset)}
                      >
                        {getRulesetName(ruleset)}
                      </button>
                      <button
                        className="delete"
                        data-testid={"deleteRuleset " + ruleset.rulesetId}
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Are you sure you want to delete this ruleset ?"
                          );
                          if (confirmBox) {
                            deleteRuleset(ruleset.rulesetId);
                          }
                        }}
                      >
                        <img src={closeMini} alt="x" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SavedRulesetModal.propTypes = {
  onOpenRuleset: PropTypes.func.isRequired,
  rulespecsChanged: PropTypes.bool,
};

export default SavedRulesetModal;
