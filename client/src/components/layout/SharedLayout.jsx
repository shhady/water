import { Outlet } from "react-router-dom";
import { Alert } from "../";
import useChangeLanguage from "../../CustomHook/useChangeLanguage";
import { setItem, getItem } from "../../services/localStorageService";
import {
  setLanguage
} from "../../constants/TableLookUps";

const currentLanguage = getItem('language');

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
        className={`dropdown form-input m-t`}
      >
        <option value='' style={{backgroundColor:'black'} }>{`${currentLanguage === 'en' ? 'English' : currentLanguage === 'he' ? 'עברית' : 'العربية'}`}</option>
        {currentLanguage !== 'he' && <option value="he"  >עברית</option>
        }{currentLanguage !== 'en' && <option value="en" >English</option>
        }{currentLanguage !== 'ar' && <option value="ar">العربية</option>
        }      </select>

      <div className="container">
        <Alert />
        <Outlet />
      </div>
    </>
  );
};
export default SharedLayout;
