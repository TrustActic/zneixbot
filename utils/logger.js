module.exports = client => {
    function ready(){
        console.log(`[ready] Connected as: '${client.user.tag}'`);
        let logs = client.channels.get(client.config.channels.logs);
        if (logs){
            let embed = {
                color: 0xf97304,
                timestamp: new Date(),
                footer: {
                    text: client.user.tag,
                    icon_url: client.user.avatarURL
                },
                author: {
                    name: "Logged in to WebSocket"
                },
                fields: [
                    {
                        name: "User",
                        value: client.user+"\n"+client.user.tag+" `"+client.user.id+"`",
                        inline: false
                    },
                    {
                        name: "Size",
                        value: `Users: **${client.users.size}**\nGuilds: **${client.guilds.size}**\nChannels: **${client.channels.size}**\nEmotes: **${client.emojis.size}**`,
                        inline: false
                    }
                ]
            }
            logs.send({embed:embed});
        }
        else console.log(`[!ready] logs channel not found!`); //code executed as an error message
    }
    function command(message, cmd, level){
        console.log(`(cmd; level ${level}) ${cmd.name.replace(/{PREFIX}/, "")}`);
        let logs = client.channels.get(client.config.channels.logs);
        if (logs){
            let embed = {
                color: 0x0008ff,
                timestamp: new Date(),
                footer: {
                    text: message.author.tag,
                    icon_url: message.author.avatarURL
                },
                author: {
                    name: "Command successfully executed"
                },
                description: `**User**: ${message.author} ${message.author.tag}\n**Channel**: ${message.channel} (${message.channel.name} : ${message.channel.id}) \n**Command**: ${cmd.name.replace(/{PREFIX}/, "")}\n**Arguments**: ${message.args.length?(message.content.slice(message.guild.prefix.length).split(/\s+/g).slice(1).join(" ")):"N/A"}`
            }
            logs.send({embed:embed});
        }
        else console.log(`(!cmd) logs channel not found!`);
    }
    function caughtError(message, err, type){
        console.log(err);
        switch(type){
            case "message":
                if (typeof err !== "string") err.stack = err.toString();
                break;
            case "reject":
                console.trace("Async/Promise rejection command error: "+err);
                break;
            case "sync":
                console.trace("Sync command error: "+err);
                break;
            default:console.trace("Sync command error: "+err);
        }
        //temporary disabling that until Promise rejection system will be done
        // let embed = {
        //     color: 0xff5050,
        //     author: {
        //             name: message.guild.name+" — \""+message.channel.name+"\"",
        //             icon_url: message.author.avatarURL
        //         },
        //         description: type==="message"?"There was an error in the message event:":"**"+message.author.username+"#"+message.author.discriminator+":"+message.author.id+"** failed to call: ***"+message.content+"***",
        //         fields: [
        //             {
        //                 name: "Reason:",
        //                 value: err.toString().substring(0,1023),
        //             }
        //         ],
        //         timestamp: new Date()
        // }
        // message.channel.send({embed:embed}).then(msg => {if (client.config.delete.error) msg.delete(client.config.delete.time)});
    }
    return {
        ready: ready,
        command: command,
        caughtError: caughtError
    }
}