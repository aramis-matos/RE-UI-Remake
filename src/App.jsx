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
  console.log("test")
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
    showPopup("hello World!");
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
        <button id="newRuleset" onClick={handleNew}>
          NEW
        </button>
        <button
          id="openRuleset"
          data-testid="openRuleset"
          onClick={() => toggleModal("myModal", "flex")}
        >
          OPEN
        </button>
        <button
          id="saveRuleset"
          data-testid="saveRuleset"
          disabled={selectedRuleset.rulesetId === undefined}
          onClick={handleSave}
        >
          SAVE
        </button>
        <PreferencesModal onSave={applyPreferences} listType={listType} />
          
          
          
          

        <div className = "helpSearch">
          <SearchBar
            handleSearch={(value) => handleSearch(value)}
            className="search"
          />
          <button
            className= "help-page"
            id="helpButton"
            data-testid="openHelp"
            onClick={handleHelp}
          >
          ?
          </button>
        </div>
        <PreferencesOnPage></PreferencesOnPage>
        <FiltersOnPage></FiltersOnPage>
      </div>






      <div className="nitf-headers" key={reset}>
        <button
          id="fileHeader"
          className="accordion"
          onClick={() => showTable("fileHeader", "filePanel")}
        >
          NITF FILE HEADER
        </button>
        <FileHeader
          data={initialData}
          onChange={recordCheckboxChange}
          listType={listType}
        />

        <button
          id="imageSubheader"
          className="accordion"
          onClick={() => showTable("imageSubheader", "imagePanel")}
        >
          IMAGE SUBHEADER
        </button>
        <ImageSubheader
          data={initialData}
          onChange={recordCheckboxChange}
          listType={listType}
        />

        <button
          id="graphicSubheader"
          className="accordion"
          onClick={() => showTable("graphicSubheader", "graphicPanel")}
        >
          GRAPHIC SUBHEADER
        </button>
        <GraphicSubheader
          data={initialData}
          onChange={recordCheckboxChange}
          listType={listType}
        />

        <button
          id="textSubheader"
          className="accordion"
          onClick={() => showTable("textSubheader", "textPanel")}
        >
          TEXT SUBHEADER
        </button>
        <TextSubheader
          data={initialData}
          onChange={recordCheckboxChange}
          listType={listType}
        />

        <button
          id="desSubheader"
          className="accordion"
          onClick={() => showTable("desSubheader", "desPanel")}
        >
          DES SUBHEADER
        </button>
        <DesSubheader
          data={initialData}
          onChange={recordCheckboxChange}
          listType={listType}
        />

        <button
          id="TRE"
          className="accordion"
          onClick={() => showTable("TRE", "trePanel")}
        >
          TRE
        </button>
        <TRE
          data={initialData}
          onChange={recordCheckboxChange}
          listType={listType}
        />

        <button
          id="TestHeader"
          className="accordion"
          onClick={() => showTable("TestHeader", "testPanel")}
        >
          TEST HEADER
        </button>
        <TestHeader
          data={initialData}
          onChange={recordCheckboxChange}
          listType={listType}
        />
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
