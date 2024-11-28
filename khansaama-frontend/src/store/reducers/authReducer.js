import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    isCustomer: false,
    isChef: false,
    data: null,
    account: null,
    user: {}
};

export default function registerUser(state= initialState, action)  {
    switch(action.type){
        case actionTypes.REGISTER_USER: 
        // console.log("Reducer" + user)
            return{
                ...state,
                user: action.payload
                
            };
        default:
            return state;
    }
}