import { allClothes } from './ClothesSlice';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './listitem.scss';


const ShoesItem = ({ id, modelId,  price, name, img, ...props }) => {

    let location = useLocation();

    const fetchedShoesForWomen = useSelector(allClothes);
    const colors = fetchedShoesForWomen.filter((item => item.modelId === modelId));
    const priceToString = price.toLocaleString();

    const renderColor = colors.map((color, i) => {
        return (
            <div key={i} className="product-Card-color" style={{ backgroundColor: color.pallete }}></div>
        )
    })

    return (
        <>
            <Link className="no-text-decoration" to={`${location.pathname}/${id}`}>
                <div className="catalogCard">
                    <div className="productCard-preview">
                        <div className="productCard-image">
                            <img src={img[0]} alt='' className="card-media-thumbs-image" />
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
                                    {priceToString}
                                </div>
                                <div className="productCard-colors">
                                    {renderColor}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default ShoesItem;