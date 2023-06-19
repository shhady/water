import { useRef, useEffect, useContext } from 'react';
import { MyContext } from '../services/MyProvider';
import FatchDataApi from '../services/FatchDataApi';
import MyNotification from './MyNotification';


/**
 * The component that Updates data for the entire app.
 * @returns None
 */
export default function GetUpdated() {

    const { userInfo, accessToken, setEventsArr, setAlertsArr, setHydrantArr, hydrantArr,
        eventsArr, setIsReverseFlow, setIsMuted, setMyHandles
    } = useContext(MyContext);

    //Pointer for Refresh Data Interval 
    const refreshDataInterval = useRef()

    // ****************************************************
    //        Initslize data from server   (Run Once) 
    // ****************************************************


    //callback for handling active hydrant list
    const handleAddAciveHydrants = (activeHydrantsArr) => {
        //update hydrants only if empty list 
        setHydrantArr(oldHydrantsArr => (oldHydrantsArr?.length > 0) ? oldHydrantsArr : activeHydrantsArr);
    }

    //callback for handling new My Handle 
    const setMyHandlesWithNotification = (response) => {
        //update hydrants only if empty list 
        setMyHandles(oldHandleList => {
            let newHandle = response.filter(({ hydrant_id }) => !oldHandleList?.find(handle => handle.hydrant_id === hydrant_id))
            if (!oldHandleList && response.length)
                MyNotification('light', 'אירועים לטיפול שלי', `אירועים ב${response?.length} ברזי כיבוי ממתינים לטיפולך`)
            else
                if (newHandle.length)
                MyNotification('light', 'אירועים לטיפול שלי', `אירוע חדש שוייך לטיפול שלך, ${response?.length} ברזי כיבוי לטיפול `)
            return response
        });
    }




    useEffect(() => {  //fetch Inital Data from server (Run Once)
        if (accessToken) //if no login info in local storage redirect to login screen
        {
            FatchDataApi('hydrants/active', 'GET', accessToken, handleAddAciveHydrants)
            FatchDataApi('events', 'GET', accessToken, setEventsArr)
            FatchDataApi('alerts', 'GET', accessToken, setAlertsArr)
            FatchDataApi('hydrants', 'GET', accessToken, setHydrantArr)
            FatchDataApi('get_handlings', 'GET', accessToken, setMyHandlesWithNotification);

        }
        // else
        //     redirect('/login')
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    // ****************************************************
    //    INTERVAL UPDATES EVENTS ARRAY   &  Handle NEW Token                    
    // ****************************************************  
    useEffect(() => {
        let isMounted = true;
        // INTERVAL UPDATES EVENTS ARRAY                                
        const refreshEvents = (interval) => {
            return setInterval(() => {
                FatchDataApi('get_handlings', 'GET', accessToken, setMyHandlesWithNotification);
                FatchDataApi('events', 'GET', accessToken, setEventsArr)
                FatchDataApi('alerts', 'GET', accessToken, handleNewAlerts)
            }, interval) //Interval between each Fatch
        }
        const handleNewAlerts = (response) => {
            if (isMounted)
                setAlertsArr(oldAlertsArr => {
                    //search for new alert id in response 
                    const newAlertsHydrantId = response.filter(newAlert => !oldAlertsArr?.find(alert => alert.alert_id === newAlert.alert_id)).map(alert => alert.hydrant_id)
                    // refetch hydrants Array if we have new alerts & hydrant's are not accessable or not activated 
                    if (newAlertsHydrantId.length && (newAlertsHydrantId.some(hydrantId => !hydrantArr?.find(({ hydrant_id }) => hydrant_id === hydrantId)) || hydrantArr?.some(hydrant => (newAlertsHydrantId.includes(hydrant.hydrant_id) && hydrant.status === 0))))
                        FatchDataApi('hydrants', 'GET', accessToken, setHydrantArr)
                    return response
                })
        }

        //Handle NEW Token   
        if (accessToken && userInfo?.refresh_timeout) { //if can't find user data redicrect to login

            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals 
            refreshDataInterval.current = refreshEvents(userInfo.refresh_timeout) //Interval fatch Updated data from server
        }
        else // redicrect to Login Screen if can't find user data
            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals   

        return () => {
            isMounted = false;
            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals   
        }
    }, [accessToken])

    // handle new reverse fow event
    useEffect(() => {
        const temp = eventsArr?.find(event => (event.trigger_id === 2 && event.status === 0))
        if (!temp) {
            setIsMuted(false)
        }
        setIsReverseFlow(temp)
    }, [eventsArr])



    return null
}
