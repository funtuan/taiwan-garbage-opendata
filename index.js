
require('dotenv').config()
const Cron = require('croner')
const simpleGit = require('simple-git')
const processFunc = require('./process')

async function run() {
  console.log('running...')

  await processFunc()

  if (process.env.PUBLISH) {
    await simpleGit()
        .checkout('master')
        .branch(['-D', 'open-data'])
        .checkout(['--orphan', 'open-data'])
        .rm(['-rf', '.'])
        .add('data/*')
        .commit(`open-data: ${Date.now()}`)
        .push(['-f', 'origin', 'open-data'])
        .checkout('master')
        .catch((err) => console.error('failed: ', err))
  }

  console.log('done')
}

Cron('21 * * * *', run)
