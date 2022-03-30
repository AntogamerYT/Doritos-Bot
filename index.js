
import {Telegraf} from 'telegraf'
import 'dotenv/config'
import axios from 'axios'
import Discord from 'discord.js'
const client = new Telegraf(process.env.TOKEN)
client.cooldown = new Discord.Collection() // Discord collection on a telegram bot because idk
client.cooldown.set('doritos', new Discord.Collection()) 
client.command('start', ctx => {
    client.telegram.sendMessage(ctx.chat.id, 'type /doritos to get a Doritos img.', {
    })
}) 

const url = 'http://localhost:3895/'; // API URL (Private for now, sorry)

client.command('doritos', async ctx => {
    try{
        const now = Date.now() // current time
        const timestamps = client.cooldown.get('doritos') 
        const cooldownAmount = 1 * 1000 
        if (timestamps.has(ctx.chat.id)) {
            const expirationTime = timestamps.get(ctx.chat.id) + cooldownAmount 
            if (now < expirationTime) { 
                const timeLeft = (expirationTime - now) / 1000 
                return ctx.reply(`Please try again in ${timeLeft.toFixed(1)} seconds.`)
            }
        }
        timestamps.set(ctx.chat.id, now) // Set cooldown
        await ctx.replyWithPhoto({
            url: url,
            filename: 'doritos.png'
        }); // Reply with the cool doritos img
    } catch(e) {
        console.log(e) 
        const status = await axios.get(url);
        if (status.status === 429) {
            ctx.reply('Ratelimited, try again in 1 second.') // This obviously doesn't work since axios will just return an error
        } else ctx.reply('Sorry, no doritos for you, my code broke because of my dumbass owner.')
    }
})

client.launch() // Start bot