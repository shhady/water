/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import MyNotification from "../../../../services/MyNotification"
import { CordToAddress, addressToCord } from "../../../../services/geoCode"
import { TextField, FormHelperText } from '@material-ui/core';

export default function CustomerAdress({ formik }) {

  function handleChangeAddress(e) {
    formik.handleChange(e);
    const { id } = e.target;
    if (id === 'city') getGeoCord(e.target.value, formik.values.street, formik.values.number);
    if (id === 'street') getGeoCord(formik.values.city, e.target.value, formik.values.number);
    if (id === 'number') getGeoCord(formik.values.city, formik.values.street, e.target.value);
  }
  function handleCordChange(e) {
    formik.handleChange(e);
    const { id } = e.target;
    if (id === 'lat') getAddress(e.target.value, formik.values.lng);
    if (id === 'lng') getAddress(formik.values.lat, e.target.value);
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        formik.setFieldValue('lat', position.coords.latitude);
        formik.setFieldValue('lng', position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude)
      }, (err) => {
        if (err.code === 1)
          MyNotification('darkblue', "שגיאת מיקום", `לא ניתנו הראשות גישה למיקום`)
        else
          MyNotification('darkblue', "שגיאת מיקום", `${err.message}: ${err.code}`)
      });
    }
  }

  function getAddress(lat, lng) {
    if (lat !== "" && lng !== "") {
      CordToAddress(lat, lng)
        .then(geo => {
          if ('partAddress' in geo) {
            formik.setFieldValue('city', geo.partAddress.city);
            formik.setFieldValue('street', geo.partAddress.street);
            formik.setFieldValue('number', geo.partAddress.number);
            // setGeoAddress(`${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`)
          }
        })
        .catch(err => { MyNotification('darkblue', "איתור כתובת", `לא ניתן לאתר כתובת במיקום זה`) })
    }
  }

  function getGeoCord(city, street, number) {
    if (city !== "" && street !== "") {
      addressToCord(city, street, number)
        .then(geo => {
          if (geo?.partAddress) {
            // setGeoAddress(`${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`)
            if (geo.partAddress.city.includes(city) && geo.partAddress.street.includes(street)) {
              formik.setFieldValue('lat', geo.geometry.lat());
              formik.setFieldValue('lng', geo.geometry.lng());
            }
          }

        })
        .catch(err => { console.log(err) })
    }
  }

  return (
    <>
      
      <fieldset>
        <label htmlFor='city'>עיר:</label>
        <TextField type="text" id='city' name='city' required placeholder='עיר'
          fullWidth={true}
          error={formik.touched.city && formik.errors.city}
          value={formik.values.city}
          onChange={handleChangeAddress}
          onBlur={formik.handleBlur}
        />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.city && formik.errors.city}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='street'>רחוב:</label>
        <TextField type="text" id='street' name='street' required placeholder='רחוב'
          fullWidth={true}
          error={formik.touched.street && formik.errors.street}
          value={formik.values.street}
          onChange={handleChangeAddress}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.street && formik.errors.street}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='number'>מספר:</label>
        <TextField type="number" id='number' name='number' required placeholder='מספר'
          fullWidth={true}
          error={formik.touched.number && formik.errors.number}
          value={formik.values.number}
          onChange={handleChangeAddress}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.number && formik.errors.number}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='contactLandLine'>טלפון קווי:</label>
        <TextField type="tel" id='contactLandLine' name='contactLandLine' required placeholder='מספר טלפון קווי'
          fullWidth={true}
          error={formik.touched.contactLandLine && formik.errors.contactLandLine}
          value={formik.values.contactLandLine}
          // pattern="^[0-9]*[\-]?[0-9]*$"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.contactLandLine && formik.errors.contactLandLine}
        </FormHelperText>
      </fieldset>

      <div className='btnContainer'>
        <button
          type='button'
          className='btn'
          onClick={getCurrentLocation}>איתור&nbsp;מיקום&nbsp;נוכחי</button>
      </div>

      <fieldset>
        <label htmlFor='lat'>קורדינטת רוחב:</label>
        <TextField id='lat' name='lat' required
          fullWidth={true}
          error={formik.touched.lat && formik.errors.lat}
          value={formik.values.lat}
          onChange={handleCordChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.lat && formik.errors.lat}
        </FormHelperText>
      </fieldset>


      <fieldset>
        <label htmlFor='lng'>קורדינטת אורך:</label>
        <TextField id='lng' name='lng' required
          fullWidth={true}
          error={formik.touched.lng && formik.errors.lng}
          value={formik.values.lng}
          onChange={handleCordChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.lng && formik.errors.lng}
        </FormHelperText>
      </fieldset>

    </>
  )
}
