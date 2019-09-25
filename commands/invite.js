const Command = require("../structures/Command.js"),
Discord = require("discord.js");

class Invite extends Command {
    constructor (client) {
        super(client, {
            name: "invite",
            enabled: true,
            aliases: [ "add", "support", "invitation" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: "Utilisateur",
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let linksEmbed = new Discord.RichEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .addField("Notre Discord", "[Accéder au Discord des développeurs du bot]("+this.client.config.supportInvite+")")
            .addField("Ajouter le bot", "[Inviter le bot sur votre propre serveur](https://discordapp.com/oauth2/authorize?client_id="+this.client.user.id+"&permissions=2146958847&scope=bot)")
            .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !")
            .setThumbnail("https://i.ytimg.com/vi/ZdFpaB4Wbn0/maxresdefault.jpg")
            .setColor(data.color);

        // Send the embed in the current channel
        message.channel.send(linksEmbed);
    }

}

module.exports = Invite;