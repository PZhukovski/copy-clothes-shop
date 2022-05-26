// import store from'../../store/index';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import './send-form.scss';

import axios from 'axios';
import { JSON_API } from '../../../JsonPort';
import React from 'react';
import { useFormik, Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { v4 as v4 } from 'uuid';
import {addUser} from '../../profile/ProfileSlice';
import Profile from '../../profile/Profile';



const OpenModalSuccess = () => {

    return (
        <div className='thank-u open-modal-success'>
            <p> Вы успешно зарегистрированы!</p>
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

const SignupForm = () => {

    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
   
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const registerHandler = async (values, { setSubmitting, resetForm }) => {
        
        const request = await axios.get(`${JSON_API}/users`);
        const personsArr = request.data.map(_transformPerson);
        const isOccupiedMail = personsArr.filter(person => person.mail === values.mail);
        const isFreeMail = personsArr.filter(person => person.mail !== values.mail);
        const userId = v4();
        const newContact = {
            id: userId,
            mail: values.mail,
            password: values.password,
            phone: "",
            home_adress: "",
            data_birth: "",
            size_of_clothes: "",
            size_of_shoes: "",
            bonus: "",
            orders: [],
            wishlist: [],
            basket: []
        }
        if (isOccupiedMail.length === 0) {
            try {
                const response = await axios.post(`${JSON_API}/users`, newContact)
                console.log(dispatch(addUser(newContact)))
                setCookie('Mail', values.mail, { path: '/' });
                setCookie('Password', values.password, { path: '/' });
                setCookie('Id', userId, { path: '/' });
                
                if (response.status === 201) {
                    document.getElementById("myForm").style.display = "none";
                    document.querySelector(".open-modal-success").style.display = "block";
                    setTimeout(() => {
                        document.querySelector(".open-modal-success").style.display = "none";
                    }, 4000);
                    
                }
                
            } catch (e) {
                console.log(e)
            } finally {
                setSubmitting(false)
            }
            navigate("/profile",  {replace: true})
        }
        else if (isOccupiedMail) {
            document.querySelector(".open-modal-failed").style.display = "block";
            setTimeout(() => {
                document.querySelector(".open-modal-failed").style.display = "none";
            }, 4000);
        }
        // document.getElementById("myForm").style.display = "none";
        resetForm();
        setTimeout(() => {
             navigate(0);
        }, 6000);
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
                        <h3>Регистрация</h3>
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
                        <NavLink to="/login" className="login-link" ><p>Уже зарегистрированы? Зайдите по логину и паролю </p>
                        </NavLink>
                    </form>
                </div>

            )}
        </Formik></>

    )
   
};

const SendForm = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const {Mail, Password} = cookies;
    const [newUser, setNewUser] = useState(true);
    const navigate = useNavigate();


const OpenModalFailed = () => {

    return (
        <NavLink to="/login" className="login-link" >
        <div className='thank-u open-modal-failed'>
                <p>Эта почта уже занята, попробуйте зайти через <b>личный кабинет</b></p>
        </div>
        </NavLink>

    )

}
    useEffect(() => { 
        
       (Mail === undefined && Password === undefined ) ? setNewUser(newUser)
        : setNewUser(!newUser)
         }, []); 
  return (
    
        <div className="auth" > 
        {newUser ? (
       <><SignupForm /> <OpenModalFailed/></>
       ) : (
        navigate("/profile",  {replace: true})
    //    <Profile />   
       )} 
        </div>
        
    )
};

export default SendForm;
