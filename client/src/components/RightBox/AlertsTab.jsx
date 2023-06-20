
import { useState, useContext, useEffect } from 'react';
import { MyContext, EVENTS_TITLES } from '../../services/MyProvider';
import TrigIcon from '../TrigIcon/TrigIcon';



const AlertsTab = ({ TabClass }) => {
    const { hydrantArr, alertsArr } = useContext(MyContext);
    const [filteredAlerts, SetFilteredAlerts] = useState();
    useEffect(() => {
        SetFilteredAlerts(alertsArr?.filter(alert => alert.status === 0))  //filter only open alerts
    }, [alertsArr])

    return (

        <div className={TabClass} id='alertsTab'>

            {
                filteredAlerts?.map((alert, key) => {

                    let hydrantFromArr = hydrantArr?.filter(hydrant => hydrant.hydrant_id === alert.hydrant_id)[0]; //event Hydrant details
                    let address = (hydrantFromArr) ? hydrantFromArr.street + '\xa0' + hydrantFromArr.number : "לא נמצאה כתובת ההידרנט"

                    return (
                        <div key={key} className='alert'>
                            <TrigIcon trigger={alert.trigger_id} />
                            <p className="eventInfoLine">
                                {EVENTS_TITLES[`trig${alert.trigger_id}`]}
                                <br />
                                {alert.datetime_updated ? alert.datetime_updated : alert.datetime_created}
                                <br />
                                {address}
                            </p>
                            {alert.value > 0 &&
                                <p className='eventValue'>
                                    {alert.value}
                                    <br />
                                    {alert.value_type}
                                </p>
                            }
                            <p className="hydrantId">{alert.hydrant_id}</p>
                        </div>

                    )
                })
            }

            {(filteredAlerts?.length === 0) && 
                    <h4 style={{color:'var(--textColor)' , padding:"1rem"}}>אין התרעות פתוחות</h4>}

        </div>
    );
}


export default AlertsTab;
