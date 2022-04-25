const jwt = require('jsonwebtoken')
import { DecryptCrypto } from '../config/decryptCrypto'
import { KEY } from '../config/constants'

const decryptService: DecryptCrypto = new DecryptCrypto()

export class MiddletareToken {

    static handleJWT(req: any, res: any, next: any) {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(token)
            const tokentDecrypt = decryptService.decrypt(KEY, token)
            jwt.verify(tokentDecrypt, 'secret_password', (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401)
        }
    }
}