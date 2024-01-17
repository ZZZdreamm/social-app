import { useEffect } from "react";
import { colors } from "../../globals/colors";
import "./style.scss";
import { useNightModeContext } from "services/Contexts/NightModeContext";

export default function NightModeSwitch() {
  const { setNightMode } = useNightModeContext();

  useEffect(() => {
    const checkbox = document.getElementById(
      "hide-checkbox"
    ) as HTMLInputElement;
    if (checkbox) {
      const nightMode = localStorage.getItem("nightMode");
      if (nightMode == undefined) {
        localStorage.setItem("nightMode", "true");
        checkbox.checked = false;
        setNightMode(true);
      } else if (nightMode === "true") {
        checkbox.checked = false;
        setNightMode(true);
      } else {
        checkbox.checked = true;
        setNightMode(false);
      }
      toggleNightMode(checkbox);
    }
  }, []);

  function toggleCheckbox() {
    const checkbox = document.getElementById(
      "hide-checkbox"
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    toggleNightMode(checkbox);
    // @ts-ignore
    setNightMode((nightMode: boolean) => !nightMode);
  }
  function toggleNightMode(checkbox: HTMLInputElement) {
    const root = document.documentElement;
    if (!checkbox.checked) {
      localStorage.setItem("nightMode", "true");
      Object.entries(colors.blackMode).forEach(([colorName, color]) => {
        root.style.setProperty(`--${colorName}`, color);
      });
    } else {
      localStorage.setItem("nightMode", "false");
      Object.entries(colors.whiteMode).forEach(([colorName, color]) => {
        root.style.setProperty(`--${colorName}`, color);
      });
    }
  }
  return (
    <div className="nightMode-wrapper" onClick={toggleCheckbox}>
      <input type="checkbox" id="hide-checkbox" />
      <label
        id="nightMode-toggle_checkbox"
        placeholder="hide-checkbox"
        className="toggle"
      >
        <span className="toggle-button">
          <span className="crater crater-1"></span>
          <span className="crater crater-2"></span>
          <span className="crater crater-3"></span>
          <span className="crater crater-4"></span>
          <span className="crater crater-5"></span>
          <span className="crater crater-6"></span>
          <span className="crater crater-7"></span>
        </span>
        <span className="star star-1"></span>
        <span className="star star-2"></span>
        <span className="star star-3"></span>
        <span className="star star-4"></span>
        <span className="star star-5"></span>
        <span className="star star-6"></span>
        <span className="star star-7"></span>
        <span className="star star-8"></span>
      </label>
    </div>
  );
}
