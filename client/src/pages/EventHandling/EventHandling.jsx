/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useState, useEffect, useContext, useRef } from 'react'
import './eventHandling.css'
import { MyContext } from '../../services/MyProvider';
import FatchDataApi from '../../services/FatchDataApi'
import MyNotification from '../../services/MyNotification';
import { EVENTS_TITLES } from '../../services/MyProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWaze } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons'
import { subscribeUser, unSubscribeUser } from '../../services/registerServiceWorker'
import usePageTitle from '../../services/usePageTitle';
import TrigIcon from '../../components/TrigIcon/TrigIcon';


export default function EventHandling() {

    const [showRegistration, setShowRegistration] = useState("");
    const { userInfo, setUserInfo, accessToken, setIsLoading,myHandles, setMyHandles } = useContext(MyContext);
    usePageTitle("אירועים שלי");

    const refreshDataInterval = useRef() //Pointer for Refresh Data Interval

    // ***********************************************************************************
    //       INITITAL FETCH DATA from server & Service Worker Registration (Run Once) 
    // ***********************************************************************************
    useEffect(() => {
        // clean up controller
        let isSubscribed = true;

        const loadHandles = (handles) => {
            if (isSubscribed) setMyHandles(handles)
            setIsLoading(false)
        }
        //callback to handle response error
        const HandleReject = (error) => {
            setIsLoading(false)
        }

        if (!myHandles)
            setIsLoading(true)
        if (accessToken ) {
            // registerServiceWorker(accessToken)
            FatchDataApi('get_handlings', "GET", accessToken, loadHandles, { onReject: HandleReject });
        }
        // remove callback subscription 
        return () => { isSubscribed = false }

    }, [userInfo]) // eslint-disable-line react-hooks/exhaustive-deps

    // ************************************************************
    //        update registration button to serviceWorker status
    // ************************************************************
    useEffect(() => {
        navigator.serviceWorker.ready.then((serviceWorker) => {
            // service registered
            if (serviceWorker)
                // check for Push subscription
                serviceWorker.pushManager.getSubscription().then(subscription => {
                    // found subscription
                    if (subscription && userInfo?.push_subscription.find(sub => sub.endpoint === subscription.endpoint))
                        setShowRegistration('unsub')
                    else
                        //subscripition not found
                        setShowRegistration('subscribe')
                })
            //service worker not registerd
            else
                setShowRegistration('notSupported')
        })
    }, [userInfo])


    // ****************************************************
    //              INTERVAL UPDATES Handles ARRAY                        
    // ****************************************************
    const refreshHandles = (interval) => {

        return setInterval(() => {
            FatchDataApi('get_handlings', 'GET', accessToken, setMyHandles);
        }, interval) //Interval between each Fatch
    }



    // ****************************************************
    //              Replace Interval Token 
    // ****************************************************  
    useEffect(() => {

        if (userInfo && userInfo.refresh_timeout && accessToken) { //chack we got user data 

            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals 
            refreshDataInterval.current = refreshHandles(userInfo.refresh_timeout) //Interval fatch Updated data from server
        }
        else // redicrect to Login Screen if can't find user data
            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals   
        return () => {
            clearInterval(refreshDataInterval.current) //Clear old fatch data intervals   
        }
    }, [accessToken, userInfo]) // eslint-disable-line react-hooks/exhaustive-deps


    const handleCloseHandling = (handle_id) => {

        function updateHandle(responseData) {

            const tempData = myHandles.map(hydrant => {
                if (hydrant.events.filter(event => event.handle_id !== responseData.closedHandle.handle_id).length > 0)
                    return {
                        hydrant_id: hydrant.hydrant_id,
                        events: hydrant.events.filter(event => event.handle_id !== responseData.closedHandle.handle_id)
                    }
                else
                    return null
            }).filter(hydrant => hydrant)
            setMyHandles(tempData);
            MyNotification("light", "טיפול באירוע", `אירוע ${responseData.closedEvent.event_id} נסגר בהצלחה`);
        }
        FatchDataApi('close_handle', 'PUT', accessToken, updateHandle, { payload: handle_id, errorMsgTitle: "שגיאה בסגירת אירוע" })

    }

    const handleSubscribe = () => {
        const handleResponse = (responseData) => {
            const tempData = { ...userInfo };
            console.log(responseData);
            tempData.push_subscription.push(responseData);
            setUserInfo(tempData);
        }
        // changing button befor server response
        setShowRegistration('subscribe disabled');
        subscribeUser(accessToken, handleResponse)
    }


    const handleUnSubscribe = () => {
        const handleResponse = (responseData) => {
            const tempData = { ...userInfo };
            console.log(responseData);
            tempData.push_subscription.pop(responseData);
            setUserInfo(tempData);
        }
        // changing button befor server response
        setShowRegistration('unsub disabled');
        unSubscribeUser(accessToken, handleResponse)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (myHandles) setIsLoading(false) }, [myHandles])



    // ****************************************************
    //                     JSX Return                 
    // ****************************************************
    return (
        <div className='screen'>
            <header className='screen-header'>
                <h1 className='header-title'>אירועים&nbsp;שלי</h1>
                <div className='header-button-wraper'>

                    {showRegistration.includes('subscribe') &&
                        <button className='btn'
                            title='רישום לקבלת נוטיפיקציה'
                            disabled={showRegistration.includes('disabled')}
                            onClick={handleSubscribe}>
                            <FontAwesomeIcon icon={faBell} />&nbsp;רישום
                        </button>}
                    {showRegistration.includes('unsub') &&
                        <button className='btn'
                            title='ביטול לקבלת נוטיפיקציה'
                            disabled={showRegistration.includes('disabled')}
                            onClick={handleUnSubscribe}>
                            <FontAwesomeIcon icon={faBellSlash} />&nbsp;הסרה
                        </button>}
                    {showRegistration.includes('notSupported') && <h5 style={{ color: "white" }}> דפדפן לא תומך בנוטיפקציה</h5>}
                </div>
            </header>
            <label className='hydrantsBox' htmlFor='none'>
                <input type='radio' name='hydrant' id={`none`} />
                {myHandles?.length === 0 ?
                    <h4 style={{ color: 'var(--textColor)', padding: "1rem" }}>אין אירועים משוייכים לטיפולך</h4>
                    :
                    myHandles?.map((hydrant, idx) =>
                        <label key={idx} htmlFor={`hydrantId_${hydrant.hydrant_id}`}>
                            <input type='radio' name='hydrant' id={`hydrantId_${hydrant.hydrant_id}`} />
                            <div className='hydrant'>
                                <div className='hydarantHeader'>
                                    <p className='address'>{hydrant.events[0].street}&nbsp;{hydrant.events[0].number}&nbsp;{hydrant.events[0].city}</p>
                                    <p className='hydrantId'>{hydrant.hydrant_id}</p>
                                    <a href={`https://www.waze.com/ul?ll=${hydrant.events[0].lat},${hydrant.events[0].lng}&navigate=yes`} target="_blank" rel="noreferrer" className='btn'>ניווט&nbsp;
                                        <FontAwesomeIcon icon={faWaze} />
                                    </a>
                                </div>
                                <div className='eventList'>
                                    {hydrant.events.map((event, idx) =>
                                        <div key={idx} className='handleWraper'>
                                            <div className='handle'>
                                                <p>{EVENTS_TITLES['trig' + event.trigger_id]}</p>
                                                <p>נוצר ב&nbsp;{event.datetime_created}</p>
                                                <p>עודכן ב&nbsp;{event.datetime_updated}</p>
                                                {event.value !== 0 && <p>ערך: {event.value}&nbsp;{event.value_type} </p>}
                                                {event.comment && <p>הערה: {event.comment} </p>}
                                                <TrigIcon style={{ zIndex: "5", right: "calc(var(--Icon-Bar-Offset) - 10px)", position: "absolute" }} trigger={event.trigger_id} />

                                            </div>
                                            <button
                                                className='btn'
                                                onClick={() => handleCloseHandling({ handle_id: event.handle_id })}>
                                                סיום&nbsp;טיפול&nbsp;<FontAwesomeIcon icon={faCheck} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </label>
                    )}
            </label>
        </div>
    )
}
