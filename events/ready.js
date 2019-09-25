const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        const client = this.client;

        // Logs some informations using the logger file
        client.logger.log(`Loading a total of ${client.commands.size} command(s).`, "log");
        client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

        if(client.config.dblToken){
            // Post DBL stats
            const DBL = require("dblapi.js");
            const dbl = new DBL(client.config.dblToken, client);
            dbl.postStats(client.guilds.size);
        }

        // Update the game every 20s
        const games = [
            "craft du Valorion",
            "aller dans l'Aether",
            "by Androz#2091"
        ];
        client.user.setActivity(games[0]+" | "+client.guilds.size+" serveurs");
        let i = 1;
        setInterval(function(){
            client.user.setActivity(games[parseInt(i, 10)]+" | "+client.guilds.size+" serveurs");
            if(games[parseInt(i + 1)]) i++;
            else i = 0;
        }, 30000);

        setInterval(client.functions.updateStats, 300000, client);
    }
};