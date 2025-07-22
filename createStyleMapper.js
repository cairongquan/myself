const fs = require('fs');
const path = require('path');

const fileList = fs.readdirSync(path.join(__dirname, './src/style'));

let str = ''

fileList.forEach(file => {
  if (['.scss', '.css'].includes(path.extname(file)) && file !== 'index.scss') {
    str += `@import './${file}';\n`
  }
})

fs.writeFileSync(path.join(__dirname, './src/style/index.scss'), str)
