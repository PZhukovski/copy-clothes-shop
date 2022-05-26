
import { Link, useLocation } from 'react-router-dom';


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