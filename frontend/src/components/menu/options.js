import React from "react";
import { useEffect, useState, useRef } from "react";
import ThemeSelect from "./themeSelect";
import FontSelect from "./fontSelect";
import optionsIcon from "../../images/cog.svg"

export default function Options({children}) {
    const [isDisplayed,setIsDisplayed] = useState(false)

    return (
      <React.Fragment>
          <div className="option-icon" onClick={(e)=>{setIsDisplayed((prev)=>!prev)}}>
            <img src={optionsIcon} />
         </div>
     
          <div className="options">
            { isDisplayed ? children : ""}
          </div>
    
       </React.Fragment>
    );
  } 