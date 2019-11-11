const Command = require("../structures/Command.js"),
Discord = require("discord.js");

class Setup extends Command {
    constructor (client) {
        super(client, {
            name: "setup",
            enabled: true,
            aliases: [],
            clientPermissions: [ "MANAGE_CHANNELS" ],
            permLevel: "Modérateur",
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        let m = await message.channel.send(this.client.emotes.loading+" **| Création des salons en cours...**");
        await this.client.functions.clearGuild(this.client, message.guild.id);
        await this.client.functions.createStatsChannels(this.client, message.guild);
        await this.client.functions.updateStats(this.client, message.guild.id);
        m.edit(this.client.emotes.success+" **| Les salons ont été créés et sont opérationnels !**");
    }

}

module.exports = Setup;