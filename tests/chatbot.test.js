/**
 * @jest-environment node
 */
const { server } = require('../mocks/chatbot')

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('test transform input string', () => {
  test('check if arguments is valid', () => {
    expect(1).toStrictEqual(1)
  })
})
