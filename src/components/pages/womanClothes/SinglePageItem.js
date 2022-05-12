import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { fetchClothesForWoman, clothesSelector } from './renderPage/ShoesSlice';
import { fetchUser, upDateDataUser, userSelector } from '../../../components/pages/profile/ProfileSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { JSON_API } from '../../JsonPort';
import arrowleft from './renderPage/arrow-left.svg';
import favorite from '../../../assets/header-icons/favorite.svg';
import favoritePush from '../../../assets/header-icons/favourite-push.svg'
import cancel from '../EditProfile/cancel.svg';
import Accordion from './AccordionTabs2';
import './singlepageitem.scss';
import history from "history/browser";


const SinglePageItem = () => {
    const { id } = useParams();
    // let location = useLocation();
    // let navigate = useNavigate();
    let historyLocation = history.location;
    const [cookies, setCookie] = useCookies(['user']);
    const [active, setActive] = useState(null);
    const [activeModal, setActiveModal] = useState(false);
    const [failedBasketModal, setfailedBasketModal] = useState(false);
    const [buttonWishlist, setButtonWishlist] = useState('');
    const { Mail, Password, Id } = cookies;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchClothesForWoman());
        dispatch(fetchUser((Id)));
    }, []);


    const fetchedUser = useSelector(userSelector.selectAll);
    const clothesItems = useSelector(clothesSelector.selectAll);
    const items = useSelector(clothesSelector.selectAll);
    const fetchedItem = items.filter(item => item.id === id);


    const handleChange = (e) => {
        setActive(+e.currentTarget.dataset.index);
    };
    const handleCloseFavoriteButton = (e) => {
        setActiveModal(!activeModal);
    }
    const handleCloseBasketButton = (e) => {
        setfailedBasketModal(!failedBasketModal);
    }
    const FailedLogin = () => {
        return (
            <div className='update-success open-modal-success' style={activeModal ? { display: 'block' } : { display: 'none' }}>
                <div className="cancel-button" onClick={handleCloseFavoriteButton}>
                    <img src={cancel} alt="cancel" />
                </div>
                <p>Вам нужно войти в личный кабинет </p>
            </div>
        )
    }

    const OccupiedBasketFail = () => {
        return (
            <div className='update-success open-modal-success' style={failedBasketModal ? { display: 'block' } : { display: 'none' }}>
                <div className="cancel-button" onClick={handleCloseBasketButton}>
                    <img src={cancel} alt="cancel" />
                </div>
                <p>Вы уже добавили этот товар в корзину </p>
            </div>
        )
    }


    const handleFavorite = (article) => {
        if (fetchedUser.length === 0) {
            setActiveModal(!activeModal);
        }
        else if (includedFavoriteArticle[0].length !== 0) {
            const newUserData = fetchedUser.map(({ wishlist, ...rest }) => {
                //const favitem = fetchedItem[0];
                const deleteItemData = fetchedUser[0].wishlist.filter((item => item.article === article));
                const newWishlist = fetchedUser[0].wishlist.filter((item => item.article !== deleteItemData[0].article));
                wishlist = newWishlist;
                const newArr = { wishlist, ...rest };
                return newArr;
            })
            const deleteWishlistUser = async () => {
                try {
                    const resp = await axios.put(`${JSON_API}/users/${Id}`, newUserData[0]);
                    //console.log(resp.data);
                } catch (err) {
                    // Handle Error Here 
                    console.error(err);
                }
            };
            deleteWishlistUser();
            dispatch(upDateDataUser({ id: Id, changes: newUserData[0] }));
            setButtonWishlist('');

        }
        else if (includedFavoriteArticle[0].length === 0) {
            const newUserData = fetchedUser.map(({ wishlist, ...rest }) => {
                const favitem = fetchedItem[0];
                const newWishlist = [favitem, ...wishlist]
                wishlist = newWishlist;
                const newArr = { wishlist, ...rest };
                return newArr;

            })
            const sendPutUser = async () => {
                try {
                    const resp = await axios.put(`${JSON_API}/users/${Id}`, newUserData[0]);
                    //console.log(resp.data);
                } catch (err) {
                    // Handle Error Here 
                    console.error(err);
                }
            };
            sendPutUser();
            dispatch(upDateDataUser({ id: Id, changes: newUserData[0] }));
            setButtonWishlist(fetchedItem[0].article);
        }
    }
   
    const handleBasket = ({ id }) => () => {
        if (fetchedUser.length === 0) {
            setActiveModal(!activeModal);
        }
        else if (includeBasketArticle[0].length === 0) {

            const newUserData = fetchedUser.map(({ basket, ...rest }) => {
                const fetchedItem = clothesItems.filter(item => item.id === id);
                const buyItem = fetchedItem[0];
                const newBasketlist = [buyItem, ...basket]
                basket = newBasketlist;
                const newArr = { basket, ...rest };
                return newArr;

            })
            const sendPutUser = async () => {
                try {
                    const resp = await axios.put(`${JSON_API}/users/${Id}`, newUserData[0]);
                    //console.log(resp.data);
                } catch (err) {
                    // Handle Error Here 
                    console.error(err);
                }
            };
            sendPutUser();
            dispatch(upDateDataUser({ id: Id, changes: newUserData[0] }));
        }
        else if (includeBasketArticle[0].length !== 0) {
            setfailedBasketModal(!failedBasketModal);
        }

    }

    const includeBasketArticle = fetchedUser.map(({ basket, ...rest }) => {
        return basket.filter((unit) => {
            const fetchedItem = items.filter(item => item.id === id);
            if (fetchedItem.length > 0) {
                return unit.article === fetchedItem[0].article;
            }
        })
    });

    const includedFavoriteArticle = fetchedUser.map(({ wishlist, ...rest }) => {
        return wishlist.filter((unit) => {
            const fetchedItem = items.filter(item => item.id === id);
            if (fetchedItem.length > 0) {
                return unit.article === fetchedItem[0].article;
            }
        })
    });

    return fetchedItem.map(({ modelId, article, price, name, path, color, pallete, size, img, description, proportions, composition }) => {

        const priceToString = price.toLocaleString();

        const colors = items.filter((item => item.modelId === modelId));
        const renderColor = colors.map((item, i) => {
            return (
                <Link to={`/catalog/womancollection/${path}/${item.id}`} key={i}>
                    <div className={item.pallete === pallete ? "card-color__color card-color__color-active" : "card-color__color"} >
                        <div className="product-card-color" style={{ backgroundColor: item.pallete }}></div>
                    </div>
                </Link>
            )
        })
        
        const renderButtonWishlist = fetchedUser.map(({ wishlist, ...rest }, i) => {
            if (includedFavoriteArticle.length === 0 || includedFavoriteArticle[0].length === 0) {
                // setButtonWishlist('');
                return (<img key={i} src={favorite} alt="wishlist" />)
            }
            else {
                return (<img key={i} src={favoritePush} alt="wishlist" />)
            };
        })
    
        const details = [
            {
                title: 'Наличие в магазинах',
                content: 'Everywhere'
            },
            {
                title: 'Обмеры и описание',
                content: proportions
            },
            {
                title: 'Состав и уход',
                content: description
            },
            {
                title: 'Отзывы',
                content: 'Everywhere'
            }
        ];
        return (
            <div className="card" key={article}>
                <div className="card-holder">
                    <div className="singlepage-sidebar">
                        <Link to={historyLocation.pathname} className="no-text-decoration">
                            <img src={arrowleft} alt="" />
                            Назад
                        </Link>
                    </div>
                    <div className="page-content">
                        <div className="card-row">
                            <div className="card-view">
                                <div className="inner-wrapper-sticky">
                                    <div className="card-media-thumbs">
                                        {img.map((item, i) => (
                                            <a href={`#${i}`} className={`card-media-thumbs-item ${i === active ? 'active' : ''}`}
                                                onClick={handleChange}
                                                data-index={i}
                                                tabIndex='0'
                                                key={i}
                                            >
                                                <img src={item} alt={name} className="card-media-thumbs-image" style={{ width: '58px' }} />
                                            </a>
                                        ))}
                                    </div>
                                    <div className="card-media-list-wrapper swiper-container">
                                        <div className="media-card-list-scroll swiper-wrapper"
                                        >
                                            {img.map((item, i) => (
                                                <div className={`swiper-slide card-media-item ${i === active ? 'show' : ''}`}
                                                    data-index={i}
                                                    id={i}
                                                    key={i}
                                                >
                                                    {i === active ? <img src={item} alt={name} className="card-media-thumbs-image show"
                                                        data-index={i}
                                                        // style={{ height: '722px' }} 
                                                        /> :
                                                        <img src={item} alt={name} className="card-media-thumbs-image"
                                                            data-index={i}
                                                            // style={{ height: '722px' }} 
                                                            />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-description">
                                <div className="card-description-holder">
                                    <div className="card-info">
                                        <h1 className="card-info-title">
                                            {name}
                                        </h1>
                                        <div className="card-price">{priceToString} P</div>
                                    </div>
                                    <div className="card-colors-wrapper">
                                        <div className="card-colors">
                                            {renderColor}
                                        </div>
                                        <div className="card-colors-title">Цвет: {color}</div>
                                    </div>
                                    <div className="product-controls-row">
                                        <div className="button-cart">
                                            <div className="button-cart-title"
                                                onClick={handleBasket({ id })}
                                            >В  корзину </div>
                                        </div>
                                        <button className="card-product-favorite"
                                            onClick={() => handleFavorite(article)}
                                        >
                                            {renderButtonWishlist.length === 0 ? <img src={favorite} alt="wishlist" /> : renderButtonWishlist }
                                        </button>
                                    </div>
                                    <div className="product-details">
                                        <h3>Детали</h3>
                                        <p>Артикул: {article}</p>
                                        <p>{composition}</p>
                                        <p>Параметры модели: 178/81/56/90</p>
                                        <p>На модели размер S</p>
                                    </div>
                                    <div className="product-details-more">
                                        <div className="product-details-more-title">
                                            Подробности
                                        </div>
                                        <div className="accordion">
                                            {details.map(({ title, content }, i) => (
                                                <Accordion title={title} content={content} key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <FailedLogin />
                    <OccupiedBasketFail />
                </div>
            </div>
        )
    })
}
export default SinglePageItem;
