import { Unauthorized } from "../utils/errors.js"

const admin = (...roles) => {
    return (req, res, next) => {
    try {
        if (!req.user) {
            throw new Unauthorized ('User not authenticated')
        }

        if (!roles.includes(req.user.role)) {
            throw new Unauthorized ('You do not have permission to access this route')
        }
        next()
    } catch (err) {
      next(err)
    }
  }     
}

export default admin