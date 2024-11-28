import axios from 'axios';
import * as actionTypes from './actionTypes';


// export const userRegistration = userData => {
//     return{
//         type: actionTypes.REGISTER_USER,
//         result: userData
//     }
// }
export  const registerUser = (userData,history) => dispatch =>{
    console.log(userData)
    axios
        .post("http://localhost:3002/user/signUp", userData)
        .then(res => {
            console.log("Reached Actions" +res.data)
            // dispatch(userRegistration())
          })
        .catch(err => {
            console.log(err)
        });
};