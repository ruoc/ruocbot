require('dotenv').config();
const Telegraf = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});
app.hears(/^.*(\/check|tín|Check|Tín|check|Check|Tin|tin).*$/gm, ctx => {
    var userName = ctx.message.match(/^@?([a-zA-Z0-9_]){1,15}$/);
    return ctx.match.join(' ');
});
app.startPolling();