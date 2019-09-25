const Discord = require("discord.js");

module.exports = class {
    constructor (client) {
      this.client = client;
    }

    async run (guild) {

        let oldGuild = new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#B22222")
            .setDescription("Quelqu'un m'a expulsé de **"+guild.name+"** avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
        this.client.channels.get(this.client.config.logs.servers).send(oldGuild);

    }
};