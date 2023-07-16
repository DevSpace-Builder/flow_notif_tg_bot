// Replace this file with the index.js file
require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.json());
// const fetch = require('node-fetch');
// const Validator = require('sns-payload-validator');


const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});

let chatId = null;
let chatIdMap = {}

bot.on('message', (message) => {
    console.log(message)
    chatId = message.from.id;
    chatIdMap[message.from.username] = message.from.id
    console.log(chatIdMap)
    bot.sendMessage(chatId, 'All set to receive Flow Notification')
});

app.get("/", async(req,res)=>{
    res.send("hello")
})
app.post("/", async (req, res) => {
    console.log(req.body)
    console.log(chatIdMap)
    const body = req.body
    const id = chatIdMap[body.inputs.id]
    const payload = JSON.parse(req.body.message)
    console.log(id)
    console.log(payload)
    if(!id){
        bot.sendMessage(id, req.body.message);
    }
    res.sendStatus(200);
    // const buffers = [];

    // for await (const chunk of req) {
    //     buffers.push(chunk);
    // }

    // const data = Buffer.concat(buffers).toString();

    // if (!data) {
    //     console.log("Invalid data received, hence skipping")
    //     res.status(200).json({
    //         "message": 'Invalid data received'
    //     });
    //     return;
    // }

    // const payload = JSON.parse(data);

    // try {
    //     await Validator.validate(payload)
    // } catch (err) {
    //     console.log('payload sender validation failed, hence skipping\n', payload);
    //     res.status(200).json({
    //         "message": 'Your message could not validated'
    //     });
    //     return;
    // }

    // if (payload.Type === 'Notification') {
    //     console.log('Notification :: \n', payload);
    //     console.log('------------------------------------------------------');
    //     console.log('------------------------------------------------------');
    //     console.log('------------------------------------------------------');
        
    //     const obj = JSON.parse(payload['Message']);
    //     console.log("messaged received from EPNS :: " + obj['payload']['data']['amsg'])

    //     if(chatId!=null ) {
    //         bot.sendMessage(chatId, obj['payload']['data']['amsg']);
    //     } else {
    //         console.log("Initate chat from telegram bot to send the messages to bot");
    //     }
        
    //     res.sendStatus(200);
    //     return;
    // } else if (payload.Type === 'SubscriptionConfirmation') {
    //     const url = payload.SubscribeURL;
    //     console.log("SubscriptionConfirmation :: \n" + payload)
    //     const response = await fetch(url);
    //     if (response.status === 200) {
    //         console.log('Subscription confirmed');
    //         console.log('------------------------------------------------------');
    //         console.log('------------------------------------------------------');
    //         console.log('------------------------------------------------------');
    //         res.sendStatus(200);
    //         return;
    //     } else {
    //         console.error('Subscription failed');
    //         res.sendStatus(500);
    //         return;
    //     }
    // } else {
    //     console.log('Received message from sns', payload);
    //     res.sendStatus(200);
    // }
});

const port = 6000;
app.listen(port, () => {
    console.log(`SNS app listening on port ${port}`);
});