import React from "react";
import { useEffect, useState, useRef } from "react";
import Options from "./options";



import "../../styles/menu.css"

export default function SideMenu({children}) {
    return (
        <div className="menu"> 
            {children}
        </div>
    );
  } 