import React from "react";
import { useEffect, useState, useRef } from "react";
import ThemeSelect from "./themeSelect";
import FontSelect from "./fontSelect";
import optionsIcon from "../../images/cog.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Options({children}) {
    const [isDisplayed,setIsDisplayed] = useState(false)

    return (
      <React.Fragment>
          <div className="option-icon" onClick={(e)=>{setIsDisplayed((prev)=>!prev)}}>
            <FontAwesomeIcon icon="fa-solid fa-gear" />
         </div>
     
          <div className="options">
            { isDisplayed ? children : ""}
          </div>
    
       </React.Fragment>
    );
  } 