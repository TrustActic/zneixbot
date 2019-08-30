module.exports = async client => {
    await client.guilds.forEach(g => g.fetchMembers());
    client.user.setPresence({
        status: 'dnd',
        game: {
            name: `${client.config.prefix}help | ${client.users.size} users`,
            url: `https://www.twitch.tv/zneix`,
            type: 1
        }
    });
    client.logger.ready();
}