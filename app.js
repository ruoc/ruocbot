require('dotenv').config();
const Telegraf = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);

function filterUsername(names){
    var copyItems = []
    // before
    for (let i = 0; i < names.length; i++) {
        if(names[i].includes('@')) copyItems.push(names[i])
    }

}

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});

app.hears(/^.*(\/check|tín|Check|Tín|check|Check|Tin|tin).*$/, ctx => {
    var userName = ctx.message.text.match(/@([\w]+)/);
    console.log(filterUsername(userName));
    if(userName){
        return ctx.reply(userName.join(' '));
    }
    return ctx.reply('deo tim thay username nao');
});
app.startPolling();