const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "핑", // 커맨드 이름
  description: "퐁!", // 커맨드 설명
  async execute(message, args) {
    const latency = Date.now() - message.createdTimestamp; // 지연률 계산
    const apiLatency = Math.round(message.client.ws.ping); // API 지연률 계산

    // 임베드 메시지 생성
    const embed = new EmbedBuilder()
      .setColor("#0099ff") // 임베드 색상
      .setTitle("Ping 결과") // 임베드 제목
      .setDescription(`지연률: ${latency}ms\nAPI 지연률: ${apiLatency}ms`) // 임베드 설명
      .setTimestamp() // 현재 시간 추가
      .setFooter({ text: "봇에서 보낸 메시지" }); // 푸터 추가

    await message.reply({ embeds: [embed] }); // 임베드 메시지로 응답
  },
};
