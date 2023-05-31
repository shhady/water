import { useEffect } from "react";
import { useStatisticsContext } from "../../context/statistics/StatisticsContext";
import { StatisticItem } from "..";
import { Spinner } from "..";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto"; //please not remove this, must have it in the code even though not in use
import { CategoryScale } from "chart.js";
import translate from "../../services/translate";

const Statistic = ({ statisticType }) => {
  const { loading, getHandledAlert, handledAlert } = useStatisticsContext();
  const language = localStorage.getItem("language");

  useEffect(() => {
    getHandledAlert(statisticType);
  }, [statisticType]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="grid-1">
      {handledAlert && (
        <StatisticItem
          data={[
            handledAlert.inquiries - handledAlert.handledAlert,
            handledAlert.handledAlert,
          ]}
          labels={[
            translate(language, "Open enquiries"),
            translate(language, "Handled alert"),
          ]}
          backgroundColor={["#bc3c31", "#39b452"]}
          insideLabel={translate(language, "Total")}
          graphType={{ component: Pie }}
          text={translate(language, "Status of inquiries")}
          chartTitle={translate(language, "Inquiries handled")}
        />
      )}
    </div>
  );
};

export default Statistic;
