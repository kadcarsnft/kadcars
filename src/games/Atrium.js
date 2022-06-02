import React from "react";
import classNames from "classnames";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";

const Atrium = () => {
    
    return (
        <div>
            <FeaturesTiles />
            <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
        </div>
    )
}

const atriumStyles = {
    backgroundColor:'blue',
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
}

export {
    Atrium
}