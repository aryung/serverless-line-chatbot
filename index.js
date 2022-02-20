const axios = require('axios')
const admin = require("firebase-admin")
const urlencode = require('urlencode')
var jwt = require('jsonwebtoken')
const { handleEvent } = require('./lib/chatbot')
const {
  FIREBASE_DATABASE_URL,
  LINE_ISSUE_TOKE_ENDPOINT,
  LINE_REDIRECT_URI,
  LINE_CHANNEL_ID,
  LINE_CHANNEL_SECRET,
  LINE_TOKEN_BASE_URL,
  LINE_CODE_PATH,
  LINE_OAUTH_REDIRECT_TO_FRONTEND,
  LINE_NONCE,
  LINE_STATE,
  LINE_LOGIN_SCOPE,
  LINE_PROVIDER
} = require('./setting/config')

const { getFirebaseUser } = require('./lib/firebase_line_oauth')

var { FIREBASE_SERVICE_ACCOUNT } = require('../../config')

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
  databaseURL: FIREBASE_DATABASE_URL
})

exports.chatbot = async (req, res) => {
  try {
    // line message api
    const { destination, events } = req.body
    if (destination) {
      console.log('Destination User ID: ' + req.body.destination)
    }
    // req.body.events should be an array of events
    if (!Array.isArray(events)) {
      return res.status(500).end()
    }
    // handle events separately
    await Promise.all(events.map(handleEvent))

    res.end()

  } catch (err) {
    console.log('main err', err)
    Sentry.captureException(err)
    res.status(500).end()
  }
}

exports.login = async (req, res) => {
  try {
    var { data: respData } = await axios({
      "method": "POST",
      "url": LINE_ISSUE_TOKE_ENDPOINT,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${urlencode(LINE_REDIRECT_URI)}&client_id=${LINE_CHANNEL_ID}&client_secret=${LINE_CHANNEL_SECRET}`
    })

    var { access_token, expires_in, id_token, refresh_token, scope, token_type } = respData
    console.log('respData', respData)

    // 解開 id_token 的 user profile
    var { name, picture, email, sub: userId } = jwt.decode(id_token, LINE_NONCE)

    // Get / Set firebase User
    await getFirebaseUser({ id: userId, uid: userId, name, picture, email })
    // Create firebase custom token
    var token = await admin.auth().createCustomToken(userId)

    res.redirect(`${LINE_OAUTH_REDIRECT_TO_FRONTEND}?id_token=${token}`)
  } catch (err) {
    console.log('main err', err)
    Sentry.captureException(err)
    res.status(500).end()
  }
}

