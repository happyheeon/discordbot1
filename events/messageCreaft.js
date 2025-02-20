const { Events, PermissionsBitField } = require("discord.js");
const nsfwFilter = require("../commands/nsfw-filter.js");

const NSFW_LINKS = ["porn", "hentai", "nsfw", "xxx", "adult", "sex"];

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;
    if (!nsfwFilter.getFilterStatus()) return; // 필터가 비활성화되면 동작 안 함.

    // NSFW 링크 감지
    if (
      NSFW_LINKS.some((word) => message.content.toLowerCase().includes(word))
    ) {
      await message.delete();
      await message.channel.send(
        `🚨 ${message.author}, NSFW 링크는 금지되어 있습니다!`
      );

      // 유저에게 10분 타임아웃 적용
      const member = message.guild.members.cache.get(message.author.id);
      if (member && member.moderatable) {
        await member.timeout(600_000, "NSFW 링크 전송");
        await message.channel.send(
          `⛔ ${message.author}님이 10분 동안 타임아웃되었습니다.`
        );
      }
    }
  },
};
