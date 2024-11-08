import React, { useState } from 'react';

export const AuthContext = React.createContext();

const AuthContextProvider = props =>{
    const [customerToken, setCustomerToken] = useState('');
    const [customerId, setCustomerId] = useState('');

    const newCustomerToken = () =>setCustomerToken(customerToken);

    const newCustomerId = () => setCustomerId(setCustomerId);



    return(
      <AuthContext.Provider value = {{customerToken,customerId, newCustomerToken:newCustomerToken, newCustomerId:newCustomerId}}>
     {props.children}
        </AuthContext.Provider>

    );
}
export default AuthContextProvider;



/*
const AuthContext = React.createContext({
    const [customerToken, setCustomerToken] = useState('');
    const [customerId, setCustomerId] = useState('');
   
    settingCustomerToken: ()=,
    settingCustomerId: () => {}
});
return(
    <AuthContext.Provider  value = {{customerToken: customerToken, customerIdd: customerId, settingCustomerToken:settingCustomerToken, settingCustomerId: settingCustomerId}}>
    </AuthContext.Provider>
)
export default AuthContext;
*/