import React, { useState } from 'react';

export const ErrorContext = React.createContext();

const ErrorContextProvider = props =>{
   const [errorOccured,setErrorOccured]= useState(false)

   const errorManagement = () =>setErrorOccured(errorOccured)

    return(
        <ErrorContext.Provider value = {{errorOccured, errorManagement:errorManagement}}>
        {props.children}
        </ErrorContext.Provider>

    );
}
export default ErrorContextProvider;

