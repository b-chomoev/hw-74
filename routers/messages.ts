import express from "express";
import {promises as fs} from "fs";
import {Message} from "../types";

const messagesRouter = express.Router();
const path = './messages';

messagesRouter.get('/', async (req, res) => {
    await fs.mkdir(path, {recursive: true});

    const files = await fs.readdir(path).catch((err) => {
        throw err;
    });

    const allMessages: Message[] = [];

    for (const file of files) {
        const filePath = path + '/' + file;
        const message = await fs.readFile(filePath);
        allMessages.push(JSON.parse(message.toString()));
    }

    res.send(allMessages);
});

messagesRouter.post('/', async (req, res) => {
    await fs.mkdir(path, {recursive: true});

    const date = new Date().toISOString();

    const message = {
        message: req.body.message,
        date: date,
    }

    const messageFileName = path + '/' + date + '.txt';

    await fs.writeFile(messageFileName, JSON.stringify(message)).catch((err) => {
        throw err;
    });

    res.send(message);
})

export default messagesRouter;

