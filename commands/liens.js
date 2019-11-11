const Command = require("../structures/Command.js"),
Discord = require("discord.js");

class Liens extends Command {
    constructor (client) {
        super(client, {
            name: "liens",
            enabled: true,
            aliases: [ "links" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: "Utilisateur",
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let linksEmbed = new Discord.RichEmbed()
            .addField("Principaux liens de Valorion",
                "Retrouvez les liens utiles de Valorion !"
            )
            .addField("Site internet",
                "[Accueil](https://valorion-mc.fr)\n"+
                "[Boutique](https://www.valorion-staff.fr/shop)\n",
                true
            )
            .addField("Launchers de Valorion :",
                "[Launcher Premium](https://valorion-staff.fr/p/launcher_premium)\n",
                "[Launcher Crack](https://valorion-staff.fr/p/launcher_crack)\n",
                true
            )
            .addField("YouTube | Discord",
                "[V2](https://www.youtube.com/playlist?list=PLoTOukWpJpv0M02m_c_ch1U75N6w1IXQK) | ",+
                "[V1](https://www.youtube.com/playlist?list=PLoTOukWpJpv3QpYZIi7g6BSL2GhX32e9H)\n",
                "[Chaîne Communautaire](https://www.youtube.com/channel/UCfCAMuhANlTSrkxjxB84HLA)\n",                            
                "[Discord de Waren](https://discord.gg/warentv)\n",
                true
            )
            .addField("**Discord de Valorion**",
                "[Discord](https://discordapp.com/invite/pmYMswG)\n",
                true
            )
            .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !")
            .setThumbnail("https://i.ytimg.com/vi/ZdFpaB4Wbn0/maxresdefault.jpg")
            .setColor(data.color);

        // Send the embed in the current channel
        message.channel.send(linksEmbed);
    }

}

module.exports = Liens;