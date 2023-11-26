import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { exec } from 'child_process';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const BRANCH_NAME = process.env.BRANCH_NAME || 'master';
const SCRIPT_PATH = process.env.SCRIPT_PATH || '';


app.use(bodyParser.json());

app.post('/webhooks/github', (req: Request, res: Response) => {

    const branch = req.body.ref.split('/').pop(); // Extract the branch name from the ref

    if (req.body && req.body.ref && branch === BRANCH_NAME) {
        // Run your Bash script here
        exec(SCRIPT_PATH, (error, stdout, stderr) => {
            if (error) {
                console.error(`Script error: ${error.message}`);
                return res.status(500).send('Internal Server Error');
            }
            if (stderr) {
                console.error(`Script stderr: ${stderr}`);
            }
            console.log(`Script output: ${stdout}`);
            res.status(200).send('Webhook received successfully');
        });
    } else {
        res.send('Ignoring webhook');
    }
});

app.listen(port, () => {
    console.log(`Webhook server is running on port ${port} `);
});
