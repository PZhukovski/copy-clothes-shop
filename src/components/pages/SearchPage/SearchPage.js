import { useLocation } from 'react-router-dom';
import './searchpage.scss';
import sad from './sad.svg';

import { fetchClothesForWoman, clothesSelector, allClothes } from '../womanClothes/renderPage/ClothesSlice';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ShoesItem from '../womanClothes/renderPage/ListItem';


const SearchPage = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();

    // const fetchedShoesForWomen = useSelector(clothesSelector.selectAll);
    const fetchedClothesForWomen = useSelector(allClothes);
    useEffect(() => {
        dispatch(fetchClothesForWoman());
    }, []);

    const searchClothes = fetchedClothesForWomen.filter(item => {
        return item.name.toLowerCase().includes(state.toLowerCase())
    })

    return (
        <div className="catalogPage">
            <div className="catalogPage-main">

                <div className="catalog-search-title">
                    <h4> Результат поиска по запросу: «{state}»</h4>

                </div>

                {searchClothes.length > 0 ?
                    <div className="catalogList">
                        {searchClothes.map((element) => {
                            return (
                                <div
                                    key={element.id}
                                    className='provaider-catalogList'>
                                    <ShoesItem {...element} key={element.id} />
                                </div>
                            )
                        })}
                    </div>

                    :
                    <div className="centered-text">
                        <img src={sad} alt="" />
                        <div className="content-title">Ничего не нашлось</div>
                        <div className="content-text">Проверьте, правильно ли введен запрос <br />или воспользуйтесь фильтрами
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default SearchPage;