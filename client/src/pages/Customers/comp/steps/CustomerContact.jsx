/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import {  TextField,  FormHelperText } from '@material-ui/core';

export default function CustomerContact({formik}) {
  return (
    <>
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
          <label htmlFor='contactPhone'>טלפון נייד:</label>
          <TextField type="tel" id='contactPhone' name='contactPhone'
            required
            fullWidth={true}
            placeholder='טלפון'
            value={formik.values.contactPhone}
            // pattern="^[0-9]*[\-]?[0-9]*$"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
             <FormHelperText style={{ color: 'red' }} >         
          {formik.touched.contactPhone && formik.errors.contactPhone}
        </FormHelperText>
        </fieldset>


        <fieldset>
          <label htmlFor='contactEmail'>מייל:</label>
          <TextField type="email" id='contactEmail' name='contactEmail' required placeholder='אימייל'
           fullWidth={true}
           value={formik.values.contactEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
             <FormHelperText style={{ color: 'red' }} >         
          {formik.touched.contactEmail && formik.errors.contactEmail}
        </FormHelperText>
        </fieldset>


    </>
  )
}
