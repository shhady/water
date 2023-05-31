import { useState } from "react";
import useChoseTypeStatistic from "../CustomHook/useChoseTypeStatistic";
<<<<<<< HEAD
import { Statistic } from "../components";
import translate from "../services/translate";
=======
import {Statistic} from "../components";
import {
  STATISTIC_BUTTON,
  STATISTIC_TYPE_A_OPTION,
  STATISTIC_TYPE_B_OPTION,
  STATISTIC_TYPE_C_OPTION,
  STATISTIC_TYPE_D_OPTION
} from "../constants";
import TableLookUps from "../constants/TableLookUps";
>>>>>>> 7c8833738fbb76792ef7d499123d6a971654696c

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
<<<<<<< HEAD
        <option value="">{translate(language, "")}</option>
        <option value="day">{translate(language, "Daily")}</option>
        <option value="week">{translate(language, "Weekly")}</option>
        <option value="month">{translate(language, "Monthly")}</option>
        <option value="year">{translate(language, "Yearly")}</option>
=======
        <option value=''>{TableLookUps("STATISTIC_BUTTON")}</option>
        <option value="day">{TableLookUps("STATISTIC_TYPE_A_OPTION")}</option>
        <option value="week">{TableLookUps("STATISTIC_TYPE_B_OPTION")}</option>
        <option value="month">{TableLookUps("STATISTIC_TYPE_C_OPTION")}</option>
        <option value="year">{TableLookUps("STATISTIC_TYPE_D_OPTION")}</option>
>>>>>>> 7c8833738fbb76792ef7d499123d6a971654696c
      </select>
      {chooseType && <Statistic statisticType={chooseType} />}{" "}
    </>
  );
};

export default Statistics;
