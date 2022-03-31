import axios from 'axios'

export function getDogs(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/dogs/')
    }
}