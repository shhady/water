
/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { MyContext, HYDRANTS_ICON } from "../../services/MyProvider";
import ReactDOM from 'react-dom';

import { useContext, useEffect, useRef, useLayoutEffect } from 'react';
import { useState } from "react";
import MySwitch from "../buttons/MySwitch";
import FormGroup from '@material-ui/core/FormGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';


const { REACT_APP_MAP_ID } = process.env



export default function DisplayMap() {
  //*********** */ VARIBLES  **************
  const { focusedEvent, setFocusedEvent, mapClasses } = useContext(MyContext);
  const { userInfo, hydrantArr, eventsArr } = useContext(MyContext);  //Hydrants from App  
  const hydrantsMarkers = useRef([]); //hydrants Marker's pointers on Goolgle Map
  const map = useRef(); //Google Map to acivly manipulate Map 
  const mapRef = useRef(); //Google Map Api Wrapper ,needed for Api initialize   

  const [disabledVisible, setDisabledVisible] = useState(false)
  const [emptyVisible, setEmptyVisible] = useState(false)
  const [heritageVisible, setHeritageVisible] = useState(true)

  //Initialize map Once on component load or reload 
  useEffect(() => {
    /** Map settings */
    const mapOptions = {
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      center: userInfo.lat_lng, //set zoom to customer Lat & Lng cords     
      zoom: 14,
      minZoom: 8, maxZoom: 19,
      disableDefaultUI: true,
      streetViewControl: true,
      mapId: REACT_APP_MAP_ID,
      zoomControl: true,
      scaleControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM
      },
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM
      },
    }

    if (!window.globalMap) {
      window.globalMap = new window.google.maps.Map(mapRef.current, mapOptions); //set map and mapRef to api component
      // window.globalMap.setCenter(new window.google.maps.LatLng(userInfo.lat_lng)); 
    }
    else {
      map.current = window.globalMap.getDiv();
      map.current.style.height = "100%"
      mapRef.current?.append(map.current);
    }
    //Create buttons on map
    const buttonContainer = document.createElement("div");
    buttonContainer.id = 'buttonContainer'
    const centerButton = document.createElement("button");
    centerButton.id = 'centerButton'
    centerButton.title = 'מרכז מפה'

    centerButton.addEventListener('click', () => {
      let startZoom = window.globalMap.getZoom();
      window.globalMap.setZoom(14);
      setTimeout(() => { window.globalMap.panTo(userInfo.lat_lng) }, Math.abs(startZoom - 14) * 100)
    })

    //Add buttons to map control
    const handleAddElement = () => {
      const domElementButtonContainer = document.getElementById('buttonContainer');
      const domElementCenterButton = document.getElementById('centerButton');
      if (domElementButtonContainer)
        ReactDOM.render(
          <FormGroup >
            <MySwitch label='הצגת לא פעילים' checked={disabledVisible} toggle={() => { setDisabledVisible(prev => !prev) }} />
            <MySwitch label='הצגת ללא אירועים' checked={emptyVisible} toggle={() => { setEmptyVisible(prev => !prev) }} />
            <MySwitch label='הצגת תת לקוח' checked={heritageVisible} toggle={() => { setHeritageVisible(prev => !prev) }} />
          </FormGroup>, domElementButtonContainer)

      if (domElementCenterButton)
        ReactDOM.render(<FontAwesomeIcon icon={faCrosshairs} style={{ width: 24, height: 24 }} />, domElementCenterButton)
      // Later, you can stop observing
      observer.disconnect();
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(handleAddElement);

    // buttonContainer.addEventListener('DOMNodeInserted', handleAddElement);
    // centerButton.addEventListener('DOMNodeInserted', handleAddElement);
    window.globalMap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(buttonContainer);
    window.globalMap.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(centerButton);

    // Start observing the target node for configured mutations
    observer.observe(buttonContainer, { attributes: true });


    //resize marker on change zoom level   
    window.globalMap.addListener("zoom_changed", () => resizeMarkersByZoom(window.globalMap.getZoom()));


    //clear markers on component unmount
    return () => {
      hydrantsMarkers.current?.forEach(marker => marker.setMap(null))
      buttonContainer.remove()
      centerButton.remove()

    }
  }, [userInfo]);


  //create /update markers for all hydrents on every events update
  useEffect(() => {
    hydrantArr?.forEach(hydrant => { hydrantBuilder(hydrant) }); //put hydrant markers on map
    window.globalMap.setZoom(window.globalMap.getZoom()); //workaround to fix repainting markers      

    return () => {
      window.google.maps.event.clearListeners(hydrantsMarkers.current, 'click');
    }
  }, [hydrantArr, eventsArr])

  // Update hydrant visibility 
  useEffect(() => {
    hydrantsMarkers.current?.forEach(marker =>
      marker.setMap(
        ((marker.status || disabledVisible)
          && (marker.event || (emptyVisible && marker.status) || (disabledVisible && !marker.status))
          && (marker.customer_id === userInfo.customer_id || heritageVisible)) ? window.globalMap : null)
    )
    // ((hydrant.status || disabledVisible) && (event ||( emptyVisible && hydrant.status)) && (hydrant.customer_id === userInfo?.customer_id || heritageVisible))
    // ? window.globalMap : null,

  }, [disabledVisible, emptyVisible, heritageVisible])




  // Set Markers size by zoom level , hide markers on Zoom level above 13
  function resizeMarkersByZoom(zoomLevel) {
      hydrantsMarkers.current?.forEach(marker => { //update all Markers Visibilty & Size
        marker.visible = true;  //make sure all markers are visible
        let size =(zoomLevel > 14)? (zoomLevel - 13) * 15:15 ; //Calculates new markers size
        marker.icon.scaledSize.height = size; //set new marker height
        marker.icon.scaledSize.width = size;  //set new marker width
      });
  
  }

  //Put hydrant Marker on Map
  function hydrantBuilder(hydrant) {
    const hydrantMarker = hydrantsMarkers.current?.find(marker => marker.hydrant_id === hydrant.hydrant_id)
    const size = (window.globalMap.getZoom()>14)? (window.globalMap.getZoom() - 13) * 15:15; //Calculates new markers size
    const event = getEvent(hydrant.hydrant_id);
    const trig = (hydrant.status === 0) ? 'Inactive' : `trig${(!event) ? 0 : (event?.status === 1) ? "open" : event?.trigger_id}`; //gets hydrant Event Icon
    if (!hydrantMarker) {
      const marker = new window.google.maps.Marker({         //create markkers with thus settings :
        optimized: true,
        position: { lat: hydrant.lat, lng: hydrant.lng },
        map:
          ((hydrant.status || disabledVisible)
            && (event || (emptyVisible && hydrant.status) || (disabledVisible && !hydrant.status))
            && (hydrant.customer_id === userInfo?.customer_id || heritageVisible))
            ? window.globalMap : null,      
        event: event,
        animation: window.google.maps.Animation.NONE,
        zIndex: (hydrant.status) ?
          (event) ?
            2 : 1
          : 0,
        icon: {
          url: HYDRANTS_ICON[trig],
          scaledSize: new window.google.maps.Size(size),
        },
        hydrant_id: hydrant.hydrant_id,
        customer_id: hydrant.customer_id,
        status: hydrant.status,
        title: `Id: ${hydrant.hydrant_id}`,
        lable: "test",


      });
      marker.addListener("click", () => setFocusedEvent(marker.event)); //when marker clicked we focuse on it event
      hydrantsMarkers.current?.push(marker); //add hydrant Marker to array
    }
    else {
      hydrantMarker.event = event;
      hydrantMarker.setIcon({
        url: HYDRANTS_ICON[trig]
        , scaledSize: new window.google.maps.Size(size)
      });
      hydrantMarker.setMap(
        ((hydrant.status || disabledVisible)
          && (event || (emptyVisible && hydrant.status) || (disabledVisible && !hydrant.status))
          && (hydrant.customer_id === userInfo?.customer_id || heritageVisible))
          ? window.globalMap : null,

      )
    }

  }

  //Focus on Hydrant Marker only run when new hydrent selected
  useEffect(() => {
    if (focusedEvent?.hydrant_id)
      FocusHydrantMarker(focusedEvent.hydrant_id)
  }, [focusedEvent]);

  //Focus on Hydrant Marker Function
  function FocusHydrantMarker(hydrantId) {
    if (hydrantArr.find(hydrant => hydrant.hydrant_id === hydrantId)) {
      window.globalMap.getStreetView().setVisible(false); //make sure we are not in street view   
      hydrantsMarkers.current.forEach(marker => {
        marker.setAnimation(window.google.maps.Animation.NONE) //disable all animation 
        marker.visible = true; //make sure hydrant visible
      })
      const hydrantCord = GetCord(hydrantId); // cordenets of hydrant on map
      const tempzoom = window.globalMap.getZoom()
      window.globalMap.setZoom(tempzoom) //fix bug with hydrant markers on remount
      smoothZoomToCord(window.globalMap, hydrantCord, window.globalMap.getZoom()); //varible(map obj,target cordenets,starting zoom level)                         
      hydrantBounceAnimation(hydrantId); /** set Marker animation Bounce with 3sec timeout by marker ID  */
    }
    else
      console.log(`Hydrant Id ${hydrantId} not found`)

  };

  //varible(map obj,target cordenets,starting zoom level)
  function smoothZoomToCord(map, cord, startZoom) {
    if (map && map.getBounds()?.contains(cord)) { //after finish zooming out targat is in bounds
      map.panTo(cord); //pan to target hydrant
      setTimeout(() => { map.setZoom(17) }, 800); //zoom in on hydrant
      return;
    }
    else {
      var z = window.google.maps.event.addListener(map, 'zoom_changed', event => { //recursive call back to timeout zoom
        window.google.maps.event.removeListener(z); //clear lisnter after zoom zoomchanged
        setTimeout(() => smoothZoomToCord(map, cord, startZoom - 1), 200);//Recursive call in next zoom level
      });
      map.setZoom(startZoom); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
  }

  /** set Marker animation Bounce with 3sec timeout by marker ID  */
  function hydrantBounceAnimation(hydrant_id) {
    const markerIdx = hydrantsMarkers.current.findIndex(marker => (Number(marker.hydrant_id) === Number(hydrant_id)))    //find marker pointer in hydrantsMarkers 
    hydrantsMarkers.current[markerIdx].setZIndex(3);
    hydrantsMarkers.current[markerIdx].setAnimation(window.google.maps.Animation.BOUNCE);//start bounce animation
    setTimeout(() => hydrantsMarkers.current[markerIdx].setAnimation(window.google.maps.Animation.NONE), 3000);     //kill animation after timeout
  }


  /*** return event trigger type by hydrant Id if no event return 0  */
  function getEvent(hydrant_id) {
    const events = eventsArr?.filter(event => (event.hydrant_id === hydrant_id && event.status !== 2)); //get all New & Open Event belong this Hydrant
    if (!events) return undefined
    else if (events.find(event => event.trigger_id === 2 && event.status === 0)) //if found Revers Flow event assign as primer event
      return events[events.findIndex(event => event.trigger_id === 2 && event.status === 0)]
    else if (events.find(event => event.trigger_id === 1 && event.status === 0)) //if found  Flow event assign as primer event
      return events[events.findIndex(event => event.trigger_id === 1 && event.status === 0)]
    else if (events.find(event => event.status === 0))
      return events[events.findIndex(event => event.status === 0)]
    else return events[0]

  }

  /** returns Marker Len&Lat by  Marker ID  */
  function GetCord(hydrant_id) {

    let res;
    hydrantsMarkers.current.forEach(marker => {
      if (Number(marker.hydrant_id) === Number(hydrant_id)) {

        res = marker.position;
      }
    });

    return res;
  }

  return (
    <div ref={mapRef} className={`mapDisplayPort ${mapClasses}`} />
  )
}


