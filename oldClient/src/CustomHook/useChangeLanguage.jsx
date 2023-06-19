import { useState } from "react";

import useInput from "./useInput";

const useChangeLanguage = () => {

  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const {
    value: language,
    setValue: setValueLanguage,
    error: languageError,
    handleChange: handleLanguageChange,
    handleBlur: handleLanguageBlur,
  } = useInput("", setError);

  return {
    language,
    handleLanguageChange
  };
};

export default useChangeLanguage;
