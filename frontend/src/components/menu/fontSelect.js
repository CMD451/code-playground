import React from "react";
import { useEffect, useState, useRef } from "react";


export default function FontSelect({onChange}) {

    const root = document.documentElement;

    const fonts = [
        "Arial",
        "Helvetica",
        "Verdana",
        "Tahoma",
        "Trebuchet MS",
        "Geneva",
        "Segoe UI",
        "Calibri",
        "Lucida Grande",
        "Times New Roman",
        "Times",
        "Georgia",
        "Palatino Linotype",
        "Palatino",
        "Garamond",
        "Book Antiqua",
        "Courier New",
        "Courier",
        "Lucida Console",
        "Monaco",
        "Consolas",
        "Comic Sans MS",
        "Brush Script MT",
        "Impact",
        "Papyrus",
        "-apple-system",
        "Roboto",
        "System UI",
        "BlinkMacSystemFont",
    ]
    function onFontChange(event){
        root.style.setProperty('--main-font', event.target.value);
        onChange("font",event.target.value)
    }
    return (
        <div className="font-select"> 
            Font:<select id="fonts" onChange={onFontChange}>
                {
                    fonts.map((fontName)=>{
                       return(
                            <option value={fontName} key={fontName}> 
                                {fontName}
                            </option>
                             )       
                    })
                }
            </select>
        </div>
    );
  } 