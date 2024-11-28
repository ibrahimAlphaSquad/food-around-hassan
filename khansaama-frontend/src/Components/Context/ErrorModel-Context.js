import React from 'react';

const ErrorContext = props => React.createContext({
    isError: false,
});

export default ErrorContext;