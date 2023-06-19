/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import HandleEvent from './HandleEvent';
import EventInfo from './EventInfo';
import HydrantOtherEvents from './HydrantOtherEvents';
import EventHistoryHandles from './EventHistoryHandles';
import { useState, useEffect, useContext,useMemo } from 'react';
import { MyContext } from '../../services/MyProvider';

export default function EventDetails({ event, className = 'EventDetails', showInfo = true ,disabledFocus=false}) {
  const { userInfo, setEventsToHandle } = useContext(MyContext)
  const customClass = useMemo(() => (event?.trigger_id=== 2 && event?.status !== 2)? `${className} EventDetailsRevreseFlow`:`${className}`,[event?.trigger_id])
  //initialValue varible to enable nice closing this Component
  const initialValue = {
    user: userInfo.user_id,
    authoriser: "",
    customAuthoriser: "",
    selectedHandle: "",
    selectedHandlerUser: "",
    notes: "",
    mail: false,
    sms: false
  }
  
  //flag changes for  <EventHistoryHandles/> fetching server updates
  const [invoke, setInvoke] = useState(0)

  //Component State Holder User Handling choices
  const [eventHandle, setEventHandle] = useState(initialValue);
  //Pull Handling choices From Focused Event , Update on every Hydrant Change or Handling Change
  useEffect(() => {

    setEventHandle(initialValue)
    setEventsToHandle((event?.event_id) ? [event.event_id] : [])

  }, [event?.hydrant_id]) // eslint-disable-line react-hooks/exhaustive-deps  

  //Determain what grid tamplate needed
  const gridType = (event.status === 2) ? 1 :
    (showInfo || event.status !== 0) ? 3 : 2

    return (
    <div className={`${customClass} grid${gridType}`}>

      {/******************  אירועים נוספים בהידרנט ************************/}
      {(event.status !== 2) && <><HydrantOtherEvents focusedEvent={event} eventHandle={eventHandle} disabledFocus={disabledFocus} /> <hr /> </>}

      {/**********************  טיפולים לאירוע\פרטי אירוע ************************/}
      {(showInfo) ?
        <EventInfo focusedEvent={event} invoke={invoke} /> :
        (event.status !== 0) && <EventHistoryHandles event_id={event.event_id} invoke={invoke} detailsInside={(event.status===2)?false:true }/>}

      {(gridType === 3) && <hr />}

      {/************** טיפול באירוע *****************/}
      {(event.status !== 2) &&
        <HandleEvent
          focusedEvent={event}
          setInvoke={setInvoke}
          eventHandle={eventHandle}
          setEventHandle={setEventHandle}
          initialValue={initialValue} />
      }
    </div>

  )
}
