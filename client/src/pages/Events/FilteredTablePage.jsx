import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../services/MyProvider'
import FatchDataApi from '../../services/FatchDataApi';
import usePageTitle from '../../services/usePageTitle';
import EventsTable from './EventsTable';

function FilteredTablePage({ title, trigger }) {

    const { accessToken, eventsArr, setEventsArr, setIsLoading } = useContext(MyContext);
    const [filteredArr, setFilteredArr] = useState(eventsArr?.filter(event => event.trigger_id === trigger && event.status !== 2))

    usePageTitle(title);

    useEffect(() => {
        setFilteredArr(eventsArr?.filter(event => event.trigger_id === trigger && event.status !== 2));
    }, [eventsArr, trigger])

    useEffect(() => {
        //if no data show loading animation 
        if (!filteredArr)
            setIsLoading(true)
        else
            setIsLoading(false)

        //callback for fetch events array and disable loading animation
        const HandleLoadEventsArr = (events) => {
            setEventsArr(events)
            setFilteredArr(events.filter(event => event.trigger_id === trigger && event.status !== 2));
            setIsLoading(false);
        }

        //callback to handle response error
        const HandleReject = (error) => {
            setIsLoading(false)
        }
        //fetch events array if missing
        if (accessToken && !filteredArr) {
            FatchDataApi('events', 'GET', accessToken, HandleLoadEventsArr, { onReject: HandleReject });
        }


    }, [filteredArr, accessToken]);

    return (
        <>
            <div className="screen-header">
                <h1 className="header-title">{title}</h1>
            </div>
            {<EventsTable eventsArr={filteredArr} />}
        </>
    )
}

// Events.propTypes = {}

export default FilteredTablePage