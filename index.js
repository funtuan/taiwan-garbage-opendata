
require('dotenv').config()
const Cron = require('croner')
const simpleGit = require('simple-git')
const process = require('./process')

async function run() {
  console.log('running...')

  await process()

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

Cron('30 44 * * * *', run)
