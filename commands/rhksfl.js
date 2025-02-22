const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = (client) => {
  const warnButton = new ButtonBuilder()
    .setCustomId("warnButton")
    .setLabel("경고하기")
    .setStyle("DANGER");

  const banButton = new ButtonBuilder()
    .setCustomId("myButton")
    .setLabel("밴하기")
    .setStyle("PRIMARY");

  // 유저 목록을 가져오는 함수
  function getUserOptions(guild) {
    return guild.members.cache.map((member) => {
      return {
        label: member.user.username,
        value: member.id,
      };
    });
  }

  // 경고 임베드 메시지 생성
  const warnEmbed = new EmbedBuilder()
    .setTitle("경고 기능")
    .setDescription("유저에게 경고를 주거나 밴할 수 있습니다.");

  // 임베드에 버튼 추가
  const row = new ActionRowBuilder().addComponents(warnButton, banButton);

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton() && interaction.customId === "warnButton") {
      const userOptions = getUserOptions(interaction.guild);

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("userSelect")
        .setPlaceholder("유저 선택")
        .addOptions(userOptions);

      const selectRow = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({ embeds: [warnEmbed], components: [selectRow] });
    } else if (
      interaction.isStringSelectMenu() &&
      interaction.customId === "userSelect"
    ) {
      const selectedUserId = interaction.values[0];
      const member = await interaction.guild.members.fetch(selectedUserId);

      // 경고 메시지 전송
      await interaction.reply(
        `${member.user.username}님에게 경고를 주었습니다.`
      );
    } else if (interaction.isButton() && interaction.customId === "myButton") {
      const userOptions = getUserOptions(interaction.guild);

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("userSelect")
        .setPlaceholder("유저 선택")
        .addOptions(userOptions);

      const selectRow = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({ embeds: [warnEmbed], components: [selectRow] });
    } else if (
      interaction.isStringSelectMenu() &&
      interaction.customId === "userSelect"
    ) {
      const selectedUserId = interaction.values[0];
      const member = await interaction.guild.members.fetch(selectedUserId);

      // 유저를 밴하기
      await member.ban({ reason: "관리자에 의해 밴됨" });
      await interaction.reply(`${member.user.username}님이 밴되었습니다.`);
    }
  });
};
