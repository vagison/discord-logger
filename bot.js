const { Client, Intents } = require('discord.js');
const { constants } = require('./constants');

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

async function initializeBot() {
  try {
    await bot.login(process.env.DISCORD_BOT_TOKEN);
    console.log('The Bot logged in successfully!');
    await waitForBotReady();
    console.log('The Bot initialized successfully!');

    return bot;
  } catch (error) {
    console.log(`There was an error while initializing the Bot: ${error}`);
    process.exit(1);
  }
}

async function waitForBotReady() {
  return new Promise((resolve, reject) => {
    bot.on('ready', () => {
      resolve();
    });

    bot.on('error', (error) => {
      reject(error);
    });

    setTimeout(() => {
      reject('Bot initialization timeout!');
    }, constants.discordBot.initialization.timeout);
  });
}

async function sendMessage(channelId, message) {
  const discordMessage = await bot.channels.cache.get(channelId).send(message);

  return discordMessage;
}

async function fetchChannel(channelId) {
  const channel = await bot.channels.fetch(channelId);

  return channel;
}

module.exports = { initializeBot, sendMessage, fetchChannel };
