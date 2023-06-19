/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { MyContext } from '../../../services/MyProvider';
import {  useContext } from 'react'
import {  useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'


function ProfileDetails() {

  const location = useLocation();
  const { handleTypes } = useContext(MyContext)
  const navigate = useNavigate();





  return (
    <div className="window" >
      <header>
        <h4 className='title'>פרטי פרופיל</h4>
      </header>
      <fieldset>
        <h2>{location.state.data.name}</h2>

      </fieldset>

      <fieldset>
        {handleTypes ? handleTypes.filter(handle => handle.type_id === location.state.data.handling_type_id).map((handleType) => {
          return <p>טיפול משוייך: {handleType.name}</p>
        }) : <p>ללא טיפול משוייך</p>}
      </fieldset>

      <h4>
        הרשאות פרופיל
        <hr />
      </h4>
      <div className='profileAccessList'>
        <fieldset>
          {location.state.data.ui_access_list.main && <p>מסך ראשי</p>}
        </fieldset>
        <fieldset>
          {location.state.data.ui_access_list.events && <p>מסך אירועים</p>}
        </fieldset>
        <fieldset>
          {location.state.data.ui_access_list.alerts && <p>מסך התראות</p>}
        </fieldset>
        <fieldset>
          {location.state.data.ui_access_list.statistic && <p>מסך סטיסטיקות</p>}
        </fieldset>
      </div>
      {location.state.data.access_mng &&
        <div>
          <h4>
            הרשאות ניהול
            <hr />
          </h4>
          <fieldset>
            <p>תאגידים:&nbsp;
              {location.state.data.mng_access_list.customersAccess ? 
                location.state.data.mng_access_list.customersEdit ? <>צפייה ועריכה</>
                :<>צפייה בלבד</>
              :<>ללא גישה</>
              }
            </p>
          </fieldset>
          
          <fieldset>
            <p>פרופילים:&nbsp;
              {location.state.data.mng_access_list.profilesAccess ? 
                location.state.data.mng_access_list.profilesEdit ? <>צפייה ועריכה</>
                :<>צפייה בלבד</>
              :<>ללא גישה</>
              }
            </p>
          </fieldset>
          
          <fieldset>
            <p>משתמשים:&nbsp;
              {location.state.data.mng_access_list.usersAccess ? 
                location.state.data.mng_access_list.usersEdit ? <>צפייה ועריכה</>
                :<>צפייה בלבד</>
              :<>ללא גישה</>
              }
            </p>
          </fieldset>

          <fieldset>
            <p>הידרנטים:&nbsp;
              {location.state.data.mng_access_list.hydrantsAccess ? 
                location.state.data.mng_access_list.hydrantsEdit ? <>צפייה ועריכה</>
                :<>צפייה בלבד</>
              :<>ללא גישה</>
              }
            </p>
          </fieldset>

          <fieldset>
            <p>פרמטרים:&nbsp;
              {location.state.data.mng_access_list.parametersAccess ? 
                location.state.data.mng_access_list.parametersEdit ? <>צפייה ועריכה</>
                :<>צפייה בלבד</>
              :<>ללא גישה</>
              }
            </p>
          </fieldset>

        </div>}



      <div className='btnContainer'>
        <button className="btn" type="back"
          onClick={(e) => { navigate(-1) }}
        >חזור&nbsp;
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>

    </div >
  )
}

export default ProfileDetails;