import express from 'express';

const app = express();
const port = 8000;

const run = async () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

run().catch(e => console.error(e));