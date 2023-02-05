const Command = require('../command.js')
module.exports = class Example extends Command {     
  constructor (client) {
    super('slap', [], 'Action', {
      usage: `${client.settings.prefix}${'slap'} [who]`,
      category: 'fun',
      requiresAdmin: false, //Is user on dev list in settings
      requiresCrown: false  //Is user room owner
    })
  }

  async run (client, msg) {  
    var input = msg.content.split(" ").slice(1).join(" ");
    if (!input){ return client.mpp.sendMessage('slap'+" who?"); }
    var target = client.findParticipantByName(input) || client.mpp.room.users[input];
    if (!target){ return client.mpp.sendMessage("Person not found."); }
    client.mpp.sendMessage(""+msg.author.name+' '+'slap'+'s '+target.name+"!")
  }
}