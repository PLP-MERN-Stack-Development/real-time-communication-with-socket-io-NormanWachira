class Message {
  constructor({ sender, senderId, room, message, isPrivate = false }) {
    this.id = Date.now();
    this.sender = sender;
    this.senderId = senderId;
    this.room = room;
    this.message = message;
    this.isPrivate = isPrivate;
    this.timestamp = new Date().toISOString();
    this.readBy = []; // list of user IDs who have read the message
    this.reactions = []; // array of emojis or reactions
  }
}

module.exports = Message;
