/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useContext, useState, useEffect } from 'react'
import { MyContext, EVENTS_TITLES } from '../../services/MyProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function EventRow({ currentEventRaw, focusedEvent, disabledCheckBox, disabledFocus  }) {
  let focusedRaw = (currentEventRaw.event_id === focusedEvent.event_id);  //chack if current row is focused
  const { setFocusedEvent ,setEventsToHandle} = useContext(MyContext); //callback function to focus on Event
  const [value, setValue] = useState(currentEventRaw.event_id === focusedEvent.event_id)

  useEffect(() => {
    if (disabledCheckBox) setValue(false)
  }, [disabledCheckBox])
  
  useEffect(() => {
    if (currentEventRaw.event_id === focusedEvent.event_id) setValue(true)
  }, [focusedEvent])

  useEffect(() => {

    setEventsToHandle(old =>
      (value) ?
        [...old.filter(eventId => eventId !== currentEventRaw.event_id), currentEventRaw.event_id]
        :
        [...old.filter(eventId => eventId !== currentEventRaw.event_id)]

    )
  }, [value])

  const handleRowClick = () => {
    if (!disabledFocus) {
      setValue(true);
      setFocusedEvent(currentEventRaw);
    }
  }

  return (

    <div className='eventRowWrapper'>
      <div
        onClick={handleRowClick}
        className={`eventRow ${(focusedRaw) ? `focusedRaw focusedRawTrig${focusedEvent.trigger_id}`
          : (disabledFocus) ? "disabled"
            : (currentEventRaw.trigger_id === 2) ? "btn ReverseFlowBtn" : "btn"}`}>
        <span > {EVENTS_TITLES['trig' + currentEventRaw.trigger_id]}</span>
        <span > {(currentEventRaw.value) ? currentEventRaw.value : ""} {currentEventRaw.value_type}</span>
        <span >{(Number(currentEventRaw.status) === 2) ? "סגור" : (currentEventRaw.status) ? "בטיפול" : "חדש"}</span>
        <p></p>


        <label>{disabledFocus || <FontAwesomeIcon icon={faChevronLeft} />}</label>
      </div>
      <label htmlFor={`update${currentEventRaw.event_id}`} className="appendHandle" disabled={disabledCheckBox} >
      <input
          type="checkbox"
        
          disabled={disabledCheckBox}
          checked={value}
          onChange={() => setValue(state => !state)}
          id={`update${currentEventRaw.event_id}`}
          style={{ borderColor: (currentEventRaw.trigger_id === 2) ? 'var(--red)' : 'var(--green)' }}
        />        
        צירוף&nbsp;טיפול
      </label>
    </div>


  )
}
