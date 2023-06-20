import React, { useContext, useEffect } from 'react'
import { MyContext } from '../../services/MyProvider'
import FatchDataApi from '../../services/FatchDataApi';
import usePageTitle from '../../services/usePageTitle';
import EventsTable from './EventsTable';

function Events() {

    const { accessToken, eventsArr, setEventsArr, setIsLoading } = useContext(MyContext);
    usePageTitle("ארועים");

    useEffect(() => {
        //Show Loading component on data undifiend
        if (!eventsArr)
            setIsLoading(true)
        
        //if no event fetch events
        if (accessToken && !eventsArr)
            FatchDataApi('events', 'GET', accessToken, setEventsArr, { onReject: ()=>setIsLoading(false) })

        // Stop loading animation after fetch 
        if (eventsArr)
            setIsLoading(false)
    }, [ eventsArr, accessToken]);

    return (
        <>
            <div className="screen-header">
                <h1 className="header-title">אירועים</h1>
            </div>
            <EventsTable eventsArr={eventsArr} filtering={true} />
        </>
    )
}

// Events.propTypes = {}

export default Events