import React from "react";
import useLocalStorage from "use-local-storage";

const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const [theme, setTheme] = useLocalStorage(
  "theme",
  defaultDark ? "dark" : "light"
);

const switchTheme = () => {
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};
