import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './login-form.scss';
import axios from 'axios';
import { JSON_API } from '../../JsonPort';
import { useCookies } from 'react-cookie';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

// import { v4 as v4 } from 'uuid';
// import Profile from '../profile/Profile.js';



const OpenModalFailed = () => {

    return (
        <div className='thank-u open-modal-failed'>
            <p>Пароль введен не верно. Повторите попытку.</p>
        </div>

    )

}
const _transformPerson = (person) => {
    return {
        id: person.id,
        mail: person.mail,
        password: person.password
    }

}

const HandleLoginForm = () => {
    
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const [person, setPerson] = useState('');
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const registerHandler = async (values, { setSubmitting, resetForm }) => {
        
        const request = await axios.get(`${JSON_API}/users`)
        const personsArr = request.data.map(_transformPerson);
        const isLogin = personsArr.filter(person => person.mail === values.mail && person.password === values.password);
        // console.log(isLogin);
        if (isLogin.length === 0) {
            document.querySelector(".open-modal-failed").style.display = "block";
            setTimeout(() => {
                document.querySelector(".open-modal-failed").style.display = "none";
            }, 4000);
        }
        else if (isLogin) {
             // eslint-disable-next-line
            setCookie('Mail', isLogin[0].mail, { path: '/' });
             // eslint-disable-next-line
            setCookie('Password', isLogin[0].password, { path: '/' });
             // eslint-disable-next-line
            setCookie('Id', isLogin[0].id, { path: '/' });
            // document.querySelector(".open-profile").style.display = "block";
            navigate("/profile",  {replace: true})
        }
        // document.getElementById("myForm").style.display = "none";
        resetForm();
        navigate(0);
        
    };

    return (
        <><Formik
            initialValues={{
                mail: "",
                password: "",
            }}
            validationSchema={Yup.object({
                mail: Yup.string()
                    .email()
                    .required('Обязельное поле'),
                password: Yup.string()
                    .matches(passwordRegExp, 'Пароль должен быть не менее 8 символов и содержать комбинацию цифр, латинских строчных и заглавных букв, а также символы.')
                    .required('Обязельное поле'),
            })}
            onSubmit={registerHandler}

        >
            {(formik) => (
                <div className="form-popup" id="myForm">
                    <form onSubmit={formik.handleSubmit} className="form-container">
                        <h3>Вход</h3>
                        <input
                            id="mail"
                            name="mail"
                            type="text"
                            placeholder="E-mail"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mail}
                            {...formik.getFieldProps("mail")} />
                        {formik.touched.mail && formik.errors.mail ? (
                            <div className='errors-formik'>{formik.errors.mail}</div>
                        ) : null}

                        <input
                            id="password"
                            name="password"
                            type="text"
                            placeholder="Пароль"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            {...formik.getFieldProps("password")} />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='errors-formik'>{formik.errors.password}</div>
                        ) : null}

                        <button type="submit" className="send-button">Далее</button>
                        <NavLink to="/registration" className="registration-link" ><p>Зарегистрироваться</p>
                        </NavLink>
                    </form>
                </div>

            )}
        </Formik></>
    )
};

const LoginForm = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const { Mail, Password } = cookies;
    const [newUser, setNewUser] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        (Mail === undefined && Password === undefined) ? setNewUser(newUser)
            : setNewUser(!newUser)
    }, []);
    return (
        <div className="auth" >
            {newUser ? (<>
        <HandleLoginForm /> <OpenModalFailed />  </>
            ) : (
                navigate("/profile",  {replace: true})
                // <Profile />
            )}
        </div>

    )
};

export default LoginForm;
