const { rest } = require('msw')
const { setupServer } = require('msw/node')
const { CHATBOT_API_ENDPOINT } = require('../../config')

const handlers = [
  rest.get(CHATBOT_API_ENDPOINT, (req, res, ctx) => {
    res.status = 200
    return res(
      ctx.json({
        data: []
      })
    )
  }),
]

const server = setupServer(...handlers)

module.exports = {
  server
}
