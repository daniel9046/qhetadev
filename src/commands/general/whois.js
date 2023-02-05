const Command = require('../command.js')
module.exports = class Example extends Command {
  constructor (client) {
    super('whois', ['who'], 'Get User Info', {
      usage: `${client.settings.prefix}whois [who]`,
      category: 'gen',
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
    if (!input){ 
      var target = findParticipantByName(msg.author.name); 
      return client.mpp.sendMessage(`User Information: 💬 Name: ${target.name} / 🔵 Color: ${target.color} / 🕒🆔 id: ${target.id} - 🆔 _id: ${target._id} / 🟥 Cursor: 🗺X: ${target.x} 🗺Y: ${target.y}`)
    }
    var target = findParticipantByName(input) || client.mpp.room.users[input];
    if (!target){ return client.mpp.sendMessage("Person not found."); }
    client.mpp.sendMessage(`User Information: 💬 Name: ${target.name} / 🔵 Color: ${target.color} / 🕒🆔 id: ${target.id} - 🆔 _id: ${target._id} / 🟥 Cursor: 🗺X: ${target.x} 🗺Y: ${target.y}`)
  }
}