import React from 'react';

export default function CorpLogo({logo, corpName, lastItem})
{
  const changeCorp = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="corpDet" onClick={changeCorp}>
        <div>
            <img src={logo} alt={`${corpName} logo`} />
            <h3>{corpName}</h3>
        </div>
        {!lastItem && <hr/>}
    </div>
  )
}
