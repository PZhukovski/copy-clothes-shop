import { Link } from 'react-router-dom';
import './commonlistpage.scss';
import { fetchClothesForWoman, filterOfShoes, filterOfClothes } from './ClothesSlice';
import { filterClothesChange, filterShoesChange } from './ClothesSlice'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import FilterItem from '../../filters/FilterItem'
import history from "history/browser";
import arrowleft from './arrow-left.svg';


const clothesSize = ["All", "S", "M", "L"];
const shoesSize = ['All', "37", "38", "39"];


const ListPage = () => {

    let historyLocation = history.location;
    const dispatch = useDispatch();

    const shoesFilterSelector = useSelector(filterOfShoes);
    const filterClothesSelector = useSelector(filterOfClothes);
    const shoes = shoesFilterSelector.filter(item => item.category === "Обувь");
    const clothes = filterClothesSelector.filter(item => item.category !== "Обувь")
    const clothesForWomen = [...shoes, ...clothes];

    useEffect(() => {
        dispatch(fetchClothesForWoman());
    }, []);

    const RenderWomanShoesList = () => {
        return (
            <>
                {clothesForWomen.map((element) => {
                    return (
                        <div
                            key={element.id}
                            className='provaider-catalogList'>
                            <ListItem {...element} key={element.id} />
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <div className="catalogPage">
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
                            <h1 className='sidebar-title'>Женщинам</h1>
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
                    <div className="catalogPage-main">
                        <div className="catalogPage-filters-head">
                            <FilterItem items={clothesSize} title={'Размер одежды'} action={filterClothesChange} />
                            <FilterItem items={shoesSize} title={'Размер обуви'} action={filterShoesChange} />

                        </div>
                        <div className="catalogList d-flex">
                            <RenderWomanShoesList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default ListPage;



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
