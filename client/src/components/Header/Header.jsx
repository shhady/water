import { useContext } from 'react'
import UserPreferences from './UserPreferences'
import SideBar from './SideBar'
import Logo from '../../assets/logos/i-jet.png'
import { MyContext } from '../../services/MyProvider'
import { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderAlert from './HeaderAlert'
export default function Header() {

  const { userInfo } = useContext(MyContext)


  return (
    <header>
      {userInfo && <HeaderAlert />}
      {userInfo &&
        <div className="currentDet">
          {userInfo?.customer_logo && <img src={userInfo?.customer_logo} alt={`לוגו ${userInfo?.customer_name}`} className="clientLogo" />}
          <div className="corps">
            <div className="corpName">
              <h1>{userInfo?.customer_name}</h1>
            </div>
            <UserPreferences />
          </div>
        </div>
      }
      <img src={Logo} className="compLogo" alt="I-Jet Logo" />
      <SideBar />
    </header>
  )
}