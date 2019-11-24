let fetch = require("node-fetch");

module.exports = {

    /**
     * Update channels stats
     * @param {object} client The Discord Client
     * @param {string} guildID Optional : the guildID to update
     */
    async updateStats(client, guildID){

        if(!guildID) console.log("[START] Auto update channels");

        // Call to mcapi.us
        let res = await fetch("https://mcapi.us/server/status?ip="+client.config.valorion.ip+"&port="+client.config.valorion.port).catch((err) => {});
        if(!res) return;
        let body = await res.json().catch((err) => {});
        if(!body) return;

        let currentPlayers = (body.players ? body.players.now : 0);

        let status = "【🛡】Statut : "+(body.online ? "En ligne" : "Hors ligne");
        let players = "【👥】Joueurs : "+currentPlayers;

        let guilds = (guildID ? client.guilds.filter((g) => g.id === guildID) : client.guilds);

        guilds.forEach((guild) => { // For each server
            let channels = {
                status: guild.channels.find((ch) => ch.name.startsWith("【🛡】Statut : ")),
                players: guild.channels.find((ch) => ch.name.startsWith("【👥】Joueurs : "))
            };
            if(channels.status){
                channels.status.setName(status).catch((err) => {});
            }
            if(channels.players){
                channels.players.setName(players).catch((err) => {});
            }
        });
    },

    /**
     * Gets the Valorion stats
     * @returns {Object}
     */
    async getStats(){
        let res = await fetch("http://ts.valorion-mc.fr/");
        let text = await res.text();
        let [ lobby1, lobby2, lobby3, overworld, aether, lotr, minage1, minage2, minage3 ] = text.split("|").map((s) => s.split(":")[1].split("/")[0]);
        return { lobby1, lobby2, lobby3, overworld, aether, lotr, minage1, minage2, minage3 };
    },

    /**
     * Create default channels stats
     * @param {object} client The Discord client
     * @param {object} guild The guild for which the channels will be created
     * @returns The configuration of the guild
     */
    async createStatsChannels(client, guild){
        return new Promise(async function(resolve, reject){
            try {
                // Create category
                let category = await guild.createChannel("VALORION STATS", { type:"category" }).catch((err) => {});
                if(!category) return;
                await category.overwritePermissions(guild.roles.find((r) => r.name === "@everyone"), {
                    "CONNECT": false,
                    "VIEW_CHANNEL": true
                }).catch((err) => {});
                // Create status channel
                await guild.createChannel("【🛡】Statut : Patientez...", {
                    type: "voice",
                    parent: category
                }).catch((err) => {});
                // Create players channel
                await guild.createChannel("【👥】Joueurs : Patientez...", {
                    type: "voice",
                    parent: category
                }).catch((err) => {});
                resolve(true);
            } catch(e){
                console.log(e)
                reject("error");
            }
        });
    },

    /**
     * Check if a guild is correctly installed
     * @param {object} client The discord client
     * @param {string} guildId The guild ID
     * @returns Boolean, if the guild is correctly installed
     */
    checkGuild(client, guildId){
        let guild = client.guilds.get(guildId);
        let channels = {
            status: guild.channels.find((ch) => ch.name.startsWith("【🛡】Statut : ")),
            players: guild.channels.find((ch) => ch.name.startsWith("【👥】Joueurs : "))
        };
        return channels.status && channels.players;
    },

     /**
     * Clear a guild
     * @param {object} client The discord client
     * @param {string} guildId The guild ID
     */
    clearGuild(client, guildId){
        let guild = client.guilds.get(guildId);
        let channels = [
            guild.channels.find((ch) => ch.name === "VALORION STATS"),
            guild.channels.find((ch) => ch.name.startsWith("【🛡】Statut :")),
            guild.channels.find((ch) => ch.name.startsWith("【👥】Joueurs :"))
        ];
        channels.filter((ch) => ch).forEach((ch) => ch.delete().catch((err) => {}));
        return true;
    }

};