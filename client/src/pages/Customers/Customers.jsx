/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useState, useEffect, useContext } from 'react';
import CustomerModule from './comp/CustomerModule'
import AddCustomer from './comp/AddCustomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route, NavLink , useNavigate} from "react-router-dom";
import UpdateCustomer from './comp/UpdateCustomer';
import ConfimDelete from './comp/ConfimDelete';
import { MyContext } from '../../services/MyProvider';
import MyNotification from '../../services/MyNotification';
import FatchDataApi from '../../services/FatchDataApi';
import usePageTitle from '../../services/usePageTitle';
import './customers.css'
import NotFound from '../../components/NotFound/NotFound';

function Customers() {

  usePageTitle("לקוחות");
  const [searchString, setSearchString] = useState(""); //search criteria
  const [data, setData] = useState(); //Customers array
  const { userInfo, customerTypes, setCustomersTypes, accessToken, setIsLoading } = useContext(MyContext)
  const redirect = useNavigate();

  // Initialize - Fetch Customers & from server 
  useEffect(() => {
    // clean up controller
    let isSubscribed = true;

    //Show Loading component on data undifiend
    if (!data)
      setIsLoading(true)
    //callback to update data from server
    const handleLoadData = (data) => {
      setIsLoading(false) //Hide Loading component
      if (isSubscribed) setData(data) //update data 
    }
    //callback to handle response error
    const HandleReject = (error) => {
      setIsLoading(false)
    }

    // Fetch Customer Customers Array from server 
    if (accessToken)
      FatchDataApi('customers/parent', 'GET', accessToken, handleLoadData, { onReject: HandleReject })

    //if we dont have Customer Types Array Fetch from server 
    if (!customerTypes && accessToken)
      FatchDataApi('customer_types', 'GET', accessToken, setCustomersTypes, { onReject: HandleReject })
// remove callback subscription 
    return () => { isSubscribed = false }
  }, [accessToken])// eslint-disable-line react-hooks/exhaustive-deps


  const HandleAddData = (newData) => {
    //Handles Creation of New Customer record on Server

    function addCustomer(responseData) {
      setIsLoading(false)
      redirect('/customers')
      setData([ responseData.newCustomer,...data]);
      MyNotification("light", "לקוח חדש", `לקוח ${responseData.newCustomer.customer_name} נוסף בהצלחה`);
    }
    function onReject(responseData) {
      setIsLoading(false)      
      MyNotification("red", "שגיאה ביצירת לקוח",(responseData?.msg)? responseData.msg:'שגיאה בעת יצירת לקוח חדש');
    }
    setIsLoading(true)
    FatchDataApi('customers/add', 'POST', accessToken, addCustomer, { payload: newData, errorMsgTitle: "שגיאה ביצירת לקוח" ,onReject:onReject })

  }

  const HandleUpdateData = (updateData) => {
    //Handles Updating Customer record on Server

    function updateCustomer(responseData) {
      let tempData = data.filter(customer => customer.customer_id !== responseData.UpdatedCustomer.customer_id)
      setData([...tempData, responseData.UpdatedCustomer]);
      MyNotification("light", "לקוח עודכן", `לקוח ${responseData.UpdatedCustomer.customer_name} עודכן בהצלחה`);
    }
    FatchDataApi('customers/update', 'PUT', accessToken, updateCustomer, { payload: updateData, errorMsgTitle: "שגיאה בעדכון לקוח" })

  }

  const HandleRemoveData = (dataId) => {
    //Handles Deleting Customer record on Server

    function deleteCustomer(responseData) {
      let tempData = data.filter(customer => customer.customer_id !== responseData.DeletedCustomer.customer_id)
      setData(tempData);
      MyNotification("light", "לקוח הוסר", `לקוח ${responseData.DeletedCustomer.customer_name} הוסר בהצלחה`);
    }
    FatchDataApi('customers/delete', 'DELETE', accessToken, deleteCustomer, { payload: { "customer_id": dataId }, errorMsgTitle: "שגיאה בהסרת פרופיל" })

  }


  return (
    <div className='screen'>
      <div className="screen-header">
        <h1 className="header-title">ניהול&nbsp;לקוחות</h1>
        <div className='header-button-wraper'>
          {userInfo && userInfo.mng_access_list.customersEdit &&
            <NavLink to="add" style={({ isActive }) => isActive ? { display: "none" } : {}}>
              <button className="btn wideBtn" title='יצירת לקוח'>לקוח&nbsp;חדש&nbsp;<FontAwesomeIcon icon={faUserPlus} /></button>
            </NavLink>}
          <div className='search'>
            <input type='search' value={searchString} title='חיפוש לקוח' placeholder='חפש לקוח' onChange={(e) => setSearchString(e.target.value)}></input>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>
      </div>
      <div className="customer" >
        <div className='customerModule'>
          <Routes>
            <Route path='/' element={<CustomerModule data={data} filterCriteria={searchString} />} />
            <Route path='/add' element={<AddCustomer HandleAddData={HandleAddData} customerTypes={customerTypes} />} />
            <Route path='/update/:id' element={<UpdateCustomer HandleUpdateData={HandleUpdateData} customerTypes={customerTypes} />} />
            <Route path='/remove/:id' element={<ConfimDelete HandleRemoveData={HandleRemoveData} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Customers;

