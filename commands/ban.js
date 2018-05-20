const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Não é possível encontro o usuário!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Não pode fazer isso amigo!");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Essa pessoa não pode ser banida!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .setImage('https://cdn.discordapp.com/attachments/442760002651029514/447406954781081600/O3DHIA5.gif')
    .addField("Usuário Banido:", `${bUser}`)
    .addField("Banido por:", `<@${message.author.id}>`)
    .addField("Banido em:", message.channel)
    .addField("Hora do acontecimento:", message.createdAt)
    .addField("Razão:", bReason)
    .setTimestamp()
    .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

    let incidentchannel = message.guild.channels.find(`name`, "🚬staff-chat🚬");
    if(!incidentchannel) return message.channel.send("Não é possível encontrar o canal.");

    message.guild.member(bUser).ban(bReason);
    message.delete().catch(O_o=>{});
    incidentchannel.send(banEmbed);

    return;
}

module.exports.help = {
  name:"ban"
}
