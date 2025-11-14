const { MAX_MESSAGES } = require('../config/default');

function limitMessages(messages) {
  if (messages.length > MAX_MESSAGES) {
    messages.splice(0, messages.length - MAX_MESSAGES);
  }
  return messages;
}

module.exports = { limitMessages };
