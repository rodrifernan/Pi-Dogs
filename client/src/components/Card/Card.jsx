import React from "react";

function buildTemps(temps){
    var texto = 'Temperamentos: '
    for (let i = 0; i < temps.length; i++) {
        if(temps[i].nombre){                        //diferenciar creados de api, el back es una chotada
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
            <h5>{buildTemps(nombre.temperamentos)}</h5>
            <img src={nombre.imagen} alt ="img not found" width = "200px" length = "250px" />
        </div>
    )
}