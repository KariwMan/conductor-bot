module.exports = async(reaction, user) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;

    const channel = '825108365323272232';

    if(reaction.message.channel.id == channel) {
        switch(reaction.emoji.name){
            case "sexysaz": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === 'Sexy Saz'));
                break;
            case "DazzlingDJs": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Dazzling DJs"));
                break;
            case "DamnDarbukaDrumsDaff": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Damn Darbuka/Drums/Daff"));
                break;
            case "NocturnalNays": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Nocturnal Nays"));
                break;
            case "BouzoukBois": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Bouzouk Bois"));
                break;
            case "FlyingFlute": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Flying Flute"));
                break;
            case "GuitarGang": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Guitar Gang"));
                break;
            case "KoolKanoun": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Kool Kanoun"));
                break;
            case "SingersFromtheSoul": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Singers From the Soul"));
                break;
            case "Oudsuperior": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Oud (superior)"));
                break;
            case "ChillingCello": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Chilling Cello"));
                break;
            case "VioletViolins": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name == 'Violet Violins'));
                break;
            case "OverachievingOrgs": 
                await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === "Overachieving Orgs"));
                break;
        }
    }else return;
}