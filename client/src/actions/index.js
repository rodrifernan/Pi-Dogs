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

export function filterByOrigin(payload){
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function getDogByName(payload){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs?name=" + payload)
            return dispatch({
                type: "GET_DOG_BY_NAME",
                payload: json.data
            })
        }catch(e){
            console.log("error en la busqueda")
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
        const json = await axios.get("http://localhost:3001/dogs/"+id)
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })
        }catch(e){
            console.log(e)
        }
    }
}

export function clearDetail(payload){
    return {
        type: 'CLEAR_DETAIL',
        payload
    }
}

export function postDog(payload){
    return async function (dispatch){
        const json = await axios.post("http://localhost:3001/dogs/", payload)
        return json
    }
}