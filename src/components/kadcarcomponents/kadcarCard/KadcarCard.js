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

import unknown from "../../../assets/images/unknown.png"


const KadcarCard = ({ kadcarNft }) => {
    return (
        <Tilt style={{ marginLeft: '10px', marginRight: '10px' }}>
            <CardWrapper>
                <CardImage image={unknown} />
                <CardTextWrapper>
                    <CardTextDate>days</CardTextDate>
                    <CardTextTitle>Title</CardTextTitle>
                    <CardTextBody>
                        bullshitshti
                    </CardTextBody>
                </CardTextWrapper>
                <CardStatWrapper>
                    <CardStats>
                        Horse Power: { kadcarNft['nft-id'] }
                    </CardStats>
                    <CardStats>
                        Speed: { kadcarNft['speed'] } mph
                    </CardStats>
                    <CardStats>
                        Speed: { kadcarNft['experience'] } 
                    </CardStats>
                </CardStatWrapper>
            </CardWrapper>
        </Tilt>
    );
}

export {
    KadcarCard
}