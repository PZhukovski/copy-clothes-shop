import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useCookies } from 'react-cookie';
import { userSelector, fetchUser, upDateDataUser, } from '../profile/ProfileSlice';
import { fetchClothesForWoman, clothesSelector } from '../womanClothes/renderPage/ShoesSlice'
import axios from 'axios';
import basket_delete from '../../../assets/basket/basket_delete.svg';
import arrowup from '../../../assets/store/up.svg';
import arrowdown from '../../../assets/store/down.svg';
import burger from './menu_burger.svg';
//import './basket.scss';


const BasketPageItem = ({ id, modelId, article, price, name, color, pallete, size, img, description, proportions, composition }) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [isActive, setIsActive] = useState(false);
    const [mySize, setMySize] = useState("Размер");
    const [count, setCount] = useState(1);
    const [activeDataProfile, setActiveDataProfile] = useState(false);
    // const [sum, setSum] = useState('');
    const { Mail, Password, Id } = cookies;
    let location = useLocation();
    let navigate = useNavigate();
    let currentPath = location.pathname;

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchClothesForWoman());
        dispatch(fetchUser((Id)));
    }, []);

    const handleOpenDataProfile = () => {
        setActiveDataProfile(!activeDataProfile);
    }

    const fetchedUser = useSelector(userSelector.selectAll);
    const clothesItems = useSelector(clothesSelector.selectAll);
    const basketClothes = fetchedUser.map(({ basket, ...props }) => {
        return basket;
    });


    const handleDeleteBasketItem = ({ id }) => () => {
        const newUserData = fetchedUser.map(({ basket, ...rest }) => {
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

    const handleMinus = ({ id }) => () => {
        if (count < 2) return;
        setCount(count - 1);
        const newUserData = fetchedUser.map(({ basket, ...rest }) => {
            const itemPriceId = clothesItems.filter((item => item.id === id));
            const itemPrice = itemPriceId[0].price;
            const itemId = fetchedUser[0].basket.filter((item => item.id === id));
            const elseId = fetchedUser[0].basket.filter((item => item.id !== id));
            const changeData = itemId.map(({ price, ...props }) => {
                let newPrice = itemPrice * (count - 1);
                price = newPrice;
                const newItemId = { price, ...props }
                return newItemId;
            });
            basket = [...elseId, ...changeData];
            const newArr = { basket, ...rest };
            return newArr;

        })
        //console.log(newUserData);
        const changeBasketPriceUser = async () => {
            try {
                const resp = await axios.put(`http://localhost:3001/users/${Id}`, newUserData[0]);
                //console.log(resp.data);
            } catch (err) {
                // Handle Error Here 
                console.error(err);
            }
        };
        changeBasketPriceUser();
        dispatch(upDateDataUser({ id: Id, changes: newUserData[0] }));
    }



    const handlePlus = ({ id }) => () => {
        if (count >= chooseCountSizeToNumber) return;
        setCount(count + 1);
        const newUserData = fetchedUser.map(({ basket, ...rest }) => {
            const itemPriceId = clothesItems.filter((item => item.id === id));
            const itemPrice = itemPriceId[0].price;
            const itemId = fetchedUser[0].basket.filter((item => item.id === id));
            const elseId = fetchedUser[0].basket.filter((item => item.id !== id));
            const changeData = itemId.map(({ price, ...props }) => {
                let newPrice = itemPrice * (count + 1);
                price = newPrice;
                const newItemId = { price, ...props };
                return newItemId;
            });
            basket = [...elseId, ...changeData];

            const newArr = { basket, ...rest };
            return newArr;

        })

        const changeBasketPriceUser = async () => {
            try {
                const resp = await axios.put(`http://localhost:3001/users/${Id}`, newUserData[0]);
                //console.log(resp.data);
            } catch (err) {
                // Handle Error Here 
                console.error(err);
            }
        };
        changeBasketPriceUser();
        dispatch(upDateDataUser({ id: Id, changes: newUserData[0] }));
    }


    // const renderBasketList = basket.map(({ id, modelId, article, price, name, color, pallete, size, img, description, proportions, composition }) => {

    const availableSize = size.filter((item) => item.quantity != null);

    //логика с количеством  одинаковых размеров
    const chooseSize = size.filter((item) => item.scale === mySize);
    const chooseCountSize = chooseSize.map(({ scale, quantity }) => {
        return quantity;
    });
    const chooseCountSizeToString = chooseCountSize.toLocaleString();
    const chooseCountSizeToNumber = Number(chooseCountSizeToString);

    const BasketPageItemMiddle = () => {

        return (
            <div className="order-list-item-mid" key={id}>
                <div className="card-right-left"
                    style={activeDataProfile === true ? { transform: 'translateX(-95%)', transition: 'all 0.8s' } : { transform: 'translateX(0%)', transition: 'all 0.8s' }}
                >
                    <div className="card-right-preview-info">
                        <div className="item-preview">
                            <img src={img[0]} alt="" className="item-img" />
                        </div>
                        {/* <div className="right-side"> */}
                        <div className="card-right-info">
                            <div className="item-info-box">
                                <div className="name-item">{name}</div>
                            </div>
                            <div className="card-right-info-flex">
                                <div className="middle-item-size">{mySize}</div>
                                <div className="color-item" style={{ backgroundColor: pallete }}></div>
                                <div className="middle-item-count">{count}</div>
                            </div>
                            <div className="price-item">{price} P</div>
                        </div>
                    </div>
                    <div className="burger-basket-mid" onClick={handleOpenDataProfile}>
                        <img src={burger} alt="" />
                    </div>
                    {/* </div> */}

                    {/* {activeDataProfile ? */}
                    <div className="action" style={activeDataProfile === true ? { display: 'block' } : { display: 'none' }}>
                        <div className="card-right-right">
                            <div className="catalog-filter select-container">
                                <div className="filter-head"
                                    onClick={handleChange}
                                >
                                    <div className="catalog-filter-title">{mySize}</div>
                                    <div className="catalog-filter-icon">
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
                                        );
                                    })}
                                </div>}
                            </div>
                            <div className="count-item">
                                <div className="catalog-filter select-container count-container">
                                    <div className="filter-head">
                                        <div className="button-minus"
                                            onClick={handleMinus({ id })}
                                        >
                                        </div>
                                        {count >= 1 ?
                                            <div className="count-number">{count}</div>
                                            : <div className="count-number">{count}</div>}
                                        <div className="button-plus"
                                            onClick={handlePlus({ id })}>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className='button-delete'
                                onClick={handleDeleteBasketItem({ id })}
                            >
                                <img src={basket_delete} alt="" className='basket-delete' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
    return (
        <>
            <div className="order-list-item" key={id}>
                <div className="item-preview">
                    <img src={img[0]} alt="" className="item-img" />
                </div>
                <div className="item-info-box">
                    <div className="article-item">арт.{article}</div>
                    <div className="name-item">{name}</div>
                </div>
                <div className="color-item" style={{ backgroundColor: pallete }}></div>
                <div className="choose-item-size">
                    <div className="catalog-filter select-container">
                        <div className="filter-head"
                            onClick={handleChange}
                        >
                            <div className="catalog-filter-title">{mySize}</div>
                            <div className="catalog-filter-icon">
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
                                );
                            })}
                        </div>}
                    </div>
                </div>
                <div className="count-item">
                    <div className="catalog-filter select-container">
                        <div className="filter-head">
                            <div className="button-minus"
                                onClick={handleMinus({ id })}
                            >
                            </div>
                            {count >= 1 ?
                                <div className="count-number">{count}</div>
                                : <div className="count-number">{count}</div>}
                            <div className="button-plus"
                                onClick={handlePlus({ id })}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="price-item">{price} P</div>
                <button className='button-delete'
                    onClick={handleDeleteBasketItem({ id })}
                >
                    <img src={basket_delete} alt="" className='basket-delete' />
                </button>
            </div>
            <BasketPageItemMiddle />
        </>
    )
    // })
}

export default BasketPageItem;
