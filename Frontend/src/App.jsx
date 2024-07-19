import React, { useEffect, useState, useRef } from "react";
import FileHeader from "./tables/FileHeader";
import TestHeader from "./tables/TestHeader";
import ImageSubheader from "./tables/ImageSubheader";
import GraphicSubheader from "./tables/GraphicSubheader";
import TextSubheader from "./tables/TextSubheader";
import DesSubheader from "./tables/DesSubheader";
import RulesetPreviewModal from "./popups/RulesetPreviewModal";
import SearchBar from "./components/SearchBar/SearchBar";
import TRE from "./tables/TRE";
import useModal from "./hooks/useModal";
import PreferencesOnPage from "./popups/PreferencesOnPage";
import RulesetModalOnPage from "./popups/RulesetModalOnPage";
import HelpModalOnPage from "./popups/HelpModalOnPage";
import OpenModalOnPage from "./popups/OpenModalOnPage";
import CollapsableFilters from "./popups/CollapsableFilters";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import { fileHeader } from "./tables/TableResources";

const App = () => {
  const [filterType, setFilterType] = useState("");
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
  const [isOpenModalOpen, setIsOpenModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreference, setSelectedPreference] = useState();
  const [searchShow, setSearchShow] = useState([true, true, true, true, true, true]);

  /* Dark / Light Mode */
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const newTheme = theme === "dark" ? "light" : "dark";
  const newThemeCap = newTheme === "dark" ? "Dark" : "Light";

  const switchTheme = () => {
    // const newTheme = theme === "dark" ? "light" : "dark";
    const color = newTheme === "dark" ? "var(--n50)" : "var(--n850)";
    setTheme(newTheme);
    document.querySelector("html").style.backgroundColor = color;
    document.querySelector("body").style.backgroundColor = color;
  };
  const setBackground = () => {
    const color = theme === "dark" ? "var(--n50)" : "var(--n850)";
    document.querySelector("html").style.backgroundColor = color;
    document.querySelector("html").style.backgroundColor = color;
  };

  useEffect(() => {
    setBackground();
  }, []);
  /* Dark / Light Mode */

  const handleFilterTypeChange = (newFilterType) => {
    setFilterType(newFilterType);
    handleSearch(searchValue, newFilterType, checkedItems);
  };

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

  const handleSearch = (value, filterType, filterSections) => {
    const headerArr = ["nitf", "image", "graphic", "text", "Des", "TRE"];
    let index = 0;
    setSearchValue(value);
    if (filterSections == null) {
      filterSections = checkedItems;
    }

    for (const header of document.getElementsByClassName("header")) {
      let numElements = 0;
      let numRemoved = 0;
      if (headerArr[index] !== "TRE" && shouldBeVisible(index, filterSections)) {
        // Handle non-TRE headers
        for (const element of header.getElementsByClassName("field-row")) {
          numElements++;
          const fieldRowElements = element.children;
          const fieldName = fieldRowElements[1].textContent;
          const longName = fieldRowElements[2].textContent;
          const setTo = fieldRowElements[3].children[0].value;
          if (value && !filterByFieldName(fieldName, longName, setTo, filterType)) {
            element.style.visibility = "hidden";
            element.style.maxHeight = "0px";
            numRemoved++;
          } else if (value) {
            element.style.visibility = "visible";
            element.style.maxHeight = "40px";
          }
        }
      } else {
        if (shouldBeVisible(index, filterSections)) {
          // Handle TRE headers
          for (const treHeader of header.getElementsByClassName(
            "tre-subheader"
          )) {
            let numElementsTre = 0;
            let numRemovedTre = 0;

            for (const treElement of treHeader.getElementsByClassName(
              "mini-field-row"
            )) {
              numElementsTre++;
              const treName = treHeader.children[0].id;
              const treRowElements = treElement.children;
              const fieldName = treRowElements[1].textContent;
              const longName = treRowElements[2].textContent;
              const setTo = treRowElements[3].children[0].value;

              //treHeader is class tre-subheader

              if (value && !filterByFieldName(fieldName, longName, setTo)) {
                treElement.style.visibility = "hidden";
                treElement.style.maxHeight = "0px";
                numRemovedTre++;
              } else {
                treElement.style.visibility = "visible";
                treElement.style.maxHeight = "40px";
              }
            }

            numElements += numElementsTre;
            numRemoved += numRemovedTre;

            const actualTreHeader = treHeader.getElementsByClassName("tre-header")[0]

            if (numElementsTre === numRemovedTre) {
              treHeader.style.visibility = "hidden"
              treHeader.style.maxHeight = "0px"
              treHeader.style.opacity = "0"
              actualTreHeader.style.visibility = "hidden"
              actualTreHeader.style.maxHeight = "0px"
              actualTreHeader.style.opacity = "0"
              updateSearchShow(index, false)
            } else {
              if (header.getElementsByClassName("accordion-open")[0] != null) {
                treHeader.style.visibility = "visible"
                treHeader.style.maxHeight = "600px"
                treHeader.style.opacity = "1"
                actualTreHeader.style.visibility = "visible"
                actualTreHeader.style.maxHeight = "50px"
                actualTreHeader.style.opacity = "1"
              }
              updateSearchShow(index, true)
            }
          }
        }
      }

      let panel = header.getElementsByClassName("field-panel")[0]
      if (panel == null) {
        panel = document.getElementById("trePanel")
      }
      if (numElements === numRemoved) {
        header.style.visibility = "hidden"
        header.style.maxHeight = "0px"
        panel.style.visibility = "hidden"
        panel.style.maxHeight = "0px"
        updateSearchShow(index, false)
      } else {
        header.style.visibility = "visible"
        header.style.maxHeight = "600px"
        if (header.getElementsByClassName("accordion-open")[0] != null) {
          panel.style.visibility = "visible"
          panel.style.maxHeight = "500px"
          if (index == 5) panel.style.maxHeight = "64000px";
        }
        updateSearchShow(index, true)
      }

      index++;
      
    }

    function filterByFieldName(fieldName, longName, setTo, filterType) {
      if (filterType === "Field Name") {
        return new RegExp(value, "i").test(fieldName.replace(/\s/g, ""));
      } else if (filterType === "Long Name") {
        return new RegExp(value, "i").test(longName.replace(/\s/g, ""));
      } else if (filterType === "Both") {
        return (
          new RegExp(value, "i").test(fieldName.replace(/\s/g, "")) ||
          new RegExp(value, "i").test(longName.replace(/\s/g, "")) ||
          new RegExp(value, "i").test(setTo.replace(/\s/g, ""))
        );
      } else {
        return (
          new RegExp(value, "i").test(fieldName.replace(/\s/g, "")) ||
          new RegExp(value, "i").test(longName.replace(/\s/g, "")) ||
          new RegExp(value, "i").test(setTo.replace(/\s/g, ""))
        );
      }
    }
  };

  const updateSearchShow = (index, newVal) => {
    let tempArr = searchShow
    tempArr[index] = newVal;
    setSearchShow(tempArr)
  }

  const hiddenStyle = {
    visibility: 'hidden',
    maxHeight: '0px',
  }

  const visStyle = {
    visibility: 'visible',
    maxHeight: '600px'
  }

  const visStyleTre = {
    visibility: "visible",
    maxHeight: '60000px'
  }

  const shouldBeVisible = (headerInd, filterSections) => {
    return filterSections[headerInd] ||
      !(
        filterSections[0] ||
        filterSections[1] ||
        filterSections[2] ||
        filterSections[3] ||
        filterSections[4] ||
        filterSections[5] )
  }

  const openRulesetModal = () => {
    setIsRulesetModalOpen(true);
  };

  const closeRulesetModal = () => {
    setIsRulesetModalOpen(false);
  };

  const openOpenModal = () => {
    setIsOpenModalOpen(true);
  };

  const closeOpenModal = () => {
    setIsOpenModalOpen(false);
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
        setTo: document.getElementById("set".concat(fieldName)),
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
    handleSearch(searchValue);
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
  };
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

  let defaultChecked = [false, false, false, false, false, false];
  /*NITF, Image, Graphic, Text, DES, TRE*/
  const [checkedItems, setCheckedItems] = useState(defaultChecked);

  const updateCheckedArr = (index, booleanVal) => {
    const updatedArr = [...checkedItems];
    updatedArr[index] = booleanVal;
    setCheckedItems(updatedArr);
    handleSearch(searchValue, filterType, updatedArr)
  };

  const handleCheckChange = (e) => {
    const { checked, id } = e.target;
    updateCheckedArr(Number(id - 1), checked);
    
  };

  const handlePreferenceChange = (preference) => {
    setSelectedPreference(preference);
  };

  const callAPI = () => {
    // get request from frontend to backend
    axios.get("http://localhost:8080").then((data) => {
      // console.log(data);
      // console.log(fileHeader[0].fieldName);
      // console.log(Object.keys(fileHeader).length);
      // show backend response in console
    });
  };


  // console.log(sensor.value)
  return (
    <div className="editor" data-theme={theme}>
      <div className="left-panel">
        <div className="content">
          <label className="themeSwitch">
            <input type="checkbox" onChange={switchTheme} />
            <span className="slider">
              <label className="darkLabel">☾</label>
              <label className="lightLabel"> ☀︎ </label>
            </span>
          </label>
          <button
            id="newRuleset"
            onClick={() => {
              openRulesetModal();
              // callAPI(); // test API call
            }}>
            NEW
          </button>
          <button
            id="openRuleset"
            data-testid="openRuleset"
            onClick={openOpenModal}>
            OPEN
          </button>

          <div className="helpSearch">
            <SearchBar
              handleSearch={(value) => handleSearch(value)}
              className="search"
            />
            <div className="help-modal">
              <button
                className="help-page"
                id="helpButton"
                data-testid="openHelp"
                onClick={openHelpModal}>
                ?
              </button>
            </div>
          </div>
          <CollapsableFilters
            theFunc={handleCheckChange}
            onFilterChange={handleFilterTypeChange}></CollapsableFilters>
          {/* <FiltersOnPage theFunc={handleCheckChange}></FiltersOnPage> */}
          <PreferencesOnPage
            onSelectPreference={handlePreferenceChange}></PreferencesOnPage>
        </div>
      </div>
      <div className="nitf-headers" key={reset}>
        <div className="ruleset-modal">
          <RulesetModalOnPage
            isOpen={isRulesetModalOpen}
            onClose={closeRulesetModal}></RulesetModalOnPage>
          <OpenModalOnPage
            isOpen={isOpenModalOpen}
            onClose={closeOpenModal}></OpenModalOnPage>
        </div>
        <HelpModalOnPage isOpen={isHelpModalOpen} onClose={closeHelpModal}>
          <h1>Frequently Asked Questions</h1>
          <hr />
          <h2>What is GWER (GEOINT Workflow Enhancement Redaction)</h2>
          <p>
            GWER is a web based redaction service for Geospatial-intelligence
            (GEOINT) Workflow Enhancement that allows a user to edit information
            within a NITF.
          </p>
          <hr />
          <h2>What is a NITF?</h2>
          <p>Not If There's Fondue!!!</p>
          <hr />
        </HelpModalOnPage>
          <div className="header" style = {((checkedItems[0] ||
            !(
              checkedItems[0] ||
              checkedItems[1] ||
              checkedItems[2] ||
              checkedItems[3] ||
              checkedItems[4] ||
              checkedItems[5]
            )) && searchShow[0])? visStyle : hiddenStyle}>
            <button
              id="fileHeader"
              className="accordion"
              onClick={() => {
                showTable("fileHeader", "filePanel", 0), handleSearch(searchValue);
              }}>
              <span>&#9660;</span> NITF FILE HEADER <span>&#9660;</span>
            </button>
            <FileHeader
              data={initialData}
              onRedactChange={recordCheckboxChange}
              listType={listType}
              idPassed="filePanel"
              selectedPreference={selectedPreference}
              toShow = {checkedItems}
            />
          </div>
          <div className="header" style = {((checkedItems[1] ||
            !(
              checkedItems[0] ||
              checkedItems[1] ||
              checkedItems[2] ||
              checkedItems[3] ||
              checkedItems[4] ||
              checkedItems[5]
            )) && searchShow[1]) ? visStyle : hiddenStyle}>
            <button
              id="imageSubheader"
              className="accordion"
              onClick={() => {
                showTable("imageSubheader", "imagePanel", 1),
                  handleSearch(searchValue);
              }}>
              <span>&#9660;</span> IMAGE SUBHEADER <span>&#9660;</span>
            </button>
            <ImageSubheader
              data={initialData}
              onRedactChange={recordCheckboxChange}
              listType={listType}
              idPassed="imagePanel"
              selectedPreference={selectedPreference}
              toShow = {checkedItems}
            />
          </div>
          <div className="header" style = {((checkedItems[2] ||
            !(
              checkedItems[0] ||
              checkedItems[1] ||
              checkedItems[2] ||
              checkedItems[3] ||
              checkedItems[4] ||
              checkedItems[5]
            )) && searchShow[2]) ? visStyle : hiddenStyle}>
            <button
              id="graphicSubheader"
              className="accordion"
              onClick={() => {
                showTable("graphicSubheader", "graphicPanel", 2),
                  handleSearch(searchValue);
              }}>
              <span>&#9660;</span> GRAPHIC SUBHEADER <span>&#9660;</span>
            </button>
            <GraphicSubheader
              data={initialData}
              onRedactChange={recordCheckboxChange}
              listType={listType}
              idPassed="graphicPanel"
              selectedPreference={selectedPreference}
              toShow = {checkedItems}
            />
          </div>
          <div className="header" style = {((checkedItems[3] ||
            !(
              checkedItems[0] ||
              checkedItems[1] ||
              checkedItems[2] ||
              checkedItems[3] ||
              checkedItems[4] ||
              checkedItems[5]
            )) && searchShow[3]) ? visStyle : hiddenStyle}>
            <button
              id="textSubheader"
              className="accordion"
              onClick={() => {
                showTable("textSubheader", "textPanel", 3),
                  handleSearch(searchValue);
              }}>
              <span>&#9660;</span> TEXT SUBHEADER <span>&#9660;</span>
            </button>
            <TextSubheader
              data={initialData}
              onRedactChange={recordCheckboxChange}
              listType={listType}
              idPassed="textPanel"
              selectedPreference={selectedPreference}
              toShow = {checkedItems}
            />
          </div>
          <div className="header" style = {((checkedItems[4] ||
            !(
              checkedItems[0] ||
              checkedItems[1] ||
              checkedItems[2] ||
              checkedItems[3] ||
              checkedItems[4] ||
              checkedItems[5]
            )) && searchShow[4]) ? visStyle : hiddenStyle}>
            <button
              id="desSubheader"
              className="accordion"
              onClick={() => {
                showTable("desSubheader", "desPanel", 4),
                  handleSearch(searchValue);
              }}>
              <span>&#9660;</span> DES SUBHEADER <span>&#9660;</span>
            </button>
            <DesSubheader
              data={initialData}
              onRedactChange={recordCheckboxChange}
              listType={listType}
              idPassed="desPanel"
              selectedPreference={selectedPreference}
              toShow = {checkedItems}
            />
          </div>
          <div className="header" style = {((checkedItems[5] ||
            !(
              checkedItems[0] ||
              checkedItems[1] ||
              checkedItems[2] ||
              checkedItems[3] ||
              checkedItems[4] ||
              checkedItems[5]
            )) && searchShow[5]) ? visStyleTre : hiddenStyle}>
            <button
              id="TRE"
              className="accordion"
              onClick={() => {
                treShowTable("TRE", "trePanel"), handleSearch(searchValue);
              }}>
              <span>&#9660;</span> TRE <span>&#9660;</span>
            </button>
            <TRE
              data={initialData}
              onChange={recordCheckboxChange} //needs to changed if it works
              listType={listType}
              idPassed="trePanel"
              selectedPreference={selectedPreference}
              toShow = {checkedItems}
            />
          </div>
      </div>

      <div
        className="right-panel"
        data-testid="rulesetPreview"
        ref={rulesetPreview}>
        <RulesetPreviewModal
          initialData={initialData}
          data={currentlyEditing}
          listType={listType}
          selectedPreference={selectedPreference}
        />
      </div>
    </div>
  );
};

function showTable(header, table, num) {
  const acc = document.getElementById(header);
  const panel = document.getElementById(table);
  const rows = panel.getElementsByClassName("field-row");
  const fieldTable = panel.getElementsByClassName("field-table");
  if (panel.style.visibility === "visible") {
    acc.className = "accordion";
    panel.style.visibility = "hidden";
    panel.style.paddingTop = "0px";
    panel.style.paddingBottom = "0px";
    panel.style.marginBottom = "0px";
    panel.style.maxHeight = "0px";
    panel.style.opacity = "0";
    for (const row of rows) {
      row.style.visibility = "hidden";
      row.style.opacity = "0";
      row.style.maxHeight = "0px";
    }
  } else {
    acc.className = "accordion-open";
    panel.style.visibility = "visible";
    panel.style.paddingTop = "20px";
    panel.style.paddingBottom = "10px";
    panel.style.marginBottom = "20px";
    panel.style.maxHeight = "500px";
    panel.style.opacity = "1";
    for (const row of rows) {
      row.style.visibility = "visible";
      row.style.opacity = "1";
      row.style.maxHeight = "40px";
    }
  }
}

function treShowTable(header, table) {
  const acc = document.getElementById(header); //TRE
  const panel = document.getElementById(table); //trePanel
  const subHeaders = panel.getElementsByClassName("tre-header");
  const fieldTables = panel.getElementsByClassName("tre-field");
  const divSubheaders = document.getElementsByClassName("tre-subheader");
  if (acc.className == "accordion-open") {
    acc.className = "accordion";
    panel.style.visibility = "hidden";
    panel.style.opacity = "0";
    panel.style.maxHeight = "0";
    //panel.style.padding = "0px 0px 0px 0px"
    panel.style.paddingTop = "0px";
    panel.style.paddingBottom = "0px";
    panel.style.marginBottom = "0px";
    for (const divSubheader of divSubheaders) {
      divSubheader.style.maxHeight = "0px";
    }
    for (const subHeader of subHeaders) {
      subHeader.style.visibility = "hidden";
      subHeader.style.opacity = "0";
      subHeader.style.maxHeight = "0px";
    }
    for (const field of fieldTables) {
      field.style.maxHeight = "0px";
    }
  } else {
    acc.className = "accordion-open";
    panel.style.visibility = "visible";
    panel.style.opacity = "1";
    panel.style.maxHeight = "64000px";
    //panel.style.padding = "20px 0px 10px 0px;"
    panel.style.paddingTop = "20px";
    panel.style.paddingBottom = "10px";
    panel.style.marginBottom = "20px";
    for (const divSubheader of divSubheaders) {
      divSubheader.style.maxHeight = "none";
    }
    for (const subHeader of subHeaders) {
      subHeader.style.visibility = "visible";
      subHeader.style.opacity = "1";
      subHeader.style.maxHeight = "50px";
    }
    for (const field of fieldTables) {
      field.style.maxHeight = "none";
    }
  }
}

function toggleModal(modalId, displayType) {
  const modal = document.getElementById(modalId);
  modal.style.display = displayType;
}

export default App;
