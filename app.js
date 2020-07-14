require('dotenv').config();
const Telegraf = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});
app.hears(/^.*(\/check|tín|Check|Tín|check|Check|Tin|tin).*$/, ctx => {
    var userName = ctx.message.text.match(/(?<=^|(?<=[^a-zA-Z0-9-_\.]))@([A-Za-z]+[A-Za-z0-9-_]+)/);
    console.log(ctx.message);
    if(userName){
        return ctx.reply(userName.join(' '));
    }
    return ctx.reply('deo tim thay username nao');
});
app.startPolling();