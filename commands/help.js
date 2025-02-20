const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("도움말").setDescription("도움말을 확인합니다.!"),
  async execute(interaction) {
    // 임베드 메시지 생성
    const embed = new EmbedBuilder()
      .setColor("#ffffff") // 임베드 색상
      .setTitle("도움말 목록") // 임베드 제목
      .setDescription(
        `
        도움말\n
        !핑 : 핑을 확인합니다.
        `
      ) // 임베드 설명
      .setTimestamp(); // 현재 시간 추가

    await interaction.reply({ embeds: [embed] }); // 임베드 메시지로 응답
  },
};
