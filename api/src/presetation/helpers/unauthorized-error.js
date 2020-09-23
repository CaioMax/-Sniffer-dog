module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized Acess')
    this.name = 'UnauthorizedError'
  }
}
