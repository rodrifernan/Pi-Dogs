import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../actions";



export default function Searchbar(){
    const dispatch = useDispatch()
    const [nombre, setNombre] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setNombre(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        setNombre("")
        dispatch(getDogByName(nombre))
        
    }

    return(
        <div>
            <input 
                type = 'text'
                value={nombre}
                placeholder="Buscar Perro..."
                onChange={(e)=> handleInputChange(e)}
            />

            <button type="submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}