import React, {createContext, useState} from 'react';


export const SpinnerContext = createContext();


const SpinnerContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoaderState = (state) => {
        setIsLoading(state);
    }

    return (
        <SpinnerContext.Provider value = {{isLoading,setLoaderState}}>
            {props.children}
        </SpinnerContext.Provider>
    )
}


export default SpinnerContextProvider;