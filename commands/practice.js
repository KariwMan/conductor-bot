const { MessageEmbed } = require('discord.js');
const sqlite = require('sqlite3').verbose();
const rarity = require('../rarity.json');

module.exports ={
    name: 'practice',
    description: 'Practice in voice chat for rewards.',
    cooldown: 5,
    ownerOnly: false,
    async execute(client, message, args){
        let db = new sqlite.Database('./author.db', sqlite.OPEN_READWRITE);
        let userid = message.author.id;
        let uname = message.author.tag;
        let channel = message.channel.id;
        let messageId = message.id;
        let query = `SELECT * FROM data WHERE userid = ?`
        

        db.get(query, [userid], async(err, row) =>{
            if(err){
                console.log(err);
                return;
            }

            if(row === undefined){
                message.channel.send(new MessageEmbed()
                .setDescription('You do not have a profile yet. Please run ``+register`` once to register.')
                .setColor(0xFF0000));
                return;
            }
            let activity = row.activity;
            let author = message.member;
            var timeRow = row.time;
            let drop = 'none';

            var xpchance = Math.ceil(Math.random() * 10);
                            
            if(activity == 'practicing'){
                return message.reply('you are already practicing!');
            }
            
            if(message.member.voice.channel == undefined) {
                return message.reply('you have to be in a voice channel to practice.');
            }else{

                if(!args[0]){
                    return message.reply('please specify what you\'re practicing.');
                }

                const embed = new MessageEmbed()
                    .setDescription(`<@${message.author.id}> has started practicing ${args[0]}!`)
                    .setColor(0xFFF00)

                db.run(`UPDATE data SET activity = ? WHERE userid =?`, ['practicing', userid]);


                //controlls drop probability
                var probability = Math.random();
                var chance = probability.toFixed(2);

                if(chance <= 0.45){
                    embed.setFooter('You got a common drop! Practice for 20 minutes to claim it!');
                    drop = 'common';
                }
                if(chance <= 0.70 && chance > 0.45){
                    embed.setFooter('You got an uncommon drop!, Practice for 30 minutes to claim it!');
                    drop = 'uncommon';
                }
                if(chance <= 0.87 && chance > 0.70){
                    embed.setFooter('You got a rare drop! Practice for 40 minutes to claim it!');
                    drop = 'rare';
                }
                if(chance <= 0.96 && chance > 0.87){
                    embed.setFooter('You got an epic drop! Practice for 50 minutes to claim it!');
                    drop = 'epic';
                }
                if(chance <= 1 && chance > 0.96){
                    embed.setFooter('You got a legendary drop! Practice for 60 minutes to claim it!');
                    drop = 'legendary';
                }

                var embedSent = await message.channel.send(embed);
                embedSent.react('⏹️');

                //timers and vc ping    
                var timer = setInterval(() => {
                    timeRow += 5000;
                }, 5000);

                var claim = setTimeout(() => {
                    claimDrop();
                }, rarity[drop].time);

                var interval = setInterval(() => {
                    if(author.voice.channel == undefined) return loseDrop();
                }, 5000);

                client.on('messageReactionAdd', async (reaction, user) =>{
                    if(author.voice.channel == undefined) return;
                    if(reaction.message.partial) await reaction.message.fetch();
                    if(reaction.partial) await reaction.fetch();
                    if(user.bot) return;
                    if(user.id !== message.author.id) return;
                    if(!reaction.message.guild) return;

                    if(reaction.message.channel.id == channel && reaction.message.id == embedSent.id) {
                        if(reaction.emoji.name === '⏹️') return loseDrop();
                    }
                })

                function loseDrop(){
                    clearInterval(interval);
                    clearInterval(timer);
                    clearTimeout(claim);
                    embedSent.delete();

                    db.run(`UPDATE data SET activity = ? WHERE userid = ?`, ['-', userid]);
                    db.run(`UPDATE data SET time = ? WHERE userid = ?`, [timeRow, userid]);
                    
                    message.channel.send(new MessageEmbed()
                        .setDescription(`<@${message.author.id}> has stopped practicing and lost the ${drop} drop.`)
                        .setColor(0xFF0000));
                    return;
                }

                function claimDrop(){
                    clearInterval(interval);
                    clearInterval(timer);
                    
                    let dropRow = row[drop];
                    dropRow++

                    db.run(`UPDATE data SET activity = ? WHERE userid = ?`, ['-', userid]);
                    db.run(`UPDATE data SET ${drop} = ? WHERE userid = ?`, [dropRow, userid]);
                    db.run(`UPDATE data SET time = ? WHERE userid = ?`, [timeRow, userid]);

                    embedSent.delete();
                    message.channel.send(new MessageEmbed()
                        .setDescription(`<@${message.author.id}> has claimed the ${drop} drop!`)
                        .setColor(0xFFF00));
                    return;
                }
            };
        })
    }
}