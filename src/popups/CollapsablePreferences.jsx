import React, { useState } from "react";

const CollapsablePreferences = ({ prefFunc, onPrefChange }) => {
  const [prefValue, setPrefValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPref, setSelectedPref] = useState("");
  const [checkedPref, setCheckedPref] = useState({
    "White List": false,
    "Black List": false,
    "Classification System": "",
  });
  const prefs = [
    { id: 1, label: "White List" },
    { id: 2, label: "Black List" },
    { id: 3, label: "Classification System" },
  ];
  const toggleCollapsible = () => {
    const coll = document.getElementsByClassName("collapsible");
    const thePrefs = coll[0].getElementsByClassName("collapsible-content");
    const theButton = coll[0].getElementsByClassName("collapsible-toggle");
    const collDivs = coll[0].getElementsByTagName("div");
    const theBoxes = coll[0].getElementsByTagName("input");
    const theLabels = coll[0].getElementsByTagName("label");
    if (theFilters[0].style.visibility == "visible") {
      theButton[0].style.borderRadius = "15px";
      theFilters[0].style.visibility = "hidden";
      theFilters[0].style.maxHeight = "0px";
      theFilters[0].style.padding = "0px";
      for (const div of collDivs) {
        div.style.visibility = "hidden";
        div.style.maxHeight = "0px";
      }
      for (const box of theBoxes) {
        box.style.visibility = "hidden";
        box.style.maxHeight = "0px";
      }
      for (const oneLabel of theLabels) {
        oneLabel.style.visibility = "hidden";
        oneLabel.style.maxHeight = "0px";
      }
    } else {
      theButton[0].style.borderRadius = "15px 15px 0px 0px";
      theFilters[0].style.visibility = "visible";
      theFilters[0].style.maxHeight = "360px";
      theFilters[0].style.padding = "10px";
      for (const div of collDivs) {
        div.style.visibility = "visible";
        div.style.maxHeight = "350px";
      }
      for (const box of theBoxes) {
        box.style.visibility = "visible";
        box.style.maxHeight = "20px";
      }
      for (const oneLabel of theLabels) {
        oneLabel.style.visibility = "visible";
        oneLabel.style.maxHeight = "20px";
      }
    }
  };
};
