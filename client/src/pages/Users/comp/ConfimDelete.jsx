/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../../assets/logos/avatar.jpg'

export default function ConfimDelete({ HandleRemoveData }) {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="window user-box">
      <header><h3>מחיקת משתמש</h3></header>
      <div className="user-box-content">
        <br />
        <h2>הנך עומד למחוק משתמש</h2>
        <div className='userLogoWraper'>
            <div className='userLogoMask' style={(location.state.data.picture_url) ? { border: "2px solid transparent" } : { border: "2px dashed var(--gray)" }} />
            <img className='userLogo' src={(location.state.data.picture_url) ? location.state.data.picture_url : avatar} alt={`תמונת משתמש`} />
          </div>
        <div className="userInfoList" >
        <h4>שם:</h4>
        <h4>{location.state.data.first_name +' '+location.state.data.last_name}</h4>
        <h4>משתמש:</h4>
        <h4>{location.state.data.username}</h4>
        </div>
        <br />
        <h1 className="warning">האם אתה בטוח ?</h1>
        <br />
        <div className="btnContainer">          
            <button className='btn'
            onClick={()=> navigate(-1) }>ביטול&nbsp;
              <FontAwesomeIcon icon={faCancel} />
            </button>          
          <button className='btn' style={{color:'red'}} onClick={() =>{ HandleRemoveData(location.state.data.user_id);navigate("/users")}}>מחיקה&nbsp;
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>

    </div>
  )
}
