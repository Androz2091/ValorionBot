const Command = require("../structures/Command.js"),
Discord = require("discord.js");

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            enabled: true,
            aliases: [ "aide" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: "Utilisateur",
            cooldown: 300
        });
    }

    async run (message, args, data) {

        let prefix = this.client.config.prefix;

        let helpEmbed = new Discord.RichEmbed()
            .addField("__**Liste des commandes :**__",
                "Menu d'aide du Bot ! Apprenez toutes les commandes :"
            )
            .addField(this.client.config.emotes.tools+" **Outils**",
                "`"+prefix+"liens` : Affiche les principaux liens de Valorion !\n"+
                "`"+prefix+"invite` : Inviter le bot sur votre serveur !\n"+
                "`"+prefix+"conseil` : Vous donne quelques conseils pour Valorion !\n"
            )
            .addField(this.client.config.emotes.stats+" **Stats**",
                "`"+prefix+"setup` : Recréer les salons de stats !\n"+
                "`"+prefix+"status` : Affiche les informations de Valorion !"
            )
            .addField(this.client.config.emotes.infos+" **Informations**",
                "[Invitation](https://discordapp.com/oauth2/authorize?client_id="+this.client.user.id+"&permissions=2146958847&scope=bot)"
            )
            .setFooter("Valorion'Bot, les stats de Valorion en temps réel.")
            .setThumbnail("https://i.ytimg.com/vi/ZdFpaB4Wbn0/maxresdefault.jpg")
            .setColor(data.color);

        // Send the embed in the current channel
        message.channel.send(helpEmbed);
    }

}

module.exports = Help;