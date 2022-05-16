import React from "react";

function checkIfNullOrUndefined(variable) {
    if (variable === undefined || 
        variable === null || 
        variable === 'undefined' || 
        variable === 'null' || 
        variable === "") {
        return true;
    } 
    return false;
}

export {
    checkIfNullOrUndefined
}