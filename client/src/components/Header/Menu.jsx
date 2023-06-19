import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MyContext, EVENTS_TITLES } from '../../services/MyProvider';

export default function Menu({ refer, active, handleClick }) {

  const { userInfo } = useContext(MyContext)



  /* 
  ****  Better To Use isActive for CSS ***
  
  style={({ isActive }) => isActive ? { display: "none" } : undefined}
  
  */
  return (
    <>

      {userInfo &&
        <div ref={refer} className={`menu ${active}`}>
          <div className="menuCategory">            
            {userInfo.ui_access_list?.main && <NavLink to="/" onClick={handleClick}><p>ראשי</p></NavLink>}
            {userInfo.ui_access_list?.handling && <NavLink to="/handling" onClick={handleClick}><p>אירועים שלי</p></NavLink>}
            {userInfo.ui_access_list?.statistic && <NavLink to="/statistics" onClick={handleClick}><p>סטטיסטיקה</p></NavLink>}
            {userInfo.ui_access_list?.events &&
              <>
                <NavLink to="/events" onClick={handleClick}><p>כל הארועים</p></NavLink>
                <h3>אירועים פתוחים</h3>
                <NavLink to="/flow" onClick={handleClick}><p>{EVENTS_TITLES.trig1}</p></NavLink>
                <NavLink to="/reverse" onClick={handleClick}><p>{EVENTS_TITLES.trig2}</p></NavLink>
                <NavLink to="/vandalisem" onClick={handleClick}><p>{EVENTS_TITLES.trig3}</p></NavLink>
                <NavLink to="/battery" onClick={handleClick}><p>{EVENTS_TITLES.trig5}</p></NavLink>
                <NavLink to="/lifeSignal" onClick={handleClick}><p>{EVENTS_TITLES.trig6}</p></NavLink>
                <NavLink to="/pressure" onClick={handleClick}><p>{EVENTS_TITLES.trig7}</p></NavLink>
              </>
            }
          </div>
          <div className="menuCategory">
            {userInfo && userInfo.mng_access_list ?
              <>
                <h3>ניהול</h3>
                {userInfo.mng_access_list?.hydrantsAccess && <NavLink to="/hydrants" onClick={handleClick}><p>ברזי כיבוי אש</p></NavLink>}
                {userInfo.mng_access_list?.parametersAccess && <NavLink to="/parameters" onClick={handleClick}><p>פרמטרים</p></NavLink>}
                {userInfo.mng_access_list?.customersAccess && <NavLink to="/customers" onClick={handleClick}><p>לקוחות</p></NavLink>}
                {userInfo.mng_access_list?.profilesAccess && <NavLink to="/profiles" onClick={handleClick}><p>פרופילים</p></NavLink>}
                {userInfo.mng_access_list?.usersAccess && <NavLink to="/users" onClick={handleClick}><p>משתמשים</p></NavLink>}
              </> : <></>}
          </div>
        </div>
      }
    </>
  )
}
