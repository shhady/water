/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import {  TextField, Select, FormHelperText } from '@material-ui/core';
import { useContext } from 'react';
import { MyContext } from '../../../../services/MyProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../../../../services/firebase'


export default function CustomerInfo({ formik }) {

  const { customerTypes } = useContext(MyContext)

  return (
    <>
      <fieldset>
        <label htmlFor='customerType'>סוג לקוח: </label>
        <Select id='customerType' name='customerType'
        native={true}
          displayEmpty={true}
          fullWidth={true}
          required
          error={formik.touched.customerType && formik.errors.customerType}
          value={formik.values.customerType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled>בחר סוג לקוח</option>
          {customerTypes?.filter(type => type.customer_type_id !== 1).map((type, idx) => <option key={idx} value={type.customer_type_id} >{type.name}</option>)}
        </Select>
        <FormHelperText style={{ color: 'red' }} >         
          {formik.touched.customerType && formik.errors.customerType}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='customerName'>שם הלקוח:</label>
        <TextField type="text" id='customerName' name='customerName' required placeholder='שם תאגיד'
        error={formik.touched.customerName && formik.errors.customerName}
        fullWidth={true}
          value={formik.values.customerName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormHelperText style={{ color: 'red' }} >         
          {formik.touched.customerName && formik.errors.customerName}
        </FormHelperText>
      </fieldset>


      <fieldset>
        <label htmlFor='logoUrl'>לוגו :</label>
        <label htmlFor='logoUrl'
          style={{ justifySelf: "center" }}
          title='לחץ להעלאת לוגו'>
          {(formik.values.logoUrl) ?
            <img src={formik.values.logoUrl} className='clientLogo' alt='לוגו' /> :
            <div className='clientLogoPlaceHolder'>
              <FontAwesomeIcon icon={faCloudUpload} />
            </div>
          }
        </label>
        <input type="file" id='logoUrl' name='logoUrl' accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0], "customers", (url) => formik.setFieldValue("logoUrl", url))} >
        </input>
      </fieldset>

    </>
  )
}
