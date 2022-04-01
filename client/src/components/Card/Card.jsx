import React from "react";

function buildTemps(temps){
    var texto = 'Temperamentos: '
    for (let i = 0; i < temps.length; i++) {
        if(temps[i].nombre){
            texto+= temps[i].nombre + ', '
        }else{
            texto+= temps[i] + ', '
        }
        
    }

    texto = texto.substring(0, texto.length-2)
    return texto
}



export function Card(nombre ){
    return(
        <div>
            <h3>Nombre: {nombre.nombre}</h3>
            <h5>{buildTemps(nombre.nombre)}</h5>
            <img src={nombre.imagen} alt ="img not found" width = "200px" length = "250px" />
        </div>
    )
}