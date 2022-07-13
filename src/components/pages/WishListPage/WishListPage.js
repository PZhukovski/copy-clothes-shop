import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { userSelector, fetchUser, upDateDataUser } from '../profile/ProfileSlice';
import { fetchClothesForWoman, clothesSelector , allClothes } from '../womanClothes/renderPage/ClothesSlice'
import axios from 'axios';
import { JSON_API } from '../../JsonPort';
import cancel from '../EditProfile/cancel.svg';
import './wishlist.scss';

const WishListPage = () => {
    const [failedBasketModal, setfailedBasketModal] = useState(false);
    const [cookies, setCookie] = useCookies(['']);
    const { Mail, Password, Id } = cookies;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchClothesForWoman());
        dispatch(fetchUser((Id)));
        // eslint-disable-next-line
    }, []);

    const fetchedUser = useSelector(userSelector.selectAll);
    // const clothesItems = useSelector(clothesSelector.selectAll);
    const clothesItems = useSelector(allClothes);
    
    const handleCloseBasketButton = (e) => {
        setfailedBasketModal(!failedBasketModal);
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
    const handledeleteWishlistUser = (id) => {
        const newUserData = fetchedUser.map(({ wishlist, ...rest }) => {
            const deleteItemData = fetchedUser[0].wishlist.filter((item => item.id === id));
            const newWishlist = fetchedUser[0].wishlist.filter((item => item.id !== deleteItemData[0].id));
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

    }

    const handleBasket = (id) => {

    const includeBasketArticle = fetchedUser.map(({ basket, wishlist, ...rest }) => {
        return basket.filter(item => item.id === id);
    });

        if (includeBasketArticle[0].length === 0) {
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
   

    return (
        <div className="catalogPage-wishlist" >
            <h2 className='wishlist-title'>Вишлист</h2>
            <div className="catalogList" >

                {fetchedUser.map(({ id, mail, password, phone, home_adress, data_birth, size_of_clothes, size_of_shoes, bonus, orders, wishlist, basket }) => {
                 return (wishlist.length > 0 ? 
                     wishlist.map(({ id, modelId, article, price, name, color, pallete, size, img, path, description, proportions, composition }) => {
                        
                        const renderPrice = price.toLocaleString();

                        return (
                            <div
                                key={id}
                                className='catalogCard-provaider'>

                                <div className="catalogCard">
                                    <Link to={`/catalog/womancollection/${path}/${id}`} className='no-text-decoration link-style' >
                                        <div className="productCard-preview">
                                            <div className="productCard-image">
                                                <img src={img[0]} className="card-media-thumbs-image" />
                                            </div>
                                            <div className="productCard-heart"></div>
                                            <div className="productCard-content">
                                                <div className="productCard-content-row">
                                                    <div className="productCard-title">
                                                        {name}
                                                    </div>
                                                </div>
                                                <div className="productCard-content-row">
                                                    <div className="productCard-price">
                                                        {renderPrice} P
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='buttons-row d-flex'>
                                        <div className="productCard-content-row">
                                            <button className="button-to-basket"
                                                onClick={() => handleBasket(id)}
                                            >
                                                В корзину
                                            </button>
                                        </div>
                                        <div className="productCard-content-row">
                                            <button className="button-wishlist"
                                                onClick={() => handledeleteWishlistUser(id)}
                                            >
                                                Удалить из избранного
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                  : <h3 className='wishlist-title'> Ваш wishlist пуст 😔</h3>)
                })}
            </div>
            <OccupiedBasketFail />
        </div>

    )

}

export default WishListPage;