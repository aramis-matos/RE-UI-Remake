/*
 RULESEDITOR.JS
  CREATED: 21 JUL 22 DENNIS DUONG
  MODIFIED:
    05 MAR 24 PERCY EADER
    21 MAR 24 ODERA UNIGWE
*/
import React, { useEffect, useState, useRef } from "react";
import FileHeader from "./tables/FileHeader";
import TestHeader from "./tables/TestHeader";
import ImageSubheader from "./tables/ImageSubheader";
import GraphicSubheader from "./tables/GraphicSubheader";
import TextSubheader from "./tables/TextSubheader";
import DesSubheader from "./tables/DesSubheader";
import SavedRulesetModal from "./popups/SavedRulesetModal";
import RulesetPreviewModal from "./popups/RulesetPreviewModal";
import PreferencesModal from "./popups/PreferencesModal";
import SearchBar from "./components/SearchBar/SearchBar";
import ActionConfirmed from "./popups/ActionConfirmed";
import TRE from "./tables/TRE";
import useModal from "./hooks/useModal";
import PreferencesOnPage from "./popups/PreferencesOnPage";
import FiltersOnPage from "./popups/FiltersOnPage";
import RulesetModalOnPage from "./popups/RulesetModalOnPage";
import HelpModalOnPage from "./popups/HelpModalOnPage";


const App = () => {
  const [selectedRuleset, setSelectedRuleset] = useState({});
  const [currentlyEditing, setCurrentlyEditing] = useState({});
  const rulesetPreview = useRef();
  const [updates, setUpdates] = useState({});
  const [initialData, setInitialData] = useState([]);
  const [fieldUpdatesToExport, setFieldUpdatesToExport] = useState([]);
  const [actionConfirmedMessage, setActionConfirmedMessage] = useState("");
  const [togglePopup, setTogglePopup] = useState(false);
  const [reset, setReset] = useState(true);
  const [listType, setListType] = useState("");
  const [name, setName] = useState("");
  const { isError, setIsError } = useModal(togglePopup, actionConfirmedMessage);
  const [isRulesetModalOpen, setIsRulesetModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  useEffect(() => {
    if (selectedRuleset.rulesetId !== undefined) {
      if (selectedRuleset.name == null) {
        setName(
          selectedRuleset.forClassification +
            "_" +
            selectedRuleset.forReleasability +
            "_" +
            selectedRuleset.forSensor
        );
      } else {
        setName(selectedRuleset.name);
      }
    }
  }, [selectedRuleset]);

  useEffect(() => {
    setCurrentlyEditing({});
    setUpdates({});
    setFieldUpdatesToExport([]);
  }, [reset]);

  const handleSearch = (value) => {
    for (const element of document.getElementsByClassName("field-row")) {
      const fieldRowElements = element.children;
      const fieldName = fieldRowElements[1].textContent;
      const longName = fieldRowElements[2].textContent;
      const setTo = fieldRowElements[3].children[0].value;
      if (
        value &&
        (new RegExp(value, "i").test(fieldName) ||
          new RegExp(value, "i").test(longName) ||
          new RegExp(value, "i").test(setTo))
      ) {
        element.style.backgroundColor = "var(--p300)";
        element.style.color = "var(--n900)";
      } else {
        element.style = {};
      }
    }
  };

  const openRulesetModal = () => {
    setIsRulesetModalOpen(true);
  };

  const closeRulesetModal = () => {
    setIsRulesetModalOpen(false);
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  const applyPreferences = () => {
    if (selectedRuleset) {
      setListType(localStorage.getItem("listType"));
      setUpdates((prev) => ({
        ...prev,
        redactionListType: localStorage.getItem("listType"),
      }));
      setActionConfirmedMessage("Preferences saved successfully");
      setTogglePopup((prev) => !prev);
    }
  };

  const openSavedRuleset = (ruleset) => {
    resetAll();
    // GET request for rulesets here
    toggleModal("myModal", "none");
  };

  const resetAll = () => {
    //handles updating the page when a new ruleset is loaded from the modal.
    setReset(!reset);
  };

  //log updates in state
  const recordCheckboxChange = (boolOrString, fieldName) => {
    if (typeof boolOrString === "boolean") {
      setCurrentlyEditing({
        fieldName,
        check: boolOrString,
        setTo: document.getElementById("set".concat(fieldName)).value,
      });
      setUpdates((prevUpdates) => {
        return { ...prevUpdates, [fieldName]: boolOrString };
      });
    } else {
      recordSetToChange(boolOrString, fieldName);
    }
  };
  const recordSetToChange = (value, fieldName) => {
    const cb = document.getElementById("check".concat(fieldName));
    if (!value) {
      cb.disabled = false;
    } else cb.disabled = true;
    setCurrentlyEditing({
      fieldName,
      check: document.getElementById("check".concat(fieldName)).checked,
      setTo: value,
    });
    setUpdates((prevUpdates) => {
      return { ...prevUpdates, [fieldName + "setTo"]: value };
    });
  };

  const createNewRuleset = (name) => {
    toggleModal("nameRulesetModal", "none");
    resetAll();
    //create new ruleset with default list type, empty class and rel.
    // POST Request for ruleset
  };

  //sets up the updates object to be exported
  const getAllUpdates = () => {
    // Get fields to update, may be done elsewhere
  };

  const handleNew = () => {
    toggleModal("nameRulesetModal", "flex");
    resetAll();
  };

  const handleHelp = () => {
    showPopup("Hello World!");
  }
  //export updates and run PUT request
  const handleSave = () => {
    getAllUpdates();
    if (fieldUpdatesToExport.length === 0 && !isRuleSpecChanged()) {
      setActionConfirmedMessage("No changes have been made");
      setTogglePopup(!togglePopup);
    } else {
      //update rulespecs
      // POST or PUT request for ruleset, depends if ruleset is new or not
    }
    //clear updatesToExport
    setFieldUpdatesToExport([]);
    setUpdates({});
  };

  const showPopup = (message) => {
    setActionConfirmedMessage(message);
    setTogglePopup(!togglePopup);
  };

  let defaultChecked = [false, false, false, false, false, false]
  /*NITF, Image, Graphic, Text, DES, TRE*/
  const [checkedItems, setCheckedItems] = useState(defaultChecked);
  const updateCheckedArr = (index, booleanVal) => {
    const updatedArr = [...checkedItems];
    updatedArr[index] = booleanVal;
    setCheckedItems(updatedArr);
  }
const handleCheckChange = (e) => {
  const {checked, id} = e.target;
  updateCheckedArr(Number(id-1), checked)
}


  return (
    <div className="editor">
      <SavedRulesetModal
        onOpenRuleset={openSavedRuleset}
        rulespecsChanged={
          () => {} /* Create a function to detect when a ruleset is added */
        }
      />
      <ActionConfirmed
        message={actionConfirmedMessage}
        isError={isError}
        setIsError={setIsError}
      />
      <div className="left-panel">
        <div className="content">





          <div className="ruleset-modal">
            <button className = "ruleset-open-button" onClick={openRulesetModal}>NEW</button>
            <RulesetModalOnPage isOpen={isRulesetModalOpen} onClose={closeRulesetModal}>
            <div className ="rulesetOnPageModalContent">
              <h2>New Ruleset</h2>


              <div className = "rulesetObject" >
                <h4>Classification</h4>
                <select>
                  <option value="unclassifiedOp">Unclassified</option>
                  <option value="confidentialOp">Confidential</option>
                  <option value="secretOp">Secret</option>
                  <option value="topSecretOp">Top Secret</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Country</h4>
                <select>
                  <option value="op">United States of America</option>
                  <option value="op">Canada</option>
                  <option value="op">Mexico</option>
                  <option value="op">France</option>
                  <option value="op">Newfoundland</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Releaseability</h4>
                <select>
                  <option value="op">An Option</option>
                  <option value="op">Another Option </option>
                  <option value="op">Some Other Option</option>
                </select>
              </div>
              <div className = "rulesetObject" >
                <h4>Sensor</h4>
                <select>
                  <option value="op">Yet Another Option</option>
                  <option value="op">Lawd it's an Option</option>
                  <option value="op">Too Many Options</option>
                  <option value="op">A man cannot step into the same river twice,
                    for it is not the same river, and he is not the same man.
                  </option>
                </select>
                <button className="ruleset-save-button">Save</button>
              </div>
            </div>


          </RulesetModalOnPage>
        </div>
          
          <button
            id="openRuleset"
            data-testid="openRuleset"
            onClick={() => toggleModal("myModal", "flex")}
            >OPEN
          </button>
          <button
            id="saveRuleset"
            data-testid="saveRuleset"
            disabled={selectedRuleset.rulesetId === undefined ? true : false}
            onClick={handleSave}
          >SAVE
          </button>
          <div className = "helpSearch">
            <SearchBar
              handleSearch={(value) => handleSearch(value)}
              className="search"
            />
            <div className = "help-modal">
              <button
                className= "help-page"
                id="helpButton"
                data-testid="openHelp"
                onClick={openHelpModal}
              >?
              </button>
              <HelpModalOnPage isOpen={isHelpModalOpen} onClose= {closeHelpModal}>
              <h1>Frequently Asked Questions</h1>
                <hr/>
                <h2>What is GWER (GEOINT Workflow Enhancement Redaction)</h2>
                <p>GWER is a web based redaction service for Geospatial-intelligence (GEOINT) Workflow Enhancement that allows a user to edit information within a NITF.</p>
                <hr/>
                <h2>What is a NITF?</h2>
                <p>Not If There's Fondue!!!</p>
              </HelpModalOnPage>
            </div>
          </div>
          <FiltersOnPage theFunc={handleCheckChange}></FiltersOnPage>
          <PreferencesOnPage></PreferencesOnPage>
        </div>
      </div>
      

      <div className="nitf-headers" key={reset}>
        {(checkedItems[0] || !(checkedItems[0]||checkedItems[1]||checkedItems[2]||checkedItems[3]||checkedItems[4]||checkedItems[5])) &&
        <div>
          <button
            id="fileHeader"
            className="accordion"
            onClick={() => showTable("fileHeader", "filePanel")}
          >
          <span>&#9660;</span> NITF FILE HEADER <span>&#9660;</span>
          </button>
            <FileHeader
            data={initialData}
            onChange={recordCheckboxChange}
            listType={listType}
          />
        </div> }
        { (checkedItems[1] || !(checkedItems[0]||checkedItems[1]||checkedItems[2]||checkedItems[3]||checkedItems[4]||checkedItems[5])) &&
        <div>
          <button
            id="imageSubheader"
            className="accordion"
            onClick={() => showTable("imageSubheader", "imagePanel")}
           
          >
          <span>&#9660;</span> IMAGE SUBHEADER <span>&#9660;</span>
          </button>
          <ImageSubheader
            data={initialData}
            onChange={recordCheckboxChange}
            listType={listType}
          />
        </div> }
        {(checkedItems[2] || !(checkedItems[0]||checkedItems[1]||checkedItems[2]||checkedItems[3]||checkedItems[4]||checkedItems[5])) &&
        <div>
          <button
            id="graphicSubheader"
            className="accordion"
            onClick={() => showTable("graphicSubheader", "graphicPanel")}
           
          >
          <span>&#9660;</span> GRAPHIC SUBHEADER <span>&#9660;</span>
          </button>
          <GraphicSubheader
            data={initialData}
            onChange={recordCheckboxChange}
            listType={listType}
          />
        </div> }
        {(checkedItems[3] || !(checkedItems[0]||checkedItems[1]||checkedItems[2]||checkedItems[3]||checkedItems[4]||checkedItems[5])) &&
        <div>
          <button
            id="textSubheader"
            className="accordion"
            onClick={() => showTable("textSubheader", "textPanel")}
           
          >
          <span>&#9660;</span> TEXT SUBHEADER <span>&#9660;</span>
          </button>
          <TextSubheader
            data={initialData}
            onChange={recordCheckboxChange}
            listType={listType}
          />
        </div> }
        {(checkedItems[4] || !(checkedItems[0]||checkedItems[1]||checkedItems[2]||checkedItems[3]||checkedItems[4]||checkedItems[5])) &&
        <div>
          <button
            id="desSubheader"
            className="accordion"
            onClick={() => showTable("desSubheader", "desPanel")}
           
          >
          <span>&#9660;</span> DES SUBHEADER <span>&#9660;</span>
          </button>
          <DesSubheader
            data={initialData}
            onChange={recordCheckboxChange}
            listType={listType}
          />
        </div> }
        {(checkedItems[5] || !(checkedItems[0]||checkedItems[1]||checkedItems[2]||checkedItems[3]||checkedItems[4]||checkedItems[5])) &&
        <div>
          <button
            id="TRE"
            className="accordion"
            onClick={() => showTable("TRE", "trePanel")}
           
          >
          <span>&#9660;</span> TRE <span>&#9660;</span>
          </button>
          <TRE
            data={initialData}
            onChange={recordCheckboxChange}
            listType={listType}
          />
        </div> }
      </div>

      <div
        className="right-panel"
        data-testid="rulesetPreview"
        ref={rulesetPreview}
      >
        <RulesetPreviewModal
          initialData={initialData}
          data={currentlyEditing}
          listType={listType}
        />
      </div>
    </div>
  );
};

function showTable(header, table) {
  const acc = document.getElementById(header);
  const panel = document.getElementById(table);
  if (panel.style.display === "flex") {
    acc.className = "accordion";
    panel.style.display = "none";
  } else {
    acc.className = "accordion-open";
    panel.style.display = "flex";
  }
}

function toggleModal(modalId, displayType) {
  const modal = document.getElementById(modalId);
  modal.style.display = displayType;
}

export default App;
