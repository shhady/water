import { Outlet } from "react-router-dom";
import { Alert } from "../";
import  useChangeLanguage  from "../../CustomHook/useChangeLanguage";
import { setItem } from "../../services/localStorageService";
import {

  LANGUAGE_BUTTON,
  setLanguage
} from "../../constants";
const SharedLayout = () => {

  const { language,
    handleLanguageChange
  } = useChangeLanguage();

  const reloadWindow = () => {
    window.location.reload();
  }
  return (
    <>
      <select
        name="language"
        id="language"
        value={language}
        onChange={(e) => {
          const language = e.target.value;
          handleLanguageChange(e);
          setItem('language', language);
          setLanguage(language);
          reloadWindow();
        }}
        className={`form-input m-t`}
      >
        <option value=''>{LANGUAGE_BUTTON}</option>
        <option value="he">עברית</option>
        <option value="en">English</option>
      </select>

      <div className="container">
        <Alert />
        <Outlet />
      </div>
    </>
  );
};
export default SharedLayout;
