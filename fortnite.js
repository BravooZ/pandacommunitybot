const Fortnite = require('fortnite');
const stats = new Fortnite("1278ded7-4614-4d9b-9378-ec24ba1df4e7");
const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    let platform;
    let username;

    if (!['pc','xbl','psn'].includes(args[0])) return message.channel.send('**Por favor, inclua a plataforma: `»fortnite [ pc | xbl | psn ] <nickname>`**');

    if (!args[1]) return message.channel.send('**Por favor, inclua o nome de usuário: `»fortnite [ pc | xbl | psn ] <username>`**');

    platform = args.shift();
    username = args.join(' ');

    stats.getInfo(username, platform).then( data => {

      const embed = new Discord.RichEmbed()
      .setColor(0x628232)
      .setTitle(`Stats for ${data.username}`)
      .setDescription(`**Top Placement**\n\n**Top 3s:** *${data.lifetimeStats[0].value}*\n**Top 5s:** *${data.lifetimeStats[1].value}*\n**Top 6s:** *${data.lifetimeStats[3].value}*\n**Top 12s:** *${data.lifetimeStats[4].value}*\n**Top 25s:** *${data.lifetimeStats[5].value}*`, true)
      .setThumbnail('https://i.imgur.com/3AlqT0F.png')
      .addField('Pontuação total', data.lifetimeStats[6].value, true)
      .addField('Partidas Jogadas', data.lifetimeStats[7].value, true)
      .addField('Wins', data.lifetimeStats[8].value, true)
      .addField('Percetagem de Wins', data.lifetimeStats[9].value, true)
      .addField('Kills', data.lifetimeStats[10].value, true)
      .addField('K/D Ratio', data.lifetimeStats[11].value)
      .addField('Kills por minuto', data.lifetimeStats[12].value, true)
      .addField('Tempo Jogado', data.lifetimeStats[13].value, true)
      .addField('Tempo Médio de Sobrevivência', data.lifetimeStats[14].value, true)
      .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

    message.channel.send(embed)
    })
    .catch(error => {

      message.channel.send('Usuário não encontrado!');
    })
}
