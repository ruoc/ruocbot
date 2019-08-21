
const dotenv = require('dotenv');
const Extra = require('telegraf/extra')
const fs = require('fs')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    const ms = new Date() - start
    console.log('Response time %sms', ms)
  })
})


bot.command('gai', (ctx) => ctx.reply('Ok gai');

bot.on('text', (ctx) => ctx.reply('Hello World'))
bot.launch()