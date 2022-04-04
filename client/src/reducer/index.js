const initialState ={
    dogs: [],
    dogsCopy: [],
    temperamentos: []
}

function checkearTemps(array, payload){     //funcion auxiliar para filtrar por tipos
    var result = false
    for (let i = 0; i < array.length; i++) {
        if (array[i].nombre) {
            if (array[i].nombre === payload) {
                result = true
            }
        }else{
            return array.includes(payload)
        }
        
    }
    return result
}

function ordenarW(a, b, payload){
    //console.log("paso por aca")
    if(a.peso.length < 4){
        var arrayA = [a.peso, a.peso]
    }else{
        arrayA = a.peso.split(' - ')
    }
    arrayA = [parseFloat(arrayA[0]), parseFloat(arrayA[1])]
    if(b.peso.length < 4){
        var arrayB = [b.peso, b.peso]
    }else{
        arrayB = b.peso.split(' - ')
    }
    arrayB = [parseFloat(arrayB[0]), parseFloat(arrayB[1])]
    //console.log(arrayB)

    return payload === "asc" ? 
        arrayA[0] < arrayB[0] ? -1 : arrayA[0] > arrayB[0]? 1 : 0 
        
        :

        arrayA[1] > arrayB[1] ? -1 : arrayA[1] < arrayB[0]? 1 : 0
}



function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                dogsCopy: action.payload
            }

        case 'GET_TEMPERAMENTOS':
            return {
                ...state,
                temperamentos: action.payload
            }
        case 'FILTER_BY_TEMPERAMENTO':
            const allDogs = state.dogs
            const stateFiltered = action.payload === 'Todos' ? allDogs : allDogs.filter(elem => checkearTemps(elem.temperamentos, action.payload))
            return {
                ...state,
                dogsCopy: stateFiltered
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === "asc" ?
                state.dogsCopy.sort((a,b)=>{
                    if(a.nombre > b.nombre){
                        return 1
                    }
                    if(a.nombre < b.nombre){
                        return -1
                    }
                    return 0
                })
                :   state.dogsCopy.sort((a,b)=>{
                    if(a.nombre < b.nombre){
                        return 1
                    }
                    if(a.nombre > b.nombre){
                        return -1
                    }
                    return 0
                })
            return{
                ...state,
                dogsCopy : sortedArr
            }
        case 'ORDER_BY_WEIGHT':
            let sortedArr2 =state.dogsCopy.sort((a,b)=>{
                    return ordenarW(a, b, action.payload)
                    //console.log(ordenarW(a, b, action.payload))
                })
                /* :   state.dogsCopy.sort((a,b)=>{

                }) */
            return {
                ...state,
                dogsCopy : sortedArr2
            }
        case 'FILTER_BY_ORIGIN':
            const allDogs2 =state.dogs 
            var originFilter = []
            if (action.payload === "Todos") {
                originFilter = allDogs2
            }else if (action.payload === "Creados") {
                originFilter = allDogs2.filter(elem => elem.createdInDB)
            }else{
                originFilter= allDogs2.filter(elem=> !elem.createdInDB)
            }   
            return {
                ...state,
                dogsCopy: originFilter
            }
        case 'GET_DOG_BY_NAME':
            return{
                ...state,
                dogsCopy: action.payload
            }
        
        default : return state;
    }
} 

export default rootReducer