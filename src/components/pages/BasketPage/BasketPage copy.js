import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useFormik, Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { userSelector, fetchUser, upDateDataUser, } from '../profile/ProfileSlice';
import { fetchClothesForWoman, clothesSelector } from '../womanClothes/shoesPage/ShoesSlice'
import Portal from '../../app/Portal';
import axios from 'axios';
import basket_delete from '../../../assets/basket/basket_delete.svg';
import arrowup from '../../../assets/store/up.svg';
import arrowdown from '../../../assets/store/down.svg';
import './basket.scss';




const BasketPage = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [isActive, setIsActive] = useState(false);
    const [mySize, setMySize] = useState("Размер");
    const [count, setCount] = useState(1);
    const [allSum, setSum] = useState('');
    const { Mail, Password, Id } = cookies;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchClothesForWoman());
        dispatch(fetchUser((Id)));
      
        // eslint-disable-next-line
    }, []);

    const fetchedUser = useSelector(userSelector.selectAll);
    const clothesItems = useSelector(clothesSelector.selectAll);

    const handleDeleteBasketItem = ({ id }) => () => {
        const newUserData = fetchedUser.map(({ basket, ...rest }) => {
            //const favitem = fetchedItem[0];
            const deleteItemData = fetchedUser[0].basket.filter((item => item.id === id));
            const newBasketlist = fetchedUser[0].basket.filter((item => item.id !== deleteItemData[0].id));
            basket = newBasketlist;
            const newArr = { basket, ...rest };
            return newArr;

        })

        const deleteWishlistUser = async () => {
            try {
                const resp = await axios.put(`http://localhost:3001/users/${Id}`, newUserData[0]);
                //console.log(resp.data);
            } catch (err) {
                // Handle Error Here 
                console.error(err);
            }
        };
        deleteWishlistUser();
        dispatch(upDateDataUser({ id: Id, changes: newUserData[0] }));
    }
    const handleSize = ({ scale }) => () => {
        setMySize(scale);
        setIsActive(!isActive);
    }

    const handleChange = (e) => {
        setIsActive(!isActive);
    }


    return fetchedUser.map(({ id, mail, password, phone, home_adress, data_birth, size_of_clothes, size_of_shoes, bonus, orders, wishlist, basket }) => {


        const renderBasketList = basket.map(({ id, modelId, article, price, name, color, pallete, size, img, description, proportions, composition }) => {

           
            const handleMinus = ({ id }) => () => {
                if (count < 2) return;
                setCount(count - 1);
                setSum(convertNumToStr);
            }
            const handlePlus = ({ id }) => () => {
                if (count >= chooseCountSizeToNumber) return;
                setSum(convertNumToStr);
                setCount(count + 1);
            }
//   const changeSumValue =  ({ convertNumToStr }) => () => {
//       setSum(convertNumToStr);
//     }

            const availableSize = size.filter((item) => item.quantity != null);
            //логика с количеством  одинаковых размеров
            const chooseSize = size.filter((item) => item.scale === mySize);
            const chooseCountSize = chooseSize.map(({ scale, quantity }) => {
                return quantity;
            });
            const chooseCountSizeToString = chooseCountSize.toLocaleString();
            const chooseCountSizeToNumber = Number(chooseCountSizeToString);
            // калькулятор единицы товара 
            let numberPrice = +price.split(' ').join('');
            const newPrice = numberPrice * count;
            const convertNumToStr = newPrice.toLocaleString();
            
           
       


            return (
                <div className="order-list-item" key={id}>
                    <div className="item-preview">
                        <img src={img[0]} className="item-img" />
                    </div>
                    <div className="item-info-box">
                        <div className="article-item">арт. {article}</div>
                        <div className="name-item">{name}</div>
                    </div>
                    <div className="color-item" style={{ backgroundColor: pallete }}></div>
                    <div className="choose-item-size">
                        <div className="catalog-filter select-container" >
                            <div className="filter-head"
                                onClick={handleChange}
                            >
                                <div className="catalog-filter-title">{mySize}</div>
                                <div className="catalog-filter-icon" >
                                    {isActive ? <img src={arrowup} alt="" /> : <img src={arrowdown} alt="" />}
                                </div>
                            </div>
                            {isActive && <div className="selectList">
                                {availableSize.map(({ scale, quantity }, i) => {
                                    return (
                                        <div className="selectList-item"
                                            key={i}
                                            onClick={handleSize({ scale })}
                                        >{scale}</div>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>
                    <div className="count-item">
                        <div className="catalog-filter select-container" >
                            <div className="filter-head" >
                                <div className="button-minus"
                                    onClick={handleMinus({ id })}
                                >
                                </div>
                                {count >= 1 ?
                                    <div className="count-number" >{count}</div>
                                    : <div className="count-number" >{count}</div>
                                }
                                <div className="button-plus"
                                    onClick={handlePlus({ id })} >
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="price-item" >{convertNumToStr} P</div>
                    <button className='button-delete'
                        onClick={handleDeleteBasketItem({ id })}
                    >
                        <img src={basket_delete} alt="" className='basket-delete' />
                    </button>
                </div>


            )
        })
        return (
           
            <div className="catalogPage">
                <div className="cart-body">
                    <div className="cart-left">
                        <h2>Корзина</h2>
                    </div>
                    <div className="cart-right">
                        <div className="basketList">
                            {renderBasketList}
                        </div>
                        <div className="order-block">
                            <div className="form-order">
                                <h3>Оформление заказа</h3>
                                <HandleOrderForm  allSum={allSum}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
           

        )
    })
}
const HandleOrderForm = ({allSum}) => {
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
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
                    .required('Обязельное поле'),
                password: Yup.string()
                    .matches(passwordRegExp, 'Пароль должен быть не менее 8 символов и содержать комбинацию цифр, латинских строчных и заглавных букв, а также символы.')
                    .required('Обязельное поле'),
                name: Yup.string()
                    .required('Обязельное поле'),
                surname: Yup.string()
                    .required('Обязельное поле'),
                phone_number: Yup.string()
                    .required('Обязельное поле'),
                country: Yup.string()
                    .required('Обязельное поле'),
                delivery_method: Yup.string()
                    .required('Обязельное поле'),
                street: Yup.string()
                    .required('Обязельное поле'),
                house: Yup.string()
                    .required('Обязельное поле'),
                number_flat_office: Yup.string()
                    .required('Обязельное поле'),
                comment_for_delivery: Yup.string()
                    .required('Обязельное поле'),
                pay_method: Yup.string()
                    .required('Обязельное поле'),
            })}
            onSubmit={registerHandler}

        >
            {(formik) => (
                <div className="form-popup-order" id="myFormOrder">
                    <form onSubmit={formik.handleSubmit} className="form-container-order">
                        <div className="data-order">
                            <div className="form-section">
                                <div className="form-item ">
                                    <label htmlFor="" className="form-item-title">E-mail</label>
                                    <input
                                        className="input-control"
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
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Имя</label>
                                    <input
                                        className="input-control"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Имя"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        {...formik.getFieldProps("name")} />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className='errors-formik'>{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Фамилия</label>
                                    <input
                                        className="input-control"
                                        id="surname"
                                        name="surname"
                                        type="text"
                                        placeholder="Фамилия"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.surname}
                                        {...formik.getFieldProps("surname")} />
                                    {formik.touched.surname && formik.errors.surname ? (
                                        <div className='errors-formik'>{formik.errors.surname}</div>
                                    ) : null}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Телефон</label>
                                    <input
                                        className="input-control"
                                        id="phone_number"
                                        name="phone_number"
                                        type="text"
                                        placeholder="Телефон"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone_number}
                                        {...formik.getFieldProps("phone_number")} />
                                    {formik.touched.phone_number && formik.errors.phone_number ? (
                                        <div className='errors-formik'>{formik.errors.phone_number}</div>
                                    ) : null}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Населенный пункт</label>
                                    <input
                                        className="input-control"
                                        id="country"
                                        name="country"
                                        type="text"
                                        placeholder="Населенный пункт"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                        {...formik.getFieldProps("country")} />
                                    {formik.touched.country && formik.errors.country ? (
                                        <div className='errors-formik'>{formik.errors.country}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Способ доставки</label>
                                    <input
                                        className="input-control"
                                        id="delivery_method"
                                        name="delivery_method"
                                        type="text"
                                        placeholder="Способ доставки"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.delivery_method}
                                        {...formik.getFieldProps("delivery_method")} />
                                    {formik.touched.delivery_method && formik.errors.delivery_method ? (
                                        <div className='errors-formik'>{formik.errors.delivery_method}</div>
                                    ) : null}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Улица</label>
                                    <input
                                        className="input-control"
                                        id="street"
                                        name="street"
                                        type="text"
                                        placeholder="Улица"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.street}
                                        {...formik.getFieldProps("street")} />
                                    {formik.touched.street && formik.errors.street ? (
                                        <div className='errors-formik'>{formik.errors.street}</div>
                                    ) : null}
                                </div>
                                <div className="form-item-unite d-flex">
                                    <div className="item-row">
                                        <label htmlFor="" className="form-item-title-row">Дом</label>
                                        <input
                                            className="input-control-row"
                                            id="house"
                                            name="house"
                                            type="text"
                                            placeholder="Дом"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.house}
                                            {...formik.getFieldProps("house")} />
                                        {formik.touched.house && formik.errors.house ? (
                                            <div className='errors-formik'>{formik.errors.house}</div>
                                        ) : null}
                                    </div>
                                    <div className="item-row">
                                        <label htmlFor="" className="form-item-title-row">Квартира/офис</label>
                                        <input
                                            className="input-control-row"
                                            id="number_flat_office"
                                            name="number_flat_office"
                                            type="text"
                                            placeholder="Квартира/офис"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.number_flat_office}
                                            {...formik.getFieldProps("number_flat_office")} />
                                        {formik.touched.number_flat_office && formik.errors.number_flat_office ? (
                                            <div className='errors-formik'>{formik.errors.number_flat_office}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title">Способ оплаты</label>
                                    <input
                                        className="input-control"
                                        id="pay_method"
                                        name="pay_method"
                                        type="text"
                                        placeholder="Способ оплаты"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.pay_method}
                                        {...formik.getFieldProps("pay_method")} />
                                    {formik.touched.pay_method && formik.errors.pay_method ? (
                                        <div className='errors-formik'>{formik.errors.pay_method}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-item">
                                    <label htmlFor="" className="form-item-title"> Комментарий для курьера</label>
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
                                        <div className='errors-formik'>{formik.errors.comment_for_delivery}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-container">
                            <div className="sidebar-fixed">
                                <div className="links">
                                    <div className="link-container">
                                        <a href='#' className="link-item">
                                            Условия доставки
                                        </a>
                                    </div>
                                    <div className="link-container">
                                        <a a href='#' className="link-item">
                                            Условия обмена и возврата
                                        </a>
                                    </div>
                                    <div className="link-container">
                                        <a a href='#' className="link-item">
                                            Информация об оплате
                                        </a>
                                    </div>
                                </div>
                                <div className="dostavka">Доставка: 0 Р</div>
                                <div className="sumOfOrder">
                                    Итого: {allSum}
                                </div>
                                <button type="submit" className="send-button">Далее</button>
                                <NavLink to="/registration" className="registration-link" ><p>Зарегистрироваться</p>
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </div>

            )}
        </Formik></>
    )
}
// const SelectFilterSize = ({ size }) => {
//     // const [selectFilter, setSelectFilter] = useState(null);
//     const [isActive, setIsActive] = useState(false);
//     const [mySize, setMySize] = useState("Размер");

//     const handleSize = ({ scale }) => () => {
//         setMySize(scale);
//         setIsActive(!isActive);
//     }

//     const handleChange = (e) => {
//         // setSelectFilter(e.target.id);
//         console.log(e.target);
//         setIsActive(!isActive);
//     }

//     const availableSize = size.filter((item) => item.quantity != null);

//     return (
//         <>
//             <div className="catalog-filter select-container" >
//                 <div className="filter-head"
//                     onClick={handleChange}
//                 >
//                     <div className="catalog-filter-title">{mySize}</div>
//                     <div className="catalog-filter-icon" >
//                         {isActive ? <img src={arrowup} alt="" /> : <img src={arrowdown} alt="" />}
//                     </div>
//                 </div>
//                 {isActive && <div className="selectList">
//                     {availableSize.map(({ scale, quantity }, i) => {
//                         return (
//                             <div className="selectList-item"
//                                 key={i}
//                                 onClick={handleSize({ scale })}
//                             >{scale}</div>
//                         )
//                     })}
//                 </div>}
//             </div>

//         </>
//     )}
// const SelectFilterCount = ({ size }) => {
//     const [count, setCount] = useState(1);
//     const handleMinus = (e) => {
//         setCount(count - 1);
//     }
//     const handlePlus = (e) => {
//         setCount(count + 1);
//     }
//     return (
//         <>
//             <div className="catalog-filter select-container" >
//                 <div className="filter-head" >
//                     <div className="button-minus"
//                         onClick={handleMinus}
//                     >
//                     </div>
//                     <div className="count-number" >{count}</div>
//                     <div className="button-plus"
//                         onClick={handlePlus} >
//                     </div>
//                 </div>
//             </div>

//         </>
//     )

// }
export default BasketPage;