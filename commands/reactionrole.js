const { MessageEmbed } = require("discord.js");
const { owners } = require("..");
var emojiObject = require("../emojis.json");

module.exports = {
    name: 'reactionrole',
    description: 'Sets up a reaction role message.',
    cooldown: 5,
    ownerOnly: true,
    async execute(client, message, args, Discord){

        var emojiArray = emojiObject.emojis.split(",");

        var embed = new MessageEmbed()
            .setTitle('Role Selection')
            .setDescription('Choose of the following roles:\n\n**If you react to too many roles at once it will not respond temporarily, give it a minute between each pick!**')
            .addField("<:sexysaz:819559486133633024> - Sexy Saz", "For Saz players")
            .addField("<:DazzlingDJs:819558804541800488> - Dazzling DJs", "For Djs")
            .addField("<:DamnDarbukaDrumsDaff:819558901623029823> - Damn Darbuka/Drums/Daff", "For Drum players")
            .addField("<:NocturnalNays:819559118846820372> - Nocturnal Nays", "For Nay players")
            .addField("<:BouzoukBois:819558765103546390> - Bozouk Bois", "For Bozouk players")
            .addField("<:FlyingFlute:819559041013514240> - Flying Flute", "For Flute players")
            .addField("<:GuitarGang:819558984498806816> - Guitar Gang", "For Guitar players")
            .addField("<:KoolKanoun:819559180394037258> - Kool Kanoun", "For Qanun players")
            .addField("<:SingersFromtheSoul:819559251957645313> - Singers From the Soul", "For singers")
            .addField("<:Oudsuperior:819559407456616478> - Oud (Superior)", "For Oud players")
            .addField("<:ChillingCello:819558852906188809> - Chilling Cello", "For Cello players")
            .addField("<:VioletViolins:819558737328078848> - Violet Violins", "For Violin players")
            .addField("<:OverachievingOrgs:819559077919064105> - Overachieving Orgs", "For Org players");
        let messageEmbed = await message.channel.send(embed);

        for(const emoji of emojiArray){
            messageEmbed.react(emoji);
        };
    }

}