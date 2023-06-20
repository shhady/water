import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, defaults } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

defaults.font.family = 'Assistant';
defaults.font.size = 22;

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);


/**
 * A pie chart that shows the amount of money spent by each authoriser.
 * @param data - The data to be used for the pie chart.
 * @returns A pie chart that shows the amount of money spent by each authoriser.
 */
function AuthoriserPie({ data }) {

  const pieData = useMemo(() => data?.reduce((accumulator, row) => {
    let autorizer = (row.event_status) ? (row.authoriser) ? row.authoriser : 'ללא גורם מורשה' : 'ללא אירוע';
    if (autorizer in accumulator) {
      accumulator[autorizer] += row.sum_value;
      return accumulator
    }
    else {
      accumulator[autorizer] = row.sum_value;
      return accumulator
    }

  }, {}), [data])

  return <div className='pieWrappper'>{(data) && <Pie
    options={{
      responsive: true,
      maintainAspectRatio: (data?.length>=10)?false:true,
      plugins: {
        offset: '50%',
        title: { text: 'גורם מורשה', display: true, weight: 'bold', family: 'Assistant'},
        legend: {
          rtl: true, display: true, position: "bottom",
          // labels: { font: { family: 'Assistant', size: 20 } } 
        },
        tooltip: {
          rtl: true,

          callbacks: { label: ( {label, formattedValue} ) => '\u000A\u000A'+label+" : "+formattedValue+' ליטרים' },
          padding:10,
          // yAlign:'buttom',
          bodyAlign :'right'
          // bodyFont: { family: 'Assistant', size: 20 },
          // titleFont: { family: 'Assistant', size: 20 },
        },
        datalabels: {
          display: true,
          color: 'black',
          font: { family: 'Assistant', size: 20 },
        },

      },
    }}
    data={{
      labels: [...Object.keys(pieData)],
      datasets: [
        {
          label: 'data1',
          data: [...Object.values(pieData)],

          backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)',
            'rgba(255, 255, 0, 0.5)',
            'rgba(255, 0, 255, 0.5)',
            'rgba(0, 255, 255, 0.5)',
          ],
          borderColor: 'white',
          borderWidth: 6,
        },

      ]

    }}
  />}
  </div>
}

export default AuthoriserPie