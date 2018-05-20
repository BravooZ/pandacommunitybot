exports.run = (client, message, args) => {

    let paginas = ["**MEMBRO**\n- »8ball\n- »avatar\n- »botinfo\n- »cat", "- »dog\n- »fortnite(Em Breve)\n- »help\n- »ping**\n- »report", "\n- »serverinfo\n- »weather", "**STAFF**\n- »ban\n- »clear\n- »hook\n- kick", "- »tempmute\n- »warn\n- »warnlevel\n- »memoria", "**NSFW**\n- »4k\n- »ass\n- »pussy\n- »hentai\n- »gif\n- boobs"];
    let pagina = 1;

    message.reply("**Comandos enviados em seu DM! :envelope_with_arrow:**");
    message.author.sendMessage({
        "embed": {
            "description":"**Aqui está uma lista de meus comandos:**\nㅤ\n**Prefix:** `»`",
            "color": 0x7837e8,
            "timestamp": new Date(),
            "footer": {
                "icon_url": message.author.displayAvatarURL,
                "text": message.author.username
            },
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/340157732537761794/445659596296552458/u74r7u5.jpg"
            },
            "fields": [{
                "name": `:bookmark: Pag. ${pagina}/${paginas.length}:`,
                "value": paginas[pagina - 1]
            }]
        }
    }).then(help => {

        setTimeout(() => {
            help.react('⬅');
        }, 500);
        setTimeout(() => {
            help.react('➡');
        }, 1000);

        const collector = help.createReactionCollector((r, u) => (r.emoji.name === '⬅' || r.emoji.name === '➡') && u.id !== client.user.id);

        collector.on('collect', r => {
            switch(r.emoji.name) {

            case '⬅':

                if(pagina == 1) {
                  pagina = paginas.length
                  help.edit({
                      "embed": {
                          "description":"**Aqui está uma lista de meus comandos:**\nㅤ\n**Prefix:** `»`",
                          "color": 0x7837e8,
                          "timestamp": new Date(),
                          "footer": {
                              "icon_url": message.author.displayAvatarURL,
                              "text": message.author.username
                          },
                          "thumbnail": {
                              "url": "https://cdn.discordapp.com/attachments/340157732537761794/445659596296552458/u74r7u5.jpg"
                          },
                          "fields": [{
                              "name": `:bookmark: Pag. ${pagina}/${paginas.length}:`,
                              "value": paginas[pagina - 1]
                          }]
                      }
                  });
                  r.users.filter(u => r.remove(u.id !== client.user.id));
                } else {
                    pagina = pagina - 1
                    help.edit({
                        "embed": {
                            "description":"**Aqui está uma lista de meus comandos:**\nㅤ\n**Prefix:** `»`",
                            "color": 0x7837e8,
                            "timestamp": new Date(),
                            "footer": {
                                "icon_url": message.author.displayAvatarURL,
                                "text": message.author.username
                            },
                            "thumbnail": {
                                "url": "https://cdn.discordapp.com/attachments/340157732537761794/445659596296552458/u74r7u5.jpg"
                            },
                            "fields": [{
                                "name": `:bookmark: Pag. ${pagina}/${paginas.length}:`,
                                "value": paginas[pagina - 1]
                            }]
                        }
                    });
                    r.users.filter(u => r.remove(u.id !== client.user.id));
                }

                break;

            case '➡':

                if(pagina + 1 > paginas.length) {
                  pagina = 1
                  help.edit({
                      "embed": {
                          "description":"**Aqui está uma lista de meus comandos:**\nㅤ\n**Prefix:** `»`",
                          "color": 0x7837e8,
                          "timestamp": new Date(),
                          "footer": {
                              "icon_url": message.author.displayAvatarURL,
                              "text": message.author.username
                          },
                          "thumbnail": {
                              "url": "https://cdn.discordapp.com/attachments/340157732537761794/445659596296552458/u74r7u5.jpg"
                          },
                          "fields": [{
                              "name": `:bookmark: Pag. ${pagina}/${paginas.length}:`,
                              "value": paginas[pagina - 1]
                          }]
                      }
                  });
                  r.users.filter(u => r.remove(u.id !== client.user.id));
                } else {
                    pagina = pagina + 1
                    help.edit({
                        "embed": {
                            "description":"**Aqui está uma lista de meus comandos:**\nㅤ\n**Prefix:** `»`",
                            "color": 0x7837e8,
                            "timestamp": new Date(),
                            "footer": {
                                "icon_url": message.author.displayAvatarURL,
                                "text": message.author.username
                            },
                            "thumbnail": {
                                "url": "https://cdn.discordapp.com/attachments/340157732537761794/445659596296552458/u74r7u5.jpg"
                            },
                            "fields": [{
                                "name": `:bookmark: Pag. ${pagina}/${paginas.length}:`,
                                "value": paginas[pagina - 1]
                            }]
                        }
                    });
                    r.users.filter(u => r.remove(u.id !== client.user.id));
                }

                break;

            }
        })

        setTimeout(() => {
            help.delete();
        }, 1 * 60 * 1000);

    })

  }

module.exports.help = {
  name: 'help'
}
