require('dotenv').config();
const Telegraf = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});

app.startPolling();