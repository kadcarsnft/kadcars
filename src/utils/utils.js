import React from "react";

//Check if given variable is null or undefined
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

//Load variable from local storage with given key
function tryLoadLocal(key) {
    let val = localStorage.getItem(key);
    if (val == null) {
        return null;
    }
    try {
        return JSON.parse(val);
    } catch (e) {
        console.log(e);
        return null;
    }
}

//Save variable in local storage with given key
function trySaveLocal(key, val) {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        console.log(e);
        return;
    }
}

//Generic method to create http requests
function makeRequest(method, headers, cmd) {
    var body;
    cmd ? body = JSON.stringify(cmd) : body = "";

    return {
        headers: headers,
        method: method,
        body: body,
    };
}

function mkReq(cmd) {
    console.log(cmd)
    console.log(JSON.stringify(cmd))
    return {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(cmd),
    };
  }

//Generic async function to parse an http response
async function parseResponse(raw) {
    const rawRes = await raw;
    const res = await rawRes;
    if (res.ok) {
        const resJSON = await rawRes.json();
        return resJSON;
    } else {
        const resTEXT = await rawRes.text();
        return resTEXT;
    }
}

//Returns the genesis date and time
function creationTime() {
    return Math.round(new Date().getTime() / 1000) - 10;
}

//Custom wait function for any timed actions
const wait = async (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

export {
    wait,
    parseResponse,
    makeRequest,
    creationTime,
    tryLoadLocal,
    trySaveLocal,
    checkIfNullOrUndefined,
    mkReq
}