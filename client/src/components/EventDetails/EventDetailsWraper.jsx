/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
// import PropTypes from 'prop-types';
import { useMemo, useRef, useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { MyContext, EVENTS_TITLES } from '../../services/MyProvider';
import EventDetails from './EventDetails';
import TrigIcon from '../../components/TrigIcon/TrigIcon'
import FatchDataApi from '../../services/FatchDataApi';


function EventDetailsWraper({ isReversFlow }) {
  const { focusedEvent, setFocusedEvent, hydrantArr, setMapClasses, eventsArr, accessToken, userInfo, customerNames, setCustomersNames } = useContext(MyContext);
  const [eventDetailsClass, setEventDetailsClass] = useState('collapse'); //Show/hide EventDetails Screen
  const currentEvent = useRef({}); //temp varible to enable nice closing this Component 
  const currentCustomerName = useRef(customerNames?.find(({ customer_id }) => customer_id === currentEvent.current?.customer_id))
  //we seek the relevent Hydrant to get is address details
  const hydrant = useMemo(() => hydrantArr?.find(hydrant => hydrant.hydrant_id === focusedEvent?.hydrant_id), [focusedEvent?.hydrant_id, hydrantArr]);

  //Toggle EventDetails & Map size when we have hydrant id & Event Trigger to focus on
  useEffect(() => {
    //if we have trigger event show the component
    if (focusedEvent) {
      setMapClasses('mapEventDistailsDisplayPort'); //smaller size Map
      setEventDetailsClass(''); //Display Event Details Screen
    }
    else {
      setMapClasses('') //Hide event Details Screen
      setEventDetailsClass('collapse');//Fullsize Map
    }
    //make sure component Visible evry Hydrant OR Trigger Change
  }, [focusedEvent])

  //if Event has event_id we focuse on 
  if (focusedEvent?.event_id) {
    currentEvent.current = eventsArr.filter(event => event.event_id === focusedEvent.event_id)[0];
    currentCustomerName.current = customerNames?.find(({ customer_id }) => customer_id === currentEvent.current?.customer_id);
  }
  useEffect(() => {

    if (accessToken && !customerNames)
      FatchDataApi('customer_names', 'GET', accessToken, setCustomersNames);

  }, [accessToken, customerNames])

  // T.B.D - Show Hydrant information when no event
  return (
    <div className={`EventDetailsWraper ${eventDetailsClass}`} style={isReversFlow ? { zIndex: 51 } : {}} >
      <header className={`HeaderTrig${focusedEvent?.trigger_id}`}>
        <div className={`HeaderWrapper eventType`} >
          {<TrigIcon trigger={currentEvent.current.trigger_id} white={currentEvent.current.trigger_id === 2} />}
          <h2 className='eventTitle'>&nbsp;אירוע&nbsp;-&nbsp;</h2>
          <h4>{EVENTS_TITLES['trig' + currentEvent.current.trigger_id]}</h4>
          <div className={`HeaderWrapper eventAddress`} >
            {hydrant && <h4>{hydrant.street}&nbsp;{hydrant.number}&nbsp;,{hydrant.city}</h4>}
          </div>
          {(currentCustomerName.current && userInfo?.customer_id !== currentCustomerName.current?.customer_id) &&
            <h2 style={{margin:'0 1rem',display:'flex',alignItems:'center',color: 'var(--green)'}}>
              {(currentCustomerName.current?.logo_url) && <img className='inRowLogo' src={currentCustomerName.current?.logo_url} alt={currentCustomerName.current?.customer_name} />}
                {currentCustomerName.current?.customer_name}
            </h2>
          }
        </div>


        <div className={`HeaderWrapper chevron`}>
          <h5>{currentEvent.current.hydrant_id}&nbsp;#</h5>
          {!isReversFlow &&
            <label className="dropUpMark" onClick={() => setFocusedEvent()} >
              <FontAwesomeIcon icon={faChevronUp} />
            </label>}
        </div>
      </header>
      <EventDetails event={currentEvent.current} disabledFocus={(isReversFlow) ? true : false} />
    </div>
  )

}

export default EventDetailsWraper

