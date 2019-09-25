const Command = require("../structures/Command.js"),
Discord = require("discord.js");

const usersData = {},
tips = require("../assets/json/conseils.json");

class Conseils extends Command {
    constructor (client) {
        super(client, {
            name: "conseils",
            enabled: true,
            aliases: [ "astuce", "conseil" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: "Utilisateur",
            cooldown: 500
        });
    }

    async run (message, args, data) {

        let tipsToDisplays = [];
        let userData = usersData[message.author.id] || [];
        if(userData){
            tipsToDisplays = tips.filter((c) => !userData.includes(c));
            if(tipsToDisplays.length < 1) tipsToDisplays = tips;
        }
        
        let tip = tipsToDisplays[Math.floor(Math.random()*tipsToDisplays.length)];
        if(userData[message.author.id]){
            userData[message.author.id].push(tip);
        } else {
            userData[message.author.id] = [ tip ];
        }

        let embed = new Discord.RichEmbed()
            .setAuthor("Conseil")
            .setDescription(tip)
            .setColor(data.color)
            .setFooter("Une astuce/conseil secrète que vous connaissez ? Rejoignez notre Discord !");
        message.channel.send(embed);

    }

}

module.exports = Conseils;