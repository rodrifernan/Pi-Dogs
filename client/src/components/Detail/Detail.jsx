import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from '../../actions'
import { useEffect } from "react";
import { useParams } from "react-router";

export default function Detail(){
    
    const detParams = useParams()
    //console.log(detParams)
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDetail(detParams.id))
        //return clearDetail()
    }, [dispatch, detParams])

    const myDog = useSelector((state)=> state.detail)

    return(
        <div>
            {console.log(myDog)}
            {
                
                myDog.length ?
                !myDog[0].createdInDB ?  /* checkeo si se carga uno de api*/
                <div>
                    <h1>{myDog.nombre}</h1>
                    <img src={myDog[0].imagen} alt ="" height="750px" width="700px"/>
                    <h4>ID de Raza: {myDog[0].id}</h4>
                    <h4>Temperamentos: {myDog[0].temperamentos.map((elem)=>elem + " ") }</h4>
                    <ul>
                        <label>Stats:</label>
                        <li>Altura: {myDog[0].altura}</li>
                        <li>Peso: {myDog[0].peso}</li>
                        <li>Años: {myDog[0].años}</li>
                    </ul>
                </div> : <div>
                    <h1>{myDog[0].nombre}</h1>
                    <img src={myDog[0].imagen} alt ="" height="750px" width="700px"/>
                    <h4>Types: {myDog[0].temperamentos.map((elem)=>elem.nombre + " ")}</h4>
                    <ul>
                        <label>Stats:</label>
                        <li>Health: {myDog[0].altura}</li>
                        <li>Attack: {myDog[0].peso}</li>
                        <li>Defense: {myDog[0].años}</li>
                    </ul>
                </div>:<p>Loading</p>
            }




            <Link to="/home/">
            <button >Volver</button>
            </Link>
        </div>
    )

}