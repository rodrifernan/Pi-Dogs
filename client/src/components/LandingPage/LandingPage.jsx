import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'



export default function LandingPage(){
    return(
        <div className="Landing">
            <h1>Perros</h1>
            <Link to ='/home'>
                <button className='btn'>Let's go!</button>
            </Link>
        </div>
    )
}