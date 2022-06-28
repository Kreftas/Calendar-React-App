import React from 'react'
import { Link } from "react-router-dom";
import { CN } from '../../style/ClassNames'



export const Header = () => {
    return (
        <div className={CN.HEADER} >
            <nav>
                <h1>JoCal</h1>
                <ul>
                    <li><Link to="./">Home</Link></li>
                    <li><Link to="./cal">Calendar</Link></li>
                    <li><Link to="./todos">Items</Link></li>
                    
                    {/* <li><Link to="./add">Add todo</Link></li> */}

                    {/* <li><Link to="./user">User page</Link></li> */}
                    {/* <li><Link to="./test">Test</Link></li> */}
                </ul>
            </nav>
        </div>
    )
}
