import React from 'react'
import {Link} from 'react-router-dom'

export default function NoMatch(){      //Agreggar perro trista en css
    return(
        <div>
            <h1>Parece Que Te Perdiste!</h1>
            <Link to ='/home'>
                <button>Volver a la pagina principal</button>
            </Link>
        </div>
    )
}