const HttpReponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpReponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpReponse.badRequest('email')
    } if (!password) {
      return HttpReponse.badRequest('password')
    }
    this.authUseCase.auth(email, password)
    return HttpReponse.unauthorizedError()
  }
}
