// importing packages
const path = require('path');
const envFilePath = process.argv[2];
require('dotenv').config({ path: envFilePath });

// importing functions
const commands = require('./commands');
const { processMessage, processAppName } = require('./utils');
const { initializeBot } = require('./bot');

async function execute() {
  const availableCommands = ['SEND_MESSAGE', 'REMOVE_MESSAGES'];
  const commandName = process.argv[5];

  if (!availableCommands.includes(commandName)) {
    console.log('Unknown command is entered!');
    process.exit(1);
  }

  const appName = processAppName(process.argv[3]);
  const messagesIdsFileName = `${process.argv[4]}.txt`;
  const messagesIdsFilePath = path.join(__dirname, 'logs', 'messages', appName, messagesIdsFileName);
  const channelId = process.env.DISCORD_CHANNEL_ID;
  await initializeBot();

  // executing the command depending on the shell argument
  if (commandName === 'SEND_MESSAGE') {
    const message = processMessage(process.argv[6]);
    await commands.logMessage(channelId, messagesIdsFilePath, message);
  } else if (commandName === 'REMOVE_MESSAGES') {
    await commands.removeMessages(channelId, messagesIdsFilePath, false);
  }
}

execute();
