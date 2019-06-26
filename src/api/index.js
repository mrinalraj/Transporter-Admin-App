import Axios from "axios"
import {
    BASE_API
} from "../res/Constants";


export default login = (contactNumber, password) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${BASE_API}/login`, {
                contactNo,
                password
            })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default signup = () => {
    return new Promise((resolve, reject) => {
        Axios.post(`${BASE_API}/signup`)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default verifyOtp 