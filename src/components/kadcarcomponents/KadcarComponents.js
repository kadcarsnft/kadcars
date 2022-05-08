import React from "react";
import { useContext, useEffect } from "react/cjs/react.production.min";
import { useGetMyKadcars } from "../../pact/KadcarExtractor";
import { PactContext } from "../../pact/PactContextProvider";
import { SCREEN_NAMES } from "../../utils/Constants";
import { KadcarGameContext } from "./KadcarGameContext";


//This renders the default screen to render in the screen container before any actions are taken by the user
const DefaultScreen = () => {
    return (
        <>
        </>
    )
}

//This renders a gallery displaying all Kadcars currently owned by the user
const MyKadcarGallery = () => {
    const { account } = useContext(PactContext);
    const { myKadcars, setMyKadcars } = useContext(KadcarGameContext);
    const getMyKadcars = useGetMyKadcars();

    useEffect(() => {
        if (account === null) {
            return;
        } 

        //FETCH KADCARS HERE
        const fetchKadcars = async () => {
            
        }
        fetchKadcars();
    }, [account]);

    return (
        <>
        {
            account === null ?
            <div>Please Connect Your Wallet</div> :
            <div>
                
            </div>
        }
        </>
    );
}

//This renders a gallery displaying all Kadcars currently in existence
const AllKadcarGallery = () => {
    return (
        <>
        </>
    );
}

//This renders the flow where users can mint new Kadcars
const MintKadcarFlow = () => {
    return (
        <>
        </>
    )
}

const KadcarCard = ({ base64, extraStyle}) => {
    return (
        <img
            src={`data:image/png;base64,${base64}`}
        />
    )
}

const MainHeaderScreenContainer = () => {
    const { currentScreen } = useContext(KadcarGameContext);

    return (
        <div>
            { currentScreen === null && DefaultScreen }
            { currentScreen === SCREEN_NAMES.MY_KADCARS && MyKadcarGallery }
            { currentScreen === SCREEN_NAMES.ALL_KADCARS && AllKadcarGallery }
            { currentScreen === SCREEN_NAMES.MINT_KADCAR && MintKadcarFlow }
        </div>
    )
}

export {
    KadcarCard,
    MyKadcarGallery,
    AllKadcarGallery,
    MainHeaderScreenContainer
}