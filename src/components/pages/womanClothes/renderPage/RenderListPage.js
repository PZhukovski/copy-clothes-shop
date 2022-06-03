import { Link, useLocation } from 'react-router-dom';
import './commonlistpage.scss';
import arrowup from '../../../../assets/store/up.svg';
import arrowdown from '../../../../assets/store/down.svg';
import arrowleft from './arrow-left.svg';
import { fetchClothesForWoman, clothesSelector } from './ClothesSlice';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import history from "history/browser";
import store from '../../../../store/index';

const FilterForPage = ({ activeFilter, setActiveFilter, dataType }) => {

    const [isActive, setIsActive] = useState(false);

    const handleChange = (e) => {
        setIsActive(!isActive);
    }
    const handleActiveFilter = ({ size }) => () => {
        setActiveFilter(size);
        setIsActive(!isActive);
    }

    const clothesSize = ["All", "S", "M", "L"];
    const shoesSize = ['All', "37", "38", "39"];
    switch (dataType) {
        case 'filter-obuv':
            return (

                <>
                    <div className="catalog-filter" >
                        <div className="filter-head" >
                            <div className="catalog-filter-title" id='112' onClick={handleChange}>Размер обуви</div>
                            {shoesSize.map((size, i) => {
                                return (
                                    <div key={i}>
                                        {activeFilter === size ?
                                            <div className="active-filter-data">
                                                {activeFilter}
                                            </div>
                                            : ''
                                        }
                                    </div>
                                )
                            })}
                            <div className="catalog-filter-icon" >
                                {isActive ? <img src={arrowup} alt="" /> : <img src={arrowdown} alt="" />}
                            </div>
                        </div>
                        {isActive && <div className="selectList">
                            {shoesSize.map((size, i) => {
                                return <div key={i} className={activeFilter === size ? "selectList-item active-filter" : "selectList-item"}
                                    onClick={handleActiveFilter({ size })}
                                >{size}</div>

                            })}
                        </div>}
                    </div>
                </>
            )
        case 'filter-odezda':
            return (
                <>
                    <div className="catalog-filter" >
                        <div className="filter-head" >
                            <div className="catalog-filter-title" id='111' onClick={handleChange} >Размер одежды</div>
                            {clothesSize.map((size, i) => {
                                return (
                                    <div key={i}>
                                        {activeFilter === size ?
                                            <div className="active-filter-data">
                                                {activeFilter}
                                            </div>
                                            : ''
                                        }
                                    </div>
                                )
                            })}

                            <div className="catalog-filter-icon" >
                                {isActive ? <img src={arrowup} alt="" /> : <img src={arrowdown} alt="" />}
                            </div>
                        </div>
                        {isActive && <div className="selectList">
                            {clothesSize.map((size, i) => {
                                return <div key={i} className={activeFilter === size ? "selectList-item active-filter" : "selectList-item"}
                                    value={size}
                                    onClick={handleActiveFilter({ size })}
                                >{size}</div>
                            })}
                        </div>}
                    </div>
                </>
            )
    }
}


const RenderListPage = ({ dataType }) => {

    const [activeFilter, setActiveFilter] = useState('All');
    const stored = store.getState();
    //console.log(stored);
    let location = useLocation();
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

    const renderClothes = () => {
        switch (dataType) {
            case 'verhnaa-odezda':
                const verhOdezda = fetchedShoesForWomen.filter(item => item.path === "verhnaa-odezda");
                //console.log(verhOdezda);
                const filteredverhOdezda = filteredElement(verhOdezda);
                const renderFilterverhOdezda = filteredverhOdezda.filter((element) => element.size.length > 0);
                return (
                    <>
                        {activeFilter === "All" || activeFilter === "37" || activeFilter === "38" || activeFilter === "39" ? (
                            verhOdezda.map((element) => {
                                return (
                                    <div
                                        key={element.id}
                                        className='provaider-catalogList'>
                                        <ListItem {...element} key={element.id} />
                                    </div>
                                )

                            })) : (
                            renderFilterverhOdezda.map((element) => {
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


            case 'trikotaz':
                const trikotazOdezda = fetchedShoesForWomen.filter(item => item.path === "trikotaz");
                const filteredtrikotazOdezda = filteredElement(trikotazOdezda);

                const renderFiltertrikotazOdezda = filteredtrikotazOdezda.filter((element) => element.size.length > 0);
                return (
                    <>
                        {activeFilter === "All" || activeFilter === "37" || activeFilter === "38" || activeFilter === "39" ? (
                            trikotazOdezda.map((element) => {
                                return (
                                    <div
                                        key={element.id}
                                        className='provaider-catalogList'>
                                        <ListItem {...element} key={element.id} />
                                    </div>
                                )
                            })) : (
                            renderFiltertrikotazOdezda.map((element) => {
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
            case 'obuv':
                const obuvOdezda = fetchedShoesForWomen.filter(item => item.path === 'obuv');
                const filteredobuvOdezda = filteredElement(obuvOdezda);
                const renderFilterobuvOdezda = filteredobuvOdezda.filter((element) => element.size.length > 0);
                return (
                    <>
                        {activeFilter === 'All' || activeFilter === "S" || activeFilter === "M" || activeFilter === "L" ? (
                            obuvOdezda.map((element) => {
                                return (
                                    <div
                                        key={element.id}
                                        className='provaider-catalogList'>
                                        <ListItem {...element} key={element.id} />
                                    </div>
                                )
                            })) : (
                            renderFilterobuvOdezda.map((element) => {
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

            case 'jeans':
                const jeansOdezda = fetchedShoesForWomen.filter(item => item.path === 'jeans');
                const filteredjeansOdezda = filteredElement(jeansOdezda);
                const renderFilterjeansOdezda = filteredjeansOdezda.filter((element) => element.size.length > 0);
                return (
                    <>
                        {activeFilter === "All" || activeFilter === "37" || activeFilter === "38" || activeFilter === "39" ? (
                            jeansOdezda.map((element) => {
                                return (
                                    <div
                                        key={element.id}
                                        className='provaider-catalogList'>
                                        <ListItem {...element} key={element.id} />
                                    </div>
                                )
                            })) : (
                            renderFilterjeansOdezda.map((element) => {
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
    }

    const elements = renderClothes(fetchedShoesForWomen);
    // console.log(elements);

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
                    <div className="catalogPage-main">
                        <div className="catalogPage-filters-head">
                            {location.pathname === "/catalog/womancollection/obuv" ?
                                <FilterForPage activeFilter={activeFilter} setActiveFilter={setActiveFilter} dataType={'filter-obuv'} /> :
                                <FilterForPage activeFilter={activeFilter} setActiveFilter={setActiveFilter} dataType={'filter-odezda'} />
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






    // const renderClothes = () => {

    //     switch (dataType) {
    //         case 'verhnaa-odezda':
    //             const verhOdezda = fetchedShoesForWomen.filter(item => item.path === "verhnaa-odezda");

    //             return (
    //                 <>
    //                     {verhOdezda.map((element) => {
    //                          return (
    //                                 <div
    //                                     key={element.id}
    //                                     className='provaider-catalogList'>
    //                                     <ListItem {...element} key={element.id} />
    //                                 </div>
    //                          )}
    //                      )}    
    //                 </>
    //             )
                


    //         case 'trikotaz':
    //             const trikotazOdezda = fetchedShoesForWomen.filter(item => item.path === "trikotaz");
    //             return (
    //                 <>
    //                     {trikotazOdezda.map((element) => {
    //                             return (
    //                                 <div
    //                                     key={element.id}
    //                                     className='provaider-catalogList'>
    //                                     <ListItem {...element} key={element.id} />
    //                                 </div>
    //                             )
    //                         }) 
    //                     }
    //                 </>
    //             )
    //         case 'obuv':
    //             const obuvOdezda = fetchedShoesForWomen.filter(item => item.path === 'obuv');
    //             return (
    //                 <>
    //                     {
    //                      obuvOdezda.map((element) => {
    //                             return (
    //                                 <div
    //                                     key={element.id}
    //                                     className='provaider-catalogList'>
    //                                     <ListItem {...element} key={element.id} />
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </>
    //             )

    //         case 'jeans':
    //             const jeansOdezda = fetchedShoesForWomen.filter(item => item.path === 'jeans');
    //             return (
    //                 <>
    //                     {
    //                      jeansOdezda.map((element) => {
    //                             return (
    //                                 <div
    //                                     key={element.id}
    //                                     className='provaider-catalogList'>
    //                                     <ListItem {...element} key={element.id} />
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </>
    //             )
    //     }
    // }