/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { faChevronLeft, faChevronRight, faCancel ,faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useMultistepForm } from '../../../services/useMultistepForm'
import { FormWrapper } from '../../../components/FormWraper/FormWrapper'
import Window from '../../../components/Window/Window'
import UserInfo from './steps/UserInfo';
import UserLogin from './steps/UserLogin';
import { useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object({
  firstName: yup.string('שם פרטי').required('שדה חובה'),
  lastName: yup.string('שם משפחה').required('שדה חובה'),
  email: yup.string('אימייל').email('תבנית מייל לא תקנית').required('שדה חובה'),
  phone: yup.string('טלפון').matches(/^[0-9]*[\-]?[0-9]*$/, "מספר טלפון לא תקין").required('שדה חובה'),
  profileId: yup.number('פרופיל משתמש').required('שדה חובה'),
  pictureUrl: yup.string('אווטאר'),
  customerUserId:yup.string('שם משתמש במערכת התאגיד'),
  username: yup.string('שם משתמש').matches(/^[A-Za-z][A-Za-z0-9_-]{0,}$/, 'אותיות וספרות בלועזית בלבד').required('שדה חובה'),
  password: yup.string('סיסמה').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/, 'אות גדולה ,אות קטנה ומספרים').min(8, 'מינימום 8 תווים').max(16, 'מקסימום 16 תווים').required('שדה חובה'),
  retypePassword: yup.string('חזרה על סיסמה').oneOf([yup.ref('password')], 'סיסמה שגויה').required('שדה חובה'),
});


export default function AddCustomer({ HandleAddData }) {
  //redirect on add /cancel
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      profileId: "",
      pictureUrl: "",
      customerUserId:"",
      username: "",
      password: "",
      retypePassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      HandleAddData(values);
    },
  })
  const { valid, steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      { title: 'פרטים אישיים', step: <UserInfo formik={formik} />, validate: [!(formik.touched.firstName|| formik.touched.lastName|| formik.touched.phone|| formik.touched.email),formik.errors.firstName, formik.errors.lastName, formik.errors.phone, formik.errors.email] },
      { title: 'התחברות', step: <UserLogin formik={formik} />, validate: [formik.errors.profileId, formik.errors.username, formik.errors.password, formik.errors.retypePassword] },
    ])




  const onSubmit = (e) => {
    e.preventDefault()
    if (!isLastStep) return next()
    formik.handleSubmit()
  }

  return (
    <Window title={`יצירת משתמש`} smallTitle={`שלב ${currentStepIndex + 1} מתוך ${steps.length}`}>
      <form onSubmit={onSubmit} noValidate={true} >
        <FormWrapper title={step.title}>
          {step.step}
        </FormWrapper>

        <div className='btnContainer'>
          {(!isFirstStep) && <button type='button' className='btn' onClick={back}><FontAwesomeIcon icon={faChevronRight} />&nbsp;הקודם</button>}
          {(isFirstStep) && <button className="btn" type="cancel"
            onClick={(e) => { e.preventDefault(); navigate("/Users") }}>ביטול&nbsp;
            <FontAwesomeIcon icon={faCancel} />
          </button>}
          <button className='btn' type='submit' disabled={!valid}>{isLastStep ? <>שמירה&nbsp;<FontAwesomeIcon icon={faFloppyDisk} /></> :
            <>הבא&nbsp;<FontAwesomeIcon icon={faChevronLeft} /></>}</button>
        </div>
      </form>
    </Window>
  )
}