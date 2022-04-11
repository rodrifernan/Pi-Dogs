import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function validate(input){
        let errors = {}
        //console.log("pesoMax=" + pesoMax)
        if(input.nombre.length < 4){
            errors.nombre = "El nombre debe tener al menos 4 letras"
        }
        if(parseFloat(pesoMin)>=parseFloat(pesoMax) || parseFloat(pesoMax)<=0 || parseFloat(pesoMin)<=0){
            errors.peso = "El peso minimo debe ser menor al maximo"
        }
        if(!parseFloat(pesoMax) || !parseFloat(pesoMin)){
            errors.pesoNum = "Los pesos deben ser numericos"
        }
        if(parseFloat(añosMin)>=parseFloat(añosMax) || parseFloat(añosMax)<=0 || parseFloat(añosMin)<=0){
            errors.años = "Los años minimos deben ser menores a los máximos"
        }
        if(!parseFloat(añosMax)|| !parseFloat(añosMin)){
            errors.añosNum= "Los años deben ser numéricos"
        }
        if(parseFloat(altMin)>=parseFloat(altMax) || parseFloat(altMax)<=0 || parseFloat(altMin)<=0){
            errors.alt = "La altura minima debe ser menor a la máxima"
        }
        if(!parseFloat(altMax)|| !parseFloat(altMin)){
            errors.altNum= "Las alturas deben ser numéricas"
        }
        if(input.temperamentos.length===0 || input.temperamentos.length > 5 ){
            errors.temperamentos = "Tiene que tener entre 1 y 5 temperamentos"
        }

        return errors
    }


    const [errors, setErrors] = useState({})

    const [pesoMin, setPesoMin] = useState(0)
    const [pesoMax, setPesoMax] = useState(0)
    const [altMin, setAltMin] = useState(0)
    const [altMax, setAltMax] = useState(0)
    const [añosMin, setAñosMin] = useState(0)
    const [añosMax, setAñosMax] = useState(0)

    const [input, setInput] = useState({
        nombre: "",
        altura:"",
        peso: "",
        años: "",
        temperamentos: [],
        imagen: ""
    })
    
    function handleSelect(e){
        if (!input.temperamentos.includes(e.target.value)) {
            setInput({
            ...input,
            temperamentos: [...input.temperamentos, e.target.value]
            })
            setErrors(validate({
                ...input,
                temperamentos: [...input.temperamentos, e.target.value]
            }))
            //console.log(errors)
        }
        
        //console.log(input.temperamentos)
    }

    
    useEffect(()=>{
        dispatch(getTemparemanetos())
    }, [dispatch])

    function mostrarTemps(){
        //var temps = input.temperamentos.map(elem =>elem + ", ")
        var temps = ""
        for (let i = 0; i < input.temperamentos.length; i++) {
            temps = temps+input.temperamentos[i]+", "
        }
        //console.log(temps)
        temps = temps.substring(0, temps.length-2)
        return temps
    }

    function deleteTemp(){
                /* const nuevosTemp = input.temperamentos
                nuevosTemp.pop()
                console.log(nuevosTemp) */
                setErrors(validate({
                    ...input,
                    temperamentos: []
                }))
                setInput({
                    ...input,
                    temperamentos: []
                })
        }

    function handleAltura(e){
        if(e.target.name==="alturaMin"){
            setAltMin(e.target.value)
            setInput({
                ...input,
                altura: e.target.value.toString()+" - "+altMax
            })
            setErrors(validate({
                ...input,
                altura: e.target.value.toString()+" - "+altMax
            }))
        }else{
            setAltMax(e.target.value)
            setInput({
                ...input,
                altura: altMin+" - "+ e.target.value.toString()
            })
            setErrors(validate({
                ...input,
                altura: altMin+" - "+ e.target.value.toString()
            }))
        }
    }
    
    function handlePeso(e){
        if(e.target.name==="pesoMin"){
            setPesoMin(e.target.value)
            setInput({
                ...input,
                peso: e.target.value.toString() + " - " + pesoMax
            })
            setErrors(validate({
                ...input,
                peso: e.target.value.toString() + " - " + pesoMax
            }))
        }else{
            //console.log(typeof e.target.value)
            setPesoMax(e.target.value)
            setInput({
                ...input,
                peso: pesoMin+" - "+ e.target.value.toString()
            })
            setErrors(validate({
                ...input,
                peso: pesoMin+" - "+ e.target.value.toString()
            }))
        }
    }

    function handleAños(e){
        if(e.target.name==="añosMin"){
            setAñosMin(e.target.value)
            //console.log(e.target.value)
            setInput({
                ...input,
                años: e.target.value.toString() + " - " + añosMax
            })
            setErrors(validate({
                ...input,
                años: e.target.value.toString() + " - " + añosMax
            }))
        }else{
            setAñosMax(e.target.value)
            setInput({
                ...input,
                años: añosMin+" - "+ e.target.value.toString()
            })
            setErrors(validate({
                ...input,
                años: añosMin+" - "+ e.target.value.toString()
            }))
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        if(Object.keys(errors).length!==0){
            //console.log(Object.keys(errors))
            return alert("Completar errores, perro no creado")
        }
        if(input.imagen === ""){
            var newInput ={
                altura: input.altura,
                años: input.años,
                nombre: input.nombre,
                peso: input.peso,
                temperamentos: input.temperamentos
            }
            //dispatchear con new input
            dispatch(postDog(newInput))
            //console.log(newInput)
            //console.log(input)

        }else{
            dispatch(postDog(input))
            //dispatch normal
        }
        setInput({
            nombre: "",
            altura:"",
            peso: "",
            años: "",
            temperamentos: [],
            imagen: ""
        })
        setAltMax(0)
        setAltMin(0)
        setPesoMax(0)
        setPesoMin(0)
        setAñosMax(0)
        setAñosMin(0)
        
        return alert('Perro creado')
    }

    return (
        <div>
            {/*console.log(pesoMin)*/}
            <h1>Crea un perro nuevo</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.nombre} name = "nombre" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Altura:</label>
                    <div>
                        <label>Minimo:</label>
                        <input type="number" value={altMin} min ="0" name = "alturaMin" onChange={(e)=>handleAltura(e)}/>
                        <label>Máximo:</label>
                        <input type="number" value={altMax} min ="0" name = "alturaMax" onChange={(e)=>handleAltura(e)}/>
                    </div>
                </div>
                <div>
                    <label>Peso:</label>
                    <div>
                        <label>Mínimo</label>
                        <input type="number" value={pesoMin} min ="0" name = "pesoMin" onChange={(e)=>handlePeso(e)}/>
                        <label>Máximo</label>
                        <input type="number" value={pesoMax} min ="0" name = "pesoMax" onChange={(e)=>handlePeso(e)}/>
                    </div>
                    
                </div>
                <div>
                    <label>Años:</label>
                    <div>
                        <label>Mínimo</label>
                        <input type="number" value={añosMin} min ="0" name = "añosMin" onChange={(e)=>handleAños(e)}/>
                        <label>Máximo</label>
                        <input type="number" value={añosMax} min ="0" name = "añosMax" onChange={(e)=>handleAños(e)}/>
                    </div>
                </div>
                <div>
                    <label>Imagen (opcional):</label>
                    <input type="text" value={input.imagen} name = "imagen" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Temperamentos:</label>
                    <select onChange={(e)=>handleSelect(e)}>
                        {temperamentos.map(elem=>(
                            <option key={elem.nombre}  value = {elem.nombre}>{elem.nombre}</option>
                        )
                        )}
                    </select>
                    {input.temperamentos.length? 
                        <div>
                        <ul><li>{mostrarTemps()}</li></ul>
                        <button onClick={()=>deleteTemp()}>X</button>
                        </div>
                    :<h4>Elegir temperamentos</h4>
                    }
                </div>
                <button disabled={!errors.length===0} type="submit">Crear perro</button>
            </form>

            {
                errors.nombre || errors.peso || errors.pesoNum || errors.años || errors.añosNum || errors.alt || errors.altNum || errors.temperamentos ?
                //console.log(errors.nombre)
                <ul>
                {Object.keys(errors).map( elem =>{
                    return(
                        <li>{errors[elem]}</li>
                    )
                    }
                )
                }
                </ul>
                :<p>No hay errores!</p> 
            }

            <Link to="/home"><button>Volver</button></Link>
        </div>
    )
}