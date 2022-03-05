
const Cron = require('croner')
const simpleGit = require('simple-git')
const process = require('./process')

async function run() {
  console.log('running...')

  await simpleGit()
      .checkout('master')
      .branch(['-D', 'open-data'])
      .checkoutLocalBranch('open-data')

  await process()

  await simpleGit()
      .add('./data/*')
      .commit(`open-data: ${Date.now()}`)
      .push(['-f', 'origin', 'open-data'])
      .catch((err) => console.error('failed: ', err))

  console.log('done')
}

Cron('*/10 * * * * *', run)
