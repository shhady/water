import { Outlet } from "react-router-dom";
import { Alert } from "../";
import useChangeLanguage from "../../CustomHook/useChangeLanguage";
import { setItem } from "../../services/localStorageService";
import translate from "../../services/translate";

const SharedLayout = () => {
  const { language, handleLanguageChange } = useChangeLanguage();

  const reloadWindow = () => {
    window.location.reload();
  };
  return (
    <>
      <select
        name="language"
        id="language"
        value={language}
        onChange={(e) => {
          const language = e.target.value;
          handleLanguageChange(e);
          localStorage.setItem("language", language);
          reloadWindow();
        }}
        className={`form-input m-t`}
      >
        <option value="">{translate(language, "Change language")}</option>
        <option value="he">עברית</option>
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>

      <div className="container">
        <Alert />
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
