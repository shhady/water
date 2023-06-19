import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import FatchDataApi from '../../services/FatchDataApi';
import { MyContext } from '../../services/MyProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {Box,Input,FormHelperText,FormControl} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object({

    email: yup
        .string('אימייל')
        .email('תבנית אימייל לא תקינה')
        .required('שדה חובה'),
    username: yup
        .string('שם משתמש')
        .matches(/^[A-Za-z][A-Za-z0-9_-]{0,}$/, 'אותיות וספרות בלועזית בלבד')
        .required('שדה חובה'),
});

const Forgot = () => {


    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const { setIsLoading } = useContext(MyContext);

    const formik = useFormik({
        initialValues: {
            email: "",
            username: localStorage.getItem('userName') ? localStorage.getItem('userName') : "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            send_Email(values);
        },


    })

    // this func handle the response from the server
    function HandleResponse(data) {
        if (data && data?.msg === 'user password successful reset') {
            setError(undefined)
            setMsg("שלחנו לך מייל עם סיסמה חדשה להתחברות למערכת")
        }
        setIsLoading(false)
        formik.setSubmitting(false)
    }

    // this function handle the reject from the server
    function HandleReject(error) {
        if ('msg' in error) switch (error.msg) {
            case ('subdomain not exsists'):
                setError('נתיב גישה לא קיים')
                break;
            case ('invalid username or email'):
                setError('שם משתמש או מייל שגויים')
                break;
            default:
                setError(error.msg)
        }
        else
            setError("חיבור לשרת נכשל")
        setIsLoading(false)
        formik.setSubmitting(false)
    }

    // this function is called on submit, the function call the FatchDataApi() to make a server request
    function send_Email(values) {
        setIsLoading(true);
        FatchDataApi('users/reset_password', 'POST', "", HandleResponse, {
            payload: values, onReject: HandleReject
        })
    }

    // this func checks the email format and change the helper text
    // of the email input according to validation of the email format


    // here we render the form
    return (

        <div className="canvas">
            <div className='window'>

                <header>
                    <h3 className="title">שחזור סיסמה</h3>
                </header>

                {/* the box is a instance of form from mui  */}
                <Box
                    component="form"
                    className="loginForm"

                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                    noValidate
                    onSubmit={formik.handleSubmit}
                >

                    <div style={{ width: "100%", margin: "20px", textAlign: 'center' }}>
                        <p>מה שם המשתמש והמייל שלך?</p>
                        <p>הקלד כדי שנשלח לך סיסמה חדשה למייל!</p>
                    </div>

                    {/* the FormControl from mui have the label and input and FormHelperText 
                    tag that have different text according to the validation of the input */}
                    <FormControl >

                        <label htmlFor="username">שם משתמש</label>

                        <Input
                            id="username"
                            type='text'
                            value={formik.values.username}
                            placeholder="username"
                            disabled={formik.isSubmitting}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                        />

                        <FormHelperText style={{ color: 'red' }}>{formik.touched.username && formik.errors.username}</FormHelperText>

                    </FormControl>

                    {/* the FormControl from mui have the label and input and FormHelperText 
                    tag that have different text according to the validation of the input */}
                    <FormControl >
                        <label htmlFor="email">מייל</label>

                        <Input
                            id="email"
                            type='email'
                            value={formik.values.email}
                            placeholder="email"
                            disabled={formik.isSubmitting}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                        />

                        <FormHelperText style={{ color: 'red' }}>{formik.touched.email && formik.errors.email}</FormHelperText>

                    </FormControl>

                    {/* this div have the submit button */}
                    <div>

                        <button
                            disabled={formik.errors?.username || formik.errors?.email || formik.isSubmitting}
                            style={{ width: '100%', justifyContent: "center" }}
                            className="btn"
                            type="submit"

                        >שלח סיסמה חדשה</button>

                    </div>

                    {/* this div have the message that shows to the user on submit */}
                    <div style={{ width: "100%", margin: "20px", textAlign: "center" }}>
                        {error ?
                            <p style={{ color: 'red' }}>{error}</p>
                            :
                            <p>{msg}</p>}
                    </div>

                </Box>

                <hr style={{ "margin": "20px" }} />

                {/* this div have a link to the login page */}
                <div style={{ margin: "20px" }}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <Link to="/login" > חזרה למסך ההתחברות </Link>
                </div>

            </div>
        </div>
    );
}

export default Forgot;