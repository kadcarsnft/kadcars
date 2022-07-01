import React, { useContext, useEffect, useState } from "react";
import {
    CardWrapper,
    CardImageWrapper,
    CardImage,
    CardTextWrapper,
    CardTextTitle,
    CardTextBody,
    CardStatWrapper,
    CardStatLabel,
    CardModelText,
    LinkText,
    ExpandedCardWrapper,
    CardStatGrid,
    CardStatValue,
    CardVinWrapper,
    CardModelWrapper,
    CardVinText
} from "./KadcarCardStyles";
import Tilt from "react-parallax-tilt";
import { AiOutlineClose } from "react-icons/ai";
import unknown from "../../../assets/images/logo-nobackground.svg"
// import CAR from "../../../assets/images/kc.jpg"
import { KadcarGarageContext } from "../KadcarGarageContextProvider";
import { PactContext } from "../../../pact/PactContextProvider";
import { WalletModal } from "../../../walletInteractions/WalletModal";

// import logoPixelated from "../../../assets/images/kadcarsHomeCropped.png"

const KadcarCardExpanded = ({ kadcarNft, children }) => {
    const { setSelectedKadcar } = useContext(KadcarGarageContext);

    function handleCloseButtonClicked() {
        setSelectedKadcar(null);
    }

    return (
        <ExpandedCardWrapper>
            <div style={{ position: 'absolute' }}>
                <AiOutlineClose onClick={handleCloseButtonClicked} />
            </div>
            {children}
        </ExpandedCardWrapper>
    )
}

const KadcarCardStat = ({ label, value }) => {
    return (
        <CardStatGrid>
            <CardStatLabel>
                {label}:
            </CardStatLabel>
            <CardStatValue>
                {value}
            </CardStatValue>
        </CardStatGrid>
    )
}

const KadcarCard = ({ kadcarNft, blank }) => {
    const { account, isXwallet } = useContext(PactContext);
    const { setSelectedKadcar } = useContext(KadcarGarageContext);
    const [showWalletNameModal, setShowWalletNameModal] = useState(false);

    function handleCardClicked() {
        if (!blank && account !== null) {
            setSelectedKadcar(kadcarNft);
        }
    }

    return (
        <>
            <Tilt>
                {
                    blank ?
                        <CardWrapper onClick={handleCardClicked}>
                            <CardModelWrapper>
                                <CardModelText>
                                    ?
                                </CardModelText>
                            </CardModelWrapper>
                            <CardImageWrapper image={unknown} />
                            <CardVinWrapper>
                                <CardVinText>
                                    VIN# ?
                                </CardVinText>
                            </CardVinWrapper>
                            <CardStatWrapper>
                                <KadcarCardStat label={"Top Speed"} value={"? kmph"} />
                                <KadcarCardStat label={"Acceleration"} value={"? s"} />
                                <KadcarCardStat label={"Horse Pwr"} value={"? HP"} />
                                <KadcarCardStat label={"Torque"} value={"? Nm"} />
                                <KadcarCardStat label={"Drive Train"} value={"? WD"} />
                                <KadcarCardStat label={"Weight"} value={"? kg"} />
                            </CardStatWrapper>
                        </CardWrapper> :
                        <CardWrapper onClick={handleCardClicked}>
                            <CardModelWrapper>
                                <CardModelText>
                                    Kadcar K:2
                                </CardModelText>
                            </CardModelWrapper>
                            {/* <CardImageWrapper image={CAR}/> */}
                            <CardImageWrapper image={unknown} />
                            <CardVinWrapper>
                                <CardVinText>
                                    VIN# {kadcarNft['nft-id']}
                                </CardVinText>
                            </CardVinWrapper>
                            <CardStatWrapper>
                                <KadcarCardStat label={"Top Speed"} value={"? kmph"} />
                                <KadcarCardStat label={"Acceleration"} value={"? s"} />
                                <KadcarCardStat label={"Horse Pwr"} value={"? HP"} />
                                <KadcarCardStat label={"Torque"} value={"? Nm"} />
                                <KadcarCardStat label={"Drive Train"} value={"? WD"} />
                                <KadcarCardStat label={"Weight"} value={"? kg"} />
                            </CardStatWrapper>
                        </CardWrapper>
                }
            </Tilt>
            <WalletModal show={showWalletNameModal} setShow={setShowWalletNameModal} isXwallet={isXwallet} />
        </>

    );
}

export {
    KadcarCard,
    KadcarCardExpanded
}