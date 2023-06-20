/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useState, useEffect, useContext } from 'react';
import ProfileModal from './comp/ProfileModal'
import AddProfile from './comp/AddProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route, NavLink } from "react-router-dom";
import UpdateProfile from './comp/UpdateProfile';
import ConfimDelete from './comp/ConfimDelete';
import ProfileDetails from './comp/ProfileDetails'
import { MyContext } from '../../services/MyProvider';
import FatchDataApi from '../../services/FatchDataApi';
import MyNotification from '../../services/MyNotification';
import usePageTitle from '../../services/usePageTitle';
import NotFound from '../../components/NotFound/NotFound';
import './profiles.css'

function Profiles() {

  usePageTitle("פרופילים");
  const [searchString, setSearchString] = useState(""); //search criteria
  const { profiles, setProfiles, userInfo, handleTypes, setHandleTypes, accessToken, setIsLoading } = useContext(MyContext)

  // Initialize - Fetch profiles & Handling Types from server 
  useEffect(() => {
    //callback to update data from server
    const HandleLoadProfiles = (profiles) => {
      setProfiles(profiles);  //update data 
      setIsLoading(false);  //Hide Loading component
    }
    //callback to update data from server
    const HandleLoadHandleTypes = (handleTypes) => {
      setHandleTypes(handleTypes);  //update data 
      setIsLoading(false);  //Hide Loading component
    }
    //callback to handle response error
    const HandleReject = (error) => {
      setIsLoading(false)
    }

    //Show Loading component on data undifiend
    if (!profiles || !handleTypes)
      setIsLoading(true)

    // Fetch Customer profiles Array from server 
    if (!profiles && accessToken)
      FatchDataApi('profiles', 'GET', accessToken, HandleLoadProfiles, { onReject: HandleReject })

    //if we dont have Handle Types Array Fetch from server 
    if (!handleTypes && accessToken)
      FatchDataApi('handling_types', 'GET', accessToken, HandleLoadHandleTypes, { onReject: HandleReject })

  }, [accessToken])// eslint-disable-line react-hooks/exhaustive-deps


  const HandleAddData = (newData) => {
    //Handles Creation of New Profile record on Server
    function addProfile(responseData) {
      setProfiles([...profiles, responseData.newProfile]);
      MyNotification("light", "פרופיל חדש", `פרופיל ${responseData.newProfile.name} נוסף בהצלחה`);
    }
    FatchDataApi('profiles/add', 'POST', accessToken, addProfile, { payload: newData, errorMsgTitle: "שגיאה ביצירת פרופיל" })
  }

  const HandleUpdateData = (updateData) => {
    //Handles Updating Profile record on Server
    function updateProfile(responseData) {
      let tempData = profiles.filter(profile => profile.profile_id !== responseData.UpdatedProfile.profile_id)
      setProfiles([...tempData, responseData.UpdatedProfile]);
      MyNotification("light", "פרופיל עודכן", `פרופיל ${responseData.UpdatedProfile.name} עודכן בהצלחה`);
    }
    FatchDataApi('profiles/update', 'PUT', accessToken, updateProfile, { payload: updateData, errorMsgTitle: "שגיאה בעדכון פרופיל" })

  }

  const HandleRemoveData = (dataId) => {
    //Handles Deleting Profile record on Server

    function deleteProfile(responseData) {
      let tempData = profiles.filter(profile => profile.profile_id !== responseData.DeletedProfile.profile_id)
      setProfiles(tempData);
      MyNotification("light", "פרופיל הוסר", `פרופיל ${responseData.DeletedProfile.name} הוסר בהצלחה`);
    }
    FatchDataApi('profiles/delete', 'DELETE', accessToken, deleteProfile, { payload: { "profile_id": dataId }, errorMsgTitle: "שגיאה בהסרת פרופיל" })
  }


  return (
    <div className='screen'>
      <div className="screen-header">
        <h1 className="header-title">ניהול&nbsp;פרופילים</h1>
        <div className='header-button-wraper'>
          {userInfo && userInfo.mng_access_list.profilesEdit &&
            <NavLink to="add" style={({ isActive }) => isActive ? { display: "none" } : {}}>
              <button className="btn wideBtn" title='יצירת פרופיל'>פרופיל&nbsp;חדש&nbsp;<FontAwesomeIcon icon={faUserPlus} /></button>
            </NavLink>}
          <div className="search">
            <input  type='search' title='חיפוש פרופיל' placeholder='חיפוש פרופיל' value={searchString} onChange={(e) => setSearchString(e.target.value)}></input>
            <FontAwesomeIcon icon={faSearch} className='search-icon'/>
          </div>
        </div>
      </div>
      <div className="Profile" >
        <div className='ProfileModal'>
          <Routes>
            <Route path='/' element={<ProfileModal filterCriteria={searchString} />} />
            <Route path='/add' element={<AddProfile HandleAddData={HandleAddData} />} />
            <Route path='/details/:id' element={<ProfileDetails />} />
            <Route path='/update/:id' element={<UpdateProfile HandleUpdateData={HandleUpdateData} />} />
            <Route path='/remove/:id' element={<ConfimDelete HandleRemoveData={HandleRemoveData} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Profiles;

