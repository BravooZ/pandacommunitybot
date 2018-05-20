const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription('Informações do Servidor')
    .setColor(0xef07df)
    .setThumbnail('https://cdn.discordapp.com/attachments/340157732537761794/445659596296552458/u74r7u5.jpg')
    .addField('Nome do Server:', message.guild.name)
    .addField('Criado em:', '31 de Maio de 2017')
    .addField('Você entrou:', message.member.joinedAt)
    .addField('Total de Membros:', message.guild.memberCount)
    .setTimestamp()
    .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

    message.channel.send(serverembed);
}

module.exports.help = {
  name:'serverinfo'

}
