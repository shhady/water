import { useState } from "react";

import useInput from "./useInput";

const useChoseTypeStatistic = () => {

  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const {
    value: statisticType,
    setValue: setValueStatisticType,
    error: statisticTypeError,
    handleChange: handleStatisticTypeChange,
    handleBlur: handleStatisticTypeBlur,
  } = useInput("", setError);

  return {
    statisticType,
    handleStatisticTypeChange
  };
};

export default useChoseTypeStatistic;
