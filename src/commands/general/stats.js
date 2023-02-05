const Command = require('../command.js')
const si = require('systeminformation')

module.exports = class StatsCommand extends Command {
  constructor (client) {
    super('stats', ['s', 'stat'], 'Get\'s stats for the bot', {
      usage: `${client.settings.prefix}stats OR ${client.settings.prefix}s`,
      category: 'gen'
    })
  }

  async run (client, msg) {
    const cpu = await si.cpu()
    const mem = await si.mem()

    client.mpp.sendMessage('INFO :: fucked')
    client.mpp.sendMessage(`RAM :: \`${Math.floor(mem.used / 1000000000)}\`gb/\`${Math.floor(mem.total / 1000000000)}\`gb`)
    client.mpp.sendMessage(`CPU :: \`${cpu.cores}\` Cores`)
  }
}