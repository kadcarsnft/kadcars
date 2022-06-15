import { createContext, useState, useMemo } from "react";

const KadcarGarageContext = createContext();

const KadcarGarageContextProvider = ({ children }) => {
    const [selectedKadcar, setSelectedKadcar] = useState(null);

    const contextParameters = useMemo(() => {
        var parameters = {
            selectedKadcar,
            setSelectedKadcar
        }
        return parameters;
    }, [
        selectedKadcar, 
        setSelectedKadcar
    ]);

    return (
        <KadcarGarageContext.Provider value={contextParameters}>
            { children }
        </KadcarGarageContext.Provider>
    )
}

export {
    KadcarGarageContext,
    KadcarGarageContextProvider
}