const Command = require('../command.js')
module.exports = class StatsCommand extends Command {
  constructor (client) {
    super('invite', ['i'], 'Get discord invite for my server :)', {
      usage: `${client.settings.prefix}invite OR ${client.settings.prefix}i`,
      category: 'gen'
    })
  }

  async run (client, msg) {
    client.mpp.sendMessage(`fuck up ya discord branding`)
  }
}