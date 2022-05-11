import { useState } from "react";

const Accordion = ({ title, content}) => {
    const [isActive, setIsActive] = useState(false);
  //  console.log(content)
    return (
      <div className="accordion-item">
        <div className="accordion-head d-flex " onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion-content">{content}</div>}
      </div>
    );
  };
   
  export default Accordion;