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
            <h5>{nombre.temperamentos.length>1 ? buildTemps(nombre.temperamentos):"Temperamentos: N/A"}</h5>
            <img src={nombre.imagen} onError={(e)=>{e.target.onerror = null; e.target.src="https://img.favpng.com/20/25/4/dog-paw-logo-cat-png-favpng-Z89TpBXQKbri6trMAcXqnNdJq.jpg"}} alt = "" width = "200px" length = "250px" />
        </div>
    )
}