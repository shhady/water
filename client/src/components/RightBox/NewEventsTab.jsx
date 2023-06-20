/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import EventGroup from "./EventGroup";
import { MyContext, EVENTS_TITLES } from "../../services/MyProvider";
import { useContext, useEffect } from 'react';
const NewEventsTab = ({ TabClass }) => {

    const { eventsArr } = useContext(MyContext);

    useEffect(() => {

        let count = 0; //CSS count groups to maximize scroll area
        eventsArr?.filter(event => (event.trigger_id === 1 && event.status === 0)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 2 && event.status === 0)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 3 && event.status === 0)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 5 && event.status === 0)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 6 && event.status === 0)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 7 && event.status === 0)).length && count++;
        document.documentElement.style.setProperty('--NewEvents-Group-Count', count);

    }, [eventsArr])


    return (


        <div id="newEventsTab" className={TabClass}>
            {/* this radio used when we select no event group */}
            <label htmlFor="noEvent">
                <input type="radio" name="eventType" id="noEvent" />
            </label>

            {eventsArr &&
                <>
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 2 && !event.status))} eventTypeId="newRevers" eventGroupId="reversFlows" triggerId={2} title={EVENTS_TITLES.trig2} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 1 && !event.status))} eventTypeId="newAbnormal" eventGroupId="abnormalFlows" triggerId={1} title={EVENTS_TITLES.trig1} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 3 && !event.status))} eventTypeId="newVandalist" eventGroupId="vandalisem" triggerId={3} title={EVENTS_TITLES.trig3} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 7 && !event.status))} eventTypeId="newPresure" eventGroupId="pipePresure" triggerId={7} title={EVENTS_TITLES.trig7} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 6 && !event.status))} eventTypeId="newSignal" eventGroupId="noSignal" triggerId={6} title={EVENTS_TITLES.trig6} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 5 && !event.status))} eventTypeId="newBattary" eventGroupId="noBattary" triggerId={5} title={EVENTS_TITLES.trig5} />
                
                    {(eventsArr.filter(event => (event.status === 0)).length === 0) && 
                    <h4 style={{color:'var(--textColor)' , padding:"1rem"}}>אין אירועים חדשים</h4>}
                </>
            }
            

        </div>
    );
}

export default NewEventsTab;
