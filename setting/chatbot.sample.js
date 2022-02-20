const line = require('@line/bot-sdk')

const {
  BASE_URL: baseURL,
  PORT: port,
  CHANNEL_ACCESS_TOKEN,
  CHANNEL_SECRET,
  MESSAGE_NO_RESULT,
} = require('../../config')

const config = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET
}

// create LINE SDK client
const client = new line.Client(config)

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts]
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  )
}

// callback function to handle a single event
async function handleEvent(event) {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log('Test hook recieved: ' + JSON.stringify(event.message))
  }
  switch (event.type) {
    case 'message':
      const message = event.message
      switch (message.type) {
        case 'text':
          var resp = await fetchQueryStringResponse(event.message.text)
          console.log('resp payload', resp.payload)
          if (resp.data.length === 0) {
            return handleText({ ...message, text: MESSAGE_NO_RESULT }, event.replyToken, event.source)
          }
          // todo
          return handleAPIResponse(event.replyToken, resp, event.source)
        case 'image':
          return handleImage(message, event.replyToken)
        case 'video':
          return handleVideo(message, event.replyToken)
        case 'audio':
          return handleAudio(message, event.replyToken)
        case 'location':
          return handleLocation(message, event.replyToken)
        case 'sticker':
          return handleSticker(message, event.replyToken)
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`)
      }

    case 'follow':
      return replyText(event.replyToken, 'Got followed event')

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`)

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`)

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`)

    case 'postback':
      let data = event.postback.data
      if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
        data += `(${JSON.stringify(event.postback.params)})`
      }
      return replyPostback(event.replyToken, data)

    case 'beacon':
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`)

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`)
  }
}




module.exports = {
  handleEvent,
}