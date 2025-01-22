function processMessage(rawMessage) {
  const message = rawMessage.replaceAll('\\n', '\n');

  return message;
}

module.exports = { processMessage };
