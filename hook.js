require('dotenv').config();
const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
 
const GITHUB_REPOSITORIES_TO_DIR = {
  'ruoc/ruocbot': '/root/server/ruocbot'
};
 
http
  .createServer((req, res) => {
    req.on('data', chunk => {
      const signature = `sha1=${crypto
        .createHmac('sha1', process.env.GITHUB_SECRET)
        .update(chunk)
        .digest('hex')}`;
 
      const isAllowed = req.headers['x-hub-signature'] === signature;
 
      const body = JSON.parse(chunk);
 
      const isMaster = body.ref === 'refs/heads/master';
      const directory = GITHUB_REPOSITORIES_TO_DIR[body.repository.full_name];
 
      if (isAllowed && isMaster && directory) {
        try {
          exec(`cd ${directory} && pm2 restart bot`);
        } catch (error) {
          console.log(error);
        }
      }
    });
 
    res.end();
  })
  .listen(8080);