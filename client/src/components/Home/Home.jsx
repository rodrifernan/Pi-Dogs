import {React, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { getDogs } from '../../actions'

export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector( (state) => state.dogs )
    const allTemperamentos = useSelector( (state) => state.temperamentos)


    useEffect(()=>{
        dispatch(getDogs())
    }, [dispatch])


    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
    }

    function handleSortNombre(e){

    }

    function handleSortPeso(e){

    }

    function handleFilterTemperamento(e){
        
    }

    function handleFilterOrigen(e){
        
    }



    return(
        <div>
            <Link to = '/createDog'>Crear Perro</Link>
            <h1>Perros</h1>
            <button onClick={e=>{handleClick(e)}}>Volver a cargar los Perros</button>
            <div>
            <select onChange={e=> handleSortNombre(e)} name = 'nombre'>              {/*Ordenar por nombre*/}
                    <option selected disabled>Ordenar Por Nombre</option>
                    <option value='desc'>A-Z</option>
                    <option value='asc'>Z-A</option>
                </select>
            </div>
            <select onChange={e=> handleSortPeso(e)} name='peso'>         {/*Ordenar por peso*/}
                <option selected disabled>Ordenar Por Peso</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
            </select>
            <select onChange={e => handleFilterTemperamento(e)} name = 'temperamento'>{/*Filtrar por Temperamento*/}
                    <option selected disabled>Filtrar por temperamento</option>
                    <option key={"Todos"}>Todos</option>
                    {allTemperamentos &&
                    allTemperamentos.map((temperamento) => {
                        return (
                            <option key={temperamento.nombre} value={temperamento.nombre}>
                            {temperamento.nombre}
                            </option>
                        );
                    })}
            </select>
            <select onChange={e => handleFilterOrigen(e)}>          {/*Filtrar por origen*/}
                    <option selected disabled>Filtrar por origen</option>
                    <option value='Todos'>Todos</option>
                    <option value='Creados'>Creados</option>
                    <option value='Api'>Existentes</option>
                </select>
        </div>
    )
}

