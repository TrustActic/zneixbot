exports.description = 'Displays various information about current server.';
exports.usage = '';
exports.level = 0;
exports.perms = [];
exports.cooldown = 7000;
exports.pipeable = false;

exports.run = async (client, message) => {
    const {dateFormat, msToHuman} = require('../src/utils/formatter');
    message.channel.send({embed:{
        color: 0xcc44ff,
        timestamp: message.createdAt,
        footer: {
            text: message.author.tag,
            icon_url: message.author.avatarURL({format:'png', dynamic:true})
        },
        author: {
            name: message.guild.name,
            icon_url: message.guild.iconURL({format:'png', dynamic:true})
        },
        thumbnail: {
            url: message.guild.iconURL({format:'png', dynamic:true})
        },
        fields: [
            {
                name: 'Time created',
                value: `${dateFormat(message.guild.createdAt)}\n\`${msToHuman(Date.now()-message.guild.createdTimestamp)} ago\``,
                inline: true
            },
            {
                name: "ID",
                value: `Server: ${message.guild.id}\nOwner: ${message.guild.owner.id}`,
                inline: true
            },
            {
                name: 'Owner',
                value: `${message.guild.owner.user} ${message.guild.owner.user.tag}`,
                inline: false
            },
            {
                name: 'Members',
                value: `${message.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}/${message.guild.members.cache.size} (${message.guild.members.cache.filter(m => m.user.bot).size} bots)`,
                inline: true
            },
            {
                name: 'Roles',
                value: message.guild.roles.cache.size-1, //substracting default everyone role
                inline: true
            },
            {
                name: 'Channels',
                value: `Total: **${message.guild.channels.cache.size}**`
                +`\nCategories: **${message.guild.channels.cache.filter(ch => ch.type == 'category').size}**`
                +`\nText: **${message.guild.channels.cache.filter(ch => ch.type == 'text').size}**`
                +`\nVoice: **${message.guild.channels.cache.filter(ch => ch.type == 'voice').size}**`,
                inline: false
            }
        ]
    }});
}