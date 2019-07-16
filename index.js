const getNoddleScore = require('./lib')
const creds = require('./creds')

getNoddleScore({
  login: creds.login,
  pass: creds.pass,
}).then(score => {
  console.log('Report date:', score.report_data)
  console.log('Days until new:', score.updated_date)
  console.log('Score:', score.score)
})
