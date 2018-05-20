var Discord = require('discord.js');
const request = require('request');

exports.run = (client, message, args) => {

    if (!message.member.roles.find("name", "🎩Fundador🎩")) {
        message.channel.send('Você precisa do \`🎩Fundador🎩\` role para usar este comando.');
        return;
    }
    message.reply(`**Memoria usada:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb :timer:`);
}

module.exports.help = {
  name:"memoria"
}
