import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { PactContext } from '../../pact/PactContextProvider';
import { SCREEN_NAMES } from '../../utils/Constants';

const KadcarGameContext = createContext();

const KadcarGameContextProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState(null);
    const [myKadcars, setMyKadcars] = useState(null);
    const [allKadcars, setAllKadcars] = useState(null);
    const [allKadcarIds, setAllKadcarIds] = useState(null);
    const { account } = useContext(PactContext);
    const pricePerKadcar = 5; //TODO: change this!

    // Memoize the parameters of the game context to avoid having to retrieve the data on every render
    // but instead, only rerun them whenever the new data is different from the cached ones
    const contextParameters = useMemo(() => {
        var parameters = {
            currentScreen,
            myKadcars,
            allKadcars,
            allKadcarIds,
            pricePerKadcar,
            setMyKadcars,
            setAllKadcars,
            setAllKadcarIds,
            setCurrentScreen,
            calculateKadcarPrice
        }
        return parameters;
    }, [currentScreen,
        myKadcars,
        allKadcars,
        allKadcarIds,
        pricePerKadcar,
        setMyKadcars,
        setAllKadcars,
        setAllKadcarIds,
        setCurrentScreen,
    ]);

    //If account changed, reset the screen contents and cached kadcars
    useEffect(() => {
        if (account) {
            setMyKadcars(null);
            setCurrentScreen(null);
        }
    }, [account]);

    //Function to compute price of a kadcar given an amount
    function calculateKadcarPrice(amount) {
        return Math.round(pricePerKadcar * amount * 100) / 100;
    }

    return (
        <KadcarGameContext.Provider value={contextParameters}>
            { children }
        </KadcarGameContext.Provider>
    )
}

export {
    KadcarGameContext,
    KadcarGameContextProvider
}