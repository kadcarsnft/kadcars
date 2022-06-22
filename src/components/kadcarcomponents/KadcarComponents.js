import React, { useContext, useEffect, useState } from "react";
import { useGetMyKadcars } from "../../pact/KadcarExtractor";
import { PactContext } from "../../pact/PactContextProvider";
import { SCREEN_NAMES, USER_KADCAR_GALLERY_LABEL } from "../../utils/Constants";
import { KadcarGameContext } from "./KadcarGameContextProvider";
import unknown from "../../assets/images/unknown.png"
import { KadcarCard } from "./kadcarCard/KadcarCard";
import { CardContainer, Separator } from "./kadcarCard/KadcarCardStyles";
import { KadcarCardGrid } from "./KadcarCardGrid";
import Image from "../elements/Image";
import Modal from "../elements/Modal";
import VIDEO from "../../assets/videos/neon.MP4"

//This renders the default screen to render in the screen container before any actions are taken by the user
const DefaultScreen = () => {
    const [videoModalActive, setVideomodalactive] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setVideomodalactive(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setVideomodalactive(false);
    }

    return (
        <div style={screenStyles}>
            <div style={{ width: '70%', height: '50%', flexDirection: 'row', display: 'flex' }}>
                <div style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <div style={{ justifyContent: 'center', alignContent: 'center' }}>
                        Welcome to the Kadcars NFT collection!
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        Start by connecting your X-Wallet to explore Kadcars
                    </div>
                    <div className="hero-figure reveal-from-bottom illustration-element-01">
                        <a
                            video-data={VIDEO}
                            aria-controls="video-modal"
                            onClick={openModal}
                        >
                            <Image
                                src={require('./../../assets/images/kadcarsHome.png')}
                                alt="Open" />
                        </a>
                    </div>

                    <Modal
                        id="video-modal"
                        show={videoModalActive}
                        handleClose={closeModal}
                        video={VIDEO}
                        videoTag="iframe" />
                </div>
            </div>
        </div>
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
        <div style={screenStyles}>
            {
                account === null ?
                    <div>Please Connect Your Wallet</div> :
                    <KadcarCardGrid kadcars={myKadcars} gallery={USER_KADCAR_GALLERY_LABEL} />
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
        <KadcarCardGrid kadcars={allKadcars} />
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

const MainHeaderScreenContainer = ({ }) => {
    const { currentScreen } = useContext(KadcarGameContext)

    useEffect(() => {
    }, [currentScreen])

    return (
        <>
            {currentScreen === null && <DefaultScreen />}
            {currentScreen === SCREEN_NAMES.MY_KADCARS && <MyKadcarGallery />}
            {currentScreen === SCREEN_NAMES.ALL_KADCARS && <AllKadcarGallery />}
            {currentScreen === SCREEN_NAMES.MINT_KADCAR && <MintKadcarFlow />}
        </>
    )
}

const screenStyles = {
    width: '100%',
    height: '60vh', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor:'blue'
}

export {
    KadcarCard,
    MyKadcarGallery,
    AllKadcarGallery,
    MainHeaderScreenContainer
}