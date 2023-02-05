const Command = require('../command.js')
module.exports = class Example extends Command {
  constructor (client) {
    super('dog', ['doglink'], 'Random Dog', {
      usage: `${client.settings.prefix}doglink`,
      category: 'fun',
      requiresAdmin: false, //Is user on dev list in settings
      requiresCrown: false  //Is user room owner
    })
  }

  async run (client, msg) {       
    client.mpp.sendMessage("Check out some dogs at: https://random.dog/");
  }
}