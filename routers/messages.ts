import express from "express";
import {promises as fs} from "fs";

const messagesRouter = express.Router();
const path = './messages';

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

