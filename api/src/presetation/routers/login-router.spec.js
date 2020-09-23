const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('Return status 400 if not send email', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpReponse = sut.route()
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Return status 500 if not pass httpRequest.body', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Verify if the params are correct abd valid', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'test@test.com',
        password: 'whatever'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Return 401 if the params are invalid', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'test_invalid@test.com',
        password: 'not_whatever'
      }
    }
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(401)
    expect(httpReponse.body).toEqual(new UnauthorizedError('password'))
  })
})
