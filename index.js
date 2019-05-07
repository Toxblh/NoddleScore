const getNoddleScore = require('./lib')
const creds = require('./creds')

getNoddleScore({
  login: creds.login,
  pass: creds.pass
}).then(score => {
  console.log('Date:', score.updated_date)
  console.log('Score:', score.score)
})
