import React from "react";
import { useGetMyKadcars } from "../../pact/KadcarExtractor";

const MyKadcarGallery = () => {
    return (
        <>
        </>
    );
}

const AllKadcarGallery = () => {
    return (
        <>
        </>
    );
}

const KadcarCard = ({ base64, extraStyle}) => {
    return (
        <img
            src={`data:image/png;base64,${base64}`}
        />
    )
}

export {
    KadcarCard,
    MyKadcarGallery,
    AllKadcarGallery
}