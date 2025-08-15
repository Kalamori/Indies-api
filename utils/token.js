import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
            { 
              user: {
               _id: user._id,
               username: user.username,
               role: user.role
            }
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '2d'}
        )
}