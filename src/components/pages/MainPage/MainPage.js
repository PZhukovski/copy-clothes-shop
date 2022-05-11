import { fetchClothesForWoman, clothesSelector, userSelector } from '../womanClothes/renderPage/ShoesSlice';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoesItem from '../womanClothes/renderPage/ListItem';
import ItemMainPage from './ItemMainPage';
import './mainpage.scss';
import arrowright from './right_arrow.svg';
import jeans1 from '../../../assets/mainpage/jeans1.jpg'
import jeans2 from '../../../assets/mainpage/jeans2.jpg'
import coat1 from '../../../assets/mainpage/coat1.jpg'
import coat2 from '../../../assets/mainpage/coat2.jpg'
import shoes1 from '../../../assets/mainpage/shoes1.jpg'
import shoes2 from '../../../assets/mainpage/shoes2.jpg'

const img = [
    <div className="two-img">
        <Link to="/catalog/womancollection/jeans">
            <h2>Джинсы</h2>
            <img key={jeans1} src={jeans1} className="img-item" />
            <img key={jeans2} src={jeans2} className="img-item" />
        </Link>
    </div>,
    <div className="two-img">
        <Link to="/catalog/womancollection/jackets">
            <h2>Вверхняя одежда</h2>
            <img key={coat1} src={coat1} className="img-item" />
            <img key={coat2} src={coat2} className="img-item" />
        </Link>
    </div>,
    <div className="two-img">
        <Link to="/catalog/womancollection/obuv">
            <h2>Обувь</h2>
            <img key={shoes1} src={shoes1} className="img-item" />
            <img key={shoes2} src={shoes2} className="img-item" />
        </Link>
    </div>
]

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [startInterval, setStartInterval] = useState(null);
    useEffect(() => {
        let cancel = false;
        // Запускаем интервал
        const interval = setInterval(() => {
            if (!cancel) {
                // Меняем состояние
                setActiveIndex((current) => {
                    // Вычисляем индекс следующего слайда, который должен вывестись
                    const res = current === img.length - 1 ? 0 : current + 1
                    return res;

                })
            }
        }, 10000)
        // Выключаем интервал
        return () => { cancel = true; clearInterval(interval) };

    }, [startInterval])

    // Вычисляем индекс предыдущего слайда
    const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1
    // Вычисляем индекс следующего слайда
    const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1
    return (
        <div className="slider" >
            <div className="slider-img slider-img-prev"
                key={prevImgIndex}>
                {img[prevImgIndex]}
            </div>
            <div className="slider-img"
                key={activeIndex}>
                {img[activeIndex]}
            </div>
            <div className="slider-img slider-img-next"
                key={nextImgIndex}>
                {img[nextImgIndex]}
            </div>
        </div>
    )


}
const MainPage = () => {

    const dispatch = useDispatch();
    const fetchedClothesForWomen = useSelector(clothesSelector.selectAll);
   
    useEffect(() => {
        dispatch(fetchClothesForWoman());
    }, []);


    const reduceArr = fetchedClothesForWomen.reduce((prev, cur) =>
        ({ ...prev, [cur.path]: (prev[cur.path] || []).concat(cur) }), {}
    );
    const groupArr = Object.values(reduceArr);
  
    const RenderClothes = () => {
        return groupArr.map((group, i) => {

            return (<div className='catalog-group' key={i}>
                <div className="title-group" >
                    <h5>{group[0].category}</h5>
                    <Link to={`/catalog/womancollection/${group[0].path}`} className="no-text-decoration link-to">
                        <h5>Все</h5>
                        <img src={arrowright} alt="" />
                    </Link>
                </div>
                <div className="catalog-scroll">
                    <div className="catalog-items">
                        {group.map((element) => {
                            return (
                                <div
                                    id={i}
                                    key={element.id}
                                    className='catalog-item'>
                                    <ItemMainPage {...element} key={element.id} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            )
        })
    };
    
    return (
        <>
            <Slider /><div className="catalogPage-main">
                <RenderClothes />
            </div>
        </>
    )
}
export default MainPage;
