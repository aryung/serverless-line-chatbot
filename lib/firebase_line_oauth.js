const admin = require("firebase-admin")

const { LINE_PROVIDER } = require('../../config')

async function getFirebaseUser(payload) {
  try {
    var { uid, name, picture, email } = payload
    const firebaseUid = `${LINE_PROVIDER}:${uid}`
    const uidExists = await admin.auth().getUser(firebaseUid).then(() => true).catch(() => false)
    var userRecord
    if (uidExists) {
      userRecord = await admin.auth().getUser(firebaseUid)
    } else {
      userRecord = await admin.auth().createUser({
        uid: firebaseUid,
        displayName: name,
        photoURL: picture,
        email: email
      })
    }
    return userRecord

  } catch (err) {
    return Promise.reject(err)
  }
}


module.exports = {
  getFirebaseUser
}