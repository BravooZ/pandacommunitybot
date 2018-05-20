const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Não foi possível encontrar o usuário!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Não pode fazer isso amigo!");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Essa pessoa não pode ser kickada!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#e56b00")
    .setImage('https://cdn.discordapp.com/attachments/442760002651029514/447406954781081600/O3DHIA5.gif')
    .addField("Usuário Kickado:", `${kUser}`)
    .addField("Kickado por:", `<@${message.author.id}>`)
    .addField("Kickado em:", message.channel)
    .addField("Hora do acontecimento", message.createdAt)
    .addField("Razão", kReason)
    .setTimestamp()
    .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

    let kickChannel = message.guild.channels.find(`name`, "🚬staff-chat🚬");
    if(!kickChannel) return message.channel.send("Não foi possível encontrar o canal.");

    message.guild.member(kUser).kick(kReason);
    message.delete().catch(O_o=>{});
    kickChannel.send(kickEmbed);

    return;
}

module.exports.help = {
  name:"kick"
}
