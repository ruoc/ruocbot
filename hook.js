var hookshot = require('hookshot');
hookshot('refs/heads/master', 'git pull && pm2 restart bot').listen(3000)