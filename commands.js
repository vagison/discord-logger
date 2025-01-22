const fs = require('fs');
const path = require('path');
const { fetchChannel, sendMessage } = require('./bot');

async function logMessage(channelId, messagesIdsFilePath, message) {
  try {
    const discordMessage = await sendMessage(channelId, message);
    console.log('Message sent successfully!');

    const messagesIdsFolderPath = path.dirname(messagesIdsFilePath);
    fs.mkdirSync(messagesIdsFolderPath, { recursive: true });

    if (!fs.existsSync(messagesIdsFilePath)) {
      fs.writeFileSync(messagesIdsFilePath, '', { flag: 'w' });
    }

    const discordMessageId = discordMessage.id;
    fs.appendFileSync(messagesIdsFilePath, discordMessageId + ',');
    process.exit(0);
  } catch (err) {
    console.log(`There was an error while executing a message sending command: ${err}`);
    process.exit(1);
  }
}

async function removeMessages(channelId, messagesIdsFilePath, keepLast = true) {
  try {
    const channel = await fetchChannel(channelId);
    let messagesIds = fs.readFileSync(messagesIdsFilePath, 'utf-8');
    messagesIds = messagesIds.split(',');
    messagesIds = keepLast ? messagesIds.slice(0, messagesIds.length - 2) : messagesIds.slice(0, messagesIds.length - 1);

    for (const messageId of messagesIds) {
      try {
        messageContent = await channel.messages.fetch(messageId);
        await channel.messages.delete(messageId);
        console.log(`Message with ID: ${messageId} and content: '${messageContent}' is deleted.`);
      } catch (err) {
        console.log(`Message removing failed with the error: ${err}`);
      }
    }

    console.log('Messages deleted successfuly.');
    process.exit(0);
  } catch (err) {
    console.log(`There was an error while executing messages deletion command: ${err}`);
    process.exit(1);
  }
}

module.exports = {
  logMessage,
  removeMessages,
};
