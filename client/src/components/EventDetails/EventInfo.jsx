/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useContext } from 'react'
import { MyContext } from '../../services/MyProvider';
import EventHistoryHandles from './EventHistoryHandles';

export default function EventInfo({ focusedEvent, invoke }) {

  const { hydrantArr, alertsArr } = useContext(MyContext); //all Hydrants
  //we seek the relevent Hydrant to get is address details
  const hydrantFromArr = hydrantArr?.find(hydrant => hydrant.hydrant_id === focusedEvent.hydrant_id);
  const alertFromArr = alertsArr?.find(alert => alert.alert_id === focusedEvent.alert_id);


  return (
    <div className="eventInfo" >
      <h4>פרטי האירוע</h4>
      <div className="DetailsGrid">

        <label className="detailsMiniLable">נפתח:</label>
        <p>{focusedEvent.datetime_created}</p>
        {focusedEvent.datetime_updated &&
          <>
            <label className="detailsMiniLable">עודכן:</label>
            <p>{focusedEvent.datetime_updated}</p>
          </>
        }

        <p className="detailsMiniLable">סטטוס&nbsp;:</p>
         <p>
          <span>{(focusedEvent.status === 2) ? "סגור" : (focusedEvent.status) ? "אירוע בטיפול" : "אירוע חדש"},&nbsp;</span>

          <span className="detailsMiniLable">התראה&nbsp;
            {
              (alertFromArr && alertFromArr.status===0) ?
                 <>פעילה</>:<>הסתיימה</>
            }
          </span>
        </p>

      </div>
      {focusedEvent.handle_id && <EventHistoryHandles event_id={focusedEvent.event_id} invoke={invoke} />}
    </div>

  )
}
