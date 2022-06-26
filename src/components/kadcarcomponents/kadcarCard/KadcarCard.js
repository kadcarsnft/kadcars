import React, { useContext } from "react";
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
                { label }:
            </CardStatLabel>
            <CardStatValue>
                { value }
            </CardStatValue>
        </CardStatGrid>
    )
}

const KadcarCard = ({ kadcarNft }) => {
    const { setSelectedKadcar } = useContext(KadcarGarageContext);

    function handleCardClicked() {
        setSelectedKadcar(kadcarNft);
        console.log(kadcarNft)
    }

    return (
        <Tilt>
            <CardWrapper onClick={handleCardClicked}>
                <CardModelWrapper>
                    <CardModelText>
                        Kadcar K:2
                    </CardModelText>
                </CardModelWrapper>
                {/* <CardImageWrapper image={CAR}/> */}
                <CardImageWrapper image={unknown}/>
                <CardVinWrapper>
                    <CardVinText>
                        VIN# { kadcarNft['nft-id'] }
                    </CardVinText>
                </CardVinWrapper>
                <CardStatWrapper>
                    <KadcarCardStat label={"Top Speed"} value={"270 kmph"}/>
                    <KadcarCardStat label={"Acceleration"} value={"3s"}/>
                    <KadcarCardStat label={"Horse Pwr"} value={"700 HP"}/>
                    <KadcarCardStat label={"Torque"} value={"850 Nm"}/>
                    <KadcarCardStat label={"Drive Train"} value={"4WD"}/>
                    <KadcarCardStat label={"Weight"} value={"1690 kg"}/>
                </CardStatWrapper>
            </CardWrapper>
        </Tilt>
    );
}

export {
    KadcarCard,
    KadcarCardExpanded
}