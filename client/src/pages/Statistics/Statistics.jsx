import { useState, useContext, useEffect, } from 'react'
import { MyContext } from '../../services/MyProvider'
import FatchDataApi from '../../services/FatchDataApi'
import usePageTitle from '../../services/usePageTitle'
import AuthoriserTable from './AuthoriserTable'
import AuthoriserPie from './AuthoriserPie';
import TriggerTable from './TriggerTable'
import TriggersPie from './TriggersPie'
import './statistics.css'


/**
 * The statistics page.
 * @returns The statistics page.
 */
export default function Statistics() {
  usePageTitle("סטטיסטיקה");
  const { accessToken, setIsLoading } = useContext(MyContext);
  const [statisticsType, setStatisticsType] = useState(1)
  const [authoriserData, setAuthoriserData] = useState();
  const [triggersData, setTriggersData] = useState();

  useEffect(() => {

    //Show Loading animation on component load
    if ((statisticsType === 0 && !authoriserData) || (statisticsType === 1 && !triggersData))
      setIsLoading(true)


    //callback to handle response error
    const HandleReject = (error) => { setIsLoading(false) }

    // initial get statistics 
    if (accessToken && !authoriserData)
      FatchDataApi('statistics/authoriser', 'GET', accessToken, setAuthoriserData, { onReject: HandleReject });
    if (accessToken && !triggersData)
      FatchDataApi('statistics/triggers', 'GET', accessToken, setTriggersData, { onReject: HandleReject });

    //Stop Loading animation on component loaded
    if ((statisticsType === 0 && authoriserData) || (statisticsType === 1 && triggersData)) setIsLoading(false)

  }, [accessToken, statisticsType, authoriserData, triggersData]);


  return (
    <>
      <div className="screen-header">
        <h1 className="header-title">סטטיסטיקה&nbsp;-&nbsp;
        <span style={{ color: 'var(--green)' }}>
          {(statisticsType === 0) && "גורמים מורשים"}
          {(statisticsType === 1) && "התראות"}
        </span>
        </h1>
      <div className='btnContainer'>
        <span style={{color:'var(--white)'}}>נתונים להצגה:&nbsp;</span>
        <button className='btn wideBtn' disabled={(statisticsType === 0)} onClick={(e) => setStatisticsType(0)} >גורמים מורשים</button>
        <button className='btn wideBtn' disabled={(statisticsType === 1)} onClick={(e) => setStatisticsType(1)} >התראות</button>
      </div>
      </div>
      <div className="statistics">
        {(statisticsType === 0) &&
          <>
            <AuthoriserTable data={authoriserData} />
            <AuthoriserPie data={authoriserData} />
          </>}
        {(statisticsType === 1) &&
          <>
            <TriggerTable data={triggersData} />
            <TriggersPie data={triggersData} />
          </>}
      </div>
    </>
  )
}
