/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import { useState } from 'react'
import { TextField, FormHelperText, InputAdornment, IconButton, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function CustomerLogin({ formik }) {

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);




  return (
    <>
      <fieldset>
        <label htmlFor='subDomain'>נתיב כניסה :</label>
        <TextField dir='ltr' type="text" id='subDomain' name='subDomain'
          required
          fullWidth={true}
          error={formik.touched.subDomain && formik.errors.subDomain}
          value={formik.values.subDomain}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <FormHelperText style={{ color: (formik.touched.subDomain && formik.errors.subDomain) ? 'red' : 'var(--textActiveColor)' }} >
          {formik.touched.subDomain && formik.errors.subDomain}
          {!(formik.touched.subDomain && formik.errors.subDomain) && formik.values.subDomain && window.location.protocol + "//" + window.location.host.replace(window.location.host.split(".")[0], formik.values.subDomain)}
        </FormHelperText>


      </fieldset>
      <fieldset>
        <label htmlFor='username'>שם המשתמש:</label>
        <TextField type="text" id='username' name='username' required placeholder='שם משתמש'
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
