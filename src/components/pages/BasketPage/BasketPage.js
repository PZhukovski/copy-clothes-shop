import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userSelector, fetchUser, upDateDataUser } from '../profile/ProfileSlice';
import { fetchClothesForWoman, clothesSelector, allClothes } from '../womanClothes/renderPage/ClothesSlice'
import BasketPageItem from '../BasketPageItem/BasketPageItem';

import './basket.scss';





const BasketPage = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [isActive, setIsActive] = useState(false);
    const [mySize, setMySize] = useState("Размер");
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(0);
    const [openOrderForm , setOpenOrderForm] = useState(false);
    const { Mail, Password, Id } = cookies;
    const dispatch = useDispatch();
    const fetchedUser = useSelector(userSelector.selectAll);
    const clothesItems = useSelector(allClothes);

    useEffect(() => {
        dispatch(fetchClothesForWoman());
        dispatch(fetchUser((Id)));

    }, []);

    const handleOpenOrderForm = () => {
        setOpenOrderForm(!openOrderForm);
    };

    const basketClothes = fetchedUser.map(({ basket, ...props }) => {
        return basket;
    });

    const one = basketClothes.map((element) => { return element });

    const renderbasketClothes = basketClothes[0];
    
    const sumTotal = fetchedUser.map(({ basket, ...props }) => {
        //console.log(basket);
        const basketPrice = basket.map(({ price, ...props }) => {
            return price;
        });
        if (basketPrice.length === 0){
            return '';
        }
     else { 
         return basketPrice.reduce(function (previousValue = 0, value) {
            return previousValue + value;
        });
    }
    });
   

    return (
        
        <div className="catalogPage">
            <div className="cart-body">
            
                <div className="cart-left">
                    <h2>Корзина</h2>
                </div>
                <div className="cart-right">
                {fetchedUser.map(({ basket, ...props }, i) => {
                const arrayForSort = [...basket];
                
                return (
                    arrayForSort.length === 0 ?
                    <h3 key={i}>Ваша корзина пока пуста </h3> 
                   :
                   <div key={i}>
                            <div className="basketList">
                                {arrayForSort.sort((a, b) => a.id - b.id).map((element, index ) => {
                                    let result = arrayForSort.length + 1;
                                    {index = index + 1}
                                    return (
                                        <div
                                            key={element.id}
                                            className='provaider-catalogBasket'
                                            style={{ zIndex: result - index }}
                                             >
                                    <BasketPageItem {...element} />
                            </div>
                            );
                            })}

                        </div>
                        <div className="order-block">
                                <div className="form-order">
                                    <div className="title-order">Оформление заказа</div>
                                    {<HandleOrderForm sumTotal={sumTotal} />}

                                </div>
                         </div>
                         <div className="order-block-middle">
                         {openOrderForm ?
                             <>
                             <div className="button-checkout" onClick={handleOpenOrderForm}>
                                 Оформить заказ
                             </div>
                             
                             <HandleOrderForm sumTotal={sumTotal} openOrderForm={openOrderForm} setOpenOrderForm={setOpenOrderForm} handleOpenOrderForm={handleOpenOrderForm} /></> 
                             : ''
                             }
                         </div>
                    </div>
    )})}
                </div>
                
            </div>
        </div>
        
    )
    //})
}
const HandleOrderForm = ({ sumTotal ,openOrderForm , setOpenOrderForm , handleOpenOrderForm}) => {
    // console.log(sumTotal);
    const sumTotalToString = sumTotal.toLocaleString();
    // const toStimgTotalSum = sumTotal.toString();
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/;

    const registerHandler = async (values, { setSubmitting, resetForm }) => {

        resetForm();
    };
    return (
        <><Formik
            initialValues={{
                mail: "",
                name: "",
                surname: "",
                phone_number: "",
                country: "",
                delivery_method: "",
                street: "",
                house: "",
                number_flat_office: "",
                comment_for_delivery: "",
                pay_method: "",
                password: "",

            }}
            validationSchema={Yup.object({
                mail: Yup.string()
                    .email()
                    .required('Это поле обязательно'),
                password: Yup.string()
                    .matches(passwordRegExp, 'Пароль должен быть не менее 8 символов и содержать комбинацию цифр, латинских строчных и заглавных букв, а также символы.')
                    .required('Это поле обязательно'),
                name: Yup.string()
                    .required('Это поле обязательно'),
                surname: Yup.string()
                    .required('Это поле обязательно'),
                phone_number: Yup.string()
                    .matches(phoneRegExp, 'Введите корректный номер телефона')
                    .required('Введите корректный номер телефона'),
                country: Yup.string()
                    .required('Это поле обязательно'),
                delivery_method: Yup.string()
                    .required('Это поле обязательно'),
                street: Yup.string()
                    .required('Это поле обязательно'),
                house: Yup.string()
                    .required('Это поле обязательно'),
                number_flat_office: Yup.string()
                    .required('Это поле обязательно'),
                comment_for_delivery: Yup.string()
                    .required('Это поле обязательно'),
                pay_method: Yup.string()
                    .required('Это поле обязательно'),
            })}
            onSubmit={registerHandler}

        >
            {(formik) => (
                <>
                <div className="section-order-info">
               <div className="form-popup-order-basket" id="myFormOrder">
               <div className="back-to-basket" onClick={handleOpenOrderForm}> Назад </div><h4 className='title-order-mid'> Оформление заказа</h4> 
                    <form onSubmit={formik.handleSubmit} className="form-container-order">
                        <div className="data-order">
                            <div className="form-section">
                                <div className="form-item ">
                                    <label htmlFor="" className="form-item-title">E-mail</label>
                                    <input
                                        className={formik.touched.mail && formik.errors.mail ? "input-error" : "input-control"}
                                        id="mail"
                                        name="mail"
                                        type="text"
                                        placeholder="E-mail"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.mail}
                                        {...formik.getFieldProps("mail")} />
                                    {formik.touched.mail && formik.errors.mail ? (
                                        <div className='errors-formik-order'>{formik.errors.mail}</div>
                                    ) : null}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Имя</label>
                                    <input
                                        className={formik.touched.name && formik.errors.name ? "input-error" : "input-control"}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Имя"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        {...formik.getFieldProps("name")} />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className='errors-formik-order'>{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Фамилия</label>
                                    <input
                                        className={formik.touched.surname && formik.errors.surname ? "input-error" : "input-control"}
                                        id="surname"
                                        name="surname"
                                        type="text"
                                        placeholder="Фамилия"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.surname}
                                        {...formik.getFieldProps("surname")} />
                                    {formik.touched.surname && formik.errors.surname ? (
                                        <div className='errors-formik-order'>{formik.errors.surname}</div>
                                    ) : null}
                                </div>
                                <div className="form-item">
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
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Населенный пункт</label>
                                    <input
                                        className={formik.touched.country && formik.errors.country ? "input-error" : "input-control"}
                                        id="country"
                                        name="country"
                                        type="text"
                                        placeholder="Населенный пункт"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                        {...formik.getFieldProps("country")} />
                                    {formik.touched.country && formik.errors.country ? (
                                        <div className='errors-formik-order'>{formik.errors.country}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title radio-title">Способ доставки</label>
                                    <div className="radio-group">
                                        <div className="radio">
                                            <input
                                                className="custom-radio"
                                                id="courier"
                                                name="custom-radio"
                                                type="radio"
                                                defaultChecked="checked"
                                                placeholder="Курьер-Бесплатно(1-4 рабочих дня)" />
                                            <label htmlFor="courier" className="radio-label"

                                            >Курьер-Бесплатно (1-4 рабочих дня)</label>
                                        </div>
                                        <div className="radio">
                                            <input
                                                className="custom-radio"
                                                id="boxberry"
                                                name="custom-radio"
                                                type="radio"
                                                placeholder="Пункт выдачи BoxBerry -190 Р (2-3 рабочих дня)" />
                                            <label htmlFor="boxberry" className="radio-label">Пункт выдачи BoxBerry -190 Р (2-3 рабочих дня)</label>
                                        </div>
                                        <div className="radio">
                                            <input
                                                className="custom-radio"
                                                id="pickup"
                                                name="custom-radio"
                                                type="radio"
                                                placeholder="Самовывоз из магазина - бесплатно (2-3 рабочих дня)" />
                                            <label htmlFor="pickup" className="radio-label">Самовывоз из магазина - бесплатно (2-3 рабочих дня)</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Улица</label>
                                    <input
                                        className={formik.touched.street && formik.errors.street ? "input-error" : "input-control"}
                                        id="street"
                                        name="street"
                                        type="text"
                                        placeholder="Улица"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.street}
                                        {...formik.getFieldProps("street")} />
                                    {formik.touched.street && formik.errors.street ? (
                                        <div className='errors-formik-order'>{formik.errors.street}</div>
                                    ) : null}
                                </div>
                                <div className="form-item-unite">
                                    <div className="item-row">
                                        <label htmlFor="" className="form-item-title-row">Дом</label>
                                        <input
                                            className={formik.touched.house && formik.errors.house ? "input-error-row" : "input-control-row"}
                                            id="house"
                                            name="house"
                                            type="text"
                                            placeholder="Дом"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.house}
                                            {...formik.getFieldProps("house")} />
                                        {formik.touched.house && formik.errors.house ? (
                                            <div className='errors-formik-order-row'>{formik.errors.house}</div>
                                        ) : null}
                                    </div>
                                    <div className="item-row">
                                        <label htmlFor="" className="form-item-title-row">Квартира/офис</label>
                                        <input
                                            className={formik.touched.number_flat_office && formik.errors.number_flat_office ? "input-error-row" : "input-control-row"}
                                            id="number_flat_office"
                                            name="number_flat_office"
                                            type="text"
                                            placeholder="Квартира/офис"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.number_flat_office}
                                            {...formik.getFieldProps("number_flat_office")} />
                                        {formik.touched.number_flat_office && formik.errors.number_flat_office ? (
                                            <div className='errors-formik-order-row'>{formik.errors.number_flat_office}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title title-pay">Способ оплаты</label>
                                    <div className="radio-group">
                                        <div className="radio">
                                            <input
                                                className="custom-radio"
                                                id="pay-online"
                                                name="pay-method"
                                                type="radio"
                                                defaultChecked="checked" />
                                            <label htmlFor="pay-online" className="radio-label"
                                            >Банковской картой</label>
                                        </div>
                                        <div className="radio">
                                            <input
                                                className="custom-radio"
                                                id="pay-cash"
                                                name="pay-method"
                                                type="radio" />
                                            <label htmlFor="pay-cash" className="radio-label">Наличными при получении</label>
                                        </div>
                                        <div className="radio">
                                            <input
                                                className="custom-radio"
                                                id="pay-by-card-after"
                                                name="pay-method"
                                                type="radio" />
                                            <label htmlFor="pay-by-card-after" className="radio-label">Банковской картой при получении</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title title-comment"> Комментарий для курьера</label>
                                    <textarea
                                        className="textarea-control"
                                        id="comment_for_delivery"
                                        name="comment_for_delivery"
                                        type="text"
                                        placeholder="Например, код домофона или номер подъезда"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.comment_for_delivery}
                                        {...formik.getFieldProps("comment_for_delivery:")} />
                                    {formik.touched.comment_for_delivery && formik.errors.comment_for_delivery ? (
                                        <div className='errors-formik-order'>{formik.errors.comment_for_delivery}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-container">
                            <div className="sidebar-fixed">
                                <div className="links">
                                    <div className="link-container">
                                        <a href="#" className="link-item">
                                            Условия доставки
                                        </a>
                                    </div>
                                    <div className="link-container">
                                        <a href="#" className="link-item">
                                            Условия обмена и возврата
                                        </a>
                                    </div>
                                    <div className="link-container">
                                        <a href="#" className="link-item">
                                            Информация об оплате
                                        </a>
                                    </div>
                                </div>
                                <div className="total">
                                    <div className="total-item">
                                        <div className="total-label">Доставка: </div>
                                        <div className="total-value"> 0 Р</div>
                                    </div>
                                    <div className="total-item">
                                        <div className="total-label"> Итого: </div>
                                        <div className="total-value">
                                            <h4>{sumTotalToString} P</h4>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="button primary">Оплатить заказ</button>
                                <div className="agreement">Нажимая на кнопку "оплатить заказ" я принимаю условия <u>публичной оферты</u> и <u>политики конфиденциальности</u></div>
                            </div>
                        </div>
                    </form>
                </div>
                </div></>

            )}
        </Formik></>
    )
}

export default BasketPage;

    
    

