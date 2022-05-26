import './profile.scss';
import Accordion from './AccordionTabs1';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { fetchUser, userSelector } from '../profile/ProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

import pencil from './pencil_icon.svg';
import burger from './menu_burger.svg';

const items = [
    {
        title: 'Как это работает?',
        content:
            <><p>За покупку, совершенную в Интернет-магазине 12storeez, а также во всех розничных магазинах 12storeez, начисляются Бонусные баллы, из расчета 3 (Три) балла за каждые 100 (Сто) рублей от стоимости выкупленного товара, без учета стоимости доставки, после применения всех действующих скидок.</p><p>Бонусные баллы списываются из расчета 1 балл за 1 рубль. Пользователь вправе оплатить Бонусными баллами не более 50% (пятьдесят процентов) стоимости товара. Бонусная программа не распространяется на услуги по доставке товаров Пользователю. Оставшиеся 50% (пятьдесят процентов) стоимости онлайн заказа или покупки в розничных магазинах Пользователь оплачивает: в Интернет-магазине 12storeez любым доступным для региона способом оплаты (наличными или картой при получении курьеру, онлайн на сайте), в розничных магазинах – наличными или картой на кассе.</p><p>Бонусные баллы, накопленные Пользователем и не потраченные им в созданном онлайн заказе или покупке в розничных магазинах, остаются на его Бонусном счете.</p></>
    },
    {
        title: 'Что такое активные и неактивные бонусы?',
        content:
            <><p>Активные бонусы - это бонусные баллы, которые начислены за выкупленные вещи спустя 14 дней с момента доставки. Активные бонусы можно тратить на последующие заказы.</p><p>Неактивые бонусы - это бонусные баллы, которые заблокированы до истечения времени с момента оформления заказа до его выкупа (выкуп с учетом 14 дней с момента доставки заказа).</p></>
    },
    {
        title: 'Оплата бонусами',
        content:
            <p>Оплатить до 50% стоимость заказа возможно только активными бонусами. Чтобы воспользоваться бонусами введите количество бонусных баллов, которое хотите применить, в поле "Применить бонусные баллы" при оформлении заказа. (при условии, что у вас есть активные бонусы)</p>
    },
    {
        title: 'Сколько бонусов я получу за покупку?',
        content:
            <p>За каждые потраченные 100 рублей в заказе вам будет начислено 3 бонусных балла</p>
    }
];
const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { Mail, Password, Id } = cookies;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(Id));

        // eslint-disable-next-line
    }, []);


    const fetchedUser = useSelector(userSelector.selectAll);

    const { id, phone, home_adress, data_birth, size_of_clothes, size_of_shoes, bonus, orders, wishlist, basket } = fetchedUser;


    const handleRemoveCookie = () => {
        removeCookie('Mail');
        removeCookie('Password');
        removeCookie('Id');
        navigate("/login", { replace: true });
    }

    return fetchedUser.map(({ id, mail, password, phone, home_adress, data_birth, size_of_clothes, size_of_shoes, bonus, orders, wishlist, basket }) => {


        return (
            <div className='open-profile' key={id} >
                <div className='profile-head-background'>
                    <div className='profile-head'>
                        <div className='page-row'>
                            <div className='page-sidebar'>
                                <div className='page-sidebar-title'>Мой кабинет</div>
                                <div className='sidebar-categories'>
                                    <div className='sidebar-categories-item'>Профиль</div>
                                    <div className='sidebar-categories-item'>Мои заказы</div>
                                    <div className='sidebar-categories-item'>Мои подписки</div>
                                    <div className='sidebar-categories-item'>
                                        <Link to='/wishlist' className="no-text-decoration" style={{ color: 'white' }}>
                                            Wishlist
                                        </Link>
                                    </div>
                                    <div className='sidebar-categories-item' onClick={handleRemoveCookie}>Выход</div>
                                </div>
                            </div>
                            <ProfileMiddleSize mail={mail} phone={phone} home_adress={home_adress} data_birth={data_birth} size_of_clothes={size_of_clothes} size_of_shoes={size_of_shoes} />
                            <div className='middle'>
                                <div className='profile-head-title'>
                                    <div className="profile-edit-name">
                                        Покупатель
                                    </div>
                                    <Link to="/profile/edit" className="profile-head-edit no-text-decoration" style={{ color: 'white' }}>
                                        <img src={pencil} alt="" />
                                        <span className="profile-head-edit-text">редактировать профиль</span>
                                    </Link>
                                </div>
                                <div className='profile-head-box-wrapper'>
                                    <div className='profile-info-detail'>
                                        <div className='profile-info-detail-title'>
                                            Контактная информация
                                        </div>
                                        <div className='profile-info-detail-item'>
                                            {mail}
                                        </div>
                                        <div className='profile-info-detail-item'>
                                            {phone === '' ? 'не задан' : phone}
                                        </div>
                                    </div>
                                    <div className='profile-info-detail'>
                                        <div className='profile-info-detail-title'>
                                            Основной адрес доставки
                                        </div>
                                        <div className='profile-info-detail-item'>
                                            {home_adress === '' ? 'не задан' : home_adress}
                                        </div>
                                    </div>
                                    <div className='profile-info-detail'>
                                        <div className='profile-info-detail-title'>
                                            Дата рождения
                                        </div>
                                        <div className='profile-info-detail-item'>
                                            {data_birth === "" ? 'не задан' : data_birth}
                                        </div>
                                    </div>
                                    <div className='profile-info-detail'>
                                        <div className='profile-info-detail-title'>
                                            Размер одежды
                                        </div>
                                        <div className='profile-info-detail-item'>
                                            {size_of_clothes === '' ? 'не задан' : size_of_clothes}
                                        </div>
                                    </div>
                                    <div className='profile-info-detail'>
                                        <div className='profile-info-detail-title'>
                                            Размер обуви
                                        </div>
                                        <div className='profile-info-detail-item'>
                                            {size_of_shoes === '' ? 'не задан' : size_of_shoes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='profile-holder'>
                    <div className='page-row'>
                        <div className='page-middle'>
                            <div className='profile-orders-wrapper'>
                                <div className='profile-orders-head'>
                                    <div className='profile-orders-title'>
                                        Мои заказы
                                    </div>
                                    <div className='profile-more-orders-link'>
                                        Все заказы
                                    </div>
                                </div>
                                <div className='profile-orders accordion'>
                                    <div className='accordion-item'>
                                        <div className='accordion-head'>
                                            <div className='accordion-title'>
                                                № 1425263 от 10 февраля 2022 г.
                                                <div className='accordion-status'>
                                                    Заказ выполнен
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='profile-bonus'>
                                Бонусы
                                <div className='bonus-list-empty'>
                                    {bonus === "" ? 'У вас пока нет бонусов' : { bonus }}
                                </div>
                            </div>
                            <div className='bonus-faq'>
                                <div className='bonus-faq-list '>
                                    <div className="accordion">
                                        {items.map(({ title, content }, i) => (
                                            <Accordion title={title} content={content} key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    })

}
const ProfileMiddleSize = ({ mail, phone, home_adress, data_birth, size_of_clothes, size_of_shoes }) => {
    const [activeDataProfile, setActiveDataProfile] = useState(false);

    const handleOpenDataProfile = () => {
        setActiveDataProfile(!activeDataProfile);
    }

    return (
        <div className='middle-mid'>
            <div className='profile-head-title'>
                <div className="profile-edit-name">
                    Покупатель
                </div>
                <Link to="/profile/edit" className="profile-head-edit no-text-decoration" style={{ color: 'white' }}>
                    <img src={pencil} alt="" />
                </Link>
            </div>
            <div className="burger-section-mid" onClick={handleOpenDataProfile}>
                <img src={burger} alt="" />
            </div>
            {activeDataProfile ?
                <div className='profile-head-box-wrapper'>
                    <div className='profile-info-detail'>
                        <div className='profile-info-detail-item'>
                            {mail}
                        </div>
                        <div className='profile-info-detail-item'>
                            {phone === '' ? '' : phone}
                        </div>
                    </div>
                    <div className='profile-info-detail'>
                        <div className='profile-info-detail-item'>
                            {home_adress === '' ? '' : home_adress}
                        </div>
                    </div>
                    <div className='profile-info-detail'>
                        <div className='profile-info-detail-item'>
                            {data_birth === "" ? '' : data_birth}
                        </div>
                    </div>
                    <div className='profile-info-detail'>
                        <div className='profile-info-detail-item'>
                            {size_of_clothes === '' ? '' : size_of_clothes}
                        </div>
                    </div>
                    <div className='profile-info-detail'>
                        <div className='profile-info-detail-item'>
                            {size_of_shoes === '' ? '' : size_of_shoes}
                        </div>
                    </div>
                </div> : ''}
        </div>
    )

}
export default Profile;