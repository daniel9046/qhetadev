const Command = require('../command.js')

module.exports = class Eval extends Command {
  constructor (client) {
    super('eval', [], 'Evaluates a property on mpp lib.', {
      usage: `${client.settings.prefix}eval`,
      category: 'dev',
      requiresAdmin: true
    })
  }

  async run (client, msg) {
    function run(code){
      if(new String(code)=="[object Object]"==false&&new String(code)=="[object JSON]"==false){
      try {
      return '▶ ' + eval(code);
      } catch (error) {
      return '▶ ' + error
      }
      }
      if(new String(code)=="[object Object]" || new String(code)=="[object JSON]"){
      try {
      return '▶ ' + JSON.stringify(eval(code));
      } catch (error) {
      return '▶ ' + error
      }
      }
      }
    var input = msg.content.split(" ").slice(1).join(" ");
    let args = msg.content.split(' ')
    if(!input) return;
    console.warn("Executing Code: "+input)
    client.mpp.sendMessage(run(input))
  }
}