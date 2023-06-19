/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useEffect, useContext } from "react"
import { MyContext } from "./MyProvider"
import { useNavigate } from 'react-router-dom';
import FatchDataApi from "./FatchDataApi";
import MyNotification from "./MyNotification";


/**
 * A function that refreshes the JWT token.           
 * @returns None           
 */
export default function RefreshJwtToken() {

  const { setUserInfo, accessToken, setAccessToken } = useContext(MyContext);

  const redirect = useNavigate();  // Redirect to Log-In screen on factch response != OK

  useEffect(() => { //Run every change of Access Token on Local Storage

    if (localStorage.getItem('refreshToken') && localStorage.getItem('tokenLifeSpan')) { //if can't find user data redicrect to login
      if (accessToken)
        refreshToken(localStorage.getItem('refreshToken'), parseInt(localStorage.getItem('tokenLifeSpan')))  //Timeout fatch new token to local storage 
      else
        refreshTokenUser(localStorage.getItem('refreshToken'))

    }
    else // redicrect to Login Screen if can't find user data
      redirect('/login/')

  }, [accessToken]) // eslint-disable-line react-hooks/exhaustive-deps


  // ****************************************************
  //      Get User Info Using JWT Refesh Token                    
  // ****************************************************
  function HandleReject(error) {
    if (error?.msg==='Token has expired')
      MyNotification("blue", "התחברות משתמש", "תוקף החיבור הסתיים,נדרש להתחבר מחדש ")
    else
      MyNotification("red", "שגיאה בהתחברות משתמש", `${error.msg ? error.msg : "חיבור לשרת נכשל"}`)
    redirect('/login/') // redicrect to Login Screen if can't find user data
  }
  const refreshTokenUser = (refeshToken) => {

    function HandleResponse(data) {
      if (data.access_token) {
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('userName', data.user_name);
        localStorage.setItem('tokenLifeSpan', data.token_life_span);
        setAccessToken(data.access_token)
        setUserInfo(data)
      }
      else {
        MyNotification("red", "שגיאה בשליפת נתוני משתמש", ` שגיאה :`)
        redirect('/login/') // redicrect to Login Screen if can't find user data
      }

    }


    FatchDataApi('refresh_token_user', 'GET', refeshToken, HandleResponse, { onReject: HandleReject, errorMsgTitle: "שגיאה בחיבור משתמש" })

  }

  // ****************************************************
  //              Refresh JWT Token Only                    
  // ****************************************************
  const refreshToken = (refeshToken, delay) => {

    setTimeout(() => {
      FatchDataApi('refresh_token', 'POST', refeshToken, (data) => { setAccessToken(data.access_token) }, { onReject: HandleReject, errorMsgTitle: "שגיאה בשליפת נתונים" })
    }, delay) // delay befor fetching new token
  }

  return null
}
