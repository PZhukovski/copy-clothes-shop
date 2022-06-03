import {  useState } from "react";
import { useDispatch } from "react-redux";
import arrowup from '../../../assets/store/up.svg';
import arrowdown from '../../../assets/store/down.svg';


const FilterItem = ( {items,  title , action} ) => {

    const [activeFilter, setActiveFilter] = useState('all');
    const [activeModal, setActiveModal] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setActiveModal(!activeModal);
    }
    const handleActiveFilter = ({ size }) => () => {
        setActiveFilter(size);
        dispatch(action(size))
    }

    return (
        <>
            <div className="catalog-filter" >
                <div className="filter-head" >
                    <div className="catalog-filter-title" id='111' onClick={handleChange} >{title}</div>
                    {items.map((size, i) => {
                        return (
                            <div key={i}>
                                {activeFilter === size ?
                                    <div key={i} className="active-filter-data" >
                                        {size}
                                    </div>
                                    : ''
                                }
                            </div>
                        )
                    })}
                    <div className="catalog-filter-icon" >
                        {activeModal ? <img src={arrowup} alt="" /> : <img src={arrowdown} alt="" />}
                    </div>
                </div>
                { activeModal && <div className="selectList">
                    {items.map((size, i) => {
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
export default FilterItem;  