const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription('**Informações do bot**')
    .setColor(0x07efb1)
    .setThumbnail(bicon)
    .addField('Nome do Bot:', bot.user.username)
    .addField('Feito em:', 'JavaScript')
    .addField('Criado em:', bot.user.createdAt)
    .setTimestamp()
    .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

    message.channel.send(botembed);
}

module.exports.help = {
  name:'botinfo'
}
