const Discord = require("discord.js");

module.exports = class {
    constructor (client) {
      this.client = client;
    }

    async run (guild) {

        this.client.wait(2000);
        await this.client.functions.createStatsChannels(this.client, guild);
        this.client.wait(5000);
        await this.client.functions.updateStats(this.client, guild.id);

        let embed = new Discord.RichEmbed()
            .setAuthor("Merci d'avoir ajouté le Valorion'Bot")
            .setDescription("Vous bénéficiez maintenant des statistiques de Valorion en temps réel !")
            .setFooter("Pour afficher la page d'aide, tapez `"+this.client.config.prefix+"help`")
            .setColor("#FF0000");
        guild.owner.send("Nous vous conseillons de rejoindre le serveur support si vous avez des questions ! "+this.client.config.supportInvite, embed);

        let newGuild = new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#32CD32")
            .setDescription("J'ai rejoint **"+guild.name+"**, avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
        this.client.channels.get(this.client.config.logs.servers).send(newGuild);
    }
};