const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Não consegues fazer lhe isso!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Não consegui encontrá-los");
  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("Eles são muito bacanos");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("**Warns**")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .setThumbnail('https://cdn.discordapp.com/attachments/442760002651029514/447414414745010178/transferir_1.png')
  .addField("Usuário avisado:", `<@${wUser.id}>`)
  .addField("Avisado em:", message.channel)
  .addField("Número de avisos:", warns[wUser.id].warns)
  .addField("Razão:", reason)
  .setTimestamp()
  .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

  let warnchannel = message.guild.channels.find(`name`, "🚬staff-chat🚬");
  if(!warnchannel) return message.reply("Não foi possível encontrar o canal");

  message.delete().catch(O_o=>{});
  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("Você deve criar essa role.");

    let mutetime = "1h";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> foi temporariamente mute!`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> foi desmutado.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 4){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> foi banido.`)
  }

}

module.exports.help = {
  name: "warn"
}
