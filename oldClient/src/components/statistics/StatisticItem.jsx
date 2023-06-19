

import { useState } from "react";


const StatisticItem =
  ({ data, labels, backgroundColor, insideLabel, graphType, text, chartTitle}
  ) => {

    const [chartData, setChartData] = useState({
      labels: labels ,
      datasets: [
        {
          label: insideLabel,
          data,
          backgroundColor,
          borderColor: "black",
          borderWidth: 2
        },
      ]
    });

    return (
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
        <graphType.component  style={{ margin: "auto", width: "30vw" }}
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text
              }
            }
          }}
        />
      </div>
    );
  };

export default StatisticItem;
