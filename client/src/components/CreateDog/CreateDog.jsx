import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import { getTemparemanetos, postDog } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

/* //<Link onClick={setInput({...input, temperamentos:input.temperamentosmperamentos.pop()})}>X</Link> */
export default function CreateDog (){
    const dispatch = useDispatch()
    const temperamentos = useSelector((state)=>state.temperamentos)

    
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    

    const [pesoMin, setPesoMin] = useState(0)
    const [pesoMax, setPesoMax] = useState(0)
    const [altMin, setAltMin] = useState(0)
    const [altMax, setAltMax] = useState(0)
    const [añosMin, setAñosMin] = useState(0)
    const [añosMax, setAñosMax] = useState(0)

    const [input, setInput] = useState({
        nombre: "",
        altura:altMin.toString()+" - "+altMax.toString(),
        peso: pesoMin.toString()+" - "+pesoMax.toString(),
        años: añosMin.toString()+" - "+añosMax.toString(),
        temperamentos: [],
        imagen: ""
    })
    
    function handleSelect(e){
        if (!input.temperamentos.includes(e.target.value)) {
            setInput({
            ...input,
            temperamentos: [...input.temperamentos, e.target.value]
        })
        }
        
        console.log(input.temperamentos)
    }

    function popTemp(){
            const nuevosTemp = input.temperamentos.pop()
            setInput({
                ...input,
                temperamentos: nuevosTemp
            })
        }
    useEffect(()=>{
        dispatch(getTemparemanetos())
    }, [dispatch])


    return (
        <div>
            {console.log(pesoMin)}
            <h1>Crea un perro nuevo</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.nombre} name = "nombre" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="text" value={input.altura} name = "altura" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="text" value={input.peso} name = "peso" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Años:</label>
                    <input type="text" value={input.años} name = "años" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Imagen (opcional):</label>
                    <input type="text" value={input.imagen} name = "imagen" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>    
                    <select onChange={(e)=>handleSelect(e)}>
                        {temperamentos.map(elem=>(
                            <option key={elem.nombre}  value = {elem.nombre}>{elem.nombre}</option>
                        )
                        )}
                    </select>
                    {input.temperamentos.length? 
                        <div>
                        <ul><li>{input.temperamentos.map(elem =>elem + ", ")}</li></ul>
                        <button onClick={()=>popTemp()}>X</button>
                        </div>
                    :<div>nada</div>
                    }
                </div>
                <button type="submit">Crear perro</button>
            </form>

            <Link to="/home"><button>Volver</button></Link>
        </div>
    )
}