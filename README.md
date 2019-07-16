[![Latest Stable Version](https://img.shields.io/npm/v/noddle-score.svg)](https://www.npmjs.com/package/noddle-score)
[![License](https://img.shields.io/npm/l/noddle-score.svg)](https://www.npmjs.com/package/noddle-score)
[![NPM Downloads](https://img.shields.io/npm/dt/noddle-score.svg)](https://www.npmjs.com/package/noddle-score)

# Collect credit score from noddle.co.uk

A simple way to collect your score from noddle.co.uk and new url creditkarma.co.uk

### Example result of work

```
Date: 01/05/2019
Score: 579
```

### Install

1. `git clone https://github.com/Toxblh/NoddleScore`
2. `cd NoddleScore`
3. `echo "module.exports = { login: 'YourL0gin', pass: 'YourPassw0rd'}" > creds.js`
4. `yarn` or `npm i`
5. `node ./index.js`
6. Your score already front of you

### Lib version

1. `npm i noddle-score`
2. Use

```js
const getNoddleScore = require('noddle-score')

getNoddleScore({
  login: creds.login,
  pass: creds.pass,
}).then(score => {
  console.log('Report date:', score.report_data)
  console.log('Days until new:', score.updated_date)
  console.log('Score:', score.score)
})
```
