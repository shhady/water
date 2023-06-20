/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import AlertsTab from "./AlertsTab";
import NewEventsTab from "./NewEventsTab";
import OpenEventsTab from "./OpenEventsTab";
import { useState } from "react";

export default function RightBox() {
 
 /******************* TAB Select **********************/
const [newTabClass,setNewTabClass] = useState("");
const [openTabClass,setOpenEventsTabClass] = useState("hide");
const [alertsTabClass,setAlertsTabClass] = useState("hide");
const [leftVerticalLineClass,setLeftVerticalLineClass] = useState("");
const [rightVerticalLineClass,setRightVerticalLineClass] = useState("notVisible");


//***** this function switch between Tabs *************
function setActiveTab(tabId){ 
   // console.log(tabId.htmlFor)
   if(tabId.htmlFor==='newEvents')
   {
      setNewTabClass("");
      setOpenEventsTabClass("hide");
      setAlertsTabClass("hide");
      setRightVerticalLineClass("notVisible");
      setLeftVerticalLineClass("");
   }
   else if(tabId.htmlFor==='allAlerts')
   {
      setNewTabClass("hide");
      setOpenEventsTabClass("hide");
      setAlertsTabClass("");
      setRightVerticalLineClass("");
      setLeftVerticalLineClass("notVisible");
   }    
   else if(tabId.htmlFor==='openEvents')
   {
      setNewTabClass("hide");
      setOpenEventsTabClass("");
      setAlertsTabClass("hide");
      setRightVerticalLineClass("notVisible");
      setLeftVerticalLineClass("notVisible");
   }    
}
 
  return (
    <div className="menuBox" id="rightBox" > 
    {/* <!----  Tab Control: Event/Alerts ------> */}
        <div className="tabSelect">   
            <input type="radio" name="TabSelect" id="newEvents" defaultChecked/>
            <label className="rightTab tab" onClick={event=>setActiveTab(event.target)} htmlFor="newEvents" >חדשים</label>
            <hr className={rightVerticalLineClass}/>                                    
            <input type="radio" name="TabSelect" id="openEvents" />
            <label className="tab" onClick={event=>setActiveTab(event.target)} htmlFor="openEvents" >בטיפול</label>                                
            <hr className={leftVerticalLineClass}/>                                    
            <input type="radio" name="TabSelect" id="allAlerts" />
            <label className="leftTab tab" onClick={event=>setActiveTab(event.target)} htmlFor="allAlerts" >התרעות</label>                                
        </div>
        <div style={{width:'400px' ,   borderBottom: "1px solid var(--gray)"}}></div>
        {/* <!------  TAB for New Events  -----> */}
        <NewEventsTab TabClass={newTabClass} />        
        {/* <!------  TAB for Open Events  -----> */}
        <OpenEventsTab TabClass={openTabClass} />        
        {/* <!------  TAB for all Alerts  -----> */}
        <AlertsTab TabClass={alertsTabClass}/>
    </div>
  )
}
