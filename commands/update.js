const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("업데이트알림")
    .setDescription("업뎃알립!")
    .addStringOption((option) =>
      option.setName("message").setDescription("보낼 메시지").setRequired(true)
    ),
  async execute(interaction) {
    client.channels.cache
      .get(1341367065667436616)
      .send(
        interaction.options.getString("message") + `\n<@1341678302712168528>`
      );
  },
};

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("업데이트알림")
    .setDescription("업뎃 알림 보내기.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("보낼 메시지지")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("보낼채널").setRequired(true)
    ),
  async execute(interaction) {
    // 임베드 메시지 생성
    const msg = interaction.options.getString("message");
    const channel = interaction.options.getChannel("channel");
    const embed = new EmbedBuilder()
      .setColor("#ffffff") // 임베드 색상
      .setTitle("다기능봇 업데이트!") // 임베드 제목
      .setDescription(`${msg}\n<@&1341678302712168528>`) // 임베드 설명
      .setTimestamp(); // 현재 시간 추가

    await client.channels.cache.get(CHANNEL_ID).send({ embeds: [embed] }); // 임베드 메시지로 응답
  },
};
