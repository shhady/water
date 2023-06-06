/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useEffect } from "react";
import useMap from "../hooks/useMap";

export default function DisplayMap() {
  const {
    hydrantBuilder,
    handleAddElement,
    windowResize,
    addWindowGlobalControls,
    getMapOptions,
    createMapButtons,
    createGlobalMap,
    focusedEvent,
    mapClasses,
    userInfo,
    hydrantArr,
    eventsArr,
    hydrantsMarkers,
    mapRef,
    disabledVisible,
    emptyVisible,
    heritageVisible,
    FocusHydrantMarker,
  } = useMap();

  //Initialize map Once on component load or reload
  useEffect(() => {
    /** Map settings */
    const mapOptions = getMapOptions();

    createGlobalMap(mapOptions);

    const { buttonContainer, centerButton } = createMapButtons();

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(handleAddElement);

    addWindowGlobalControls(buttonContainer, centerButton);

    // Start observing the target node for configured mutations
    observer.observe(buttonContainer, { attributes: true });

    windowResize();

    //clear markers on component unmount
    return () => {
      hydrantsMarkers.current?.forEach((marker) => marker.setMap(null));
      buttonContainer.remove();
      centerButton.remove();
    };
  }, [userInfo]);

  //create /update markers for all hydrents on every events update
  useEffect(() => {
    hydrantArr?.forEach((hydrant) => {
      hydrantBuilder(hydrant);
    }); //put hydrant markers on map
    window.globalMap.setZoom(window.globalMap.getZoom()); //workaround to fix repainting markers

    return () => {
      window.google.maps.event.clearListeners(hydrantsMarkers.current, "click");
    };
  }, [hydrantArr, eventsArr]);

  // Update hydrant visibility
  useEffect(() => {
    hydrantsMarkers.current?.forEach((marker) =>
      marker.setMap(
        (marker.status || disabledVisible) &&
          (marker.event ||
            (emptyVisible && marker.status) ||
            (disabledVisible && !marker.status)) &&
          (marker.customer_id === userInfo.customer_id || heritageVisible)
          ? window.globalMap
          : null
      )
    );
    // ((hydrant.status || disabledVisible) && (event ||( emptyVisible && hydrant.status)) && (hydrant.customer_id === userInfo?.customer_id || heritageVisible))
    // ? window.globalMap : null,
  }, [disabledVisible, emptyVisible, heritageVisible]);

  //Focus on Hydrant Marker only run when new hydrent selected
  useEffect(() => {
    if (focusedEvent?.hydrant_id) FocusHydrantMarker(focusedEvent.hydrant_id);
  }, [focusedEvent]);

  return <div ref={mapRef} className={`mapDisplayPort ${mapClasses}`} />;
}
