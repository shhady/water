/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useState, useEffect, useContext } from 'react';
import UserModule from './comp/UserModule'
import AddUser from './comp/AddUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route, NavLink,useNavigate } from "react-router-dom";
import UpdateUser from './comp/UpdateUser';
import ConfimDelete from './comp/ConfimDelete';
import { MyContext } from '../../services/MyProvider';
import MyNotification from '../../services/MyNotification';
import FatchDataApi from '../../services/FatchDataApi';
import usePageTitle from '../../services/usePageTitle';
import NotFound from '../../components/NotFound/NotFound';
import './users.css'

function Users() {

  usePageTitle("משתמשים");
  const [searchString, setSearchString] = useState(""); //search criteria
  const [data, setData] = useState(); //Users array
  const { userInfo, profiles, setProfiles, accessToken, setIsLoading } = useContext(MyContext)

  const redirect = useNavigate();


  // Initialize - Fetch Users & from server 
  useEffect(() => {

    //Show Loading component on data undifiend
    if (!data || !profiles)
      setIsLoading(true)

    //callback to update data from server
    const handleLoadData = (data) => {
      setIsLoading(false) //Hide Loading component
      setData(data) //update data 
    }
    
    const HandleLoadProfiles = (profiles) => {
      setProfiles(profiles);  //update data 
      setIsLoading(false);  //Hide Loading component
    }
    //callback to handle response error
    const HandleReject = (error) => {
      setIsLoading(false)
    }
    
    
    // Fetch User Users Array from server 
    if (accessToken)
      FatchDataApi('users', 'GET', accessToken, handleLoadData, { onReject: HandleReject })

    // Fetch Customer profiles Array from server 
    if (!profiles && accessToken)
      FatchDataApi('profiles', 'GET', accessToken, HandleLoadProfiles, { onReject: HandleReject })

  }, [accessToken])// eslint-disable-line react-hooks/exhaustive-deps


  //Handles Creation of New User record on Server
  const HandleAddData = (newData) => {

    function addUser(responseData) {
      setData(data=>[ responseData.newUser,...data]);
      redirect('/users')
      setIsLoading(false)
      MyNotification("light", "משתמש חדש", `משתמש ${responseData.newUser.username} נוסף בהצלחה`);
    }
    //callback to handle response error
    const HandleReject = (responseData) => {
      setIsLoading(false)
      MyNotification("red", "שגיאה ביצירת משתמש",(responseData?.msg)? responseData.msg:'שגיאה בעת יצירת משתמש חדש');

    }
    setIsLoading(true);
    FatchDataApi('users/add', 'POST', accessToken, addUser, { payload: newData, errorMsgTitle: "שגיאה ביצירת משתמש", onReject: HandleReject})
  }
  const HandleUpdateData = (updateData) => {
    //Handles Updating User record on Server

    function updateUser(responseData) {
      let tempData = data.filter(user => user.user_id !== responseData.UpdatedUser.user_id)
      setData([ responseData.UpdatedUser,...tempData]);
      redirect('/users')
      setIsLoading(false)
      MyNotification("light", "משתמש עודכן", `משתמש ${responseData.UpdatedUser.username} עודכן בהצלחה`);
    }
    setIsLoading(true);
    FatchDataApi('users/update', 'PUT', accessToken, updateUser, { payload: updateData, errorMsgTitle: "שגיאה בעדכון משתמש" })
  }

  const HandleRemoveData = (dataId) => {
    //Handles Deleting User record on Server

    function deleteUser(responseData) {
      let tempData = data.filter(user => user.user_id !== responseData.DeletedUser.user_id)
      setData(tempData);
      MyNotification("light", "משתמש הוסר", `משתמש ${responseData.DeletedUser.username} הוסר בהצלחה`);
    }
    FatchDataApi('users/delete', 'DELETE', accessToken, deleteUser, { payload: { "user_id": dataId }, errorMsgTitle: "שגיאה בהסרת פרופיל" })

  }



  return (
    <div className='screen'>
      <div className="screen-header">
        <h1 className="header-title">ניהול&nbsp;משתמשים</h1>
        <div className='header-button-wraper'>

          {userInfo && userInfo.mng_access_list.usersEdit &&
            <NavLink to="add" style={({ isActive }) => isActive ? { display: "none" } : {}}>
              <button className="btn wideBtn" title='יצירת משתמש'>משתמש&nbsp;חדש&nbsp;<FontAwesomeIcon icon={faUserPlus} /></button>
            </NavLink>}
          <div className="search">
          <input type='search' title='חיפוש משתמש' placeholder='חפש משתמש' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>
      </div>
      <div className="user" >
        <div className='userModule'>
          <Routes>
            <Route path='/' element={<UserModule data={data} filterCriteria={searchString} />} />
            <Route path='/add' element={<AddUser HandleAddData={HandleAddData} />} />
            <Route path='/update/:id' element={<UpdateUser HandleUpdateData={HandleUpdateData} />} />
            <Route path='/remove/:id' element={<ConfimDelete HandleRemoveData={HandleRemoveData} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Users;

