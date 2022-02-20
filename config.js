const FIREBASE_SERVICE_ACCOUNT = {
  "type": "service_account",
  "project_id": "--google-project-id--",
  "private_key_id": "****************************************",
  "private_key": "*****",
  "client_email": "--service-account-email--",
  "client_id": "*********************",
  "auth_uri": "--check-oauth-version-https://accounts.google.com/o/oauth2/auth--",
  "token_uri": "--check-token-uri-https://oauth2.googleapis.com/token--",
  "auth_provider_x509_cert_url": "--check-cert-https://www.googleapis.com/oauth2/v1/certs--",
  "client_x509_cert_url": "--cert-url--"
}
const FIREBASE_DATABASE_URL = '--FIREBASE-DATABASE-URL--'
const FIREBASE_CONFIG = {
  apiKey: '***************************************',
  authDomain: '***********************************',
  databaseURL: '******************************************',
  projectId: '--project-id--',
  storageBucket: '--config-at-firebase--',
  messagingSenderId: '************',
  measurementId: '************'
}
const BASE_URL = 'http://localhost:8081'
const PORT = '--PORT--'
// Line Message API
const CHANNEL_ID = '**********'
const CHANNEL_SECRET = '********************************'
const CHANNEL_ACCESS_TOKEN = '****************************************************'
const API_ENDPOINT = '--API-ENDPOINT--'
const CHATBOT_API_ENDPOINT = '--API-ENDPOINT--'
const WEB_ENDPOINT = '--API-ENDPOINT--'
const MESSAGE_NO_RESULT = '您的資料計算沒有結果，再換個試試'
const MESSAGE_ERROR_INPUT_FORMAT = '輸入格式錯誤'
const CAROUSEL_SIZE = 5

// Line Login
const LINE_REDIRECT_URI = '--REDIRECT-ENDPOINT--' // need to update
const LINE_ISSUE_TOKE_ENDPOINT = '--ISSUE-TOKEN-ENDPOINT--'
const LINE_CHANNEL_ID = '**********'
const LINE_CHANNEL_SECRET = '********************************'
const LINE_TOKEN_BASE_URL = '--TOKEN-ENDPOINT--'
const LINE_CODE_PATH = '/oauth2/v2.1/token'
const LINE_LOGIN_SCOPE = 'profile openid email'
const LINE_NONCE = '**********'
const LINE_STATE = '******'
const LINE_OAUTH_REDIRECT_TO_FRONTEND = '--REDRECT-ENDPOINT--'
const LINE_PROVIDER = 'LINE'

module.exports = {
  FIREBASE_SERVICE_ACCOUNT,
  FIREBASE_DATABASE_URL,
  FIREBASE_CONFIG,
  BASE_URL,
  PORT,
  CHANNEL_ID,
  CHANNEL_SECRET,
  CHANNEL_ACCESS_TOKEN,
  buttonsImageURL,
  API_ENDPOINT,
  CHATBOT_API_ENDPOINT,
  WEB_ENDPOINT,
  MESSAGE_NO_RESULT,
  MESSAGE_ERROR_INPUT_FORMAT,
  CAROUSEL_SIZE,
  DEFAULT_EPAY,
  DEFAULT_TICKET,
  DEFAULT_SCENARIO,
  DEFAULT_READGY,
  QA_URL,
  LINE_ISSUE_TOKE_ENDPOINT,
  LINE_REDIRECT_URI,
  LINE_CHANNEL_ID,
  LINE_CHANNEL_SECRET,
  LINE_TOKEN_BASE_URL,
  LINE_CODE_PATH,
  LINE_LOGIN_SCOPE,
  LINE_NONCE,
  LINE_STATE,
  LINE_OAUTH_REDIRECT_TO_FRONTEND,
  LINE_PROVIDER
}