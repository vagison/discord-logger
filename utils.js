function processMessage(rawMessage) {
  return rawMessage.replaceAll('\\n', '\n');
}

function processAppName(rawName) {
  return rawName.replace(/\s+/g, '_');
}

module.exports = { processMessage, processAppName };
