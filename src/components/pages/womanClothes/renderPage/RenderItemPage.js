import { Link, useLocation } from 'react-router-dom';
import './commonlistpage.scss';
import arrowleft from './arrow-left.svg';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import history from "history/browser";
import store from '../../../../store/index';
import FilterItem from '../../filters/FilterItem';
import { fetchClothesForWoman, filterClothesChange, filterShoesChange,  filterOfShoes, filterOfClothes } from './ClothesSlice'

const clothesSize = ["All", "S", "M", "L"];
const shoesSize = ['All', "37", "38", "39"];

const RenderListPage = ({ dataType }) => {

    let location = useLocation();
    let historyLocation = history.location;
    const dispatch = useDispatch();

    const shoesFilterSelector = useSelector(filterOfShoes);
    const filterClothesSelector = useSelector(filterOfClothes);
    const shoes = shoesFilterSelector.filter(item => item.category === "Обувь");
    const  clothes = filterClothesSelector.filter(item=> item.category !== "Обувь")
    const clothesForWomen = [...shoes, ...clothes];

    // const shoesFilter = useSelector(filterOfShoes);
    // const filterShoes = shoesFilter.filter(item => item.category === "Обувь");
    // const clothes =useSelector(filterOfClothes);
    // const  filterClothes = clothes.filter(item=> item.category !== "Обувь")
    // const fetchedShoesForWomen = [...filterShoes, ...filterClothes];
   

    useEffect(() => {
        dispatch(fetchClothesForWoman());
    }, []);

const renderClothes = (arr)=>{
    const clothes = arr.filter(item => item.path === dataType);
    return (
        <>
            {clothes.map((element) => {
                 return (
                        <div
                            key={element.id}
                            className='provaider-catalogList'>
                            <ListItem {...element} key={element.id} />
                        </div>
                 )}
             )}    
        </>
    )
}

    const elements = renderClothes(clothesForWomen);
    // const elements = renderClothes(fetchedShoesForWomen);

    return (
        <>
            <div className="catalogPage ">
                <div className="bread-scrimbs">
                    <div className="bread-scrimbs-delimiter">
                        <Link to={historyLocation.pathname} className="no-text-decoration">
                            <img src={arrowleft} alt="" />
                            Назад
                        </Link>
                    </div>
                </div>
                <div className="catalogPage-columns">
                    <div className="sticky">
                        <div className="catalogPage-sidebar">
                            {hrefs.map((href) => {
                                return (
                                    <div key={href.id}>
                                        {location.pathname === (`/catalog/womancollection${href.name}`) ? <h1 className='sidebar-title'> {href.title} </h1> : ''}
                                    </div>
                                )
                            })}
                            <div className="sidebar-items">
                                {hrefs.map((href) => {
                                    return (
                                        <Link key={href.id} className="sidebar-item no-text-decoration" to={`/catalog/womancollection${href.name}`}>
                                            {href.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="catalogPage-render">
                        <div className="catalogPage-filters-head">
                            {location.pathname === "/catalog/womancollection/obuv" ?
                              <FilterItem items={shoesSize} title = {'Размер обуви'} action ={filterShoesChange }/>
                               :
                               <FilterItem items={clothesSize} title = {'Размер одежды'} action = {filterClothesChange} />
                            }
                        </div>
                        <div className="catalogList d-flex">
                            {elements}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenderListPage;



const hrefs = [
    { id: 112, name: "/verhnaa-odezda", title: 'Вверхняя одежда' },
    { id: 113, name: "/jackets", title: 'Куртки и жилеты' },
    { id: 114, name: "/downjacket2", title: 'Пуховки' },
    { id: 115, name: "/trikotaz", title: 'Трикотаж' },
    { id: 116, name: "/coats", title: 'Пальто и тренчи' },
    { id: 117, name: "/obuv", title: 'Обувь' },
    { id: 118, name: "/ubki", title: 'Юбки' },
    { id: 119, name: "/dress", title: 'Платья' },
    { id: 120, name: "/zakety", title: 'Жакеты' },
    { id: 121, name: "/t-shirts", title: 'Футболки' },
    { id: 122, name: "/jeans", title: 'Джинсы' },
    { id: 123, name: "/bodybasics", title: 'Белье' }
]




