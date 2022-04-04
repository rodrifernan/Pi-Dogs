const express = require("express");
const router = express.Router();
const {Dog, Temperamento} = require('../db')
const axios = require ("axios")



//********* Funciones *********

const getDogsDb = async () => {
    var perrosDb = await Dog.findAll({
        include:{
            model: Temperamento,
            attributes: ['nombre'],
            through: {
                attributes: []
            }
        }
    })
    for (let i = 0; i < perrosDb.length; i++) {
        //console.log(perrosDb[i].temperamentos[i])
        var aux =[]
        perrosDb[i].temperamentos.map(elem =>{
            aux.push(elem.dataValues.nombre)
            //console.log(aux)

        })
        //console.log(perrosDb[i])
        //perrosDb[i].temperamentos = aux
        
    }
    //console.log(perrosDb) 
    return perrosDb
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
            peso : elem.weight.imperial,
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
router.get('/peso', async (req, res, next) =>{
    var dogs = await axios.get("https://api.thedogapi.com/v1/breeds")
    dogs = dogs.data
    var pesos = []
    dogs.map(elem =>{
        if(elem.weight.imperial.length < 4){}
        pesos.push(elem.weight.imperial)
    })
    res.status(200).send(pesos)
})
router.get('/', async (req, res, next)=>{
    const nombreQ = req.query.name
    const dogsTotales = await getTodosDogs()
    if(nombreQ){
        var dogBusc = dogsTotales.filter(elem => elem.nombre.toLowerCase().includes(nombreQ.toLowerCase()))
        dogBusc.length ? 
        res.status(200).send(dogBusc) :
        res.status(404).send("No hay raza de perro con ese nombre")
    }else{
        //console.log(dogsTotales[0].data)
        res.status(200).send(dogsTotales)
    }
})

router.get('/:idRaza', async (req, res, next)=>{
    const id = req.params.idRaza
    if(id < 300){
        const dogs = await getDogsApi()
        const dog = dogs.filter(elem => elem.id == id)
        return res.status(200).send(dog)
    }else{
        const dogs = await getDogsDb()
        const dog = dogs.filter(elem => elem.id == id)
        return res.status(200).send(dog)
    }
    
})


router.post('/', async (req, res, next) => {    //En el front hacer un handleChange para los 4 altura/peso min/max con un switch en e.target.name que pushee o unshiftee al string correspondiente
    let {
        nombre,
        altura,
        peso,
        años,
        temperamentos,
        imagen,
        createdInDB,
    }=req.body
    let perroCreado = {}
    if(imagen === ""){ // Saco la imagen para que quede null
        perroCreado = await Dog.create({
            nombre,
            altura,
            peso,
            años,
            createdInDB
        })
    }else{
        perroCreado = await Dog.create({
            nombre,
            altura,
            peso,
            años,
            imagen,
            createdInDB
        })
    }

    let tempDB = await Temperamento.findAll({
        where: {nombre: temperamentos}
    })

    perroCreado.addTemperamento(tempDB)
    res.send("Perro creado correctamente")

})

module.exports = router