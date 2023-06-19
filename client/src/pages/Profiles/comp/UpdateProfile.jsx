/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { MyContext } from '../../../services/MyProvider';
import { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCancel, faFloppyDisk, faUserCheck, faTrashAlt, faC } from '@fortawesome/free-solid-svg-icons'


function UpdateProfile({ HandleUpdateData }) {

  const location = useLocation();
  const { handleTypes } = useContext(MyContext) //retrieve handle types list
  const navigate = useNavigate(); //redirect on update/ remove /cancel


  const [name, setName] = useState(location.state.data.name)
  const [accessMng, setAccessMng] = useState(location.state.data.access_mng)
  const [mngAccessList, setMngAccessList] = useState(location.state.data.mng_access_list)
  const [uiAccessList, setUiAccessList] = useState(location.state.data.ui_access_list)
  const [handleTypeId, setHandleTypeId] = useState(location.state.data.handling_type_id ? location.state.data.handling_type_id : -1)

  const toggleMngPermission = () => {

    setAccessMng(!accessMng)
  }

  const toggleUiScreenAccess = (screen) => {

    const temp = { ...uiAccessList }
    temp[screen] = !uiAccessList[screen]
    setUiAccessList(temp)
  }
  const toggleMngAccess = (screen) => {
    const temp = { ...mngAccessList }
    if (screen.includes('Access') && mngAccessList[screen]) //if Disabled Access => Disable Edit
      temp[screen.replace('Access', 'Edit')] = false
    if (screen.includes('Edit') && !mngAccessList[screen.replace('Edit', 'Access')]) //if Enabled Edit => Enable Access
      temp[screen.replace('Edit', 'Access')] = true
    temp[screen] = !mngAccessList[screen]
    setMngAccessList(temp)
  }


  const HandleUpdateProfile = (e) => {
    e.preventDefault()
    // Callback function from Profile module to update data on server 
    HandleUpdateData({
      profile_id: location.state.data.profile_id,
      name: name,
      access_mng: accessMng,
      mng_access_list: accessMng ? mngAccessList : { "parametersAccess": false, "parametersEdit": false, "hydrantsAccess": false, "hydrantsEdit": false, "usersAccess": false, "usersEdit": false, "profilesAccess": false, "profilesEdit": false, "customersAccess": false, "customersEdit": false },
      ui_access_list: uiAccessList,
      handling_type_id: Number(handleTypeId)
    })
    //after update redirect back to profiles screen
    navigate("/profiles")
  }


  return (
    <div className="window" >

      <header>
        <h3 className='title'>עדכון פרופיל</h3>
      </header>

      <form className="profileForm" onSubmit={e => HandleUpdateProfile(e)} >
        <fieldset>
          <label htmlFor='name'>שם הפרופיל</label>
          <input type="text" id='name' name='name' required='required' placeholder='הזן שם פרופיל'
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='HandleType'>טיפול משוייך: </label>
          <select id='HandleType' name='HandleType' value={handleTypeId} onChange={(e) => setHandleTypeId(e.target.value)} >
            <option value={-1} checked >אינו גורם מטפל</option>
            {handleTypes ? handleTypes.map((handleType, idx) => {
              return <option key={idx} value={handleType.type_id}>{handleType.name}</option>
            }) : <></>}
          </select>
        </fieldset>

        <h4>
          ממשק משתמש:
          <hr />
        </h4>

        <div className='profileAccessList'>
          <fieldset>
            <input type="checkbox" id='mainScreen' name='mainScreen'
              checked={uiAccessList.main}
              onChange={() => toggleUiScreenAccess('main')} />
            <label htmlFor='mainScreen'>מסך ראשי </label>
          </fieldset>

          <fieldset>
            <input type="checkbox" id='eventScreen' name='eventScreen'
              checked={uiAccessList.events}
              onChange={() => toggleUiScreenAccess('events')} />
            <label htmlFor='eventScreen'>אירועים </label>
          </fieldset>

          <fieldset>
            <input type="checkbox" id='alertsScreen' name='alertsScreen'
              checked={uiAccessList.alerts}
              onChange={() => toggleUiScreenAccess('alerts')} />
            <label htmlFor='alertsScreen'>התראות</label>
          </fieldset>

          <fieldset>
            <input type="checkbox" id='handlingScreen' name='handlingScreen'
              checked={uiAccessList.handling}
              onChange={() => toggleUiScreenAccess('handling')} />
            <label htmlFor='handlingScreen'>תפעול אירועים</label>
          </fieldset>

          <fieldset>
            <input type="checkbox" id='statisticScreen' name='statisticScreen'
              checked={uiAccessList.statistic}
              onChange={() => toggleUiScreenAccess('statistic')} />
            <label htmlFor='statisticScreen'>סטטיסטיקות </label>
          </fieldset>

          <fieldset>
            <input type="checkbox" id='accessMng' name='accessMng'
              checked={accessMng}
              onChange={toggleMngPermission} />
            <label htmlFor='accessMng'>הרשאות ניהול </label>
          </fieldset>
        </div>
        {accessMng ? (
          <div className='accessMng'>
            <h4>
              ממשק ניהול:
              <hr></hr>
            </h4>

            <fieldset>
              <label > תאגידים: </label>
              <div>
                <input type="checkbox" id='customerView' name='customerView'
                  checked={mngAccessList.customersAccess}
                  onChange={() => toggleMngAccess('customersAccess')} />
                <label htmlFor="customerView" className="detailsMiniLable">צפייה</label>
                <input type="checkbox" id='customerEdit' name='customerEdit'
                  checked={mngAccessList.customersEdit}
                  onChange={() => toggleMngAccess('customersEdit')} />
                <label htmlFor="customerEdit" className="detailsMiniLable">עריכה</label>
              </div>
            </fieldset>

            <fieldset>
              <label > פרופילים: </label>
              <div>
                <input type="checkbox" id='profileView' name='profileView'
                  checked={mngAccessList.profilesAccess}
                  onChange={() => toggleMngAccess('profilesAccess')} />
                <label htmlFor="profileView" className="detailsMiniLable">צפייה</label>
                <input type="checkbox" id='profileEdit' name='profileEdit'
                  checked={mngAccessList.profilesEdit}
                  onChange={() => toggleMngAccess('profilesEdit')} />
                <label htmlFor="profileEdit" className="detailsMiniLable">עריכה</label>
              </div>
            </fieldset>


            <fieldset>
              <label > משתמשים: </label>
              <div>
                <input type="checkbox" id='userView' name='userView'
                  checked={mngAccessList.usersAccess}
                  onChange={() => toggleMngAccess('usersAccess')} />
                <label htmlFor="userView" className="detailsMiniLable">צפייה</label>

                <input type="checkbox" id='userEdit' name='userEdit'
                  checked={mngAccessList.usersEdit}
                  onChange={() => toggleMngAccess('usersEdit')} />
                <label htmlFor="userEdit" className="detailsMiniLable">עריכה</label>
              </div>
            </fieldset>


            <fieldset>
              <label > הידרנטים: </label>
              <div>
              <input type="checkbox" id='hydrantView' name='hydrantView'
                checked={mngAccessList.hydrantsAccess}
                onChange={() => toggleMngAccess('hydrantsAccess')}
              />
              <label htmlFor="hydrantView" className="detailsMiniLable">צפייה</label>
              <input type="checkbox" id='hydrantEdit' name='hydrantEdit'
                checked={mngAccessList.hydrantsEdit}
                onChange={() => toggleMngAccess('hydrantsEdit')}
              />
              <label htmlFor="hydrantEdit" className="detailsMiniLable">עריכה</label>
              </div>
            </fieldset>

            <fieldset>
              <label > פרמטרים: </label>
              <div>
              <input type="checkbox" id='parameterView' name='parameterView'
                checked={mngAccessList.parametersAccess}
                onChange={() => toggleMngAccess('parametersAccess')} />
              <label htmlFor="parameterView" className="detailsMiniLable">צפייה</label>

              <input type="checkbox" id='parameterEdit' name='parameterEdit'
                checked={mngAccessList.parametersEdit}
                onChange={() => toggleMngAccess('parametersEdit')} />
              <label htmlFor="parameterEdit" className="detailsMiniLable">עריכה</label>
              </div>
            </fieldset>


          </div>) : <></>}




        <div className='btnContainer'>
          <button className="btn" type="back"
            onClick={(e) => { e.preventDefault(); navigate(-1) }}>ביטול&nbsp;
            <FontAwesomeIcon icon={faCancel} />
          </button>

          <Link to={`/profiles/remove/${location.state.data.profile_id}`} state={{ data: location.state.data }}>
            <button className="btn warning" type="cancel">מחיקה&nbsp;
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </Link>

          <button className="btn" type="submit">שמירה&nbsp;
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
      </form>

    </div>
  )
}

export default UpdateProfile;