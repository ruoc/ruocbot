
require('dotenv').config();
const Extra = require('telegraf/extra')
const fs = require('fs')
const Telegraf = require('telegraf')
const axios = require('axios')
const bot = new Telegraf(process.env.BOT_TOKEN)
const cuteGif = 'https://www.reddit.com/r/asiangirlsbeingcute/random.json';
const sotiGif = 'https://www.reddit.com/r/AsiansGoneWild/random.json';
//boobbounce
bot.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    const ms = new Date() - start
    console.log('Response time %sms', ms)
  })
})

function getRandomPostMedia(ctx,url){
	var result = {type:"text"}
	axios.get(url)
	.then(function(res){
		try{
			if(typeof(res.data[0].data.children[0].data.media.oembed) !== 'undefined'){
				if(res.data[0].data.children[0].data.media.oembed.thumbnail_url.indexOf('.gif') > -1){
					ctx.replyWithAnimation(res.data[0].data.children[0].data.media.oembed.thumbnail_url)
				}else{
					ctx.replyWithPhoto(res.data[0].data.children[0].data.media.oembed.thumbnail_url);
				}
			}
		}catch(e){
			ctx.replyWithPhoto(res.data[0].data.children[0].data.url)
		}
	//	ctx.reply(res.data[0].data.children[0].data.url)
	})
}

bot.command('gai', (ctx) => getRandomPostMedia(ctx,cuteGif))
bot.command('soti', (ctx) => getRandomPostMedia(ctx,sotiGif))
bot.launch()
