import { useState, useEffect } from "react";
import useInput from "./useInput";
// import { useAlertGlobalContext } from "../context/alert/AlertContext";
import { validateNumber, validateMeaning } from "../utils";

import {
  MS_1000,
   SUCCESS_ADD_ROW_MSG,
  SUCCESS_TIME_ALERT,
  DEFAULT_TIME_WAITING,
  TRIGGER_FIELD_ERROR,
  NUMBER_FIELD_ERROR,
  MEANING_FIELD_ERROR,
  SYSTEM_FIELD_ERROR,

} from "../constants";

import { apiPost } from "../api/api";

const useAddTrigger = () => {
  // const { setAlert } = useAlertGlobalContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    trigger: "",
    meaning: "",
    number: "",
    system: "",
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  
  useEffect(() => {
    const addTrigger = async () => {

      try {
        apiPost("Triggers", formData);
      } catch (error) {
        console.error(error);
        setError({
          isError: true,
          message: error.response.data.message,
        });
      }

      const intervalId = setTimeout(() => {
        // setAlert(SUCCESS_ADD_ROW_MSG, "success", SUCCESS_TIME_ALERT);
        setIsDisabled(false);
        setValueTrigger("");
        setValueMeaning("");
        setValueSystem("");
        setValueNumber("");

        return () => clearInterval(intervalId);
      }, MS_1000 * DEFAULT_TIME_WAITING);
    };
    if (formData.trigger !== "") {
      addTrigger();
    }
  }, [formData]);

  const {
    value: trigger,
    setValue: setValueTrigger,
    error: triggerError,
    handleChange: handleTriggerChange,
    handleBlur: handleTriggerBlur,
  } = useInput(TRIGGER_FIELD_ERROR, setError);

  const {
    value: meaning,
    setValue: setValueMeaning,
    error: meaningError,
    handleChange: handleMeaningChange,
    handleBlur: handleMeaningBlur,
  } = useInput(MEANING_FIELD_ERROR, setError, validateMeaning);

  const {
    value: number,
    setValue: setValueNumber,
    error: numberError,
    handleChange: handleNumberChange,
    handleBlur: handleNumberBlur,
  } = useInput(NUMBER_FIELD_ERROR, setError, validateNumber);

  const {
    value: system,
    setValue: setValueSystem,
    error: systemError,
    handleChange: handleSystemChange,
    handleBlur: handleSystemBlur,
  } = useInput(SYSTEM_FIELD_ERROR, setError);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !trigger ||
      !meaning ||
      !number ||
      !system ||
      triggerError.isError ||
      meaningError.isError ||
      numberError.isError ||
      systemError.isError
    ) {
      setError(true);
      handleTriggerBlur();
      handleMeaningBlur();
      handleNumberBlur();
      handleSystemBlur();
      return;
    } else {

      setIsDisabled(true);

      setFormData({
        ...formData,
        trigger: trigger,
        meaning: meaning,
        number: number,
        system: system,
      });

      setTimeout(() => {
        setError(false);
      }, DEFAULT_TIME_WAITING);
    }
  };

  return {
    trigger,
    triggerError,
    handleTriggerChange,
    handleTriggerBlur,
    meaning,
    meaningError,
    handleMeaningChange,
    handleMeaningBlur,
    number,
    numberError,
    handleNumberChange,
    handleNumberBlur,
    system,
    systemError,
    handleSystemChange,
    handleSystemBlur,
    handleSubmit,
    isDisabled,
    formData,
    error,
  };
};

export default useAddTrigger;
