var Discord = require('discord.js')
var bot = new Discord.Client();
var fs = require('fs');
var profanities = require('profanities');
var prefix = '»';
var commands = JSON.parse(fs.readFileSync('Storage/commands.json', 'utf8'));
var db = require('quick.db');
var func = require('./functions.js');
console.log(func)


var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
bot.commands = new Discord.Collection();



//functions
function userInfo(user) {
    var finalString = '';

    //name
    finalString += '**' + user.username + ', ID: **' + user.id;

    var userCreated = user.createdAt.toString().split(' ');
    finalString += ', foi criado em **' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '.**'

    finalString += ' Desde então, ele enviou ' + userData[user.id].messagesSent + ' mensagens neste server.'

    return finalString;
}


bot.on('message', message => {

  //Variáveis
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = '»'
  var args = message.content.slice(prefix.length).trim().split(" ");
  var cmd = args.shift().toLowerCase();

  if (sender.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try {

      let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(bot, message, args, func);

  } catch(e) {

      console.log(e.message);

  } finally {

      console.log(`${message.author.username} executou o comando: ${cmd}`);

  }

   //Banindo palavras do servidor
    if (msg.includes('PUTA') || msg.includes('MERDA') || msg.includes('FDS') || msg.includes('FDP') || msg.includes('CARALHO') || msg.includes('PQP') || msg.includes('FUDER') || msg.includes('PUSSY') || msg.includes('CONA')) {
        message.delete();
        message.channel.send('😡Linguagem!😡')
          .then(message => {
              message.delete(2000);
            })
          return;
    }

    if (msg.includes('CRL')) {
        message.delete();
        message.channel.send('😡Linguagem!😡')
          .then(message => {
              message.delete(2000);
            })
          return;
    }

  //UserData
    if (msg.startsWith(prefix + 'USERINFO')) {

        if (msg = prefix + 'USERINFO') {
            message.channel.send(userInfo(sender));
        }
    }



    if (!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0
    }

    userData[sender.id].messagesSent++;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    });

  });


//Iniciação do Bot
bot.on('ready', () => {
    console.log('Bot Iniciado...')

    bot.user.setStatus('Online')

    bot.user.setGame('#PandaCM | »help', 'https://www.twitch.tv/pandabotcm');

});

bot.on('guildMemberAdd', member => { // Make sure this is defined correctly.

    // Check if the guild has a custom auto-role
    db.fetch(`autoRole_${member.guild.id}`).then(i => {

        // Check if no role is given
        if (!i.text || i.text.toLowerCase() === 'none'); // We want to put this un our guildMemberAdd, but we want to delete the return statement and just replace it with ; so it can run the rest of the code
        else { // Run if a role is found...

            try { // Try to add role...
                member.addRole(member.guild.roles.find('name', i.text))
            } catch (e) { // If an error is found (the guild supplied an invalid role), run this...
                console.log("A guild tried to auto-role an invalid role to someone.") // You can commet this line out if you don't want this error message
            }

        }

        // The code will go here, inside the other fetchObject. If you don't have that fetchObject don't worry just put it in bot.on('guildMemberAdd').

        // Fetch the channel we should be posting in - FIRST, we need to require db in this app.js
        db.fetch(`messageChannel_${member.guild.id}`).then(i => {

            // Fetch Welcome Message (DMs)
            db.fetch(`joinMessageDM_${member.guild.id}`).then(o => {

                // DM User
                if (!o.text) console.log('Error: Join DM Message not set. Please set one using ~setdm <message>'); // This will log in console that a guild didn't set this up, you dont need to include the conosle.log
                else func.embed(member, o.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // This is where the embed function comes in, as well as replacing the variables we added earlier in chat.

                // Now, return if no message channel is defined
                if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using ~setchannel #channel') // Again, this is optional. just the console.log not the if statement, we still want to return

                // Fetch the welcome message
                db.fetch(`joinMessage_${member.guild.id}`).then(p => {

                    // Check if they have a join message
                    if (!p.text) console.log('Error: User Join Message not found. Please set one using ~setwelcome <message>')
                    else func.embed(member.guild.channels.get(i.text), p.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // We actually want to send the message.

                })

            })

        })

    })

    // Now, since we're done with the welcome. lets do the leave
    bot.on('guildMemberRemove', member => {

        // Fetch Channel
        db.fetch(`messageChannel_${member.guild.id}`).then(i => {

            // If the channel is not found, return.
            if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using ~setchannel #channel')

            // Fetch Leave Message
            db.fetch(`leaveMessage_${member.guild.id}`).then(o => {

                // Check if o.text is defined
                if (!o.text) console.log( 'Error: User leave message not found. Please set one using ~setleave <message>')
                else func.embed(member.guild.channels.get(i.text), o.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // Now, send the message.

            })

        })

    })

})

//login
bot.login('Mzg4NjM1NjAyMTEyODcyNDQ4.Dc78jQ.wRWJrdEhDcEvwtIbCiKQG9exUyc');
