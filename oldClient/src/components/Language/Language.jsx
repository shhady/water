import React from "react";
import useChangeLanguage from "../../CustomHook/useChangeLanguage";
import { setItem, getItem } from "../../services/localStorageService";
import { setLanguage } from "../../constants/TableLookUps";

const currentLanguage = getItem("language");

const LanguageSelector = () => {
  const { language, handleLanguageChange } = useChangeLanguage();

  const reloadWindow = () => {
    window.location.reload();
  };

  return (
    <select
      name="language"
      id="language"
      value={language}
      onChange={(e) => {
        const selectedLanguage = e.target.value;
        handleLanguageChange(e);
        setLanguage(selectedLanguage);
        reloadWindow();
      }}
      className="dropdown form-input m-t"
    >
      <option
        value=""
        style={{ backgroundColor: "black" }}
      >{`${currentLanguage === "en" ? "English" : currentLanguage === "he" ? "עברית" : "العربية"}`}</option>
      {currentLanguage !== "he" && <option value="he">עברית</option>}
      {currentLanguage !== "en" && <option value="en">English</option>}
      {currentLanguage !== "ar" && <option value="ar">العربية</option>}
    </select>
  );
};

export default LanguageSelector;
