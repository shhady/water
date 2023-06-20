import React, { useState } from 'react'
import UserPreferences from './UserPreferences'


export default function CorpChoice({ corpList, currentCorp, currentUser }) {

  const [displayCorps, setDisplayCorps] = useState(false);
  let isLast = false;


  return (
    <>
      <img src={currentCorp.logo} alt={`לוגו ${currentCorp.name}`} className="clientLogo" />
      <div className="corps">
        <div className="corpName">
          <h1>{currentCorp.name}</h1>
        </div>
        
        <UserPreferences user={currentUser} />
      </div>

    </>
  )
}
