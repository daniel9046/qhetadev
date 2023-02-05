const Command = require('../command.js')
module.exports = class Example extends Command {
  constructor (client) {
    super('bonk', [], 'Action', {
      usage: `${client.settings.prefix}${'bonk'} [who]`,
      category: 'fun',
      requiresAdmin: false, //Is user on dev list in settings
      requiresCrown: false  //Is user room owner
    })
  }

  async run (client, msg) {       
    let findParticipantByName = function(name) {
      for (let part in client.mpp.room.users) {
        part = client.mpp.room.users[part];
        if (part.name.toLowerCase() == name.toLowerCase() || part.name.toLowerCase().includes(name)) return part;
      }
    }
    var input = msg.content.split(" ").slice(1).join(" ");
    if (!input){ return client.mpp.sendMessage('bonk'+" who?"); }
    var target = findParticipantByName(input) || client.mpp.room.users[input];
    if (!target){ return client.mpp.sendMessage("Person not found."); }
    client.mpp.sendMessage(""+msg.author.name+' '+'bonk'+'s '+target.name+"!")
  }
}