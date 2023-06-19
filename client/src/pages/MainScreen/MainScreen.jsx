/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import DisplayMap from "../../components/map/DisplayMap";
import RightBox from "../../components/RightBox/RightBox";
import { useEffect, useContext } from 'react';
import EventDetailsWraper from '../../components/EventDetails/EventDetailsWraper';
import { MyContext } from '../../services/MyProvider';
import usePageTitle from '../../services/usePageTitle';

/**
 * The main screen of the app.
 * @returns None
 */
function MainScreen() {

  usePageTitle("מסך ראשי");

  const {
    userInfo, accessToken, eventsArr,setIsLoading,
    isReversFlow,isMuted } = useContext(MyContext);


  useEffect(() => {
    if (!userInfo) setIsLoading(true)

    if (userInfo && accessToken && eventsArr)
      setIsLoading(false)

  })

  


  // ****************************************************
  //                     JSX Return                 
  // ****************************************************

  return (
    <>
      <div className="canvas" >
        {/* <!---- Events/Alerts area  ----> */}
        {isReversFlow && (isMuted) && <div className="background-block-dark" />}
        <RightBox />
        <div id="mapContainer">
          {/* Event Handling Screen display when we have event to focuse on: */}
          <EventDetailsWraper isReversFlow={isReversFlow} />
          {/* --- Google Map API container --- */}
          <DisplayMap />
        </div>
      </div>
    </>
  );
}

export default MainScreen;
