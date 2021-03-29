import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/////PROTECTED ROUTES, ONLY USERS WITH VALID TOKENS/////
export const protectRoute = asyncHandler(async (req, res, next) => {
    let token;
    //Check whether an authorization header with added with the token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Verify whether the supplied token matches a user
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            res.status(401);
            throw new Error('Could not verify user identity');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized');
    }
    next();
});

/////ADMIN ROUTES/////
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('You need administrator permission to access this');
    }
};