/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import EventGroup from "./EventGroup";
import { MyContext, EVENTS_TITLES } from "../../services/MyProvider";
import { useContext, useEffect } from 'react';

const OpenEventsTab = ({ TabClass }) => {

    const { eventsArr } = useContext(MyContext);

    useEffect(() => {//CSS count groups to maximize scroll area
        let count = 0;

        eventsArr?.filter(event => (event.trigger_id === 1 && event.status === 1)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 2 && event.status === 1)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 3 && event.status === 1)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 5 && event.status === 1)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 6 && event.status === 1)).length && count++;
        eventsArr?.filter(event => (event.trigger_id === 7 && event.status === 1)).length && count++;

        document.documentElement.style.setProperty('--OpenEvents-Group-Count', count);

    }, [eventsArr])

    return (


        <div id="openEventsTab" className={TabClass}>
            {/* this radio used when we select no event group */}
            <label htmlFor="noEvent">
                <input type="radio" name="eventType" id="noEvent" />
            </label>
            {eventsArr &&
                <>
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 2 && event.status === 1))} eventTypeId="openRevers" eventGroupId="reversFlows" triggerId={2} title={EVENTS_TITLES.trig2} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 1 && event.status === 1))} eventTypeId="openAbnormal" eventGroupId="abnormalFlows" triggerId={1} title={EVENTS_TITLES.trig1} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 3 && event.status === 1))} eventTypeId="openVandalist" eventGroupId="vandalisem" triggerId={3} title={EVENTS_TITLES.trig3} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 7 && event.status === 1))} eventTypeId="openPresure" eventGroupId="pipePresure" triggerId={7} title={EVENTS_TITLES.trig7} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 6 && event.status === 1))} eventTypeId="openSignal" eventGroupId="noSignal" triggerId={6} title={EVENTS_TITLES.trig6} />
                    <EventGroup filterdEvents={eventsArr.filter(event => (event.trigger_id === 5 && event.status === 1))} eventTypeId="openBattary" eventGroupId="noBattary" triggerId={5} title={EVENTS_TITLES.trig5} />
                
                    {(eventsArr.filter(event => (event.status === 1)).length === 0) && 
                    <h4 style={{color:'var(--textColor)' , padding:"1rem"}}>אין אירועים בטיפול</h4>}
                </>                
            }
        </div>
    );
}

export default OpenEventsTab;
