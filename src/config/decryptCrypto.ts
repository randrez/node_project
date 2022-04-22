import CryptoJS from 'crypto-js';

export class DecryptCrypto {

    decrypt(keys: string, value: string): string {
        let decData = CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8)
        let bytes = CryptoJS.AES.decrypt(decData, keys).toString(CryptoJS.enc.Utf8)
        return JSON.parse(bytes)
    }

}