import React, { useContext, useEffect }from "react";
import { useGetMyKadcars } from "../../pact/KadcarExtractor";
import { PactContext } from "../../pact/PactContextProvider";
import { SCREEN_NAMES, USER_KADCAR_GALLERY_LABEL } from "../../utils/Constants";
import { KadcarGameContext } from "./KadcarGameContextProvider";
import unknown from "../../assets/images/unknown.png"
import { KadcarCard } from "./kadcarCard/KadcarCard";
import { CardContainer, Separator } from "./kadcarCard/KadcarCardStyles";
import { KadcarCardGrid } from "./KadcarCardGrid";

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
    const { myKadcars } = useContext(KadcarGameContext);

    useEffect(() => {
        if (account === null) {
            return;
        } 

        //FETCH KADCARS HERE
        // const fetchKadcars = async () => {
            
        // }
        // fetchKadcars();
    }, [account]);

    return (
        <div>
            {
                account === null ?
                    <div>Please Connect Your Wallet</div> :
                    <KadcarCardGrid kadcars={myKadcars} gallery={USER_KADCAR_GALLERY_LABEL}/>
                    // <CardContainer>
                    //     {
                    //         myKadcars.map((kadcarNft, index) => {
                    //             console.log(kadcarNft)
                    //             return (
                    //                 <div key={index}>
                    //                     <KadcarCard kadcarNft={kadcarNft} />
                    //                 </div>
                    //             )
                    //         })
                    //     }
                    // </CardContainer>
            }
        </div>
    );
}

//This renders a gallery displaying all Kadcars currently in existence
const AllKadcarGallery = () => {
    const { allKadcars } = useContext(KadcarGameContext);

    return (
        <KadcarCardGrid kadcars={allKadcars}/>
    );
}

//This renders the flow where users can mint new Kadcars
const MintKadcarFlow = () => {
    return (
        <>
        </>
    )
}

// const KadcarCard = ({ base64, extraStyle }) => {
//     return (
//         <>

//         </>
//     )
// }

const MainHeaderScreenContainer = ({  }) => {
    const {currentScreen} = useContext(KadcarGameContext)

    useEffect(()=>{
    }, [currentScreen])

    return (
        <>
            { currentScreen === null && <DefaultScreen/> }
            { currentScreen === SCREEN_NAMES.MY_KADCARS && <MyKadcarGallery/> }
            { currentScreen === SCREEN_NAMES.ALL_KADCARS && <AllKadcarGallery/> }
            { currentScreen === SCREEN_NAMES.MINT_KADCAR && <MintKadcarFlow/> }
        </>
    )
}

export {
    KadcarCard,
    MyKadcarGallery,
    AllKadcarGallery,
    MainHeaderScreenContainer
}