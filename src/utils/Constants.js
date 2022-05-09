//Network IDs
const MAINNET_NETWORK_ID = "mainnet01";
const TESTNET_NETWORK_ID = "testnet04";
const NETWORK_ID = TESTNET_NETWORK_ID;

//Default values
const DEFAULT_GAS_PRICE = 0.00000001;
const DEFAULT_CHAIN_ID = "5";

//Local account key
const LOCAL_ACCOUNT_KEY = "LOCAL_ACCOUNT_KEY";
const LOCAL_CHAIN_ID = "LOCAL_CHAIN_ID";

//Screen names
const SCREEN_NAMES = {
    MY_KADCARS  :  "MY_KADCARS",
    ALL_KADCARS :  "ALL_KADCARS",
    MINT_KADCAR :  "MINT_KADCAR",
}

//KDA API Calls
const KDA_CONNECT = 'kda_connect';
const KDA_DISCONNECT = 'kda_disconnect';
const KDA_CHECK_STATUS = 'kda_checkStatus';
const KDA_REQUEST_SIGN = 'kda_requestSign';
const KDA_REQUEST_ACCOUNT = 'kda_requestAccount';
const KDA_GET_SELECTED_ACCOUNT = 'kda_getSelectedAccount';

export {
    KDA_CONNECT,
    SCREEN_NAMES,
    KDA_DISCONNECT,
    KDA_REQUEST_SIGN,
    KDA_CHECK_STATUS,
    DEFAULT_CHAIN_ID,
    DEFAULT_GAS_PRICE,
    LOCAL_ACCOUNT_KEY,
    NETWORK_ID,
    LOCAL_CHAIN_ID,
    MAINNET_NETWORK_ID,
    TESTNET_NETWORK_ID,
    KDA_REQUEST_ACCOUNT,
    KDA_GET_SELECTED_ACCOUNT,
}