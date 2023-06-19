/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useContext } from 'react';
import EventRow from './EventRow'
import { MyContext } from '../../services/MyProvider';

export default function HydrantOtherEvents({ focusedEvent, eventHandle ,disabledFocus}) {
  const { eventsArr } = useContext(MyContext); // all Hydrant's Events
  //filter New or Open events for current hydrant
  const filterdEvents = eventsArr?.filter(event => (event.hydrant_id === focusedEvent.hydrant_id && event.status !== 2));

  return (
    <div className='otherEventsContainer'>
      <h4>האירועים הפתוחים בברז כיבוי האש</h4>
      <div className="hydrantEventsGrid">
        <h5>סוג</h5>
        <h5>כמות</h5>
        <h5>סטטוס</h5>
        <h5>טיפול מרובה</h5>
      </div>
      <hr style={{ margin: "0 1rem" }} />
      <div className="eventRawsContainer">
        {
          //Create EventRow for each event of cureent Hydrant
          filterdEvents?.map((event) =>
            <EventRow
              key={event.event_id}
              currentEventRaw={event}
              focusedEvent={focusedEvent}
              disabledCheckBox={([5, 6].includes(event.trigger_id) && eventHandle.selectedHandle === "-1") || (event.trigger_id !== 1 && eventHandle.authoriser !== "")}
              disabledFocus={disabledFocus}
               />
          )
        }
      </div>
    </div>
  )
}
