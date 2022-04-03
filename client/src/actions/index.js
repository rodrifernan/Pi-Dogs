import axios from 'axios'

export function getDogs(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/dogs/')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}


export function getTemparemanetos(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/temperament')
        return dispatch({
            type: 'GET_TEMPERAMENTOS',
            payload : json.data
        })
    }
}

export function filterDogsByTemperament(payload){
    return {
        type: 'FILTER_BY_TEMPERAMENTO',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}