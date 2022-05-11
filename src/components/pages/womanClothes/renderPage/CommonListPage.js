import { Link } from 'react-router-dom';
import './commonlistpage.scss';
import { fetchClothesForWoman, clothesSelector } from './ShoesSlice';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import history from "history/browser";
import arrowup from '../../../../assets/store/up.svg';
import arrowdown from '../../../../assets/store/down.svg';
import arrowleft from './arrow-left.svg';
const SelectFilter = ({ activeFilter, setActiveFilter }) => {

    const [selectFilter, setSelectFilter] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const handleChange = (e) => {
        setSelectFilter(e.target.id);
        setIsActive(!isActive);
    }
    const handleActiveFilter = ({ size }) => () => {
        setActiveFilter(size);
    }

    const clothesSize = ["All", "S", "M", "L"];
    const shoesSize = ['All', "37", "38", "39"];
    return (
        <>
            <div className="catalog-filter" >
                <div className="filter-head" >
                    <div className="catalog-filter-title" id='111' onClick={handleChange} >Размер одежды</div>
                    {clothesSize.map((size, i) => {
                        return (
                            <div key={i}>
                                {selectFilter === '111' && activeFilter === size ?
                                    <div key={i} className="active-filter-data" >
                                        {size}
                                    </div>
                                    : ''
                                }
                            </div>
                        )
                    })}
                    <div className="catalog-filter-icon" >
                        {selectFilter === '111' && isActive ? <img src={arrowup} alt="" /> : <img src={arrowdown} alt="" />}
                    </div>
                </div>
                {selectFilter === '111' && isActive && <div className="selectList">
                    {clothesSize.map((size, i) => {
                        return <div key={i} className={activeFilter === size ? "selectList-item active-filter" : "selectList-item"}
                            value={size}
                            onClick={handleActiveFilter({ size })}
                        >{size}</div>
                    })}
                </div>}
            </div>

            <div className="catalog-filter" >
                <div className="filter-head" >
                    <div className="catalog-filter-title" id='112' onClick={handleChange}>Размер обуви</div>
                    {shoesSize.map((size, i) => {
                        return (
                            <div key={i}>
                                {selectFilter === '112' && activeFilter === size
                                    ? <div className="active-filter-data" >
                                        {size}
                                    </div>
                                    : ''
                                }
                            </div>
                        )
                    })}

                    <div className="catalog-filter-icon" >
                        {selectFilter === '112' && isActive ? <img src={arrowup} alt="" /> : <img src={arrowdown} alt="" />}
                    </div>
                </div>
                {selectFilter === '112' && isActive && <div className="selectList">
                    {shoesSize.map((size, i) => {
                        return <div key={i} className={activeFilter === size ? "selectList-item active-filter" : "selectList-item"}
                            onClick={handleActiveFilter({ size })}>
                            {size}</div>
                    })}
                </div>}
            </div>
        </>
    )
}
const ShoesListPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    let historyLocation = history.location;
    const dispatch = useDispatch();

    const fetchedShoesForWomen = useSelector(clothesSelector.selectAll);

    useEffect(() => {
        dispatch(fetchClothesForWoman());
        // eslint-disable-next-line
    }, []);

    const filteredElement = (arr) =>
        arr.map(({ size, ...props }) => {
            const arraySizes = size;
            const activeSizeFilter = arraySizes.filter((size) => size.scale === activeFilter);
            const availableSizeFilter = activeSizeFilter.filter((size) => size.quantity !== null);
            size = availableSizeFilter;
            const newFilterArr = { size, ...props };
            return newFilterArr;
        });

    const filteredClothes = filteredElement(fetchedShoesForWomen);
    const renderFilterClothes = filteredClothes.filter((element) => element.size.length > 0);

    const RenderWomanShoesList = () => {
        return (
            <>
                {activeFilter === "All" ? (
                    fetchedShoesForWomen.map((element) => {
                        return (
                            <div
                                key={element.id}
                                className='provaider-catalogList'>
                                <ListItem {...element} key={element.id} />
                            </div>
                        )

                    })) : (
                    renderFilterClothes.map((element) => {
                        return (
                            <div
                                key={element.id}
                                className='provaider-catalogList'>
                                <ListItem {...element} key={element.id} />
                            </div>
                        )
                    })
                )
                }
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
                            <SelectFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
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
export default ShoesListPage;



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
