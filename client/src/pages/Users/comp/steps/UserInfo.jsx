/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import { TextField, FormHelperText } from '@material-ui/core';
import avatar from '../../../../assets/logos/avatar.jpg'
import { uploadImage } from '../../../../services/firebase'


export default function UserInfo({ formik }) {

  return (
    <>
      <fieldset>
        <label htmlFor='pictureUrl'>תמונת פרופיל:</label>
        <label htmlFor='pictureUrl'
          style={{ justifySelf: "center" }}
          title='לחץ להעלאת תמונת משתמש'>
          <div className='userLogoWraper'>
            <div className='userLogoMask' style={(formik.values.pictureUrl) ? { border: "2px solid transparent" } : { border: "2px dashed var(--gray)" }} />
            <img className='userLogo' src={(formik.values.pictureUrl) ? formik.values.pictureUrl : avatar} alt={`תמונת משתמש`} />
          </div>
        </label>
        <input type="file" id='pictureUrl' name='pictureUrl' accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0], "users", (url) => formik.setFieldValue("pictureUrl", url))} >
        </input>
      </fieldset>

      <fieldset>
        <label htmlFor='firstName'>שם פרטי:</label>
        <TextField type="text" id='firstName' name='firstName' required placeholder='שם פרטי'
          fullWidth={true}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.firstName && formik.errors.firstName}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='lastName'>שם משפחה:</label>
        <TextField type="text" id='lastName' name='lastName' required placeholder='שם משפחה'
          fullWidth={true}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.lastName && formik.errors.lastName}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='phone'>טלפון נייד:</label>
        <TextField type="tel" id='phone' name='phone'
          required
          fullWidth={true}
          placeholder='טלפון'
          value={formik.values.phone}
          // pattern="^[0-9]*[\-]?[0-9]*$"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.phone && formik.errors.phone}
        </FormHelperText>
      </fieldset>


      <fieldset>
        <label htmlFor='email'>מייל:</label>
        <TextField type="email" id='email' name='email' required placeholder='אימייל'
          fullWidth={true}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.email && formik.errors.email}
        </FormHelperText>
      </fieldset>
    </>
  )
}
