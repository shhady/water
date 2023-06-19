import { useState, useContext, useEffect } from 'react'
import { MyContext } from '../../services/MyProvider'
import FatchDataApi from '../../services/FatchDataApi'
import ParameterTable from './ParameterTable'
import usePageTitle from '../../services/usePageTitle'

export default function ViewParameters() {

  usePageTitle("פרמטרים");
  const {  accessToken, setIsLoading } = useContext(MyContext);
  const [parameters, setParameters] = useState();

  useEffect(() => {

    //Show Loading component on data undifiend
    if (!parameters)
      setIsLoading(true)
    //callback to handle response error
    const HandleReject = (error) => {
      setIsLoading(false)
    }

    //callback to update data from server
    const handleLoadParameters = (parameters) => {
      setIsLoading(false) //Hide Loading component
      setParameters(parameters) //update data 
    }

    // initial get parameters 
    accessToken && FatchDataApi('parameters', 'GET', accessToken, handleLoadParameters, { onReject: HandleReject });

  }, [accessToken]);



  return (
    <>
      <div className="screen-header">
        <h1 className="header-title">ניהול&nbsp;פרמטרים</h1>
      </div>
      <div className="parameters">
        {<ParameterTable data={parameters} setData={setParameters} accessToken={accessToken}/>}
      </div>
    </>
  )
}
