const defaultOptions = {
    answerType: "string",
    timeout: 300000,
    timeoutMessage: "Temps écoulé ! Veuillez retaper la commande !"
};

const defaultErrorMessages = {
    nan: (content) => `\`${content}\` n'est pas un nombre valide !`,
    between: (numbers) => `le nombre doit être entre \`${numbers[0]}\` et \`${numbers[1]}\` !`,
    len: (min, max) => `votre réponse doit faire entre \`${min}\` caractères au minimum et \`${max}\` caractères au maximum !`,
    format: (starts, ends) => `votre réponse doit commencer par \`${starts}\` et finir par \`${ends}\` !`,
    cancel: () => `sélection annulée !`
};

module.exports = function(question, options){
    return new Promise(function(resolve, reject){
        if(!question) throw new Error("You must provide a question to ask!");
        if(!options) throw new Error("You must provide an options object!");
        if(!options.channel) throw new Error("You must provide a channel for the collector!");
        if(!options.user) throw new Error("You must provide a user to listen!");
        options.channel.send(options.user.toString()+", "+question);
        const collector = options.channel.createMessageCollector((msg) => msg.author.id === options.user.id, {
            time: options.timeout || defaultOptions.timeout
        });
        let answerType = options.answerType || defaultOptions.answerType;
        collector.on("collect", (message) => {

            if(message.content === "cancel"){
                collector.stop();
                return message.channel.send(`${options.user}, ${defaultErrorMessages.cancel()}`);
            }

            /* NUMBER */
            if(answerType === "number"){
                if(isNaN(message.content)){
                    return message.channel.send(`${options.user}, ${defaultErrorMessages.nan(message.content)}`);
                } else if(options.between){
                    let number = parseInt(message.content, 10);
                    if(number < options.between[0] || number > options.between[1]){
                        return message.channel.send(`${options.user}, ${defaultErrorMessages.between(options.between)}`);
                    } else {
                        collector.stop();
                        resolve(parseInt(message.content, 10));
                    }
                } else {
                    collector.stop();
                    resolve(parseInt(message.content, 10));
                }
            }

            /* STRING */
            if(answerType === "string"){
                // Check length
                if((options.maxLength && (message.content.length > options.maxLength)) || (options.minLength && (message.content.length < options.minLength))){
                    return message.channel.send(`${options.user}, ${defaultErrorMessages.len(options.minLength, options.maxLength)}`);
                }
                // Check format
                if((options.startsWith && (!message.content.startsWith(options.startsWith)) || options.endsWith && (!message.content.endsWith(options.endsWith)))){
                    return message.channel.send(`${options.user}, ${defaultErrorMessages.format(options.startsWith, options.endsWith)}`);
                }
                collector.stop();
                resolve(message.content);
            }

        });
        collector.on("end", (collected, reason) => {
            if(reason === "time"){
                return options.channel.send(`${options.user}, ${options.timeoutMessage || defaultOptions.timeoutMessage}`);
            }
        });
    });
};