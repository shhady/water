
import { useState, useEffect } from "react";
import useChoseTypeStatistic from "../CustomHook/useChoseTypeStatistic";
import {Statistic} from "../components";
import {
  STATISTIC_BUTTON,
  STATISTIC_TYPE_A_OPTION,
  STATISTIC_TYPE_B_OPTION,
  STATISTIC_TYPE_C_OPTION,
  STATISTIC_TYPE_D_OPTION
} from "../constants";
import TableLookUps from "../constants/TableLookUps";

const Statistics = () => {
  const [chooseType, setChooseType] = useState(null);
  const { statisticType,
  } = useChoseTypeStatistic();
  useEffect(() => {
  }, []);

  const setStatisticType = (e) => {
    setChooseType(e.target.value)
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
        <option value=''>{TableLookUps("STATISTIC_BUTTON")}</option>
        <option value="day">{TableLookUps("STATISTIC_TYPE_A_OPTION")}</option>
        <option value="week">{TableLookUps("STATISTIC_TYPE_B_OPTION")}</option>
        <option value="month">{TableLookUps("STATISTIC_TYPE_C_OPTION")}</option>
        <option value="year">{TableLookUps("STATISTIC_TYPE_D_OPTION")}</option>
      </select>
{     chooseType &&  <Statistic statisticType={chooseType} />
}    </>
  );
};

export default Statistics;
