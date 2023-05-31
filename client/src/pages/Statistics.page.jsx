import { useState } from "react";
import useChoseTypeStatistic from "../CustomHook/useChoseTypeStatistic";
import { Statistic } from "../components";
import translate from "../services/translate";

const Statistics = () => {
  const [chooseType, setChooseType] = useState(null);
  const { statisticType } = useChoseTypeStatistic();

  const language = localStorage.getItem("language");

  const setStatisticType = (e) => {
    setChooseType(e.target.value);
  };

  return (
    <>
      <select
        name="statisticType"
        id="statisticType"
        value={statisticType}
        onChange={setStatisticType}
        className={`form-input m-t`}
      >
        <option value="">{translate(language, "")}</option>
        <option value="day">{translate(language, "Daily")}</option>
        <option value="week">{translate(language, "Weekly")}</option>
        <option value="month">{translate(language, "Monthly")}</option>
        <option value="year">{translate(language, "Yearly")}</option>
      </select>
      {chooseType && <Statistic statisticType={chooseType} />}{" "}
    </>
  );
};

export default Statistics;
