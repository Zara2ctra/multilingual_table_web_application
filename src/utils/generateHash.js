import CryptoJS from "crypto-js";

export function generateHash(record) {
    return CryptoJS.SHA3(
        `${record.index}${record.fullName}${record.address}${record.phone_number}`,
        {outputLength: 64})
        .toString(CryptoJS.enc.Hex);
}