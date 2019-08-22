
require('dotenv').config();
const Extra = require('telegraf/extra')
const fs = require('fs')
const Telegraf = require('telegraf')
const axios = require('axios')
const bot = new Telegraf(process.env.BOT_TOKEN)
const redditUrl = 'https://www.reddit.com/r/AsiansGoneWild/random.json';
bot.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    const ms = new Date() - start
    console.log('Response time %sms', ms)
  })
})

function getRandomPostMedia(){
	var result = {type:"text"}
	axios.get(redditUrl)
	.then(function(res){
		console.log(res.data[0].data.children.url)
	})
}

bot.command('gai', (ctx) => getRandomPostMedia())

bot.launch()