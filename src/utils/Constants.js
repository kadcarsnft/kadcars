//Network IDs
const MAINNET_NETWORK_ID = "mainnet01";
const TESTNET_NETWORK_ID = "testnet04";
const NETWORK_ID = TESTNET_NETWORK_ID;

//Default values
const DEFAULT_GAS_PRICE = 0.00000001;
const DEFAULT_CHAIN_ID = "1";
const POLL_INTERVAL_S = 5;

//Labels
const USER_KADCAR_GALLERY_LABEL = "USER";
const ALL_KADCAR_GALLERY_LABEL = "ALL";

//Local account key
const LOCAL_ACCOUNT_KEY = "LOCAL_ACCOUNT_KEY";
const LOCAL_CHAIN_ID = "LOCAL_CHAIN_ID";

//X wallet indicator
const IS_X_WALLET_KEY = "IS_X_WALLET_KEY";

//Domain

//NFT Models
const KADCAR_NFT_OPTIONS = [
    { value: 'K1', label: 'K1' },
    { value: 'K2', label: 'K2' }
]

//Request response constants
const DEFAULT_REQUEST_HEADERS = { "Content-Type": "application/json" };
const POST_METHOD = "POST";
const GET_METHOD = "GET";

//Guards
const ACCOUNT_GUARD = "";

//Contract constants
const KADCAR_NFT_COLLECTION = "kadcars-nft-collection";

//Admin
const ADMIN_ADDRESS = "k:ccf45d4b9e7a05b1f8ae03e362fac9502610d239191a3215774c5251a662c1eb";

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
    POLL_INTERVAL_S,
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
    USER_KADCAR_GALLERY_LABEL,
    ALL_KADCAR_GALLERY_LABEL,
    KADCAR_NFT_COLLECTION,
    ADMIN_ADDRESS,
    IS_X_WALLET_KEY,
    DEFAULT_REQUEST_HEADERS,
    POST_METHOD,
    GET_METHOD,
    KADCAR_NFT_OPTIONS
}