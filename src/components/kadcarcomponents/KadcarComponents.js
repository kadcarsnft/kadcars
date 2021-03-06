import React, { useContext, useEffect, useState } from "react";
import { useGetMyKadcars } from "../../pact/KadcarExtractor";
import { PactContext } from "../../pact/PactContextProvider";
import { SCREEN_NAMES, SHEETS_WALLET_ADDRESS_LABEL, USER_KADCAR_GALLERY_LABEL } from "../../utils/Constants";
import { KadcarGameContext } from "./KadcarGameContextProvider";
import unknown from "../../assets/images/unknown.png"
import { KadcarCard } from "./kadcarCard/KadcarCard";
import { CardContainer, Separator } from "./kadcarCard/KadcarCardStyles";
import { KadcarCardGrid } from "./KadcarCardGrid";
import Image from "../elements/Image";
import Modal from "../elements/Modal";
import VIDEO from "../../assets/videos/neon.MP4";
import ReactPlayer from "react-player/lazy";
import { BsPlayCircle } from "react-icons/bs";
import THUMBNAIL from './../../assets/images/darkLogo.jpg'
import styled from "styled-components";
import Button from "../elements/Button";
import { getSheetRows } from "../../utils/SheetsUtils";
import { WHITELIST_WINNERS_SHEET_ID, WHITELIST_WINNERS_SPREADSHEET_ID } from "../../secrets/constants";

//This renders the default screen to render in the screen container before any actions are taken by the user
const DefaultScreen = () => {
    const [videoModalActive, setVideomodalactive] = useState(false);
    const [userWLCheckerInput, setUserWLCheckerInput] = useState("");
    const [wlInfoList, setWLinfoList] = useState([]);

    const openModal = (e) => {
        e.preventDefault();
        setVideomodalactive(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setVideomodalactive(false);
    }

    async function getWhitelistSpots() {
        // console.log(walletAddressForWhitelist)
        const rows = await getSheetRows(WHITELIST_WINNERS_SPREADSHEET_ID, WHITELIST_WINNERS_SHEET_ID);
        console.log(rows);

        const entries = rows.filter((row) => userWLCheckerInput === row[SHEETS_WALLET_ADDRESS_LABEL]);
    }   

    return (
        <div style={defaultScreenStyles}>
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                Start by connecting your X-Wallet to explore Kadcars
            </div>
            <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="100"
                style={{
                    width: '70%',
                    height: '70%',
                    alignSelf: 'center',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.9)'
                }}
            >
                {/* <a
                        data-video={VIDEO}
                        aria-controls="video-modal"
                        onClick={openModal}
                        width={'75%'}
                    >
                        <Image
                            className={"has-shadow"}
                            src={require('./../../assets/images/kadcarsHome.png')}
                            alt="Hero"
                            width={'100%'} />
                    </a> */}
                <ReactPlayer
                    playing
                    controls
                    url={VIDEO}
                    width={'100%'}
                    height={'100%'}
                    light={THUMBNAIL}
                    playIcon={<BsPlayCircle size={85} color={'white'}/>}
                />
            </div>
            <div style={{ 
                    width: '100%',
                    marginTop: '30px', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignSelf: 'center', 
                    alignItems: 'center',
                }}
                >
                <div 
                    style={{ 
                        width: '70%', 
                        display: 'flex',
                        flexDirection: 'row', 
                        justifyContent: 'flex-start'
                    }}
                >
                    Whitelist Spot Checker
                </div>
                <div 
                    style={{ 
                        width: '70%', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'center', 
                        alignSelf: 'center', 
                        alignItems: 'center',
                        marginTop: '10px'
                    }}
                >
                    <input
                        type="text"
                        placeholder="Wallet address: ex. k:1234..."
                        onChange={(input) => { setUserWLCheckerInput(input.target.value) }}
                        style={{ height: '45px', width: '65%', marginLeft: '15px', marginRight: '15px' }}
                    />
                    <Button color={'primary'} onClick={getWhitelistSpots}>
                        Submit
                    </Button>
                </div>
            </div>
            {/* <Modal
                    id="video-modal"
                    show={videoModalActive}
                    handleClose={closeModal}
                    video={VIDEO}
                    videoTag="iframe" /> */}
        </div>
    )
}

//This renders a gallery displaying all Kadcars currently owned by the user
const MyKadcarGallery = () => {
    const { account, iXwallet } = useContext(PactContext);
    const { myKadcars } = useContext(KadcarGameContext);


    useEffect(() => {
        if (account === null) {
            return;
        }

        //FETCH KADCARS HERE
    }, [account]);

    return (
        <>
            {
                account === null ?
                    // <div>Please Connect Your Wallet</div> :
                    <KadcarCardGrid disconnected={true}/> :
                    <KadcarCardGrid kadcars={myKadcars} gallery={USER_KADCAR_GALLERY_LABEL} />
            }
        </>
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


const MainHeaderScreenContainer = ({ }) => {
    const { currentScreen } = useContext(KadcarGameContext)

    useEffect(() => {
    }, [currentScreen])

    return (
        <div style={screenContainerStyles}>
            {currentScreen === null && <DefaultScreen />}
            {currentScreen === SCREEN_NAMES.MY_KADCARS && <MyKadcarGallery />}
            {currentScreen === SCREEN_NAMES.ALL_KADCARS && <AllKadcarGallery />}
            {currentScreen === SCREEN_NAMES.MINT_KADCAR && <MintKadcarFlow />}
        </div>
    )
}

const screenContainerStyles = {
    width: '100%',
    height: '575px',
    flexDirection: 'row', 
    justifyContent: 'center', 
    // backgroundColor:'red'
}

const defaultScreenStyles = {
    width: '100%',
    height: '575px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor:'blue'
}

const kadcarGalleryScreenStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '30px'
    // backgroundColor:'blue'
}

export {
    KadcarCard,
    MyKadcarGallery,
    AllKadcarGallery,
    MainHeaderScreenContainer
}