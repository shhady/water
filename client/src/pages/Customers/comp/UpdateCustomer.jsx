/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel,faFloppyDisk, faTrashAlt, faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../../../services/firebase'
import { addressToCord, CordToAddress } from '../../../services/geoCode';
import MyNotification from '../../../services/MyNotification'

function UpdateCustomer({ HandleUpdateData,customerTypes }) {

  const location = useLocation();
  const navigate = useNavigate(); //redirect on add /cancel

  const [customerName, setCustomerName] = useState(location.state.data.customer_name)
  const [customerType, setCustomerType] = useState(location.state.data.customer_type)
  const [subDomain, setSubDomain] = useState(location.state.data.sub_domain)
  const [logoUrl, setLogoUrl] = useState(location.state.data.logo_url)

  const [city, setCity] = useState(location.state.data.city)
  const [street, setStreet] = useState(location.state.data.street)
  const [number, setNumber] = useState(location.state.data.number)
  const [lat, setLat] = useState(location.state.data.lat)
  const [lng, setLng] = useState(location.state.data.lng)
  const [geoAddress, setGeoAddress] = useState("")


  const [contactName, setContactName] = useState(location.state.data.contact_name)
  const [contactLandLine, setContactLandLine] = useState(location.state.data.contact_landline)
  const [contactPhone, setContactPhone] = useState(location.state.data.contact_phone)
  const [contactEmail, setContactEmail] = useState(location.state.data.contact_email)

//Callback Func to set GeoCode from Human address 
function getGeoCord(city, street, number) {
  if (city !== "" && street !== "") {
    addressToCord(city, street, number)
      .then(geo => {
        if (geo?.partAddress) {
          setGeoAddress(`${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`)
          if (geo.partAddress.city.includes(city) && geo.partAddress.street.includes(street)) {
            setLat(geo.geometry.lat)
            setLng(geo.geometry.lng)
          }
        }
        else
          setGeoAddress("כתובת לא זוהתה")
      })
      .catch(err => { setGeoAddress("כתובת לא זוהתה") })
  }
}
//Callback Func to set address from lat&lng cord
function getAddress(lat, lng) {
  if (lat !== "" && lng !== "") {
    CordToAddress(lat, lng)
      .then(geo => {
        if ('partAddress' in geo) {
          setCity(geo.partAddress.city)
          setStreet(geo.partAddress.street)
          setNumber(geo.partAddress.number)
          setGeoAddress(`${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`)
        }
        else
          setGeoAddress("לא זוהתה כתובת בקורדינטות")
      })
      .catch(err => { setGeoAddress("לא זוהתה כתובת בקורדינטות") })
  }
}
/******************************************
 handle update Input Address fields:
******************************************/


//handle update Input City field:
const handleChangeCity = (event) => {
  setCity(event.target.value);
  getGeoCord(event.target.value, street, number);
}
//handle update Input Street field:
const handleChangeStreet = (event) => {
  setStreet(event.target.value);
  getGeoCord(city, event.target.value, number);
}
//handle update Input Number field:
const handleChangeNumber = (event) => {
  setNumber(event.target.value);
  getGeoCord(city, street, event.target.value);
}


//handle update Input lat field:
const handleChangeLat = (event) => {
  setLat(event.target.value);
  getAddress(event.target.value, lng);
}
//handle update Input lng field:
const handleChangeLng = (event) => {
  setLng(event.target.value);
  getAddress(lat, event.target.value);
}

// Set Cordenat & address by Browser GeoLocation
const getCurrentLocation = (e) => {
  e.preventDefault()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      getAddress(position.coords.latitude, position.coords.longitude)
    }, (err) => {
      if (err.code === 1)
        MyNotification('darkblue', "שגיאת מיקום", `לא ניתנו הראשות גישה למיקום`)
      else
        MyNotification('darkblue', "שגיאת מיקום", `${err.message}: ${err.code}`)
    });
  }

}

  const HandleUpdateCustomer = (e) => {
    e.preventDefault()
    // Callback function from Customer module to update data on server 
    HandleUpdateData({
      customer_id: location.state.data.customer_id,
      customer_type: customerType,
      customer_name: customerName,
      sub_domain: subDomain,
      logo_url: logoUrl,

      city: city,
      street: street,
      number: number,
      lat: lat,
      lng: lng,

      contact_name: contactName,
      contact_landline: contactLandLine,
      contact_phone: contactPhone,
      contact_email: contactEmail
    })
    //after update redirect back to Customers screen
    navigate("/customers")
  }


  return (
    <div className="window" >

      <header>
        <h3 className='title'>עדכון לקוח</h3>
      </header>

      <form className="editForm" onSubmit={e => HandleUpdateCustomer(e)} >
      <fieldset>
          <label htmlFor='customerType'>סוג לקוח: </label>
          <select id='customerType' name='customerType'
            style={{justifySelf:"center"}}
            required
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)} >
          {customerTypes?.filter(type=>type.customer_type_id!==1).map(type=><option value={type.customer_type_id} >{type.name}</option>)}   
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor='logoUrl'>לוגו :</label>
          <label htmlFor='logoUrl' 
          style={{    justifySelf: "center"}}
          title='לחץ להעלאת לוגו'>
            {(logoUrl) ?
              <img src={logoUrl} className='clientLogo' alt='לוגו' /> :
              <div className='clientLogoPlaceHolder'>
                <FontAwesomeIcon icon={faCloudUpload} />
              </div>
            }
          </label>
          <input type="file" id='logoUrl' name='logoUrl' accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0], "customers", setLogoUrl)} >
          </input>
        </fieldset>

        <fieldset>
          <label htmlFor='customerName'>שם הלקוח:</label>
          <input type="text" id='customerName' name='customerName' required placeholder='שם לקוח'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='subDomain'>נתיב כניסה :</label>
          <input dir='ltr' type="text" id='subDomain' name='subDomain'
            required
            value={subDomain}
            onChange={(e) => setSubDomain(e.target.value)} />
          <p style={{"gridColumn":"-1/1"}}>
          <i>{subDomain && window.location.protocol + "//" +window.location.host.replace(window.location.host.split(".")[0], subDomain)}</i>
          </p>
        </fieldset>

        <h4>כתובת לקוח</h4>
        <hr />

        <div className='btnContainer'>
          <button
            className='btn'
            onClick={e => getCurrentLocation(e)}
          >קבלת&nbsp;מיקום&nbsp;נוכחי</button>
        </div>


        <fieldset>
          <label htmlFor='city'>עיר:</label>
          <input type="text" id='city' name='city' required placeholder='עיר'
            value={city}
            onChange={handleChangeCity} />

        </fieldset>

        <fieldset>
          <label htmlFor='street'>רחוב:</label>
          <input type="text" id='street' name='street' required placeholder='רחוב'
            value={street}
            onChange={handleChangeStreet} />

        </fieldset>

        <fieldset>
          <label htmlFor='number'>מספר:</label>
          <input type="number" id='number' name='number' required placeholder='מספר'
            value={number}
            onChange={handleChangeNumber} />

        </fieldset>

        <fieldset>
          <label htmlFor='lat'>קורדינטת רוחב:</label>
          <input type="number" id='lat' name='lat' required
            value={lat}
            onChange={handleChangeLat} />
        </fieldset>

        <fieldset>
          <label htmlFor='lng'>קורדינטת אורך:</label>
          <input type="number" id='lng' name='customerType' required
            value={lng}
            onChange={handleChangeLng} />
        </fieldset>
        
        {(geoAddress !== "") && <i>{geoAddress}</i>}
        
        <h4>איש קשר</h4>
        <hr />

        <fieldset>
          <label htmlFor='contactName'>שם:</label>
          <input type="text" id='contactName' name='contactName' required placeholder='שם איש קשר'
            value={contactName}
            onChange={(e) => setContactName(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='contactPhone'>טלפון:</label>
          <input type="text" id='contactPhone' name='contactPhone' required placeholder='מספר טלפון '
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='contactEmail'>אימייל :</label>
          <input type="email" id='contactEmail' name='contactEmail' required placeholder='אימייל'
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='contactLandLine'>טלפון קווי:</label>
          <input type="text" id='contactLandLine' name='contactLandLine' required placeholder='מספר טלפון קווי'
            value={contactLandLine}
            onChange={(e) => setContactLandLine(e.target.value)} />
        </fieldset>



        <div className='btnContainer'>
          <button className="btn" type="back"
            onClick={(e) => { e.preventDefault(); navigate(-1) }}>ביטול&nbsp;
            <FontAwesomeIcon icon={faCancel} />
          </button>

          <Link to={`/customers/remove/${location.state.data.profile_id}`} state={{ data: location.state.data }}>
            <button className="btn warning" type="cancel">מחיקה&nbsp;
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </Link>

          <button className="btn" type="submit">שמירה&nbsp;
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>


      </form>
    </div>
  )
}

export default UpdateCustomer;