import {
    BAD_REQUEST_STATUS_CODE,
    BAD_REQUEST_STATUS_MESSAGE,
    INTERNAL_SERVER_MESSAGE,
    INTERNAL_SERVER_STATUS_CODE,
    NOT_FOUND_STATUS_CODE,
    NOT_FOUND_STATUS_MESSAGE,
} from '../config/constants';

import { BadRequestException, NotFoundException, ServerException } from '../custom.errors';

export class MiddlewaresError {

    static handleRequestError(error: any, req: any, res: any, next: any) {
        switch (true) {
            case (error instanceof NotFoundException):
                res.status(NOT_FOUND_STATUS_CODE).json({
                    success: false, error: NOT_FOUND_STATUS_MESSAGE, statusCode: NOT_FOUND_STATUS_CODE,
                })
                break
            case (error instanceof ServerException):
                res.status(INTERNAL_SERVER_STATUS_CODE).json({
                    success: false, error: INTERNAL_SERVER_MESSAGE, statusCode: INTERNAL_SERVER_STATUS_CODE,
                })
                break
            case (error instanceof BadRequestException):
                res.status(BAD_REQUEST_STATUS_CODE).json({
                    success: false, error: BAD_REQUEST_STATUS_MESSAGE, statusCode: BAD_REQUEST_STATUS_CODE,
                })
                break
            default:
                res.status(INTERNAL_SERVER_STATUS_CODE).json({
                    success: false, error: INTERNAL_SERVER_MESSAGE, statusCode: INTERNAL_SERVER_STATUS_CODE,
                })
        }
        console.log('Error', 'Request handle error!!', error)
        res.end()
    }
}

