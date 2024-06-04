import jwt from'jsonwebtoken';
import MyError from'../exception/MyError.js';

const tokenUtils = {
    generateToken: async (data, tokenLife) => {
        if (!data) return null;
        return await jwt.sign(
            { ...data, createdAt: new Date() },
            process.env.JWT_KEY,
            {
                expiresIn: tokenLife,
            }
        );
    },
    verifyToken: async (token) => {
        if (!token) return new MyError('Token invalid');

        return await jwt.verify(token, process.env.JWT_KEY);
    },
};

export default tokenUtils;
