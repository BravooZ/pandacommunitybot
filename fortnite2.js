const Discord = require('discord.js');
const Fortnite = require('fortnite');
const ft = new Fortnite('1278ded7-4614-4d9b-9378-ec24ba1df4e7');

module.exports.run = async (bot, message, args) => {
    message.delete();

    let username = args[0];
    let platform = args[1] || 'pc';

    let data = ft.getInfo(username, platform).then(data => {

        let stats = data.lifetimeStats;
        let kills = stats.find(s => s.stat == 'kills');
        let wins = stats.find(s => s.stat == 'wins');
        let kd = stats.find(s => s.stat == 'kd');
        let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
        let tPlayed = stats.find(s => s.stat == 'timePlayed');
        let asTime = stats.find(s => s.stat == 'avgSurvivalTime');

        let fortniteEmbed = new Discord.RichEmbed()
        .setTitle('Fortnite Stats')
        .setAuthor(data.username)
        .setColor(0x19d1af)
        .addField('Kills', kills.value, true)
        .addField('Wins', wins.value, true)
        .addField('KD', kd.value, true)
        .addField('Partidas Jogadas', mPlayed.value, true)
        .addField('Tempo Jogado', tPlayed.value, true)
        .addField('Tempo Médio de Sobrevivência', asTime.value, true)
        .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

        message.channel.send(fortniteEmbed);

    }).catch(e => {
        console.log(e);
        message.channel.send('Não foi possível encontrar o nome de usuário no banco de dados.');
    });

}

module.exports.help = {
    name: "fortnite"
}
