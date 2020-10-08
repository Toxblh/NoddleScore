const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(pluginStealth())

async function getNoddleScore({ login, pass }) {
  let userReport

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('https://www.creditkarma.co.uk/account/sign-in', {
    waitUntil: 'networkidle2',
  })
  await page.setViewport({
    width: 1920,
    height: 1080,
  })

  page.on('response', (response) => {
    if (response.url() === 'https://www.creditkarma.co.uk/graphql') {
      response.json().then((report) => {
        if (report !== undefined) {
          if (report.data !== undefined) {
            if (report.data.creditReports !== undefined) {
              if (report.data.creditReports.scoreHistory !== undefined) {
                userReport = report
              }
            }
          }
        }
      })
    }
  })

  await page.waitForTimeout(1000)

  await page.click('#modal-root > div > div > div:nth-child(2) > div > button')
  await page.type('input[type=text]', login)
  await page.type('input[type=password]', pass)
  await page.click('button[type=submit]')

  await page.waitForTimeout(3000)

  const output = {
    updated_date: 'every week',
    report_date: userReport.data.creditReports.scoreHistory.scores[0].generatedDateTime,
    score: userReport.data.creditReports.scoreHistory.scores[0].score,
  }

  await browser.close()

  return output
}

module.exports = getNoddleScore
