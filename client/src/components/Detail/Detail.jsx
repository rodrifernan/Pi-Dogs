import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail} from '../../actions'
import { useEffect } from "react";
import { useParams } from "react-router";
import Loading from "../Loading/Loading";

export default function Detail(){
    
    const detParams = useParams()
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDetail(detParams.id))
    }, [dispatch, detParams])

    const myDog = useSelector((state)=> state.detail)
    
    return(
        <div>
            {
                
                myDog.length ?
                !myDog[0].createdInDB ?  /* checkeo si se carga uno de api*/
                <div>
                    <h1>{myDog[0].nombre}</h1>
                    <img src={myDog[0].imagen} onError={(e)=>{e.target.onerror = null; e.target.src="https://img.favpng.com/20/25/4/dog-paw-logo-cat-png-favpng-Z89TpBXQKbri6trMAcXqnNdJq.jpg"}} alt = "" height="700px" width="700px"/>
                    <h4>ID de Raza: {myDog[0].id}</h4>
                    <h4>Temperamentos: {myDog[0].temperamentos.map((elem)=>elem + " ") }</h4>
                    <ul>
                        <label>Estadisticas:</label>
                        <li>Altura: {myDog[0].altura} cms</li>
                        <li>Peso: {myDog[0].peso} lbs</li>
                        <li>Años: {myDog[0].años}</li>
                    </ul>
                </div> : <div>
                    <h1>{myDog[0].nombre}</h1>
                    <img src={myDog[0].imagen} onError={(e)=>{e.target.onerror = null; e.target.src="https://img.favpng.com/20/25/4/dog-paw-logo-cat-png-favpng-Z89TpBXQKbri6trMAcXqnNdJq.jpg"}} alt = "" height="700px" width="700px"/>
                    <h4>Types: {myDog[0].temperamentos.map((elem)=>elem.nombre + " ")}</h4>
                    <ul>
                        <label>Estadisticas:</label>
                        <li>Altura: {myDog[0].altura} cms</li>
                        <li>Peso: {myDog[0].peso} lbs</li>
                        <li>Años: {myDog[0].años} years</li>
                    </ul>
                </div>  :
                <Loading/>
            }


            <Link to="/home/">
            <button >Volver</button>
            </Link>
        </div>
    )

}