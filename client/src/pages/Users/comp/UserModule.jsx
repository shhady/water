/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt , faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { MyContext } from '../../../services/MyProvider'
import { useContext } from 'react'
import Avatar from '../../../components/Avatar/Avatar';


function UserModule({ data, filterCriteria }) {
  // This React Function recives array of Users & filter Criteria and Renders them

  const { userInfo, profiles } = useContext(MyContext)

  const userProfileIdToName = (user) => {
    // This function recives User and returns it's assigned profile name as String
    // if no Handle Type assigned to User returns "ללא"  
    const types = profiles && profiles.find(profile => profile.profile_id === user.profile_id)
    if (types)
      return types.name
    else
      return 'ללא פרופיל'

  }

  function filteredUsers() {
    // Search filter 
    return data?.filter(user => (filterCriteria === "") || (user.first_name.toLowerCase().includes(filterCriteria.toLowerCase())) || (user.last_name.toLowerCase().includes(filterCriteria.toLowerCase())) || (user.username.toLowerCase().includes(filterCriteria.toLowerCase())))
  }
  return (

    <>
      {filteredUsers()?.length === 0 ? <h4 style={{ color: 'var(--textColor)', padding: "1rem" }}>אין משתמשים להצגה</h4> :
        filteredUsers()?.map((user) =>
          <label key={user.user_id} htmlFor={`user_${user.user_id}`} title='לחץ לפרטים'>
            <div className="window user-box" >
              <header>{userProfileIdToName(user)}</header>
              <div className="user-box-content">
                <div className="user-box-title">
                  <Avatar src={user.picture_url} alt={user.first_name + ' ' + user.last_name} />
                  <h3>{user.first_name}&nbsp;{user.last_name}</h3>
                </div>
                {/* checkbox for Hide /Show User Details */}
                <input type='checkbox' style={{ 'display': 'none' }}
                  className='showInfo' id={`user_${user.user_id}`} />

                <div className="user-box-info" >
                  <div className='userInfoList'>
                    <p>שם&nbsp;משתמש:</p>
                    <p>{user.username}</p>
                    {user.customer_user_id && <>
                      <p>משתמש&nbsp;חיצוני:</p>
                      <p>{user.customer_user_id}</p>
                    </>}
                    <p>טלפון:</p>
                    <p>{user.phone}</p>
                    <p>מייל:</p>
                    <p>{user.email}</p>
                  </div>
                </div>

                {/* - TBD - hide this button on unauthorized to edit Users */}
                {userInfo.mng_access_list.usersEdit &&
                  <div className="btnContainer" >
                    <Link to={`update/${user.user_id}`} state={{ data: user }}>
                      <button className='btn'>עריכה&nbsp;<FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </Link>
                    <Link to={`remove/${user.user_id}`} state={{ data: user }}>
                      <button className="btn warning" type="cancel">מחיקה&nbsp;
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </Link>
                  </div>
                }

              </div>

            </div>
          </label>
        )
      }
    </>


  )
}

export default UserModule;