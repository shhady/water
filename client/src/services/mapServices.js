import MySwitch from "./MySwitch";
import FormGroup from "@material-ui/core/FormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { HYDRANTS_ICON } from "../services/MyContext";

export const REACT_APP_MAP_ID = "id";
export let hydrantsMarkers = [];

export const getMapOptions = (center) => {
  return {
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    center, //set zoom to customer Lat & Lng cords
    zoom: 14,
    minZoom: 8,
    maxZoom: 19,
    disableDefaultUI: true,
    streetViewControl: true,
    mapId: REACT_APP_MAP_ID,
    zoomControl: true,
    scaleControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM,
    },
    streetViewControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM,
    },
  };
};

export const createGlobalMap = (map, mapRef, mapOptions) => {
  if (!window.globalMap) {
    window.globalMap = new window.google.maps.Map(mapRef.current, mapOptions); //set map and mapRef to api component
    // window.globalMap.setCenter(new window.google.maps.LatLng(userInfo.lat_lng));
  } else {
    map.current = window.globalMap.getDiv();
    map.current.style.height = "100%";
    mapRef.current?.append(map.current);
  }
};

export const createMapButtons = (center) => {
  //Create buttons on map
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "buttonContainer";
  const centerButton = document.createElement("button");
  centerButton.id = "centerButton";
  centerButton.title = "מרכז מפה";

  centerButton.addEventListener("click", () => {
    let startZoom = window.globalMap.getZoom();
    window.globalMap.setZoom(14);
    setTimeout(() => {
      window.globalMap.panTo(center);
    }, Math.abs(startZoom - 14) * 100);
  });

  return { buttonContainer: buttonContainer, centerButton: centerButton };
};

//Add buttons to map control
export const handleAddElement = (
  disabledVisible,
  setDisabledVisible,
  emptyVisible,
  setEmptyVisible,
  heritageVisible,
  setHeritageVisible,
  observer
) => {
  const domElementButtonContainer = document.getElementById("buttonContainer");
  const domElementCenterButton = document.getElementById("centerButton");
  if (domElementButtonContainer)
    ReactDOM.render(
      <FormGroup>
        <MySwitch
          label="הצגת לא פעילים"
          checked={disabledVisible}
          toggle={() => {
            setDisabledVisible((prev) => !prev);
          }}
        />
        <MySwitch
          label="הצגת ללא אירועים"
          checked={emptyVisible}
          toggle={() => {
            setEmptyVisible((prev) => !prev);
          }}
        />
        <MySwitch
          label="הצגת תת לקוח"
          checked={heritageVisible}
          toggle={() => {
            setHeritageVisible((prev) => !prev);
          }}
        />
      </FormGroup>,
      domElementButtonContainer
    );

  if (domElementCenterButton)
    ReactDOM.render(
      <FontAwesomeIcon icon={faCrosshairs} style={{ width: 24, height: 24 }} />,
      domElementCenterButton
    );
  // Later, you can stop observing
  observer.disconnect();
};

export const addWindowGlobalControls = (buttonContainer, centerButton) => {
  window.globalMap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
    buttonContainer
  );
  window.globalMap.controls[
    window.google.maps.ControlPosition.LEFT_BOTTOM
  ].push(centerButton);
};

// Set Markers size by zoom level , hide markers on Zoom level above 13
function resizeMarkersByZoom(zoomLevel) {
  hydrantsMarkers.current?.forEach((marker) => {
    //update all Markers Visibilty & Size
    marker.visible = true; //make sure all markers are visible
    let size = zoomLevel > 14 ? (zoomLevel - 13) * 15 : 15; //Calculates new markers size
    marker.icon.scaledSize.height = size; //set new marker height
    marker.icon.scaledSize.width = size; //set new marker width
  });
}

export const windowResize = () => {
  //resize marker on change zoom level
  window.globalMap.addListener("zoom_changed", () =>
    resizeMarkersByZoom(window.globalMap.getZoom())
  );
};

//Put hydrant Marker on Map
export function hydrantBuilder(
  hydrant,
  disabledVisible,
  emptyVisible,
  heritageVisible,
  userInfo,
  setFocusedEvent,
  eventsArr
) {
  const hydrantMarker = hydrantsMarkers.current?.find(
    (marker) => marker.hydrant_id === hydrant.hydrant_id
  );
  const size =
    window.globalMap.getZoom() > 14
      ? (window.globalMap.getZoom() - 13) * 15
      : 15; //Calculates new markers size
  const event = getEvent(hydrant.hydrant_id, eventsArr);
  const trig =
    hydrant.status === 0
      ? "Inactive"
      : `trig${!event ? 0 : event?.status === 1 ? "open" : event?.trigger_id}`; //gets hydrant Event Icon
  if (!hydrantMarker) {
    const marker = new window.google.maps.Marker({
      //create markkers with thus settings :
      optimized: true,
      position: { lat: hydrant.lat, lng: hydrant.lng },
      map:
        (hydrant.status || disabledVisible) &&
        (event ||
          (emptyVisible && hydrant.status) ||
          (disabledVisible && !hydrant.status)) &&
        (hydrant.customer_id === userInfo?.customer_id || heritageVisible)
          ? window.globalMap
          : null,
      event: event,
      animation: window.google.maps.Animation.NONE,
      zIndex: hydrant.status ? (event ? 2 : 1) : 0,
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
  } else {
    hydrantMarker.event = event;
    hydrantMarker.setIcon({
      url: HYDRANTS_ICON[trig],
      scaledSize: new window.google.maps.Size(size),
    });
    hydrantMarker.setMap(
      (hydrant.status || disabledVisible) &&
        (event ||
          (emptyVisible && hydrant.status) ||
          (disabledVisible && !hydrant.status)) &&
        (hydrant.customer_id === userInfo?.customer_id || heritageVisible)
        ? window.globalMap
        : null
    );
  }
}
/*** return event trigger type by hydrant Id if no event return 0  */
export function getEvent(hydrant_id, eventsArr) {
  const events = eventsArr?.filter(
    (event) => event.hydrant_id === hydrant_id && event.status !== 2
  ); //get all New & Open Event belong this Hydrant
  if (!events) return undefined;
  else if (events.find((event) => event.trigger_id === 2 && event.status === 0))
    //if found Revers Flow event assign as primer event
    return events[
      events.findIndex((event) => event.trigger_id === 2 && event.status === 0)
    ];
  else if (events.find((event) => event.trigger_id === 1 && event.status === 0))
    //if found  Flow event assign as primer event
    return events[
      events.findIndex((event) => event.trigger_id === 1 && event.status === 0)
    ];
  else if (events.find((event) => event.status === 0))
    return events[events.findIndex((event) => event.status === 0)];
  else return events[0];
}

/** returns Marker Len&Lat by  Marker ID  */
export function GetCord(hydrant_id) {
  let res;
  hydrantsMarkers.current.forEach((marker) => {
    if (Number(marker.hydrant_id) === Number(hydrant_id)) {
      res = marker.position;
    }
  });

  return res;
}
