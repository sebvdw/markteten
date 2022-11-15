import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '5000s' });
}