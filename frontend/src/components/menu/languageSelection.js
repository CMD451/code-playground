import React from "react";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  Link } from "react-router-dom";

export default function LanguageSelection() {
   
    return (
            <div className="lang-list">
                <div className="options-icon">
                   <Link reloadDocument={true} to="/python">
                     <FontAwesomeIcon icon="fa-brands fa-python" />
                   </Link> 
                </div>
                <div className="options-icon">
                    <Link reloadDocument={true} to="/c">
                        <FontAwesomeIcon icon="fa-solid fa-c" />
                    </Link> 
                </div>
            </div>
    );
  } 