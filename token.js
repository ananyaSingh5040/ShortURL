const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const payload = {
  service: 'discord-bot',
  role: 'internal',
};

const token = jwt.sign(payload, process.env.BOT_SECRET_KEY, { expiresIn: '1y' });

console.log('Your bot token:', token);
