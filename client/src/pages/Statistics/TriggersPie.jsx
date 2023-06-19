/* A React component that renders a pie chart. */
import { useMemo } from 'react';
import { EVENTS_TITLES,EVENT_COLORS } from '../../services/MyProvider'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, defaults } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

defaults.font.family = 'Assistant';
defaults.font.size = 22;

/**
 * Registers the given chart elements with the ChartJS library.  This is necessary because the 
 * ChartJS library is not a module, and therefore does not have a global registry of chart elements. 
 * @param elements - The chart elements to register. 
 * @returns None
 */
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);


/**
 * A component that renders a pie chart of the number of alerts by trigger.
 * @param data - The data to be rendered.
 * @returns A pie chart of the number of alerts by trigger.
 */
function AuthoriserPie({ data }) {

  /**
   * A hook that returns a pie chart data object.
   * @returns A pie chart data object.
   */
  const pieData = useMemo(() => data?.reduce((accumulator, row) => {    
    if (row.trigger_id in accumulator) {
      accumulator[row.trigger_id] += row.count_alerts;
      return accumulator
    }
    else {
      accumulator[row.trigger_id] = row.count_alerts;
      return accumulator
    }

  }, {}), [data])

  return <div className='pieWrappper'>{(data) && <Pie
    options={{
      responsive: true,
      maintainAspectRatio: (data?.length>=10)?false:true,
      plugins: {
        offset: '50%',
        title: { text: 'חיווי', display: true, weight: 'bold', family: 'Assistant', size: 30 },
        legend: {
          rtl: true, display: true, position: "bottom",
        },
        tooltip: {
          rtl: true,

          callbacks: { label: ( {label, formattedValue} ) => '\u000A\u000A'+label+" : "+formattedValue+' התראות' },
          padding:10,
          bodyAlign :'right'

        },
        datalabels: {
          display: true,
          color: 'black',
          font: { family: 'Assistant', size: 20 },
        },

      },
    }}
    data={{
      labels: [...Object.values(Object.fromEntries(Object.entries(EVENTS_TITLES)
        .filter(([key]) => ['trig1','trig2','trig3','trig5','trig6','trig7'].includes(key))))],
      datasets: [
        {
          label: 'data1',
          data: [...Object.values(pieData)],

          backgroundColor: [
            ...Object.values(EVENT_COLORS)
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