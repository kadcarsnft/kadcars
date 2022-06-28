//Network IDs
const MAINNET_NETWORK_ID = "mainnet01";
const TESTNET_NETWORK_ID = "testnet04";
const NETWORK_ID = TESTNET_NETWORK_ID;

//Default values
const DEFAULT_GAS_PRICE = 0.00000001;
const DEFAULT_GAS_LIMIT = 150000;
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
    // { value: 'K1', label: 'K1' },
    { value: 'K2', label: 'K:2' }
]

//Request response constants
const DEFAULT_REQUEST_HEADERS = { "Content-Type": "application/json" };
const POST_METHOD = "POST";
const GET_METHOD = "GET";

//Guards
const ACCOUNT_GUARD = "";

//Contract constants
const KADCAR_NFT_COLLECTION = "kadcars-nft-collection";

//Social URLs
const DISCORD_URL = "https://discord.gg/PPX9CupYZT";
const MEDIUM_URL = "https://medium.com/@kadcarsnft";
const TWITTER_URL = "https://twitter.com/kadcarsnft";
const KADCARS_URL = "https://kadcarsnft.app.runonflux.io/";
const MUSTANG_KNIGHTS_URL = "https://www.instagram.com/mustangknights/";
const FLUX_LABS_URL = "https://runonflux.io/fluxlabs.html?utm_campaign=%20Weekly%20Kadena%20Ecosystem%20Update&utm_medium=email&utm_source=Revue%20newsletter";

//Admin
const ADMIN_ADDRESS = "k:ccf45d4b9e7a05b1f8ae03e362fac9502610d239191a3215774c5251a662c1eb";

//Screen names
const SCREEN_NAMES = {
    MY_KADCARS  :  "MY_KADCARS",
    ALL_KADCARS :  "ALL_KADCARS",
    MINT_KADCAR :  "MINT_KADCAR",
}

//REGEX
const REGEX_FOR_NFT_ID = ".*([0-9]+:[0-9]+).*";

//Time
const S_TO_MS_MULTIPLIER = 1000;

//KDA API Calls
const KDA_CONNECT = 'kda_connect';
const KDA_GET_CHAIN = 'kda_getChain';
const KDA_DISCONNECT = 'kda_disconnect';
const KDA_GET_NETWORK = 'kda_getNetwork';
const KDA_CHECK_STATUS = 'kda_checkStatus';
const KDA_REQUEST_SIGN = 'kda_requestSign';
const KDA_REQUEST_ACCOUNT = 'kda_requestAccount';
const KDA_GET_SELECTED_ACCOUNT = 'kda_getSelectedAccount';

export {
    DEFAULT_GAS_LIMIT,
    S_TO_MS_MULTIPLIER,
    POLL_INTERVAL_S,
    KDA_CONNECT,
    SCREEN_NAMES,
    KDA_GET_CHAIN,
    KDA_DISCONNECT,
    KDA_GET_NETWORK,
    KDA_CHECK_STATUS,
    KDA_REQUEST_SIGN,
    KDA_REQUEST_ACCOUNT,
    KDA_GET_SELECTED_ACCOUNT,
    DEFAULT_CHAIN_ID,
    DEFAULT_GAS_PRICE,
    LOCAL_ACCOUNT_KEY,
    NETWORK_ID,
    LOCAL_CHAIN_ID,
    MAINNET_NETWORK_ID,
    TESTNET_NETWORK_ID,
    USER_KADCAR_GALLERY_LABEL,
    ALL_KADCAR_GALLERY_LABEL,
    KADCAR_NFT_COLLECTION,
    ADMIN_ADDRESS,
    IS_X_WALLET_KEY,
    DEFAULT_REQUEST_HEADERS,
    POST_METHOD,
    GET_METHOD,
    KADCAR_NFT_OPTIONS,
    REGEX_FOR_NFT_ID,
    TWITTER_URL,
    DISCORD_URL,
    FLUX_LABS_URL,
    MEDIUM_URL,
    MUSTANG_KNIGHTS_URL
}