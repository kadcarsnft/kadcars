import React, { useContext } from "react";
import {
    CardWrapper,
    CardImage,
    CardTextWrapper,
    CardTextDate,
    CardTextTitle,
    CardTextBody,
    CardStatWrapper,
    CardStats,
    LinkText,
    ExpandedCardWrapper
  } from "./KadcarCardStyles";
import Tilt from "react-parallax-tilt";
import { AiOutlineClose } from "react-icons/ai";

import unknown from "../../../assets/images/logo-nobackground.svg"
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
            { children }
        </ExpandedCardWrapper>
    )
}

const KadcarCard = ({ kadcarNft }) => {
    const { setSelectedKadcar } = useContext(KadcarGarageContext);

    function handleCardClicked() {
        setSelectedKadcar(kadcarNft);
    }

    return (
        <Tilt>
            {/* <CardWrapper onClick={handleCardClicked}> */}
            <CardWrapper>
                <CardImage image={unknown} />
                <CardTextWrapper>
                    <CardTextDate>Model: K1</CardTextDate>
                    <CardTextTitle>#{ kadcarNft['nft-id'] }</CardTextTitle>
                    <CardTextBody>
                        Name
                    </CardTextBody>
                </CardTextWrapper>
                <CardStatWrapper>
                    <CardStats>
                        HP: 890
                    </CardStats>
                    <CardStats>
                        Speed: 100
                    </CardStats>
                    <CardStats>
                        Acceleration: 80
                    </CardStats>
                </CardStatWrapper>
            </CardWrapper>
        </Tilt>
    );
}

export {
    KadcarCard,
    KadcarCardExpanded
}