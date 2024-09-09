import React from "react";
import { useEffect, useState, useRef } from "react";
import { oneDark } from "@uiw/react-codemirror";
import {abcdef,okaidia,abyss,androidstudio,andromeda,
    atomone,aura,basicLight,consoleLight,consoleDark,
    copilot,eclipse,githubLight,githubDark,kimbie,material,
    quietlight,tokyoNight,vscodeLight,vscodeDark,xcodeLight,
    xcodeDark,tomorrowNightBlue,red
} from '@uiw/codemirror-themes-all'



function getCssValueFromString(string,valueName){
    const regex = new RegExp(`${valueName}:\s*([^;]+);`)
    let valueMatch = string.match(regex)
    return valueMatch ? valueMatch[1].trim() : null
}

function setColorsFromTheme(theme){
    const backgroundColor = getCssValueFromString(theme[0][1].value.rules[0],'background-color')
    const color = getCssValueFromString(theme[0][1].value.rules[0],' color')
    const activeColor2 = getCssValueFromString(theme[0][1].value.rules[3],'background-color')
    const activeColor = getCssValueFromString(theme[0][1].value.rules[3],'background-color')

 

    root.style.setProperty('--color-panel-background',backgroundColor );
    root.style.setProperty('--color-panel', color);
    root.style.setProperty('--color-default', color);
    root.style.setProperty('--color-active',activeColor)
}

export default function ThemeSelect({onChange}) {
    const themes = {
        "okaidia": okaidia,
        "abcdef": abcdef,
        "abyss": abyss,
        "oneDark": oneDark,
        "androidstudio": androidstudio,
        "andromeda": andromeda,
        "atomone": atomone,
        "aura": aura,
        "basicLight": basicLight,
        "consoleLight": consoleLight,
        "consoleDark": consoleDark,
        "copilot": copilot,
        "eclipse": eclipse,
        "githubLight": githubLight,
        "githubDark": githubDark,
        "kimbie": kimbie,
        "material": material,
        "quietlight": quietlight,
        "tokyoNight": tokyoNight,
        "vscodeLight": vscodeLight,
        "vscodeDark": vscodeDark,
        "xcodeLight": xcodeLight,
        "xcodeDark": xcodeDark,
        "tomorrowNightBlue": tomorrowNightBlue,
        "red":red
    }

    function handleChange(event){
        const theme = themes[event.target.value]
        onChange("theme",theme)
        setColorsFromTheme(theme)

    }

    return (
        <div className="theme-select"> 
            Theme:<select id="themes" onChange={handleChange}>
                {
                    Object.keys(themes).map((themeName,value)=>{
                       return(
                            <option value={themeName} key={themeName}> 
                                {themeName}
                            </option>
                             )       
                    })
                }
            </select>
        </div>
    );
  } 