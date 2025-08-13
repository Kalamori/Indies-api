
export class BadRequestError extends Error {
  constructor (message) {
    super(message)
    this.name = 'BadRequestError'
    this.status = 400
  }
}

export class Unauthorized extends Error {
  constructor(message, field){
    super(message)
    this.name = 'Unauthorized'
    this.status = 401
    this.field = field
  }
}

export class Forbidden extends Error {
  constructor(message, field){
    super(message)
    this.name = 'Forbidden'
    this.status = 403
    this.field = field
  }
}

export class NotFound extends Error {
  constructor(message, field){
    super(message)
    this.name = 'NotFound'
    this.status = 404
    this.field = field
  }
}

export class InvalidData extends Error {
    constructor(message, field) {
        super(message)
        this.name = 'Invalid Data'
        this.status = 422
        this.field = field
        this.response = { [field] : message }
    }
}