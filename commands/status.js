const Command = require("../structures/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Status extends Command {
    constructor (client) {
        super(client, {
            name: "status",
            enabled: true,
            aliases: [],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: "Utilisateur",
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let m = await message.channel.send(this.client.emotes.loading+" **| Collecte des données des serveurs de Valorion...**");

        let embed = new Discord.RichEmbed()
            .setAuthor("Valorion", this.client.user.displayAvatarURL)
            .setColor(data.color)
            .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !");

        try {
            // Fetch data from paladium server
            let stats = await this.client.functions.getStats().catch(() => {});
            if(!stats){
                embed.setDescription("**Les serveurs de Valorion sont en __maintenance__...**")
                .addField(message.client.emotes.off+" **Statut**", "Serveurs en maintenance !");
                return m.edit(":bar_chart: | Statistiques de Valorion :", embed);
            }
            embed.setDescription("Les serveurs de Valorion sont en ligne !")
            .addField(message.client.emotes.on+" **Statut :**", "Serveurs en ligne !");
            let text = `Actuellement __${stats.total}__ joueurs sont connectés sur **Valorion** !\n🖐️ __**Lobbys :**__\n •  __Lobby 1__ : ${stats.lobby1} | •  __Lobby 2__: ${stats.lobby2} | •  __Lobby 3__ : ${stats.lobby3}\n⛏️ __** Minages :**__\n • __Minage 1__ : ${stats.minage1} | • __Minage 2__ : ${stats.minage2} | • __Minage 3__ : ${stats.minage3}\n🗡️ __** Mondes Factions :**__\n • __Overworld__ : ${stats.overworld} | • __Aether II__ : ${stats.aether} | • __LOTR__ : ${stats.lotr}`;
            embed.addField(message.client.emotes.player+" **Joueurs connectés :**", text);
            m.edit(":bar_chart: **| Statistiques de Valorion :**", embed);
        } catch(e){
            // if there is an error (like the server is down)
            return m.edit(this.client.emotes.error+" | Une erreur est survenue...");
        }
        
    }
}

module.exports = Status;