const Command = require("../structures/Command.js"),
Discord = require("discord.js");

class Eval extends Command {
    constructor (client) {
        super(client, {
            name: "eval",
            enabled: true,
            aliases: [],
            clientPermissions: [],
            permLevel: "Suprême",
            cooldown: 0
        });
    }

    async run (message, args, data) {

        let send = !message.content.includes("dontsend");
        
        const content = message.content.split(" ").slice(1).join(" "),
        result = new Promise((resolve, reject) => resolve(eval(content)));
        
        return result.then((output) => {
            if(typeof output !== "string"){
                output = require("util").inspect(output, { depth: 0 });
            }
            if(output.includes(this.client.token)){
                output = output.replace(this.client.token, "T0K3N");
            }
            return (send ? message.channel.send(output, { code: "js" }) : "");
        }).catch((err) => {
            err = err.toString();
            if (err.includes(this.client.token)){
                err = err.replace(this.client.token, "T0K3N");
            }
            return (send ? message.channel.send(err, { code: "js" }) : "")
        });

    }

}

module.exports = Eval;