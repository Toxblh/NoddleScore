const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(pluginStealth())

async function getNoddleScore({ login, pass }) {
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const page = await browser.newPage()
  await page.goto('https://www.creditkarma.co.uk/account/sign-in', {
    waitUntil: 'networkidle2',
  })
  await page.setViewport({
    width: 1920,
    height: 1080,
  })
  await page.waitFor(1000)
  await page.evaluate(
    (eLogin, ePass) => {
      document.querySelector('input[type=text]').value = eLogin
      document.querySelector('input[type=password]').value = ePass
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

  await page.goto('https://www.creditkarma.co.uk/credit-report', {
    waitUntil: 'networkidle2',
  })

  let xpathDate = await page.$x('//*[@id="cr-expires-in-next-days-text"]/strong')
  let xpathTextContent = await xpathDate[0].getProperty('textContent')
  let daysToNew = await xpathTextContent.jsonValue()

  const output = {
    updated_date: daysToNew,
    report_date: updated_date.slice(9),
    score: creditScore,
  }

  await browser.close()

  return output
}

module.exports = getNoddleScore
