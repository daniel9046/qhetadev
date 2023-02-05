const Command = require('../command.js')
module.exports = class Example extends Command {
  constructor (client) {
    super('cat', ['rcat'], 'Random Cat', {
      usage: `${client.settings.prefix}rcat`,
      category: 'fun',
      requiresAdmin: false, //Is user on dev list in settings
      requiresCrown: false  //Is user room owner
    })
  }

  async run (client, msg) {       
    client.mpp.sendMessage("Look this cat! - http://random.cat/view/" + Math.floor(Math.random() * 2000))
  }
}