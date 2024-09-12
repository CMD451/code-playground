import React from "react";
import { useEffect, useState, useRef } from "react";
import { themes } from "./theme";

export default function ThemeSelect({value,onChange}) {

    function handleChange(event){
        onChange("theme",event.target.value)
    }

    return (
        <div className="theme-select options-select"> 
            Theme:<select id="themes" onChange={handleChange}>
                {
                    Object.keys(themes).map((themeName,theme)=>{
                       return(
                            <option value={themeName} key={themeName} selected={ value == themeName  ? 'selected' : ''}> 
                                {themeName}
                            </option>
                             )       
                    })
                }
                <div class="select-arrow"/>
            </select>
        </div>
    );
  } 