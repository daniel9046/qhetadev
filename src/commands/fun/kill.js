const Command = require('../command.js')
module.exports = class Example extends Command {
  constructor (client) {
    super('kill', [], 'stab someone arghhh! >w<', {
      usage: `${client.settings.prefix}kill [who]`,
      category: 'fun',
      requiresAdmin: false, //Is user on dev list in settings
      requiresCrown: false  //Is user room owner
    })
  }

  async run (client, msg) {   
    var input = msg.content.split(" ").slice(1).join(" ");
    if (!input){ return client.mpp.sendMessage('kill'+" who?"); }
    var target = client.findParticipantByName(input) || client.mpp.room.users[input];
    if (!target){ return client.mpp.sendMessage("Person not found."); }
    client.mpp.sendMessage("Ouch! "+msg.author.name+'kill'+'ed '+target.name+"! >w<")
  }
}