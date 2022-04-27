import { NextFunction, Request, Response } from 'express';

// models
import User from '../modules/user';

const getAllUsers = (request: Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then((result:any) => {
            return res.status(200).json({
                result: result,
                count: result.length
            });
        })
        .catch((error:any) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { getAllUsers };