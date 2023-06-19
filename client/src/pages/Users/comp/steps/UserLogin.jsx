/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import { useState, useContext } from 'react'
import { TextField, FormHelperText, InputAdornment, IconButton, Input, Select } from '@material-ui/core';
import { MyContext } from '../../../../services/MyProvider'

import { Visibility, VisibilityOff } from '@material-ui/icons';


export default function UserLogin({ formik }) {
  const { profiles } = useContext(MyContext)


  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  return (
    <>

      <fieldset>
        <label
          htmlFor='profileId'>פרופיל משתמש: </label>
        <Select id='profileId' name='profileId'
          native={true}
          displayEmpty={true}
          fullWidth={true}
          required
          error={formik.touched.profileId && formik.errors.profileId}
          value={formik.values.profileId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}>
          <option value="" disabled>בחר פרופיל</option>
          {profiles?.map((profile, idx) => <option key={idx} value={profile.profile_id}>{profile.name}</option>)}
        </Select>
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.profileId && formik.errors.profileId}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='customerUserId'>משתמש חיצוני:</label>
        <TextField type="text" id='customerUserId' name='customerUserId' required placeholder='שם משתמש במערכות הלקוח'
          fullWidth={true}
          error={formik.touched.customerUserId && formik.errors.customerUserId}
          value={formik.values.customerUserId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />

        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.customerUserId && formik.errors.customerUserId}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='username'>שם המשתמש:</label>
        <TextField type="text" id='username' required placeholder='שם משתמש'
          autoComplete="new-user"
          fullWidth={true}
          error={formik.touched.username && formik.errors.username}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />

        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.username && formik.errors.username}
        </FormHelperText>
      </fieldset>

      <fieldset>
        <label htmlFor='password'>סיסמה:</label>
        <Input type={showPassword ? 'text' : 'password'} id='password' name='password' required
          placeholder='סיסמה'
          autoComplete="new-password"
          error={formik.touched.password && formik.errors.password}
          fullWidth={true}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(prev => !prev)}        >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.password && formik.errors.password}
        </FormHelperText>
      </fieldset>
      <fieldset>
        <label htmlFor='retypePassword'>אימות סיסמה:</label>
        <Input type={showRetypePassword ? 'text' : 'password'} id='retypePassword' name='retypePassword' required
          placeholder='חזור על הסיסמה'
          error={(formik.touched.retypePassword && formik.errors.retypePassword)}
          fullWidth={true}
          value={formik.values.retypePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowRetypePassword(prev => !prev)}        >
                {showRetypePassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>}

        />
        <FormHelperText style={{ color: 'red' }} >
          {formik.touched.retypePassword && formik.errors.retypePassword}
        </FormHelperText>
      </fieldset>

    </>
  )
}
