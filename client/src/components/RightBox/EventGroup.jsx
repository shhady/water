/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import Event from "./Event";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import TrigIcon from '../../components/TrigIcon/TrigIcon'


const EventGroup = ({ eventTypeId, eventGroupId, triggerId, title, filterdEvents }) => {


    var eventGroup = "eventGroup";
    if (!filterdEvents.length)  //check if we have events in this group
        eventGroup += " hide"; //hide this event group

    return (
        <label htmlFor={eventTypeId}>
            {/* <!-- Invisible radio buttons to cascade events --> */}
            <input type="radio" name="eventType" id={eventTypeId} />
            <div className={eventGroup} id={eventGroupId} >
                {/********  Header area **************/}
                <div className="eventGroupHeader" id={eventGroupId}>
                    <div className="eventGroupHeaderWrapper">
                        {/* <img src={EVENT_ICONS[triggerId]} className="eventIcon" alt="" /> */}
                        {triggerId && <TrigIcon trigger={triggerId} className="eventIcon" style={{margin:"0 0 0 4px"}}/>}
                        <p className="eventGroupCounter">{filterdEvents.length}</p>
                        <p className="eventGroupTitle"> {title} </p>
                    </div>
                    <p className="dropDownMark" ><FontAwesomeIcon icon={faChevronLeft} /></p>
                    <label className="dropUpMark" htmlFor="noEvent">
                        <FontAwesomeIcon icon={faChevronUp} />
                    </label>
                </div>
                {/************* list of all events in this group type **********/}
                <div className="eventGroupList" >
                    {
                        filterdEvents.map((event, idx) =>
                            <Event key={idx} currentEvent={event} eventGroupId={eventGroupId} />)
                    }
                </div>
            </div>
        </label >
    );
}

export default EventGroup;

EventGroup.propType = {
    eventTypeId: PropTypes.string,
    eventGroupId: PropTypes.string,
    triggerId: PropTypes.string,
    title: PropTypes.string,
    filterdEvents: PropTypes.array
}