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

        let m = await message.channel.send(this.client.emotes.loading+" | Collecte des données des serveurs de Valorion...");

        let embed = new Discord.RichEmbed()
            .setAuthor("Valorion", this.client.user.displayAvatarURL)
            .setColor(data.color)
            .setFooter("Une idée pour améliorer le bot ? Rejoignez notre Discord !");

        try {
            // Fetch data from paladium server
            let res = await fetch("https://mcapi.us/server/status?ip="+this.client.config.valorion.ip+"&port="+this.client.config.valorion.port);
            let body = await res.json();
            let players = (body.players ? body.players.now : 0);
            embed.setDescription((body.online ? "Les serveurs de Valorion sont en ligne !" : "Les serveurs de Valorion sont en maintenance..."));
            if(body.online){
                embed.addField(message.client.emotes.on+" Statut", "Serveurs en ligne !");
            } else {
                embed.addField(message.client.emotes.off+" Statut", "Serveurs en maintenance !");
            }
            embed.addField(message.client.emotes.player+" Joueurs", players+" joueur(s) connecté(s)");
            m.edit(":bar_chart: | Statistiques de Valorion :", embed);
        } catch(e){
            // if there is an error (like the server is down)
            return m.edit(this.client.emotes.error+" | Une erreur est survenue...");
        }
        
    }
}

module.exports = Status;