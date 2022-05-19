import React from "react";
import {
    CardWrapper,
    CardImage,
    CardTextWrapper,
    CardTextDate,
    CardTextTitle,
    CardTextBody,
    CardStatWrapper,
    CardStats,
    LinkText
  } from "./KadcarCardStyles";
  import Tilt from "react-parallax-tilt";

import unknown from "../../../assets/images/logo-nobackground.svg"


const KadcarCard = ({ kadcarNft }) => {

    return (
        <Tilt>
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
    KadcarCard
}