FROM node:10

# Note: this installs the necessary libs to make the bundled version of Chromium that Pupppeteer
# installs, work.
RUN apt-get update && apt-get install -yq libx11-xcb1 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0 libnss3 libxss1

WORKDIR /src

# Bundle app source
COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["node", "index.js"]
