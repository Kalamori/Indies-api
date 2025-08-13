
export class BadRequestError extends Error {
  constructor (message) {
    super(message)
    this.name = 'BadRequestError'
    this.status = 400
    this.publicMessage = 'Bad Request'
  }
}

export class Unauthorized extends Error {
  constructor(message, field){
    super(message)
    this.name = 'Unauthorized'
    this.status = 401
    this.field = field
    this.publicMessage = 'Unauthorized'
  }
}

export class Forbidden extends Error {
  constructor(message, field){
    super(message)
    this.name = 'Forbidden'
    this.status = 403
    this.field = field
    this.publicMessage = 'Forbidden'
  }
}

export class NotFound extends Error {
  constructor(message, field){
    super(message)
    this.name = 'NotFound'
    this.status = 404
    this.field = field
    this.publicMessage = 'Resource not found'
  }
}

export class InvalidData extends Error {
    constructor(message, field) {
        super(message)
        this.name = 'InvalidData'
        this.status = 422
        this.field = field
        this.response = { [field] : message }
        this.publicMessage = 'Invalid Data Provided'
    }
}