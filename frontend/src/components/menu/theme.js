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

export function setColorsFromTheme(theme){
    console.log(theme)
    const backgroundColor = getCssValueFromString(theme[0][1].value.rules[0],'background-color')
    const color = getCssValueFromString(theme[0][1].value.rules[0],' color')
    const activeColor = getCssValueFromString(theme[0][1].value.rules[3],'background-color')
    const caretColor = getCssValueFromString(theme[0][1].value.rules[7],'background-color')

    root.style.setProperty('--color-panel-background',backgroundColor);
    var r = document.querySelector('body');
    r.style.setProperty("background-color",caretColor)
    root.style.setProperty('--color-side-menu-background',caretColor)

    root.style.setProperty('--color-panel', color);

    root.style.setProperty('--color-default', color);

    root.style.setProperty('--color-active',activeColor)
 
}

export const themes = {
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