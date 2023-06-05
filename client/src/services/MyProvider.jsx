/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useState, createContext } from "react";
import flow_pin from "../assets/icons/flow_pin.svg";
import reverse_pin from "../assets/icons/reverse_pin.svg";
import vandalisem_pin from "../assets/icons/vandalisem_pin.svg";
import orange_pin from "../assets/icons/orange_pin.svg";
import battery_pin from "../assets/icons/battery_pin.svg";
import signal_pin from "../assets/icons/signal_pin.svg";
import pressure_pin from "../assets/icons/pressure_pin.svg";
import gray_pin from "../assets/icons/gray_pin.svg";
import cyan_pin from "../assets/icons/cyan_pin.svg";
import flow from "../assets/icons/flow.svg";
import reverse from "../assets/icons/reverse.svg";
import vandalism from "../assets/icons/vandalism.svg";
import battery from "../assets/icons/battery.svg";
import flash from "../assets/icons/flash.svg";
import pressure from "../assets/icons/pressure.svg";
import inactive_pin from "../assets/icons/inactive_pin.svg";

export const MyContext = createContext();

/**
 * A dictionary of the event titles for the events that can be triggered by the user.
 * @type {Object}
 */
export const EVENTS_TITLES = {
  trig1: "זרימת\u00a0מים",
  trig2: "זרימה\u00a0הפוכה",
  trig3: `ונדליזם`,
  trig4: "Not defined",
  trig5: "סוללה\u00a0חלשה",
  trig6: "היעדר\u00a0אות\u00a0חיים",
  trig7: "לחץ\u00a0חריג\u00a0בצינור",
  trig0: "ללא\u00a0אירועים",
  trigopen: "אירוע בטיפול",
};

/**
 * A dictionary of the different icons Marker used for hydrants.
 * @type {Object}
 */
export const HYDRANTS_ICON = {
  trig1: flow_pin,
  trig2: reverse_pin,
  trig3: vandalisem_pin,
  trig4: orange_pin,
  trig5: battery_pin,
  trig6: signal_pin,
  trig7: pressure_pin,
  trig0: gray_pin,
  trigopen: cyan_pin,
  Inactive: inactive_pin,
};

/**
 * A dictionary of event names to their corresponding icon.
 * @type {Object}
 */
export const EVENT_ICONS = {
  trig1: flow,
  trig2: reverse,
  trig3: vandalism,
  trig5: battery,
  trig6: flash,
  trig7: pressure,
};

/**
 * A dictionary of event colors.
 * @type {Object}
 */
export const EVENT_COLORS = {
  trig1: "#67BED9",
  trig2: "#EF2B16",
  trig3: "#FFC20A",
  trig5: "#F146EB",
  trig6: "#18C772",
  trig7: "#F76C10",
};
/**
 * A dictionary of the filter values for each trigger.
 */
export const ICON_FILTER = {
  trig1:
    "brightness(0) saturate(100%)  invert(74%) sepia(54%) saturate(475%) hue-rotate(160deg) brightness(88%) contrast(93%)",
  trig2:
    "brightness(0) saturate(100%)  invert(22%) sepia(67%) saturate(4315%) hue-rotate(355deg) brightness(96%) contrast(94%)",
  trig3:
    "brightness(0) saturate(100%)  invert(88%) sepia(21%) saturate(5700%) hue-rotate(349deg) brightness(101%) contrast(104%)",
  trig5:
    "brightness(0) saturate(100%)  invert(47%) sepia(73%) saturate(5831%) hue-rotate(288deg) brightness(116%) contrast(89%)",
  trig6:
    "brightness(0) saturate(100%)  invert(61%) sepia(96%) saturate(674%) hue-rotate(96deg) brightness(90%) contrast(81%)",
  trig7:
    "brightness(0) saturate(100%)  invert(57%) sepia(37%) saturate(6829%) hue-rotate(356deg) brightness(100%) contrast(94%)",
};
// export const EVENT_COLORS = {
//     trig1: document.documentElement.style.getPropertyValue('--Flow'),
//     trig2: document.documentElement.style.getPropertyValue('--ReverseFlow'),
//     trig3: document.documentElement.style.getPropertyValue('--vandalisem'),
//     trig5: document.documentElement.style.getPropertyValue('--battery'),
//     trig6: document.documentElement.style.getPropertyValue('--signal'),
//     trig7: document.documentElement.style.getPropertyValue('--pressure')
// };

/**
 * The provider for the MyContext.
 * @param {React.ReactNode} children - The children of the provider.
 * @returns None
 */
export function MyProvider({ children }) {
  const [userInfo, setUserInfo] = useState(); //Loged-in User Information Json recived on login
  const [accessToken, setAccessToken] = useState(); //Access Token on login
  const [isLoading, setIsLoading] = useState(true);

  const [customerTypes, setCustomersTypes] = useState(); //array of all Customer Types
  const [customerNames, setCustomersNames] = useState(); //array of all Customer Types

  const [profiles, setProfiles] = useState(); //array of all Customer profiles
  const [handleTypes, setHandleTypes] = useState(); //array of all Customer Handle Types
  const [handleUsers, setHandleUsers] = useState(); //array of all Customer Handle Users
  const [allowedClose, setAllowedClose] = useState(); //array of all Customer Authorized agent

  const [hydrantArr, setHydrantArr] = useState(); //array of all Hydrants
  const [eventsArr, setEventsArr] = useState(); //array of all Hydrant's Events
  const [alertsArr, setAlertsArr] = useState(); //array of all Hydrant's Alerts

  const [isReversFlow, setIsReverseFlow] = useState(); //state mangment for Revers Warning
  const [isMuted, setIsMuted] = useState(false); //state mangment for Revers Warning sound alert

  const [mapClasses, setMapClasses] = useState(""); //class for map container
  const [focusedEvent, setFocusedEvent] = useState(); // Event to focuse on
  //Events Id's list for handling
  const [eventsToHandle, setEventsToHandle] = useState([]);

  //Handles assigned to conected user
  const [myHandles, setMyHandles] = useState();

  const value = {
    myHandles,
    setMyHandles,
    customerNames,
    setCustomersNames,
    eventsToHandle,
    setEventsToHandle,
    isLoading,
    setIsLoading,
    mapClasses,
    setMapClasses,
    focusedEvent,
    setFocusedEvent,
    profiles,
    setProfiles,
    customerTypes,
    setCustomersTypes,
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
    handleTypes,
    setHandleTypes,
    hydrantArr,
    setHydrantArr,
    eventsArr,
    setEventsArr,
    alertsArr,
    setAlertsArr,
    handleUsers,
    setHandleUsers,
    allowedClose,
    setAllowedClose,
    isReversFlow,
    setIsReverseFlow,
    isMuted,
    setIsMuted,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
