import './editprofile.scss';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { JSON_API } from '../../JsonPort';
import { useCookies } from 'react-cookie';
import { fetchUser, upDateDataUser, userSelector } from '../profile/ProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import cancel from './cancel.svg';


const EditProfile = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const { Mail, Password, Id } = cookies;
    // const [newUser, setNewUser] = useState(true);
    const [activeModal, setActiveModal] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(fetchUser(Id));
    }, []);

    const handleClose = (e) => {
        setActiveModal(!activeModal);
    }
    const OpenUpdateSuccess = () => {
        return (
            <div className='update-success open-modal-success' style={activeModal ? { display: 'block' } : { display: 'none' }}>
                <div className="cancel-button" onClick={handleClose}>
                    <img src={cancel} alt="cancel" />
                </div>
                <p>Личные данные изменены </p>
            </div>
        )
    }

    const fetchedUser = useSelector(userSelector.selectAll);
   
    const { id, phone, home_adress, data_birth, size_of_clothes, size_of_shoes, bonus, orders, wishlist, basket } = fetchedUser;

    return fetchedUser.map(({ id, ...props }) => {

        return (
            <div className='open-profile-edit' key={id} >
                <div className='profile-head-profile-edit'>
                    <div className='page-row-profile-edit'>
                        <div className='page-sidebar'>
                            <div className='page-sidebar-title'>Мой кабинет</div>
                            <div className='sidebar-categories-dark'>
                                <div className='sidebar-categories-item'>
                                    <Link to="/profile" className="no-text-decoration">
                                        Профиль
                                    </Link>
                                </div>
                                <div className='sidebar-categories-item'>Мои заказы</div>
                                <div className='sidebar-categories-item'>Мои подписки</div>
                                <div className='sidebar-categories-item'>
                                    <Link to='/wishlist' className="no-text-decoration">
                                        Wishlist
                                    </Link>
                                </div>
                                <div className='sidebar-categories-item'>Выход</div>
                            </div>
                        </div>
                        <div className="page-middle-profile-edit">
                            <div className="title-order-profile-edit">Личные данные
                            </div>
                            <HandleOrderForm props={props} activeModal={activeModal} setActiveModal={setActiveModal} />
                            <OpenUpdateSuccess />
                        </div>
                    </div>
                </div>
            </div>
        )
    })

}
const HandleOrderForm = ({ props, activeModal, setActiveModal }) => {
   
    const [cookies, setCookie] = useCookies(['']);
    const { Mail, Password, Id } = cookies;
    const dispatch = useDispatch();
    // const [activeFilter, setActiveFilter] = useState("не указан");
    // const [isActive, setIsActive] = useState(false);
    // const [selectFilter, setSelectFilter] = useState(null);

    useEffect(() => {
        dispatch(fetchUser(Id));
        // eslint-disable-next-line
    }, []);
    const { mail, phone, home_adress, data_birth, size_of_clothes, size_of_shoes, bonus, orders, wishlist, basket } = props;

    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/;

   
    const fetchedUser = useSelector(userSelector.selectAll);
  
    const registerHandler = async (values, { setSubmitting, resetForm }) => {

        const newUserData = fetchedUser.map(({ phone, data_birth, size_of_clothes, size_of_shoes, ...rest }) => {
            phone = values.phone_number;
            data_birth = values.birth;
            size_of_clothes = values.size_of_clothes;
            size_of_shoes = values.size_of_shoes;
            const newArr = { phone, data_birth, size_of_clothes, size_of_shoes, ...rest };
            return newArr;
        })
        try {
            const resp = await axios.put(`${JSON_API}/users/${Id}`, newUserData[0]);
            // console.log(resp.data);
        } catch (err) {
            // Handle Error Here 
            console.error(err);
        }
        dispatch(upDateDataUser({ id: Id, changes: newUserData[0] }));
        setActiveModal(!activeModal);
        resetForm();
    };

    return (
        <><Formik
            initialValues={{
                mail: mail,
                birth: data_birth,
                phone_number: phone,
                size_of_clothes: size_of_clothes,
                size_of_shoes: size_of_shoes,
                agreeCheckbox: false,

            }}
            validationSchema={Yup.object({
                mail: Yup.string()
                    .email()
                    .required('Это поле обязательно'),
                birth: Yup.string()
                    .nullable(true),
                phone_number: Yup.string()
                    .nullable(true)
                    .matches(phoneRegExp, 'Введите корректный номер телефона'),
                size_of_shoes: Yup.string()
                    .oneOf(
                        ["не указан", "37", "38", "39"],
                    ),
                size_of_clothes: Yup.string()
                    .oneOf(
                        ["не указан", "S", "M", "L"],
                    ),
                agreeCheckbox: Yup.boolean()
                    .oneOf([true], "Необходимо принять условия соглашения"),
            })}
            onSubmit={registerHandler}

        >
            {(formik) => (
                <div className="form-popup-order" id="myFormOrder">
                    <form onSubmit={formik.handleSubmit} className="form-container-order">
                        <div className="data-order-profile-edit">
                            <div className="form-section">
                                <div className="form-item-profile-edit">
                                    <label htmlFor="" className="form-item-title">E-mail</label>
                                    <input
                                        className="input-control"
                                        id="mail"
                                        name="mail"
                                        type="text"
                                        placeholder="E-mail"
                                        value={formik.values.mail}
                                        disabled="disabled"
                                    />
                                </div>
                                <div className="form-item-profile-edit">
                                    <label htmlFor="" className="form-item-title">Дата рождения</label>
                                    <input
                                        className={formik.touched.birth && formik.errors.birth ? "input-error" : "input-control"}
                                        id="birth"
                                        name="birth"
                                        type="text"
                                        placeholder="дд.мм.гггг"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.birth}
                                        {...formik.getFieldProps("birth")} />
                                    {formik.touched.birth && formik.errors.birth ? (
                                        <div className='errors-formik-order'>{formik.errors.birth}</div>
                                    ) : null}
                                </div>

                                <div className="form-item-profile-edit">
                                    <label htmlFor="" className="form-item-title">Телефон</label>
                                    <input
                                        className={formik.touched.phone_number && formik.errors.phone_number ? "input-error" : "input-control"}
                                        id="phone_number"
                                        name="phone_number"
                                        type="text"
                                        placeholder="Телефон"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone_number}
                                        {...formik.getFieldProps("phone_number")} />
                                    {formik.touched.phone_number && formik.errors.phone_number ? (
                                        <div className='errors-formik-order'>{formik.errors.phone_number}</div>
                                    ) : null}
                                </div>
                                <div className="form-item-profile-edit">
                                    <label htmlFor="size_of_clothes" className="form-item-title" >Размер одежды</label>
                                    <div className="form-field">
                                        <div className="select-block">
                                            <select className="select-field" name="size_of_clothes"
                                                onChange={formik.handleChange}
                                                defaultValue={size_of_clothes}
                                            >
                                                <option value=""> Не указан </option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item-profile-edit">
                                    <label htmlFor="size_of_shoes" className="form-item-title" >Размер обуви</label>
                                    <div className="form-field">
                                        <div className="select-block">
                                            <select className="select-field" name="size_of_shoes"
                                                onChange={formik.handleChange}
                                                defaultValue={size_of_shoes}
                                            >
                                                <option value=""> Не указан </option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-edit-confirm form-item-profile-edit">
                                    <div className="checkbox-edit">
                                        <input type="checkbox"
                                            id="agreeCheckbox"
                                            name="agreeCheckbox"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value="agreeCheckbox"
                                            className='checkbox-input'
                                            {...formik.getFieldProps("agreeCheckbox")} />
                                        <label htmlFor="agreeCheckbox" className="checkbox-label">
                                            <div className="checkbox-label-text">
                                                я соглашаюсь на обработку моих персональных данных и ознакомлен(а) с <u>условиями конфиденциальности</u>
                                            </div>
                                        </label>
                                    </div>
                                    {formik.touched.agreeCheckbox && formik.errors.agreeCheckbox ? (
                                        <div className='errors-formik-edit'>{formik.errors.agreeCheckbox}</div>
                                    ) : null}
                                </div>
                            </div>
                            <button type="submit" className="button primary">Сохранить изменения</button>
                        </div>
                    </form>
                </div >

            )}
        </Formik ></>
    )
}

export default EditProfile;


