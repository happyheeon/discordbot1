const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("핑").setDescription("퐁!"),
  async execute(interaction) {
    const sentMessage = await interaction.reply({
      content: "Pong!",
      fetchReply: true,
    });
    const latency = sentMessage.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    // 임베드 메시지 생성
    const embed = new EmbedBuilder()
      .setColor("#0099ff") // 임베드 색상
      .setTitle("퐁이예요!") // 임베드 제목
      .setDescription(
        `지연률: ${latency}ms\nAPI 지연률: ${apiLatency}ms\n지연률은 정확하지 않을 수 있습니다.`
      ) // 임베드 설명
      .setTimestamp(); // 현재 시간 추가

    await interaction.editReply({ embeds: [embed] }); // 임베드 메시지로 응답
  },
};
