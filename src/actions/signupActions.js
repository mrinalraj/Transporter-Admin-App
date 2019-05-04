import { SINGUP } from './types'

export const Signup = signupData => dispatch => {
    fetch('', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
        .then(res => res.json())
        .then(signupData =>
            dispatch({
                type: NEW_POST,
                payload: post
            })
        )
}