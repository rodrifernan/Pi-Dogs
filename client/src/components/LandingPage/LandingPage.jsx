import React from 'react'
import {Link} from 'react-router-dom'



export default function LandingPage(){
    return(
        <div>
            <h1>Perros</h1>
            <Link to ='/home'>
                <button>Let's go!</button>
            </Link>
        </div>

        
    )
}