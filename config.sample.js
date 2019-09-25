module.exports = {
    token:          "XXXXXXXX",
    prefix:         "v!",
    color:          "#FF0000",
    owners:         [ { id: "discord_id", username: "username#discrim" } ],
    logs: {
        servers: "XXXXXXXX"
    },
    valorion: {
        ip:     "XXXXXXXX",
        port:   "XXXXXXXX"
    },
    emotes: {
        off:        "XXXXXXXX",
        on:         "XXXXXXXX",
        stats:      "XXXXXXXX",
        loading:    "XXXXXXXX",
        error:      "XXXXXXXX",
        success:    "XXXXXXXX",
        infos:      "XXXXXXXX",
        tools:      "XXXXXXXX",
        player:     "XXXXXXXX"
    },
    supportInvite:  "XXXXXXXX",
    permLevels: [
        {
            level: 0,
            name: "Utilisateur",
            check: () => true,
        },
        {
            level: 1,
            name: "Modérateur",
            check: (message) => (message.guild ? message.member.hasPermission("MANAGE_MESSAGES") : false),
        },
        {
            level: 2,
            name: "Administrateur",
            check: (message) => (message.guild ? message.member.hasPermission("ADMINISTRATOR") : false),
        },
        {
            level: 3,
            name: "Fondateur",
            check: (message) => (message.guild ? message.author.id === message.guild.owner.user.id : false),
        },
        {
            level: 5,
            name: "Suprême",
            check: (message) => message.client.config.owners.some((o) => o.id === message.author.id),
        }
    ]
}
