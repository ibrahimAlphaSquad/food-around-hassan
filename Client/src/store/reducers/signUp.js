//import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isError: false,
    token: ''
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        case "ERROR_OCCURED":
            return{
                ...state,
                isError: true
            }
        case "RECIEVED_TOKEN":
            return{
                ...state,
                token: action.token
            }
    }
}