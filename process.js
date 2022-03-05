

const fs = require('fs')

module.exports = async () => {
  await fs.writeFileSync('./data/now.json', JSON.stringify({
    msg: 'hello world',
    timestamp: Date.now(),
  }))
}
