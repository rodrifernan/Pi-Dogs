import {React, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { getDogs, getTemparemanetos, filterDogsByTemperament, orderByName, orderByWeight, filterByOrigin } from '../../actions'
import { Card } from '../Card/Card'
import SearchBar from '../SearchBar/SearchBar'
import Paginado from '../Paginado/Paginado'


export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector( (state) => state.dogsCopy )
    const allTemperamentos = useSelector( (state) => state.temperamentos)
    //para el ordenamiento
    const [orden, setOrden]=useState('')
    //para el paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage,{/* setDogsPerPage*/}] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getDogs())
        dispatch(getTemparemanetos())
    }, [dispatch])


    function handleClick(e){    //Listo
        e.preventDefault()
        dispatch(getDogs())
        setCurrentPage(1)
    }

    function handleSortNombre(e){   //Listo
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortPeso(e){         //Listo
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterTemperamento(e){   //Listo
        e.preventDefault()
        dispatch(filterDogsByTemperament(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterOrigen(e){
        e.preventDefault()
        dispatch(filterByOrigin(e.target.value))
        setCurrentPage(1)
    }



    return(
        <div>
            <Link to = '/createDog'>Crear Perro</Link>
            <h1>Perros</h1>
            <button onClick={e=>{handleClick(e)}}>Volver a cargar los Perros</button>
            <div>
            <select onChange={e=> handleSortNombre(e)} name = 'nombre'>              {/*Ordenar por nombre*/}
                    <option selected disabled>Ordenar Por Nombre</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
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
            <SearchBar/>
            <Paginado dogsPerPage ={dogsPerPage} allDogs = {allDogs.length} paginado = {paginado}/>
            {
                currentDog?.map( elem=>{
                    return (
                    <div>
                        <Link to={"/home/" + elem.id}>
                        <Card nombre={elem.nombre} imagen ={elem.imagen} temperamentos = {elem.temperamentos}/>
                        </Link>
                    </div>)}
                )
            }
        </div>
    )
}

