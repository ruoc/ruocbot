require('dotenv').config();
const Telegraf = require('telegraf');
const mongoose = require('mongoose');
const app = new Telegraf(process.env.BOT_TOKEN);

mongoose.connect('mongodb://localhost/soden', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;

const dealerSchema = new Schema({
    user_id: Number,
    username: String,
    information: String
});

const Dealer = mongoose.model('Dealer', dealerSchema);

app.command('/add', ctx => {
    const message = ctx.message;
    console.log(message);
});

function filterUsername(names){
    var copyItems = []
    // before
    for (let i = 0; i < names.length; i++) {
        if(names[i].includes('@')) copyItems.push(names[i])
    }
    return copyItems;
}

app.hears(/^.*(\/check|tín|Check|Tín|check|Check|Tin|tin).*$/, ctx => {
    var userName = ctx.message.text.match(/@([\w]+)/);
    if(userName){
        return ctx.reply('tìm thấy ' +userName.length+' username: '+filterUsername(userName).join(' '));
    }
    return ctx.reply('Check tín thì tag username vào');
});
app.startPolling();