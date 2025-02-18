const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("핑").setDescription("퐁!"),
  async execute(interaction) {
    const sentMessage = await interaction.reply({
      content: "퐁!",
      fetchReply: true,
    });
    const latency = sentMessage.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);
    await interaction.editReply(
      `Pong! 지연률: ${latency}ms, API 지연률: ${apiLatency}ms`
    );
  },
};
