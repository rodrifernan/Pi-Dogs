import React from 'react'
import {Link} from 'react-router-dom'
import gifPerro from './gifPerro.gif'
import "./Loading.css"

export default function Loading(){
    return(
        <div className='Loading'>
            <h1>Loading</h1>
            <img src={gifPerro} alt= "falló la imagen" width="400px"/>
            <Link to ='/home'>
                <button>Volver a la pagina principal</button>
            </Link>
        </div>
    )
}