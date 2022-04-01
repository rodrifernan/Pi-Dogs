const initialState ={
    dogs: [],
    temperamentos: []
}




function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload
            }

        case 'GET_TEMPERAMENTOS':
            return {
                ...state,
                temperamentos: action.payload
            }
        
        
        
        default : break
    }
} 

export default rootReducer