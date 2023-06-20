import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../../services/MyProvider';
import FatchDataApi from '../../services/FatchDataApi';
import usePageTitle from '../../services/usePageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './login.css';
import { Box, IconButton, Input, InputAdornment, FormControl, FormHelperText } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object({
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
});


const Login = () => {
    usePageTitle("התחברות");
    const { setUserInfo, setAccessToken, setIsLoading } = useContext(MyContext);
    const [msg, setMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [customerInfo, setCustomerInfo] = useState();
    const redirect = useNavigate();

    useEffect(() => {

        // stop loading Animation
        const handleResponse = (response) => {
            setIsLoading(false);
            if (response.customer)
             setCustomerInfo(response.customer)
        }
        FatchDataApi('customer', 'GET', '', handleResponse, { successCodes: [404, 200, 201] });
    }, [])


    const formik = useFormik({
        initialValues: {
            username: localStorage.getItem('userName') ? localStorage.getItem('userName') : "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            authenticate(values);
        },
    });



    // this function is called on submit, the function call validateLogin() function that checks username format
    // and then checks the format of the password, if both inputs are ok the function call the FatchDataApi()
    const authenticate = (values) => {

        // this func handle the response from the server
        function HandleResponse(data) {
            if (data.access_token) {
                localStorage.setItem('refreshToken', data.refresh_token);
                localStorage.setItem('userName', data.user_name);
                localStorage.setItem('tokenLifeSpan', data.token_life_span);
                setAccessToken(data.access_token);
                setUserInfo(data);
                setMsg("");
                redirect('/');
            }
            else
                setMsg(data.msg);

            setIsLoading(false);
            formik.setSubmitting(false);
        }

        // this function handle the reject from the server
        function HandleReject(error) {
            setMsg(error.msg ? error.msg : "חיבור לשרת נכשל")
            setIsLoading(false)
            formik.setSubmitting(false)
        }


        setIsLoading(true)
        FatchDataApi('login', 'POST', "", HandleResponse,
            {
                payload: values, onReject: HandleReject,
                successCodes: [401, 500, 200, 201]
            })

    }

    // this func toggle the state showPassword on clicking on the eye icon
    const togglePassword = () => {
        setShowPassword(state => !state)
    }


    // here we render the form
    return (
        <div className="canvas">
            <div className='window'>

                <header>
                    <h3 className="title">התחברות</h3>
                </header>
                {(customerInfo) &&
                    <h2 style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginTop: '1rem', gap: '0.5rem' }}>
                        {(customerInfo.logo_url) && <img style={{ maxHeight: '100px', maxWidth: '150px' }} src={customerInfo.logo_url} alt={customerInfo.customer_name} />}
                        {customerInfo.customer_name}
                    </h2>
                }

                {/* the box is a instance of form from mui  */}
                <Box
                    component="form"
                    className="loginForm"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                    noValidate
                    autoComplete="on"
                    onSubmit={formik.handleSubmit}>

                    {/* the FormControl from mui have the label and input and FormHelperText 
                tag that have different text according to the validation of the input */}
                    <FormControl
                        disabled={formik.isSubmitting}
                    >
                        <label style={{ marginTop: "40px" }} htmlFor="username">שם משתמש</label>
                        <Input

                            id='username'
                            title='שם משתמש'
                            type='text'
                            value={formik.values.username}
                            placeholder="שם משתמש"
                            autoComplete="current-user"
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText style={{ color: 'red' }} >
                            {formik.touched.username && formik.errors.username}
                        </FormHelperText>

                    </FormControl>

                    {/* the FormControl from mui have the label and input and FormHelperText 
                tag that have different text according to the validation of the input */}
                    <FormControl
                        disabled={formik.isSubmitting}
                    >

                        <label style={{ fontSize: "20px" }} htmlFor="password">סיסמה</label>

                        <Input
                            id='password'
                            name='password'
                            title='סיסמה'
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            placeholder="סיסמה"
                            autoComplete="current-password"
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePassword}        >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        <FormHelperText style={{ color: 'red' }} >
                            {formik.touched.password && formik.errors.password}
                        </FormHelperText>

                    </FormControl>

                    {/* this div have the submit button */}
                    <div>
                        <button
                            disabled={formik.errors?.username || formik.errors?.password || formik.isSubmitting}
                            style={{
                                marginTop: "30px",
                                justifyContent: "center",
                                marginInlineEnd: "0",
                                width: "100%"
                            }} type="submit"
                            className="btn"
                        >כניסה&nbsp;
                            <FontAwesomeIcon icon={faRightToBracket} style={{ "transform": "rotateY(180deg)" }} />
                        </button>
                    </div>


                    {/* this div have the message that shows to the user on submit */}
                    <div style={{ color: "red", textAlign: "center" }}>
                        {msg &&
                            <span >{msg}
                            </span>}
                    </div>

                    <hr style={{ margin: "20px" }} />

                    {/* this div have a link to the forgot password page */}
                    <div className="linked-text" style={{
                        marginTop: "10px", "display": "flex", flexDirection: "column",
                        alignItems: "flex-start", gap: "5px", fontSize: "20px", marginBottom: "20px"
                    }}>

                        <Link style={{
                            marginRight: "50px",
                            width: "100%"
                        }}
                            to="/forgot">שכחת את הסיסמה?</Link>

                    </div>

                </Box>

            </div>
        </div>

    );
}

export default Login;