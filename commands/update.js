const { SlashCommandBuilder} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("업데이트알림").setDescription("업뎃알립!").addStringOption(option =>
            option.setName('message')
                .setDescription('보낼 메시지')
                .setRequired(true)
        ),
  async execute(interaction) {
    
    client.channels.cache.get(1341367065667436616).send(interaction.options.getString('message') + `\n<@1341678302712168528>`)
  },
};
