const express = require("express");
const router = express.Router();
const {Dog, Temperamento} = require('../db')
const axios = require ("axios")



//********* Funciones *********

const getDogsDb = async () => {
    return await Dog.findAll({
        include:{
            model: Temperamento,
            attributes: ['nombre'],
            through: {
                attributes: []
            }
        }
    })
}

const getDogsApi = async () => {
    var dogs = await axios.get("https://api.thedogapi.com/v1/breeds")
    dogs = dogs.data
    var temperamentos =[]
    alldogs =[]
    dogs.map(elem =>{
        elem.temperament ? temperamentos = elem.temperament.split(', ') : temperamentos =[]
        alldogs.push({
            id : elem.id,
            nombre : elem.name,
            altura : elem.height.metric,
            peso : elem.weight.metric,
            años : elem.life_span,
            temperamentos : temperamentos,
            imagen : elem.image.url
        })
    })
    return alldogs
}


const getTodosDogs = async () => {
    const apiInfo = await getDogsApi()
    const dbInfo = await getDogsDb()
    const infoTotal = dbInfo.concat(apiInfo)
    return infoTotal
}


//********* Rutas ********* 
router.get('/', async (req, res, next)=>{
    const nombreQ = req.query.name
    const dogsTotales = await getTodosDogs()
    if(nombreQ){
        var dogBusc = dogsTotales.filter(elem => elem.nombre.toLowerCase().includes(nombreQ.toLowerCase()))
        dogBusc.length ? 
        res.status(200).send(dogBusc) :
        res.status(404).send("No hay raza de perro con ese nombre")
    }else{
        res.status(200).send(dogsTotales)
    }
})

router.get('/:idRaza', async (req, res, next)=>{
    const id = req.params.idRaza
    if(id.length < 5){
        const dogs = await getDogsApi()
    }else{
        const dogs = await getDogsDb()
    }
        const dog = dogs.filter(elem => elem.id === id)
    return res.status(200).json(dog)
})


router.post('/', async (req, res, next) => {

})

module.exports = router