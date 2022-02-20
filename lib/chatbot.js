const line = require('@line/bot-sdk')
const firebase = require('firebase')

const {
  BASE_URL,
  PORT,
  FIREBASE_CONFIG,
  CHANNEL_ACCESS_TOKEN,
  CHANNEL_SECRET,
} = require('../setting/config')

const config = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET
}

// create LINE SDK client
const client = new line.Client(config)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG)

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
  // console.log('event', event)
  await firebase.database().ref(`/line/${event.source.userId}/${event.timestamp}/text`).set(event.message.text)
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log('Test hook recieved: ' + JSON.stringify(event.message))
  }
  switch (event.type) {
    case 'message':
      const message = event.message
      switch (message.type) {
        case 'text':

        // do something 
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`)
      }

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`)
  }
}


module.exports = {
  handleEvent
}