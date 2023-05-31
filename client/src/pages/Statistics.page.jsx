import { useState } from "react";
import useChoseTypeStatistic from "../CustomHook/useChoseTypeStatistic";
import { Statistic } from "../components";
import TableLookUps from "../constants/TableLookUps";

const Statistics = () => {
  const [chooseType, setChooseType] = useState(null);
  const { statisticType } = useChoseTypeStatistic();

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
        <option value="">{TableLookUps("STATISTIC_BUTTON")}</option>
        <option value="day">{TableLookUps("DAILY")}</option>
        <option value="week">{TableLookUps("WEEKLY")}</option>
        <option value="month">{TableLookUps("MONTHLY")}</option>
        <option value="year">{TableLookUps("YEARLY")}</option>
      </select>
      {chooseType && <Statistic statisticType={chooseType} />}{" "}
    </>
  );
};

export default Statistics;
