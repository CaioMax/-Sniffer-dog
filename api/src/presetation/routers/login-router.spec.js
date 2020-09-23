const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

describe('Login Router', () => {
  test('Return status 400 if not send email', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'whatever'
      }
    }
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('email'))
  })

  test('Return status 400 if not send password', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'test@test.com'
      }
    }
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('password'))
  })

  test('Return status 500 if not pass httpRequest', () => {
    const sut = new LoginRouter()
    const httpReponse = sut.route()
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Return status 500 if not pass httpRequest.body', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
  })
})
