require('dotenv').config();
const Telegraf = require('telegraf');
const mongoose = require('mongoose');
const app = new Telegraf(process.env.BOT_TOKEN);

mongoose.connect('mongodb://localhost/moonotes');
const Schema = mongoose.Schema;

const dealerSchema = new Schema({
    user_id: Number,
    username: String,
    information: String
});

const Dealer = mongoose.model('Dealer', dealerSchema);

app.command('/add', ctx => {
    const message = ctx.message;
    const myDealer = new Dealer({
      name: message.text.split(';\n')[0].replace('/add ', ''),
      description: message.text.split(';\n')[1],
      type: message.text.split(';\n')[2].toLowerCase(),
      author: message.from.id,
    });
  
    myNote.save((err, mess) => {
      ctx.reply('Saved! ✅');
    });
});

function filterUsername(names){
    var copyItems = []
    // before
    for (let i = 0; i < names.length; i++) {
        if(names[i].includes('@')) copyItems.push(names[i])
    }
    return copyItems;
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