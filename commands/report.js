const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send('Não foi possível encontrar o usuário.')
    let reason = args.join(' ').slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription('**Report**')
    .setColor(0x6c0bc1)
    .setThumbnail('https://cdn.discordapp.com/attachments/442760002651029514/447413259205607427/transferir.png')
    .addField('Usuário reportado:', `${rUser}`)
    .addField('Reportado por:', `${message.author}`)
    .addField('Canal:', message.channel)
    .addField('Hora do acontecimento:', message.createdAt)
    .addField('Razão:', reason)
    .setTimestamp()
    .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

    let reportschannel = message.guild.channels.find(`name`, '🚬staff-chat🚬');
    if(!reportschannel) return message.channel.send('Não foi possível encontrar o canal de reports.')

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);


    return;
}

module.exports.help = {
  name:'report'
}
