import React from "react";
import "./Paginado.css"

export default function Paginado({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)
        
    }

    return(
        <nav>
            <ul>
            {pageNumbers && 
                pageNumbers.map((number)=>{
                    return(
                        <button className="number" key={number} onClick={()=> paginado(number)}>{number}</button>
                    )
            })}
            </ul>
        </nav>
    )
}