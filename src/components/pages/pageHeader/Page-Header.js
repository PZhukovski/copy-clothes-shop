import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { userSelector, fetchUser } from '../../pages/profile/ProfileSlice';
import { CSSTransition } from 'react-transition-group';

import './page-header.scss';
import logo from '../../../assets/logo/12_storeez_logo.png';
import search from '../../../assets/header-icons/search.svg'
import basket from '../../../assets/header-icons/basket.svg';
import favorite from '../../../assets/header-icons/favorite.svg';
import profile from '../../../assets/header-icons/profile.svg';
import { v4 as v4 } from 'uuid';
import items from './items.js'
import arrow1 from './arrow1.svg';
import menuburger from './menu_burger.svg';
import cancel from '../../pages/EditProfile/cancel.svg';



const PageHeader = () => {

    const [active, setActive] = useState(null);
    const [cookies, setCookie] = useCookies(['user']);
    const [value, setValue] = useState('');
    const { Mail, Password, Id } = cookies;
    const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
    const [activeSearchMenu, setActiveSearchMenu] = useState(false);
    let navigate = useNavigate();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchUser((Id)));
        // eslint-disable-next-line
    }, []);

    const fetchedUser = useSelector(userSelector.selectAll);

    const wishList = fetchedUser.map(({ wishlist, ...rest }) => {
        let number = +wishlist.length;
        return number;
    })

    const basketCount = fetchedUser.map(({ basket, ...rest }) => {
        let number = +basket.length;
        return number;
    })

    const handleMouseEnter = (e) => {
        setActive(+e.target.dataset.index);
    };

    const handleMouseLeave = e => {
        setActive(null);
    };

    const onChangeInput = e => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/catalog/search", { state: value });
        setValue('');
    };
    const handleOpenBurgerMenu = () => {
        setActiveBurgerMenu(!activeBurgerMenu);
    };
    const handleOpenSearchMenu = () => {
        setActiveSearchMenu(!activeSearchMenu);
    };
    return (
        <header className="header" >
            <div className='header-frame d-flex justify-content-between'>
                <div className="headers-icons-left">
                    <div className="burger-menu" style={{ display: 'none' }}>
                        <div className="burger-section" onClick={handleOpenBurgerMenu}>
                            <img src={menuburger} alt="" />
                        </div>
                       
                        <CSSTransition
                            in={activeBurgerMenu}
                            timeout={500}
                            classNames="headers-links-modal-window"
                            unmountOnExit
                        >
                            <LinksModalWindow activeBurgerMenu={activeBurgerMenu} setActiveBurgerMenu={setActiveBurgerMenu} />
                        </CSSTransition>
                    </div>
                    <div className='search-logo-modal' style={{ display: 'none' }}>
                        <div className="search-section" onClick={handleOpenSearchMenu}>
                            <img src={search} alt="" />
                        </div>
                      
                        <CSSTransition
                            in={activeSearchMenu}
                            timeout={500}
                            classNames="search-modal-window"
                            unmountOnExit
                        >
                            <SearchModalWindow activeSearchMenu={activeSearchMenu} setActiveSearchMenu={setActiveSearchMenu} />
                        </CSSTransition>
                    </div>
                </div>
                <nav>
                    <div className="headers-links">
                        {items.map((n, i) => (
                            <div className={`header-link-main tablinks`}
                                onMouseEnter={handleMouseEnter}
                                onClick={handleMouseLeave}
                                data-index={i}
                                key={i}
                            >
                                <Link className="no-text-decoration" to={n.name}
                                > {n.title}</Link>
                            </div>
                        ))}
                    </div>

                    {/* {items[active] && <TabContent {...items[active]} />} */}
                </nav>

                <div className='logo'>
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="search">
                    <div className="field-main">
                        <div className="field-background">
                            <div className="field-container">
                                <div className='search-logo'>
                                    <img src={search} alt="" />
                                </div>
                                <div className="field-inner">
                                    <form onSubmit={handleSubmit} >
                                        <input
                                            value={value}
                                            id="search"
                                            className="field-placeholder"
                                            type="text"
                                            placeholder="Поиск"
                                            onChange={onChangeInput}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='header-icons'>
                    <NavLink to="/wishlist" className='header-icon'>
                        <div className='icon'>
                            <img src={favorite} alt="" />
                            {wishList > 0 ?
                                <div className='count-wishlist'>
                                    <div className='count'>
                                        {wishList}
                                    </div>
                                </div> : ''}
                        </div>
                    </NavLink>
                    <NavLink to="/basket" className='header-icon'>
                        <div className='icon'>
                            <img src={basket} alt="" />
                            {basketCount > 0 ?
                                <div className='count-wishlist'>
                                    <div className='count'>
                                        {basketCount}
                                    </div>
                                </div> : ''}
                        </div>
                    </NavLink>
                    <NavLink to="/registration" className='header-icon header-icon-profile'>
                        <div className='icon'>
                            <img src={profile} alt="" />
                        </div>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

const LinksModalWindow = ({ activeBurgerMenu, setActiveBurgerMenu }) => {

    const handleCloseFavoriteButton = (e) => {
        setActiveBurgerMenu(!activeBurgerMenu);
    }
    return (
        <div className="headers-links-modal-window" >
            <div className="headers-links-section">
                <div className="cancel-button-modal" onClick={handleCloseFavoriteButton}>
                    <img src={cancel} alt="cancel" />
                </div>
                {items.map((n, i) => (
                    <Accordion n={n} key={i} />
                ))}
                <div className="accordion-item">
                    <div className="link-to-profile-modal" onClick={handleCloseFavoriteButton}>
                        <Link to="/profile" className=" no-text-decoration">
                            Мои кабинет
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Accordion = ({ n }) => {
    const [isActive, setIsActive] = useState(false);

    const handleActiveAccordion = (e) => {
        setIsActive(!isActive);
    }
    return (
        <div className="accordion-item" >
            <div className="accordion-head d-flex " onClick={handleActiveAccordion}>
                <Link className="no-text-decoration" to={n.name} id={n.id}
                > {n.title}</Link>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="accordion-content-modal-window">
                <div className="accordion-content--item-modal-window">
                    {n.content.map((c, i) => (
                        <div key={i} className="item" >
                            <p>{c}</p>
                        </div>
                    ))}
                    {n.content2.map((c, i) => (
                        <div key={i} className="item" >
                            <p>{c}</p>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    );
};

const SearchModalWindow = ({ activeSearchMenu, setActiveSearchMenu }) => {
    const [value, setValue] = useState('');
    // const [isActive, setIsActive] = useState(false);
    let navigate = useNavigate();
    const handleCloseButton = (e) => {
        setActiveSearchMenu(!activeSearchMenu);
    }
    const onChangeInput = e => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/catalog/search", { state: value });
        setActiveSearchMenu(!activeSearchMenu);
        setValue('');
    };
    return (
        <div className="search-modal-window">
            <div className="search-section-modal-window">
                <div className="field-main-modal-window">
                    <div className="field-background">
                        <div className="field-container">
                            <div className='search-logo'>
                                <img src={search} alt="" />
                            </div>
                            <div className="field-inner">
                                <form onSubmit={handleSubmit} >
                                    <input
                                        value={value}
                                        id="search"
                                        className="field-placeholder"
                                        type="text"
                                        placeholder="Поиск"
                                        onChange={onChangeInput}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cancel-modal" onClick={handleCloseButton}>
                    Отменить
                </div>
            </div>
        </div>
    )
}


const TabContent = ({ id, content, content2 }) => (
    <div className="menu-tabs">
        <div className="tab">
            <div className="tab-holder">
                <div className="section">
                    <div className="tab-column">
                        {content.map((c, i) => (
                            <div key={v4()} className="item" data-index={i}>
                                <p>{c}</p>
                            </div>
                        ))}
                    </div>
                    <div className="tab-column">
                        {content2.map((c, i) => (
                            <div key={v4()} className="item" data-index={i}>
                                <p>{c}</p>
                            </div>
                        ))}
                    </div>
                    <div className="tab-column">
                        <div className="subscribe-label">Новости и style tips</div>
                        <div className="subscribe-form">
                            <div className="subscribe">
                                <div className="subscribe-form">
                                    <div className="subscibe-field">
                                        <div className='text-input-mail'>
                                            <input
                                                className='input-mail'
                                                type="text"
                                                placeholder='Введите эл. почту'
                                            />
                                        </div>
                                    </div>
                                    <div className="subscibe-button">
                                        <button
                                            className='button-mail'
                                            onClick=''>
                                            <img src={arrow1} alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="subscibe-note">
                            Подписываясь на рассылку , вы соглашаетесь <br /> с условиями политики конфиденциальности
                        </div>

                    </div>
                    <div className="tab-column">
                        <div className="rennab-content">
                            <div className="rennab-image">
                                <img src='/img-clothes/women/coats/12345.jpg' />
                            </div>
                            <div className="rennab-title">Новинки
                                <a href='#' className='tab-rennab'>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </div >
);


export default PageHeader;



