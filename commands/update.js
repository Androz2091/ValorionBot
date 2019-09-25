const Command = require("../structures/Command.js"),
Discord = require("discord.js");

class Update extends Command {
    constructor (client) {
        super(client, {
            name: "update",
            enabled: true,
            aliases: [],
            clientPermissions: [ "MANAGE_CHANNELS" ],
            permLevel: "Modérateur",
            cooldown: 15000
        });
    }

    async run (message, args, data) {
        let m = await message.channel.send(this.client.emotes.loading+" | Je suis en train de mettre à jour vos salons...");
        let created = this.client.functions.checkGuild(this.client, message.guild.id);
        if(!created){
            return m.edit(this.client.emotes.error+" | Aucun salon à mettre à jour ! Pour créer les salons, utilisez `"+this.client.config.prefix+"setup` !");
        }
        await this.client.functions.updateStats(this.client, message.guild.id);
        m.edit(this.client.emotes.success+" | J'ai mis à jour les salons !");
        
    }

}

module.exports = Update;