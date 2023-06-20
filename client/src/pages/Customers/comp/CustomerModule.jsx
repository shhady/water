/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { MyContext } from '../../../services/MyProvider'
import { useContext } from 'react'


function CustomerModule({ data, filterCriteria }) {
  // This React Function recives array of Customers & filter Criteria and Renders them

  const { userInfo, customerTypes } = useContext(MyContext)

  const CustomerTypeIdToName = (customer) => {
    // This function recives Customer and returns it's assigned Handle Type as String
    // if no Handle Type assigned to Customer returns "ללא"  
    const types = customerTypes && customerTypes.find(type => type.customer_type_id === customer.customer_type)
    if (types)
      return types.name
    else
      return ''
  }

  function filteredData() {
    return data?.filter(customer => (filterCriteria === "") || (customer.customer_name.toLowerCase().includes(filterCriteria.toLowerCase())))
  }

  return (

    <>
      {filteredData()?.length === 0 ? <h4 style={{ color: 'var(--textColor)', padding: "1rem" }}>אין לקוחות להצגה</h4> :
        filteredData()?.map((customer) =>
          <label key={customer.customer_id} htmlFor={`customer_${customer.customer_id}`} title='פרטים נוספים'>
            <div className="window customer-box" >
              <header>{CustomerTypeIdToName(customer)}</header>
              <div className="customer-box-content">
                <div className="customer-box-title">
                  <a href={window.location.protocol + "//" +window.location.host.replace(window.location.host.split(".")[0], customer.sub_domain)} title='ניווט ללקוח'>
                  {customer.logo_url ?
                    <img className='clientLogo' src={customer.logo_url} alt={`לוגו ${customer.customer_name}`}></img>
                    :
                    <div className='clientLogoPlaceHolder'>
                      <div className='clientLogoPlaceHolderText'>
                        <i>לוגו</i>
                        <br />
                        <i>לקוח</i>
                      </div>
                    </div>
                  }

                  </a>
                    <h3 >{customer.customer_name}</h3>
                </div>
                {/* checkbox for Hide /Show Customer Details */}
                <input type='checkbox' style={{ 'display': 'none' }}
                  className='showInfo' id={`customer_${customer.customer_id}`} />

                <div className="customer-box-info" >
                  <div className='customerInfoList'>
                    <p>נתיב:</p>
                    <a title='ניווט ללקוח' style={{color:'-webkit-link'}} href={window.location.protocol + "//" +window.location.host.replace(window.location.host.split(".")[0], customer.sub_domain)}>{window.location.protocol + "//" +window.location.host.replace(window.location.host.split(".")[0], customer.sub_domain)}</a>
                  </div>
                  <hr style={{marginBlock:'1rem'}} />
                  <div className='customerInfoList'>
                    <p>כתובת:</p>
                    <p>{customer.city}&nbsp;{customer.street}&nbsp;{customer.number}</p>                  
                    <p>טלפון&nbsp;קוי:</p>
                    <p>{customer.contact_landline}</p>
                    <p>איש קשר:</p>
                    <p>{customer.contact_name}</p>
                    <p>טלפון:</p>
                    <p>{customer.contact_phone}</p>
                    <p>מייל:</p>
                    <p>{customer.contact_email}</p>
                  </div>



                </div>

                {/* - TBD - hide this button on unauthorized to edit Customers */}
                <div className="btnContainer">
                  {userInfo.mng_access_list.customersEdit &&
                    <Link to={`update/${customer.customer_id}`} state={{ data: customer }}>
                      <button className='btn wideBtn'>עריכת&nbsp;לקוח&nbsp;<FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </Link>}
                </div>

              </div>

            </div>
          </label>
        )
      }
    </>


  )
}

export default CustomerModule;