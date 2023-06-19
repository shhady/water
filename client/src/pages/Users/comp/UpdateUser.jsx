/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
 import React from 'react'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { useNavigate,useLocation } from "react-router-dom";
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
   pictureUrl: yup.string('אווטאר').nullable(),
   customerUserId:yup.string('שם משתמש במערכת התאגיד'),
   username: yup.string('שם משתמש').matches(/^[A-Za-z][A-Za-z0-9_-]{0,}$/, 'אותיות וספרות בלועזית בלבד').required('שדה חובה'),
   password: yup.string('סיסמה').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/, 'אות גדולה ,אות קטנה ומספרים').min(8, 'מינימום 8 תווים').max(16, 'מקסימום 16 תווים'),
   retypePassword:  yup.string('חזרה על סיסמה').when('password',{
          is: undefined,
          then: yup.string().notRequired(),
          otherwise: yup.string('חזרה על סיסמה').oneOf([yup.ref('password'),null], 'סיסמה שגויה').required('שדה חובה'),
   })
 });
 
 
 export default function UpdateUser({ HandleUpdateData }) {
   //redirect on add /cancel
   const navigate = useNavigate();

   const location = useLocation();

 
   const formik = useFormik({
     initialValues: {
       firstName: location.state.data.first_name,
       lastName: location.state.data.last_name,
       phone: location.state.data.phone,
       email: location.state.data.email,
       profileId: location.state.data.profile_id,
       pictureUrl: location.state.data.picture_url,
       customerUserId:location.state.data.customer_user_id,
       username: location.state.data.username,
       password: "",
       retypePassword: ""
     },
     validationSchema: validationSchema,
     onSubmit: (values) => {
      HandleUpdateData({...values,userId: location.state.data.user_id});
     },
   })
   const { valid, steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
     useMultistepForm([
       { title: 'פרטים אישיים', step: <UserInfo formik={formik} />, validate: [formik.errors.firstName, formik.errors.lastName, formik.errors.phone, formik.errors.email] },
       { title: 'התחברות', step: <UserLogin formik={formik} />, validate: [formik.errors.profileId, formik.errors.username, formik.errors.password, formik.errors.retypePassword] },
     ])
 
 
 
 
   const onSubmit = (e) => {
     e.preventDefault()
     if (!isLastStep) return next()
     formik.handleSubmit()
   }
 
   return (
     <Window title={`עדכון משתמש`} smallTitle={`שלב ${currentStepIndex + 1} מתוך ${steps.length}`}>
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