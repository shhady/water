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
import CustomerAdress from './steps/CustomerAdress'
import CustomerContact from './steps/CustomerContact'
import CustomerInfo from './steps/CustomerInfo'
import CustomerLogin from './steps/CustomerLogin'
import Window from '../../../components/Window/Window'


import { useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object({
  customerName: yup.string('שם לקוח').required('שדה חובה'),
  customerType: yup.number('סוג לקוח').required('שדה חובה'),
  subDomain: yup.string('נתיב גישה').matches(/^[A-Za-z0-9][A-Za-z0-9_-]{0,}$/, 'אותיות וספרות בלועזית בלבד').required('שדה חובה'),
  logoUrl: yup.string('לוגו תאגיד'),

  city: yup.string('עיר').required('שדה חובה'),
  street: yup.string('רחוב').required('שדה חובה'),
  number: yup.number('מספר').required('שדה חובה'),
  contactLandLine: yup.string('טלפון קווי').matches(/^[0-9]*[\-]?[0-9]*$/, "מספר טלפון לא תקין").required('שדה חובה'),
  lat: yup.number('קורדינטת אורך').required('שדה חובה'),
  lng: yup.number('קורדינטת רוחב').required('שדה חובה'),

  firstName: yup.string('שם פרטי').required('שדה חובה'),
  lastName: yup.string('שם משפחה').required('שדה חובה'),
  contactPhone: yup.string('טלפון').matches(/^[0-9]*[\-]?[0-9]*$/, "מספר טלפון לא תקין").required('שדה חובה'),
  contactEmail: yup.string('אימייל').email('תבנית מייל לא תקנית').required('שדה חובה'),


  username: yup
    .string('שם משתמש')
    .matches(/^[A-Za-z][A-Za-z0-9_-]{0,}$/, 'אותיות וספרות בלועזית בלבד')
    .required('שדה חובה'),
  password: yup
    .string('סיסמה')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/, 'אות גדולה ,אות קטנה ומספרים')
    .min(8, 'מינימום 8 תווים')
    .max(16, 'מקסימום 16 תווים')
    .required('שדה חובה'),
  retypePassword: yup
    .string('חזרה על סיסמה')
    .oneOf([yup.ref('password')], 'סיסמה שגויה')

    .required('שדה חובה'),
});


export default function AddCustomer({ HandleAddData }) {
  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerType: "",
      subDomain: "",
      logoUrl: "",
      city: "",
      street: "",
      number: "",
      lat: "",
      lng: "",
      firstName: "",
      lastName: "",
      contactLandLine: "",
      contactPhone: "",
      contactEmail: "",
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
      { title: 'פרטי לקוח', step: <CustomerInfo formik={formik} />, validate: [!(formik.touched.customerName || formik.touched.customerType), formik.errors.customerName, formik.errors.customerType] },
      { title: 'כתובת', step: <CustomerAdress formik={formik} />, validate: [formik.errors.contactLandLine, formik.errors.city, formik.errors.street, formik.errors.number, formik.errors.lat, formik.errors.lng] },
      { title: 'איש קשר', step: <CustomerContact formik={formik} />, validate: [formik.errors.firstName, formik.errors.lastName, formik.errors.contactPhone, formik.errors.contactEmail] },
      { title: 'התחברות', step: <CustomerLogin formik={formik} />, validate: [formik.errors.subDomain, formik.errors.username, formik.errors.password, formik.errors.retypePassword] },
    ])

  //redirect on add /cancel
  const navigate = useNavigate();



  const onSubmit = (e) => {
    e.preventDefault()
    if (!isLastStep) return next()
    formik.handleSubmit()
  }

  return (
    <Window title={`יצירת לקוח`} smallTitle={`שלב ${currentStepIndex + 1} מתוך ${steps.length}`}>
      <form onSubmit={onSubmit} noValidate={true} >
        <FormWrapper title={step.title}>
          {step.step}
        </FormWrapper>

        <div className='btnContainer'>
          
          {(!isFirstStep) && <button type='button' className='btn' onClick={back}><FontAwesomeIcon icon={faChevronRight} />&nbsp;הקודם</button>}
          {(isFirstStep) && <button className="btn" type="cancel"
            onClick={(e) => { e.preventDefault(); navigate("/Customers") }}>ביטול&nbsp;
            <FontAwesomeIcon icon={faCancel} />
          </button>}
          <button className='btn' type='submit' disabled={!valid}>{isLastStep ? <>שמירה&nbsp;<FontAwesomeIcon icon={faFloppyDisk} /></> :
            <>הבא&nbsp;<FontAwesomeIcon icon={faChevronLeft} /></>}</button>
        </div>
      </form>
    </Window>
  )
}