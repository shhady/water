/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { MyContext } from '../../../services/MyProvider'
import { useContext } from 'react'


function ProfileModal({filterCriteria}) {
  // This React Function recives array of Profiles & filter Criteria and Renders them

  const {profiles,userInfo, handleTypes } = useContext(MyContext)
  
  const handlingTypeIdToName = (profile)=>{
    // This function recives Profile and returns it's assigned Handle Type as String
    // if no Handle Type assigned to Profile returns "ללא"  
    const handle = handleTypes && handleTypes.find(handle => handle.type_id === profile.handling_type_id)
    if (handle)
      return handle.name
    else
      return 'ללא'

  } 

  function filteredProfiles(){
    
    return profiles?.filter(Profile => (filterCriteria === "") || (Profile.name.toLowerCase().includes(filterCriteria.toLowerCase())))

  }

  return (

    <>
      {filteredProfiles()?.length === 0 ? <h4 style={{color:'var(--textColor)' , padding:"1rem"}}>אין פרופולים להצגה</h4>:
      filteredProfiles()?.map((profile) =>
        <label key={profile.profile_id} htmlFor={`profile_${profile.profile_id}`} title='לחץ לפרטים'>
          <div className="window profile-box" >
            <header><h3>פרופיל</h3></header>
            <div className="profile-box-content">
              <h2 style={{margin:"0.5rem"}}>{profile.name}</h2>
              {/* checkbox for Hide /Show Profile Details */}
              <input type='checkbox' style={{ 'display': 'none' }} className='showInfo' id={`profile_${profile.profile_id}`} />
              <div className="profile-box-info" >

                <fieldset>
                  <p>טיפול משוייך:
                    {  handlingTypeIdToName(profile)}
                  </p>
                </fieldset>

                <h4>
                  ממשקי פרופיל
                  <hr />
                </h4>
                <div className='profileAccessList'>
                  <fieldset>
                    {profile.ui_access_list.main && <p>ראשי</p>}
                  </fieldset>
                  <fieldset>
                    {profile.ui_access_list.events && <p>אירועים</p>}
                  </fieldset>
                  <fieldset>
                    {profile.ui_access_list.alerts && <p>התראות</p>}
                  </fieldset>
                  <fieldset>
                    {profile.ui_access_list.handling && <p>תפעול אירועים</p>}
                  </fieldset>
                  <fieldset>
                    {profile.ui_access_list.statistic && <p>סטיסטיקות</p>}
                  </fieldset>
                </div>

                {profile.access_mng ?
                  <div>
                    <h4>
                      הרשאות ניהול
                      <hr />
                    </h4>
                    <fieldset>
                      <p>תאגידים:&nbsp;
                        {profile.mng_access_list.customersAccess ?
                          profile.mng_access_list.customersEdit ? <>צפייה ועריכה</>
                            : <>צפייה בלבד</>
                          : <>ללא גישה</>
                        }
                      </p>
                    </fieldset>

                    <fieldset>
                      <p>פרופילים:&nbsp;
                        {profile.mng_access_list.profilesAccess ?
                          profile.mng_access_list.profilesEdit ? <>צפייה ועריכה</>
                            : <>צפייה בלבד</>
                          : <>ללא גישה</>
                        }
                      </p>
                    </fieldset>

                    <fieldset>
                      <p>משתמשים:&nbsp;
                        {profile.mng_access_list.usersAccess ?
                          profile.mng_access_list.usersEdit ? <>צפייה ועריכה</>
                            : <>צפייה בלבד</>
                          : <>ללא גישה</>
                        }
                      </p>
                    </fieldset>

                    <fieldset>
                      <p>הידרנטים:&nbsp;
                        {profile.mng_access_list.hydrantsAccess ?
                          profile.mng_access_list.hydrantsEdit ? <>צפייה ועריכה</>
                            : <>צפייה בלבד</>
                          : <>ללא גישה</>
                        }
                      </p>
                    </fieldset>

                    <fieldset>
                      <p>פרמטרים:&nbsp;
                        {profile.mng_access_list.parametersAccess ?
                          profile.mng_access_list.parametersEdit ? <>צפייה ועריכה</>
                            : <>צפייה בלבד</>
                          : <>ללא גישה</>
                        }
                      </p>
                    </fieldset>

                  </div>:<></>}


              </div>
              {/* - TBD - hide this button on unauthorized to edit profiles */}
              <div className="btnContainer">
                {userInfo.mng_access_list.profilesEdit &&<Link to={`update/${profile.profile_id}`} state={{ data: profile }}>
                  <button className='btn'>עריכה&nbsp;<FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </Link>}

              </div>
            </div>

          </div>
        </label>
      ) 
      }
    </>


  )
}

export default ProfileModal;