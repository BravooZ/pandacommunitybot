exports.run = (bot, message, args, func) => {

    message.channel.sendMessage('**Pong!** O seu ping é: `' + `${Date.now() - message.createdTimestamp}` + ' ms`');        
}

module.exports.help = {
  name:'ping'
}
