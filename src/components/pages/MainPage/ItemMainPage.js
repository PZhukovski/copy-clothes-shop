// import {  userSelector, clothesSelector } from '../shoesPage/ShoesSlice';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useLocation , useParams} from 'react-router-dom';
// import './shoesitem.scss';
// import SinglePageItem from '../SinglePageItem';

const ItemMainPage = ({ id, modelId, article, price, name, path, color, pallete, size, img, description, proportions, composition }) => {

    // const {id} = useParams();
    let location = useLocation();
 

    return (
        <>
        <Link  className  = "no-text-decoration" to={`/catalog/womancollection/${path}/${id}`}>

        <div className="catalogCard no-padding"
        >
            <div className="productCard-preview">
                <div className="productCard-image">
                <img src={img[0]} className="card-media-image"/>
                </div>
            </div>
        </div>
        </Link> 
        
        </>
        
    )


}
export default ItemMainPage;