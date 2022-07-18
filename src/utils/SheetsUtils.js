import { GoogleSpreadsheet } from "google-spreadsheet";
import { SERVICE_ACCOUNT_CLIENT_EMAIL, SERVICE_ACCOUNT_PRIVATE_KEY, WHITELIST_WINNERS_SHEET_ID, WHITELIST_WINNERS_SPREADSHEET_ID } from "../secrets/constants";

//Get the google spreadsheet document with the given ID and load the information
const getGoogleSpreadsheet = async (spreadsheetId) => {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    try {
        await doc.useServiceAccountAuth({
            client_email: SERVICE_ACCOUNT_CLIENT_EMAIL,
            private_key: SERVICE_ACCOUNT_PRIVATE_KEY
        });
        await doc.loadInfo();
        return doc;
    } catch (e) {
        console.log(e);
    }
}

//Get the sheet with the specified ID from the given spreadsheet
const getSheet = async (spreadsheetId, sheetId) => {
    try {
        const spreadsheet = await getGoogleSpreadsheet(spreadsheetId);
        return spreadsheet.sheetsById[sheetId];
    } catch (e) {
        console.log(e);
    }
}

//Get the specified sheet's rows
const getSheetRows = async (spreadsheetId, sheetId) => {
    try {
        const sheet = await getSheet(spreadsheetId, sheetId);
        const rows = await sheet.getRows();
        return rows;
    } catch (e) {
        console.log(e)
    }
}

export {
    getSheetRows
}