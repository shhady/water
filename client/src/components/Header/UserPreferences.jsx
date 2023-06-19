import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../services/MyProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import FatchDataApi from '../../services/FatchDataApi';
import {useComponentVisible} from '../../services/UseComponentVisible';





export default function UserPreferences() {

  const { accessToken, setAccessToken, userInfo, setUserInfo,isLoading,setIsLoading,setIsMuted,setIsReverseFlow } = useContext(MyContext);

  const {
    ref,
    isComponentVisible,
    handleClick
  } = useComponentVisible(false, true);

  const redirect = useNavigate();


  const logOut = () => {
    //callback to update data after server response
    function handleLogout(response) {
      redirect('/login');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenLifeSpan');
      // localStorage.removeItem('userName');      
      setIsMuted(false);
      setIsReverseFlow(null);
      setUserInfo(null);
      setAccessToken(null);
      setIsLoading(false)
    }

    //callback to handle response error
    const HandleReject=(error)=> {
      setIsLoading(false)
      redirect('/login');
  }
    
    setIsLoading(true)
    FatchDataApi('logout-with-token', 'POST', accessToken, handleLogout,{onReject:HandleReject});
  }


  return (
    <div ref={ref}>
      <h2 className='currentUser' onClick={handleClick} >
        <FontAwesomeIcon icon={faUser}/>&nbsp;{userInfo.first_name}&nbsp;{userInfo.last_name}
      </h2 >
      {isComponentVisible &&
        <div className="userOptions">
          <button className='btn' 
          disabled={isLoading}
          onClick={logOut} >יציאה&nbsp;<FontAwesomeIcon icon= {faRightFromBracket}/></button >
        </div>
      }
    </div>
  )
}
