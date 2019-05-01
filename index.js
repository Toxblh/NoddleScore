const puppeteer = require('puppeteer')
const creds = require('./creds')

async function getScore({ login, pass }) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.noddle.co.uk/account/sign-in', { waitUntil: 'networkidle2' })
  await page.waitFor(1000)
  await page.evaluate(
    (eLogin, ePass) => {
      document.querySelector('input#Username').value = eLogin
      document.querySelector('input#Password').value = ePass
      document.querySelector('input[type=submit]').click()
    },
    login,
    pass
  )
  await page.waitForNavigation()

  const updated_date_element = await page.$('.account-summary-header__updated-date')
  const updated_date = await page.evaluate(element => element.textContent, updated_date_element)
  const element = await page.$('.credit-score')
  const creditScore = await page.evaluate(element => element.textContent, element)

  const output = {
    updated_date: updated_date.slice(9),
    score: creditScore
  }

  await browser.close()

  return output
}

getScore({
  login: creds.login,
  pass: creds.pass
}).then(score => {
  console.log('Date:', score.updated_date)
  console.log('Score:', score.score)
})
