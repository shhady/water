/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

// import PropTypes from 'prop-types';
import {  useContext } from 'react';
import { MyContext } from '../../services/MyProvider';

export default function Event({ currentEvent, eventGroupId }) {

    const { hydrantArr,focusedEvent, setFocusedEvent, setEventsToHandle } = useContext(MyContext);//all Hydrants
    const hydrantFromArr = hydrantArr?.filter(hydrant => hydrant.hydrant_id === currentEvent.hydrant_id); //event Hydrant details
    const address = (hydrantFromArr && hydrantFromArr[0]) ? hydrantFromArr[0].street + '\xa0' + hydrantFromArr[0].number : "לא נמצאה כתובת ההידרנט";  //\xa0 == &nbsp; (non-breaking space)
    const eventStatus =  (currentEvent?.event_id === focusedEvent?.event_id) ? "focusedEvent" : "";

    const handleClick =()=>{
        setEventsToHandle(old =>[...old.filter(eventId => eventId !== currentEvent.event_id), currentEvent.event_id])
        setFocusedEvent(currentEvent);        
    }


    return (
        <div className={`event ${eventStatus}`} id={currentEvent.hydrant_id} onClick={handleClick}>
                <p className="hydrantId" id={eventGroupId}>{currentEvent.hydrant_id}</p>
            <p className="eventInfoLine">
                {(currentEvent.datetime_updated) ? currentEvent.datetime_updated : currentEvent.datetime_created}
                <br />
                {address}
            </p>

            {currentEvent.value > 0 &&
                <p className='eventValue'>
                    {currentEvent.value}
                    <br />
                    {currentEvent.value_type}
                </p>
            }


        </div>
    )
}

// Event.propType={
//     HydrantId:PropTypes.number,
//     address:PropTypes.string,
//     trigger:PropTypes.number,
//     dateTime:PropTypes.string
// }