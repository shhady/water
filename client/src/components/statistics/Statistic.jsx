import {  useEffect } from "react";
import { useStatisticsContext } from "../../context/statistics/StatisticsContext";
import { StatisticItem } from "..";
import {Spinner} from "..";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";//please not remove this, must have it in the code even though not in use 
import { CategoryScale } from "chart.js";
import {
  OPEN_INQUIRIES_LABEL,
  HANDLED_ALERT_LABEL,
  CHART_OPTIONS_TEXT,
  CHART_TITLE_H2, TOTAL_LABEL
} from "../../constants";

const Statistic = ({statisticType}) => {
  const {
    loading,
    getHandledAlert,
    handledAlert
  } = useStatisticsContext();

  useEffect(() => {
    getHandledAlert(statisticType)
  }, [statisticType]);
  
  if (loading) {
    return <Spinner/>;
  } else {
  return (
    <div className="grid-1">
      {handledAlert && <StatisticItem
        data = {[handledAlert.inquiries - handledAlert.handledAlert, handledAlert.handledAlert]}
        labels = {[OPEN_INQUIRIES_LABEL, HANDLED_ALERT_LABEL]}
        backgroundColor = {   [
          "#bc3c31",
          "#39b452",
        ]}
        insideLabel ={TOTAL_LABEL}
        graphType = {{ component: Pie }}
        text =  {CHART_OPTIONS_TEXT}
         chartTitle = {CHART_TITLE_H2}
      />}
    </div>
  );
  }
};

export default Statistic;
