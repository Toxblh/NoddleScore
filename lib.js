const puppeteer = require('puppeteer')

async function getNoddleScore({ login, pass }) {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://www.creditkarma.co.uk/account/sign-in', {
    waitUntil: 'networkidle2',
  })
  await page.waitFor(1000)
  await page.evaluate(
    (eLogin, ePass) => {
      document.querySelector('input#Username').value = eLogin
      document.querySelector('input#Password').value = ePass
      document.querySelector('input[type=submit]').click()
    },
    login,
    pass,
  )
  await page.waitForNavigation()

  const updated_date_element = await page.$('.account-summary-header__updated-date')
  const updated_date = await page.evaluate(
    element => element.textContent,
    updated_date_element,
  )
  const element = await page.$('.credit-score')
  const creditScore = await page.evaluate(element => element.textContent, element)

  const output = {
    updated_date: updated_date.slice(9),
    score: creditScore,
  }

  await browser.close()

  return output
}

module.exports = getNoddleScore
