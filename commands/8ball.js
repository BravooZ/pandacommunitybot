const Discord = require('discord.js');

module.exports.run = async (bot, message,args) => {

  if(!args[2]) return message.reply('Por favor, faça uma pergunta completa!');
  let replies = ['Sim.', 'Não.', 'Eu não sei.', 'Pergunta mais tarde'];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(' ');

  let ballEmbed = new Discord.RichEmbed()
  .setDescription('**8Ball**')
  .setAuthor(message.author.tag)
  .setColor(0x05726d)
  .setThumbnail('https://i.imgur.com/yMGnY3F.png')
  .addField('Pergunta:', question)
  .addField('Resposta:', replies[result])
  .setTimestamp()
  .setFooter('Feito por BravooZ', 'https://i.imgur.com/GhhhkZU.jpg');

  message.delete().catch(O_o=>{});
  message.channel.send(ballEmbed)
    .then(message => {
        message.delete(15000);
    })
  return;

}

module.exports.help = {
  name: '8ball'
}
