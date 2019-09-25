module.exports = [
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
];