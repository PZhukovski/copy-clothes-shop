import './searchbar.scss';
import search from '../../assets/header-icons/search.svg'
const SearchBar = ({onChange, placeholder}) => {
    return (
      <div className="Search">
        <div className ='search-logo'>
       <img src={search} alt="" />
        </div>
        <input
          className="SearchInput"
          type="text"
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  };
  export default SearchBar;
