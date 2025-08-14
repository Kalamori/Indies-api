
const logError = (err) => {
  console.log('-----------------')
  console.log('🚨 Error 🚨')
  console.log('-----------------')
  console.log('Name:', err.name)
  console.log('Status:', err.status)
  console.log('Message:', err.message)
  console.log('-----------------')
  console.log('Stack:')
  console.log(err.stack)
  console.log('-----------------')
  console.log('The above error occurred during the below request:')
  console.log('')
}

const errorHandler = (err, req, res, next) => {
  logError(err)

  // Custom Validation Error (InvalidData)
  if (err.name === 'InvalidData') {
    return res.status(err.status).json({ message: err.message })
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const response = {}
    for (const keyName in err.errors) {
      response[keyName] = err.errors[keyName].properties.message
    }
    return res.status(400).json(response)
  }

  // Mongoose Cast Error (Invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ message: `Invalid ${err.path} format`})
  }

  // Bad Request Error
  if (err.status === 400 || err.name === 'BadRequestError') {
    return res.status(400).json({ message: err.message })
  }

  // Unauthorized
  if (err.status === 401 || err.name === 'Unauthorized' || err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: err.message })
  }

  // Forbidden
  if (err.status === 403 || err.name === 'Forbidden') {
    return res.status(403).json({ message: err.message })
  }

  // Not Found
  if (err.status === 404 || err.name === 'NotFound') {
    return res.status(404).json({ message: err.message })
  }

  // Unique constraints (field value already exists)
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const [keyName, keyValue] = Object.entries(err.keyValue)[0]
    return res.status(400).json({ 
      [keyName]: `${keyName[0].toUpperCase() + keyName.slice(1)} "${keyValue}" already taken. Please try another.`
    })
  }

  // Fall back for any other errors
  return res.status(500).json({ message: err.message || 'Internal Server Error' })
}

export default errorHandler