const express = require("express");
const router = express.Router();
const {Dog, Temperamento} = require('../db')
const axios = require ("axios")

router.get('/', async (req, res, next)=>{

    var razas = await axios.get('https://api.thedogapi.com/v1/breeds')
    razas = razas.data

    var temperamentos = []

    for (let i = 0; i < razas.length; i++) {
        if(razas[i].temperament){
            var aux = razas[i].temperament.split(', ')
            for (let j = 0; j < aux.length; j++) {
                if (!temperamentos.includes(aux[j])) {
                    /* await Temperamento.findOrCreate({
                        where: {nombre: aux[j]}
                    }) */
                    temperamentos.push(aux[j])
                }
            }
        }
    }
    //console.log(temperamentos)
    temperamentos = temperamentos.sort() // Los ordeno alfabeticamente (opcional pero lo prefiero yo)
    for (let i = 0; i < temperamentos.length; i++) {
        await Temperamento.findOrCreate({
            where: {nombre: temperamentos[i]}
        })
    }

    temperamentos = await Temperamento.findAll()    

    return res.send(temperamentos)
})


module.exports = router