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
            return ''
        
        default : return state;
    }
} 

export default rootReducer