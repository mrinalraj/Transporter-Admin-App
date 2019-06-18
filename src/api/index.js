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
                // this.afterLogin(response.data)
                resolve(response)
            })
            .catch(error => {
                // Alert.alert("Error occured", JSON.stringify(error))
                reject(error)
            })
    })
}

export default signup = () => {
    return new Promise((resolve, reject) => {
        Axios.post(`${BASE_API}/signup`)
            .then(response => {
                // this.afterSignup(response.data)
                resolve(response)
            })
            .catch(error => {
                // console.log(error)
                reject(error)
            })
    })
}

export default verifyOtp 