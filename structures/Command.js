module.exports = class Command {
    constructor(client, {
        name = null,
        enabled = true,
        aliases = new Array(),
        clientPermissions = new Array(),
        permLevel = "Fondateur du bot",
        cooldown = 5000
    })
    {
        this.client = client;
        this.conf = { enabled, aliases, permLevel, clientPermissions, cooldown};
        this.help = { name };
    }
};