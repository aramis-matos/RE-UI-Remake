import React from "react";
import { Popup } from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import x from "../assets/favicon/close.svg";
import PropTypes from "prop-types";

const contentStyle = { padding: "0px" };

const PreferencesModal = ({ onSave, listType }) => {
  const handleSave = () => {
    if (document.getElementById("black_list").checked) {
      localStorage.setItem("listType", "black list");
    } else localStorage.setItem("listType", "white list");
    onSave();
  };

  const closeModal = () => {
    document.getElementById("prefModal").style.display = "none";
  };

  return (
    <Popup
      trigger={<button id="preferences">PREFERENCES</button>}
      contentStyle={contentStyle}
      modal
      mested
    >
      {(close) => (
        <div id="prefModal" className="optionPaneModal">
          <button
            data-testid="srm-close"
            onClick={closeModal}
            className="modalBack"
          />
          {/* Preferences modal */}
          <div className="prefModal">
            <div className="modalOptions">
              <button onClick={close}>
                <img src={x} alt="x" />
              </button>
            </div>
            <h3 className="modalHeader">PREFERENCES</h3>
            <div className="savedList">
              {/* Preferences modal content */}
              <h4>List Type:</h4>
              <div className="listSelect">
                <label htmlFor="black_list">
                  <input
                    type="radio"
                    id="black_list"
                    name="list_type"
                    value="black list"
                    defaultChecked={listType === "black list" ? true : false}
                  />
                  <span>Black List</span>{" "}
                  <p>*Only fields selected will be redacted</p>
                </label>
                <label htmlFor="white_list">
                  <input
                    type="radio"
                    id="white_list"
                    name="list_type"
                    value="white list"
                    defaultChecked={listType === "white list" ? true : false}
                  />
                  <span>White List</span>
                  <p>*Only fields selected will not be redacted</p>
                </label>
              </div>
              <div className="secSelect">
                <label htmlFor="css">
                  <span>Classification Security System:</span>
                  <input readOnly id="css" type="string" defaultValue="US" />
                </label>
              </div>
            </div>
            <button
              className="prefSave"
              onClick={() => {
                handleSave();
                close();
              }}
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};
PreferencesModal.propTypes = {
  onSave: PropTypes.func,
  listType: PropTypes.string,
};
export default PreferencesModal;