import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const ScrollToTop = (props) => {
  const location = useLocation();
  //console.log(location);
  useEffect(() => {
     document.querySelector('.app').scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;